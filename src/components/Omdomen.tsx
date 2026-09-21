"use client";

import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    initials: "M",
    name: "Maria L.",
    quote:
      "Lätt att nå online, personlig och engagerad personal och tryggt att ha kontakt med samma läkare. Och sen att få hembesök, det är verkligen suveränt! Så skönt att slippa sitta i väntrum med en massa andra sjuka människor när man själv inte är kry.",
    source: "Recension på Trustpilot",
    bg: "#e8d5c4",
    color: "#7a4f2e",
  },
  {
    initials: "A",
    name: "Anders K.",
    quote:
      "Riktigt serviceminded. Vi blev bra bemött och fick snabb vård med kvalité. Läkarna följde även upp ärendet för att se om vi mådde bra efteråt. Det är sådan vård man behöver.",
    source: "Recension på Vården.se",
    bg: "#d4dde8",
    color: "#2e4a7a",
  },
  {
    initials: "S",
    name: "Sara J.",
    quote:
      "Har ALDRIG fått så här bra och smidig vård. Det känns som en vårdcentral i en drömvärld. Jag känner mig alltid trygg när jag vet att jag har hjälp bara några knapptryck från mig 🤩",
    source: "Recension på Google",
    bg: "#d4e8d8",
    color: "#2e7a3e",
  },
  {
    initials: "P",
    name: "Petra M.",
    quote:
      "Fantastiskt snabb respons! Skickade ett meddelande på kvällen och fick svar inom 20 minuter. Min läkare kände mig och förstod direkt vad jag behövde.",
    source: "Recension på Google",
    bg: "#e8d4e8",
    color: "#6e2e7a",
  },
  {
    initials: "J",
    name: "Johan B.",
    quote:
      "Som kroniskt sjuk är det guld värt att ha en fast läkare som faktiskt känner min historia. Inga journaler att förklara om och om igen.",
    source: "Recension på Vården.se",
    bg: "#d4e4e8",
    color: "#2e5f7a",
  },
  {
    initials: "L",
    name: "Lisa O.",
    quote:
      "Hembesöket var en helt ny upplevelse. Läkaren kom hem till mig när jag var för sjuk för att ta mig till en mottagning. Professionellt och omtänksamt.",
    source: "Recension på Trustpilot",
    bg: "#e8e4d4",
    color: "#7a6a2e",
  },
  {
    initials: "K",
    name: "Karin H.",
    quote:
      "Äntligen en vårdcentral utan timslånga väntetider i telefon. Allt sker online, smidigt och enkelt. Läkaren svarade samma dag.",
    source: "Recension på Google",
    bg: "#e8d4d4",
    color: "#7a2e2e",
  },
  {
    initials: "T",
    name: "Thomas R.",
    quote:
      "Väldigt imponerad av servicen. Min dotter fick hjälp med sin allergi snabbt och smidigt via videosamtal. Slapp ta ledigt från jobbet.",
    source: "Recension på Vården.se",
    bg: "#d4e8e4",
    color: "#2e7a6a",
  },
  {
    initials: "E",
    name: "Eva S.",
    quote:
      "Otroligt trevlig och kompetent personal. Kände mig sedd och lyssnad på på ett sätt man sällan upplever i vården.",
    source: "Recension på Google",
    bg: "#e4d4e8",
    color: "#5a2e7a",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 1.5l2.06 4.18 4.61.67-3.34 3.25.79 4.6L9 11.77l-4.12 2.43.79-4.6L2.33 6.35l4.61-.67L9 1.5Z"
            fill="#E72E8A"
          />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <div className="flex min-h-[300px] w-[min(82vw,360px)] shrink-0 flex-col items-center gap-4 rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm sm:w-[390px]">
      <div
        className="flex size-14 shrink-0 items-center justify-center rounded-full text-[1.2rem] font-bold"
        style={{ background: review.bg, color: review.color }}
      >
        {review.initials}
      </div>

      <div className="flex flex-col items-center gap-1">
        <Stars />
        <span className="text-[0.82rem] font-semibold text-gray-500">
          {review.name}
        </span>
      </div>

      <p className="text-[0.93rem] leading-relaxed text-gray-700">
        &ldquo;{review.quote}&rdquo;
      </p>

      <span className="mt-auto text-[0.82rem] text-gray-400">{review.source}</span>
    </div>
  );
}

export default function Omdomen() {
  const marqueeReviews = [...reviews, ...reviews];
  const sectionRef = useRef<HTMLElement>(null);
  const [showHoldHint, setShowHoldHint] = useState(false);
  const [demoPaused, setDemoPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let timers: number[] = [];
    let wasVisible = false;

    const clearTimers = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];
    };

    const playHint = () => {
      clearTimers();
      setShowHoldHint(true);
      setDemoPaused(false);

      timers = [
        window.setTimeout(() => setDemoPaused(true), 420),
        window.setTimeout(() => setDemoPaused(false), 1_180),
        window.setTimeout(() => setShowHoldHint(false), 1_500),
      ];
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.65;

        if (isVisible && !wasVisible) playHint();

        if (!isVisible && wasVisible) {
          clearTimers();
          setShowHoldHint(false);
          setDemoPaused(false);
        }

        wasVisible = isVisible;
      },
      { threshold: [0, 0.65] },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, []);

  const isPaused = demoPaused || userPaused;

  return (
    <section
      ref={sectionRef}
      aria-label="Patientrecensioner"
      className="overflow-hidden bg-[#fdf5f9] py-10 sm:py-14"
    >
      <div
        className="relative w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#e72e8a]"
        role="group"
        tabIndex={0}
        aria-label="Rullande patientrecensioner. Tryck och håll, håll muspekaren över eller håll nere mellanslag för att pausa."
        onPointerDown={() => setUserPaused(true)}
        onPointerUp={() => setUserPaused(false)}
        onPointerCancel={() => setUserPaused(false)}
        onKeyDown={(event) => {
          if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            setUserPaused(true);
          }
        }}
        onKeyUp={(event) => {
          if (event.key === " " || event.key === "Enter") setUserPaused(false);
        }}
        onBlur={() => setUserPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#fdf5f9] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#fdf5f9] to-transparent sm:w-24" />

        {showHoldHint ? (
          <span className="review-hold-hint" aria-hidden="true">
            <svg
              className="review-hold-icon"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.25 17.25V7.5a3 3 0 0 1 6 0v7.25-2.5a2.75 2.75 0 0 1 5.5 0v3.5-1.25a2.75 2.75 0 0 1 5.5 0v5.25C29.25 26 25.25 30 19 30h-2.5c-3.1 0-5.45-1.05-7.4-3.35L4.4 21.1a2.7 2.7 0 0 1 4.05-3.55l3.8 4.1v-4.4Z"
                stroke="currentColor"
                strokeWidth="2.15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.4 8.4 5.75 6.9M9.35 4.7 8.25 1.9M5.1 12.2H2"
                stroke="#E72E8A"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        ) : null}

        <div
          className={`review-marquee-track flex w-max gap-5 px-5 sm:px-6 ${isPaused ? "review-marquee-paused" : ""}`}
        >
          {marqueeReviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              aria-hidden={index >= reviews.length}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
