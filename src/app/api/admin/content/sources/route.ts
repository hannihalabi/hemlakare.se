import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { canManageSources } from "@/lib/content-types";
import { getSql } from "@/lib/db";

const sourceSchema = z.object({
  title: z.string().trim().min(1).max(180),
  url: z.string().trim().url().max(500),
  publisher: z.string().trim().max(160).default(""),
  sourceType: z.enum(["primary", "official", "research", "guideline", "other"]).default("official"),
  lastCheckedAt: z.string().datetime().nullable().optional(),
});

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET() {
  if (!(await getAdminSession())) return errorResponse("Obehörig", 401);
  try {
    const sql = getSql();
    const sources = await sql`
      select s.id, s.title, s.url, s.publisher, s.source_type, s.last_checked_at,
        count(l.content_id)::int as usage_count
      from content_sources s
      left join content_source_links l on l.source_id = s.id
      group by s.id
      order by s.updated_at desc, s.title asc
      limit 300
    `;
    return NextResponse.json({ sources });
  } catch {
    return errorResponse("Källbiblioteket kunde inte hämtas. Kör CMS-migrationen i Neon.", 503);
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return errorResponse("Obehörig", 401);
  if (!canManageSources(session.role)) return errorResponse("Du saknar rättighet att hantera källor.", 403);
  try {
    const payload = sourceSchema.parse(await request.json());
    const sql = getSql();
    const rows = await sql`
      insert into content_sources (title, url, publisher, source_type, last_checked_at, checked_by)
      values (${payload.title}, ${payload.url}, ${payload.publisher}, ${payload.sourceType}, ${payload.lastCheckedAt ?? null}::timestamptz, ${session.id}::uuid)
      on conflict (url) do update set
        title = excluded.title, publisher = excluded.publisher, source_type = excluded.source_type,
        last_checked_at = excluded.last_checked_at, checked_by = excluded.checked_by, updated_at = now()
      returning id, title, url, publisher, source_type, last_checked_at
    `;
    await sql`
      insert into audit_events (actor_id, action, entity_type, entity_id, metadata)
      values (${session.id}::uuid, 'source_upserted', 'content_source', ${String(rows[0].id)}, ${JSON.stringify({ url: payload.url })}::jsonb)
    `;
    return NextResponse.json({ source: rows[0] }, { status: 201 });
  } catch (caught) {
    if (caught instanceof z.ZodError) return errorResponse(caught.issues[0]?.message ?? "Ogiltig källa.");
    return errorResponse("Kunde inte spara källan.", 503);
  }
}
