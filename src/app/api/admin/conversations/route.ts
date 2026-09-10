import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

export async function GET() {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Obehörig" }, { status: 401 });
  try {
    const sql = getSql();
    const conversations = await sql`
      select c.*, a.name as assigned_to_name,
        coalesce(json_agg(m order by m.created_at) filter (where m.id is not null), '[]') as messages
      from chat_conversations c
      left join chat_messages m on m.conversation_id = c.id
      left join admin_users a on a.id = c.assigned_to
      group by c.id, a.name order by c.updated_at desc limit 100
    `;
    return NextResponse.json({ conversations });
  } catch {
    return NextResponse.json({ error: "Kunde inte hämta chattar" }, { status: 503 });
  }
}
