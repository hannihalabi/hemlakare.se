import type { Metadata } from "next";
import Image from "next/image";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";
import GoHealthRadar from "@/components/GoHealthRadar";
import { BloodPressureStory } from "@/components/GoHealthStory";
import Header from "@/components/Header";
import { SITE_URL } from "@/lib/site";
import MeasurementGuide from "./MeasurementGuide";
import TrendExplorer from "./TrendExplorer";
import styles from "./gohealth.module.css";

const title = "GoHealth – följ din hälsa över tid med en läkare";
const description =
  "Se hur sömn, puls, blodtryck och blodprover kan följas över tid. Utforska GoHealth, vår smartklocka och hur du kommer igång med vårdteamet.";
const heroPhoto = "/bilder/Svensk hjärthälsa på surfplatta.png";
const interestLink = "mailto:info@hemlakare.se?subject=Intresseanm%C3%A4lan%20GoHealth";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/gohealth" },
  openGraph: {
    title: title + " | Hemläkare.se",
    description,
    url: SITE_URL + "/gohealth",
    images: [{ url: heroPhoto, alt: "GoHealths hälsoöversikt på en surfplatta" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [heroPhoto] },
};

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={down ? { transform: "rotate(90deg)" } : undefined}>
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PulseIllustration() {
  return (
    <div className={styles.pulseCard} aria-hidden="true">
      <div className={styles.pulseLabel}><span /> Vilopuls</div>
      <div className={styles.pulseValue}>58 <small>slag/min</small></div>
      <svg viewBox="0 0 116 27" preserveAspectRatio="none" fill="none" focusable="false">
        <path d="M1 21H115" stroke="#ebdce4" strokeDasharray="2 4" />
        <path d="m2 15 17-5 18 8 19-12 19 4 19 8 19-5" stroke="#b72068" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="113" cy="13" r="2.7" fill="#b72068" />
      </svg>
      <span className={styles.sample}>7 dagar · Exempeldata</span>
    </div>
  );
}

const careSteps = [
  {
    title: "Vi börjar med en hälsokontroll",
    text: "Du och vårdteamet går igenom hur du mår, vad du vill förstå och vilka värden det är relevant att följa.",
  },
  {
    title: "Du väljer vad du delar",
    text: "Mätningar från din vardag ger sammanhang åt provsvaren. Din berättelse om sömn, träning och stress hör också hemma här.",
  },
  {
    title: "Läkaren följer upp förändringar",
    text: "Om ett mönster förändras kan ni prata om möjliga förklaringar och bedöma om du behöver en ny mätning, ett prov eller ett besök.",
  },
];

export default function GoHealthPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="gohealth-title">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.product}>
                <svg aria-hidden="true" width="29" height="21" viewBox="0 0 29 21" fill="none">
                  <path d="M1 11h6l3-7 5 14 4-10 2 3h7" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                GoHealth
              </p>
              <h1 id="gohealth-title">Din hälsa,<br /><em>över tid.</em></h1>
              <p className={styles.lead}>Hur påverkas din återhämtning under en intensiv vecka? Med GoHealth följer du och din läkare sömn, puls och blodprover över tid. Tillsammans ser ni vad som är värt att följa upp.</p>
              <div className={styles.actions}>
                <a className={styles.primary} href="#medlemskap">Bli medlem <Arrow /></a>
                <a className={styles.secondary} href="#dataradarn">Se dataradarn <Arrow down /></a>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <svg className={styles.contours} viewBox="0 0 640 470" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
                {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                  <ellipse key={n} cx="363" cy="237" rx={135 + n * 25} ry={106 + n * 18} transform="rotate(-26 363 237)" />
                ))}
              </svg>
              <Image src={heroPhoto} alt="En person som tittar på en hälsoöversikt på sin surfplatta." fill preload sizes="(max-width: 720px) 100vw, (max-width: 1250px) 53vw, 638px" className={styles.tablet} />
              <PulseIllustration />
            </div>
          </div>
        </section>

        <section id="dataradarn" aria-labelledby="radar-title" className={styles.radar}>
          <div className={styles.radarInner}>
            <div className={styles.radarCopy}>
              <h2 id="radar-title">Följ mätningarna i dataradarn.</h2>
              <p>Se hur pulsen, nattens sömn och andra mätvärden kommer in från en klocka. Radarn visar ett simulerat flöde. I GoHealth väljer du själv vilka uppgifter du delar med vårdteamet.</p>
              <nav aria-label="Utforska GoHealth" className={styles.radarLinks}>
                <a href="#blodtryck">Blodtrycket mellan läkarbesöken <Arrow /></a>
                <a href="#halsotrender">Utforska hälsotrender <Arrow /></a>
                <a href="#matguiden">Vad kan jag mäta? <Arrow /></a>
              </nav>
            </div>
            <div className={styles.radarPlot}><GoHealthRadar /></div>
          </div>
        </section>

        <BloodPressureStory />
        <TrendExplorer />
        <MeasurementGuide />

        <section className={styles.care} aria-labelledby="sa-fungerar-gohealth">
          <div className={styles.careInner}>
            <div className={styles.carePhoto}>
              <Image src="/landningspage/hanni-portrait-transparent.png" alt="Hanni från Hemläkare.se." fill sizes="(max-width: 720px) 0px, 385px" />
            </div>
            <div className={styles.careBody}>
              <h2 id="sa-fungerar-gohealth">Så följer vi din hälsa tillsammans.</h2>
              <ol className={styles.steps}>
                {careSteps.map((step) => (
                  <li key={step.title}>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="medlemskap" aria-labelledby="medlem-title" className={styles.join}>
          <div className={styles.joinInner}>
            <div className={styles.joinIntro}>
              <h2 id="medlem-title">Vill du gå med i GoHealth?</h2>
              <p>Hör av dig till oss, så går vi igenom medlemskapet och hur du bokar din första hälsokontroll.</p>
            </div>
            <div className={styles.offer}>
              <p className={styles.price}>995 <span>kr/mån</span></p>
              <p className={styles.terms}>Smartklocka ingår · 24 månaders bindningstid</p>
              <a className={styles.primary} href={interestLink}>Anmäl intresse via mejl <Arrow /></a>
              <a className={styles.phone} href="tel:0108086084">Eller ring 010 808 60 84</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
