import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { canManageContent, canReviewMedical, contentWriteSchema, type ContentStatus } from "@/lib/content-types";
import { mapContent, mapSource, queryContentById, querySourcesForContent } from "@/lib/content-server";
import { getSql } from "@/lib/db";

const idSchema = z.string().uuid();

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

async function getItem(id: string) {
  const row = await queryContentById(id);
  if (!row) return null;
  const sources = await querySourcesForContent(id);
  return mapContent(row, sources.map((source) => mapSource(source as Record<string, unknown>)));
}

function snapshot(item: Record<string, unknown>) {
  return {
    slug: item.slug,
    title: item.title,
    h1: item.h1,
    excerpt: item.excerpt ?? "",
    body: item.body ?? "",
    tag: item.tag ?? "HÄLSA",
    status: item.status ?? "draft",
    targetQuery: item.target_query ?? null,
    intent: item.intent ?? null,
    ctaLabel: item.cta_label ?? null,
    ctaHref: item.cta_href ?? null,
    metaTitle: item.meta_title ?? null,
    metaDescription: item.meta_description ?? null,
    canonicalUrl: item.canonical_url ?? null,
    ogImage: item.og_image ?? null,
    schemaType: item.schema_type ?? "Article",
    robots: item.robots ?? "index,follow",
    authorId: item.author_id ?? null,
    reviewerId: item.reviewer_id ?? null,
    reviewedAt: item.reviewed_at ?? null,
    scheduledAt: item.scheduled_at ?? null,
  };
}

function contentValues(payload: z.infer<typeof contentWriteSchema>, status: ContentStatus, previous: Record<string, unknown>) {
  return {
    slug: payload.slug ?? String(previous.slug),
    title: payload.title ?? String(previous.title),
    h1: payload.h1 ?? String(previous.h1),
    excerpt: payload.excerpt ?? String(previous.excerpt ?? ""),
    body: payload.body ?? String(previous.body ?? ""),
    tag: payload.tag ?? String(previous.tag ?? "HÄLSA"),
    status,
    targetQuery: payload.targetQuery === undefined ? previous.target_query ?? null : payload.targetQuery,
    intent: payload.intent === undefined ? previous.intent ?? null : payload.intent,
    ctaLabel: payload.ctaLabel === undefined ? previous.cta_label ?? null : payload.ctaLabel,
    ctaHref: payload.ctaHref === undefined ? previous.cta_href ?? null : payload.ctaHref,
    metaTitle: payload.metaTitle === undefined ? previous.meta_title ?? null : payload.metaTitle,
    metaDescription: payload.metaDescription === undefined ? previous.meta_description ?? null : payload.metaDescription,
    canonicalUrl: payload.canonicalUrl === undefined ? previous.canonical_url ?? null : payload.canonicalUrl,
    ogImage: payload.ogImage === undefined ? previous.og_image ?? null : payload.ogImage,
    schemaType: payload.schemaType ?? String(previous.schema_type ?? "Article"),
    robots: status === "noindex" ? "noindex,follow" : payload.robots ?? String(previous.robots ?? "index,follow"),
    authorId: payload.authorId === undefined ? previous.author_id ?? null : payload.authorId,
    reviewerId: payload.reviewerId === undefined ? previous.reviewer_id ?? null : payload.reviewerId,
    reviewedAt: payload.reviewedAt === undefined ? previous.reviewed_at ?? null : payload.reviewedAt,
    scheduledAt: payload.scheduledAt === undefined ? previous.scheduled_at ?? null : payload.scheduledAt,
  };
}

async function replaceSources(sql: ReturnType<typeof getSql>, contentId: string, sourceIds?: string[]) {
  if (sourceIds === undefined) return;
  await sql`delete from content_source_links where content_id = ${contentId}::uuid`;
  if (sourceIds.length === 0) return;
  await sql.query(
    `insert into content_source_links (content_id, source_id)
     select $1::uuid, source_id::uuid from unnest($2::text[]) as source_id
     on conflict do nothing`,
    [contentId, sourceIds],
  );
}

async function addVersion(sql: ReturnType<typeof getSql>, contentId: string, actorId: string, snapshotValue: unknown) {
  const rows = await sql`select coalesce(max(version), 0) + 1 as next_version from content_versions where content_id = ${contentId}::uuid`;
  const version = Number(rows[0]?.next_version ?? 1);
  await sql`
    insert into content_versions (content_id, version, snapshot, created_by)
    values (${contentId}::uuid, ${version}, ${JSON.stringify(snapshotValue)}::jsonb, ${actorId}::uuid)
  `;
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return errorResponse("Obehörig", 401);
  try {
    const id = idSchema.parse((await params).id);
    const content = await getItem(id);
    if (!content) return errorResponse("Innehållet hittades inte.", 404);
    return NextResponse.json({ content });
  } catch {
    return errorResponse("Kunde inte hämta innehållet.", 503);
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return errorResponse("Obehörig", 401);
  try {
    const id = idSchema.parse((await params).id);
    const previous = await queryContentById(id);
    if (!previous) return errorResponse("Innehållet hittades inte.", 404);
    const payload = contentWriteSchema.partial().parse(await request.json());
    if (!canManageContent(session.role) && !(session.role === "medical_reviewer" && canReviewMedical(session.role))) {
      return errorResponse("Du saknar rättighet att ändra innehåll.", 403);
    }
    const currentStatus = String(previous.status) as ContentStatus;
    const nextStatus = payload.status ?? currentStatus;
    if (session.role === "medical_reviewer") {
      const changedFields = Object.keys(payload).filter((key) => !["status", "reviewerId", "reviewedAt", "sourceIds"].includes(key));
      if (changedFields.length > 0 || !["medical_review", "ready", "noindex"].includes(nextStatus)) {
        return errorResponse("Medicinsk granskare kan bara godkänna medicinskt innehåll och ändra granskningsfält.", 403);
      }
    }
    if (nextStatus === "published" && !["admin", "editor"].includes(session.role)) {
      return errorResponse("Du saknar rättighet att publicera.", 403);
    }
    if (nextStatus === "published" && currentStatus !== "ready" && session.role !== "admin") {
      return errorResponse("Markera innehållet som klart innan publicering.", 409);
    }

    const values = contentValues(payload as z.infer<typeof contentWriteSchema>, nextStatus, previous as Record<string, unknown>);
    const reviewedAt = nextStatus === "ready" && session.role === "medical_reviewer" ? new Date() : values.reviewedAt;
    const publishedAt = nextStatus === "published" ? new Date() : nextStatus === "scheduled" ? null : previous.published_at ?? null;
    const sql = getSql();
    const result = await sql`
      update content_items set
        slug = ${values.slug}, title = ${values.title}, h1 = ${values.h1}, excerpt = ${values.excerpt}, body = ${values.body},
        tag = ${values.tag}, status = ${values.status}, target_query = ${values.targetQuery}, intent = ${values.intent},
        cta_label = ${values.ctaLabel}, cta_href = ${values.ctaHref}, meta_title = ${values.metaTitle},
        meta_description = ${values.metaDescription}, canonical_url = ${values.canonicalUrl}, og_image = ${values.ogImage},
        schema_type = ${values.schemaType}, robots = ${values.robots}, author_id = ${values.authorId}::uuid,
        reviewer_id = ${values.reviewerId}::uuid, reviewed_at = ${reviewedAt}::timestamptz,
        scheduled_at = ${values.scheduledAt}::timestamptz, published_at = ${publishedAt}::timestamptz,
        updated_by = ${session.id}::uuid, updated_at = now()
      where id = ${id}::uuid
      returning *
    `;
    const row = result[0] as Record<string, unknown>;
    await replaceSources(sql, id, payload.sourceIds);
    const sourceRows = await querySourcesForContent(id);
    const mapped = mapContent(row, sourceRows.map((source) => mapSource(source as Record<string, unknown>)));
    await addVersion(sql, id, session.id, snapshot(row));
    await sql`
      insert into audit_events (actor_id, action, entity_type, entity_id, metadata)
      values (${session.id}::uuid, 'content_updated', 'content', ${id}, ${JSON.stringify({ from: currentStatus, to: nextStatus, slug: values.slug })}::jsonb)
    `;
    revalidatePath("/aktuellt");
    revalidatePath(`/aktuellt/${values.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ content: mapped });
  } catch (caught) {
    if (caught instanceof z.ZodError) return errorResponse(caught.issues[0]?.message ?? "Ogiltiga innehållsfält.");
    return errorResponse("Kunde inte uppdatera innehållet.", 503);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return errorResponse("Obehörig", 401);
  if (session.role !== "admin") return errorResponse("Endast admin kan ta bort innehåll.", 403);
  try {
    const id = idSchema.parse((await params).id);
    const sql = getSql();
    const result = await sql`delete from content_items where id = ${id}::uuid returning slug`;
    if (result.length === 0) return errorResponse("Innehållet hittades inte.", 404);
    await sql`
      insert into audit_events (actor_id, action, entity_type, entity_id, metadata)
      values (${session.id}::uuid, 'content_deleted', 'content', ${id}, ${JSON.stringify({ slug: result[0].slug })}::jsonb)
    `;
    revalidatePath("/aktuellt");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ ok: true });
  } catch {
    return errorResponse("Kunde inte ta bort innehållet.", 503);
  }
}
