"use client";

import { useState, type ReactNode } from "react";

type Period = "day" | "week" | "month";

type HealthSnapshot = {
  pulse: number;
  restingPulse: number;
  stress: number;
  sleepScore: number;
  sleepDuration: string;
  steps: number;
  stepGoal: number;
  bodyBattery: number;
  respiration: number;
  pulseOx: number | null;
  intensityMinutes: number;
  calories: number;
  pulseTrend: number[];
  stressTrend: number[];
  sleepTrend: number[];
  stepsTrend: number[];
};

type Patient = {
  id: string;
  name: string;
  initials: string;
  connected: boolean;
  lastSync: string;
  device: string;
  snapshots: Record<Period, HealthSnapshot>;
};

const periodLabels: Record<Period, string> = {
  day: "24 timmar",
  week: "7 dagar",
  month: "30 dagar",
};

const patients: Patient[] = [
  {
    id: "hanni",
    name: "Hanni",
    initials: "HA",
    connected: false,
    lastSync: "I dag 14:32",
    device: "Garmin Venu 3",
    snapshots: {
      day: {
        pulse: 62, restingPulse: 61, stress: 29, sleepScore: 76, sleepDuration: "8 t 57 min",
        steps: 6_482, stepGoal: 8_630, bodyBattery: 68, respiration: 13, pulseOx: 97,
        intensityMinutes: 18, calories: 879,
        pulseTrend: [58, 59, 61, 60, 62, 59, 61, 76, 91, 87, 82, 78, 74, 69],
        stressTrend: [18, 22, 19, 28, 42, 36, 25, 31, 48, 33, 26, 21, 29, 24],
        sleepTrend: [18, 42, 68, 82, 55, 74, 91, 62, 80, 76],
        stepsTrend: [220, 510, 880, 1_040, 1_860, 2_420, 3_180, 4_010, 5_280, 6_482],
      },
      week: {
        pulse: 64, restingPulse: 60, stress: 31, sleepScore: 78, sleepDuration: "8 t 12 min",
        steps: 7_940, stepGoal: 8_630, bodyBattery: 64, respiration: 14, pulseOx: 97,
        intensityMinutes: 126, calories: 2_046,
        pulseTrend: [63, 61, 65, 62, 66, 64, 64], stressTrend: [28, 35, 30, 27, 38, 33, 31],
        sleepTrend: [74, 81, 76, 84, 72, 79, 78], stepsTrend: [8_720, 7_430, 9_180, 6_940, 8_310, 8_520, 6_482],
      },
      month: {
        pulse: 63, restingPulse: 60, stress: 30, sleepScore: 77, sleepDuration: "8 t 05 min",
        steps: 8_120, stepGoal: 8_630, bodyBattery: 66, respiration: 14, pulseOx: 97,
        intensityMinutes: 512, calories: 2_018,
        pulseTrend: [65, 64, 63, 62, 64, 61, 63, 65, 62, 63], stressTrend: [34, 32, 29, 31, 27, 30, 33, 28, 31, 30],
        sleepTrend: [72, 75, 78, 80, 76, 79, 77, 81, 75, 77], stepsTrend: [7_100, 8_400, 7_800, 9_200, 8_600, 7_700, 8_900, 7_950, 8_300, 8_120],
      },
    },
  },
  {
    id: "emel",
    name: "Emel",
    initials: "EM",
    connected: false,
    lastSync: "I dag 13:48",
    device: "Garmin Forerunner 265",
    snapshots: {
      day: {
        pulse: 68, restingPulse: 58, stress: 34, sleepScore: 82, sleepDuration: "7 t 46 min",
        steps: 8_126, stepGoal: 10_000, bodyBattery: 74, respiration: 14, pulseOx: 98,
        intensityMinutes: 32, calories: 1_042,
        pulseTrend: [57, 58, 60, 59, 62, 65, 78, 96, 104, 88, 75, 71, 68, 66],
        stressTrend: [21, 24, 31, 26, 44, 39, 33, 51, 46, 35, 28, 32, 34, 29],
        sleepTrend: [24, 51, 78, 86, 61, 82, 94, 72, 88, 82],
        stepsTrend: [340, 820, 1_430, 2_120, 3_040, 4_260, 5_190, 6_480, 7_340, 8_126],
      },
      week: {
        pulse: 66, restingPulse: 57, stress: 32, sleepScore: 81, sleepDuration: "7 t 38 min",
        steps: 9_240, stepGoal: 10_000, bodyBattery: 71, respiration: 14, pulseOx: 98,
        intensityMinutes: 188, calories: 2_210,
        pulseTrend: [67, 65, 66, 64, 68, 66, 66], stressTrend: [30, 28, 35, 31, 37, 33, 32],
        sleepTrend: [79, 84, 78, 85, 80, 83, 82], stepsTrend: [10_240, 8_980, 9_760, 10_820, 8_540, 8_210, 8_126],
      },
      month: {
        pulse: 66, restingPulse: 58, stress: 33, sleepScore: 80, sleepDuration: "7 t 34 min",
        steps: 9_480, stepGoal: 10_000, bodyBattery: 70, respiration: 14, pulseOx: 98,
        intensityMinutes: 734, calories: 2_184,
        pulseTrend: [67, 66, 65, 68, 66, 64, 67, 65, 66, 66], stressTrend: [35, 34, 31, 36, 32, 30, 35, 31, 34, 33],
        sleepTrend: [78, 81, 79, 82, 80, 77, 83, 80, 81, 80], stepsTrend: [8_900, 9_500, 10_200, 9_100, 9_800, 10_400, 8_700, 9_900, 9_300, 9_480],
      },
    },
  },
];

const number = new Intl.NumberFormat("sv-SE");

export default function HealthDataWorkspace() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>("day");
  const selectedPatient = patients.find((patient) => patient.id === selectedPatientId);

  if (selectedPatient) {
    return <PatientDetail patient={selectedPatient} period={period} onPeriodChange={setPeriod} onBack={() => setSelectedPatientId(null)} />;
  }

  return (
    <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-[#f7f7f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#c81e70]">GoHealth</p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">GoHealth</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Samlad översikt över hälsodata för aktiva GoHealth-prenumeranter.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"><p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-400">Aktiva prenumeranter</p><p className="mt-1 text-xl font-extrabold text-slate-950">2</p></div>
        </header>

        <section aria-labelledby="patients-heading">
          <div className="mb-3"><h2 id="patients-heading" className="text-sm font-extrabold text-slate-950">Patienter</h2><p className="mt-1 text-xs text-slate-500">Välj en patient för att se detaljer och utveckling över tid.</p></div>
          <div className="grid gap-4 xl:grid-cols-2">{patients.map((patient) => <PatientCard key={patient.id} patient={patient} onSelect={() => setSelectedPatientId(patient.id)} />)}</div>
        </section>
      </div>
    </main>
  );
}

function PatientCard({ patient, onSelect }: { patient: Patient; onSelect: () => void }) {
  const snapshot = patient.snapshots.day;
  return (
    <button type="button" onClick={onSelect} className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a]" aria-label={`Öppna GoHealth för ${patient.name}`}>
      <span className="flex items-start justify-between gap-4">
        <span className="flex min-w-0 items-center gap-3"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#312a3c] text-sm font-extrabold text-white">{patient.initials}</span><span className="min-w-0"><span className="block text-lg font-extrabold text-slate-950">{patient.name}</span><span className={`mt-1 flex items-center gap-1.5 text-xs font-semibold ${patient.connected ? "text-slate-500" : "text-slate-400"}`}><span className={`size-2 rounded-full ${patient.connected ? "bg-emerald-500" : "bg-slate-300"}`} /> {patient.connected ? "Garmin Connect ansluten" : "Ej ansluten"}</span></span></span>
        <ChevronRightIcon className="mt-2 size-5 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#c81e70]" />
      </span>
      <span className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <CompactMetric icon={<HeartIcon />} label="Vilopuls" value={patient.connected ? `${snapshot.restingPulse} bpm` : "-"} color="text-rose-500" />
        <CompactMetric icon={<SleepIcon />} label="Sömn" value={patient.connected ? `${snapshot.sleepScore} poäng` : "-"} color="text-blue-500" />
        <CompactMetric icon={<StressIcon />} label="Stress" value={patient.connected ? String(snapshot.stress) : "-"} color="text-amber-500" />
        <CompactMetric icon={<StepsIcon />} label="Steg i dag" value={patient.connected ? number.format(snapshot.steps) : "-"} color="text-cyan-600" />
      </span>
      <span className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 text-[0.68rem] text-slate-400"><span>{patient.connected ? patient.device : "Ingen klocka ansluten"}</span><span>Senast synkad {patient.connected ? patient.lastSync.toLocaleLowerCase("sv-SE") : "-"}</span></span>
    </button>
  );
}

function PatientDetail({ patient, period, onPeriodChange, onBack }: { patient: Patient; period: Period; onPeriodChange: (period: Period) => void; onBack: () => void }) {
  const data = patient.snapshots[period];
  const periodNote = period === "day" ? "Senaste 24 timmarna" : period === "week" ? "Genomsnitt senaste 7 dagarna" : "Genomsnitt senaste 30 dagarna";
  const value = (connectedValue: string) => patient.connected ? connectedValue : "-";
  const note = (connectedNote: string) => patient.connected ? connectedNote : "";
  return (
    <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-[#f7f7f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-5">
        <button type="button" onClick={onBack} className="flex min-h-10 items-center gap-2 rounded-xl px-2 text-xs font-bold text-slate-500 transition hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a]"><ArrowLeftIcon className="size-4" /> Alla patienter</button>
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-3"><div className="grid size-14 place-items-center rounded-2xl bg-[#312a3c] text-sm font-extrabold text-white">{patient.initials}</div><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#c81e70]">GoHealth</p><h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{patient.name}</h1><p className="mt-1 text-xs text-slate-500">{patient.connected ? `${patient.device} · Synkad ${patient.lastSync.toLocaleLowerCase("sv-SE")}` : "Ingen klocka ansluten"}</p></div></div>
          <PeriodSelector selected={period} onChange={onPeriodChange} />
        </header>
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm" aria-label="Datastatus"><div className={`flex items-center gap-2 text-xs font-bold ${patient.connected ? "text-emerald-700" : "text-slate-500"}`}><span className={`size-2 rounded-full ${patient.connected ? "bg-emerald-500" : "bg-slate-300"}`} /> {patient.connected ? "Garmin Connect ansluten" : "Ej ansluten"}</div><p className="text-xs text-slate-500">{patient.connected ? periodNote : "Ingen hälsodata tillgänglig"}</p></section>
        <section aria-labelledby="health-overview-heading">
          <h2 id="health-overview-heading" className="sr-only">Hälsoöversikt för {patient.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <HealthMetricCard icon={<HeartIcon />} iconClass="bg-rose-50 text-rose-500" label="Puls" value={value(`${data.pulse} bpm`)} note={note(`Vilopuls ${data.restingPulse} bpm`)}>{patient.connected ? <Sparkline values={data.pulseTrend} color="#ef476f" /> : <UnavailableMetric />}</HealthMetricCard>
            <HealthMetricCard icon={<StressIcon />} iconClass="bg-amber-50 text-amber-600" label="Stress" value={value(String(data.stress))} note={note("Genomsnittlig nivå")}>{patient.connected ? <ProgressRing value={data.stress} label={String(data.stress)} color="#f59e0b" /> : <UnavailableMetric />}</HealthMetricCard>
            <HealthMetricCard icon={<SleepIcon />} iconClass="bg-blue-50 text-blue-500" label="Sömnresultat" value={value(String(data.sleepScore))} note={note(data.sleepDuration)}>{patient.connected ? <MiniBars values={data.sleepTrend} color="#3b82f6" /> : <UnavailableMetric />}</HealthMetricCard>
            <HealthMetricCard icon={<StepsIcon />} iconClass="bg-cyan-50 text-cyan-600" label="Steg" value={value(number.format(data.steps))} note={note(`Mål ${number.format(data.stepGoal)}`)}>{patient.connected ? <ProgressRing value={Math.min(100, data.steps / data.stepGoal * 100)} label={`${Math.round(data.steps / data.stepGoal * 100)} %`} color="#0891b2" /> : <UnavailableMetric />}</HealthMetricCard>
            <HealthMetricCard icon={<BatteryIcon />} iconClass="bg-emerald-50 text-emerald-600" label="Body Battery" value={value(String(data.bodyBattery))} note={note("Senaste registrerade värde")}>{patient.connected ? <Sparkline values={data.stressTrend.map((trendValue) => 100 - trendValue)} color="#10b981" /> : <UnavailableMetric />}</HealthMetricCard>
            <HealthMetricCard icon={<BreathIcon />} iconClass="bg-teal-50 text-teal-600" label="Andning" value={value(`${data.respiration} brpm`)} note={note("Genomsnitt vaken")}>{patient.connected ? <div className="mt-4 flex h-16 items-end gap-1" aria-hidden="true">{[42, 58, 46, 66, 52, 62, 48, 56].map((height, index) => <span key={index} className="w-full rounded-full bg-teal-200" style={{ height }} />)}</div> : <UnavailableMetric />}</HealthMetricCard>
            <HealthMetricCard icon={<PulseOxIcon />} iconClass="bg-indigo-50 text-indigo-500" label="Pulsoximeter" value={value(data.pulseOx === null ? "Ingen data" : `${data.pulseOx} %`)} note={note("Genomsnittlig SpO₂")}>{patient.connected ? <div className="mt-5 flex items-baseline gap-2"><span className="text-xs font-bold text-slate-400">Intervall</span><span className="text-sm font-extrabold text-slate-700">95–99 %</span></div> : <UnavailableMetric />}</HealthMetricCard>
            <HealthMetricCard icon={<TimerIcon />} iconClass="bg-orange-50 text-orange-500" label="Intensiva minuter" value={value(`${data.intensityMinutes} min`)} note={note(period === "day" ? "I dag" : `Under ${periodLabels[period].toLowerCase()}`)}>{patient.connected ? <ProgressBar value={Math.min(100, data.intensityMinutes / (period === "day" ? 30 : period === "week" ? 150 : 600) * 100)} color="bg-orange-500" /> : <UnavailableMetric />}</HealthMetricCard>
            <HealthMetricCard icon={<FlameIcon />} iconClass="bg-pink-50 text-[#c81e70]" label="Kalorier" value={value(number.format(data.calories))} note={note(period === "day" ? "Förbrukat i dag" : "Genomsnitt per dag")}>{patient.connected ? <ProgressBar value={68} color="bg-[#e72e8a]" /> : <UnavailableMetric />}</HealthMetricCard>
            <HealthMetricCard icon={<PressureIcon />} iconClass="bg-slate-100 text-slate-500" label="Blodtryck" value={value("Ingen data")} note={note("Ingen mätning för vald period")}>{patient.connected ? <p className="mt-4 text-xs leading-5 text-slate-400">Visas här när en kompatibel mätning finns.</p> : <UnavailableMetric />}</HealthMetricCard>
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="text-sm font-extrabold text-slate-950">Aktivitetsutveckling</h3><p className="mt-1 text-xs text-slate-500">{patient.connected ? "Steg under vald period" : "-"}</p></div><span className="rounded-full bg-cyan-50 px-3 py-1 text-[0.68rem] font-bold text-cyan-700">{periodLabels[period]}</span></div><div className="mt-5 h-32">{patient.connected ? <AreaChart values={data.stepsTrend} /> : <UnavailableMetric />}</div></section>
          </div>
        </section>
      </div>
    </main>
  );
}

function PeriodSelector({ selected, onChange }: { selected: Period; onChange: (period: Period) => void }) {
  return <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm" aria-label="Tidsperiod">{(Object.keys(periodLabels) as Period[]).map((period) => <button key={period} type="button" onClick={() => onChange(period)} aria-pressed={selected === period} className={`min-h-9 rounded-lg px-3 text-xs font-bold transition ${selected === period ? "bg-[#312a3c] text-white" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}>{periodLabels[period]}</button>)}</div>;
}

function CompactMetric({ icon, label, value, color }: { icon: ReactNode; label: string; value: string; color: string }) {
  return <span className="rounded-xl bg-slate-50 p-3"><span className={`flex size-7 items-center ${color}`}>{icon}</span><span className="mt-2 block text-[0.65rem] font-bold uppercase tracking-wide text-slate-400">{label}</span><span className="mt-1 block text-sm font-extrabold text-slate-900">{value}</span></span>;
}

function HealthMetricCard({ icon, iconClass, label, value, note, children }: { icon: ReactNode; iconClass: string; label: string; value: string; note: string; children: ReactNode }) {
  return <article className="min-h-64 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2.5"><span className={`grid size-9 place-items-center rounded-xl ${iconClass}`}>{icon}</span><h3 className="text-sm font-extrabold text-slate-950">{label}</h3></div><p className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950">{value}</p><p className="mt-1 text-xs text-slate-500">{note}</p><div className="h-20">{children}</div></article>;
}

function UnavailableMetric() { return null; }

function Sparkline({ values, color }: { values: number[]; color: string }) {
  return <svg viewBox="0 0 240 64" className="mt-4 h-16 w-full" preserveAspectRatio="none" aria-hidden="true"><path d="M0 63H240" stroke="#e2e8f0" /><polyline points={linePoints(values, 240, 64)} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" /></svg>;
}

function MiniBars({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  return <div className="mt-4 flex h-16 items-end gap-1" aria-hidden="true">{values.map((value, index) => <span key={index} className="w-full rounded-t" style={{ height: `${Math.max(12, value / max * 100)}%`, backgroundColor: color, opacity: 0.35 + index / values.length * 0.65 }} />)}</div>;
}

function ProgressRing({ value, label, color }: { value: number; label: string; color: string }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  return <div className="mt-3 flex items-center gap-3"><svg viewBox="0 0 64 64" className="size-16 -rotate-90" aria-hidden="true"><circle cx="32" cy="32" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="7" /><circle cx="32" cy="32" r={radius} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - value / 100)} /></svg><span className="text-xs font-extrabold text-slate-600">{label}</span></div>;
}

function ProgressBar({ value, color }: { value: number; color: string }) { return <div className="mt-8 h-2.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true"><div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} /></div>; }

function AreaChart({ values }: { values: number[] }) {
  const points = linePoints(values, 600, 112);
  const path = points.split(" ").map((point, index) => `${index === 0 ? "M" : "L"}${point}`).join(" ");
  return <svg viewBox="0 0 600 112" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="steps-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#06b6d4" stopOpacity="0.3" /><stop offset="1" stopColor="#06b6d4" stopOpacity="0" /></linearGradient></defs><path d={`${path} L600 112 L0 112 Z`} fill="url(#steps-area)" /><polyline points={points} fill="none" stroke="#0891b2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" /></svg>;
}

function linePoints(values: number[], width: number, height: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);
  return values.map((value, index) => `${index / Math.max(1, values.length - 1) * width},${height - 4 - (value - min) / range * (height - 8)}`).join(" ");
}

type IconProps = { className?: string };
function Icon({ className = "size-5", children }: IconProps & { children: ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{children}</svg>; }
function HeartIcon() { return <Icon><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></Icon>; }
function SleepIcon() { return <Icon><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z" /><path d="M15 4h4l-4 4h4" /></Icon>; }
function StressIcon() { return <Icon><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3" /><circle cx="12" cy="12" r="4" /></Icon>; }
function StepsIcon() { return <Icon><path d="M7 3c2 0 3 2 2 4s-3 3-5 2-1-6 3-6ZM16 12c2 0 4 3 3 5s-4 3-6 1 0-6 3-6Z" /></Icon>; }
function BatteryIcon() { return <Icon><rect x="3" y="7" width="17" height="10" rx="2" /><path d="M22 10v4M8 10v4M12 10v4M16 10v4" /></Icon>; }
function BreathIcon() { return <Icon><path d="M3 8h9a3 3 0 1 0-3-3M3 12h14a3 3 0 1 1-3 3M3 16h7" /></Icon>; }
function PulseOxIcon() { return <Icon><circle cx="12" cy="12" r="9" /><path d="M7 12h3l2-4 2 8 2-4h2" /></Icon>; }
function TimerIcon() { return <Icon><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2M9 2h6" /></Icon>; }
function FlameIcon() { return <Icon><path d="M12 22c4 0 7-3 7-7 0-3-2-6-5-9 0 3-2 4-3 5 0-3-1-6-3-9 0 5-3 8-3 13 0 4 3 7 7 7Z" /></Icon>; }
function PressureIcon() { return <Icon><path d="M12 3s6 6 6 11a6 6 0 0 1-12 0c0-5 6-11 6-11Z" /><path d="M9 14h2l1-2 1 4 1-2h1" /></Icon>; }
function ChevronRightIcon(props: IconProps) { return <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon>; }
function ArrowLeftIcon(props: IconProps) { return <Icon {...props}><path d="m15 18-6-6 6-6M9 12h10" /></Icon>; }
