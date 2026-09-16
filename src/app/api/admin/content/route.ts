import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { canManageContent, contentStatusLabels, contentWriteSchema, isContentStatus, type ContentStatus } from "@/lib/content-types";
import {
  mapContent,
  mapSource,
  queryContentItems,
  querySourcesForContent,
  querySourcesForContentIds,
} from "@/lib/content-server";
import { getSql } from "@/lib/db";

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function auditMetadata(data: Record<string, unknown>) {
  return JSON.stringify(data);
}

async function sourceIdsForContent(sql: ReturnType<typeof getSql>, contentId: string, sourceIds: string[]) {
  await sql`delete from content_source_links where content_id = ${contentId}::uuid`;
  if (sourceIds.length === 0) return;
  await sql.query(
    `insert into content_source_links (content_id, source_id)
     select $1::uuid, source_id::uuid from unnest($2::text[]) as source_id
     on conflict do nothing`,
    [contentId, sourceIds],
  );
}

async function createVersion(sql: ReturnType<typeof getSql>, contentId: string, actorId: string, version: number, snapshot: unknown) {
  await sql`
    insert into content_versions (content_id, version, snapshot, created_by)
    values (${contentId}::uuid, ${version}, ${JSON.stringify(snapshot)}::jsonb, ${actorId}::uuid)
  `;
}

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) return errorResponse("Obehörig", 401);
  const statusValue = new URL(request.url).searchParams.get("status");
  if (statusValue && !isContentStatus(statusValue)) return errorResponse("Ogiltig innehållsstatus.");

  try {
    const rows = await queryContentItems(statusValue as ContentStatus | undefined);
    const items = rows as Record<string, unknown>[];
    const sourcesByContentId = await querySourcesForContentIds(
      items.map((item) => String(item.id)),
    );
    const content = items.map((item) =>
      mapContent(item, sourcesByContentId.get(String(item.id)) ?? []),
    );
    const sql = getSql();
    const suggestions = await sql`
      select slug, title, tag from content_items
      where status = 'published'
      order by published_at desc nulls last, updated_at desc
      limit 100
    `;
    return NextResponse.json({ content, suggestions });
  } catch {
    return errorResponse("CMS-databasen saknas eller kunde inte nås. Kör migration 0003_content_cms.sql i Neon.", 503);
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return errorResponse("Obehörig", 401);
  if (!canManageContent(session.role)) return errorResponse("Du saknar rättighet att ändra innehåll.", 403);

  try {
    const payload = contentWriteSchema.parse(await request.json());
    if (payload.status === "published" && session.role !== "admin") {
      return errorResponse("En artikel måste granskas och markeras som klar innan publicering.", 409);
    }
    const sql = getSql();
    const existing = await sql`select id from content_items where slug = ${payload.slug} limit 1`;
    if (existing.length > 0) return errorResponse("Sluggen används redan.", 409);

    const publishedAt = payload.status === "published" ? new Date() : null;
    const result = await sql`
      insert into content_items (
        slug, title, h1, excerpt, body, tag, status, target_query, intent,
        cta_label, cta_href, meta_title, meta_description, canonical_url,
        og_image, schema_type, robots, author_id, reviewer_id, reviewed_at,
        scheduled_at, published_at, created_by, updated_by
      ) values (
        ${payload.slug}, ${payload.title}, ${payload.h1}, ${payload.excerpt}, ${payload.body}, ${payload.tag},
        ${payload.status}, ${payload.targetQuery ?? null}, ${payload.intent ?? null},
        ${payload.ctaLabel ?? null}, ${payload.ctaHref ?? null}, ${payload.metaTitle ?? null},
        ${payload.metaDescription ?? null}, ${payload.canonicalUrl ?? null}, ${payload.ogImage ?? null},
        ${payload.schemaType}, ${payload.status === "noindex" ? "noindex,follow" : payload.robots},
        ${payload.authorId ?? null}::uuid, ${payload.reviewerId ?? null}::uuid, ${payload.reviewedAt ?? null}::timestamptz,
        ${payload.scheduledAt ?? null}::timestamptz, ${publishedAt}::timestamptz,
        ${session.id}::uuid, ${session.id}::uuid
      ) returning *
    `;
    const row = result[0] as Record<string, unknown>;
    await createVersion(sql, String(row.id), session.id, 1, row);
    await sourceIdsForContent(sql, String(row.id), payload.sourceIds);
    await sql`
      insert into audit_events (actor_id, action, entity_type, entity_id, metadata)
      values (${session.id}::uuid, 'content_created', 'content', ${String(row.id)}, ${auditMetadata({ slug: payload.slug, status: payload.status })}::jsonb)
    `;
    const sources = await querySourcesForContent(String(row.id));
    return NextResponse.json({ content: mapContent(row, sources.map((source) => mapSource(source as Record<string, unknown>))), statusLabel: contentStatusLabels[payload.status] }, { status: 201 });
  } catch (caught) {
    if (caught instanceof z.ZodError) return errorResponse(caught.issues[0]?.message ?? "Ogiltiga innehållsfält.");
    return errorResponse("Kunde inte skapa innehållet. Kontrollera att CMS-migrationen är körd.", 503);
  }
}
