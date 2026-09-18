"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const steps = [
  {
    eyebrow: "Kontakta oss",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
    title: "Vi svarar inom 2 minuter",
    desc: "Ring oss eller skriv på WhatsApp. Vår kundsupport hjälper dig direkt.",
  },
  {
    eyebrow: "Triage",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m8.5 12 2.2 2.2 4.8-4.8" />
      </svg>
    ),
    title: "Berätta vad du behöver hjälp med",
    desc: "Kundsupporten går igenom ditt ärende och guidar dig till rätt typ av vård.",
  },
  {
    eyebrow: "Samma dag",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="17" rx="2.5" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="m8.5 15 2.1 2.1 4.9-5" />
      </svg>
    ),
    title: "Vi bokar rätt läkare",
    desc: "Vi bokar ett digitalt besök eller hembesök med läkare – ofta redan samma dag.",
  },
];

export default function HurFungerar() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.12);
      },
      { threshold: [0, 0.12] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="journey-section relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fdf5f9_52%,#f6f6fa_100%)] px-6 py-20 text-gray-900 sm:py-24"
      data-visible={isVisible}
      aria-label="Så kontaktar du Hemläkare och får vård i tre steg"
    >
      <div className="journey-orb journey-orb-one absolute -left-32 top-20 size-80 rounded-full bg-[#e72e8a]/15 blur-[90px]" aria-hidden="true" />
      <div className="journey-orb journey-orb-two absolute -right-40 bottom-0 size-96 rounded-full bg-[#c4a1e8]/20 blur-[110px]" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.028] [background-image:linear-gradient(rgba(15,23,42,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.8)_1px,transparent_1px)] [background-size:40px_40px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <div className="relative">
          <div className="absolute bottom-10 left-[31px] top-10 w-[2px] rounded-full bg-pink-100 lg:bottom-auto lg:left-[12%] lg:right-[12%] lg:top-8 lg:h-[2px] lg:w-auto" aria-hidden="true" />
          <div className="journey-line-progress absolute bottom-10 left-[31px] top-10 w-[2px] origin-top rounded-full bg-gradient-to-b from-[#ff8ac0] via-[#e72e8a] to-[#c42c82] shadow-[0_0_16px_rgba(231,46,138,0.48)] lg:bottom-auto lg:left-[12%] lg:right-[12%] lg:top-8 lg:h-[2px] lg:w-auto lg:origin-left lg:bg-gradient-to-r" aria-hidden="true" />

          <div className="relative z-10 grid gap-7 lg:grid-cols-3 lg:gap-6">
            {steps.map((step, index) => {
              const style = {
                "--journey-delay": `${220 + index * 280}ms`,
                "--journey-icon-delay": `${360 + index * 280}ms`,
                "--journey-x": index % 2 === 0 ? "-18px" : "18px",
              } as CSSProperties;

              return (
                <article
                  key={step.title}
                  className="journey-card flex items-start gap-4 lg:flex-col lg:items-center lg:text-center"
                  style={style}
                >
                  <div className="journey-icon relative grid size-16 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(145deg,#f0529e_0%,#d81b7d_55%,#a71668_100%)] text-white shadow-[0_14px_35px_rgba(231,46,138,0.4)] lg:rounded-[1.35rem]">
                    <span className="size-8">{step.icon}</span>
                    <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full border border-pink-100 bg-white text-[0.62rem] font-bold text-[#d81b7d] shadow-[0_5px_14px_rgba(231,46,138,0.16)]">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="w-full rounded-[1.45rem] border border-pink-100/90 bg-white/85 p-5 text-left shadow-[0_20px_55px_rgba(110,51,82,0.11)] backdrop-blur-xl lg:min-h-[210px] lg:p-6 lg:text-center">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#d81b7d]">
                      {step.eyebrow}
                    </p>
                    <h3 className="mt-2 text-[1.28rem] font-bold leading-snug tracking-[-0.015em] text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-gray-600">
                      {step.desc}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="journey-cta mx-auto mt-12 grid w-full max-w-xl gap-3 sm:grid-cols-2">
          <a
            href="tel:0108086084"
            className="btn-cta cta-attention group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full px-7 text-[0.95rem] font-bold text-white"
            aria-label="Ring Hemläkare på 010-808 60 84"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" />
            </svg>
            010 808 60 84
            <svg className="size-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
          <a
            href="https://wa.me/46108086084"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full border-2 border-[#25d366] bg-white px-7 text-[0.95rem] font-bold text-[#128c4a] shadow-[0_8px_24px_rgba(37,211,102,0.12)] transition hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-[0_12px_28px_rgba(37,211,102,0.2)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100"
            aria-label="Kontakta Hemläkare via WhatsApp"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.647-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.9 6.994c-.003 5.45-4.437 9.884-9.892 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            WhatsApp
            <svg className="size-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
