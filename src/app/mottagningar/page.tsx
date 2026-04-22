import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Link from "next/link";

export const metadata = {
  title: "Mottagningar",
  description: "Hemläkare.se har fysiska mottagningar i Stockholm och Göteborg samt digitala mottagningar tillgängliga över hela Sverige.",
  openGraph: {
    title: "Mottagningar — Hemläkare.se",
    description: "Hemläkare.se har fysiska mottagningar i Stockholm och Göteborg samt digitala mottagningar tillgängliga över hela Sverige.",
    url: "https://hemlakare.se/mottagningar",
  },
};

const locations = [
  {
    city: "Stockholm",
    address: "Sveavägen 42, 111 34 Stockholm",
    phone: "08-123 456 78",
    hours: [
      { day: "Måndag–fredag", time: "08:00–17:00" },
      { day: "Lördag", time: "09:00–13:00" },
      { day: "Söndag", time: "Stängt" },
    ],
    color: "#e8d4e8",
    textColor: "#6e2e7a",
    initials: "STH",
  },
  {
    city: "Göteborg",
    address: "Avenyn 12, 411 36 Göteborg",
    phone: "031-123 456 78",
    hours: [
      { day: "Måndag–fredag", time: "08:00–17:00" },
      { day: "Lördag", time: "09:00–13:00" },
      { day: "Söndag", time: "Stängt" },
    ],
    color: "#d4dde8",
    textColor: "#2e4a7a",
    initials: "GBG",
  },
  {
    city: "Solna",
    address: "Råsundavägen 10, 169 57 Solna",
    phone: "08-987 654 32",
    hours: [
      { day: "Måndag–torsdag", time: "08:00–16:00" },
      { day: "Fredag", time: "08:00–15:00" },
      { day: "Lördag–söndag", time: "Stängt" },
    ],
    color: "#d4e8d8",
    textColor: "#2e7a3e",
    initials: "SOL",
  },
];

const specialties = [
  {
    slug: "aldremottagning",
    title: "Äldremottagning",
    desc: "Specialiserad vård för dig över 65. Vi kommer hem till dig, bedömer läkemedel och hjälper med kroniska tillstånd.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    slug: "prickmottagning",
    title: "Prickmottagning",
    desc: "Orolig för en hudförändring? Skicka bild via appen och få bedömning av läkare med hudkompetens – snabbt och smidigt.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    slug: "hembesok",
    title: "Hembesök",
    desc: "För sjuk för att ta dig till oss? Vi kommer till dig. Hemma, på jobbet eller var du än befinner dig.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    slug: "bvc",
    title: "BVC",
    desc: "Barnhälsovård för dig med barn 0–6 år. Vaccinationer, tillväxtkontroller och råd i barnets tidiga år.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    slug: "uph",
    title: "Ungas Psykiska Hälsa",
    desc: "Digitala lunchföreläsningar och stöd för barn och unga 6–17 år. Gratis för listade familjer.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    slug: "aldremottagning",
    title: "Digital mottagning",
    desc: "Tillgänglig i hela Sverige. Konsultation via text, bild och video – ofta svar inom timmar.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
];


export default function MottagningarPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="bg-[#fdf5f9] py-24 px-6">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
            <span
              className="px-4 py-1.5 rounded-full text-[0.75rem] font-bold text-white"
              style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
            >
              FYSISKT OCH DIGITALT
            </span>
            <h1 className="text-[2.6rem] sm:text-[3.2rem] font-bold tracking-tight text-gray-900 leading-tight">
              Vi möter dig{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
              >
                där du är
              </span>
            </h1>
            <p className="text-[1.05rem] text-gray-600 leading-relaxed max-w-2xl">
              Hemläkare.se har fysiska mottagningar i Stockholm, Göteborg och Solna –
              samt en digital mottagning som nås från hela Sverige, dygnet runt via appen.
            </p>
          </div>
        </section>

        {/* Map placeholder + intro */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-[2rem] font-bold text-gray-900">Fysiska mottagningar</h2>
              <p className="text-[0.98rem] text-gray-600 leading-relaxed">
                Föredrar du ett fysiskt möte? Vi välkomnar dig till våra mottagningar i
                Stockholm, Göteborg och Solna. Alla mottagningar är utrustade med modern
                diagnostik och bemannade av erfarna läkare och sköterskor.
              </p>
              <p className="text-[0.98rem] text-gray-600 leading-relaxed">
                Boka tid via appen och välj om du vill komma in på mottagningen, ha ett
                hembesök eller konsultera digitalt. Du bestämmer.
              </p>
              <Link
                href="/appen"
                className="inline-flex items-center gap-2 w-fit px-7 py-3.5 rounded-full text-[0.95rem] font-bold text-white transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)",
                  boxShadow: "0 4px 16px rgba(231,46,138,0.3)",
                }}
              >
                Boka tid i appen
              </Link>
            </div>
            <ImagePlaceholder label="Kartvy / bild på mottagning" />
          </div>
        </section>

        {/* Location cards */}
        <section className="py-16 px-6 bg-[#f4f4f8]">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            <h2 className="text-[1.8rem] font-bold text-gray-900 text-center">Hitta oss</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((loc) => (
                <div key={loc.city} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                  {/* Image placeholder per location */}
                  <div
                    className="w-full aspect-[3/2] flex items-center justify-center text-[2rem] font-bold"
                    style={{ background: loc.color, color: loc.textColor }}
                  >
                    {/* Replace with: <Image src={`/bilder/${loc.city.toLowerCase()}.jpg`} alt={loc.city} fill className="object-cover" /> */}
                    {loc.initials}
                    <span className="ml-2 text-[0.7rem] font-normal opacity-60">Bild placeras här</span>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <h3 className="text-[1.1rem] font-bold text-gray-900">{loc.city}</h3>

                    <div className="flex items-start gap-2 text-[0.88rem] text-gray-600">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E72E8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {loc.address}
                    </div>

                    <div className="flex items-center gap-2 text-[0.88rem] text-gray-600">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E72E8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      {loc.phone}
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex flex-col gap-1.5">
                      {loc.hours.map((h) => (
                        <div key={h.day} className="flex justify-between text-[0.82rem]">
                          <span className="text-gray-500">{h.day}</span>
                          <span className={`font-semibold ${h.time === "Stängt" ? "text-gray-400" : "text-gray-800"}`}>{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialties */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col gap-12">
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-[2rem] font-bold text-gray-900">Våra specialmottagningar</h2>
              <p className="text-[0.95rem] text-gray-500">
                Utöver allmänmedicin erbjuder vi ett antal specialiserade mottagningar
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialties.map((s, i) => (
                <div key={`${s.slug}-${i}`} className="bg-[#fdf5f9] rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
                  >
                    {s.icon}
                  </div>
                  <h3 className="text-[1rem] font-bold text-gray-900">{s.title}</h3>
                  <p className="text-[0.88rem] text-gray-600 leading-relaxed flex-1">{s.desc}</p>
                  <Link
                    href={`/mottagningar/${s.slug}`}
                    className="text-[0.85rem] font-semibold"
                    style={{ color: "#E72E8A" }}
                  >
                    Läs mer →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Digital section */}
        <section className="py-20 px-6 bg-[#f4f4f8]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <div className="flex flex-col gap-6">
              <span
                className="w-fit px-4 py-1.5 rounded-full text-[0.75rem] font-bold text-white"
                style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
              >
                HELA SVERIGE
              </span>
              <h2 className="text-[2rem] font-bold text-gray-900">Digital mottagning – tillgänglig var du än är</h2>
              <p className="text-[0.98rem] text-gray-600 leading-relaxed">
                Bor du utanför Stockholm eller Göteborg? Vår digitala mottagning är öppen
                för alla i Sverige. Via appen når du din läkare med text, bild eller videosamtal.
              </p>
              <p className="text-[0.98rem] text-gray-600 leading-relaxed">
                Ingen lång väntelista. Ingen telefonkö. Svaret kommer ofta inom några timmar –
                ibland minuter. Du kan även boka digitala möten kvällstid och helger.
              </p>
              <ul className="flex flex-col gap-2">
                {["Textchatt med läkare", "Videokonsultation", "Bildanalys (t.ex. hud)", "Receptförnyelse", "Remiss och sjukintyg"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[0.92rem] text-gray-700">
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
                    >
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <ImagePlaceholder label="Bild på digital konsultation / app" aspect="aspect-[4/3]" />
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-white text-center">
          <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
            <h2 className="text-[1.8rem] font-bold text-gray-900">Hittar vi dig i ditt område?</h2>
            <p className="text-[0.95rem] text-gray-600">
              Skriv in din adress på startsidan och se om vi kan erbjuda vård nära dig – fysiskt eller digitalt.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/"
                className="px-10 py-4 rounded-full text-[1rem] font-bold text-white transition-all active:scale-[0.97] hover:opacity-90"
                style={{
                  background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)",
                  boxShadow: "0 4px 20px rgba(231,46,138,0.35)",
                }}
              >
                Sök ditt område
              </Link>
              <Link
                href="/vardguiden"
                className="px-10 py-4 rounded-full text-[1rem] font-bold border-2 transition-all hover:bg-gray-50"
                style={{ borderColor: "#E72E8A", color: "#E72E8A" }}
              >
                Vårdguiden
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
