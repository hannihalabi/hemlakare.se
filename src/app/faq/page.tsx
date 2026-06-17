"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Link from "next/link";
import { useState } from "react";

const categories = [
  {
    label: "Komma igång",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 8 16 12 12 16" /><line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    faqs: [
      {
        q: "Behöver jag lista mig?",
        a: "Ja, för att få tillgång till din egen läkare och sköterska behöver du lista dig hos oss. Det gör du enkelt via appen på bara några minuter med hjälp av BankID.",
      },
      {
        q: "Hur laddar jag ner appen?",
        a: "Appen finns på App Store (iOS) och Google Play (Android). Sök på 'Hemläkare' så hittar du oss. Registrering sker med BankID.",
      },
      {
        q: "Hur snabbt kan jag komma igång?",
        a: "Du kan lista dig och skicka ditt första ärende samma dag. Vår personal svarar oftast inom några timmar under vardagar.",
      },
      {
        q: "Kan jag lista hela familjen?",
        a: "Ja, du kan lista flera familjemedlemmar under samma konto. Barn listas av en vårdnadshavare.",
      },
    ],
  },
  {
    label: "Avgifter",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    faqs: [
      {
        q: "Vad kostar det?",
        a: "Hos Hemläkare.se gäller fast pris: läkarhjälp kostar 995 kr, oavsett om den sker digitalt eller på mottagning. Hembesök kostar mer. Se vår avgiftssida för fullständig prislista.",
      },
      {
        q: "Gäller mitt frikort?",
        a: "Nej. Vi är privatfinansierad vård utan regionavtal, vilket innebär att frikort och högkostnadsskydd inte gäller hos oss.",
      },
      {
        q: "Kan jag använda privat sjukvårdsförsäkring?",
        a: "Ja, i många fall täcker din privata sjukvårdsförsäkring kostnaden helt eller delvis. Kontakta ditt försäkringsbolag för att ta reda på vad som gäller för dig.",
      },
      {
        q: "Kostar det något att lista sig?",
        a: "Nej, det är kostnadsfritt att lista sig hos oss. Du betalar bara när du nyttjar vård.",
      },
    ],
  },
  {
    label: "Vård & besök",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    faqs: [
      {
        q: "Hur fungerar ett hembesök?",
        a: "Du bokar hembesök via appen och väljer en tid som passar. Läkaren eller sköterskan kommer till dig – hemma, på jobbet eller annan önskad plats – med utrustning för de vanligaste undersökningarna.",
      },
      {
        q: "Kan jag få recept digitalt?",
        a: "Ja, läkaren kan förnya eller utfärda recept direkt i appen. Receptet skickas digitalt till valfritt apotek.",
      },
      {
        q: "Hur begär jag en remiss?",
        a: "Skicka ett meddelande i appen om varför du behöver remiss. Läkaren bedömer och utfärdar remissen digitalt om det är medicinskt motiverat.",
      },
      {
        q: "Kan jag få sjukintyg?",
        a: "Ja, vi utfärdar sjukintyg från dag 8 av sjukskrivning. För dag 1–7 räcker det med egenförsäkran hos arbetsgivaren.",
      },
    ],
  },
  {
    label: "Var finns ni?",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    faqs: [
      {
        q: "Var finns ni fysiskt?",
        a: "Vi har fysiska mottagningar i Stockholm, Göteborg och Solna. Se vår mottagningssida för adresser och öppettider.",
      },
      {
        q: "Kan jag använda er om jag bor utanför era städer?",
        a: "Absolut. Vår digitala mottagning är tillgänglig i hela Sverige. Via appen når du din läkare oavsett var du befinner dig.",
      },
      {
        q: "Erbjuder ni hembesök utanför städerna?",
        a: "Hembesök erbjuds i nuläget inom Stockholm, Göteborg och Solna. Vi utökar kontinuerligt. Kontakta oss för mer information om ditt område.",
      },
    ],
  },
  {
    label: "Teknik & app",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    faqs: [
      {
        q: "Prata med vårdpersonalen i appen – hur fungerar det?",
        a: "I appen startar du ett ärende och beskriver dina besvär. Du kan skicka text, bilder och ha videosamtal. Läkare eller sköterska svarar och ni kommunicerar direkt i chatten.",
      },
      {
        q: "Är mina uppgifter säkra?",
        a: "Ja. Vi följer GDPR och hälsodatalagstiftning. All kommunikation är krypterad och dina journaluppgifter hanteras enligt Patientdatalagen.",
      },
      {
        q: "Fungerar appen på alla enheter?",
        a: "Appen finns för iPhone (iOS 14+) och Android (8.0+). Du kan också använda webversionen via din dator på vår webbplats.",
      },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
      >
        <span className="text-[0.95rem] font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
          {q}
        </span>
        <span
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all"
          style={{
            background: open ? "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" : "#f3f4f6",
          }}
        >
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <path d="M2 4l4 4 4-4" stroke={open ? "white" : "#6b7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="text-[0.9rem] text-gray-600 leading-relaxed pb-4">{a}</p>
      )}
    </div>
  );
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="bg-[#fdf5f9] py-20 px-6">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-5">
            <span
              className="px-4 py-1.5 rounded-full text-[0.75rem] font-bold text-white"
              style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
            >
              HJÄLPCENTER
            </span>
            <h1 className="text-[2.6rem] font-bold tracking-tight text-gray-900 leading-tight">
              Hur kan vi{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
              >
                hjälpa dig?
              </span>
            </h1>
            <p className="text-[1rem] text-gray-500 max-w-xl">
              Här hittar du svar på de vanligaste frågorna om Hemläkare.se. Hittar du inte svaret
              du söker — skriv till oss direkt i appen.
            </p>
          </div>
        </section>

        {/* FAQ body */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10">

            {/* Category sidebar */}
            <div className="lg:w-56 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(i)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-[0.85rem] font-semibold whitespace-nowrap transition-all text-left ${
                    activeCategory === i
                      ? "text-white shadow-md"
                      : "text-gray-600 bg-gray-50 hover:bg-gray-100"
                  }`}
                  style={
                    activeCategory === i
                      ? { background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }
                      : {}
                  }
                >
                  <span className={activeCategory === i ? "text-white" : "text-gray-400"}>
                    {cat.icon}
                  </span>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* FAQ accordion */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
              <h2 className="text-[1.2rem] font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span style={{ color: "#E72E8A" }}>{categories[activeCategory].icon}</span>
                {categories[activeCategory].label}
              </h2>
              <div className="flex flex-col">
                {categories[activeCategory].faqs.map((faq) => (
                  <AccordionItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Still need help */}
        <section className="py-16 px-6 bg-[#fdf5f9]">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-8 bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="flex flex-col gap-2 text-center sm:text-left flex-1">
              <h3 className="text-[1.1rem] font-bold text-gray-900">Hittade du inte svaret du sökte?</h3>
              <p className="text-[0.9rem] text-gray-500">Skriv till oss direkt i appen så svarar vi så snart vi kan – oftast samma dag.</p>
            </div>
            <Link
              href="/appen"
              className="btn-cta shrink-0 px-7 py-3.5 rounded-full text-[0.9rem] font-bold text-white transition-all"
            >
              Öppna appen
            </Link>
          </div>
        </section>

      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
