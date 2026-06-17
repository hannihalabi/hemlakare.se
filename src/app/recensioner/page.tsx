import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata = {
  title: "Recensioner",
  description: "Vad våra patienter säger om Hemläkare.se. Läs recensioner från Google, Vården.se och Trustpilot.",
  openGraph: {
    title: "Recensioner — Hemläkare.se",
    description: "Vad våra patienter säger om Hemläkare.se. Läs recensioner från Google, Vården.se och Trustpilot.",
    url: "https://hemlakare.se/recensioner",
  },
};

const reviews = [
  {
    initials: "M",
    name: "Maria L.",
    quote: "Lätt att nå online, personlig och engagerad personal och tryggt att ha kontakt med samma läkare. Och sen att få hembesök, det är verkligen suveränt! Så skönt att slippa sitta i väntrum med en massa andra sjuka människor när man själv inte är kry.",
    source: "Trustpilot",
    bg: "#e8d5c4",
    color: "#7a4f2e",
  },
  {
    initials: "A",
    name: "Anders K.",
    quote: "Riktigt serviceminded. Vi blev bra bemött och fick snabb vård med kvalité. Läkarna följde även upp ärendet för att se om vi mådde bra efteråt. Det är sådan vård man behöver.",
    source: "Vården.se",
    bg: "#d4dde8",
    color: "#2e4a7a",
  },
  {
    initials: "S",
    name: "Sara J.",
    quote: "Har ALDRIG fått så här bra och smidig vård. Det känns som en vårdcentral i en drömvärld. Jag känner mig alltid trygg när jag vet att jag har hjälp bara några knapptryck från mig 🤩",
    source: "Google",
    bg: "#d4e8d8",
    color: "#2e7a3e",
  },
  {
    initials: "P",
    name: "Petra M.",
    quote: "Fantastiskt snabb respons! Skickade ett meddelande på kvällen och fick svar inom 20 minuter. Min läkare kände mig och förstod direkt vad jag behövde. Rekommenderar varmt!",
    source: "Google",
    bg: "#e8d4e8",
    color: "#6e2e7a",
  },
  {
    initials: "J",
    name: "Johan B.",
    quote: "Som kroniskt sjuk är det guld värt att ha en fast läkare som faktiskt känner min historia. Inga journaler att förklara om och om igen. Äntligen en vårdcentral för 2000-talet.",
    source: "Vården.se",
    bg: "#d4e4e8",
    color: "#2e5f7a",
  },
  {
    initials: "L",
    name: "Lisa O.",
    quote: "Hembesöket var en helt ny upplevelse. Läkaren kom hem till mig när jag var för sjuk för att ta mig till en mottagning. Professionellt, omtänksamt och snabbt. 5 av 5.",
    source: "Trustpilot",
    bg: "#e8e4d4",
    color: "#7a6a2e",
  },
  {
    initials: "K",
    name: "Karin H.",
    quote: "Äntligen en vårdcentral utan timslånga väntetider i telefon. Allt sker online, smidigt och enkelt. Läkaren svarade samma dag och skickade recept direkt till apoteket.",
    source: "Google",
    bg: "#e8d4d4",
    color: "#7a2e2e",
  },
  {
    initials: "T",
    name: "Thomas R.",
    quote: "Väldigt imponerad av servicen. Min dotter fick hjälp med sin allergi snabbt och smidigt via videosamtal. Slapp ta ledigt från jobbet. Det här är framtidens vård.",
    source: "Vården.se",
    bg: "#d4e8e4",
    color: "#2e7a6a",
  },
  {
    initials: "E",
    name: "Eva S.",
    quote: "Otroligt trevlig och kompetent personal. Kände mig sedd och lyssnad på på ett sätt man sällan upplever i vården. Rekommenderar till alla mina vänner.",
    source: "Google",
    bg: "#e4d4e8",
    color: "#5a2e7a",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path d="M9 1.5l2.06 4.18 4.61.67-3.34 3.25.79 4.6L9 11.77l-4.12 2.43.79-4.6L2.33 6.35l4.61-.67L9 1.5Z" fill="#E72E8A" />
        </svg>
      ))}
    </div>
  );
}

export default function RecensionerPage() {
  return (
    <>
      <Header />
      <main className="bg-[#fdf5f9] min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Heading */}
          <div className="flex flex-col gap-2">
            <h1 className="text-[2.4rem] font-bold text-gray-900">Recensioner</h1>
            <p className="text-[1rem] text-gray-500">Det här säger våra patienter</p>
          </div>

          {/* Rating summary */}
          <div className="flex flex-wrap gap-8">
            <div className="flex flex-col items-center gap-1 bg-white rounded-2xl px-8 py-6 shadow-sm border border-gray-100">
              <span className="text-[2.5rem] font-bold" style={{ color: "#E72E8A" }}>4,8</span>
              <Stars />
              <a href="https://google.se" target="_blank" rel="noopener noreferrer" className="text-[0.82rem] font-semibold text-gray-600 mt-1 hover:underline">Betyg på Google</a>
            </div>
            <div className="flex flex-col items-center gap-1 bg-white rounded-2xl px-8 py-6 shadow-sm border border-gray-100">
              <span className="text-[2.5rem] font-bold" style={{ color: "#E72E8A" }}>4,9</span>
              <Stars />
              <a href="https://www.varden.se/" target="_blank" rel="noopener noreferrer" className="text-[0.82rem] font-semibold text-gray-600 mt-1 hover:underline">Betyg på Vården.se</a>
            </div>
            <div className="flex flex-col items-center gap-1 bg-white rounded-2xl px-8 py-6 shadow-sm border border-gray-100">
              <span className="text-[2.5rem] font-bold" style={{ color: "#E72E8A" }}>4,7</span>
              <Stars />
              <span className="text-[0.82rem] font-semibold text-gray-600 mt-1">Betyg på Trustpilot</span>
            </div>
          </div>

          {/* Reviews grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-[1rem] font-bold shrink-0"
                    style={{ background: r.bg, color: r.color }}
                  >
                    {r.initials}
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[0.88rem] font-semibold text-gray-800">{r.name}</span>
                    <span className="text-[0.75rem] text-gray-400">{r.source}</span>
                  </div>
                </div>

                <Stars />

                <p className="text-[0.88rem] text-gray-700 leading-relaxed flex-1">"{r.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
