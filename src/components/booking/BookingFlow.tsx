"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { HealthcareService } from "@/data/services";
import type { BookingVariant } from "@/data/booking-variants";
import CalendarTimePicker, { type AvailableSlot } from "@/components/booking/CalendarTimePicker";

function formatDayLabel(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long" });
}

function formatTimeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
}

type Step = "pick-variant" | "pick-time" | "patient-details" | "confirmed-without-payment";

type Props = {
  service: HealthcareService;
  /** Om satt måste patienten välja ett av dessa innan tid – t.ex. blodprovspaket eller vaccin. */
  variants?: BookingVariant[];
};

export default function BookingFlow({ service, variants }: Props) {
  const searchParams = useSearchParams();
  const bokningStatus = searchParams.get("bokning");

  const [step, setStep] = useState<Step>(variants && variants.length > 0 ? "pick-variant" : "pick-time");
  const [selectedVariant, setSelectedVariant] = useState<BookingVariant | null>(null);

  const [slots, setSlots] = useState<AvailableSlot[] | null>(null);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);

  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const priceLabel = selectedVariant ? selectedVariant.priceLabel : service.price;

  useEffect(() => {
    // Väntar med att hämta tider tills ett ev. variantval är gjort, och
    // hämtar inte alls efter en betalning (klar eller avbruten) – slotten
    // som valdes är inte längre bokningsbar via denna vy.
    if (bokningStatus) return;
    if (step !== "pick-time") return;

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
  }, [service.slug, bokningStatus, step]);

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
          variantSlug: selectedVariant?.slug,
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
        setIsSubmitting(false);
        return;
      }
      if (data.confirmedWithoutPayment) {
        setStep("confirmed-without-payment");
        setIsSubmitting(false);
        return;
      }
      // Stripe Checkout tar över hela sidan härifrån (kort, Klarna, Apple/Google
      // Pay m.m.) och skickar patienten tillbaka till success_url/cancel_url.
      window.location.href = data.checkoutUrl;
    } catch {
      setSubmitError("Något gick fel. Kontrollera din internetanslutning och försök igen.");
      setIsSubmitting(false);
    }
  }

  if (bokningStatus === "klar" || step === "confirmed-without-payment") {
    return (
      <div className="rounded-2xl border border-pink-100 bg-white p-6 text-center shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">Din bokning är bekräftad</h2>
        <p className="mt-4 text-sm text-gray-500">
          {step === "confirmed-without-payment"
            ? "En bekräftelse skickas till din e-post. Eventuell kostnad stäms av vid besöket."
            : "En bekräftelse skickas till din e-post."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {bokningStatus === "avbruten" && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Betalningen genomfördes inte och bokningen slutfördes inte. Välj en tid nedan för att försöka igen.
        </p>
      )}

      {step === "pick-variant" && variants && (
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-gray-900">Välj alternativ</h2>
          <div className="mt-4 grid gap-2">
            {variants.map((variant) => (
              <button
                key={variant.slug}
                type="button"
                onClick={() => {
                  setSelectedVariant(variant);
                  setStep("pick-time");
                }}
                className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 px-4 py-3 text-left transition hover:border-pink-200 hover:bg-pink-50"
              >
                <span>
                  <span className="block text-sm font-semibold text-gray-900">{variant.label}</span>
                  {variant.description && <span className="block text-xs text-gray-500">{variant.description}</span>}
                </span>
                <span className="shrink-0 text-sm font-semibold text-[#D81B7D]">{variant.priceLabel}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {step === "pick-time" && (
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          {variants && (
            <button
              type="button"
              onClick={() => setStep("pick-variant")}
              className="mb-2 text-sm text-gray-500 hover:text-gray-700"
            >
              ← Välj ett annat alternativ
            </button>
          )}
          <h2 className="text-lg font-bold text-gray-900">Välj en tid</h2>
          {selectedVariant && <p className="mt-1 text-sm text-gray-500">{selectedVariant.label} · {selectedVariant.priceLabel}</p>}
          {slotsError && <p className="mt-3 text-sm text-red-600">{slotsError}</p>}
          {!slots && !slotsError && <p className="mt-3 text-sm text-gray-500">Hämtar lediga tider…</p>}
          {slots && (
            <div className="mt-4">
              <CalendarTimePicker
                slots={slots}
                onSelectSlot={(slot) => {
                  setSelectedSlot(slot);
                  setStep("patient-details");
                }}
              />
            </div>
          )}
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
          <p className="mt-1 text-sm text-gray-500">
            {selectedVariant ? `${service.name} – ${selectedVariant.label}` : service.name} · {priceLabel}
          </p>

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

            {selectedVariant && !selectedVariant.requiresPayment && (
              <p className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600">
                Priset avgörs av vald omfattning och stäms av vid besöket – ingen betalning krävs för att boka tiden.
              </p>
            )}

            {submitError && <p className="text-sm text-red-600">{submitError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-cta mt-2 inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2 text-sm font-bold disabled:opacity-60"
            >
              {isSubmitting
                ? "Skickar…"
                : selectedVariant && !selectedVariant.requiresPayment
                  ? "Boka tid"
                  : "Fortsätt till betalning"}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
