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

    if (distance > 40) setActiveComparison("vardcentral");
    if (distance < -40) setActiveComparison("hemlakare");
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
    <>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12">
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

        </div>
      </section>

      <section
        className="relative overflow-hidden bg-[linear-gradient(180deg,#fff8fb_0%,#fdf1f7_100%)] px-6 pb-20 pt-14 sm:py-24"
        aria-labelledby="hanni-statement-title"
      >
        <div className="mx-auto grid max-w-6xl items-end md:grid-cols-[0.9fr_1.2fr]">
          <div className="relative z-10 mx-auto aspect-[1208/1302] w-full max-w-[410px] md:mx-0">
            <div
              className="absolute bottom-1 left-[7%] right-[7%] top-[18%] rounded-t-[999px] bg-white/60"
              aria-hidden="true"
            />
            <Image
              src="/landningspage/hanni-portrait-transparent.png"
              alt="Porträtt av Hanni från Hemläkare.se."
              fill
              sizes="(max-width: 768px) calc(100vw - 48px), 410px"
              className="object-contain object-bottom drop-shadow-[0_18px_26px_rgba(15,23,42,0.15)]"
            />
            <div
              className="absolute bottom-0 left-[7%] right-[7%] h-3 rounded-full bg-gradient-to-r from-[#d81b7d] via-[#e72e8a] to-[#f06aaa] shadow-[0_7px_18px_rgba(231,46,138,0.32)]"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-20 -mt-6 rounded-[2rem] border border-pink-100 bg-white p-6 shadow-[0_24px_60px_rgba(65,32,50,0.14)] sm:p-8 md:-ml-12 md:mb-12 md:mt-0 md:p-9">
            <span
              className="absolute -top-3 right-16 size-7 rotate-45 border-l border-t border-pink-100 bg-white md:hidden"
              aria-hidden="true"
            />
            <span
              className="absolute -left-3 top-16 hidden size-7 rotate-45 border-b border-l border-pink-100 bg-white md:block"
              aria-hidden="true"
            />

            <p
              id="hanni-statement-title"
              className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#d81b7d]"
            >
              <span className="size-2 rounded-full bg-[#e72e8a]" aria-hidden="true" />
              Ett ord från Hanni
            </p>

            <blockquote>
              <p className="mt-4 text-[1.25rem] font-semibold leading-[1.45] tracking-[-0.018em] text-gray-950 sm:text-[1.5rem]">
                Privat vård ska inte vara förbehållen några få. Vår innovation gör det
                möjligt att erbjuda personlig vård för 995 kronor – så att privat vård
                blir tillgänglig för alla, utan att vi kompromissar med tid, omtanke eller
                kvalitet.
              </p>
              <footer className="mt-6 border-t border-pink-100 pt-4">
                <p className="font-bold text-gray-950">Hanni</p>
                <p className="mt-0.5 text-sm text-gray-500">Hemläkare.se</p>
              </footer>
            </blockquote>

            <Link
              href="/mottagningar"
              className="btn-cta mt-6 inline-flex min-h-12 items-center justify-center rounded-full px-8 text-[0.95rem] font-bold text-white transition-all"
            >
              Boka tid
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
