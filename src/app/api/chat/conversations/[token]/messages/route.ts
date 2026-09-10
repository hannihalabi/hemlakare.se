import { NextResponse } from "next/server";
import { z } from "zod";
import { getSql } from "@/lib/db";

const bodySchema = z.object({ body: z.string().trim().min(1).max(2000) });

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  try {
    const token = z.string().uuid().parse((await params).token);
    const { body } = bodySchema.parse(await request.json());
    const sql = getSql();
    const conversations = await sql`select id, visitor_name from chat_conversations where public_token = ${token} limit 1`;
    const conversation = conversations[0];
    if (!conversation) return NextResponse.json({ error: "Chatten hittades inte." }, { status: 404 });
    const messages = await sql`
      insert into chat_messages (conversation_id, sender, sender_name, body, read_by_staff)
      values (${conversation.id}, 'visitor', ${conversation.visitor_name}, ${body}, false)
      returning id, sender, sender_name, body, created_at
    `;
    await sql`update chat_conversations set status = case when status = 'resolved' then 'open' else status end, updated_at = now() where id = ${conversation.id}`;
    return NextResponse.json({ message: messages[0] }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Kunde inte skicka meddelandet." }, { status: 400 });
  }
}
