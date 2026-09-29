"use client";

import { useEffect, useRef, type ReactNode } from "react";

const impactSteps = [
  { icon: <PulseIcon />, title: "Tidig signal", note: "En förändring syns" },
  { icon: <DoctorIcon />, title: "Snabb bedömning", note: "Läkaren granskar" },
  { icon: <ShieldIcon />, title: "Förebyggande stöd", note: "Vi agerar i tid" },
  { icon: <HeartIcon />, title: "Fler friska år", note: "Målet för individen" },
];

export default function GoHealthStory() {
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = storyRef.current;
    if (!root) return;

    const blocks = root.querySelectorAll<HTMLElement>("[data-gohealth-story]");
    const revealAll = () => blocks.forEach((block) => block.setAttribute("data-visible", "true"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={storyRef}>
      <StoryStyles />

      <section
        data-gohealth-story
        data-visible="false"
        className="gh-story overflow-hidden bg-white px-6 py-20 sm:py-28"
        aria-labelledby="tidiga-signaler"
      >
        <div className="mx-auto max-w-6xl">
          <div className="gh-copy mx-auto max-w-4xl text-center">
            <h2 id="tidiga-signaler" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl sm:leading-[1.08]">
              Ett läkarbesök är en ögonblicksbild. GoHealth ser utvecklingen.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
              Ett vårdbesök visar hur du mår just då. GoHealth följer dina värden över tid,
              så att AI:n kan uppmärksamma avvikelser som annars riskerar att missas.
            </p>
          </div>

          <div className="mt-12 sm:mt-16">
            <EarlySignalVisual />
          </div>
        </div>
      </section>

      <section
        data-gohealth-story
        data-visible="false"
        className="gh-story overflow-hidden bg-[#f4f4f8] px-6 py-20 sm:py-28"
        aria-labelledby="sa-fungerar-gohealth"
      >
        <div className="mx-auto max-w-6xl">
          <div className="gh-copy mx-auto max-w-4xl text-center">
            <h2 id="sa-fungerar-gohealth" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl sm:leading-[1.08]">
              Tekniken ser mönstret. Läkaren ser människan.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
              Löpande data från armbandet kombineras med dina blodprovsanalyser. Om allt ser
              bra ut fortsätter monitoreringen utan åtgärd. Bedömer AI:n att det finns en
              avvikelse rapporteras den till en specialistläkare.
            </p>
          </div>

          <div className="mt-12 sm:mt-16">
            <CareFlowVisual />
          </div>
        </div>
      </section>

      <section
        data-gohealth-story
        data-visible="false"
        className="gh-story relative overflow-hidden bg-[#302a3b] px-6 py-20 text-white sm:py-28"
        aria-labelledby="samhallsnytta"
      >
        <div className="gh-orb absolute -right-32 -top-40 size-[480px] rounded-full bg-[#d81b7d]/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <div className="gh-copy mx-auto max-w-3xl text-center">
            <h2 id="samhallsnytta" className="text-3xl font-bold tracking-tight sm:text-5xl sm:leading-[1.08]">
              Från att behandla sent till att agera tidigare
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Tidigare insikt kan skapa utrymme för förebyggande insatser – och bidra till
              mindre lidande och ett mer hållbart vårdsystem.
            </p>
          </div>

          <ImpactFlow />

          <div className="gh-copy mx-auto mt-12 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.06] px-6 py-7 text-center backdrop-blur-sm sm:px-10">
            <p className="text-lg font-bold text-white">Målet är inte fler larm – utan fler friska år.</p>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-white/60">
              Ett bättre underlag hjälper vårdteamet att prioritera rätt uppföljning, vid rätt tidpunkt, för rätt person.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-10 sm:py-12" aria-label="Medicinsk information">
        <p className="mx-auto max-w-4xl text-center text-xs leading-5 text-gray-500">
          GoHealth är ett stöd för uppföljning och ersätter inte läkarundersökning, diagnostik
          eller akut vård. Tidig upptäckt kan skapa möjligheter till förebyggande insatser men
          kan inte garantera att sjukdom upptäcks eller förhindras. Vid akuta eller allvarliga
          symtom: ring 112 eller kontakta 1177.
        </p>
      </section>
    </div>
  );
}

function EarlySignalVisual() {
  return (
    <div className="gh-visual relative mx-auto w-full max-w-[650px]" role="img" aria-label="Blodtrycket är högt vid midnatt och sjunker fram till cirka 03:00. Normalt blodtryck hos vårdcentralen jämförs med för högt blodtryck medan personen sover.">
      <div className="absolute -inset-8 rounded-full bg-pink-100/50 blur-3xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[2rem] border border-pink-100 bg-[linear-gradient(145deg,#ffffff_0%,#fff6fa_100%)] p-5 shadow-[0_30px_90px_-40px_rgba(175,31,101,0.4)] sm:p-8">
        <p className="text-lg font-bold text-gray-900">Upptäcker avvikelser – även när ingen ser</p>

        <div className="relative mt-5">
          <svg viewBox="0 0 560 270" className="h-auto w-full" aria-hidden="true">
            <defs>
              <linearGradient id="gh-chart-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e72e8a" stopOpacity="0.2" />
                <stop offset="1" stopColor="#e72e8a" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gh-chart-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#e72e8a" />
                <stop offset="0.16" stopColor="#c9a0b5" />
                <stop offset="0.65" stopColor="#c9a0b5" />
                <stop offset="1" stopColor="#e72e8a" />
              </linearGradient>
            </defs>
            <path d="M40 34V228H542" fill="none" stroke="#d8cbd2" strokeWidth="1.5" />
            {[40, 165, 291, 416, 542].map((x) => (
              <path key={x} d={`M${x} 228V234`} stroke="#d8cbd2" strokeWidth="1.5" />
            ))}
            <text x="40" y="251" textAnchor="start" fill="#9ca3af" fontSize="10" fontWeight="600">00:00</text>
            <text x="165" y="251" textAnchor="middle" fill="#9ca3af" fontSize="10" fontWeight="600">06:00</text>
            <text x="291" y="251" textAnchor="middle" fill="#9ca3af" fontSize="10" fontWeight="600">12:00</text>
            <text x="416" y="251" textAnchor="middle" fill="#9ca3af" fontSize="10" fontWeight="600">18:00</text>
            <text x="542" y="251" textAnchor="end" fill="#9ca3af" fontSize="10" fontWeight="600">23:59</text>
            <text x="13" y="131" textAnchor="middle" transform="rotate(-90 13 131)" fill="#9ca3af" fontSize="11" fontWeight="600">Blodtryck</text>
            {[48, 102, 156, 210].map((y) => (
              <path key={y} d={`M40 ${y}H542`} stroke="#eddde6" strokeWidth="1" strokeDasharray="4 8" />
            ))}
            <rect x="40" y="92" width="502" height="70" rx="18" fill="#f4eaf0" opacity="0.7" />
            <path d="M40 132H542" stroke="#aa718f" strokeWidth="1.5" strokeDasharray="7 8" opacity="0.6" />
            <path d="M207 38V228" stroke="#7f7480" strokeWidth="2" strokeDasharray="5 7" opacity="0.5" />
            <path d="M466 38V228" stroke="#e72e8a" strokeWidth="2" strokeDasharray="5 7" opacity="0.5" />
            <path d="M40 52 C55 72 72 128 103 148 S160 132 207 134 S278 143 318 132 S368 124 397 130 C430 137 446 105 466 89 S502 64 542 43 L542 228 L40 228 Z" fill="url(#gh-chart-fill)" />
            <path className="gh-chart-line" pathLength="1" d="M40 52 C55 72 72 128 103 148 S160 132 207 134 S278 143 318 132 S368 124 397 130 C430 137 446 105 466 89 S502 64 542 43" fill="none" stroke="url(#gh-chart-line)" strokeWidth="5" strokeLinecap="round" />
            <circle cx="207" cy="134" r="8" fill="#7f7480" stroke="white" strokeWidth="4" />
            <circle className="gh-alert-ring" cx="466" cy="89" r="14" fill="none" stroke="#e72e8a" strokeWidth="3" />
            <circle cx="466" cy="89" r="8" fill="#e72e8a" stroke="white" strokeWidth="4" />
          </svg>

          <div className="gh-snapshot absolute left-[2%] top-[1%] max-w-32 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-lg sm:left-[25%] sm:max-w-40">
            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Hos vårdcentralen</p>
            <p className="mt-0.5 text-[11px] font-semibold leading-4 text-gray-700">Normalt blodtryck</p>
          </div>

          <div className="gh-alert absolute -top-[4%] right-[1%] max-w-36 rounded-2xl border border-pink-200 bg-white px-3 py-2.5 shadow-xl sm:-top-[6%] sm:right-[1%] sm:max-w-48 sm:px-4 sm:py-3">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#D81B7D]">
              <MoonIcon /> Medan du sover
            </p>
            <p className="mt-1 text-xs font-semibold leading-4 text-gray-700">För högt blodtryck</p>
          </div>
        </div>

      </div>
    </div>
  );
}

function CareFlowVisual() {
  return (
    <div className="gh-visual relative mx-auto w-full max-w-[820px]" role="img" aria-label="Armbandsdata och blodprovsanalyser kombineras i AI. Utan avvikelse fortsätter monitoreringen. Vid avvikelse underrättas en specialistläkare.">
      <div className="absolute inset-10 rounded-full bg-pink-200/40 blur-3xl" aria-hidden="true" />
      <div className="relative min-h-[680px] overflow-hidden rounded-[2rem] border border-white bg-white/70 p-5 shadow-[0_30px_80px_-45px_rgba(42,31,50,0.4)] backdrop-blur sm:p-8">
        <svg className="gh-source-lines pointer-events-none absolute left-[8%] top-[82px] h-28 w-[84%]" viewBox="0 0 500 120" fill="none" aria-hidden="true">
          <path d="M105 0C105 66 250 48 250 120" stroke="#f3c5dc" strokeWidth="4" strokeLinecap="round" />
          <path d="M395 0C395 66 250 48 250 120" stroke="#f3c5dc" strokeWidth="4" strokeLinecap="round" />
          <path className="gh-data-signal gh-input-signal" pathLength="1" d="M105 0C105 66 250 48 250 120" stroke="#e72e8a" strokeWidth="7" strokeLinecap="round" />
          <path className="gh-data-signal gh-input-signal" pathLength="1" d="M395 0C395 66 250 48 250 120" stroke="#e72e8a" strokeWidth="7" strokeLinecap="round" />
        </svg>

        <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4">
          <FlowCard className="gh-source-card min-w-0" icon={<WatchIcon />} title="Armbandsdata" />
          <FlowCard className="gh-source-card min-w-0" icon={<TestTubeIcon />} title="Blodprover" />
        </div>

        <HealthScanner />

        <div className="gh-decision relative z-10 pt-16">
          <svg className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full" viewBox="0 0 100 64" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <path d="M50 0V15C50 32 25 31 25 64" stroke="#8ddfbe" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            <path d="M50 0V15C50 32 75 31 75 64" stroke="#ee7db5" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            <path className="gh-data-signal gh-good-signal" pathLength="1" d="M50 0V15C50 32 25 31 25 64" stroke="#10b981" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            <path className="gh-data-signal gh-alert-signal" pathLength="1" d="M50 0V15C50 32 75 31 75 64" stroke="#e72e8a" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            <circle cx="50" cy="8" r="2.2" fill="#e72e8a" />
          </svg>

          <div className="grid grid-cols-2 gap-3">
          <div className="gh-good-card flex min-h-44 flex-col rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-center sm:p-4">
            <span className="mx-auto grid size-8 place-items-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckIcon />
            </span>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">Allt ser bra ut</p>
            <p className="mt-1 text-xs font-semibold text-gray-700">Monitoreringen fortsätter</p>
            <p className="mt-auto rounded-full bg-emerald-600 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white">Ingen åtgärd</p>
          </div>
          <div className="gh-alert-card flex min-h-44 flex-col rounded-2xl border border-pink-200 bg-pink-50 p-3 text-center sm:p-4">
            <span className="mx-auto grid size-8 place-items-center rounded-full bg-pink-100 text-[#D81B7D]">
              <AlertIcon />
            </span>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#D81B7D]">AI bedömer avvikelse</p>
            <p className="mt-1 text-xs font-semibold text-gray-700">En rapport skapas</p>
            <p className="mt-auto rounded-full border border-pink-200 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#D81B7D]">Rapporteras</p>
          </div>
          </div>
        </div>

        <div className="relative z-10 mt-6 grid grid-cols-2 gap-3">
          <div aria-hidden="true" />
          <div className="relative pt-5">
            <div className="gh-specialist-line absolute left-1/2 top-0 h-5 w-0.5 -translate-x-1/2 bg-pink-200" aria-hidden="true" />
            <FlowCard className="gh-specialist relative w-full" icon={<DoctorIcon />} title="Läkaren bedömer helheten" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HealthScanner() {
  return (
    <div className="gh-ai gh-scanner relative z-10 mx-auto mt-8 size-40 rounded-full shadow-[0_16px_40px_-12px_rgba(216,27,125,0.45)]" aria-hidden="true">
      <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 160 160" fill="none">
        <defs>
          <linearGradient id="gh-scanner-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e72e8a" />
            <stop offset="0.62" stopColor="#ff4b73" />
            <stop offset="1" stopColor="#ff8a3d" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r="70" stroke="#f8dbe9" strokeWidth="9" />
        <circle className="gh-scanner-progress" pathLength="1" cx="80" cy="80" r="70" stroke="url(#gh-scanner-gradient)" strokeWidth="9" strokeLinecap="round" />
      </svg>

      <div className="absolute inset-4 overflow-hidden rounded-full border border-pink-300/30 bg-[#332a3d] shadow-inner">
        <svg className="absolute inset-[20%] size-[60%] text-pink-200" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="31" r="16" />
          <path d="M24 82c2-18 12-27 26-27s24 9 26 27" />
          <path d="M34 58v10M66 58v10" opacity="0.55" />
        </svg>

        <svg className="absolute inset-[13%] size-[74%] text-[#ff2b8b]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
          <path d="M28 18H18v18M72 18h10v18M28 82H18V64M72 82h10V64" />
        </svg>

        <span className="gh-scan-beam absolute left-[20%] right-[20%] top-[25%] h-0.5 rounded-full bg-[linear-gradient(90deg,transparent,#ff8a3d_18%,#ff2b8b_50%,#ff8a3d_82%,transparent)] shadow-[0_0_12px_3px_rgba(255,75,115,0.7)]" />
      </div>
    </div>
  );
}

function FlowCard({ className, icon, title }: { className: string; icon: ReactNode; title: string }) {
  return (
    <div className={`gh-flow-card z-10 flex flex-col items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg sm:flex-row sm:items-center sm:gap-4 ${className}`}>
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-pink-50 text-[#D81B7D]">{icon}</span>
      <div>
        <p className="text-sm font-bold text-gray-900 sm:text-base">{title}</p>
      </div>
    </div>
  );
}

function ImpactFlow() {
  return (
    <div className="gh-impact relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" role="img" aria-label="Tidig signal leder till snabb bedömning, förebyggande stöd och målet fler friska år">
      <div className="gh-impact-track absolute left-[12.5%] right-[12.5%] top-10 hidden h-1 overflow-hidden rounded-full bg-white/10 lg:block" aria-hidden="true">
        <span className="block h-full w-1/3 rounded-full bg-gradient-to-r from-pink-400 to-emerald-300" />
      </div>
      {impactSteps.map((step, index) => (
        <div key={step.title} className="gh-impact-step relative text-center" style={{ transitionDelay: `${index * 140}ms` }}>
          <div className="relative z-10 mx-auto grid size-20 place-items-center rounded-full border border-white/15 bg-[#41384d] text-pink-200 shadow-xl">
            {step.icon}
          </div>
          <p className="mt-5 font-bold text-white">{step.title}</p>
          <p className="mt-1 text-xs text-white/50">{step.note}</p>
        </div>
      ))}
    </div>
  );
}

function StoryStyles() {
  return (
    <style>{`
      @keyframes gh-story-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
      @keyframes gh-story-ring { 0% { opacity: .8; transform: scale(.55); } 80%, 100% { opacity: 0; transform: scale(1.7); } }
      @keyframes gh-story-track { from { transform: translateX(-110%); } to { transform: translateX(310%); } }
      @keyframes gh-story-orb { 50% { transform: translate(-28px, 22px) scale(1.08); } }
      @keyframes gh-source-activate {
        0%, 3%, 18%, 49%, 68%, 100% { filter: none; box-shadow: 0 8px 20px -14px rgba(42,31,50,.3); }
        6%, 14%, 54%, 64% { filter: brightness(1.04); box-shadow: 0 0 0 3px rgba(231,46,138,.16), 0 18px 35px -18px rgba(216,27,125,.58); }
      }
      @keyframes gh-input-travel {
        0%, 3% { opacity: 0; stroke-dashoffset: 1; }
        5% { opacity: 1; stroke-dashoffset: 1; }
        15% { opacity: 1; stroke-dashoffset: 0; }
        18%, 51% { opacity: 0; stroke-dashoffset: 0; }
        53% { opacity: 1; stroke-dashoffset: 1; }
        64% { opacity: 1; stroke-dashoffset: 0; }
        68%, 100% { opacity: 0; stroke-dashoffset: 0; }
      }
      @keyframes gh-ai-activate {
        0%, 12%, 22%, 60%, 71%, 100% { filter: none; box-shadow: 0 16px 40px -12px rgba(216,27,125,.55); }
        15%, 19%, 64%, 68% { filter: brightness(1.18) saturate(1.08); box-shadow: 0 0 0 12px rgba(231,46,138,.12), 0 0 42px rgba(231,46,138,.65); }
      }
      @keyframes gh-scanner-fill {
        0%, 13% { stroke-dashoffset: 1; }
        21%, 48% { stroke-dashoffset: 0; }
        49%, 62% { stroke-dashoffset: 1; }
        70%, 100% { stroke-dashoffset: 0; }
      }
      @keyframes gh-scan-beam {
        0%, 13% { opacity: 0; top: 25%; }
        14% { opacity: 1; top: 25%; }
        21% { opacity: 1; top: 73%; }
        22%, 61% { opacity: 0; top: 25%; }
        62% { opacity: 1; top: 25%; }
        69% { opacity: 1; top: 73%; }
        70%, 100% { opacity: 0; top: 73%; }
      }
      @keyframes gh-alert-travel {
        0%, 20% { opacity: 0; stroke-dashoffset: 1; }
        22% { opacity: 1; stroke-dashoffset: 1; }
        29% { opacity: 1; stroke-dashoffset: 0; }
        32%, 100% { opacity: 0; stroke-dashoffset: 0; }
      }
      @keyframes gh-good-travel {
        0%, 69% { opacity: 0; stroke-dashoffset: 1; }
        71% { opacity: 1; stroke-dashoffset: 1; }
        78% { opacity: 1; stroke-dashoffset: 0; }
        82%, 100% { opacity: 0; stroke-dashoffset: 0; }
      }
      @keyframes gh-alert-card-activate {
        0%, 27%, 43%, 100% { filter: none; box-shadow: none; }
        30%, 39% { filter: brightness(1.04); box-shadow: 0 0 0 3px rgba(231,46,138,.2), 0 18px 34px -20px rgba(216,27,125,.65); }
      }
      @keyframes gh-good-card-activate {
        0%, 76%, 93%, 100% { filter: none; box-shadow: none; }
        80%, 89% { filter: brightness(1.03); box-shadow: 0 0 0 3px rgba(16,185,129,.2), 0 18px 34px -20px rgba(5,150,105,.55); }
      }
      @keyframes gh-specialist-activate {
        0%, 33%, 47%, 100% { filter: none; box-shadow: 0 8px 20px -14px rgba(42,31,50,.3); }
        36%, 43% { filter: brightness(1.04); box-shadow: 0 0 0 3px rgba(231,46,138,.18), 0 18px 35px -18px rgba(216,27,125,.55); }
      }
      @keyframes gh-specialist-line-activate {
        0%, 30%, 47%, 100% { opacity: .35; box-shadow: none; }
        33%, 44% { opacity: 1; box-shadow: 0 0 10px rgba(231,46,138,.75); }
      }

      .gh-story .gh-copy,
      .gh-story .gh-visual { opacity: 0; transform: translateY(30px); transition: opacity 850ms ease, transform 950ms cubic-bezier(.16,1,.3,1); }
      .gh-story .gh-visual { transition-delay: 140ms; transform: translateY(30px) scale(.97); }
      .gh-story[data-visible="true"] .gh-copy,
      .gh-story[data-visible="true"] .gh-visual { opacity: 1; transform: translateY(0) scale(1); }
      .gh-chart-line { stroke-dasharray: 1; stroke-dashoffset: 1; }
      .gh-story[data-visible="true"] .gh-chart-line { animation: gh-story-draw 2.2s .45s cubic-bezier(.2,.8,.2,1) forwards; }
      .gh-snapshot { opacity: 0; transform: translateY(8px) scale(.94); transition: opacity 450ms ease .65s, transform 550ms cubic-bezier(.16,1,.3,1) .65s; }
      .gh-story[data-visible="true"] .gh-snapshot { opacity: 1; transform: translateY(0) scale(1); }
      .gh-alert { opacity: 0; transform: translateY(8px) scale(.92); transition: opacity 500ms ease 1.9s, transform 600ms cubic-bezier(.16,1,.3,1) 1.9s; }
      .gh-story[data-visible="true"] .gh-alert { opacity: 1; transform: translateY(0) scale(1); }
      .gh-alert-ring { transform-box: fill-box; transform-origin: center; opacity: 0; }
      .gh-story[data-visible="true"] .gh-alert-ring { animation: gh-story-ring 2s 1.6s ease-out infinite; }
      .gh-flow-card, .gh-ai, .gh-decision { opacity: 0; transform: translateY(15px) scale(.94); transition: opacity 550ms ease, transform 700ms cubic-bezier(.16,1,.3,1); }
      .gh-story[data-visible="true"] .gh-flow-card { opacity: 1; transform: translateY(0) scale(1); }
      .gh-story[data-visible="true"] .gh-ai { opacity: 1; transform: translateY(0) scale(1); transition-delay: 300ms; }
      .gh-story[data-visible="true"] .gh-decision { opacity: 1; transform: translateY(0) scale(1); transition-delay: 520ms; }
      .gh-story[data-visible="true"] .gh-specialist { transition-delay: 680ms; }
      .gh-data-signal { fill: none; opacity: 0; stroke-dasharray: .11 .89; stroke-dashoffset: 1; stroke-linecap: round; }
      .gh-story[data-visible="true"] .gh-source-card { animation: gh-source-activate 14s 1s ease-in-out infinite; }
      .gh-story[data-visible="true"] .gh-input-signal { animation: gh-input-travel 14s 1s linear infinite; }
      .gh-story[data-visible="true"] .gh-ai { animation: gh-ai-activate 14s 1s ease-in-out infinite; }
      .gh-scanner-progress { stroke-dasharray: 1; stroke-dashoffset: 1; }
      .gh-scan-beam { opacity: 0; }
      .gh-story[data-visible="true"] .gh-scanner-progress { animation: gh-scanner-fill 14s 1s cubic-bezier(.45,0,.2,1) infinite; }
      .gh-story[data-visible="true"] .gh-scan-beam { animation: gh-scan-beam 14s 1s ease-in-out infinite; }
      .gh-story[data-visible="true"] .gh-alert-signal { animation: gh-alert-travel 14s 1s linear infinite; }
      .gh-story[data-visible="true"] .gh-good-signal { animation: gh-good-travel 14s 1s linear infinite; }
      .gh-story[data-visible="true"] .gh-alert-card { animation: gh-alert-card-activate 14s 1s ease-in-out infinite; }
      .gh-story[data-visible="true"] .gh-good-card { animation: gh-good-card-activate 14s 1s ease-in-out infinite; }
      .gh-story[data-visible="true"] .gh-specialist { animation: gh-specialist-activate 14s 1s ease-in-out infinite; }
      .gh-story[data-visible="true"] .gh-specialist-line { animation: gh-specialist-line-activate 14s 1s ease-in-out infinite; }
      .gh-impact-step { opacity: 0; transform: translateY(20px); transition: opacity 650ms ease, transform 750ms cubic-bezier(.16,1,.3,1); }
      .gh-story[data-visible="true"] .gh-impact-step { opacity: 1; transform: translateY(0); }
      .gh-impact-track span { animation: gh-story-track 4s 1s linear infinite; }
      .gh-orb { animation: gh-story-orb 9s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .gh-story .gh-copy, .gh-story .gh-visual, .gh-snapshot, .gh-alert, .gh-flow-card, .gh-ai, .gh-decision, .gh-impact-step { opacity: 1; transform: none; transition: none; }
        .gh-chart-line { stroke-dashoffset: 0; }
        .gh-data-signal { opacity: 0; }
        .gh-scanner-progress { stroke-dashoffset: .2; }
        .gh-scan-beam { display: none; }
        .gh-chart-line, .gh-alert-ring, .gh-source-card, .gh-ai, .gh-scanner-progress, .gh-alert-card, .gh-good-card, .gh-specialist, .gh-specialist-line, .gh-impact-track span, .gh-orb { animation: none !important; }
      }
    `}</style>
  );
}

function PulseIcon() {
  return <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12h4l2-7 4 14 2-7h6" /></svg>;
}

function WatchIcon() {
  return <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="3" /><path d="M9 6V2h6v4M9 18v4h6v-4M9 12h2l1-2 2 4 1-2h1" /></svg>;
}

function TestTubeIcon() {
  return <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 3h6M10 3v6.2l-4.5 7.3A3 3 0 0 0 8.1 21h7.8a3 3 0 0 0 2.6-4.5L14 9.2V3" /><path d="M8 15h8" /></svg>;
}

function DoctorIcon() {
  return <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="7" r="4" /><path d="M5 21v-2a7 7 0 0 1 14 0v2M9 21v-3h6v3" /></svg>;
}

function ShieldIcon() {
  return <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>;
}

function HeartIcon() {
  return <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></svg>;
}

function CheckIcon() {
  return <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>;
}

function AlertIcon() {
  return <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.6 2.4 17.2A2 2 0 0 0 4.1 20h15.8a2 2 0 0 0 1.7-2.8L13.7 3.6a2 2 0 0 0-3.4 0Z" /></svg>;
}

function MoonIcon() {
  return <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" /></svg>;
}
