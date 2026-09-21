import { NextResponse } from "next/server";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { isSlotStillAvailable, BOOKING_HOLD_MINUTES } from "@/lib/booking";
import { bookableServicesBySlug } from "@/data/bookable-services";
import { SITE_URL } from "@/lib/site";

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

/** Tjänster som inte har ett fast kronpris (t.ex. "Från 995 kr") kan inte bokas/betalas automatiskt ännu. */
function parsePriceToOre(price: string): number | null {
  const match = price.replace(/\s/g, "").match(/^(\d[\d]*)(?:,(\d{2}))?kr(?:\/mån)?$/i);
  if (!match) return null;
  const kronor = Number(match[1]);
  const ore = match[2] ? Number(match[2]) : 0;
  return kronor * 100 + ore;
}

const bodySchema = z.object({
  service: z.string().trim().min(1).max(120),
  startIso: z.string().trim().min(1),
  patientName: z.string().trim().min(2).max(160),
  patientEmail: z.string().trim().email().max(200),
  patientPhone: z.string().trim().min(4).max(40),
  notes: z.string().trim().max(2000).optional(),
});

export async function POST(request: Request) {
  let payload: z.infer<typeof bodySchema>;
  try {
    payload = bodySchema.parse(await request.json());
  } catch (caught) {
    if (caught instanceof z.ZodError) return errorResponse(caught.issues[0]?.message ?? "Ogiltiga uppgifter.");
    return errorResponse("Ogiltig förfrågan.");
  }

  const service = bookableServicesBySlug.get(payload.service);
  if (!service) return errorResponse("Tjänsten hittades inte.", 404);

  const priceOre = parsePriceToOre(service.price);
  if (priceOre === null) {
    return errorResponse("Den här tjänsten kan inte bokas och betalas direkt online ännu. Kontakta oss för bokning.", 422);
  }

  const availability = await isSlotStillAvailable(payload.service, payload.startIso);
  if (!availability.ok) return errorResponse(availability.reason, 409);

  const sql = getSql();
  const holdExpiresAt = new Date(Date.now() + BOOKING_HOLD_MINUTES * 60 * 1000);

  try {
    // Skapar bokningen (pending) FÖRE Stripe-sessionen så vi har ett booking-id
    // att skicka med som metadata och känna igen i webhooken efteråt.
    // Unik constraint på (start_time) bland pending/confirmed bokningar i DB:n
    // stoppar en race där två patienter skulle hinna boka samma slot samtidigt.
    const rows = await sql`
      insert into bookings (
        service_slug, start_time, end_time, status,
        patient_name, patient_email, patient_phone, notes,
        hold_expires_at
      ) values (
        ${payload.service}, ${payload.startIso}::timestamptz, ${availability.endIso}::timestamptz, 'pending',
        ${payload.patientName}, ${payload.patientEmail}, ${payload.patientPhone}, ${payload.notes ?? null},
        ${holdExpiresAt.toISOString()}::timestamptz
      )
      returning id
    `;
    const bookingId = rows[0].id as string;

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: payload.patientEmail,
      line_items: [
        {
          price_data: {
            currency: "sek",
            unit_amount: priceOre,
            product_data: { name: service.name },
          },
          quantity: 1,
        },
      ],
      metadata: {
        booking_id: bookingId,
        service_slug: payload.service,
        start_time: payload.startIso,
      },
      success_url: `${SITE_URL}/boka/${payload.service}?bokning=klar&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/boka/${payload.service}?bokning=avbruten`,
      // Stripe kräver minst 30 minuter för en Checkout-sessions egen
      // utgångstid. Vår egen hold i databasen (BOOKING_HOLD_MINUTES) är
      // kortare och är det som faktiskt släpper slotten igen om patienten
      // inte betalar – det här är bara Stripes yttre säkerhetsmarginal.
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    });

    await sql`
      update bookings set stripe_checkout_session_id = ${session.id}, updated_at = now() where id = ${bookingId}
    `;

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error: unknown) {
    const isUniqueViolation = typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === "23505";
    if (isUniqueViolation) {
      return errorResponse("Tyvärr blev den tiden precis bokad av någon annan. Välj en annan tid.", 409);
    }
    console.error("Kunde inte skapa bokning", error);
    return errorResponse("Bokningen kunde inte skapas just nu. Försök igen.", 503);
  }
}
