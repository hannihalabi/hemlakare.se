import { NextResponse } from "next/server";
import { articles } from "@/data/articles";
import { getAdminSession } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST() {
  const session = await getAdminSession();
  if (!session) return errorResponse("Obehörig", 401);
  if (session.role !== "admin") return errorResponse("Endast admin kan importera befintliga artiklar.", 403);
  try {
    const sql = getSql();
    const payload = articles.map((article) => ({
      slug: article.slug,
      title: article.title,
      h1: article.title,
      excerpt: article.excerpt,
      body: article.body,
      tag: article.tag,
      metaTitle: article.title,
      metaDescription: article.excerpt,
      canonicalUrl: `https://hemlakare.se/aktuellt/${article.slug}`,
      ogImage: article.image,
    }));
    const rows = await sql.query(
      `insert into content_items (
        slug, title, h1, excerpt, body, tag, status, meta_title, meta_description,
        canonical_url, og_image, robots, created_by, updated_by
      ) select item.slug, item.title, item.h1, item.excerpt, item.body, item.tag,
        'noindex', item.meta_title, item.meta_description, item.canonical_url,
        item.og_image, 'noindex,follow', $2::uuid, $2::uuid
      from jsonb_to_recordset($1::jsonb) as item(
        slug text, title text, h1 text, excerpt text, body text, tag text,
        meta_title text, meta_description text, canonical_url text, og_image text
      ) on conflict (slug) do nothing returning id`,
      [JSON.stringify(payload), session.id],
    );
    await sql`
      insert into content_versions (content_id, version, snapshot, created_by)
      select id, 1, jsonb_build_object('slug', slug, 'title', title, 'h1', h1, 'excerpt', excerpt, 'body', body, 'tag', tag, 'status', status), ${session.id}::uuid
      from content_items c
      where c.status = 'noindex' and not exists (select 1 from content_versions v where v.content_id = c.id)
    `;
    await sql`
      insert into audit_events (actor_id, action, entity_type, metadata)
      values (${session.id}::uuid, 'legacy_content_imported', 'content', ${JSON.stringify({ imported: rows.length })}::jsonb)
    `;
    return NextResponse.json({ ok: true, imported: rows.length });
  } catch {
    return errorResponse("Befintliga artiklar kunde inte importeras. Kör CMS-migrationen i Neon.", 503);
  }
}
