import { bookableServicesBySlug } from "@/data/bookable-services";
import { bookingVariantsByService } from "@/data/booking-variants";
import { getSql } from "@/lib/db";
import type { AdminBooking, BookingDashboard, BookingStatus, ScheduleBlock } from "@/lib/admin-booking-types";

type BookingRow = {
  id: string;
  service_slug: string;
  variant_label: string | null;
  variant_price_ore: number | null;
  start_time: string | Date;
  end_time: string | Date;
  status: BookingStatus;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  notes: string | null;
  google_event_id: string | null;
  hold_expires_at: string | Date | null;
  created_at: string | Date;
  booking_source: "online" | "manual";
};

type BlockRow = {
  id: string;
  title: string;
  notes: string | null;
  start_time: string | Date;
  end_time: string | Date;
  google_event_id: string | null;
  created_at: string | Date;
};

function toIso(value: string | Date) {
  return new Date(value).toISOString();
}

function mapBooking(row: BookingRow): AdminBooking {
  const service = bookableServicesBySlug.get(row.service_slug);
  const variant = bookingVariantsByService[row.service_slug]?.find((item) => item.label === row.variant_label);
  return {
    id: row.id,
    serviceSlug: row.service_slug,
    serviceName: service?.name ?? row.service_slug,
    variantLabel: row.variant_label,
    startTime: toIso(row.start_time),
    endTime: toIso(row.end_time),
    status: row.status,
    patientName: row.patient_name,
    patientEmail: row.patient_email,
    patientPhone: row.patient_phone,
    notes: row.notes,
    priceOre: row.variant_price_ore,
    priceLabel: row.variant_price_ore !== null
      ? new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK", maximumFractionDigits: 0 }).format(row.variant_price_ore / 100)
      : variant?.priceLabel ?? service?.price ?? "Pris saknas",
    hasCalendarEvent: Boolean(row.google_event_id),
    holdExpiresAt: row.hold_expires_at ? toIso(row.hold_expires_at) : null,
    createdAt: toIso(row.created_at),
    source: row.booking_source,
  };
}

function mapBlock(row: BlockRow): ScheduleBlock {
  return {
    id: row.id,
    title: row.title,
    notes: row.notes,
    startTime: toIso(row.start_time),
    endTime: toIso(row.end_time),
    hasCalendarEvent: Boolean(row.google_event_id),
    createdAt: toIso(row.created_at),
  };
}

export async function getBookingDashboard(rangeStart: Date, rangeEnd: Date): Promise<BookingDashboard> {
  const sql = getSql();

  // Håll statusen korrekt även om ingen patient har öppnat bokningssidan
  // sedan en Stripe-reservation löpte ut.
  await sql`
    update bookings
    set status = 'expired', updated_at = now()
    where status = 'pending' and hold_expires_at <= now()
  `;

  const [rows, blockRows] = await Promise.all([
    sql`
    select id, service_slug, variant_label, variant_price_ore, start_time, end_time,
      status, patient_name, patient_email, patient_phone, notes, google_event_id,
      hold_expires_at, created_at, booking_source
    from bookings
    where start_time >= ${rangeStart.toISOString()}::timestamptz
      and start_time < ${rangeEnd.toISOString()}::timestamptz
    order by start_time asc
    `,
    sql`
      select id, title, notes, start_time, end_time, google_event_id, created_at
      from schedule_blocks
      where start_time < ${rangeEnd.toISOString()}::timestamptz
        and end_time > ${rangeStart.toISOString()}::timestamptz
      order by start_time asc
    `,
  ]);

  const bookings = (rows as BookingRow[]).map(mapBooking);
  const blocks = (blockRows as BlockRow[]).map(mapBlock);
  const counts = {
    total: bookings.length,
    pending: bookings.filter((booking) => booking.status === "pending").length,
    confirmed: bookings.filter((booking) => booking.status === "confirmed").length,
    cancelled: bookings.filter((booking) => booking.status === "cancelled").length,
    expired: bookings.filter((booking) => booking.status === "expired").length,
  };

  return { bookings, blocks, counts };
}

export async function scheduleRangeHasConflict(start: Date, end: Date): Promise<boolean> {
  const sql = getSql();
  const rows = await sql`
    select exists (
      select 1 from bookings
      where status in ('pending', 'confirmed')
        and start_time < ${end.toISOString()}::timestamptz
        and end_time > ${start.toISOString()}::timestamptz
      union all
      select 1 from schedule_blocks
      where start_time < ${end.toISOString()}::timestamptz
        and end_time > ${start.toISOString()}::timestamptz
    ) as has_conflict
  `;
  return Boolean(rows[0]?.has_conflict);
}
