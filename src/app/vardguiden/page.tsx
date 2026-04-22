import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Vårdguiden",
  description: "Hitta information om olika sjukdomar, organ och åkommor. Din guide till bättre hälsa med Hemläkare.se.",
  openGraph: {
    title: "Vårdguiden — Hemläkare.se",
    description: "Hitta information om olika sjukdomar, organ och åkommor. Din guide till bättre hälsa med Hemläkare.se.",
    url: "https://hemlakare.se/vardguiden",
  },
};

const categories = [
  {
    label: "Akut vård",
    slug: "akut-vard",
    icon: "/bilder/Omrade-akutvard-.svg",
    color: "#fde8f0",
  },
  {
    label: "Barn- och ungdomars hälsa",
    slug: "barn-ungdomshalsa",
    icon: "/bilder/Omrade-barn-ungdomshalsa-.svg",
    color: "#fde8f0",
  },
  {
    label: "Cancersjukdomar",
    slug: "cancer",
    icon: "/bilder/Omrade-cancer.svg",
    color: "#fde8f0",
  },
  {
    label: "Endokrina sjukdomar",
    slug: "endokrina-sjukdomar",
    icon: "/bilder/Omrade-endokrina-sjukdomar.svg",
    color: "#fde8f0",
  },
  {
    label: "Hjärt- och kärlsjukdomar",
    slug: "hjart-karlsjukdomar",
    icon: "/bilder/Omrade-hjart-karlsjukdomar.svg",
    color: "#fde8f0",
  },
  {
    label: "Hud- och könssjukdomar",
    slug: "hud-konssjukdomar",
    icon: "/bilder/Omrade-hud-konssjukdomar.svg",
    color: "#fde8f0",
  },
  {
    label: "Infektionssjukdomar",
    slug: "infektionssjukdomar",
    icon: "/bilder/Omrade-infektionssjukdomarsvg.svg",
    color: "#fde8f0",
  },
  {
    label: "Kirurgi och plastikkirurgi",
    slug: "kirurgi-plastikkirurgi",
    icon: "/bilder/Omrade-kirurgi-plastikkirurgi.svg",
    color: "#fde8f0",
  },
  {
    label: "Kvinnosjukdomar och förlossning",
    slug: "kvinnosjukdomar-forlossning",
    icon: "/bilder/Omrade-kvinnosjukdommar-forlossning.svg",
    color: "#fde8f0",
  },
  {
    label: "Levnadsvanor",
    slug: "levnadsvanor",
    icon: "/bilder/Omrade-levnadsvanor.svg",
    color: "#fde8f0",
  },
  {
    label: "Lung- och allergisjukdomar",
    slug: "lung-allergisjukdomar",
    icon: "/bilder/Omrade-lung-allergisjukdomar.svg",
    color: "#fde8f0",
  },
  {
    label: "Mag- och tarmsjukdomar",
    slug: "mag-tarmsjukdomar",
    icon: "/bilder/Omrade-mag-tarmsjukdomar.svg",
    color: "#fde8f0",
  },
  {
    label: "Medicinsk diagnostik",
    slug: "medicinsk-diagnostik",
    icon: "/bilder/Omrade-medicinsk-diagnostik.svg",
    color: "#fde8f0",
  },
  {
    label: "Nervsystemets sjukdomar",
    slug: "nervsystemets-sjukdomar",
    icon: "/bilder/Omrade-nervsystemetssjukdomar.svg",
    color: "#fde8f0",
  },
  {
    label: "Njursjukdomar",
    slug: "njursjukdomar",
    icon: "/bilder/Omrade-njursjukdomar.svg",
    color: "#fde8f0",
  },
  {
    label: "Perioperativ vård, intensivvård och transplantation",
    slug: "perioperativ-vard",
    icon: "/bilder/Omrade-perioperativ-vard-intensivvard-transplantation.svg",
    color: "#fde8f0",
  },
  {
    label: "Primärvård",
    slug: "primarvard",
    icon: "/bilder/Omrade-primarvard-.svg",
    color: "#fde8f0",
  },
  {
    label: "Psykisk hälsa",
    slug: "psykisk-halsa",
    icon: "/bilder/Omrade-psykisk-halsa.svg",
    color: "#fde8f0",
  },
  {
    label: "Rehabilitering, habilitering och försäkringsmedicin",
    slug: "rehabilitering",
    icon: "/bilder/Omrade-rehabilitering-habilitering-forsakringsmedicin.svg",
    color: "#fde8f0",
  },
  {
    label: "Reumatiska sjukdomar",
    slug: "reumatiska-sjukdomar",
    icon: "/bilder/Omrade-reumatiska-sjudkomar.svg",
    color: "#fde8f0",
  },
  {
    label: "Rörelseorganens sjukdomar",
    slug: "rorelseorganens-sjukdomar",
    icon: "/bilder/Omrade-rorelseorganens-sjukdomar.svg",
    color: "#fde8f0",
  },
  {
    label: "Sällsynta sjukdomar",
    slug: "sallsynta-sjukdomar",
    icon: "/bilder/Omrade-sallsynta-sjukdomar.svg",
    color: "#fde8f0",
  },
  {
    label: "Tandvård",
    slug: "tandvard",
    icon: "/bilder/Omrade-tandvard.svg",
    color: "#fde8f0",
  },
  {
    label: "Urinvägssjukdomar",
    slug: "urinvagssjukdomar",
    icon: "/bilder/Omrade-urinvagssjukdomar.svg",
    color: "#fde8f0",
  },
  {
    label: "Äldres hälsa",
    slug: "aldres-halsa",
    icon: "/bilder/Omrade-aldres-halsa.svg",
    color: "#fde8f0",
  },
  {
    label: "Ögonsjukdomar",
    slug: "ogonsjukdomar",
    icon: "/bilder/Omrade-ogon-sjukdomar.svg",
    color: "#fde8f0",
  },
  {
    label: "Öron-, näs- och halssjukdomar",
    slug: "oron-nas-hals",
    icon: "/bilder/Omrade-oron-nas-hals-sjukdomar.svg",
    color: "#fde8f0",
  },
];

export default function VardguidenPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section
          className="relative overflow-hidden py-0 px-0"
          style={{ background: "linear-gradient(135deg, #D81B7D 0%, #E72E8A 60%, #f06fac 100%)" }}
        >
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-end gap-0 min-h-[340px]">
            {/* Text */}
            <div className="flex flex-col gap-5 py-16 lg:py-20 flex-1 z-10">
              <span className="inline-flex w-fit px-4 py-1.5 rounded-full text-[0.72rem] font-bold text-white/80 border border-white/30 uppercase tracking-widest">
                Kunskapsstöd &amp; hälsoinformation
              </span>
              <h1 className="text-[2.4rem] sm:text-[3.2rem] font-black text-white leading-[1.1] tracking-tight">
                Vårdguiden
              </h1>
              <p className="text-[1rem] text-white/85 max-w-xl leading-relaxed">
                Riktlinjer och information om sjukdomar, behandlingar och hälsoråd –
                samlade på ett ställe. Välj ett område nedan för att komma igång.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <a
                  href="#omraden"
                  className="px-6 py-3 rounded-full text-[0.9rem] font-bold bg-white transition-all hover:bg-white/90 active:scale-[0.97]"
                  style={{ color: "#D81B7D" }}
                >
                  Utforska områden
                </a>
                <Link
                  href="/appen"
                  className="px-6 py-3 rounded-full text-[0.9rem] font-bold text-white border-2 border-white/50 transition-all hover:border-white hover:bg-white/10"
                >
                  Prata med läkare
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative shrink-0 self-end lg:self-end" style={{ width: 420, height: 300 }}>
              <Image
                src="/bilder/vardpersonal.svg"
                alt="Vårdpersonal"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>

          {/* Wave */}
          <div className="w-full overflow-hidden leading-none" style={{ marginTop: -2 }}>
            <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
              <path d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48 Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* Category grid */}
        <section id="omraden" className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-[1.7rem] font-bold text-gray-900">Välj område</h2>
              <p className="text-[0.95rem] text-gray-500">
                {categories.length} specialistområden – klicka för att läsa mer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/vardguiden/${cat.slug}`}
                  className="group flex items-center gap-4 px-6 py-5 bg-white hover:bg-[#fdf5f9] transition-colors"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden transition-transform group-hover:scale-105"
                    style={{ background: "#fdf0f6" }}
                  >
                    <Image
                      src={cat.icon}
                      alt={cat.label}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span className="text-[0.9rem] font-semibold text-gray-800 group-hover:text-[#D81B7D] transition-colors leading-snug">
                      {cat.label}
                    </span>
                  </div>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className="shrink-0 text-gray-300 group-hover:text-[#E72E8A] transition-colors"
                  >
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Info strip */}
        <section className="py-14 px-6 bg-[#fdf5f9]">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: "Medicinsk kvalitet",
                body: "Informationen är framtagen av legitimerade läkare och uppdateras kontinuerligt.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                title: "Snabb vård",
                body: "Hittar du symtom du är orolig för? Starta ett ärende i appen och få svar samma dag.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
                title: "Din personliga läkare",
                body: "Lista dig hos oss och få en fast läkare som känner dig och din hälsohistorik.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <span style={{ color: "#E72E8A" }}>{item.icon}</span>
                <h3 className="text-[1rem] font-bold text-gray-900">{item.title}</h3>
                <p className="text-[0.88rem] text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-white text-center">
          <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
            <h2 className="text-[1.6rem] font-bold text-gray-900">Behöver du träffa en läkare?</h2>
            <p className="text-[0.95rem] text-gray-600">
              Starta ett digitalt ärende eller boka ett besök – vi finns tillgängliga för dig.
            </p>
            <Link
              href="/appen"
              className="px-10 py-4 rounded-full text-[1rem] font-bold text-white transition-all active:scale-[0.97] hover:opacity-90"
              style={{
                background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)",
                boxShadow: "0 4px 20px rgba(231,46,138,0.35)",
              }}
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
