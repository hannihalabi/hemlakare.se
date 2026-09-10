import { NextResponse } from "next/server";
import { z } from "zod";
import { getSql } from "@/lib/db";

const tokenSchema = z.string().uuid();

export async function GET(_: Request, { params }: { params: Promise<{ token: string }> }) {
  try {
    const token = tokenSchema.parse((await params).token);
    const sql = getSql();
    const rows = await sql`
      select c.id, c.public_token, c.reference, c.visitor_name, c.topic, c.status, c.source, c.satisfaction, c.created_at, c.updated_at,
        coalesce(json_agg(json_build_object('id', m.id, 'sender', m.sender, 'senderName', m.sender_name, 'body', m.body, 'createdAt', m.created_at) order by m.created_at) filter (where m.id is not null), '[]') as messages
      from chat_conversations c left join chat_messages m on m.conversation_id = c.id
      where c.public_token = ${token} group by c.id
    `;
    if (!rows[0]) return NextResponse.json({ error: "Chatten hittades inte." }, { status: 404 });
    return NextResponse.json({ conversation: rows[0] });
  } catch {
    return NextResponse.json({ error: "Ogiltig chattlänk." }, { status: 400 });
  }
}
