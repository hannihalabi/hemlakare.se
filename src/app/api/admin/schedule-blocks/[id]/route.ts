import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";
import { deleteBookingEvent, googleCalendarSyncEnabled } from "@/lib/google-calendar";

const idSchema = z.string().uuid();

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Obehörig" }, { status: 401 });
  const id = idSchema.safeParse((await params).id);
  if (!id.success) return NextResponse.json({ error: "Ogiltigt blockerings-ID." }, { status: 400 });

  const sql = getSql();
  try {
    const rows = await sql`delete from schedule_blocks where id = ${id.data}::uuid returning google_event_id`;
    if (rows.length === 0) return NextResponse.json({ error: "Blockeringen hittades inte." }, { status: 404 });

    let calendarWarning = false;
    const googleEventId = rows[0].google_event_id as string | null;
    if (googleEventId && googleCalendarSyncEnabled()) {
      try {
        await deleteBookingEvent(googleEventId);
      } catch (error) {
        calendarWarning = true;
        console.error("Blockeringen togs bort men Google-händelsen kunde inte raderas", id.data, error);
      }
    }

    try {
      await sql`
        insert into audit_events (actor_id, action, entity_type, entity_id)
        values (${session.id}::uuid, 'schedule_block_deleted', 'schedule_block', ${id.data})
      `;
    } catch (auditError) {
      console.error("Borttagningen kunde inte revisionsloggas", id.data, auditError);
    }

    return NextResponse.json({ ok: true, calendarWarning });
  } catch (error) {
    console.error("Kunde inte ta bort blockering", error);
    return NextResponse.json({ error: "Blockeringen kunde inte tas bort just nu." }, { status: 503 });
  }
}
