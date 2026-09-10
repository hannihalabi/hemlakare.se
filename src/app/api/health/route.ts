import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

export async function GET() {
  try {
    await getSql()`select 1`;
    return NextResponse.json({ ok: true, service: "hemlakare-api" });
  } catch {
    return NextResponse.json({ ok: false, error: "Database unavailable" }, { status: 503 });
  }
}
