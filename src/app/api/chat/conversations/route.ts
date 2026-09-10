import { NextResponse } from "next/server";
import { z } from "zod";
import { getSql } from "@/lib/db";

const createSchema = z.object({
  visitorName: z.string().trim().min(1).max(80),
  topic: z.enum(["Boka eller omboka", "Priser och betalning", "Så fungerar tjänsten", "Annat"]),
  source: z.string().trim().min(1).max(120).optional(),
});

export async function POST(request: Request) {
  try {
    const { visitorName, topic, source } = createSchema.parse(await request.json());
    const sql = getSql();
    const suffix = Math.floor(1000 + Math.random() * 9000);
    const rows = await sql`
      insert into chat_conversations (reference, visitor_name, topic, source)
      values (${`#${suffix}`}, ${visitorName}, ${topic}, ${source ?? "Webb"})
      returning id, public_token, reference, visitor_name, topic, status, source, created_at, updated_at
    `;
    const conversation = rows[0];
    await sql`
      insert into chat_messages (conversation_id, sender, sender_name, body, read_by_staff)
      values (${conversation.id}, 'system', 'Hemläkare', 'Tack! En medarbetare ansluter snart.', true)
    `;
    return NextResponse.json({ publicToken: conversation.public_token, conversation }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Kunde inte starta chatten." }, { status: 400 });
  }
}
