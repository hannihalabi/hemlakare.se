export const adPlatforms = ["google", "meta", "tiktok"] as const;
export type AdPlatform = (typeof adPlatforms)[number];

export const adPlatformNames: Record<AdPlatform, string> = {
  google: "Google Ads",
  meta: "Meta Ads",
  tiktok: "TikTok Ads",
};

export type AdsMetricRow = {
  platform: AdPlatform;
  accountId: string;
  campaignId: string;
  campaignName: string;
  date: string;
  currency: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number | null;
  conversionValue: number | null;
};

export type AdsConnection = {
  platform: AdPlatform;
  configured: boolean;
  status: "not_configured" | "ready" | "success" | "error";
  lastSyncAt: string | null;
  lastError: string | null;
};

export type AdsSummary = {
  currency: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number | null;
  conversionValue: number | null;
};

export type AdsDashboard = {
  from: string;
  to: string;
  connections: AdsConnection[];
  summaries: Array<{ platform: AdPlatform; summary: AdsSummary }>;
  campaigns: Array<{ platform: AdPlatform; accountId: string; campaignId: string; campaignName: string; summary: AdsSummary }>;
  daily: Array<{ date: string; platform: AdPlatform; summary: AdsSummary }>;
};
