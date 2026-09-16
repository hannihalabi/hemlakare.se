import Link from "next/link";

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

  return (
    <section className="overflow-hidden bg-[#fdf5f9] py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6">
        <h2 className="text-[2rem] sm:text-[2.4rem] font-bold tracking-tight text-gray-900 text-center">
          Det här säger våra patienter
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-10">
          <div className="flex flex-col items-center gap-1">
            <span
              className="text-[3rem] font-bold leading-none"
              style={{ color: "#E72E8A" }}
            >
              4,8
            </span>
            <Stars />
            <span className="text-[0.875rem] font-semibold text-gray-700 mt-1">
              Betyg på Google
            </span>
          </div>

          <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm">
            <div className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="22" height="22" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 1.5l2.06 4.18 4.61.67-3.34 3.25.79 4.6L9 11.77l-4.12 2.43.79-4.6L2.33 6.35l4.61-.67L9 1.5Z"
                    fill="#c0874a"
                  />
                </svg>
              ))}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[1.4rem] font-bold text-gray-800">4.9</span>
              <span className="text-[1rem] font-bold" style={{ color: "#2a7fa8" }}>
                vården.se
              </span>
            </div>
          </div>
        </div>

        <div className="relative w-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#fdf5f9] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#fdf5f9] to-transparent" />

          <div className="review-marquee-track flex w-max gap-5 px-6">
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

        <Link
          href="/recensioner"
          className="btn-cta px-10 py-4 rounded-full text-[1rem] font-bold text-white transition-all"
        >
          Se fler recensioner
        </Link>
      </div>
    </section>
  );
}
