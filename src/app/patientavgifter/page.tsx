import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Link from "next/link";

export const metadata = {
  title: "Patientavgifter",
  description: "Hemläkare.se är privatfinansierad vård. Läs om vad vården kostar och vad du får för pengarna.",
  openGraph: {
    title: "Patientavgifter — Hemläkare.se",
    description: "Hemläkare.se är privatfinansierad vård. Läs om vad vården kostar och vad du får för pengarna.",
    url: "https://hemlakare.se/patientavgifter",
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
];

const included = [
  "Din egen personliga läkare och sköterska",
  "Snabb respons online – ofta samma dag",
  "Fysiska möten i hemmet, på arbetet eller på mottagningen",
  "Digitala konsultationer via text, bild och video",
  "Proaktiv uppföljning av din hälsa",
  "Ingen lång telefonkö eller väntrum",
];

export default function PatientavgifterPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
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

        {/* Important notice */}
        <section className="py-14 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border-2 border-[#E72E8A]/20 bg-[#fdf5f9] p-8 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" fill="#E72E8A" fillOpacity="0.15" />
                  <path d="M12 8v4m0 4h.01" stroke="#E72E8A" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div>
                  <p className="text-[0.95rem] font-bold text-gray-900 mb-1">Viktigt att känna till innan du listar dig</p>
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

        {/* Image + what you get */}
        <section className="py-14 px-6 bg-[#f4f4f8]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            {/* Image placeholder */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-md">
              {/* Replace src with real image when ready */}
              {/* <Image src="/bilder/patientavgifter.jpg" alt="Läkare och patient" fill className="object-cover" /> */}
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-[0.8rem]">Bild placeras här</span>
              </div>
            </div>

            {/* What's included */}
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

        {/* Pricing */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto flex flex-col gap-10">
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-[1.8rem] font-bold text-gray-900">Avgifter</h2>
              <p className="text-[0.95rem] text-gray-500">
                Alla priser är inklusive moms. Betalning sker online eller via faktura.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { type: "Läkarhjälp – digitalt eller på mottagning", price: "995 kr", desc: "Fast pris, samma dag – text, bild, video eller fysiskt besök" },
                { type: "Hembesök", price: "Från 1 995 kr", desc: "Läkaren kommer hem till dig" },
                { type: "Recept och remiss", price: "Ingår", desc: "Vid konsultation – ingen extra avgift" },
                { type: "Provtagning", price: "Från 195 kr", desc: "Beroende på typ av prov" },
              ].map((item) => (
                <div
                  key={item.type}
                  className="flex items-start justify-between gap-4 p-5 rounded-2xl border border-gray-100 bg-[#fdf5f9]"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.95rem] font-semibold text-gray-900">{item.type}</span>
                    <span className="text-[0.82rem] text-gray-500">{item.desc}</span>
                  </div>
                  <span
                    className="text-[1rem] font-bold shrink-0"
                    style={{ color: "#E72E8A" }}
                  >
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[0.82rem] text-gray-400 text-center">
              * Läkarhjälp har fast pris (995 kr). Övriga tjänster kan variera beroende på omfattning. Kontakta oss för exakt prissättning.
            </p>
          </div>
        </section>

        {/* FAQ */}
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

        {/* CTA */}
        <section className="py-16 px-6 bg-white text-center">
          <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
            <h2 className="text-[1.6rem] font-bold text-gray-900">Utforska Vårdguiden</h2>
            <p className="text-[0.95rem] text-gray-600">
              Lista dig idag och få tillgång till din egen läkare redan imorgon.
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
