"use client";

import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { HealthcareService } from "@/data/services";

type AvailableSlot = { start: string; end: string };

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

function formatDayLabel(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long" });
}

function formatTimeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
}

function groupSlotsByDay(slots: AvailableSlot[]): { day: string; slots: AvailableSlot[] }[] {
  const groups = new Map<string, AvailableSlot[]>();
  for (const slot of slots) {
    const dayKey = slot.start.slice(0, 10);
    if (!groups.has(dayKey)) groups.set(dayKey, []);
    groups.get(dayKey)!.push(slot);
  }
  return [...groups.entries()].map(([day, daySlots]) => ({ day, slots: daySlots }));
}

type Step = "pick-time" | "patient-details" | "payment" | "confirmed";

export default function BookingFlow({ service }: { service: HealthcareService }) {
  const [step, setStep] = useState<Step>("pick-time");
  const [slots, setSlots] = useState<AvailableSlot[] | null>(null);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);

  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/booking/slots?service=${encodeURIComponent(service.slug)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Kunde inte hämta lediga tider.");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setSlots(data.slots);
      })
      .catch(() => {
        if (!cancelled) setSlotsError("Lediga tider kunde inte hämtas just nu. Ladda om sidan eller kontakta oss.");
      });
    return () => {
      cancelled = true;
    };
  }, [service.slug]);

  const dayGroups = useMemo(() => (slots ? groupSlotsByDay(slots) : []), [slots]);

  async function handleSubmitDetails() {
    if (!selectedSlot) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: service.slug,
          startIso: selectedSlot.start,
          patientName,
          patientEmail,
          patientPhone,
          notes,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setSubmitError(data.error ?? "Något gick fel. Försök igen.");
        return;
      }
      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch {
      setSubmitError("Något gick fel. Kontrollera din internetanslutning och försök igen.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (step === "confirmed") {
    return (
      <div className="rounded-2xl border border-pink-100 bg-white p-6 text-center shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">Din bokning är bekräftad</h2>
        <p className="mt-2 text-gray-600">
          {selectedSlot ? `${formatDayLabel(selectedSlot.start)} kl. ${formatTimeLabel(selectedSlot.start)}` : ""}
        </p>
        <p className="mt-4 text-sm text-gray-500">En bekräftelse skickas till {patientEmail}.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {step === "pick-time" && (
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-gray-900">Välj en tid</h2>
          {slotsError && <p className="mt-3 text-sm text-red-600">{slotsError}</p>}
          {!slots && !slotsError && <p className="mt-3 text-sm text-gray-500">Hämtar lediga tider…</p>}
          {slots && slots.length === 0 && (
            <p className="mt-3 text-sm text-gray-500">Inga lediga tider just nu. Kontakta oss så hjälper vi dig.</p>
          )}
          <div className="mt-4 grid gap-5">
            {dayGroups.map(({ day, slots: daySlots }) => (
              <div key={day}>
                <p className="mb-2 text-sm font-semibold capitalize text-gray-700">{formatDayLabel(daySlots[0].start)}</p>
                <div className="flex flex-wrap gap-2">
                  {daySlots.map((slot) => (
                    <button
                      key={slot.start}
                      type="button"
                      onClick={() => {
                        setSelectedSlot(slot);
                        setStep("patient-details");
                      }}
                      className="rounded-full border border-pink-200 px-4 py-2 text-sm font-semibold text-[#D81B7D] transition hover:bg-pink-50"
                    >
                      {formatTimeLabel(slot.start)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {step === "patient-details" && selectedSlot && (
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <button type="button" onClick={() => setStep("pick-time")} className="text-sm text-gray-500 hover:text-gray-700">
            ← Välj en annan tid
          </button>
          <h2 className="mt-2 text-lg font-bold text-gray-900">
            {formatDayLabel(selectedSlot.start)} kl. {formatTimeLabel(selectedSlot.start)}
          </h2>
          <p className="mt-1 text-sm text-gray-500">{service.name} · {service.price}</p>

          <form
            className="mt-5 grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmitDetails();
            }}
          >
            <label className="grid gap-1 text-sm font-medium text-gray-700">
              Namn
              <input
                required
                value={patientName}
                onChange={(event) => setPatientName(event.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
              />
            </label>
            <label className="grid gap-1 text-sm font-medium text-gray-700">
              E-post
              <input
                required
                type="email"
                value={patientEmail}
                onChange={(event) => setPatientEmail(event.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
              />
            </label>
            <label className="grid gap-1 text-sm font-medium text-gray-700">
              Telefon
              <input
                required
                type="tel"
                value={patientPhone}
                onChange={(event) => setPatientPhone(event.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
              />
            </label>
            <label className="grid gap-1 text-sm font-medium text-gray-700">
              Kort om ditt ärende (valfritt)
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
              />
            </label>

            {submitError && <p className="text-sm text-red-600">{submitError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-cta mt-2 inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2 text-sm font-bold disabled:opacity-60"
            >
              {isSubmitting ? "Hämtar betalning…" : "Fortsätt till betalning"}
            </button>
          </form>
        </section>
      )}

      {step === "payment" && clientSecret && stripePromise && (
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-gray-900">Betalning</h2>
          <p className="mt-1 text-sm text-gray-500">{service.name} · {service.price}</p>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm onConfirmed={() => setStep("confirmed")} />
          </Elements>
        </section>
      )}

      {step === "payment" && !stripePromise && (
        <p className="text-sm text-red-600">Betalning kan inte laddas just nu. Kontakta oss för att slutföra bokningen.</p>
      )}
    </div>
  );
}

function PaymentForm({ onConfirmed }: { onConfirmed: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay(event: React.FormEvent) {
    event.preventDefault();
    if (!stripe || !elements) return;
    setIsPaying(true);
    setError(null);

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message ?? "Betalningen kunde inte genomföras.");
      setIsPaying(false);
      return;
    }

    if (paymentIntent?.status === "succeeded" || paymentIntent?.status === "processing") {
      onConfirmed();
    } else {
      setError("Betalningen kunde inte bekräftas. Försök igen.");
      setIsPaying(false);
    }
  }

  return (
    <form onSubmit={handlePay} className="mt-4 grid gap-4">
      <PaymentElement />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || isPaying}
        className="btn-cta inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2 text-sm font-bold disabled:opacity-60"
      >
        {isPaying ? "Behandlar betalning…" : "Betala och bekräfta bokning"}
      </button>
    </form>
  );
}
