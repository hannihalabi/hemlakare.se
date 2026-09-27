import "server-only";
import { adsConfigStatus } from "@/lib/ads-providers";
import { adPlatforms, type AdPlatform, type AdsConnection, type AdsDashboard, type AdsMetricRow, type AdsSummary } from "@/lib/ads-types";
import { getSql } from "@/lib/db";

function localDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Stockholm", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

export function adsRange(days: 7 | 30 | 90) {
  const today = localDate(new Date());
  const from = new Date(`${today}T00:00:00Z`);
  from.setUTCDate(from.getUTCDate() - days + 1);
  return { from: from.toISOString().slice(0, 10), to: today };
}

function summary(currency: string): AdsSummary {
  return { currency, spend: 0, impressions: 0, clicks: 0, conversions: null, conversionValue: null };
}

function addMetric(total: AdsSummary, row: AdsMetricRow) {
  total.spend += row.spend;
  total.impressions += row.impressions;
  total.clicks += row.clicks;
  if (row.conversions !== null) total.conversions = (total.conversions ?? 0) + row.conversions;
  if (row.conversionValue !== null) total.conversionValue = (total.conversionValue ?? 0) + row.conversionValue;
}

function mapRow(row: Record<string, unknown>): AdsMetricRow {
  return {
    platform: String(row.platform) as AdPlatform,
    accountId: String(row.account_id),
    campaignId: String(row.campaign_id),
    campaignName: String(row.campaign_name),
    date: String(row.metric_date).slice(0, 10),
    currency: String(row.currency),
    spend: Number(row.spend),
    impressions: Number(row.impressions),
    clicks: Number(row.clicks),
    conversions: row.conversions === null ? null : Number(row.conversions),
    conversionValue: row.conversion_value === null ? null : Number(row.conversion_value),
  };
}

export async function getAdsDashboard(days: 7 | 30 | 90): Promise<AdsDashboard> {
  const { from, to } = adsRange(days);
  const sql = getSql();
  const [metricRows, runRows] = await Promise.all([
    sql`select platform, account_id, campaign_id, campaign_name, metric_date::text, currency,
      spend, impressions, clicks, conversions, conversion_value
      from ads_daily_metrics where metric_date between ${from}::date and ${to}::date
      order by metric_date desc`,
    sql`select distinct on (platform) platform, status, error_message, completed_at
      from ads_sync_runs order by platform, completed_at desc`,
  ]);
  const rows = (metricRows as Record<string, unknown>[]).map(mapRow);
  const lastRuns = new Map((runRows as Record<string, unknown>[]).map((row) => [String(row.platform), row]));
  const connections: AdsConnection[] = adsConfigStatus().map(({ platform, configured }) => {
    const run = lastRuns.get(platform);
    return {
      platform,
      configured,
      status: !configured ? "not_configured" : !run ? "ready" : run.status === "success" ? "success" : "error",
      lastSyncAt: run?.completed_at ? new Date(String(run.completed_at)).toISOString() : null,
      lastError: run?.status === "error" ? String(run.error_message ?? "Synkroniseringen misslyckades.") : null,
    };
  });
  const summaryMap = new Map<string, { platform: AdPlatform; summary: AdsSummary }>();
  const campaignMap = new Map<string, { platform: AdPlatform; accountId: string; campaignId: string; campaignName: string; summary: AdsSummary }>();
  const dailyMap = new Map<string, { date: string; platform: AdPlatform; summary: AdsSummary }>();
  for (const row of rows) {
    const platformKey = `${row.platform}:${row.currency}`;
    if (!summaryMap.has(platformKey)) summaryMap.set(platformKey, { platform: row.platform, summary: summary(row.currency) });
    addMetric(summaryMap.get(platformKey)!.summary, row);

    const campaignKey = `${row.platform}:${row.accountId}:${row.campaignId}:${row.currency}`;
    if (!campaignMap.has(campaignKey)) campaignMap.set(campaignKey, {
      platform: row.platform, accountId: row.accountId, campaignId: row.campaignId,
      campaignName: row.campaignName, summary: summary(row.currency),
    });
    addMetric(campaignMap.get(campaignKey)!.summary, row);

    const dailyKey = `${row.date}:${row.platform}:${row.currency}`;
    if (!dailyMap.has(dailyKey)) dailyMap.set(dailyKey, { date: row.date, platform: row.platform, summary: summary(row.currency) });
    addMetric(dailyMap.get(dailyKey)!.summary, row);
  }
  return {
    from,
    to,
    connections,
    summaries: adPlatforms.flatMap((platform) => [...summaryMap.values()].filter((item) => item.platform === platform)),
    campaigns: [...campaignMap.values()].sort((a, b) => b.summary.spend - a.summary.spend),
    daily: [...dailyMap.values()].sort((a, b) => a.date.localeCompare(b.date)),
  };
}

export async function saveAdsReport(platform: AdPlatform, rows: AdsMetricRow[], range: { from: string; to: string }) {
  const sql = getSql();
  const queries = [sql`delete from ads_daily_metrics
    where platform = ${platform} and metric_date between ${range.from}::date and ${range.to}::date`];
  for (let start = 0; start < rows.length; start += 100) {
    const batch = rows.slice(start, start + 100);
    const values: unknown[] = [];
    const placeholders = batch.map((row, index) => {
      values.push(row.platform, row.accountId, row.campaignId, row.campaignName, row.date,
        row.currency, row.spend, row.impressions, row.clicks, row.conversions, row.conversionValue);
      const offset = index * 11;
      return `(${Array.from({ length: 11 }, (_, field) => `$${offset + field + 1}`).join(", ")})`;
    });
    queries.push(sql.query(`insert into ads_daily_metrics (
      platform, account_id, campaign_id, campaign_name, metric_date, currency,
      spend, impressions, clicks, conversions, conversion_value
    ) values ${placeholders.join(", ")}`, values));
  }
  queries.push(sql`insert into ads_sync_runs (platform, status, row_count)
    values (${platform}, 'success', ${rows.length})`);
  await sql.transaction(queries);
}

export async function saveAdsSyncError(platform: AdPlatform, message: string) {
  const sql = getSql();
  await sql`insert into ads_sync_runs (platform, status, error_message)
    values (${platform}, 'error', ${message.slice(0, 500)})`;
}
