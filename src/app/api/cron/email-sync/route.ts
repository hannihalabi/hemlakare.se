import { NextResponse } from "next/server";
import { syncOneComInbox } from "@/lib/email-provider";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Obehörig" }, { status: 401 });
  }

  try {
    return NextResponse.json(await syncOneComInbox());
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Synkroniseringen misslyckades." },
      { status: 502 },
    );
  }
}
