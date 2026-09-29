import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";
import { sendWhatsAppText } from "@/lib/whatsapp";

const idSchema = z.string().uuid();
const updateSchema = z.object({
  body: z.string().trim().min(1).max(2000).optional(),
  status: z.enum(["new", "open", "waiting", "resolved"]).optional(),
  assignToSelf: z.boolean().optional(),
  markRead: z.boolean().optional(),
}).refine((update) => Object.values(update).some((value) => value !== undefined), "Tom uppdatering");

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Obehörig" }, { status: 401 });

  const parsedId = idSchema.safeParse((await params).id);
  const parsedUpdate = updateSchema.safeParse(await request.json().catch(() => null));
  if (!parsedId.success || !parsedUpdate.success) {
    return NextResponse.json({ error: "Ogiltig begäran." }, { status: 400 });
  }

  const id = parsedId.data;
  const update = parsedUpdate.data;
  const sql = getSql();

  try {
    const rows = await sql`
      select wa_id, last_inbound_at, assigned_to
      from whatsapp_conversations
      where id = ${id}::uuid
      limit 1
    ` as Array<{ wa_id: string; last_inbound_at: string | null; assigned_to: string | null }>;
    const conversation = rows[0];
    if (!conversation) return NextResponse.json({ error: "Konversationen hittades inte." }, { status: 404 });

    if (update.body) {
      const lastInbound = conversation.last_inbound_at ? new Date(conversation.last_inbound_at).getTime() : 0;
      const withinServiceWindow = Date.now() - lastInbound <= 24 * 60 * 60 * 1000;
      if (!withinServiceWindow) {
        return NextResponse.json(
          { error: "24-timmarsfönstret har gått ut. Då kräver WhatsApp en godkänd meddelandemall." },
          { status: 409 },
        );
      }

      const externalId = await sendWhatsAppText(conversation.wa_id, update.body);
      await sql`
        insert into whatsapp_messages (
          conversation_id, whatsapp_message_id, direction, message_type, body,
          delivery_status, read_by_staff, sent_by
        ) values (
          ${id}::uuid, ${externalId}, 'outbound', 'text', ${update.body},
          'sent', true, ${session.id}::uuid
        )
      `;
      await sql`
        update whatsapp_conversations
        set status = 'open', assigned_to = coalesce(assigned_to, ${session.id}::uuid), updated_at = now()
        where id = ${id}::uuid
      `;
    }

    if (update.assignToSelf) {
      await sql`
        update whatsapp_conversations
        set assigned_to = ${session.id}::uuid, status = 'open', updated_at = now()
        where id = ${id}::uuid
      `;
    }
    if (update.status) {
      await sql`
        update whatsapp_conversations set status = ${update.status}, updated_at = now()
        where id = ${id}::uuid
      `;
    }
    if (update.markRead) {
      await sql`
        update whatsapp_messages set read_by_staff = true, updated_at = now()
        where conversation_id = ${id}::uuid and direction = 'inbound'
      `;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.startsWith("Meta ") || message.startsWith("WhatsApp-") || message.includes("WHATSAPP_")) {
      return NextResponse.json({ error: message }, { status: 502 });
    }
    return NextResponse.json({ error: "WhatsApp-konversationen kunde inte uppdateras." }, { status: 503 });
  }
}
