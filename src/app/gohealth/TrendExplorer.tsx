"use client";

import { useState } from "react";
import styles from "./trends.module.css";

type Metric = "sleep" | "glucose" | "pressure";

type Measurement = {
  date: string;
  shortDate: string;
  value: number;
  lower?: number;
};

type Trend = {
  id: Metric;
  area: string;
  title: string;
  source: string;
  period: string;
  unit: string;
  ticks: number[];
  readings: Measurement[];
  interpretation: string;
};

const week = [
  ["Måndag", "Mån"], ["Tisdag", "Tis"], ["Onsdag", "Ons"], ["Torsdag", "Tor"],
  ["Fredag", "Fre"], ["Lördag", "Lör"], ["Söndag", "Sön"],
];

// Average nightly sleep over the four weeks before the illustrated week, in minutes.
const previousSleepAverage = 435;

const trends: Trend[] = [
  {
    id: "sleep", area: "Återhämtning", title: "Sömntid", source: "Pulsklocka", period: "En vecka",
    unit: "", ticks: [480, 420, 360, 300],
    readings: [455, 440, 410, 370, 395, 440, 465].map((value, i) => ({
      value, date: week[i][0], shortDate: week[i][1],
    })),
    interpretation: "Onsdag till fredag ligger sömnen under personens tidigare snitt. Om du också känt dig tröttare kan du och läkaren prata om vad som hände de dagarna.",
  },
  {
    id: "glucose", area: "Ämnesomsättning", title: "Långtidsblodsocker", source: "Blodprov · HbA1c", period: "Ett år",
    unit: "mmol/mol", ticks: [42, 40, 38, 36],
    readings: [
      { date: "Januari", shortDate: "Jan", value: 38 }, { date: "April", shortDate: "Apr", value: 40 },
      { date: "Juli", shortDate: "Jul", value: 39 }, { date: "Oktober", shortDate: "Okt", value: 38 },
    ],
    interpretation: "I april stiger provsvaret från 38 till 40 mmol/mol. Nästa två prover visar 39 och 38. Tillsammans visar de att uppgången i april inte fortsatte.",
  },
  {
    id: "pressure", area: "Cirkulation", title: "Blodtryck", source: "Blodtrycksmanschett", period: "En vecka",
    unit: "mmHg", ticks: [140, 120, 100, 80, 60],
    readings: [[120, 76], [121, 77], [125, 79], [127, 80], [124, 78], [121, 75], [119, 75]]
      .map(([value, lower], i) => ({ value, lower, date: week[i][0], shortDate: week[i][1] })),
    interpretation: "Alla sju mätningar är tagna hemma på morgonen i vila. Båda värdena stiger fram till torsdag och sjunker sedan igen. Liknande mätförhållanden gör dagarna lättare att jämföra.",
  },
];

function MetricSymbol({ metric }: { metric: Metric }) {
  const paths = {
    sleep: <path d="M20.5 13.5A8.5 8.5 0 0 1 10.4 3.4 8.6 8.6 0 1 0 20.5 13.5Z" />,
    glucose: <><path d="M9 3h6m-5 0v5.5l-5 8a2.6 2.6 0 0 0 2.2 4h9.6a2.6 2.6 0 0 0 2.2-4l-5-8V3"/><path d="M8.2 14h7.6"/></>,
    pressure: <><path d="M3 12h4l2.4-6.5 4.1 13 2.6-6.5H21"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[metric]}</svg>;
}

function sleepDuration(minutes: number) {
  return `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
}

function numericLabel(trend: Trend, reading: Measurement) {
  if (trend.id === "sleep") return sleepDuration(reading.value);
  if (reading.lower !== undefined) return `${reading.value}/${reading.lower}`;
  return String(reading.value);
}

function TrendCard({ trend }: { trend: Trend }) {
  const [selected, setSelected] = useState(trend.id === "sleep" ? 3 : trend.readings.length - 1);
  const reading = trend.readings[selected];
  const valueLabel = numericLabel(trend, reading);
  const high = trend.ticks[0];
  const low = trend.ticks[trend.ticks.length - 1];
  const yAt = (value: number) => (high - value) / (high - low) * 100;
  const xAt = (index: number) => (index + 0.5) / trend.readings.length * 100;
  const points = trend.readings.map((point, i) => `${xAt(i)},${yAt(point.value)}`).join(" ");
  const lowerPoints = trend.readings.flatMap((point, i) => point.lower === undefined ? [] : [`${xAt(i)},${yAt(point.lower)}`]).join(" ");
  const activeX = xAt(selected);

  return (
    <figure className={styles.card} aria-label={`${trend.title}, fiktivt exempel`}>
      <div className={styles.cardHead}>
        <div>
          <p className={styles.source}>{trend.source}</p>
          <h3>{trend.title}</h3>
        </div>
        <span className={styles.example}>Exempeldata</span>
      </div>
      <div className={styles.reading} aria-live="polite" aria-atomic="true">
        <strong>{valueLabel}</strong>{trend.unit && <span>{trend.unit}</span>}
        <span className={styles.readingDate}>{reading.date}</span>
      </div>
      <div className={styles.plotLayout}>
        <div className={styles.yLabels} aria-hidden="true">
          {trend.ticks.map(tick => <span key={tick}>{trend.id === "sleep" ? `${tick / 60} h` : tick}</span>)}
        </div>
        <div className={styles.plot}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"
            onClick={event => {
              const box = event.currentTarget.getBoundingClientRect();
              const column = Math.floor((event.clientX - box.left) / box.width * trend.readings.length);
              setSelected(Math.max(0, Math.min(trend.readings.length - 1, column)));
            }}>
            {trend.ticks.map(tick => <line key={tick} x1="0" x2="100" y1={yAt(tick)} y2={yAt(tick)} className={styles.gridLine} vectorEffect="non-scaling-stroke" />)}
            {trend.id === "sleep" && <>
              <defs><linearGradient id="gohealth-sleep-wash" x2="0" y2="1"><stop stopColor="#db247c" stopOpacity=".15"/><stop offset="1" stopColor="#db247c" stopOpacity="0"/></linearGradient></defs>
              <polygon points={`${xAt(0)},100 ${points} ${xAt(trend.readings.length - 1)},100`} fill="url(#gohealth-sleep-wash)" />
            </>}
            {trend.id === "sleep" && (
              <line x1="0" x2="100" y1={yAt(previousSleepAverage)} y2={yAt(previousSleepAverage)}
                className={styles.averageLine} vectorEffect="non-scaling-stroke" />
            )}
            <line x1={activeX} x2={activeX} y1="0" y2="100" className={styles.cursorLine} vectorEffect="non-scaling-stroke" />
            <polyline points={points} className={styles.primaryLine} vectorEffect="non-scaling-stroke" />
            {lowerPoints && <polyline points={lowerPoints} className={styles.lowerLine} vectorEffect="non-scaling-stroke" />}
          </svg>
          {trend.readings.map((point, i) => <div key={point.date} aria-hidden="true">
            <i className={styles.dot} data-selected={selected === i} style={{ left: `${xAt(i)}%`, top: `${yAt(point.value)}%` }} />
            {point.lower !== undefined && <i className={styles.lowerDot} data-selected={selected === i} style={{ left: `${xAt(i)}%`, top: `${yAt(point.lower)}%` }} />}
          </div>)}
        </div>
        <div className={styles.dates} role="group" aria-label="Välj mätning" style={{gridTemplateColumns: `repeat(${trend.readings.length}, 1fr)`}}>
          {trend.readings.map((point, i) => (
            <button type="button" key={point.date} aria-pressed={selected === i}
              aria-label={`${point.date}, ${numericLabel(trend, point)} ${trend.unit}`.trim()}
              onClick={() => setSelected(i)}>{point.shortDate}</button>
          ))}
        </div>
      </div>
      {trend.id === "sleep" && (
        <div className={styles.legend}>
          <span>Nattens sömn</span><span>Snitt föregående fyra veckor · {sleepDuration(previousSleepAverage)}</span>
        </div>
      )}
      {lowerPoints && <div className={styles.legend}><span>Övertryck</span><span>Undertryck</span></div>}
      <figcaption>{trend.interpretation}</figcaption>
    </figure>
  );
}

export default function TrendExplorer() {
  const [current, setCurrent] = useState(trends[0]);
  return (
    <section id="halsotrender" className={styles.section} aria-labelledby="trend-heading">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="trend-heading">Så följer vi dina trender</h2>
          <p>Vi jämför med dina tidigare värden och ser om en förändring återkommer. Läkaren väger in hur du mår när ni avgör vad som ska följas upp.</p>
          <div className={styles.options} role="group" aria-label="Välj hälsoområde">
            {trends.map(trend => <button type="button" key={trend.id} aria-pressed={current.id === trend.id}
              aria-controls="trend-panel" onClick={() => setCurrent(trend)}>
              <span className={styles.icon}><MetricSymbol metric={trend.id}/></span>
              <span className={styles.optionCopy}><strong>{trend.area}</strong><small>{trend.title} · {trend.period.toLocaleLowerCase("sv-SE")}</small></span>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={styles.arrow}><path d="M3 10h13m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>)}
          </div>
        </div>
        <div id="trend-panel" className={styles.panel}><TrendCard key={current.id} trend={current} /></div>
      </div>
    </section>
  );
}
