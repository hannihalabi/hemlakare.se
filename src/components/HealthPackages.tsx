"use client";

import Link from "next/link";
import { useState } from "react";

const services = [
  {
    name: "Digitalt läkarbesök",
    price: "995 kr",
    href: "/mottagningar",
    description:
      "Träffa en läkare via videosamtal för medicinsk bedömning, rådgivning och behandling – tryggt och smidigt där du befinner dig.",
  },
  {
    name: "Receptförnyelse",
    price: "495 kr",
    href: "/mottagningar",
    description:
      "Förnya ett befintligt recept efter en medicinsk bedömning. Vi kontrollerar att behandlingen fortfarande är lämplig och säker för dig.",
  },
  {
    name: "Kolla upp hudförändringar",
    price: "995 kr",
    href: "/mottagningar",
    description:
      "Få en medicinsk bedömning av en hudförändring via ett digitalt läkarbesök och tydlig vägledning om nästa steg.",
  },
  {
    name: "Hembesök med läkare",
    price: "Från 1 995 kr",
    href: "/mottagningar",
    description:
      "En läkare kommer hem till dig i Stockholm när du behöver en fysisk undersökning utan att resa till en mottagning.",
  },
  {
    name: "Hälsokontroll",
    price: "Från 995 kr",
    href: "/patientavgifter#halsokontroller",
    description:
      "Få en personlig genomgång av din hälsa med relevanta kontroller, medicinsk bedömning och tydlig återkoppling från läkare.",
  },
  {
    name: "Vaccination hemma",
    price: "På förfrågan",
    href: "/mottagningar#vaccination-hemma",
    description:
      "Vi hjälper dig med vaccination i hemmet. Tillgänglighet och pris anpassas efter vaccin, adress och dina behov.",
  },
];

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <path d="M8 2v4M16 2v4M3 9h18" />
      <rect x="3" y="4" width="18" height="18" rx="3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function HealthPackages() {
  const [openService, setOpenService] = useState<string | null>(null);

  return (
    <section id="halsokontroller" className="scroll-mt-24 bg-white px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-[#f7f7f8] shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
          <div className="border-b border-gray-200 px-6 py-6 sm:px-8">
            <h2 className="text-[1.45rem] font-bold tracking-tight text-gray-900 sm:text-[1.65rem]">
              Våra vanligaste tjänster
            </h2>
          </div>

          <div>
            {services.map((service) => {
              const isOpen = openService === service.name;
              const panelId = `service-${service.name.toLowerCase().replaceAll(" ", "-")}`;

              return (
                <article
                  key={service.name}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 sm:px-8 sm:py-6">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenService(isOpen ? null : service.name)}
                      className="group min-w-0 text-left sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6"
                    >
                      <span className="flex items-center gap-2 font-medium leading-snug text-gray-900 transition-colors group-hover:text-[#D81B7D] sm:text-[1.08rem]">
                        {service.name}
                        <span className="text-[#D81B7D]">
                          <ChevronIcon open={isOpen} />
                        </span>
                      </span>
                      <span className="mt-1 block text-[0.9rem] font-semibold text-[#D81B7D] sm:mt-0 sm:min-w-32 sm:text-right sm:text-[1rem]">
                        {service.price}
                      </span>
                    </button>

                    <Link
                      href={service.href}
                      aria-label={`Boka ${service.name}`}
                      className="btn-cta inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.9rem] font-bold sm:px-6"
                    >
                      <CalendarIcon />
                      Boka
                    </Link>
                  </div>

                  <div
                    id={panelId}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="mx-6 border-t border-[#E72E8A]/15 pb-5 pt-4 text-[0.95rem] leading-relaxed text-gray-600 sm:mx-8 sm:max-w-2xl sm:pb-6">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <Link
          href="/mottagningar"
          className="btn-cta mt-5 flex min-h-14 w-full items-center justify-between rounded-2xl px-6 py-4 text-[1rem] font-bold sm:px-8 sm:text-[1.08rem]"
        >
          <span>Se alla tjänster</span>
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
