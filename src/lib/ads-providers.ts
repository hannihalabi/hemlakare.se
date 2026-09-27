import "server-only";
import { adPlatforms, type AdPlatform, type AdsMetricRow } from "@/lib/ads-types";

type DateRange = { from: string; to: string };
type JsonObject = Record<string, unknown>;

const numberValue = (value: unknown) => {
  const result = Number(value);
  return Number.isFinite(result) && result >= 0 ? result : 0;
};

const objectValue = (value: unknown): JsonObject =>
  value !== null && typeof value === "object" && !Array.isArray(value) ? value as JsonObject : {};

const stringValue = (value: unknown) => typeof value === "string" ? value : String(value ?? "");

export function adsConfigured(platform: AdPlatform) {
  const required: Record<AdPlatform, string[]> = {
    google: ["GOOGLE_ADS_CLIENT_ID", "GOOGLE_ADS_CLIENT_SECRET", "GOOGLE_ADS_REFRESH_TOKEN", "GOOGLE_ADS_CUSTOMER_ID"],
    meta: ["META_ADS_ACCESS_TOKEN", "META_ADS_ACCOUNT_ID"],
    tiktok: ["TIKTOK_ADS_ACCESS_TOKEN", "TIKTOK_ADS_ADVERTISER_ID", "TIKTOK_ADS_CURRENCY"],
  };
  return required[platform].every((key) => Boolean(process.env[key]?.trim()));
}

export function adsConfigStatus() {
  return adPlatforms.map((platform) => ({ platform, configured: adsConfigured(platform) }));
}

async function readJson(response: Response, platform: AdPlatform): Promise<JsonObject> {
  if (!response.ok) throw new Error(`${platform}: API-anropet misslyckades (HTTP ${response.status}).`);
  try {
    return objectValue(await response.json());
  } catch {
    throw new Error(`${platform}: API:et skickade ett ogiltigt svar.`);
  }
}

async function fetchGoogle(range: DateRange): Promise<AdsMetricRow[]> {
  const accountId = process.env.GOOGLE_ADS_CUSTOMER_ID!.replaceAll("-", "");
  if (!/^\d{10}$/.test(accountId)) throw new Error("google: Kund-ID måste vara tio siffror.");

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
    }),
    signal: AbortSignal.timeout(15_000),
    cache: "no-store",
  });
  const token = await readJson(tokenResponse, "google");
  if (typeof token.access_token !== "string") throw new Error("google: OAuth gav ingen åtkomsttoken.");

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token.access_token}`,
    "Content-Type": "application/json",
  };
  if (process.env.GOOGLE_ADS_DEVELOPER_TOKEN) headers["developer-token"] = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  if (process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID) headers["login-customer-id"] = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID.replaceAll("-", "");

  const query = `SELECT segments.date, campaign.id, campaign.name, customer.currency_code, metrics.cost_micros, metrics.impressions, metrics.clicks, metrics.conversions, metrics.conversions_value FROM campaign WHERE segments.date BETWEEN '${range.from}' AND '${range.to}'`;
  const response = await fetch(`https://googleads.googleapis.com/v25/customers/${accountId}/googleAds:searchStream`, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
    signal: AbortSignal.timeout(25_000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`google: Rapporten kunde inte hämtas (HTTP ${response.status}).`);
  const batches = await response.json() as Array<{ results?: JsonObject[] }>;
  if (!Array.isArray(batches)) throw new Error("google: Rapportformatet var ogiltigt.");
  return batches.flatMap((batch) => batch.results ?? []).map((item) => {
    const campaign = objectValue(item.campaign);
    const segments = objectValue(item.segments);
    const customer = objectValue(item.customer);
    const metrics = objectValue(item.metrics);
    return {
      platform: "google" as const,
      accountId,
      campaignId: stringValue(campaign.id),
      campaignName: stringValue(campaign.name) || stringValue(campaign.id),
      date: stringValue(segments.date),
      currency: stringValue(customer.currencyCode),
      spend: numberValue(metrics.costMicros) / 1_000_000,
      impressions: numberValue(metrics.impressions),
      clicks: numberValue(metrics.clicks),
      conversions: numberValue(metrics.conversions),
      conversionValue: numberValue(metrics.conversionsValue),
    };
  });
}

async function fetchMeta(range: DateRange): Promise<AdsMetricRow[]> {
  const accountId = process.env.META_ADS_ACCOUNT_ID!.replace(/^act_/, "");
  if (!/^\d+$/.test(accountId)) throw new Error("meta: Ogiltigt annonskonto-ID.");
  const base = `https://graph.facebook.com/v26.0/act_${accountId}`;
  const token = process.env.META_ADS_ACCESS_TOKEN!;
  const accountUrl = new URL(base);
  accountUrl.searchParams.set("fields", "currency");
  const account = await readJson(await fetch(accountUrl, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(15_000),
    cache: "no-store",
  }), "meta");
  const currency = stringValue(account.currency);
  if (!/^[A-Z]{3}$/.test(currency)) throw new Error("meta: Kontots valuta saknas.");

  const reportUrl = new URL(`${base}/insights`);
  reportUrl.searchParams.set("fields", "campaign_id,campaign_name,date_start,spend,impressions,clicks,actions,action_values");
  reportUrl.searchParams.set("level", "campaign");
  reportUrl.searchParams.set("time_increment", "1");
  reportUrl.searchParams.set("time_range", JSON.stringify({ since: range.from, until: range.to }));
  reportUrl.searchParams.set("limit", "500");

  const rows: AdsMetricRow[] = [];
  let next: string | null = reportUrl.toString();
  for (let page = 0; next && page < 30; page += 1) {
    const url: URL = new URL(next);
    if (url.hostname !== "graph.facebook.com") throw new Error("meta: Ogiltig sidlänk från API:et.");
    const payload: JsonObject = await readJson(await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    }), "meta");
    const data = Array.isArray(payload.data) ? payload.data : [];
    const selectedAction = process.env.META_ADS_CONVERSION_ACTION;
    for (const raw of data) {
      const item = objectValue(raw);
      const action = selectedAction && Array.isArray(item.actions)
        ? item.actions.map(objectValue).find((entry) => entry.action_type === selectedAction)
        : undefined;
      const actionValue = selectedAction && Array.isArray(item.action_values)
        ? item.action_values.map(objectValue).find((entry) => entry.action_type === selectedAction)
        : undefined;
      rows.push({
        platform: "meta",
        accountId,
        campaignId: stringValue(item.campaign_id),
        campaignName: stringValue(item.campaign_name) || stringValue(item.campaign_id),
        date: stringValue(item.date_start),
        currency,
        spend: numberValue(item.spend),
        impressions: numberValue(item.impressions),
        clicks: numberValue(item.clicks),
        conversions: selectedAction ? numberValue(action?.value) : null,
        conversionValue: selectedAction ? numberValue(actionValue?.value) : null,
      });
    }
    const paging = objectValue(payload.paging);
    next = typeof paging.next === "string" ? paging.next : null;
    if (next && page === 29) throw new Error("meta: Rapporten innehåller fler sidor än synkroniseringen kan läsa.");
  }
  return rows;
}

async function fetchTikTok(range: DateRange): Promise<AdsMetricRow[]> {
  const accountId = process.env.TIKTOK_ADS_ADVERTISER_ID!;
  if (!/^\d+$/.test(accountId)) throw new Error("tiktok: Ogiltigt annonsörs-ID.");
  const currency = process.env.TIKTOK_ADS_CURRENCY!.toUpperCase();
  if (!/^[A-Z]{3}$/.test(currency)) throw new Error("tiktok: Ange en valutakod med tre bokstäver.");
  const rows: AdsMetricRow[] = [];
  for (let page = 1; page <= 30; page += 1) {
    const url = new URL("https://business-api.tiktok.com/open_api/v1.3/report/integrated/get/");
    url.searchParams.set("advertiser_id", accountId);
    url.searchParams.set("report_type", "BASIC");
    url.searchParams.set("data_level", "AUCTION_CAMPAIGN");
    url.searchParams.set("dimensions", JSON.stringify(["campaign_id", "stat_time_day"]));
    url.searchParams.set("metrics", JSON.stringify(["spend", "impressions", "clicks", "conversion"]));
    url.searchParams.set("start_date", range.from);
    url.searchParams.set("end_date", range.to);
    url.searchParams.set("page", String(page));
    url.searchParams.set("page_size", "1000");
    const payload = await readJson(await fetch(url, {
      headers: { "Access-Token": process.env.TIKTOK_ADS_ACCESS_TOKEN! },
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    }), "tiktok");
    if (Number(payload.code) !== 0) throw new Error(`tiktok: Rapporten kunde inte hämtas (kod ${numberValue(payload.code)}).`);
    const data = objectValue(payload.data);
    const list = Array.isArray(data.list) ? data.list : [];
    for (const raw of list) {
      const item = objectValue(raw);
      const dimensions = objectValue(item.dimensions);
      const metrics = objectValue(item.metrics);
      const campaignId = stringValue(dimensions.campaign_id);
      rows.push({
        platform: "tiktok",
        accountId,
        campaignId,
        campaignName: campaignId,
        date: stringValue(dimensions.stat_time_day).slice(0, 10),
        currency,
        spend: numberValue(metrics.spend),
        impressions: numberValue(metrics.impressions),
        clicks: numberValue(metrics.clicks),
        conversions: metrics.conversion == null ? null : numberValue(metrics.conversion),
        conversionValue: null,
      });
    }
    const pageInfo = objectValue(data.page_info);
    const totalPage = numberValue(pageInfo.total_page);
    if (page >= totalPage || list.length === 0) return rows;
  }
  throw new Error("tiktok: Rapporten innehåller fler sidor än synkroniseringen kan läsa.");
}

export async function fetchAdsReport(platform: AdPlatform, range: DateRange) {
  if (!adsConfigured(platform)) throw new Error(`${platform}: API-uppgifter saknas.`);
  if (platform === "google") return fetchGoogle(range);
  if (platform === "meta") return fetchMeta(range);
  return fetchTikTok(range);
}
