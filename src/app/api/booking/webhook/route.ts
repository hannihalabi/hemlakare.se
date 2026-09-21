import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getSql } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { confirmBooking } from "@/lib/booking";

// Stripe kräver den råa request-bodyn för signaturverifiering.
export const runtime = "nodejs";

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const bookingId = session.metadata?.booking_id;
  if (!bookingId) {
    console.error("Webhook: checkout-session saknar booking_id i metadata", session.id);
    return;
  }
  await confirmBooking(bookingId);
}

async function handleCheckoutExpired(session: Stripe.Checkout.Session) {
  const bookingId = session.metadata?.booking_id;
  if (!bookingId) return;
  const sql = getSql();
  await sql`
    update bookings
    set status = 'expired', updated_at = now()
    where id = ${bookingId} and status = 'pending'
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
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "checkout.session.expired":
        await handleCheckoutExpired(event.data.object as Stripe.Checkout.Session);
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
