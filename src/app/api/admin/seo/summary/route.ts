import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET() {
  if (!(await getAdminSession())) return errorResponse("Obehörig", 401);
  try {
    const sql = getSql();
    const [statusRows, totalsRows, pages, recentMetrics] = await Promise.all([
      sql`select status, count(*)::int as count from content_items group by status order by status`,
      sql`
        select coalesce(sum(impressions), 0)::int as impressions,
          coalesce(sum(clicks), 0)::int as clicks,
          coalesce(sum(conversions), 0)::int as conversions,
          case when coalesce(sum(impressions), 0) = 0 then 0
            else round((sum(clicks)::numeric / sum(impressions)::numeric) * 100, 2) end as ctr,
          case when coalesce(sum(clicks), 0) = 0 then 0
            else round((sum(conversions)::numeric / sum(clicks)::numeric) * 100, 2) end as conversion_rate
        from content_metrics
        where metric_date >= current_date - interval '90 days'
      `,
      sql`
        select c.id, c.slug, c.title, c.status, c.target_query,
          m.metric_date, m.impressions, m.clicks, m.ctr, m.average_position, m.conversions, m.conversion_rate
        from content_items c
        left join lateral (
          select * from content_metrics m where m.content_id = c.id order by m.metric_date desc limit 1
        ) m on true
        order by coalesce(m.clicks, 0) desc, c.updated_at desc
        limit 100
      `,
      sql`
        select metric_date, coalesce(sum(impressions), 0)::int as impressions,
          coalesce(sum(clicks), 0)::int as clicks, coalesce(sum(conversions), 0)::int as conversions
        from content_metrics
        where metric_date >= current_date - interval '30 days'
        group by metric_date order by metric_date asc
      `,
    ]);
    return NextResponse.json({ statusCounts: statusRows, totals: totalsRows[0] ?? { impressions: 0, clicks: 0, conversions: 0, ctr: 0, conversion_rate: 0 }, pages, recentMetrics });
  } catch {
    return errorResponse("SEO-statistik kunde inte hämtas. Kör CMS-migrationen i Neon.", 503);
  }
}
