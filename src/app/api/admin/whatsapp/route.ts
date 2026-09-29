import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";
import { getWhatsAppConfiguration } from "@/lib/whatsapp";

function configurationStatus() {
  return getWhatsAppConfiguration().status;
}

export async function GET(request: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Obehörig" }, { status: 401 });

  try {
    const sql = getSql();
    const unreadRows = await sql`
      select count(*)::int as count
      from whatsapp_messages
      where direction = 'inbound' and read_by_staff = false
    ` as Array<{ count: number }>;
    const unreadCount = Number(unreadRows[0]?.count ?? 0);

    if (new URL(request.url).searchParams.get("summary") === "1") {
      return NextResponse.json(
        { unreadCount, configuration: configurationStatus() },
        { headers: { "Cache-Control": "private, no-store" } },
      );
    }

    const conversations = await sql`
      select
        c.id,
        c.wa_id,
        c.display_name,
        c.status,
        c.assigned_to,
        assigned.name as assigned_to_name,
        c.last_inbound_at,
        c.created_at,
        c.updated_at,
        coalesce(
          json_agg(
            json_build_object(
              'id', m.id,
              'whatsapp_message_id', m.whatsapp_message_id,
              'direction', m.direction,
              'message_type', m.message_type,
              'body', m.body,
              'delivery_status', m.delivery_status,
              'read_by_staff', m.read_by_staff,
              'sender_name', sender.name,
              'created_at', m.created_at
            ) order by m.created_at
          ) filter (where m.id is not null),
          '[]'::json
        ) as messages
      from whatsapp_conversations c
      left join whatsapp_messages m on m.conversation_id = c.id
      left join admin_users assigned on assigned.id = c.assigned_to
      left join admin_users sender on sender.id = m.sent_by
      group by c.id, assigned.name
      order by c.updated_at desc
      limit 100
    `;

    return NextResponse.json(
      { conversations, unreadCount, configuration: configurationStatus() },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    if ((error as { code?: string }).code === "42P01") {
      return NextResponse.json({
        conversations: [],
        unreadCount: 0,
        configuration: configurationStatus(),
        migrationRequired: true,
      }, { headers: { "Cache-Control": "private, no-store" } });
    }
    return NextResponse.json({ error: "WhatsApp-inkorgen kunde inte läsas just nu." }, { status: 503 });
  }
}
