import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { emailConfigured, getEmailDashboard } from "@/lib/email-server";

const statusSchema = z.enum(["new", "open", "resolved"]);

export async function GET(request: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Obehörig" }, { status: 401 });
  const rawStatus = new URL(request.url).searchParams.get("status");
  const parsedStatus = rawStatus ? statusSchema.safeParse(rawStatus) : null;
  if (parsedStatus && !parsedStatus.success) {
    return NextResponse.json({ error: "Ogiltigt filter." }, { status: 400 });
  }

  try {
    return NextResponse.json(await getEmailDashboard(parsedStatus?.data), {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    if ((error as { code?: string }).code === "42P01") {
      return NextResponse.json({
        configured: emailConfigured(),
        migrationRequired: true,
        lastSyncAt: null,
        lastError: null,
        unreadCount: 0,
        messages: [],
      }, { headers: { "Cache-Control": "private, no-store" } });
    }
    return NextResponse.json(
      { error: "E-postdata kunde inte läsas just nu." },
      { status: 503 },
    );
  }
}
