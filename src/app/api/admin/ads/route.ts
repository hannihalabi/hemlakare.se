import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getAdsDashboard } from "@/lib/ads-server";

export async function GET(request: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Obehörig" }, { status: 401 });
  const daysValue = new URL(request.url).searchParams.get("days") ?? "30";
  if (!["7", "30", "90"].includes(daysValue)) {
    return NextResponse.json({ error: "Välj 7, 30 eller 90 dagar." }, { status: 400 });
  }
  try {
    return NextResponse.json(await getAdsDashboard(Number(daysValue) as 7 | 30 | 90), {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Annonsdata kunde inte läsas. Kör migration 0011_ads_reporting.sql." }, { status: 503 });
  }
}
