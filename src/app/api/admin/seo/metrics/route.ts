import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { canManageContent } from "@/lib/content-types";
import { getSql } from "@/lib/db";

const metricSchema = z.object({
  contentId: z.string().uuid(),
  metricDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  impressions: z.coerce.number().int().min(0).max(100_000_000),
  clicks: z.coerce.number().int().min(0).max(100_000_000),
  ctr: z.coerce.number().min(0).max(100),
  averagePosition: z.coerce.number().min(0).max(10_000),
  conversions: z.coerce.number().int().min(0).max(100_000_000),
  conversionRate: z.coerce.number().min(0).max(100),
});

const importSchema = z.object({ metrics: z.array(metricSchema).min(1).max(500) });

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return errorResponse("Obehörig", 401);
  if (!canManageContent(session.role)) return errorResponse("Du saknar rättighet att importera statistik.", 403);
  try {
    const { metrics } = importSchema.parse(await request.json());
    const sql = getSql();
    for (const metric of metrics) {
      await sql`
        insert into content_metrics (
          content_id, metric_date, impressions, clicks, ctr, average_position, conversions, conversion_rate, updated_at
        ) values (
          ${metric.contentId}::uuid, ${metric.metricDate}::date, ${metric.impressions}, ${metric.clicks}, ${metric.ctr},
          ${metric.averagePosition}, ${metric.conversions}, ${metric.conversionRate}, now()
        ) on conflict (content_id, metric_date) do update set
          impressions = excluded.impressions, clicks = excluded.clicks, ctr = excluded.ctr,
          average_position = excluded.average_position, conversions = excluded.conversions,
          conversion_rate = excluded.conversion_rate, updated_at = now()
      `;
    }
    await sql`
      insert into audit_events (actor_id, action, entity_type, metadata)
      values (${session.id}::uuid, 'seo_metrics_imported', 'content_metrics', ${JSON.stringify({ count: metrics.length })}::jsonb)
    `;
    return NextResponse.json({ ok: true, imported: metrics.length });
  } catch (caught) {
    if (caught instanceof z.ZodError) return errorResponse(caught.issues[0]?.message ?? "Ogiltig statistikdata.");
    return errorResponse("Kunde inte importera statistik.", 503);
  }
}
