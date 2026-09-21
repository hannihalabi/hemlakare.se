"use client";

import type { ReactNode } from "react";

/**
 * Levande radar-visualisering för GoHealth: sex vitalparametrar utplacerade
 * runt en sveepande radarcirkel. När sweepen passerar en nod "ekar" den upp
 * som på en riktig radarskärm, och strax därefter skickas ett datapaket
 * från noden in mot en central, pulserande AI-nod. Ren SVG/CSS-animation
 * (inget canvas/WebGL) så den är lätt, SSR-säker och respekterar
 * prefers-reduced-motion.
 */

type VitalNode = {
  label: string;
  angle: number; // grader, 0 = rakt upp, medurs
  icon: ReactNode;
  /** Sekunder in i sweep-cykeln (0–8) då sweepen når denna nod. */
  hitTime: number;
};

const SWEEP_DURATION = 8; // sekunder för ett varv
const SIGNAL_DELAY = 0.55; // sekunder mellan att noden "ekar upp" och att den skickar sin signal
const PACKET_TRAVEL_TIME = 0.6; // sekunder paketets resa in mot centrum tar

const rawVitals: { label: string; angle: number; icon: ReactNode }[] = [
  {
    label: "Puls",
    angle: 0,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12h4l2-7 4 14 2-7h6" />
      </svg>
    ),
  },
  {
    label: "Andningsfrekvens",
    angle: 60,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12c2-4 4-4 5 0s3 4 5 0 3-4 5 0 3 4 5 0" />
      </svg>
    ),
  },
  {
    label: "Hjärtrytm",
    angle: 120,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.8 8.3a5.5 5.5 0 0 0-9.3-4A5.5 5.5 0 0 0 3 8.3c0 5.2 8.5 10.4 8.5 10.4s.5-.3 1.3-.9" />
        <path d="M15 12h1.8l1-2 1.6 4 1-2H22" />
      </svg>
    ),
  },
  {
    label: "Sömn",
    angle: 180,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5Z" />
      </svg>
    ),
  },
  {
    label: "Stressnivå",
    angle: 240,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    label: "Body Battery",
    angle: 300,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="8" width="16" height="8" rx="2" />
        <path d="M21 10v4" />
        <path d="M7 12h2M11 12h2" />
      </svg>
    ),
  },
];

const vitals: VitalNode[] = rawVitals.map((vital) => ({
  ...vital,
  hitTime: (vital.angle / 360) * SWEEP_DURATION,
}));

/** Radie i procent av containerns halva bredd, från centrum. */
const NODE_RADIUS = 42;
/** Etiketterna sitter lite längre ut än ikonerna, radiellt bort från centrum. */
const LABEL_RADIUS = 51;

function polarToPercent(angleDeg: number, radiusPercent: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const x = 50 + radiusPercent * Math.cos(rad);
  const y = 50 + radiusPercent * Math.sin(rad);
  return { x, y };
}

/** Andel (0–1) av sweep-cykeln som motsvarar SIGNAL_DELAY sekunder. */
const SIGNAL_DELAY_FRACTION = SIGNAL_DELAY / SWEEP_DURATION;
/** Tid tills det allra första paketet (från noden vid vinkel 0) når centrum. */
const FIRST_ARRIVAL = SIGNAL_DELAY + PACKET_TRAVEL_TIME;
/** Tid mellan varje efterföljande ankomst (noderna är jämnt fördelade). */
const ARRIVAL_INTERVAL = SWEEP_DURATION / vitals.length;

export default function GoHealthRadar() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px] select-none px-16 sm:px-0">
      <style>{`
        @keyframes gh-sweep-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gh-ring-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.015); }
        }
        /* Nodens "eko": sweepen anländer vid 0%, ljuset byggs upp och klingar
           sedan av över SIGNAL_DELAY_FRACTION av cykeln – som ett sonar-eko,
           inte en blixt. */
        @keyframes gh-node-echo {
          0% { filter: brightness(1) saturate(1); transform: scale(1); opacity: 0.5; }
          ${(SIGNAL_DELAY_FRACTION * 55).toFixed(2)}% { filter: brightness(1.8) saturate(1.4); transform: scale(1.2); opacity: 1; }
          ${(SIGNAL_DELAY_FRACTION * 260).toFixed(2)}% { filter: brightness(1) saturate(1); transform: scale(1); opacity: 0.5; }
          100% { filter: brightness(1) saturate(1); transform: scale(1); opacity: 0.5; }
        }
        @keyframes gh-node-ring {
          0%, ${(SIGNAL_DELAY_FRACTION * 15).toFixed(2)}% { box-shadow: 0 0 0 0 rgba(255, 143, 196, 0); }
          ${(SIGNAL_DELAY_FRACTION * 55).toFixed(2)}% { box-shadow: 0 0 0 10px rgba(255, 143, 196, 0.32); }
          ${(SIGNAL_DELAY_FRACTION * 180).toFixed(2)}% { box-shadow: 0 0 0 20px rgba(255, 143, 196, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 143, 196, 0); }
        }
        @keyframes gh-packet-fade {
          0%, ${(SIGNAL_DELAY_FRACTION * 100).toFixed(2)}% { opacity: 0; }
          ${(SIGNAL_DELAY_FRACTION * 100 + 1.5).toFixed(2)}% { opacity: 1; }
          ${((SIGNAL_DELAY + PACKET_TRAVEL_TIME) / SWEEP_DURATION * 100 - 1.5).toFixed(2)}% { opacity: 1; }
          ${((SIGNAL_DELAY + PACKET_TRAVEL_TIME) / SWEEP_DURATION * 100).toFixed(2)}%, 100% { opacity: 0; }
        }
        /* Kärnan "knockar till" i samma ögonblick som ett paket anländer
           (period = ARRIVAL_INTERVAL, fas satt via animation-delay =
           FIRST_ARRIVAL på elementen), och slappnar av däremellan. */
        @keyframes gh-core-pulse {
          0% { transform: scale(1.18); filter: brightness(1.4); }
          35%, 100% { transform: scale(1); filter: brightness(1); }
        }
        @keyframes gh-core-ring-fire {
          0% { transform: scale(1); opacity: 0.85; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .gh-node-anim {
          animation:
            gh-node-echo ${SWEEP_DURATION}s linear infinite,
            gh-node-ring ${SWEEP_DURATION}s linear infinite;
        }
        .gh-packet { animation: gh-packet-fade ${SWEEP_DURATION}s linear infinite; }
        .gh-core-pulse { animation: gh-core-pulse ${ARRIVAL_INTERVAL}s ease-out infinite; }
        .gh-core-ring { animation: gh-core-ring-fire ${ARRIVAL_INTERVAL}s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .gh-sweep, .gh-ring-pulse, .gh-node-anim, .gh-packet, .gh-core-pulse, .gh-core-ring {
            animation: none !important;
          }
          .gh-packet animateMotion { display: none; }
        }
      `}</style>

      {/* Bakgrund: mörk radarskiva med koncentriska ringar och punktgrid */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 42%, #1b1035 0%, #0e0a22 55%, #070512 100%)",
          boxShadow: "0 30px 80px -20px rgba(23, 8, 46, 0.65), inset 0 0 60px rgba(232, 61, 147, 0.08)",
        }}
      >
        {/* Punktgrid */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
          aria-hidden
        />

        {/* Koncentriska ringar */}
        {[86, 64, 42].map((size, index) => (
          <div
            key={size}
            className="gh-ring-pulse absolute rounded-full border border-pink-300/25"
            style={{
              inset: `${(100 - size) / 2}%`,
              animation: `gh-ring-pulse ${3.4 + index * 0.6}s ease-in-out infinite`,
              animationDelay: `${index * 0.4}s`,
            }}
            aria-hidden
          />
        ))}

        {/* Roterande sweep-kon */}
        <div
          className="gh-sweep absolute inset-0 rounded-full"
          style={{
            animation: `gh-sweep-rotate ${SWEEP_DURATION}s linear infinite`,
            background:
              "conic-gradient(from 0deg, rgba(232,61,147,0.55) 0deg, rgba(232,61,147,0.12) 26deg, transparent 60deg, transparent 360deg)",
          }}
          aria-hidden
        />

        {/* Linjer från varje nod in mot centrum + datapaket som färdas längs dem */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          {vitals.map((vital) => {
            const outer = polarToPercent(vital.angle, NODE_RADIUS);
            return (
              <g key={vital.label}>
                <path
                  d={`M ${outer.x} ${outer.y} L 50 50`}
                  fill="none"
                  stroke="rgba(244,155,199,0.18)"
                  strokeWidth="0.4"
                />
                <circle r="1.4" fill="#ff8fc4" className="gh-packet" style={{ animationDelay: `${vital.hitTime}s` }}>
                  {/*
                    En hel cykel = SWEEP_DURATION (samma som sweepens varv,
                    så resan börjar precis när sweepen är tillbaka nästa
                    gång). Paketet står still vid noden under SIGNAL_DELAY
                    (ekot hinner synas), reser sedan snabbt (PACKET_TRAVEL)
                    in mot centrum, och väntar osynligt (opacity redan 0)
                    resten av cykeln.
                  */}
                  <animateMotion
                    dur={`${SWEEP_DURATION}s`}
                    begin={`${vital.hitTime}s`}
                    repeatCount="indefinite"
                    keyPoints={`0;0;1;1`}
                    keyTimes={`0;${(SIGNAL_DELAY / SWEEP_DURATION).toFixed(4)};${((SIGNAL_DELAY + PACKET_TRAVEL_TIME) / SWEEP_DURATION).toFixed(4)};1`}
                    calcMode="linear"
                    path={`M ${outer.x} ${outer.y} L 50 50`}
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Central AI-nod – "knockar till" varje gång ett datapaket anländer */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span
            className="gh-core-ring absolute size-14 rounded-full border border-pink-300/60"
            style={{ animationDelay: `${FIRST_ARRIVAL}s` }}
            aria-hidden
          />
          <div
            className="gh-core-pulse grid size-14 place-items-center rounded-full text-white shadow-[0_0_30px_rgba(232,61,147,0.55)]"
            style={{
              background: "linear-gradient(145deg, #f0529e 0%, #d81b7d 55%, #a71668 100%)",
              animationDelay: `${FIRST_ARRIVAL}s`,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden>
              <path
                d="M12 3a3 3 0 0 1 3 3v1a3 3 0 0 1 2 2.83V11a3 3 0 0 1-1 2.24V15a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-1.76A3 3 0 0 1 7 11v-1.17A3 3 0 0 1 9 7V6a3 3 0 0 1 3-3Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M12 3v18M7 9.83c1.2.7 2.4.7 5 0M7 13.24c1.6.6 3.4.6 5 0M17 9.83c-1.2.7-2.4.7-5 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Vitalparameter-ikonerna sitter kvar innanför den klippta
            radarskivan (så de ser ut att "sitta på" radarkanten). */}
        {vitals.map((vital) => {
          const pos = polarToPercent(vital.angle, NODE_RADIUS);
          return (
            <div
              key={vital.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div
                className="gh-node-anim grid size-6 place-items-center rounded-full text-white/80 sm:size-7"
                style={{
                  background: "linear-gradient(145deg, #f0529e 0%, #d81b7d 55%, #a71668 100%)",
                  animationDelay: `${vital.hitTime}s`,
                }}
              >
                <span className="size-3 sm:size-3.5">{vital.icon}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/*
        Textetiketterna ligger i ett EGET lager ovanpå den klippta
        radarskivan (ingen overflow-hidden här), så ord som "Andningsfrekvens"
        eller "Hjärtrytm" alltid får plats och kan sticka ut över radarns
        kant istället för att klippas av den rundade cirkeln.
      */}
      {vitals.map((vital) => {
        const pos = polarToPercent(vital.angle, LABEL_RADIUS);
        return (
          <span
            key={vital.label}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#0e0a22] px-1.5 py-0.5 text-[0.56rem] font-semibold text-white shadow-[0_2px_10px_rgba(0,0,0,0.4)] ring-1 ring-white/10 sm:px-2.5 sm:py-1 sm:text-[0.72rem]"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            {vital.label}
          </span>
        );
      })}
    </div>
  );
}
