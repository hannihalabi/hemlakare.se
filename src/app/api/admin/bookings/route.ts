import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { getBookingDashboard, scheduleRangeHasConflict } from "@/lib/admin-bookings-server";
import { bookableServicesBySlug } from "@/data/bookable-services";
import { getSql } from "@/lib/db";
import { createBookingEvent } from "@/lib/google-calendar";

const querySchema = z.object({
  from: z.string().datetime(),
  to: z.string().datetime(),
});

const timeRangeSchema = z.object({
  startIso: z.string().datetime(),
  endIso: z.string().datetime(),
}).superRefine((value, context) => {
  const start = new Date(value.startIso);
  const end = new Date(value.endIso);
  if (end <= start) context.addIssue({ code: "custom", message: "Sluttiden måste vara efter starttiden." });
  if (end.getTime() - start.getTime() > 12 * 60 * 60 * 1000) {
    context.addIssue({ code: "custom", message: "En schemapost kan vara högst 12 timmar." });
  }
});

const createSchema = z.discriminatedUnion("kind", [
  timeRangeSchema.extend({
    kind: z.literal("block"),
    title: z.string().trim().min(1).max(160),
    notes: z.string().trim().max(2000).optional(),
  }),
  timeRangeSchema.extend({
    kind: z.literal("booking"),
    service: z.string().trim().min(1).max(120),
    patientName: z.string().trim().min(2).max(160),
    patientEmail: z.union([z.string().trim().email().max(200), z.literal("")]).default(""),
    patientPhone: z.string().trim().max(40).default(""),
    notes: z.string().trim().max(2000).optional(),
  }),
]);

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Obehörig" }, { status: 401 });
  }

  const searchParams = new URL(request.url).searchParams;
  const query = querySchema.safeParse({
    from: searchParams.get("from"),
    to: searchParams.get("to"),
  });
  if (!query.success) {
    return NextResponse.json({ error: "Ogiltigt datumintervall." }, { status: 400 });
  }

  const rangeStart = new Date(query.data.from);
  const rangeEnd = new Date(query.data.to);
  const rangeDays = (rangeEnd.getTime() - rangeStart.getTime()) / 86_400_000;
  if (rangeDays <= 0 || rangeDays > 35) {
    return NextResponse.json({ error: "Datumintervallet måste vara mellan 1 och 35 dagar." }, { status: 400 });
  }

  try {
    return NextResponse.json(await getBookingDashboard(rangeStart, rangeEnd), {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    console.error("Kunde inte hämta adminbokningar", error);
    return NextResponse.json({ error: "Bokningarna kunde inte hämtas just nu." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return errorResponse("Obehörig", 401);

  const parsed = createSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return errorResponse(parsed.error.issues[0]?.message ?? "Ogiltiga uppgifter.");

  const start = new Date(parsed.data.startIso);
  const end = new Date(parsed.data.endIso);
  if (await scheduleRangeHasConflict(start, end)) {
    return errorResponse("Tiden överlappar en befintlig bokning eller blockering.", 409);
  }

  const sql = getSql();
  try {
    let id: string;
    let summary: string;
    let description: string;
    let patientEmail: string | undefined;

    if (parsed.data.kind === "block") {
      const rows = await sql`
        insert into schedule_blocks (title, notes, start_time, end_time, created_by)
        values (
          ${parsed.data.title}, ${parsed.data.notes ?? null},
          ${parsed.data.startIso}::timestamptz, ${parsed.data.endIso}::timestamptz,
          ${session.id}::uuid
        ) returning id
      `;
      id = String(rows[0].id);
      summary = parsed.data.title;
      description = parsed.data.notes || "Blockerad via Hemläkares personalschema.";
    } else {
      const service = bookableServicesBySlug.get(parsed.data.service);
      if (!service) return errorResponse("Tjänsten hittades inte.", 404);
      const rows = await sql`
        insert into bookings (
          service_slug, start_time, end_time, status, patient_name,
          patient_email, patient_phone, notes, booking_source
        ) values (
          ${parsed.data.service}, ${parsed.data.startIso}::timestamptz,
          ${parsed.data.endIso}::timestamptz, 'confirmed', ${parsed.data.patientName},
          ${parsed.data.patientEmail}, ${parsed.data.patientPhone}, ${parsed.data.notes ?? null}, 'manual'
        ) returning id
      `;
      id = String(rows[0].id);
      summary = `${service.name} – ${parsed.data.patientName}`;
      description = `Manuellt bokad via Hemläkares personalschema.\nPatient: ${parsed.data.patientName}${parsed.data.patientEmail ? `\nE-post: ${parsed.data.patientEmail}` : ""}${parsed.data.patientPhone ? `\nTelefon: ${parsed.data.patientPhone}` : ""}`;
      patientEmail = parsed.data.patientEmail || undefined;
    }

    let googleEventId: string | null = null;
    let calendarWarning = false;
    try {
      googleEventId = await createBookingEvent({ summary, description, start, end, patientEmail });
      if (parsed.data.kind === "block") {
        await sql`update schedule_blocks set google_event_id = ${googleEventId}, updated_at = now() where id = ${id}::uuid`;
      } else {
        await sql`update bookings set google_event_id = ${googleEventId}, updated_at = now() where id = ${id}::uuid`;
      }
    } catch (calendarError) {
      calendarWarning = true;
      console.error("Schemaposten skapades men kunde inte synkas till Google Calendar", id, calendarError);
    }

    try {
      await sql`
        insert into audit_events (actor_id, action, entity_type, entity_id, metadata)
        values (
          ${session.id}::uuid, ${parsed.data.kind === "block" ? "schedule_block_created" : "manual_booking_created"},
          ${parsed.data.kind === "block" ? "schedule_block" : "booking"}, ${id},
          ${JSON.stringify({ startIso: parsed.data.startIso, endIso: parsed.data.endIso })}::jsonb
        )
      `;
    } catch (auditError) {
      console.error("Schemaposten skapades men kunde inte revisionsloggas", id, auditError);
    }

    return NextResponse.json({ id, calendarWarning }, { status: 201 });
  } catch (error) {
    const isUniqueViolation = typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === "23505";
    if (isUniqueViolation) return errorResponse("Tiden hann bokas av någon annan.", 409);
    console.error("Kunde inte skapa schemapost", error);
    return errorResponse("Schemaposten kunde inte sparas just nu.", 503);
  }
}
