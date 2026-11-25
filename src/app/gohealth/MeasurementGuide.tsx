import { measurementGroups } from "./measurement-guide";
import styles from "./guide.module.css";

function SourceIllustration({ source }: { source: string }) {
  return (
    <svg viewBox="0 0 144 90" aria-hidden="true" fill="none" className={styles.illustration}>
      {source === "blood" ? (
        <g strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="80" cy="78" rx="43" ry="4" fill="#e9ceda" />
          <g transform="rotate(24 76 44)">
            <path d="M64 17h22v45a11 11 0 0 1-22 0Z" fill="#fffafc" stroke="#74374f" strokeWidth="2" />
            <path d="M67 43c6-4 11 4 16 0v19a8 8 0 0 1-16 0Z" fill="#c94278" />
            <path d="M67 23v14" stroke="#f2c6d5" strokeWidth="2.7" />
            <rect x="61" y="12" width="28" height="9" rx="2" fill="#73374f" />
            <path d="M66 14v5m5-5v5m5-5v5m5-5v5" stroke="#aa748b" strokeWidth="1.5" />
            <path d="M78 28h7m-5 5h5m-7 5h7" stroke="#a76f84" strokeWidth="1.5" />
          </g>
          <g fill="#eac0d2" stroke="#aa6985" strokeWidth="1.1">
            <ellipse cx="112" cy="56" rx="7" ry="4.5" transform="rotate(-18 112 56)" />
            <ellipse cx="119" cy="68" rx="5" ry="3.3" transform="rotate(25 119 68)" />
          </g>
          <path d="m109 57 5-1m3 12 3 1" stroke="#ad6d86" strokeWidth="1.3" />
        </g>
      ) : source === "wearable" ? (
        <g strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="78" cy="78" rx="38" ry="4" fill="#d3e4e2" />
          <g transform="rotate(12 75 43)">
            <path d="M65 11h23l-2 16H67Zm2 48h20l1 17H65Z" fill="#a2cac1" stroke="#325953" strokeWidth="2" />
            <path d="M72 16h9m-9 51h8" stroke="#719c93" strokeWidth="2" />
            <rect x="57" y="22" width="38" height="43" rx="11" fill="#e4eeeb" stroke="#325953" strokeWidth="2" />
            <rect x="61" y="26" width="30" height="35" rx="7" fill="#284b47" />
            <path d="M64 46h5l3-5 4 11 5-17 3 10h4" stroke="#b5ead1" strokeWidth="2" />
            <path d="M96 35v8" stroke="#325953" strokeWidth="3" />
          </g>
          <path d="M105 26q6 4 6 11m-2-18q12 6 12 20" stroke="#7aa79e" strokeWidth="1.5" />
        </g>
      ) : (
        <g strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="80" cy="78" rx="43" ry="4" fill="#ded9ee" />
          <path d="M42 23v8c0 9 5 15 13 15 9 0 16-8 16-18v-8" stroke="#514767" strokeWidth="4" />
          <path d="M42 24v-5c0-4 3-7 7-7h1m21 10v-5c0-4-3-7-7-7h-1" stroke="#9e91b0" strokeWidth="2.8" />
          <path d="M49 12h3m10-2h3" stroke="#514767" strokeWidth="4" />
          <path d="M55 46v9c0 11 6 19 18 19s19-8 19-19v-2" stroke="#72658a" strokeWidth="4" />
          <circle cx="94" cy="44" r="13" fill="#eeebf3" stroke="#514767" strokeWidth="2" />
          <circle cx="94" cy="44" r="8.5" fill="#baafcd" stroke="#8b7c9f" strokeWidth="1.5" />
          <circle cx="94" cy="44" r="3.3" fill="#fcfaff" />
        </g>
      )}
    </svg>
  );
}

export default function MeasurementGuide() {
  return (
    <section id="matguiden" aria-labelledby="matguiden-title" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.heading}>
          <h2 id="matguiden-title">Vad kan du mäta och följa?</h2>
          <p>Välj en mätkälla för fler exempel. Klockans funktioner beror på modellen. Du och läkaren väljer vilka prover och undersökningar som passar dig.</p>
        </header>
        <fieldset className={styles.guide}>
          <legend className={styles.visuallyHidden}>Välj mätkälla</legend>
          <div className={styles.choices}>
            {measurementGroups.map((group, index) => (
              <label key={group.id} className={styles.choice} data-source={group.id}>
                <input
                  type="radio"
                  name="gohealth-matkalla"
                  value={group.id}
                  defaultChecked={index === 0}
                  aria-labelledby={`matguide-val-${group.id}`}
                  aria-controls={`matguide-${group.id}`}
                  className={styles.visuallyHidden}
                />
                <span className={styles.tile}>
                  <SourceIllustration source={group.id} />
                  <span id={`matguide-val-${group.id}`} className={styles.tileTitle}>{group.title}</span>
                  <span className={styles.examples} role="list" aria-label={`Exempel för ${group.title.toLocaleLowerCase("sv-SE")}`}>
                    {group.examples.map((example) => (
                      <span className={styles.example} role="listitem" key={example.label}>
                        <strong>{example.label}</strong>
                        <span>{example.value}</span>
                      </span>
                    ))}
                  </span>
                  <svg className={styles.choiceIndicator} aria-hidden="true" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8.5" />
                    <path d="m6 10 2.6 2.7 5.4-5.4" />
                  </svg>
                </span>
              </label>
            ))}
          </div>
          {measurementGroups.map((group) => (
            <section
              id={`matguide-${group.id}`}
              key={group.id}
              data-panel={group.id}
              aria-labelledby={`matguide-${group.id}-title`}
              className={styles.panel}
            >
              <div className={styles.intro}>
                <h3 id={`matguide-${group.id}-title`}>{group.question}</h3>
                <p>{group.intro}</p>
              </div>
              <div className={styles.topics}>
                {group.topics.map((topic, index) => (
                  <details className={styles.topic} key={topic.title} open={index === 0}>
                    <summary>
                      <span>{topic.title}</span>
                      <svg viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M4 10h12" />
                        <path className={styles.plusStem} d="M10 4v12" />
                      </svg>
                    </summary>
                    <div className={styles.topicBody}>
                      <p>{topic.description}</p>
                      <ul>{topic.measures.map((measure) => <li key={measure}>{measure}</li>)}</ul>
                    </div>
                  </details>
                ))}
              </div>
              {group.sources.length > 0 && (
                <div className={styles.sources}>
                  <span>Källor</span>
                  <ul>
                    {group.sources.map((source) => (
                      <li key={source.href}><a href={source.href}>{source.label}</a></li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </fieldset>
      </div>
    </section>
  );
}
