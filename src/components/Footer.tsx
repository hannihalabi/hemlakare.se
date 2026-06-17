import Link from "next/link";

const quickLinks = [
  ["Frågor & svar", "/faq"],
  ["Recensioner", "/recensioner"],
  ["Patientavgifter", "/patientavgifter"],
  ["Här finns vi", "/har-finns-vi"],
  ["Vårdguiden", "/vardguiden"],
  ["Om företaget", "/om"],
  ["Sjukdomar & besvär", "/sjukdomar"],
  ["Lediga jobb", "/jobb"],
];

const kontakt = [
  ["Skriv till oss i appen", "/kontakt"],
  ["Klagomål", "/klagomål"],
  ["Adresser", "/adresser"],
  ["Remisser & journaler", "/remisser"],
  ["Öppettider", "/oppettider"],
  ["Telefon för vårdgivare", "/vardgivare"],
  ["Telefonnummer", "/telefon"],
];

const mottagningar = [
  ["Göteborg", "/mottagningar/goteborg"],
  ["Äldremottagning", "/mottagningar/aldremottagning"],
  ["Stockholm", "/mottagningar/stockholm"],
  ["Prickmottagning", "/mottagningar/prickmottagning"],
  ["BVC", "/mottagningar/bvc"],
  ["Hembesök", "/mottagningar/hembesok"],
  ["Ungas Psykiska Hälsa", "/mottagningar/uph"],
];

const merInfo = [
  ["Nyhetsbrev", "/nyhetsbrev"],
  ["Blodtrycksmätare kopplad till läkaren", "/blodtryck"],
  ["Aktuellt", "/aktuellt"],
];

function StarsFilled() {
  return (
    <div className="flex gap-0.5">
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

        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-5">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="10" fill="url(#fGrad)" />
              <path d="M16 23s-7-4.5-7-9.5A4.5 4.5 0 0 1 16 11a4.5 4.5 0 0 1 7 2.5C23 18.5 16 23 16 23Z" fill="white" fillOpacity="0.95" />
              <defs>
                <linearGradient id="fGrad" x1="16" y1="0" x2="16" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E72E8A" />
                  <stop offset="1" stopColor="#D81B7D" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-[1rem] font-semibold tracking-tight">hemläkare.se</span>
          </div>

          <p className="text-[0.88rem] font-semibold text-white/80">Privat vård utan kö</p>

          <StarsFilled />

          {/* App store badges */}
          <div className="flex gap-3 flex-wrap">
            <a
              href="#"
              className="flex items-center gap-2 bg-black border border-white/20 rounded-xl px-3 py-2 hover:bg-white/10 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="text-[0.55rem] text-white/70 uppercase tracking-wide">Hämta i</span>
                <span className="text-[0.8rem] font-semibold">App Store</span>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-2 bg-black border border-white/20 rounded-xl px-3 py-2 hover:bg-white/10 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3.18 23.76c.3.17.65.19.98.08l11.65-6.73-2.48-2.48-10.15 9.13z" fill="#EA4335"/>
                <path d="M20.82 10.06 17.65 8.2l-2.77 2.49 2.77 2.77 3.19-1.85c.91-.52.91-1.03-.02-1.55z" fill="#FBBC04"/>
                <path d="M3.18.24C2.85.35 2.62.65 2.62 1.07v21.86c0 .42.23.72.56.83l.12.06 12.24-12.24v-.29L3.3.18l-.12.06z" fill="#4285F4"/>
                <path d="m13.54 8.33-10.36-8.09-.12-.06 10.48 10.48 2.77-2.49-2.77.16z" fill="#34A853"/>
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="text-[0.55rem] text-white/70 uppercase tracking-wide">Ladda ned på</span>
                <span className="text-[0.8rem] font-semibold">Google Play</span>
              </div>
            </a>
          </div>

          <Link
            href="/finns-i-ditt-omrade"
            className="inline-flex items-center justify-center px-5 py-3 rounded-full text-[0.88rem] font-bold text-white border-2 transition-all hover:opacity-80"
            style={{ borderColor: "#E72E8A", color: "#E72E8A" }}
          >
            Se om vi finns i ditt område
          </Link>

          {/* Quick links grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
            {quickLinks.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-[0.82rem] text-white/70 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 2 — Kontakta oss */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[1rem] font-bold">Kontakta oss</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {kontakt.map(([label, href]) => (
              <Link
                key={href}
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
                key={href}
                href={href}
                className="text-[0.82rem] text-white/70 hover:text-white transition-colors leading-snug"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3 — spacer on large, merged on small */}
        <div className="hidden lg:block" />

        {/* Col 4 — Få mer information */}
        <div className="flex flex-col gap-5">
          <h3 className="text-[1rem] font-bold">Få mer information</h3>

          <a
            href="#"
            className="inline-flex items-center justify-center w-fit px-6 py-2.5 rounded-full text-[0.88rem] font-bold border-2 transition-all hover:opacity-80"
            style={{ borderColor: "#E72E8A", color: "#E72E8A" }}
          >
            Jag vill ha mer info
          </a>

          <div className="flex flex-col gap-3">
            {merInfo.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-[0.82rem] font-semibold text-white/80 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex gap-4 mt-2">
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="text-white/60 hover:text-white transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" aria-label="YouTube" className="text-white/60 hover:text-white transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="text-white/60 hover:text-white transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* Email */}
            <a href="mailto:info@hemlakare.se" aria-label="E-post" className="text-white/60 hover:text-white transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>

          {/* 1177 badge */}
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

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-wrap gap-4 justify-between text-[0.75rem] text-white/40">
        <span>© {new Date().getFullYear()} Hemläkare.se — Privat vård utan kö</span>
        <div className="flex gap-6">
          <Link href="/integritetspolicy" className="hover:text-white/70 transition-colors">Integritetspolicy</Link>
          <Link href="/cookies" className="hover:text-white/70 transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
