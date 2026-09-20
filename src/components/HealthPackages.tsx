"use client";

import Link from "next/link";
import { useState } from "react";

type VaccineGroup = {
  category: string;
  vaccines: { name: string; price: string }[];
};

type Service = {
  name: string;
  price: string;
  originalPrice?: string;
  href: string;
  description: string;
  vaccineGroups?: VaccineGroup[];
};

const vaccineGroups: VaccineGroup[] = [
  {
    category: "Säsongs- och standardvaccin",
    vaccines: [
      { name: "Säsongsinfluensa", price: "Från 460 kr" },
      { name: "TBE", price: "Från 420 kr" },
      { name: "Bältros (Shingrix)", price: "Från 2 500 kr" },
      { name: "RS-virus", price: "Från 2 220 kr" },
      { name: "HPV", price: "Från 2 395 kr" },
      { name: "Pneumokocker", price: "Från 995 kr" },
      { name: "Stelkramp, difteri och kikhosta", price: "Från 450 kr" },
      { name: "MPR", price: "Från 625 kr" },
    ],
  },
  {
    category: "Resevaccin",
    vaccines: [
      { name: "Hepatit A", price: "Från 495 kr" },
      { name: "Hepatit B", price: "Från 480 kr" },
      { name: "Rabies", price: "Från 1 270 kr" },
      { name: "Tyfoidfeber", price: "Från 530 kr" },
      { name: "Kolera", price: "Från 520 kr" },
      { name: "Gula febern", price: "Från 735 kr" },
      { name: "Japansk encefalit", price: "Från 1 670 kr" },
      { name: "Dengue", price: "Från 2 140 kr" },
      { name: "Meningokocker (ACWY/B)", price: "Från 960 kr" },
    ],
  },
  {
    category: "Barn, graviditet och senior",
    vaccines: [
      { name: "Barnvaccinationer", price: "Från 395 kr" },
      { name: "Vaccination under graviditet", price: "Från 395 kr" },
      { name: "Seniorvaccinationer 65+", price: "Från 295 kr" },
    ],
  },
];

const services: Service[] = [
  {
    name: "Fysiskt läkarbesök",
    price: "995 kr",
    originalPrice: "1 995 kr",
    href: "/mottagningar",
    description:
      "Läkaren kommer hem till dig i Stockholm för ett fysiskt läkarbesök med medicinsk bedömning och tydlig återkoppling. Just nu till kampanjpris 995 kr.",
  },
  {
    name: "Digitalt läkarbesök",
    price: "595 kr",
    originalPrice: "995 kr",
    href: "/mottagningar",
    description:
      "Just nu till kampanjpris 595 kr. Träffa en läkare via videosamtal för medicinsk bedömning, rådgivning och behandling – tryggt och smidigt där du befinner dig.",
  },
  {
    name: "Receptförnyelse",
    price: "495 kr",
    href: "/mottagningar",
    description:
      "Förnya ett befintligt recept efter en medicinsk bedömning. Vi kontrollerar att behandlingen fortfarande är lämplig och säker för dig.",
  },
  {
    name: "Hudförändringar",
    price: "695 kr",
    href: "/mottagningar",
    description:
      "Få en medicinsk bedömning av en hudförändring via ett digitalt läkarbesök och tydlig vägledning om nästa steg.",
  },
  {
    name: "Medicinsk viktminskning",
    price: "Se pris",
    href: "/mottagningar",
    description:
      "Få en medicinsk bedömning och en individuellt anpassad plan för en trygg och hållbar viktminskning.",
  },
  {
    name: "Vitamininjektioner",
    price: "1 495 kr",
    href: "/mottagningar",
    description:
      "Vitamininjektioner ges efter en individuell medicinsk bedömning och anpassas efter dina behov.",
  },
  {
    name: "Vaccination hemma",
    price: "Se prislista",
    href: "/mottagningar#vaccination-hemma",
    description:
      "Välj vaccin nedan och kontakta oss så hjälper vi dig att boka vaccination hemma.",
    vaccineGroups,
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
      className="size-4 sm:size-[1.125rem]"
    >
      <path d="M8 2v4M16 2v4M3 9h18" />
      <rect x="3" y="4" width="18" height="18" rx="3" />
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
      className={`size-4 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
          <div className="border-b border-gray-200 px-5 py-5 sm:px-7">
            <h2 className="text-[1.3rem] font-bold tracking-tight text-gray-900 sm:text-[1.5rem]">
              Våra populäraste tjänster
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
                  <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 sm:px-6 sm:py-4">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenService(isOpen ? null : service.name)}
                      className="group col-span-2 grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-2.5 text-left"
                    >
                      <span className="text-[#D81B7D]">
                        <ChevronIcon open={isOpen} />
                      </span>
                      <span className="min-w-0">
                        <span className="block whitespace-nowrap text-[0.875rem] font-medium leading-snug text-gray-900 transition-colors group-hover:text-[#D81B7D] sm:text-[1rem]">
                          {service.name}
                        </span>
                        <span className="mt-0.5 flex items-center gap-2 whitespace-nowrap text-[0.8rem] font-semibold text-[#D81B7D] sm:text-[0.9rem]">
                          <span>{service.price}</span>
                          {service.originalPrice ? (
                            <span className="font-medium text-gray-400 line-through decoration-1">
                              {service.originalPrice}
                            </span>
                          ) : null}
                        </span>
                      </span>
                    </button>

                    <Link
                      href={service.href}
                      aria-label={`Boka ${service.name}`}
                      className="btn-cta inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-[0.825rem] font-bold sm:min-h-11 sm:px-5 sm:py-2 sm:text-[0.9rem]"
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
                      {service.vaccineGroups ? (
                        <div className="mx-4 border-t border-[#E72E8A]/15 pb-5 pl-6 pt-3 sm:mx-6 sm:pl-7">
                          <p className="text-[0.875rem] leading-relaxed text-gray-600 sm:text-[0.95rem]">
                            {service.description}
                          </p>

                          <div className="mt-4 space-y-5">
                            {service.vaccineGroups.map((group) => (
                              <section key={group.category}>
                                <h4 className="mb-1.5 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#D81B7D]">
                                  {group.category}
                                </h4>
                                <dl className="divide-y divide-gray-200">
                                  {group.vaccines.map((vaccine) => (
                                    <div
                                      key={vaccine.name}
                                      className="flex items-start justify-between gap-4 py-2 text-[0.875rem] leading-snug"
                                    >
                                      <dt className="text-gray-700">{vaccine.name}</dt>
                                      <dd className="shrink-0 font-semibold text-gray-900">
                                        {vaccine.price}
                                      </dd>
                                    </div>
                                  ))}
                                </dl>
                              </section>
                            ))}
                          </div>

                          <p className="mt-4 text-[0.8rem] leading-relaxed text-gray-500">
                            Frånpriser per dos. Avgift för hembesök kan tillkomma.
                          </p>
                        </div>
                      ) : (
                        <p className="mx-4 border-t border-[#E72E8A]/15 pb-4 pl-6 pt-3 text-[0.875rem] leading-relaxed text-gray-600 sm:mx-6 sm:max-w-2xl sm:pb-5 sm:pl-7 sm:text-[0.95rem]">
                          {service.description}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
