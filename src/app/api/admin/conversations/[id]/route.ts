import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

const updateSchema = z.object({
  body: z.string().trim().min(1).max(2000).optional(),
  status: z.enum(["new", "open", "waiting", "resolved"]).optional(),
  assignToSelf: z.boolean().optional(),
  markRead: z.boolean().optional(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Obehörig" }, { status: 401 });
  try {
    const id = z.string().uuid().parse((await params).id);
    const update = updateSchema.parse(await request.json());
    const sql = getSql();
    if (update.assignToSelf) {
      await sql`update chat_conversations set assigned_to = ${session.id}::uuid, status = 'open', updated_at = now() where id = ${id}::uuid`;
    }
    if (update.status) {
      await sql`update chat_conversations set status = ${update.status}, updated_at = now() where id = ${id}::uuid`;
    }
    if (update.markRead) {
      await sql`update chat_messages set read_by_staff = true where conversation_id = ${id}::uuid and sender = 'visitor'`;
    }
    if (update.body) {
      await sql`
        insert into chat_messages (conversation_id, sender, sender_name, body, read_by_staff)
        values (${id}::uuid, 'employee', ${session.name}, ${update.body}, true)
      `;
      await sql`update chat_conversations set status = 'open', updated_at = now() where id = ${id}::uuid`;
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Kunde inte uppdatera chatten." }, { status: 400 });
  }
}
