import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { syncOneComInbox } from "@/lib/email-provider";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Obehörig" }, { status: 401 });
  if (!["admin", "editor"].includes(session.role)) {
    return NextResponse.json({ error: "Du saknar behörighet att synkronisera." }, { status: 403 });
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
