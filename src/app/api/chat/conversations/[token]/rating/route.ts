import { NextResponse } from "next/server";
import { z } from "zod";
import { getSql } from "@/lib/db";

const bodySchema = z.object({ satisfaction: z.enum(["yes", "no"]) });

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  try {
    const token = z.string().uuid().parse((await params).token);
    const { satisfaction } = bodySchema.parse(await request.json());
    const sql = getSql();
    await sql`update chat_conversations set satisfaction = ${satisfaction}, updated_at = now() where public_token = ${token}`;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Kunde inte registrera omdömet." }, { status: 400 });
  }
}
