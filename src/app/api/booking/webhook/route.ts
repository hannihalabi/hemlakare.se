import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getSql } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { createBookingEvent } from "@/lib/google-calendar";
import { healthcareServicesBySlug } from "@/data/services";

// Stripe kräver den råa request-bodyn för signaturverifiering.
export const runtime = "nodejs";

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const sql = getSql();
  const rows = await sql`
    select id, service_slug, start_time, end_time, status, patient_name, patient_email
    from bookings
    where stripe_payment_intent_id = ${paymentIntent.id}
  `;
  const booking = rows[0];
  if (!booking) {
    console.error("Webhook: ingen bokning matchar payment intent", paymentIntent.id);
    return;
  }
  if (booking.status === "confirmed") return; // redan hanterad (Stripe kan skicka samma event flera gånger)

  const service = healthcareServicesBySlug.get(booking.service_slug as string);
  const summary = `${service?.name ?? booking.service_slug} – ${booking.patient_name}`;

  let googleEventId: string | null = null;
  try {
    googleEventId = await createBookingEvent({
      summary,
      description: `Bokad via hemlakare.se.\nPatient: ${booking.patient_name}\nE-post: ${booking.patient_email}`,
      start: new Date(booking.start_time as string),
      end: new Date(booking.end_time as string),
      patientEmail: booking.patient_email as string,
    });
  } catch (error) {
    // Betalningen har gått igenom – vi får inte tappa bokningen. Bokningen
    // bekräftas ändå; kalenderhändelsen kan skapas/läggas till manuellt.
    console.error("Kunde inte skapa Google Calendar-händelse för bekräftad bokning", booking.id, error);
  }

  await sql`
    update bookings
    set status = 'confirmed', google_event_id = ${googleEventId}, updated_at = now()
    where id = ${booking.id}
  `;
}

async function handlePaymentFailedOrCanceled(paymentIntent: Stripe.PaymentIntent) {
  const sql = getSql();
  await sql`
    update bookings
    set status = 'cancelled', updated_at = now()
    where stripe_payment_intent_id = ${paymentIntent.id} and status = 'pending'
  `;
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET saknas");
    return NextResponse.json({ error: "Serverkonfiguration saknas." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Signatur saknas." }, { status: 400 });

  const rawBody = await request.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error("Ogiltig Stripe-webhook-signatur", error);
    return NextResponse.json({ error: "Ogiltig signatur." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case "payment_intent.payment_failed":
      case "payment_intent.canceled":
        await handlePaymentFailedOrCanceled(event.data.object as Stripe.PaymentIntent);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error("Fel vid hantering av Stripe-webhook", event.type, error);
    return NextResponse.json({ error: "Internt fel." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
