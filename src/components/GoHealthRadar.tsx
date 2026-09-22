"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

/**
 * Levande radar-visualisering för GoHealth. Varje vitalparameter har en egen,
 * kontinuerlig dataström in mot AI-kärnan. Radarsvepet ligger kvar som ett
 * lågmält bakgrundslager, medan linjerna visar att synkningen aldrig stannar.
 */

type VitalNode = {
  label: string;
  angle: number; // grader, 0 = rakt upp, medurs
  icon: ReactNode;
};

const SWEEP_DURATION = 14;
const STREAM_DURATION = 2.2;
// Låt viewport-entrén bli klar innan första avläsningen vid Puls.
const SCAN_START_DELAY = 1.2;

const vitals: VitalNode[] = [
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
    label: "Andning",
    angle: 60,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12c2-4 4-4 5 0s3 4 5 0 3-4 5 0 3 4 5 0" />
      </svg>
    ),
  },
  {
    label: "Rytm",
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
    label: "Stress",
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

/** Radie i procent av containerns halva bredd, från centrum. */
const NODE_RADIUS = 42;
/** Etiketterna sitter lite längre ut än ikonerna, radiellt bort från centrum. */
const LABEL_RADIUS = 51;

function polarToPercent(angleDeg: number, radiusPercent: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: 50 + radiusPercent * Math.cos(rad),
    y: 50 + radiusPercent * Math.sin(rad),
  };
}

export default function GoHealthRadar() {
  const radarRef = useRef<HTMLDivElement>(null);
  const streamFilterId = useId();

  useEffect(() => {
    const radar = radarRef.current;
    if (!radar) return;

    const reveal = () => radar.setAttribute("data-visible", "true");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        observer.disconnect();
      },
      { threshold: 0.22, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(radar);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={radarRef}
      data-visible="false"
      className="gh-radar-stage relative mx-auto aspect-square w-full max-w-[420px] select-none px-16 sm:px-0"
      role="img"
      aria-label="Sex hälsovärden synkas kontinuerligt med GoHealth AI"
    >
      <style>{`
        @keyframes gh-sweep-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gh-ring-breathe {
          0%, 100% { opacity: 0.2; transform: scale(0.995); }
          50% { opacity: 0.42; transform: scale(1.012); }
        }
        @keyframes gh-data-flow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -22; }
        }
        @keyframes gh-stream-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
        @keyframes gh-node-scan {
          0% { filter: brightness(1.25) saturate(1.12); transform: scale(1.24); }
          3% { filter: brightness(1.1) saturate(1.05); transform: scale(1.06); }
          5% { filter: brightness(1.18) saturate(1.1); transform: scale(1.14); }
          9%, 100% { filter: brightness(1) saturate(1); transform: scale(1); }
        }
        @keyframes gh-node-halo {
          0% { opacity: 0.65; transform: scale(1); }
          9%, 100% { opacity: 0; transform: scale(2.1); }
        }
        @keyframes gh-core-breathe {
          0%, 100% { filter: brightness(1); transform: scale(1); }
          50% { filter: brightness(1.15); transform: scale(1.055); }
        }
        @keyframes gh-core-wave {
          0% { opacity: 0.38; transform: scale(0.82); }
          70%, 100% { opacity: 0; transform: scale(1.75); }
        }

        .gh-radar-stage {
          opacity: 0;
          filter: blur(8px);
          transform: translateY(20px) scale(0.965);
          transition:
            opacity 950ms ease,
            filter 1100ms ease,
            transform 1200ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gh-radar-stage[data-visible="true"] {
          opacity: 1;
          filter: blur(0);
          transform: translateY(0) scale(1);
        }
        .gh-radar-disc {
          transition: box-shadow 1300ms ease;
        }
        .gh-radar-stage[data-visible="true"] .gh-radar-disc {
          box-shadow:
            0 28px 72px -30px rgba(151, 42, 99, 0.24),
            inset 0 0 64px rgba(232, 61, 147, 0.07),
            0 0 0 1px rgba(216, 27, 125, 0.09);
        }
        .gh-data-layer {
          opacity: 0;
          transition: opacity 1200ms ease 320ms;
        }
        .gh-radar-stage[data-visible="true"] .gh-data-layer { opacity: 1; }
        .gh-node-shell,
        .gh-label {
          opacity: 0;
          transition:
            opacity 700ms ease,
            transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gh-node-shell { transform: translate(-50%, -50%) scale(0.72); }
        .gh-label { transform: translate(-50%, -50%) scale(0.9); }
        .gh-radar-stage[data-visible="true"] .gh-node-shell,
        .gh-radar-stage[data-visible="true"] .gh-label {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        .gh-sweep {
          animation: gh-sweep-rotate ${SWEEP_DURATION}s linear ${SCAN_START_DELAY}s infinite;
        }
        .gh-data-stream {
          animation:
            gh-data-flow ${STREAM_DURATION}s linear infinite,
            gh-stream-glow 3.6s ease-in-out infinite;
          stroke-dasharray: 12 10;
          stroke-linecap: round;
        }
        .gh-node-anim { animation: gh-node-scan ${SWEEP_DURATION}s ease-in-out infinite; }
        .gh-node-halo {
          opacity: 0;
          animation: gh-node-halo ${SWEEP_DURATION}s ease-out infinite;
        }
        /* Samma start och period håller avläsningen i fas med svepet. */
        .gh-sweep, .gh-node-anim, .gh-node-halo { animation-play-state: paused; }
        .gh-radar-stage[data-visible="true"] .gh-sweep,
        .gh-radar-stage[data-visible="true"] .gh-node-anim,
        .gh-radar-stage[data-visible="true"] .gh-node-halo { animation-play-state: running; }
        .gh-core-pulse { animation: gh-core-breathe 3.4s ease-in-out infinite; }
        .gh-core-wave { animation: gh-core-wave 3.4s ease-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .gh-radar-stage,
          .gh-radar-stage[data-visible="true"] {
            opacity: 1;
            filter: none;
            transform: none;
            transition: none;
          }
          .gh-data-layer,
          .gh-node-shell,
          .gh-label {
            opacity: 1;
            transition: none;
          }
          .gh-node-shell,
          .gh-radar-stage[data-visible="true"] .gh-node-shell,
          .gh-label,
          .gh-radar-stage[data-visible="true"] .gh-label {
            transform: translate(-50%, -50%);
          }
          .gh-sweep,
          .gh-ring-breathe,
          .gh-data-stream,
          .gh-node-anim,
          .gh-node-halo,
          .gh-core-pulse,
          .gh-core-wave {
            animation: none !important;
          }
        }
      `}</style>

      <div
        className="gh-radar-disc absolute inset-0 overflow-hidden rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 42%, #ffffff 0%, #fff9fc 48%, #fceef5 100%)",
          boxShadow:
            "0 20px 55px -32px rgba(151, 42, 99, 0.16), inset 0 0 48px rgba(232, 61, 147, 0.04), 0 0 0 1px rgba(216, 27, 125, 0.06)",
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(116,70,98,0.26) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        {[86, 64, 42].map((size, index) => (
          <div
            key={size}
            className="gh-ring-breathe absolute rounded-full border border-[#d81b7d]/25"
            style={{
              inset: `${(100 - size) / 2}%`,
              animation: `gh-ring-breathe ${5.2 + index * 0.8}s ease-in-out infinite`,
              animationDelay: `${index * -0.7}s`,
            }}
          />
        ))}

        <div
          className="gh-sweep absolute inset-0 rounded-full opacity-70"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 288deg, rgba(232,61,147,0.045) 326deg, rgba(232,61,147,0.18) 360deg)",
          }}
        />

        <svg viewBox="0 0 100 100" className="gh-data-layer absolute inset-0 h-full w-full">
          <defs>
            {/* Fasta SVG-koordinater: lodräta linjer har en bounding box med bredd 0. */}
            <filter id={streamFilterId} filterUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
              <feGaussianBlur stdDeviation="0.7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {vitals.map((vital, index) => {
            const outer = polarToPercent(vital.angle, NODE_RADIUS);
            const path = `M ${outer.x} ${outer.y} L 50 50`;
            const phase = (index * STREAM_DURATION) / vitals.length;

            return (
              <g key={vital.angle}>
                <path d={path} fill="none" stroke="rgba(173,40,112,0.1)" strokeWidth="1.5" />
                <path d={path} fill="none" stroke="rgba(173,40,112,0.23)" strokeWidth="0.32" />
                <path
                  d={path}
                  pathLength="100"
                  fill="none"
                  stroke="rgba(216,27,125,0.78)"
                  strokeWidth="0.72"
                  filter={`url(#${streamFilterId})`}
                  className="gh-data-stream"
                  style={{ animationDelay: `${-phase}s, ${-phase * 0.7}s` }}
                />
              </g>
            );
          })}
        </svg>

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span className="gh-core-wave absolute size-16 rounded-full border border-[#d81b7d]/40" />
          <span className="gh-core-wave absolute size-16 rounded-full border border-[#e83d93]/25 [animation-delay:-1.7s]" />
          <div
            className="gh-core-pulse grid size-14 place-items-center rounded-full text-white shadow-[0_0_32px_rgba(232,61,147,0.58)]"
            style={{ background: "linear-gradient(145deg, #f0529e 0%, #d81b7d 55%, #a71668 100%)" }}
          >
            <svg
              viewBox="0 0 128 128"
              fill="none"
              className="shrink-0"
              style={{ width: "2.52rem", height: "2.52rem" }}
              aria-hidden="true"
              role="img"
              aria-label="Hemläkares logotyp"
            >
              <g stroke="currentColor" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M64 88
                         C45 75 27 59 27 41
                         C27 29 36 22 48 22
                         C56 22 61 26 64 32
                         C67 26 72 22 80 22
                         C92 22 101 29 101 41
                         C101 59 83 75 64 88Z" />
                <path d="M64 88
                         V99
                         C64 111 75 116 84 108
                         L95 98" />
                <circle cx="101" cy="84" r="10" />
                <path d="M91 101 L95 97" />
              </g>
            </svg>
          </div>
        </div>

        {vitals.map((vital, index) => {
          const pos = polarToPercent(vital.angle, NODE_RADIUS);
          const scanDelay = SCAN_START_DELAY + (vital.angle / 360) * SWEEP_DURATION;

          return (
            <div
              key={vital.angle}
              className="gh-node-shell absolute"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transitionDelay: `${380 + index * 70}ms`,
              }}
            >
              <span
                className="gh-node-halo absolute inset-0 rounded-full bg-pink-300/45 blur-[1px]"
                style={{ animationDelay: `${scanDelay}s` }}
              />
              <div
                className="gh-node-anim relative grid size-6 place-items-center rounded-full text-white/90 shadow-[0_0_18px_rgba(232,61,147,0.42)] sm:size-7"
                style={{
                  background: "linear-gradient(145deg, #f0529e 0%, #d81b7d 55%, #a71668 100%)",
                  animationDelay: `${scanDelay}s`,
                }}
              >
                <span className="size-3 sm:size-3.5">{vital.icon}</span>
              </div>
            </div>
          );
        })}
      </div>

      {vitals.map((vital, index) => {
        const pos = polarToPercent(vital.angle, LABEL_RADIUS);
        return (
          <span
            key={vital.angle}
            className="gh-label pointer-events-none absolute whitespace-nowrap rounded-full bg-white/95 px-1.5 py-0.5 text-[0.56rem] font-semibold text-[#432d3b] shadow-[0_4px_14px_rgba(94,41,72,0.16)] ring-1 ring-[#d81b7d]/15 backdrop-blur-sm sm:px-2.5 sm:py-1 sm:text-[0.72rem]"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transitionDelay: `${460 + index * 70}ms`,
            }}
          >
            {vital.label}
          </span>
        );
      })}
    </div>
  );
}
