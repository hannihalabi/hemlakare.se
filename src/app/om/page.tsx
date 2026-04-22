import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Link from "next/link";

export const metadata = {
  title: "Om oss",
  description: "Vi är en privatfinansierad vårdcentral som tror på vård på dina villkor. Lär känna teamet och idén bakom Hemläkare.se.",
  openGraph: {
    title: "Om oss — Hemläkare.se",
    description: "Vi är en privatfinansierad vårdcentral som tror på vård på dina villkor. Lär känna teamet och idén bakom Hemläkare.se.",
    url: "https://hemlakare.se/om",
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

const team = [
  {
    name: "Dr. Anna Lindqvist",
    role: "Grundare & Medicinsk chef",
    bio: "Specialist i allmänmedicin med 15 års erfarenhet. Startade Hemläkare.se efter att ha sett hur systemen svikit patienterna för länge.",
    image: null,
    initials: "AL",
    bg: "#e8d4e8",
    color: "#6e2e7a",
  },
  {
    name: "Marcus Bergström",
    role: "VD & Medgrundare",
    bio: "Bakgrund inom healthtech och digital innovation. Tror att teknologi och mänsklig omsorg kan förenas.",
    image: null,
    initials: "MB",
    bg: "#d4dde8",
    color: "#2e4a7a",
  },
  {
    name: "Dr. Sara Johansson",
    role: "Distriktsläkare",
    bio: "Specialiserad på kroniska sjukdomar och preventiv medicin. Älskar det personliga mötet med patienten.",
    image: null,
    initials: "SJ",
    bg: "#d4e8d8",
    color: "#2e7a3e",
  },
  {
    name: "Petra Ek",
    role: "Distriktssköterska",
    bio: "20 år i vården, varav 10 som hemsjukvårdssköterska. Ingen förstår hembesökets värde bättre än Petra.",
    image: null,
    initials: "PE",
    bg: "#e8d5c4",
    color: "#7a4f2e",
  },
];

const milestones = [
  { year: "2019", text: "Hemläkare.se grundas i Stockholm med idén om vård utan väntrum." },
  { year: "2020", text: "Första digitala konsultationen genomförd. Appen lanseras för iOS och Android." },
  { year: "2021", text: "Utökar till Göteborg. 5 000 listade patienter." },
  { year: "2022", text: "Prickmottagningen lanseras – digital hudvård med läkarbedömning samma dag." },
  { year: "2023", text: "Mottagningen för Ungas Psykiska Hälsa öppnar. 20 000 patienter." },
  { year: "2024", text: "Blodtrycksmätare kopplad till appen – proaktiv hälsoövervakning i hemmet." },
  { year: "2025", text: "Expansion till fler städer. Nominerade till Årets Healthtech-bolag." },
  { year: "2026", text: "Idag. Vi fortsätter att växa – med patienten i centrum, alltid." },
];


export default function OmOssPage() {
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
              falla mellan stolarna. Vi bygger en vårdcentral som faktiskt är tillgänglig,
              personlig och modern.
            </p>
          </div>
        </section>

        {/* Story + image */}
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
                Hemläkare.se är resultatet av det övertygandet. Vi är en privatfinansierad vårdcentral
                utan kompromisser – för dig som vill ha mer.
              </p>
            </div>
            <ImagePlaceholder label="Bild på grundarteamet eller mottagningen" />
          </div>
        </section>

        {/* Values */}
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

        {/* How we work + image */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <ImagePlaceholder label="Bild på läkare i hembesök eller digital konsultation" />
            <div className="flex flex-col gap-6">
              <h2 className="text-[2rem] font-bold text-gray-900">Så arbetar vi</h2>
              <p className="text-[0.98rem] text-gray-600 leading-relaxed">
                Vår modell är enkel: du listas hos oss och får ett fast vårdteam – din läkare
                och sköterska – som lär känna dig och din hälsohistoria.
              </p>
              <p className="text-[0.98rem] text-gray-600 leading-relaxed">
                Behöver du snabb hjälp skriver du i appen. Behöver du ett fysiskt möte
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

        {/* Timeline */}
        <section className="py-20 px-6 bg-[#fdf5f9]">
          <div className="max-w-3xl mx-auto flex flex-col gap-10">
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-[2rem] font-bold text-gray-900">Vår resa</h2>
              <p className="text-[0.95rem] text-gray-500">Från idé till en av Sveriges mest uppskattade privatvårdscentraler</p>
            </div>
            <div className="flex flex-col gap-0">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-6 relative">
                  {/* Line */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[0.7rem] font-bold shrink-0 z-10"
                      style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
                    >
                      {m.year.slice(2)}
                    </div>
                    {i < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-pink-100 mt-1" />
                    )}
                  </div>
                  <div className="pb-8 pt-1.5 flex flex-col gap-1">
                    <span className="text-[0.82rem] font-bold" style={{ color: "#E72E8A" }}>{m.year}</span>
                    <p className="text-[0.95rem] text-gray-700 leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col gap-12">
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-[2rem] font-bold text-gray-900">Teamet bakom</h2>
              <p className="text-[0.95rem] text-gray-500">Erfarna, engagerade och valda för sin passion för vård</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.name} className="bg-[#fdf5f9] rounded-2xl p-6 flex flex-col gap-4 border border-gray-100">
                  {/* Avatar / photo placeholder */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-[1.3rem] font-bold"
                    style={{ background: member.bg, color: member.color }}
                  >
                    {member.initials}
                    {/* Replace with: <Image src={member.image} alt={member.name} fill className="object-cover rounded-2xl" /> */}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.95rem] font-bold text-gray-900">{member.name}</span>
                    <span className="text-[0.78rem] font-semibold" style={{ color: "#E72E8A" }}>{member.role}</span>
                  </div>
                  <p className="text-[0.85rem] text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-[0.85rem] text-gray-400">
              + ett team av läkare, sköterskor, psykologer och hälsopedagoger runt om i Sverige
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-6 bg-[#f4f4f8]">
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { num: "30 000+", label: "Listade patienter" },
              { num: "4,8", label: "Snittbetyg på Google" },
              { num: "7 år", label: "I branschen" },
              { num: "<4h", label: "Svarstid i snitt" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl py-8 px-4 shadow-sm border border-gray-100 flex flex-col gap-2">
                <span
                  className="text-[2rem] font-bold"
                  style={{ color: "#E72E8A" }}
                >
                  {s.num}
                </span>
                <span className="text-[0.82rem] font-semibold text-gray-500">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-white text-center">
          <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
            <h2 className="text-[1.8rem] font-bold text-gray-900">Redo att testa en bättre vård?</h2>
            <p className="text-[0.95rem] text-gray-600">
              Lista dig idag och upplev skillnaden med ett personligt vårdteam som verkligen finns där för dig.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/vardguiden"
                className="px-10 py-4 rounded-full text-[1rem] font-bold text-white transition-all active:scale-[0.97] hover:opacity-90"
                style={{
                  background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)",
                  boxShadow: "0 4px 20px rgba(231,46,138,0.35)",
                }}
              >
                Vårdguiden
              </Link>
              <Link
                href="/patientavgifter"
                className="px-10 py-4 rounded-full text-[1rem] font-bold border-2 text-gray-700 hover:bg-gray-50 transition-all"
                style={{ borderColor: "#E72E8A", color: "#E72E8A" }}
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
