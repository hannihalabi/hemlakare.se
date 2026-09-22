import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Link from "next/link";
import { healthPackages } from "@/data/healthPackages";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Priser och hälsokontroller",
  description: "Se Hemläkare.se:s priser, patientavgifter och paket för hälsokontroll i Stockholm.",
  alternates: { canonical: "/patientavgifter" },
  openGraph: {
    title: "Patientavgifter — Hemläkare.se",
    description: "Se Hemläkare.se:s priser, patientavgifter och paket för hälsokontroll i Stockholm.",
    url: `${SITE_URL}/patientavgifter`,
  },
};

const faqs = [
  {
    q: "Ingår mina besök i högkostnadsskyddet?",
    a: "Nej. Eftersom vi är en privat vårdgivare utan regionavtal ingår dina besök inte i det offentliga högkostnadsskyddet. Du betalar hela avgiften själv.",
  },
  {
    q: "Kan jag använda mitt frikort?",
    a: "Frikortet gäller inom den landstings-/regionfinansierade vården. Hos oss gäller det inte, eftersom vi finansieras privat.",
  },
  {
    q: "Kan jag få ersättning från mitt försäkringsbolag?",
    a: "Ja, om du har en privat sjukvårdsförsäkring kan den ofta täcka kostnaden helt eller delvis. Kontakta ditt försäkringsbolag för att ta reda på vad som gäller för din försäkring.",
  },
  {
    q: "Varför kostar det mer än en vanlig vårdcentral?",
    a: "Vi finansieras inte av skattemedel eller region. Det innebär att vi kan erbjuda kortare väntetider, en fast läkarkontakt, hembesök och digital tillgänglighet – utan de begränsningar som offentlig vård ofta innebär.",
  },
  {
    q: "Vilka hälsokontroller erbjuder ni?",
    a: "Vi erbjuder flera blodprovspaket med olika omfattning, från Hälsokontroll Lagom till Kvinna Plus och Man Plus. Se paketen nedan för antal markörer och aktuellt pris.",
  },
];

const included = [
  "Din egen personliga läkare och sköterska",
  "Snabb respons online – ofta samma dag",
  "Fysiska möten i hemmet, på arbetet eller på mottagningen",
  "Digitala konsultationer via text, bild och video",
  "Proaktiv uppföljning av din hälsa",
  "Ingen lång telefonkö eller väntrum",
];

const fees = [
  {
    type: "Fysiskt läkarbesök",
    price: "995 kr",
    originalPrice: "2 790 kr",
    desc: "Läkaren kommer hem till dig i Stockholm",
  },
  { type: "Digitalt läkarbesök", price: "595 kr", desc: "Läkare via videosamtal" },
  { type: "Receptförnyelse", price: "495 kr", desc: "Medicinsk bedömning av receptet" },
  { type: "Hudförändringar", price: "695 kr", desc: "Digital läkarbedömning av hudbesvär" },
  { type: "Hälsokontroll", price: "Från 995 kr", desc: "Hälsokontroller med blodprov" },
  { type: "Vaccination hemma", price: "Från 295 kr/dos", desc: "Priset beror på vaccin – hembesöksavgift kan tillkomma" },
];

export default function PatientavgifterPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        <section className="bg-[#fdf5f9] py-20 px-6">
          <div className="max-w-4xl mx-auto flex flex-col gap-6 items-center text-center">
            <span
              className="px-4 py-1.5 rounded-full text-[0.75rem] font-bold text-white"
              style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
            >
              PRIVATFINANSIERAD VÅRD
            </span>
            <h1 className="text-[2.4rem] sm:text-[3rem] font-bold tracking-tight text-gray-900 leading-tight">
              Du betalar själv –<br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
              >
                och du märker skillnaden
              </span>
            </h1>
            <p className="text-[1.05rem] text-gray-600 leading-relaxed max-w-2xl">
              Hemläkare.se är privatfinansierad vård utan avtal med region eller landsting.
              Det innebär att vi inte begränsas av offentliga kösystem, scheman eller besparingar –
              men att du betalar för vården direkt ur egen ficka eller via privat sjukvårdsförsäkring.
            </p>
          </div>
        </section>

        <section className="bg-white px-6 py-12">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border-2 border-[#E72E8A]/25 bg-[#fdf5f9] shadow-[0_22px_55px_-32px_rgba(216,27,125,0.7)]">
            <div className="grid items-center gap-7 p-7 sm:p-10 md:grid-cols-[1fr_auto]">
              <div>
                <span className="inline-flex rounded-full bg-[#E72E8A] px-3.5 py-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-white">
                  Aktuellt pris
                </span>
                <h2 className="mt-4 text-[1.7rem] font-bold text-gray-900">
                  Läkarhjälp för mindre än halva ordinarie priset
                </h2>
                <p className="mt-2 max-w-xl text-[0.92rem] leading-relaxed text-gray-600">
                  Boka digitalt eller på vår mottagning i Stockholm.
                </p>
              </div>
              <div className="rounded-2xl bg-white px-6 py-5 text-center shadow-sm">
                <p className="text-[0.82rem] text-gray-500">
                  Ordinarie pris <del className="font-semibold decoration-2">2 790 kr</del>
                </p>
                <p className="mt-1 text-[2.5rem] font-black tracking-tight text-[#D81B7D]">995 kr</p>
                <p className="mt-1 text-[0.78rem] font-bold text-green-700">Du sparar 1 795 kr</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border-2 border-[#E72E8A]/20 bg-[#fdf5f9] p-8 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" fill="#E72E8A" fillOpacity="0.15" />
                  <path d="M12 8v4m0 4h.01" stroke="#E72E8A" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div>
                  <p className="text-[0.95rem] font-bold text-gray-900 mb-1">Viktigt att känna till innan du blir patient</p>
                  <p className="text-[0.9rem] text-gray-600 leading-relaxed">
                    Vanliga patientavgifter, frikort och högkostnadsskydd <strong>gäller inte</strong> hos oss.
                    Vi är inte en del av den offentligt finansierade primärvården.
                    Vård hos oss betalas privat – antingen direkt eller via privat sjukvårdsförsäkring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 px-6 bg-[#f4f4f8]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-md">
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-[0.8rem]">Bild placeras här</span>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="text-[1.8rem] font-bold text-gray-900 leading-snug">
                Vad ingår i din vård?
              </h2>
              <p className="text-[0.95rem] text-gray-600 leading-relaxed">
                Du köper inte bara ett läkarbesök – du får tillgång till ett personligt vårdteam
                som känner dig, finns tillgängliga och följer dig över tid.
              </p>
              <ul className="flex flex-col gap-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-[0.95rem] text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto flex flex-col gap-10">
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-[1.8rem] font-bold text-gray-900">Avgifter</h2>
              <p className="text-[0.95rem] text-gray-500">
                Alla priser är inklusive moms. Betalning sker online eller via faktura.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {fees.map((item) => (
                <div
                  key={item.type}
                  className="flex items-start justify-between gap-4 p-5 rounded-2xl border border-gray-100 bg-[#fdf5f9]"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.95rem] font-semibold text-gray-900">{item.type}</span>
                    <span className="text-[0.82rem] text-gray-500">{item.desc}</span>
                  </div>
                  <span
                    className="flex shrink-0 flex-col items-end text-[1rem] font-bold"
                    style={{ color: "#E72E8A" }}
                  >
                    {item.price}
                    {item.originalPrice && (
                      <del className="text-[0.78rem] font-medium text-gray-400 decoration-2">
                        {item.originalPrice}
                      </del>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[0.82rem] text-gray-400 text-center">
              * Priset 995 kr gäller fysiskt läkarbesök. Ordinarie pris är 2 790 kr. Övriga tjänster kan variera beroende på omfattning.
            </p>
          </div>
        </section>

        <section id="halsokontroller" className="scroll-mt-24 bg-[#fdf5f9] px-6 py-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-10">
            <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
              <span className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-[#D81B7D]">
                Flera nivåer
              </span>
              <h2 className="text-[1.9rem] font-bold text-gray-900">Hälsokontroller</h2>
              <p className="text-[0.95rem] leading-relaxed text-gray-600">
                Välj paket utifrån hur omfattande genomgång du önskar. Paketen innehåller mellan 32 och 66 hälsomarkörer.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {healthPackages.map((healthPackage) => (
                <article key={healthPackage.name} className="flex flex-col rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#D81B7D]">
                    {healthPackage.level}
                  </p>
                  <h3 className="mt-3 text-[1.2rem] font-bold text-gray-900">{healthPackage.name}</h3>
                  <p className="mt-1 text-[0.85rem] font-semibold text-gray-900">
                    {healthPackage.markers} markörer · {healthPackage.price}
                  </p>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-gray-600">
                    {healthPackage.description}
                  </p>
                  <a
                    href={`mailto:info@hemlakare.se?subject=${encodeURIComponent(healthPackage.name)}`}
                    className="btn-outline mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 text-[0.88rem] font-bold"
                  >
                    Fråga om paketet
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-[#f4f4f8]">
          <div className="max-w-3xl mx-auto flex flex-col gap-8">
            <h2 className="text-[1.8rem] font-bold text-gray-900">Vanliga frågor om avgifter</h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <p className="text-[0.95rem] font-bold text-gray-900 mb-2">{faq.q}</p>
                  <p className="text-[0.9rem] text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-white text-center">
          <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
            <h2 className="text-[1.6rem] font-bold text-gray-900">Utforska Vårdguiden</h2>
            <p className="text-[0.95rem] text-gray-600">
              Bli patient idag och få tillgång till din egen läkare redan imorgon.
            </p>
            <Link
              href="/vardguiden"
              className="btn-cta px-10 py-4 rounded-full text-[1rem] font-bold text-white transition-all"
            >
              Vårdguiden
            </Link>
          </div>
        </section>

      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
