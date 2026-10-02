"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Step = {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
};

const steps: Step[] = [
  {
    eyebrow: "Ditt läkarbesök",
    title: "Träffa läkaren digitalt eller hemma",
    description: "Du träffar läkaren via video eller vid ett hembesök, beroende på vilken typ av besök som har bokats.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="13" height="14" rx="2" />
        <path d="m16 10 5-3v10l-5-3" />
      </svg>
    ),
  },
  {
    eyebrow: "Bedömning",
    title: "Läkaren bedömer dina besvär",
    description: "Ni går igenom dina symtom och frågor. Läkaren bedömer vilken vård du behöver och om fler undersökningar behövs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m8.5 12 2.2 2.2 4.8-4.8" />
      </svg>
    ),
  },
  {
    eyebrow: "Nästa steg",
    title: "Få hjälp och en plan framåt",
    description: "Du får råd och behandling utifrån läkarens bedömning, samt besked om nästa steg och eventuell uppföljning.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="17" rx="2.5" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="m8.5 15 2.1 2.1 4.9-5" />
      </svg>
    ),
  },
];

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export default function HurFungerarScrollDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [trackerVisible, setTrackerVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const progressRoot = progressRef.current;
    if (!section || !progressRoot) return;

    const updateProgress = () => {
      frameRef.current = null;

      const sectionRect = section.getBoundingClientRect();
      const progressRect = progressRoot.getBoundingClientRect();
      const markers = Array.from(progressRoot.querySelectorAll<HTMLElement>("[data-step-marker]"));
      if (markers.length !== steps.length) return;

      const viewportHeight = window.innerHeight;
      // Keep the guide point around the user's visual focus on every viewport.
      // The timeline moves past this fixed viewport position as the page scrolls.
      const guideY = viewportHeight * 0.52;
      const markerCenters = markers.map((marker) => {
        const markerRect = marker.getBoundingClientRect();
        return markerRect.top - progressRect.top + markerRect.height / 2;
      });
      const trackStart = markerCenters[0];
      const trackEnd = markerCenters[markerCenters.length - 1];
      const trackLength = Math.max(1, trackEnd - trackStart);
      const trackerOffset = Math.min(trackEnd, Math.max(trackStart, guideY - progressRect.top));
      const progress = clamp((trackerOffset - trackStart) / trackLength);
      const firstMarkerY = progressRect.top + trackStart;
      const lastMarkerY = progressRect.top + trackEnd;
      const isTrackerVisible = firstMarkerY <= guideY + 2 && lastMarkerY >= 112 && sectionRect.bottom > 112;
      let nextActiveStep = -1;

      markerCenters.forEach((center, index) => {
        const hitRadius = Math.min(18, markers[index].getBoundingClientRect().height * 0.35);
        const distanceToTracker = Math.abs(trackerOffset - center);

        if (isTrackerVisible && distanceToTracker <= hitRadius) {
          nextActiveStep = index;
        }
      });

      progressRoot.style.setProperty("--track-start", `${trackStart.toFixed(2)}px`);
      progressRoot.style.setProperty("--track-length", `${trackLength.toFixed(2)}px`);
      progressRoot.style.setProperty("--tracker-offset", `${trackerOffset.toFixed(2)}px`);
      progressRoot.style.setProperty("--scroll-progress", progress.toFixed(4));
      setActiveStep((current) => (current === nextActiveStep ? current : nextActiveStep));
      setTrackerVisible((current) => (current === isTrackerVisible ? current : isTrackerVisible));
    };

    const scheduleUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateProgress);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, []);

  return (
    <section
      id="hur-fungerar-scroll-demo"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden bg-[#f5f2ea] px-6 py-20 text-[#17231c] sm:py-24 lg:py-28"
      aria-labelledby="scroll-process-title"
    >
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(23,35,28,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(23,35,28,.7)_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true" />
      <div className="absolute -left-36 top-24 size-80 rounded-full bg-[#e72e8a]/10 blur-[100px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          <div>
            <h2 id="scroll-process-title" className="max-w-md text-4xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-5xl">
              Så fungerar besöket<span className="text-[#e72e8a]">.</span>
            </h2>

            <div
              ref={progressRef}
              className="relative mt-11"
              data-scroll-progress="track"
            >
              <div
                className="absolute left-[25px] w-px bg-[#c8c8bf]"
                style={{
                  top: "var(--track-start, 26px)",
                  height: "var(--track-length, calc(100% - 52px))",
                }}
                aria-hidden="true"
              >
                <span
                  className="absolute left-0 top-0 block w-px bg-[#e72e8a]"
                  style={{ height: "calc(var(--scroll-progress, 0) * 100%)" }}
                />
              </div>

              <span
                data-scroll-tracker
                className={`pointer-events-none absolute left-[25px] z-20 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e72e8a] shadow-[0_0_0_8px_rgba(231,46,138,0.13),0_4px_14px_rgba(216,27,125,0.35)] transition-opacity duration-200 ${
                  trackerVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ top: "var(--tracker-offset, 26px)" }}
                aria-hidden="true"
              />

              <ol className="space-y-8">
                {steps.map((step, index) => {
                  const state = index === activeStep ? "current" : "pending";

                  return (
                    <li
                      key={step.title}
                      className="scroll-process-step relative grid grid-cols-[52px_1fr] gap-4"
                      data-state={state}
                    >
                      <div
                        className="scroll-process-marker relative z-30 grid size-[52px] place-items-center rounded-full border bg-[#f5f2ea]"
                        data-step-marker
                        aria-hidden="true"
                      >
                        <span className="absolute -left-1 -top-1 grid size-5 place-items-center rounded-full bg-[#f5f2ea] text-[0.58rem] font-extrabold">
                          0{index + 1}
                        </span>
                        <span className="size-6">{step.icon}</span>
                      </div>

                      <div className="scroll-process-copy pt-0.5">
                        <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-[#d81b7d]">
                          {step.eyebrow}
                        </p>
                        <h3 className="mt-1 text-xl font-extrabold tracking-[-0.025em] text-[#17231c]">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-lg text-[0.95rem] leading-7 text-[#5d675f]">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <a
              href="tel:0108086084"
              className="btn-cta ml-[68px] mt-10 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7 text-sm font-extrabold text-white"
            >
              Ring oss · 010 808 60 84
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </div>

          <figure className="mx-auto w-full max-w-[390px] lg:max-w-none">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#efe8df] shadow-[0_30px_70px_rgba(43,54,47,0.16)]">
              <video
                className="aspect-[2/3] w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Illustration av ett digitalt läkarbesök"
              >
                <source src="/landningspage/lipio-video.mp4" type="video/mp4" />
              </video>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
