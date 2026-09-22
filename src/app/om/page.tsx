import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Om oss",
  description: "Vi är privatfinansierad vård som sätter patienten först. Lär känna teamet och idén bakom Hemläkare.se.",
  alternates: { canonical: "/om" },
  openGraph: {
    title: "Om oss — Hemläkare.se",
    description: "Vi är privatfinansierad vård som sätter patienten först. Lär känna teamet och idén bakom Hemläkare.se.",
    url: `${SITE_URL}/om`,
  },
};

const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Patienten i centrum",
    desc: "Varje beslut vi tar utgår från vad som är bäst för dig – inte för systemet, inte för budgeten.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Tillgänglighet",
    desc: "Vård ska inte kräva att du tar ledigt från jobbet eller väntar i tre veckor. Vi finns där du är, när du behöver.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Kontinuitet",
    desc: "Du ska ha samma läkare och sköterska varje gång. Ingen ska behöva berätta om sin historia om och om igen.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Kvalitet",
    desc: "Vi kompromissar aldrig med medicinsk kvalitet. Vår personal är legitimerad och erfaren – och väljer att arbeta här.",
  },
];


export default function OmOssPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        <section className="bg-[#fdf5f9] py-24 px-6">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
            <span
              className="px-4 py-1.5 rounded-full text-[0.75rem] font-bold text-white"
              style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
            >
              VÅR HISTORIA
            </span>
            <h1 className="text-[2.6rem] sm:text-[3.2rem] font-bold tracking-tight text-gray-900 leading-tight">
              Vi tror att vård ska fungera –{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
              >
                på dina villkor
              </span>
            </h1>
            <p className="text-[1.05rem] text-gray-600 leading-relaxed max-w-2xl">
              Hemläkare.se grundades av läkare och innovatörer som tröttnat på att se patienter
              falla mellan stolarna. Vi bygger en vård som faktiskt är tillgänglig,
              personlig och modern.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-[2rem] font-bold text-gray-900">Varför vi startade</h2>
              <p className="text-[0.98rem] text-gray-600 leading-relaxed">
                Vården i Sverige håller hög medicinsk kvalitet – men systemet har länge sviktat under
                trycket. Långa väntetider, bristande kontinuitet och svårighet att nå sin läkare är
                vardag för miljontals patienter.
              </p>
              <p className="text-[0.98rem] text-gray-600 leading-relaxed">
                Vi tror att det inte behöver vara så. Med rätt teknologi, engagerad personal och ett
                tydligt patientfokus kan vård bli det den var tänkt att vara: en trygg, personlig
                relation mellan dig och ditt vårdteam.
              </p>
              <p className="text-[0.98rem] text-gray-600 leading-relaxed">
                Hemläkare.se är resultatet av det övertygandet. Vi är privatfinansierad vård
                utan kompromisser – för dig som vill ha mer.
              </p>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-gray-100 shadow-xl">
              <Image
                src="/landningspage/hemlakare-grupp.png"
                alt="Teamet bakom Hemläkare.se."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-[#f4f4f8]">
          <div className="max-w-6xl mx-auto flex flex-col gap-12">
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-[2rem] font-bold text-gray-900">Våra värderingar</h2>
              <p className="text-[0.95rem] text-gray-500">Det som styr varje beslut vi tar</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="text-[1rem] font-bold text-gray-900">{v.title}</h3>
                  <p className="text-[0.88rem] text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-gray-100 shadow-xl">
              <Image
                src="/landningspage/hemlakare-grupp.png"
                alt="Teamet på Hemläkare.se."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-[2rem] font-bold text-gray-900">Så arbetar vi</h2>
              <p className="text-[0.98rem] text-gray-600 leading-relaxed">
                Vår modell är enkel: du blir patient hos oss och får ett fast vårdteam – din
                läkare och sköterska – som lär känna dig och din hälsohistoria.
              </p>
              <p className="text-[0.98rem] text-gray-600 leading-relaxed">
                Behöver du snabb hjälp bokar du en tid online. Behöver du ett fysiskt möte
                kommer vi till dig – hemma, på jobbet eller på mottagningen. Ingen ska
                behöva ta ledigt mitt på dagen för att sitta i ett väntrum.
              </p>
              <p className="text-[0.98rem] text-gray-600 leading-relaxed">
                Vi arbetar proaktivt. Istället för att vänta tills du är sjuk hjälper vi
                dig hålla dig frisk – med regelbundna kontroller, personliga hälsoråd och
                modern teknik som blodtrycksmätare kopplade direkt till din läkare.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-white text-center">
          <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
            <h2 className="text-[1.8rem] font-bold text-gray-900">Redo att testa en bättre vård?</h2>
            <p className="text-[0.95rem] text-gray-600">
              Bli patient idag och upplev skillnaden med ett personligt vårdteam som verkligen finns där för dig.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/vardguiden"
                className="btn-cta px-10 py-4 rounded-full text-[1rem] font-bold text-white transition-all"
              >
                Vårdguiden
              </Link>
              <Link
                href="/patientavgifter"
                className="btn-outline px-10 py-4 rounded-full text-[1rem] font-bold transition-all"
              >
                Se avgifter
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
