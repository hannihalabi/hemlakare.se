import { getSql } from "@/lib/db";
import { getBusyIntervals, createBookingEvent } from "@/lib/google-calendar";
import { bookableServicesBySlug } from "@/data/bookable-services";

export const BOOKING_HOLD_MINUTES = 10;
export const SLOT_GRANULARITY_MINUTES = 15;
export const BOOKING_WINDOW_DAYS = 21;

type AvailabilityRule = {
  weekday: number;
  start_time: string; // "HH:MM:SS"
  end_time: string;
  service_slugs: string[] | null;
};

type ServiceDuration = {
  duration_minutes: number;
  buffer_minutes: number;
};

export type AvailableSlot = {
  start: string; // ISO
  end: string; // ISO
};

function parseTimeOnDate(date: Date, time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart < bEnd && bStart < aEnd;
}

async function getServiceDuration(serviceSlug: string): Promise<ServiceDuration> {
  const sql = getSql();
  const rows = await sql`
    select duration_minutes, buffer_minutes from service_durations where service_slug = ${serviceSlug}
  `;
  if (rows.length === 0) {
    throw new Error(`Ingen bokningsbar tjänst med slug "${serviceSlug}".`);
  }
  return rows[0] as ServiceDuration;
}

async function getActiveRulesForService(serviceSlug: string): Promise<AvailabilityRule[]> {
  const sql = getSql();
  const rows = await sql`
    select weekday, start_time, end_time, service_slugs
    from provider_availability_rules
    where active = true
      and (service_slugs is null or ${serviceSlug} = any(service_slugs))
    order by weekday asc, start_time asc
  `;
  return rows as AvailabilityRule[];
}

/** Släpper holds vars tidsfrist gått ut, så slotten blir bokningsbar igen. */
export async function releaseExpiredHolds(): Promise<void> {
  const sql = getSql();
  await sql`
    update bookings
    set status = 'expired', updated_at = now()
    where status = 'pending' and hold_expires_at <= now()
  `;
}

/** Bokningar (pending med giltig hold, eller confirmed) som upptar tid i vår egen databas. */
async function getOwnBookingIntervals(rangeStart: Date, rangeEnd: Date): Promise<{ start: Date; end: Date }[]> {
  const sql = getSql();
  const rows = await sql`
    select start_time, end_time from bookings
    where start_time < ${rangeEnd.toISOString()}
      and end_time > ${rangeStart.toISOString()}
      and (
        status = 'confirmed'
        or (status = 'pending' and hold_expires_at > now())
      )
  `;
  return rows.map((row) => ({ start: new Date(row.start_time as string), end: new Date(row.end_time as string) }));
}

/**
 * Genererar lediga tider för en tjänst under kommande BOOKING_WINDOW_DAYS dagar.
 * Kandidatfönster kommer från provider_availability_rules; de filtreras mot
 * Google Calendar (sanningskälla för vårdgivarens faktiska upptagna tid) och
 * mot egna aktiva bokningar/holds för att undvika dubbelbokning.
 */
export async function getAvailableSlots(serviceSlug: string, now: Date = new Date()): Promise<AvailableSlot[]> {
  await releaseExpiredHolds();
  const duration = await getServiceDuration(serviceSlug);
  const rules = await getActiveRulesForService(serviceSlug);
  if (rules.length === 0) return [];

  const rangeStart = now;
  const rangeEnd = new Date(now.getTime() + BOOKING_WINDOW_DAYS * 24 * 60 * 60 * 1000);

  const [busyFromCalendar, busyFromOwnBookings] = await Promise.all([
    getBusyIntervals(rangeStart, rangeEnd),
    getOwnBookingIntervals(rangeStart, rangeEnd),
  ]);
  const busyIntervals = [...busyFromCalendar, ...busyFromOwnBookings];

  const slotLengthMs = (duration.duration_minutes + duration.buffer_minutes) * 60 * 1000;
  const slots: AvailableSlot[] = [];

  for (let dayOffset = 0; dayOffset <= BOOKING_WINDOW_DAYS; dayOffset += 1) {
    const day = new Date(rangeStart);
    day.setDate(day.getDate() + dayOffset);
    day.setHours(0, 0, 0, 0);
    const weekday = day.getDay();

    const rulesForDay = rules.filter((rule) => rule.weekday === weekday);
    for (const rule of rulesForDay) {
      const windowStart = parseTimeOnDate(day, rule.start_time);
      const windowEnd = parseTimeOnDate(day, rule.end_time);

      let candidateStart = new Date(windowStart);
      while (candidateStart.getTime() + slotLengthMs <= windowEnd.getTime()) {
        const candidateEnd = new Date(candidateStart.getTime() + duration.duration_minutes * 60 * 1000);
        const blockEnd = new Date(candidateStart.getTime() + slotLengthMs);

        const isPast = candidateStart <= now;
        const isBusy = busyIntervals.some((busy) => overlaps(candidateStart, blockEnd, busy.start, busy.end));

        if (!isPast && !isBusy) {
          slots.push({ start: candidateStart.toISOString(), end: candidateEnd.toISOString() });
        }

        candidateStart = new Date(candidateStart.getTime() + SLOT_GRANULARITY_MINUTES * 60 * 1000);
      }
    }
  }

  return slots.sort((a, b) => a.start.localeCompare(b.start));
}

/** Kontrollerar att en specifik starttid fortfarande är ledig (regler + kalender + egna bokningar). */
export async function isSlotStillAvailable(serviceSlug: string, startIso: string, now: Date = new Date()): Promise<{ ok: true; endIso: string } | { ok: false; reason: string }> {
  await releaseExpiredHolds();
  const duration = await getServiceDuration(serviceSlug);
  const start = new Date(startIso);
  if (Number.isNaN(start.getTime()) || start <= now) {
    return { ok: false, reason: "Tiden ligger i det förflutna eller är ogiltig." };
  }

  const rules = await getActiveRulesForService(serviceSlug);
  const weekday = start.getDay();
  const rulesForDay = rules.filter((rule) => rule.weekday === weekday);
  const withinAnyRule = rulesForDay.some((rule) => {
    const day = new Date(start);
    day.setHours(0, 0, 0, 0);
    const windowStart = parseTimeOnDate(day, rule.start_time);
    const windowEnd = parseTimeOnDate(day, rule.end_time);
    const end = new Date(start.getTime() + (duration.duration_minutes + duration.buffer_minutes) * 60 * 1000);
    return start >= windowStart && end <= windowEnd;
  });
  if (!withinAnyRule) return { ok: false, reason: "Tiden ligger utanför tillgänglig bokningstid." };

  const end = new Date(start.getTime() + duration.duration_minutes * 60 * 1000);
  const blockEnd = new Date(start.getTime() + (duration.duration_minutes + duration.buffer_minutes) * 60 * 1000);

  const [busyFromCalendar, busyFromOwnBookings] = await Promise.all([
    getBusyIntervals(start, blockEnd),
    getOwnBookingIntervals(start, blockEnd),
  ]);

  const isBusy = [...busyFromCalendar, ...busyFromOwnBookings].some((busy) => overlaps(start, blockEnd, busy.start, busy.end));
  if (isBusy) return { ok: false, reason: "Tiden är tyvärr redan bokad." };

  return { ok: true, endIso: end.toISOString() };
}

/**
 * Markerar en pending bokning som confirmed och skapar Google
 * Calendar-händelsen. Delas mellan Stripe-webhooken (efter lyckad betalning)
 * och bokningar som inte kräver förskottsbetalning (t.ex. vaccin med
 * "från"-pris, där det verkliga priset avgörs vid besöket).
 */
export async function confirmBooking(bookingId: string): Promise<void> {
  const sql = getSql();
  const rows = await sql`
    select id, service_slug, variant_label, start_time, end_time, status, patient_name, patient_email
    from bookings
    where id = ${bookingId}
  `;
  const booking = rows[0];
  if (!booking) {
    console.error("confirmBooking: ingen bokning med id", bookingId);
    return;
  }
  if (booking.status === "confirmed") return; // redan hanterad

  const service = bookableServicesBySlug.get(booking.service_slug as string);
  const variantLabel = booking.variant_label as string | null;
  const summary = `${service?.name ?? booking.service_slug}${variantLabel ? ` – ${variantLabel}` : ""} – ${booking.patient_name}`;

  let googleEventId: string | null = null;
  try {
    googleEventId = await createBookingEvent({
      summary,
      description: `Bokad via hemlakare.se.\nPatient: ${booking.patient_name}\nE-post: ${booking.patient_email}${variantLabel ? `\nVal: ${variantLabel}` : ""}`,
      start: new Date(booking.start_time as string),
      end: new Date(booking.end_time as string),
      patientEmail: booking.patient_email as string,
    });
  } catch (error) {
    // Bokningen ska bekräftas även om kalenderhändelsen misslyckas – den
    // kan läggas till manuellt. Viktigast är att patienten inte tappas.
    console.error("Kunde inte skapa Google Calendar-händelse för bekräftad bokning", booking.id, error);
  }

  await sql`
    update bookings
    set status = 'confirmed', google_event_id = ${googleEventId}, updated_at = now()
    where id = ${booking.id}
  `;
}
