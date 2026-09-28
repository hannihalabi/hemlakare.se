import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { getEmailDetail, updateEmail } from "@/lib/email-server";

const idSchema = z.string().uuid();
const patchSchema = z.object({
  status: z.enum(["new", "open", "resolved"]),
  assignToSelf: z.boolean().default(false),
});

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Obehörig" }, { status: 401 });
  const parsedId = idSchema.safeParse((await context.params).id);
  if (!parsedId.success) return NextResponse.json({ error: "Ogiltigt meddelande-ID." }, { status: 400 });

  const message = await getEmailDetail(parsedId.data, session.id);
  if (!message) return NextResponse.json({ error: "Mejlet hittades inte." }, { status: 404 });
  return NextResponse.json(message, { headers: { "Cache-Control": "private, no-store" } });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Obehörig" }, { status: 401 });
  const parsedId = idSchema.safeParse((await context.params).id);
  const body = patchSchema.safeParse(await request.json().catch(() => null));
  if (!parsedId.success || !body.success) {
    return NextResponse.json({ error: "Ogiltig begäran." }, { status: 400 });
  }

  await updateEmail(parsedId.data, session.id, body.data.status, body.data.assignToSelf);
  return NextResponse.json({ ok: true });
}
