import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";
import { deleteBookingEvent } from "@/lib/google-calendar";

const idSchema = z.string().uuid();
const bodySchema = z.object({ status: z.literal("cancelled") });

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Obehörig" }, { status: 401 });

  const id = idSchema.safeParse((await params).id);
  const body = bodySchema.safeParse(await request.json().catch(() => null));
  if (!id.success || !body.success) {
    return NextResponse.json({ error: "Ogiltig begäran." }, { status: 400 });
  }

  const sql = getSql();
  try {
    const rows = await sql`
      select id, status, google_event_id from bookings where id = ${id.data}::uuid limit 1
    `;
    const booking = rows[0] as { id: string; status: string; google_event_id: string | null } | undefined;
    if (!booking) return NextResponse.json({ error: "Bokningen hittades inte." }, { status: 404 });
    if (booking.status === "cancelled") return NextResponse.json({ ok: true });
    if (booking.status === "expired") {
      return NextResponse.json({ error: "En utgången reservation kan inte avbokas." }, { status: 409 });
    }

    await sql`
      update bookings set status = 'cancelled', updated_at = now() where id = ${id.data}::uuid
    `;
    try {
      await sql`
        insert into audit_events (actor_id, action, entity_type, entity_id, metadata)
        values (${session.id}::uuid, 'booking_cancelled', 'booking', ${id.data}, ${JSON.stringify({ previousStatus: booking.status })}::jsonb)
      `;
    } catch (auditError) {
      // Avbokningen ska inte rapporteras som misslyckad bara för att den
      // kompletterande revisionsloggen inte kunde skrivas.
      console.error("Avbokningen genomfördes men kunde inte revisionsloggas", id.data, auditError);
    }

    let calendarWarning = false;
    if (booking.google_event_id) {
      try {
        await deleteBookingEvent(booking.google_event_id);
      } catch (error) {
        calendarWarning = true;
        console.error("Bokningen avbokades men Google-händelsen kunde inte tas bort", id.data, error);
      }
    }

    return NextResponse.json({ ok: true, calendarWarning });
  } catch (error) {
    console.error("Kunde inte avboka bokning", error);
    return NextResponse.json({ error: "Bokningen kunde inte avbokas just nu." }, { status: 503 });
  }
}
