import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { canManageContent } from "@/lib/content-types";
import { getSql } from "@/lib/db";

const idSchema = z.string().uuid();

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return errorResponse("Obehörig", 401);
  try {
    const id = idSchema.parse((await params).id);
    const sql = getSql();
    const versions = await sql`
      select v.id, v.version, v.created_at, u.name as created_by_name
      from content_versions v
      left join admin_users u on u.id = v.created_by
      where v.content_id = ${id}::uuid
      order by v.version desc
      limit 50
    `;
    return NextResponse.json({ versions });
  } catch {
    return errorResponse("Kunde inte hämta versionshistoriken.", 503);
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return errorResponse("Obehörig", 401);
  if (!canManageContent(session.role)) return errorResponse("Du saknar rättighet att återställa versioner.", 403);
  try {
    const id = idSchema.parse((await params).id);
    const { version } = z.object({ version: z.coerce.number().int().positive() }).parse(await request.json());
    const sql = getSql();
    const rows = await sql`
      select snapshot from content_versions
      where content_id = ${id}::uuid and version = ${version}
      limit 1
    `;
    const snapshot = rows[0]?.snapshot as Record<string, unknown> | undefined;
    if (!snapshot) return errorResponse("Versionen hittades inte.", 404);
    const result = await sql`
      update content_items set
        slug = ${String(snapshot.slug)}, title = ${String(snapshot.title)}, h1 = ${String(snapshot.h1)},
        excerpt = ${String(snapshot.excerpt ?? "")}, body = ${String(snapshot.body ?? "")}, tag = ${String(snapshot.tag ?? "HÄLSA")},
        status = 'draft', target_query = ${snapshot.targetQuery ?? null}, intent = ${snapshot.intent ?? null},
        cta_label = ${snapshot.ctaLabel ?? null}, cta_href = ${snapshot.ctaHref ?? null},
        meta_title = ${snapshot.metaTitle ?? null}, meta_description = ${snapshot.metaDescription ?? null},
        canonical_url = ${snapshot.canonicalUrl ?? null}, og_image = ${snapshot.ogImage ?? null},
        schema_type = ${String(snapshot.schemaType ?? "Article")}, robots = 'index,follow',
        author_id = ${snapshot.authorId ?? null}::uuid, reviewer_id = null, reviewed_at = null,
        scheduled_at = null, published_at = null, updated_by = ${session.id}::uuid, updated_at = now()
      where id = ${id}::uuid
      returning slug
    `;
    if (result.length === 0) return errorResponse("Innehållet hittades inte.", 404);
    const nextVersion = await sql`select coalesce(max(version), 0) + 1 as next_version from content_versions where content_id = ${id}::uuid`;
    await sql`
      insert into content_versions (content_id, version, snapshot, created_by)
      values (${id}::uuid, ${Number(nextVersion[0]?.next_version ?? 1)}, ${JSON.stringify({ ...snapshot, status: "draft" })}::jsonb, ${session.id}::uuid)
    `;
    await sql`
      insert into audit_events (actor_id, action, entity_type, entity_id, metadata)
      values (${session.id}::uuid, 'content_rollback', 'content', ${id}, ${JSON.stringify({ version })}::jsonb)
    `;
    revalidatePath("/aktuellt");
    revalidatePath(`/aktuellt/${String(result[0].slug)}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ ok: true, slug: result[0].slug });
  } catch (caught) {
    if (caught instanceof z.ZodError) return errorResponse(caught.issues[0]?.message ?? "Ogiltig version.");
    return errorResponse("Kunde inte återställa versionen.", 503);
  }
}
