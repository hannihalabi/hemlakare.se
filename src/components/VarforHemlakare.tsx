"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";

type ComparisonKey = "vardcentral" | "hemlakare";

const vardcentral = [
  "Veckor av väntetid för en tid",
  "Stressad personal och hög arbetsbelastning",
  "Snabba bedömningar under tidspress",
  "Ny läkare nästan varje besök",
  "Styrs av regionens budget och köer",
];

const hemlakare = [
  "Hjälp samma dag – ofta inom timmar",
  "Din egen läkare och sköterska, varje gång",
  "Tid och lugn för en noggrann bedömning",
  "Kvalitet före kvantitet – vi prioriterar dig",
  "Privatfinansierad – fri från regionens budgettryck",
];

function CrossIcon() {
  return (
    <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path d="M3 3l6 6M9 3l-6 6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function CheckIcon() {
  return (
    <span
      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
      style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function ComparisonCard({
  type,
  className = "",
  style,
  hidden = false,
}: {
  type: ComparisonKey;
  className?: string;
  style?: CSSProperties;
  hidden?: boolean;
}) {
  const isHemlakare = type === "hemlakare";
  const items = isHemlakare ? hemlakare : vardcentral;

  return (
    <article
      className={`${className} flex flex-col gap-5 rounded-3xl p-6 sm:p-8 ${
        isHemlakare
          ? "border-2 border-[#e72e8a]/25 bg-white shadow-[0_18px_40px_-16px_rgba(231,46,138,0.3)]"
          : "border border-gray-100 bg-[#f4f4f8]"
      }`}
      style={style}
      aria-hidden={hidden}
    >
      <h3
        className={`flex items-center text-[1.15rem] font-bold ${
          isHemlakare ? "gap-2" : "text-gray-500"
        }`}
      >
        {isHemlakare ? (
          <>
            <Image
              src="/bilder/logo/hemlakare-icon-stethoscope.svg"
              alt=""
              width={28}
              height={28}
              sizes="28px"
              className="shrink-0"
            />
            <span className="text-gray-950">
              Hemläkare<span className="text-[#e72e8a]">.se</span>
            </span>
          </>
        ) : (
          "Vanlig vårdcentral"
        )}
      </h3>
      <ul className="flex flex-col gap-3.5">
        {items.map((item) => (
          <li
            key={item}
            className={`flex items-start gap-3 text-[0.95rem] leading-snug ${
              isHemlakare ? "font-medium text-gray-800" : "text-gray-500"
            }`}
          >
            {isHemlakare ? <CheckIcon /> : <CrossIcon />}
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 ${
        direction === "left" ? "swipe-hint-left" : "swipe-hint-right"
      }`}
      aria-hidden="true"
    >
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

export default function VarforHemlakare() {
  const [activeComparison, setActiveComparison] =
    useState<ComparisonKey>("hemlakare");
  const swipeStartX = useRef<number | null>(null);

  function handleSwipeStart(event: ReactPointerEvent<HTMLDivElement>) {
    swipeStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleSwipeEnd(event: ReactPointerEvent<HTMLDivElement>) {
    if (swipeStartX.current === null) return;

    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;

    if (distance > 40) setActiveComparison("hemlakare");
    if (distance < -40) setActiveComparison("vardcentral");
  }

  const vardcentralStyle: CSSProperties = {
    zIndex: activeComparison === "vardcentral" ? 20 : 10,
    opacity: activeComparison === "vardcentral" ? 1 : 0.72,
    transform:
      activeComparison === "vardcentral"
        ? "translateX(-51%) rotate(-1.5deg) scale(1)"
        : "translateX(-58%) translateY(18px) rotate(-5deg) scale(0.94)",
  };

  const hemlakareStyle: CSSProperties = {
    zIndex: activeComparison === "hemlakare" ? 20 : 10,
    opacity: activeComparison === "hemlakare" ? 1 : 0.72,
    transform:
      activeComparison === "hemlakare"
        ? "translateX(-49%) rotate(1.5deg) scale(1)"
        : "translateX(-42%) translateY(18px) rotate(5deg) scale(0.94)",
  };

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        <div className="text-center flex flex-col gap-3 max-w-2xl">
          <span
            className="w-fit mx-auto px-4 py-1.5 rounded-full text-[0.75rem] font-bold text-white"
            style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
          >
            VARFÖR HEMLÄKARE.SE
          </span>
          <h2 className="text-[2rem] sm:text-[2.4rem] font-bold tracking-tight text-gray-900">
            Privat vård för alla – bara 995 kr
          </h2>
          <p className="text-[1rem] text-gray-600 leading-relaxed">
            Snabb och personlig vård ska inte vara en fråga om plånbok. Därför kostar ett
            besök hos Hemläkare <strong className="font-bold text-gray-900">995 kr</strong>{" "}
            istället för över 2 000 kr – utan att vi kompromissar med tid, omtanke eller
            kvalitet.
          </p>
        </div>

        <div className="-mb-5 -mt-6 w-full max-w-4xl">
          <Image
            src="/landningspage/hemlakare-bilar-transparent.png"
            alt="Två av Hemläkare.se:s bilar som används vid hembesök."
            width={1646}
            height={956}
            sizes="(max-width: 768px) calc(100vw - 48px), 896px"
            className="h-auto w-full drop-shadow-[0_24px_32px_rgba(15,23,42,0.12)]"
          />
        </div>

        <div className="w-full max-w-4xl">
          <div
            className="relative h-[420px] touch-pan-y select-none md:hidden"
            role="region"
            aria-roledescription="karusell"
            aria-label="Jämförelse mellan vanlig vårdcentral och Hemläkare.se"
            onPointerDown={handleSwipeStart}
            onPointerUp={handleSwipeEnd}
            onPointerCancel={() => {
              swipeStartX.current = null;
            }}
          >
            <ComparisonCard
              type="vardcentral"
              className="absolute left-1/2 top-1 h-[390px] w-[calc(100%-2rem)] origin-bottom transition-[transform,opacity,filter] duration-500 ease-out will-change-transform"
              style={vardcentralStyle}
              hidden={activeComparison !== "vardcentral"}
            />
            <ComparisonCard
              type="hemlakare"
              className="absolute left-1/2 top-1 h-[390px] w-[calc(100%-2rem)] origin-bottom transition-[transform,opacity,filter] duration-500 ease-out will-change-transform"
              style={hemlakareStyle}
              hidden={activeComparison !== "hemlakare"}
            />
          </div>

          <div className="mt-1 flex items-center justify-center gap-3 text-xs font-medium text-slate-500 md:hidden">
            <button
              type="button"
              onClick={() => setActiveComparison("vardcentral")}
              className={`grid size-9 place-items-center rounded-full border bg-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a] ${
                activeComparison === "vardcentral"
                  ? "border-slate-400 text-slate-700"
                  : "border-slate-200 text-slate-400"
              }`}
              aria-label="Visa Vanlig vårdcentral"
            >
              <ArrowIcon direction="left" />
            </button>
            <span aria-live="polite">
              {activeComparison === "hemlakare"
                ? "Hemläkare.se"
                : "Vanlig vårdcentral"}
            </span>
            <button
              type="button"
              onClick={() => setActiveComparison("hemlakare")}
              className={`grid size-9 place-items-center rounded-full border bg-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a] ${
                activeComparison === "hemlakare"
                  ? "border-[#e72e8a]/50 text-[#d81b7d]"
                  : "border-slate-200 text-slate-400"
              }`}
              aria-label="Visa Hemläkare.se"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>

          <p className="mt-2 text-center text-[0.72rem] text-slate-400 md:hidden">
            Svep åt vänster eller höger för att jämföra
          </p>

          <div className="hidden gap-6 md:grid md:grid-cols-2">
            <ComparisonCard type="vardcentral" />
            <ComparisonCard type="hemlakare" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 text-center">
          <p className="text-[0.98rem] text-gray-600 max-w-xl leading-relaxed">
            Vården i Sverige håller hög medicinsk klass – men systemet är överbelastat. Det vill vi
            ändra på. Hos oss är du aldrig ett ärende i mängden.
          </p>
          <Link
            href="/mottagningar"
            className="btn-cta px-10 py-4 rounded-full text-[1rem] font-bold text-white transition-all"
          >
            Boka tid
          </Link>
        </div>
      </div>
    </section>
  );
}
