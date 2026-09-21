const metrics = [
  {
    label: "Puls",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12h4l2-7 4 14 2-7h6" />
      </svg>
    ),
  },
  {
    label: "Andningsfrekvens",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12c2-4 4-4 5 0s3 4 5 0 3-4 5 0 3 4 5 0" />
      </svg>
    ),
  },
  {
    label: "Avvikande hjärtrytm",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.8 8.3a5.5 5.5 0 0 0-9.3-4A5.5 5.5 0 0 0 3 8.3c0 5.2 8.5 10.4 8.5 10.4s.5-.3 1.3-.9" />
        <path d="M15 12h1.8l1-2 1.6 4 1-2H22" />
      </svg>
    ),
  },
  {
    label: "Stressnivåer",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    label: "Sömn",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5Z" />
      </svg>
    ),
  },
];

export default function GoHealth() {
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#fff8fb_100%)] px-6 py-16 sm:py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <span
          className="inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-1.5 text-[0.75rem] font-bold text-white"
          style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
        >
          🔥 NYHET
        </span>

        <div className="flex flex-col gap-3">
          <h2 className="text-[2rem] font-bold tracking-tight text-gray-900 sm:text-[2.4rem]">
            GoHealth – din hälsa, alltid uppkopplad
          </h2>
          <p className="mx-auto max-w-2xl text-[1rem] leading-relaxed text-gray-600">
            En efterfrågad tjänst är äntligen här. Med GoHealth bär du ett pulsarmband som
            kontinuerligt mäter din hälsa – och vår AI larmar våra läkare direkt om något
            avviker, så att du blir uppringd och får hjälp i tid.
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-5">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col items-center gap-2.5 rounded-2xl border border-pink-100/90 bg-[#fdf1f7] p-4 shadow-[0_12px_30px_rgba(110,51,82,0.06)]"
            >
              <span
                className="grid size-11 shrink-0 place-items-center rounded-full text-white shadow-[0_10px_24px_rgba(231,46,138,0.32)]"
                style={{ background: "linear-gradient(145deg, #f0529e 0%, #d81b7d 55%, #a71668 100%)" }}
              >
                <span className="size-5">{metric.icon}</span>
              </span>
              <span className="text-[0.8rem] font-bold leading-snug text-gray-900">{metric.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-[#f4f4f8] px-6 py-5 sm:flex-row sm:gap-4 sm:px-8">
          <span className="text-[1.4rem] font-bold text-[#D81B7D]">995 kr/mån</span>
          <span className="hidden h-8 w-px bg-gray-200 sm:block" aria-hidden="true" />
          <p className="max-w-md text-sm text-gray-600">
            Larmar automatiskt vid avvikande värden – då ringer läkaren upp för att kolla läget.
          </p>
        </div>

        <p className="text-sm font-semibold text-gray-400">Kommer snart – håll utkik</p>
      </div>
    </section>
  );
}
