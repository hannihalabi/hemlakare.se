import Link from "next/link";

const reviews = [
  {
    initials: "M",
    quote:
      "Lätt att nå online, personlig och engagerad personal och tryggt att ha kontakt med samma läkare. Och sen att få hembesök, det är verkligen suveränt! Så skönt att slippa sitta i väntrum med en massa andra sjuka människor när man själv inte är kry.",
    source: "Recension på Trustpilot",
    bg: "#e8d5c4",
    color: "#7a4f2e",
  },
  {
    initials: "A",
    quote:
      "Riktigt serviceminded. Vi blev bra bemött och fick snabb vård med kvalité. Läkarna följde även upp ärendet för att se om vi mådde bra efteråt. Det är sådan vård man behöver.",
    source: "Recension på Vården.se",
    bg: "#d4dde8",
    color: "#2e4a7a",
  },
  {
    initials: "S",
    quote:
      "Har ALDRIG fått så här bra och smidig vård. Det känns som en vårdcentral i en drömvärld. Jag känner mig alltid trygg när jag vet att jag har hjälp bara några knapptryck från mig 🤩",
    source: "Recension på Google",
    bg: "#d4e8d8",
    color: "#2e7a3e",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
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

export default function Omdomen() {
  return (
    <section className="bg-[#fdf5f9] py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        {/* Heading */}
        <h2 className="text-[2rem] sm:text-[2.4rem] font-bold tracking-tight text-gray-900 text-center">
          Det här säger våra patienter
        </h2>

        {/* Rating badges */}
        <div className="flex flex-wrap items-center justify-center gap-10">
          {/* Google */}
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

          {/* Vården.se */}
          <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm">
            <div className="flex gap-0.5">
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

        {/* Review cards */}
        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div
              key={r.source}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex flex-col items-center gap-4 text-center"
            >
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-[1.2rem] font-bold shrink-0"
                style={{ background: r.bg, color: r.color }}
              >
                {r.initials}
              </div>

              <Stars />

              <p className="text-[0.93rem] text-gray-700 leading-relaxed">
                "{r.quote}"
              </p>

              <span className="text-[0.82rem] text-gray-400 mt-auto">{r.source}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
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
