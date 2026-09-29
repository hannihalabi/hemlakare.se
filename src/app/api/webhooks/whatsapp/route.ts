import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import {
  getWhatsAppConfiguration,
  verifyWhatsAppSignature,
  whatsappMessageBody,
} from "@/lib/whatsapp";

type WebhookValue = {
  contacts?: Array<{ wa_id?: string; profile?: { name?: string } }>;
  messages?: Array<Record<string, unknown>>;
  statuses?: Array<{ id?: string; status?: string }>;
};

type WebhookPayload = {
  entry?: Array<{ changes?: Array<{ value?: WebhookValue }> }>;
};

const deliveryStatuses = new Set(["queued", "sent", "delivered", "read", "failed"]);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  const { verifyToken } = getWhatsAppConfiguration();

  if (mode === "subscribe" && challenge && verifyToken && token === verifyToken) {
    return new Response(challenge, { status: 200, headers: { "Content-Type": "text/plain" } });
  }
  return NextResponse.json({ error: "Verifiering misslyckades." }, { status: 403 });
}

export async function POST(request: Request) {
  const rawBody = new Uint8Array(await request.arrayBuffer());
  if (!verifyWhatsAppSignature(rawBody, request.headers.get("x-hub-signature-256"))) {
    return NextResponse.json({ error: "Ogiltig signatur." }, { status: 401 });
  }

  try {
    const payload = JSON.parse(Buffer.from(rawBody).toString("utf8")) as WebhookPayload;
    const sql = getSql();

    for (const entry of payload.entry ?? []) {
      for (const change of entry.changes ?? []) {
        const value = change.value;
        if (!value) continue;

        const contactNames = new Map(
          (value.contacts ?? [])
            .filter((contact): contact is { wa_id: string; profile?: { name?: string } } => Boolean(contact.wa_id))
            .map((contact) => [contact.wa_id, contact.profile?.name?.trim() || "WhatsApp-kontakt"]),
        );

        for (const message of value.messages ?? []) {
          const messageId = typeof message.id === "string" ? message.id : null;
          const waId = typeof message.from === "string" ? message.from : null;
          if (!messageId || !waId) continue;

          const rawTimestamp = typeof message.timestamp === "string" ? Number(message.timestamp) : NaN;
          const receivedAt = Number.isFinite(rawTimestamp) ? new Date(rawTimestamp * 1000) : new Date();
          const { type, body } = whatsappMessageBody(message);
          const displayName = contactNames.get(waId) ?? "WhatsApp-kontakt";

          const conversations = await sql`
            insert into whatsapp_conversations (wa_id, display_name, last_inbound_at, updated_at)
            values (${waId}, ${displayName}, ${receivedAt}, ${receivedAt})
            on conflict (wa_id) do update set
              display_name = excluded.display_name,
              status = case when whatsapp_conversations.status = 'resolved' then 'new' else whatsapp_conversations.status end,
              last_inbound_at = greatest(coalesce(whatsapp_conversations.last_inbound_at, excluded.last_inbound_at), excluded.last_inbound_at),
              updated_at = greatest(whatsapp_conversations.updated_at, excluded.updated_at)
            returning id
          ` as Array<{ id: string }>;
          const conversationId = conversations[0]?.id;
          if (!conversationId) continue;

          await sql`
            insert into whatsapp_messages (
              conversation_id, whatsapp_message_id, direction, message_type, body,
              delivery_status, read_by_staff, created_at, updated_at
            ) values (
              ${conversationId}::uuid, ${messageId}, 'inbound', ${type}, ${body},
              'received', false, ${receivedAt}, ${receivedAt}
            )
            on conflict (whatsapp_message_id) do nothing
          `;
        }

        for (const statusUpdate of value.statuses ?? []) {
          if (!statusUpdate.id || !statusUpdate.status || !deliveryStatuses.has(statusUpdate.status)) continue;
          await sql`
            update whatsapp_messages
            set delivery_status = ${statusUpdate.status}, updated_at = now()
            where whatsapp_message_id = ${statusUpdate.id}
          `;
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("WhatsApp-webhooken kunde inte behandlas:", error instanceof Error ? error.message : "okänt fel");
    return NextResponse.json({ error: "Webhooken kunde inte behandlas." }, { status: 500 });
  }
}
