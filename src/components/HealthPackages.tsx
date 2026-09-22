"use client";

import Link from "next/link";
import { useState } from "react";
import { healthPackages } from "@/data/healthPackages";
import { healthcareServices, vaccinePriceGroups } from "@/data/services";

type ServiceGroup = {
  category: string;
  items: {
    name: string;
    price: string;
    originalPrice?: string;
    markerCount?: number;
    markers?: string[];
  }[];
};

type Service = {
  name: string;
  price: string;
  originalPrice?: string;
  href: string;
  detailHref: string;
  description: string;
  groups?: ServiceGroup[];
  note?: string;
};

const bloodTestGroups: ServiceGroup[] = [
  {
    category: "Blodprovspaket",
    items: healthPackages.map((healthPackage) => ({
      name: healthPackage.name,
      price: healthPackage.price,
      originalPrice: healthPackage.originalPrice,
      markerCount: healthPackage.markers,
      markers: healthPackage.markerList,
    })),
  },
];

const markerCategoryOrder = [
  "Blodsocker",
  "Blodstatus",
  "Hjärta och blodfetter",
  "Hormoner och sköldkörtel",
  "Lever",
  "Njurar och elektrolyter",
  "Vitaminer och mineraler",
  "Inflammation",
  "Enzymer och övrigt",
] as const;

function getMarkerCategory(marker: string): (typeof markerCategoryOrder)[number] {
  if (["C-peptid", "Glukos", "HbA1c"].includes(marker)) return "Blodsocker";
  if (
    [
      "MCV (medelcellvolym)",
      "Erytrocyter (EPK)",
      "Hematokrit (EVF)",
      "Hemoglobin (Hb)",
      "MCH (hemoglobinmassa)",
      "Leukocyter (LPK)",
      "Trombocyter (TPK)",
      "Neutrofila granulocyter",
      "Lymfocyter",
      "Monocyter",
      "Eosinofila granulocyter",
      "Basofila granulocyter",
      "Retikulocyter",
      "RDW",
    ].includes(marker)
  ) {
    return "Blodstatus";
  }
  if (
    [
      "Apo B/Apo A1-kvot",
      "Apo A1",
      "Apo B",
      "HDL-kolesterol",
      "LDL-kolesterol",
      "Triglycerider",
      "Totalkolesterol",
      "LDL/HDL-kvot",
      "non-HDL-kolesterol",
    ].includes(marker)
  ) {
    return "Hjärta och blodfetter";
  }
  if (
    [
      "Kortisol",
      "Fritt T3",
      "Fritt T4",
      "TSH",
      "Testosteron",
      "Bioaktivt testosteron",
      "Östradiol",
      "LH",
      "Progesteron",
      "SHBG",
      "FSH",
      "Prolaktin",
      "PSA",
      "Fritt PSA",
    ].includes(marker)
  ) {
    return "Hormoner och sköldkörtel";
  }
  if (["ALAT", "ALP", "ASAT", "GT", "Albumin", "Bilirubin"].includes(marker)) {
    return "Lever";
  }
  if (
    [
      "Cystatin C",
      "Fosfat",
      "Kalcium",
      "Kalium",
      "Klorid",
      "Kreatinin",
      "Natrium",
      "eGFR (Cystatin C)",
      "eGFR (Kreatinin)",
      "Urat",
      "Urea",
    ].includes(marker)
  ) {
    return "Njurar och elektrolyter";
  }
  if (
    [
      "D-vitamin",
      "Ferritin",
      "Folat",
      "Järn",
      "Magnesium",
      "Transferrin",
      "Vitamin B12",
      "Zink",
    ].includes(marker)
  ) {
    return "Vitaminer och mineraler";
  }
  if (marker === "CRP") return "Inflammation";
  return "Enzymer och övrigt";
}

function MarkerGrid({ markers }: { markers: string[] }) {
  const groups = markerCategoryOrder
    .map((category) => ({
      category,
      markers: markers.filter((marker) => getMarkerCategory(marker) === category),
    }))
    .filter((group) => group.markers.length > 0);

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <section key={group.category}>
          <h5 className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.09em] text-[#D81B7D]">
            {group.category}
          </h5>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {group.markers.map((marker) => (
              <li
                key={marker}
                className="rounded-lg border border-pink-100 bg-white px-2.5 py-2 text-[0.8rem] leading-snug text-gray-700 shadow-[0_2px_8px_rgba(15,23,42,0.03)]"
              >
                {marker}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

const services: Service[] = healthcareServices.map((service) => ({
  name: service.name,
  price:
    service.slug === "blodprovstagning"
      ? "Se paket"
      : service.slug === "vaccination-hemma"
        ? "Se prislista"
        : service.price,
  originalPrice: service.originalPrice,
  href: service.bookingHref,
  detailHref: `/${service.slug}`,
  description: service.cardDescription,
  groups:
    service.slug === "blodprovstagning"
      ? bloodTestGroups
      : service.slug === "vaccination-hemma"
        ? vaccinePriceGroups
        : undefined,
  note:
    service.slug === "vaccination-hemma"
      ? "Frånpriser per dos. Avgift för hembesök kan tillkomma."
      : undefined,
}));

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
  const [openPackage, setOpenPackage] = useState<string | null>(null);

  return (
    <section id="halsokontroller" className="scroll-mt-24 bg-white px-5 py-10 sm:px-6 sm:py-20">
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
                      onClick={() => {
                        setOpenService(isOpen ? null : service.name);
                        setOpenPackage(null);
                      }}
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
                      {service.groups ? (
                        <div className="mx-4 border-t border-[#E72E8A]/15 pb-5 pl-6 pt-3 sm:mx-6 sm:pl-7">
                          <p className="text-[0.875rem] leading-relaxed text-gray-600 sm:text-[0.95rem]">
                            {service.description}
                          </p>

                          <div className="mt-4 space-y-5">
                            {service.groups.map((group) => (
                              <section key={group.category}>
                                <h4 className="mb-1.5 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#D81B7D]">
                                  {group.category}
                                </h4>
                                <div className="divide-y divide-gray-200">
                                  {group.items.map((item) => {
                                    const packageOpen = openPackage === item.name;
                                    const packagePanelId = `package-${item.name
                                      .toLowerCase()
                                      .replaceAll(" ", "-")}`;

                                    return item.markers ? (
                                      <div key={item.name}>
                                        <button
                                          type="button"
                                          aria-expanded={packageOpen}
                                          aria-controls={packagePanelId}
                                          onClick={() =>
                                            setOpenPackage(packageOpen ? null : item.name)
                                          }
                                          className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 py-3 text-left"
                                        >
                                          <span className="text-[#D81B7D]">
                                            <ChevronIcon open={packageOpen} />
                                          </span>
                                          <span className="min-w-0">
                                            <span className="block text-[0.875rem] font-semibold leading-snug text-gray-800 transition-colors group-hover:text-[#D81B7D]">
                                              {item.name}
                                            </span>
                                            <span className="mt-0.5 block text-[0.75rem] text-gray-500">
                                              {item.markerCount} markörer
                                            </span>
                                          </span>
                                          <span className="shrink-0 text-right">
                                            <span className="block text-[0.875rem] font-bold text-gray-950">
                                              {item.price}
                                            </span>
                                            {item.originalPrice ? (
                                              <span className="block text-[0.75rem] text-gray-400 line-through">
                                                {item.originalPrice}
                                              </span>
                                            ) : null}
                                          </span>
                                        </button>

                                        <div
                                          id={packagePanelId}
                                          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                                            packageOpen
                                              ? "grid-rows-[1fr] opacity-100"
                                              : "grid-rows-[0fr] opacity-0"
                                          }`}
                                        >
                                          <div className="overflow-hidden">
                                            <div className="mb-3 rounded-2xl border border-pink-100 bg-[#fff8fb] p-3 sm:p-4">
                                              <p className="mb-4 text-[0.8rem] leading-relaxed text-gray-600">
                                                Följande {item.markerCount} markörer ingår i paketet:
                                              </p>
                                              <MarkerGrid markers={item.markers} />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div
                                        key={item.name}
                                        className="flex items-start justify-between gap-4 py-2 text-[0.875rem] leading-snug"
                                      >
                                        <span className="text-gray-700">{item.name}</span>
                                        <span className="shrink-0 font-semibold text-gray-900">
                                          {item.price}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </section>
                            ))}
                          </div>

                          {service.note ? (
                            <p className="mt-4 text-[0.8rem] leading-relaxed text-gray-500">
                              {service.note}
                            </p>
                          ) : null}
                          <Link
                            href={service.detailHref}
                            className="mt-4 inline-flex items-center gap-1 text-[0.85rem] font-bold text-[#D81B7D] hover:underline"
                          >
                            Läs mer om {service.name.toLowerCase()} →
                          </Link>
                        </div>
                      ) : (
                        <div className="mx-4 border-t border-[#E72E8A]/15 pb-4 pl-6 pt-3 sm:mx-6 sm:max-w-2xl sm:pb-5 sm:pl-7">
                          <p className="text-[0.875rem] leading-relaxed text-gray-600 sm:text-[0.95rem]">
                            {service.description}
                          </p>
                          <Link
                            href={service.detailHref}
                            className="mt-3 inline-flex items-center gap-1 text-[0.85rem] font-bold text-[#D81B7D] hover:underline"
                          >
                            Läs mer om {service.name.toLowerCase()} →
                          </Link>
                        </div>
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
