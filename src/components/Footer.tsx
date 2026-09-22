import Image from "next/image";
import Link from "next/link";
import { healthcareServices } from "@/data/services";

const quickLinks = [
  ["Frågor & svar", "/faq"],
  ["Recensioner", "/recensioner"],
  ["Patientavgifter", "/patientavgifter"],
  ["Hälsokontroller", "/patientavgifter#halsokontroller"],
  ["Här finns vi", "/mottagningar"],
  ["Vårdguiden", "/vardguiden"],
  ["Om företaget", "/om"],
  ["Sjukdomar & besvär", "/vardguiden"],
  ["Lediga jobb", "mailto:info@hemlakare.se?subject=Lediga%20jobb"],
];

const kontakt = [
  ["Kontakta oss", "mailto:info@hemlakare.se"],
  ["Klagomål", "mailto:info@hemlakare.se?subject=Klagom%C3%A5l"],
  ["Adresser", "/mottagningar"],
  ["Remisser & journaler", "mailto:info@hemlakare.se?subject=Remisser%20och%20journaler"],
  ["Öppettider", "/mottagningar"],
  ["Telefon för vårdgivare", "mailto:info@hemlakare.se?subject=Kontakt%20f%C3%B6r%20v%C3%A5rdgivare"],
  ["Telefonnummer", "/mottagningar"],
];

const mottagningar = [
  ["Stockholm", "/mottagningar"],
  ["Prickmottagning", "/mottagningar#specialmottagningar"],
  ["Hembesök", "/mottagningar#specialmottagningar"],
  ["Vaccination hemma", "/mottagningar#vaccination-hemma"],
  ["Ungas Psykiska Hälsa", "/mottagningar#specialmottagningar"],
];

const merInfo = [
  ["Nyhetsbrev", "mailto:info@hemlakare.se?subject=Nyhetsbrev"],
  ["Blodtrycksmätare kopplad till läkaren", "mailto:info@hemlakare.se?subject=Blodtrycksm%C3%A4tare"],
  ["Aktuellt", "/aktuellt"],
];

function StarsFilled() {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 1.5l2.06 4.18 4.61.67-3.34 3.25.79 4.6L9 11.77l-4.12 2.43.79-4.6L2.33 6.35l4.61-.67L9 1.5Z"
            fill="#f5a623"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#2b2d3b] text-white px-6 pt-16 pb-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Image
              src="/bilder/logo/hemlakare-icon-stethoscope.svg"
              alt=""
              width={32}
              height={32}
            />
            <span className="text-[1rem] font-semibold tracking-tight">hemläkare.se</span>
          </div>

          <p className="text-[0.88rem] font-semibold text-white/80">Privat vård utan kö</p>

          <StarsFilled />

          <Link
            href="/#omradeskontroll"
            className="inline-flex items-center justify-center px-5 py-3 rounded-full text-[0.88rem] font-bold text-white border-2 transition-all hover:opacity-80"
            style={{ borderColor: "#E72E8A", color: "#E72E8A" }}
          >
            Se om vi finns i ditt område
          </Link>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
            {quickLinks.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-[0.82rem] text-white/70 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-[1rem] font-bold">Kontakta oss</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {kontakt.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-[0.82rem] text-white/70 hover:text-white transition-colors leading-snug"
              >
                {label}
              </Link>
            ))}
          </div>

          <h3 className="text-[1rem] font-bold mt-4">Mottagningar</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {mottagningar.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-[0.82rem] text-white/70 hover:text-white transition-colors leading-snug"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-[1rem] font-bold">Våra tjänster</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1">
            {healthcareServices.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug === "fysiskt-lakarbesok" ? "lakare/hembesok" : service.slug}`}
                className="text-[0.82rem] text-white/70 transition-colors hover:text-white"
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-[1rem] font-bold">Få mer information</h3>

          <a
            href="mailto:info@hemlakare.se"
            className="inline-flex items-center justify-center w-fit px-6 py-2.5 rounded-full text-[0.88rem] font-bold border-2 transition-all hover:opacity-80"
            style={{ borderColor: "#E72E8A", color: "#E72E8A" }}
          >
            Jag vill ha mer info
          </a>

          <div className="flex flex-col gap-3">
            {merInfo.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-[0.82rem] font-semibold text-white/80 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex gap-4 mt-2">
            <span aria-hidden="true" className="text-white/60">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
              </svg>
            </span>
            <a
              href="https://www.instagram.com/hemlakare"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="mailto:info@hemlakare.se" aria-label="E-post" className="text-white/60 hover:text-white transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>

          <a
            href="https://www.1177.se"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-fit bg-white rounded-xl px-4 py-3 mt-1 hover:opacity-90 transition-opacity"
          >
            <div className="flex flex-col items-center leading-tight">
              <span className="text-[1.3rem] font-black text-[#c0392b] tracking-tight">1177</span>
              <span className="text-[0.6rem] font-bold text-[#c0392b] tracking-widest uppercase">Vårdguiden</span>
            </div>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-wrap gap-4 justify-between text-[0.75rem] text-white/40">
        <span>© {new Date().getFullYear()} Hemläkare.se — Privat vård utan kö</span>
        <div className="flex gap-6">
          <span>Integritetspolicy</span>
          <span>Cookies</span>
        </div>
      </div>
    </footer>
  );
}
