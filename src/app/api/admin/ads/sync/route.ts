import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { adsConfigured, fetchAdsReport } from "@/lib/ads-providers";
import { adsRange, saveAdsReport, saveAdsSyncError } from "@/lib/ads-server";
import { adPlatforms } from "@/lib/ads-types";

export const maxDuration = 60;

const requestSchema = z.object({ platform: z.enum(adPlatforms).optional() });

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Obehörig" }, { status: 401 });
  if (session.role !== "admin" && session.role !== "editor") {
    return NextResponse.json({ error: "Du saknar rättighet att synkronisera annonser." }, { status: 403 });
  }
  const parsed = requestSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Ogiltig plattform." }, { status: 400 });
  const platforms = parsed.data.platform ? [parsed.data.platform] : adPlatforms.filter(adsConfigured);
  if (platforms.length === 0) {
    return NextResponse.json({ error: "Inget annonskonto är anslutet." }, { status: 409 });
  }
  const range = adsRange(90);
  const results = await Promise.all(platforms.map(async (platform) => {
    try {
      const rows = await fetchAdsReport(platform, range);
      if (rows.some((row) => !/^\d{4}-\d{2}-\d{2}$/.test(row.date) || !row.campaignId || !/^[A-Z]{3}$/.test(row.currency))) {
        throw new Error(`${platform}: Rapporten innehöll ofullständiga rader.`);
      }
      await saveAdsReport(platform, rows, range);
      return { platform, status: "success" as const, rows: rows.length };
    } catch (error) {
      const message = error instanceof Error ? error.message : `${platform}: Synkroniseringen misslyckades.`;
      await saveAdsSyncError(platform, message).catch(() => undefined);
      return { platform, status: "error" as const, error: message };
    }
  }));
  return NextResponse.json({ results }, { status: results.some((result) => result.status === "error") ? 207 : 200 });
}
