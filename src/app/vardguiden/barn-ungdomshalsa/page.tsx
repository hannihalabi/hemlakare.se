import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Barn- och ungdomars hälsa — Vårdguiden",
  description:
    "Barn och ungdomars hälsa berör allt från det nyfödda barnet till tonåringen på väg in i vuxenlivet, och från barnhälsovården med förebyggande hälsoinsatser till högspecialiserad vård.",
  openGraph: {
    title: "Barn- och ungdomars hälsa — Vårdguiden | Hemläkare.se",
    description:
      "Barn och ungdomars hälsa berör allt från det nyfödda barnet till tonåringen påväg in i vuxenlivet, och från barnhälsovården med förebyggande hälsoinsatser till högspecialiserad vård.",
    url: "https://hemlakare.se/vardguiden/barn-ungdomshalsa",
  },
};

type Block =
  | { type: "text"; body: string }
  | { type: "subheading"; body: string }
  | { type: "list"; items: string[] }
  | { type: "table"; rows: string[][] };

interface Subsection {
  title: string;
  content: Block[];
}

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  source: string;
  sourceUrl: string;
  intro: string;
  subsections: Subsection[];
}

const sections: Section[] = [
  {
    id: "akut-vard",
    title: "Akut vård – barn",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    source: "Regionalt kunskapsstöd – RPO Barn och ungdomars hälsa, Region Stockholm",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/barn--och-ungdomars-halsa/regionala-och-nationella-kunskapsstod/akut-vard",
    intro:
      "Akut vård för barn kräver särskild kompetens och anpassade protokoll. Alla regionala kunskapsstöd är godkända av RPO Barn och ungdomars hälsa.",
    subsections: [
      {
        title: "Regionala kunskapsstöd",
        content: [
          {
            type: "list",
            items: [
              "Facialispares, akut perifer hos barn och unga – bedömning och behandling",
              "Huggormsbett – handläggning och antidotbehandling",
              "Influensa/virusrelaterad myosit – diagnos och omhändertagande",
              "Paracetamolintoxikation – riskbedömning och behandlingsprotokoll",
              "Sicklecellsjukdom på akutmottagning – specifika åtgärder",
              "Tuberkulos – utredning och handläggning",
            ],
          },
        ],
      },
      {
        title: "Nationella och övriga kunskapsstöd",
        content: [
          {
            type: "list",
            items: [
              "Drunkning – handläggning (Barnläkarföreningen)",
              "Hematuri – utredningsalgoritm (Barnläkarföreningen)",
              "IBD, nydebuterad – initial handläggning (Barnläkarföreningen)",
              "Kawasakis sjukdom – diagnos, behandling och uppföljning (Barnläkarföreningen)",
              "Pleuravätska vid bakteriella pneumonier",
              "Pneumothorax, spontan – behandlingsprotokoll",
              "Sepsis, akut handläggning – flödesschema",
              "Sepsis – nationella riktlinjer (Barnläkarföreningen)",
              "Spädbarnsmisshandel – identifiering och anmälningsplikt",
              "STEC-HUS-handläggningsstöd",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "neonatologi",
    title: "Neonatologi",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    source: "Regionalt kunskapsstöd – RPO Barn och ungdomars hälsa, Region Stockholm",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/barn--och-ungdomars-halsa/regionala-och-nationella-kunskapsstod/neonatologi",
    intro:
      "Neonatologi omfattar vård av nyfödda barn, inklusive prematura barn och nyfödda med akuta tillstånd. Alla kunskapsstöd är godkända av RPO Barn och ungdomars hälsa.",
    subsections: [
      {
        title: "Asfyxi och kylterapibehandling",
        content: [
          {
            type: "list",
            items: [
              "Hypotermibehandling – vårdprogram (Barnläkarföreningen)",
              "Hypotermibehandling – föräldrainfo",
            ],
          },
        ],
      },
      {
        title: "Cirkulation och kardiologi",
        content: [
          {
            type: "list",
            items: [
              "Ekokardiografisk bedömning av PDA hos prematura",
              "Perfusionsproblem och neonatal hypotension",
              "Neonatal hypoperfusion – flödesschema",
            ],
          },
        ],
      },
      {
        title: "Extrem prematuritet",
        content: [
          {
            type: "list",
            items: [
              "Riktlinjer för handläggning av extrem prematuritet (< 28 veckor)",
              "Information till föräldrar om barn födda före vecka 27",
              "Handläggning vid hotande förtidsbörd före vecka 27",
            ],
          },
        ],
      },
      {
        title: "Gastroenterologi",
        content: [
          {
            type: "list",
            items: [
              "Nutrition för barn med behov av långvarig parenteral nutrition",
              "Prolongerad ikterus hos nyfödda",
            ],
          },
        ],
      },
      {
        title: "Hjärt- och lungräddning (HLR)",
        content: [
          {
            type: "list",
            items: [
              "Neonatal HLR – flödesschema",
              "Neonatal hjärt- och lungräddning – riktlinjer",
              "Stabilisering av prematura nyfödda",
            ],
          },
        ],
      },
      {
        title: "Infektion och hygien",
        content: [
          {
            type: "list",
            items: [
              "Antibiotikaavslutningsguide",
              "Vaccinationer och RSV-profylax",
              "Virusinfektioner under neonatalperioden (tabell)",
            ],
          },
        ],
      },
      {
        title: "Metabolism",
        content: [
          {
            type: "list",
            items: [
              "Neonatal hypoglykemi – vårdprogram",
              "Neonatal hypoglykemi – flödesschema",
              "Glukosgel – instruktioner",
            ],
          },
        ],
      },
      {
        title: "Neurologi, nutrition och smärta",
        content: [
          {
            type: "list",
            items: [
              "Neonatala kramper – diagnos och behandling",
              "Osteopeni hos prematura",
              "Probiotika under neonatalperioden",
              "Smärtprevention och smärtbehandling under nyföddhetsperioden",
            ],
          },
        ],
      },
      {
        title: "Uppföljning",
        content: [
          {
            type: "text",
            body: "Uppföljning av neonatalt riskutsatta barn sker enligt ett strukturerat program för att tidigt identifiera neuromotorisk och kognitiv påverkan.",
          },
        ],
      },
    ],
  },
  {
    id: "obesitas",
    title: "Obesitas hos barn och ungdomar",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3z" opacity="0" /><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    source: "Regionalt kunskapsstöd – Endokrinologi, RPO Barn och ungdomars hälsa, Region Stockholm",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/barn--och-ungdomars-halsa/regionala-och-nationella-kunskapsstod/endokrinologi/regionala-kunskapsstod/obesitas-hos-barn-och-ungdomar",
    intro:
      "Kunskapsstödet klargör hur obesitas hos barn och ungdomar ska förebyggas, diagnostiseras och behandlas i Region Stockholm, baserat på nationella riktlinjer och vårdprogram.",
    subsections: [
      {
        title: "Diagnos – BMI-gränser (IOTF-BMI)",
        content: [
          {
            type: "table",
            rows: [
              ["Klassificering", "IOTF-BMI"],
              ["Övervikt", "≥ 25"],
              ["Obesitas grad 1", "≥ 30"],
              ["Obesitas grad 2", "≥ 35"],
              ["Obesitas grad 3", "≥ 40"],
            ],
          },
          {
            type: "text",
            body: "Barn med obesitas från 2 års ålder ska erbjudas remiss till barn- och ungdomsmedicinsk mottagning (BUMM) för utredning och behandling.",
          },
        ],
      },
      {
        title: "Kombinerad livsstilsintervention (KLB)",
        content: [
          {
            type: "text",
            body: "KLB är kärnan i behandlingen och är samtliga BUMM-mottagningars ansvar. Vid utebliven effekt efter ett år med minst sex besök inklusive dietist- och fysioterapeutkontakt, eller vid svår obesitas (grad 3) eller grad 2 med komplikationer, kan patienten remitteras till specialiserade centra.",
          },
          {
            type: "subheading",
            body: "KVÅ-koder för registrering av KLB:",
          },
          {
            type: "list",
            items: [
              "Nutrition: DV051, DV054, DV143",
              "Fysisk aktivitet: DV132, DV133, DV200, QV012",
              "Beteendeförändrande stöd: DU009, DU011, DU113, DU118, QE009",
            ],
          },
        ],
      },
      {
        title: "Vårdnivåer",
        content: [
          {
            type: "subheading",
            body: "Barnhälsovård (BHV)",
          },
          {
            type: "text",
            body: "Monitorerar vikt- och längdutveckling, erbjuder vägledning via familjesamtal och remitterar till BUMM vid behov.",
          },
          {
            type: "subheading",
            body: "Vårdcentral",
          },
          {
            type: "text",
            body: "Mäter och väger barn, identifierar riskpatienter, ger grundläggande livsstilsråd och remitterar till rehabilitering eller BUMM.",
          },
          {
            type: "subheading",
            body: "Elevhälsa",
          },
          {
            type: "text",
            body: "Identifierar elever med snabb viktutveckling, övervikt eller obesitas. Samarbetar med vård och socialtjänst och remitterar vid behov.",
          },
          {
            type: "subheading",
            body: "BUMM – barn- och ungdomsmedicinsk mottagning",
          },
          {
            type: "text",
            body: "Erbjuder kombinerad livsstilsintervention med individuell anpassning av matvanor, fysisk aktivitet och stillasittande beteende. Minst sex besök per år. Läkemedel kan komplettera livsstilsbehandling enligt nationella riktlinjer.",
          },
        ],
      },
      {
        title: "Specialiserade centra",
        content: [
          {
            type: "subheading",
            body: "Rikscentrum Barnobesitas (barn under 16 år)",
          },
          {
            type: "text",
            body: "Behandlar obesitas grad 2 med komplikationer eller grad 3 när BUMM-behandling inte gett resultat. Teambaserad vård med samarbete kring diabetes, leverproblematik och psykisk hälsa.",
          },
          {
            type: "subheading",
            body: "Centrum för obesitas (16–25 år)",
          },
          {
            type: "text",
            body: "Utreder för obesitaskirurgi och erbjuder pre- och postoperativa program.",
          },
        ],
      },
      {
        title: "Kvalitetsuppföljning",
        content: [
          {
            type: "text",
            body: "Behandlingen följs upp via det nationella kvalitetsregistret Boris (Barnregistret för obesitas och behandlingsinsatser i sjukvården) och kvalitetsindikatorer för övervikt och obesitas hos barn.",
          },
        ],
      },
    ],
  },
  {
    id: "psykiatri",
    title: "Psykiatri – ADHD och suicidnärhet",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    source: "Regionalt kunskapsstöd – Psykiatri, RPO Barn och ungdomars hälsa, Region Stockholm",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/barn--och-ungdomars-halsa/regionala-och-nationella-kunskapsstod/psykiatri",
    intro:
      "Psykiatriska kunskapsstöd för barn och ungdomar täcker ADHD och suicidnärhet. Samtliga kunskapsstöd är godkända av RPO Barn och ungdomars hälsa.",
    subsections: [
      {
        title: "ADHD",
        content: [
          {
            type: "text",
            body: "Regionalt kunskapsstöd för ADHD hos barn och ungdomar omfattar utredning, diagnossättning och behandling. ADHD kännetecknas av ouppmärksamhet, hyperaktivitet och impulsivitet i en grad som påverkar vardagslivet.",
          },
          {
            type: "list",
            items: [
              "Utredning av ADHD – strukturerad anamnes och psykologtest",
              "DSM-5-kriterier – tre presentationsformer (övervägande ouppmärksam, hyperaktiv-impulsiv, kombinerad)",
              "Läkemedelsbehandling – centralstimulerande läkemedel som förstahandsval",
              "Psykosociala insatser – beteendeterapi, föräldraträning, skolanpassningar",
              "Samsjuklighet – ångest, depression, autismspektrumtillstånd, inlärningsproblem",
              "Uppföljning – regelbunden bedömning av effekt och biverkningar",
            ],
          },
        ],
      },
      {
        title: "Suicidnära barn och ungdomar",
        content: [
          {
            type: "text",
            body: "Se även avsnittet om suicidnärhet under Akut vård (vuxna) för fullständig riskbedömningsstruktur. För barn och unga gäller specifika faktorer:",
          },
          {
            type: "list",
            items: [
              "Suicid eller suicidförsök i familjen ungefär fördubblar risken för barnet",
              "Psykisk sjukdom hos familjemedlemmar",
              "Trauma, utsatthet eller misshandel",
              "Neuropsykiatriska tillstånd ökar risken",
              "Migrationsrelaterad stress och asylprocess",
              "Bedömning krävs vid första besök, akuta besök, in-/utskrivning och efter oväntade förbättringar",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "lung-allergi",
    title: "Lung- och allergisjukdomar – barn",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    source: "Regionalt kunskapsstöd – Lung/allergi, RPO Barn och ungdomars hälsa, Region Stockholm",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/barn--och-ungdomars-halsa/regionala-och-nationella-kunskapsstod/lung-allergi",
    intro:
      "Astma och allergi är bland de vanligaste kroniska sjukdomarna hos barn. Rätt diagnos och behandling ger barn möjlighet att leva ett normalt liv.",
    subsections: [
      {
        title: "Astma hos barn och vuxna",
        content: [
          {
            type: "text",
            body: "Regionalt kunskapsstöd i form av behandlingshandbok (PDF) för astma hos barn och vuxna. Täcker diagnostik, behandlingstrappa och uppföljning.",
          },
          {
            type: "list",
            items: [
              "Diagnos – spirometri och reversibilitetstest, PEF-mätning",
              "Behandlingstrappa – inhalationssteroider som bas, tillägg av LABA, LTRA",
              "Akut astmabehandling – betastimulerare, syrgas, systemiska steroider",
              "Allergiutredning – pricktest och RAST/specifikt IgE",
              "Utlösande faktorer – luftvägsvirus, allergener, ansträngning, kyla",
              "Uppföljning och kontroll – lungfunktion, symptombörda, livskvalitet",
            ],
          },
        ],
      },
      {
        title: "Matallergi, IgE-förmedlad (vårdförlopp)",
        content: [
          {
            type: "text",
            body: "Nationellt godkänt vårdförlopp för IgE-förmedlad matallergi. Regional anpassning pågår.",
          },
          {
            type: "list",
            items: [
              "Vanligaste allergener: komjölk, ägg, jordnöt, trädnötter, vete, soja, fisk",
              "Diagnos baseras på anamnes, allergitest och öppen eller dubbelblind provokation",
              "Behandling: elimination av allergen, akutplan vid reaktion, adrenalinpenna",
              "Uppföljning för toleransutveckling, särskilt vid komjölks- och äggsallergi",
            ],
          },
        ],
      },
      {
        title: "Obstruktiv sömnrelaterad andningsstörning (OSDB) hos barn",
        content: [
          {
            type: "text",
            body: "Nationellt godkänt vårdförlopp. Vanliga orsaker hos barn: hypertrofierade tonsiller och adenoid.",
          },
          {
            type: "list",
            items: [
              "Symtom: snarkning, andningsuppehåll, munandning, sömnstörning, trötthet",
              "Utredning: klinisk bedömning, polysomnografi vid komplexa fall",
              "Behandling: adenotonsillektomi vid obstruktiva besvär",
              "Uppföljning: viktutveckling, tillväxt och sömnkvalitet",
            ],
          },
        ],
      },
      {
        title: "Pneumonier och pneumothorax",
        content: [
          {
            type: "list",
            items: [
              "Pleuravätska vid bakteriella pneumonier – handläggningsalgoritm (Barnläkarföreningen)",
              "Spontan pneumothorax – behandlingsprotokoll (Barnläkarföreningen)",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "neurologi",
    title: "Neurologi – barn",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.04-4.79A2.5 2.5 0 0 1 7.5 9.5a2.5 2.5 0 0 1 2-3.95A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.04-4.79A2.5 2.5 0 0 0 16.5 9.5a2.5 2.5 0 0 0-2-3.95A2.5 2.5 0 0 0 14.5 2Z" />
      </svg>
    ),
    source: "Regionalt kunskapsstöd – Neurologi, RPO Barn och ungdomars hälsa, Region Stockholm",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/barn--och-ungdomars-halsa/regionala-och-nationella-kunskapsstod/neurologi",
    intro:
      "Neurologiska kunskapsstöd för barn täcker migrän, förvärvad ryggmärgsskada och Downs syndrom.",
    subsections: [
      {
        title: "Migrän hos barn",
        content: [
          {
            type: "text",
            body: "Regionalt kunskapsstöd för migrän hos barn och ungdomar.",
          },
          {
            type: "list",
            items: [
              "Diagnos – IHS-kriterier, smärtkaraktär, duration kortare hos barn (2–72 h)",
              "Akutbehandling – ibuprofen och paracetamol som förstahandsval, triptaner vid otillräcklig effekt",
              "Förebyggande behandling – vid ≥4 attacker/månad, funktionspåverkan",
              "Livsstilsfaktorer – sömn, måltidsrutiner, stress, skärmtid",
              "Huvudvärksdagbok – kartläggning av mönster och utlösande faktorer",
            ],
          },
        ],
      },
      {
        title: "Förvärvad ryggmärgsskada hos barn",
        content: [
          {
            type: "text",
            body: "Gemensamt regionalt kunskapsstöd för vuxna och barn med förvärvad ryggmärgsskada, tillgängligt som PDF-dokument.",
          },
          {
            type: "list",
            items: [
              "Klassifikation – komplett/inkomplett skada (ASIA-skalan)",
              "Akut handläggning – immobilisering, neuroprotektion",
              "Rehabilitering – multidisciplinärt team, hjälpmedel, spasticitet",
              "Komplikationer – trycksår, urinvägsinfektioner, autonom dysreflexi",
            ],
          },
        ],
      },
      {
        title: "Downs syndrom",
        content: [
          {
            type: "text",
            body: "Kunskapsstöd från Barnläkarföreningen för uppföljning och vård av barn med Downs syndrom (trisomi 21).",
          },
          {
            type: "list",
            items: [
              "Medicinska komorbiditeter – hjärtfel, sköldkörtelrubbningar, celiaki, synproblem",
              "Hörseluppföljning – ökad risk för sekretorisk otit och hörselnedsättning",
              "Atlantoaxial instabilitet – kontroll före kontaktsport",
              "Neurokognitiv uppföljning – tidig intervention och habilitering",
              "Övergång till vuxenvård – planerad och strukturerad process",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "infektion",
    title: "Infektionssjukdomar – barn",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    source: "Regionalt kunskapsstöd – Infektion, RPO Barn och ungdomars hälsa, Region Stockholm",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/barn--och-ungdomars-halsa/regionala-och-nationella-kunskapsstod/infektion",
    intro:
      "Infektioner är den vanligaste orsaken till sjukvårdskontakt för barn. Kunskapsstöden täcker allt från vanliga luftvägsinfektioner till ovanligare allvarliga tillstånd.",
    subsections: [
      {
        title: "Regionala kunskapsstöd",
        content: [
          {
            type: "list",
            items: [
              "Mpox – rutiner och handläggning av misstänkta fall",
              "Tuberkulos – utredning och smittspårning",
            ],
          },
        ],
      },
      {
        title: "Smittskydd – anmälningspliktiga infektioner",
        content: [
          {
            type: "text",
            body: "Externa resurser från Smittskyddsläkarföreningen:",
          },
          {
            type: "list",
            items: [
              "Campylobacterinfektioner – handläggning och smittspårning",
              "Kikhosta – behandling och profylax",
              "Mässling – postexpositionsprofylax med immunglobulin",
              "Salmonellainfektioner",
              "Shigellainfektioner",
            ],
          },
        ],
      },
      {
        title: "Sepsis hos barn – akut handläggning",
        content: [
          {
            type: "text",
            body: "Flödesschema och nationella riktlinjer från Barnläkarföreningen:",
          },
          {
            type: "list",
            items: [
              "Tidig identifiering – SIRS-kriterier anpassade för ålder",
              "Blododlingar innan antibiotika",
              "Empirisk antibiotikabehandling inom 60 minuter",
              "Vätskeresuscitering – 10–20 ml/kg under 5–10 minuter",
              "STEC-HUS – specifikt handläggningsstöd vid Shiga-toxinproducerande E. coli",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "bvc",
    title: "Barnhälsovård (BVC) – riktlinjer",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    source: "Regionalt kunskapsstöd – Barnhälsovård, Region Stockholm (uppdaterad juni 2025)",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/barn--och-ungdomars-halsa/riktlinjer-for-bvc/barnhalsovarden",
    intro:
      "Barnhälsovård (BVC) ingår i Vårdval Stockholm. Godkända mottagningar ska följa Region Stockholms basprogram, nationella riktlinjer (Rikshandboken) och lokala riktlinjer.",
    subsections: [
      {
        title: "Övergripande riktlinjer",
        content: [
          {
            type: "list",
            items: [
              "Region Stockholms basprogram för barnhälsovård 0–5 år",
              "Nationella riktlinjer: Rikshandboken i barnhälsovård",
              "Förfrågningsunderlaget för Vårdval Stockholm – BVC",
              "Smittskydd och vårdhygien",
            ],
          },
        ],
      },
      {
        title: "Utvecklingsbedömningar",
        content: [
          {
            type: "text",
            body: "Psykomotorisk uppföljning vid BVC i Region Stockholm sker enligt Rikshandboken. Tre förtydliganden gäller lokalt:",
          },
          {
            type: "list",
            items: [
              "BHV-psykolog = konsultpsykolog vid Malinamottagningen eller bedömningsenhet",
              "BHV-teamet = minst BVC-sjuksköterska och BVC-läkare",
              "Erfaren allmänläkare kan konsulteras istället för barnläkare beroende på lokala förutsättningar",
            ],
          },
          {
            type: "text",
            body: "BVC-Elvis – uppdaterade 3- och 4-årsbesöksprotokoll implementerade 2018 i hela Region Stockholm.",
          },
        ],
      },
      {
        title: "Besök och hälsokontroller",
        content: [
          {
            type: "list",
            items: [
              "Nyföddhetshembesök – dag 4–6 efter hemgång",
              "6-veckorsbesök – tillväxt, amning, relationsband",
              "3–4 månaders besök – motorik, kommunikation, vaccinstart",
              "8 månaders hälsobesök – motorik, grovmotorik, separation",
              "12, 18 månaders besök – språk, socialt samspel",
              "3 och 4 år (BVC-Elvis) – kognitiv screening, syntest, hörsel",
              "5 år – inför skolstart, språk, koncentration",
            ],
          },
        ],
      },
      {
        title: "Vaccinationsprogram",
        content: [
          {
            type: "text",
            body: "Det nationella vaccinationsprogrammet för barn ges via BVC enligt Folkhälsomyndighetens schema:",
          },
          {
            type: "list",
            items: [
              "3 månader: DTaP-IPV-Hib + pneumokockvaccin (PCV)",
              "5 månader: DTaP-IPV-Hib + PCV + rotavirus",
              "12 månader: DTaP-IPV-Hib + PCV + MMR",
              "18 månader: DTaP-IPV-Hib + MMR (booster)",
              "5–6 år: DTaP-IPV (booster)",
              "Flickor 10–12 år: HPV-vaccin",
              "RSV-profylax (palivizumab) till riskgrupper under neonatalperioden",
            ],
          },
        ],
      },
      {
        title: "Resurser och utbildning",
        content: [
          {
            type: "list",
            items: [
              "ePed – beslutsstöd för säker läkemedelshantering till barn",
              "Utbildningar, kurser och seminarier för BVC-personal",
              "BVC-podden och Föräldragruppspodden",
              "Beställning, fakturering och rapportering inom Vårdval",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "onh",
    title: "Öron-, näs- och halssjukdomar – barn",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" opacity="0" /><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    source: "Regionalt kunskapsstöd – Öron/näsa/hals, RPO Barn och ungdomars hälsa, Region Stockholm",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/barn--och-ungdomars-halsa/regionala-och-nationella-kunskapsstod/oron-nasa-hals",
    intro:
      "Öron-, näs- och halssjukdomar är vanliga hos barn. Kunskapsstöden täcker kortband, tonsillit och hörselproblematik.",
    subsections: [
      {
        title: "Kort tungband (ankyloglossi) – barn 0–6 månader",
        content: [
          {
            type: "text",
            body: "Uppdaterat regionalt kunskapsstöd för bedömning, behandling och uppföljning av kort tungband hos spädbarn.",
          },
          {
            type: "list",
            items: [
              "Symtom: amningssvårigheter, dålig viktuppgång, smärta vid amning hos modern",
              "Bedömning: Hazelbaker Assessment Tool for Lingual Frenulum Function (HATLFF)",
              "Behandling: frenulotomi vid funktionell påverkan",
              "Uppföljning: amningsstöd, kontroll av läkning och funktion",
            ],
          },
        ],
      },
      {
        title: "Tonsillit och halsfluss",
        content: [
          {
            type: "list",
            items: [
              "Centorkriterierna – scoring för streptokocker (feber, beläggningar, lymfkörtelsvullnad, frånvaro av hosta)",
              "Snabbtest och odling vid tveksam bild",
              "Penicillin V 10 dagar som förstahandsval vid streptokockinfektion",
              "Tonsillektomi vid recidiverande tonsillit (≥5 per år) eller obstruktiv sömnapné",
            ],
          },
        ],
      },
      {
        title: "Otit – öroninflammation",
        content: [
          {
            type: "list",
            items: [
              "Akut mediaotit (AOM) – vanligast 6 månader–2 år",
              "Smärtlindring som primär åtgärd, exspektans vid lindrig bild",
              "Antibiotika vid uttalad smärta, feber >39 °C, bilateral otit eller barn <2 år",
              "Sekretorisk otit (SOM, lim i örat) – rörbehandling vid bilateral SOM >3 månader",
              "Hörselkontroll vid recidiverande otit",
            ],
          },
        ],
      },
    ],
  },
];

function SectionContent({ content }: { content: Block[] }) {
  return (
    <div className="flex flex-col gap-3">
      {content.map((block, i) => {
        if (block.type === "text") {
          return (
            <p key={i} className="text-[0.92rem] text-gray-700 leading-relaxed">
              {block.body}
            </p>
          );
        }
        if (block.type === "subheading") {
          return (
            <p key={i} className="text-[0.92rem] font-bold text-gray-800 mt-1">
              {block.body}
            </p>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="flex flex-col gap-1.5 pl-1">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2.5 text-[0.9rem] text-gray-700">
                  <span
                    className="mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5 3.5-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "table") {
          const [header, ...rows] = block.rows;
          return (
            <div key={i} className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-[0.85rem]">
                <thead>
                  <tr style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}>
                    {header.map((h, j) => (
                      <th key={j} className="text-left px-4 py-2.5 text-white font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, j) => (
                    <tr key={j} className={j % 2 === 0 ? "bg-white" : "bg-[#fdf5f9]"}>
                      {row.map((cell, k) => (
                        <td key={k} className="px-4 py-2.5 text-gray-700 border-t border-gray-100">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default function BarnUngdomsHalsaPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="bg-[#fdf5f9] py-14 px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-8">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 shadow-sm"
              style={{ background: "white" }}
            >
              <Image
                src="/bilder/Omrade-barn-ungdomshalsa-.svg"
                alt="Barn- och ungdomars hälsa"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-3 text-center sm:text-left">
              <Link
                href="/vardguiden"
                className="text-[0.8rem] font-semibold uppercase tracking-widest flex items-center gap-1.5 justify-center sm:justify-start hover:opacity-80 transition-opacity"
                style={{ color: "#E72E8A" }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Vårdguiden
              </Link>
              <h1 className="text-[2rem] sm:text-[2.6rem] font-black text-gray-900 leading-tight tracking-tight">
                Barn- och ungdomars hälsa
              </h1>
              <p className="text-[0.95rem] text-gray-600 leading-relaxed max-w-2xl">
                Barn och ungdomars hälsa berör allt från det nyfödda barnet till tonåringen på väg in i vuxenlivet, och från barnhälsovården med förebyggande hälsoinsatser för de mindre barnen till högspecialiserad vård för de svårast sjuka barnen.
              </p>
              <p className="text-[0.8rem] text-gray-400 mt-1">
                Källa:{" "}
                <a
                  href="https://kunskapsstodforvardgivare.se/omraden/barn--och-ungdomars-halsa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-600 transition-colors"
                >
                  kunskapsstodforvardgivare.se
                </a>{" "}
                – Regionalt kunskapsstöd för vårdgivare, Region Stockholm
              </p>
            </div>
          </div>
        </section>

        {/* Quick-nav */}
        <section className="border-b border-gray-100 bg-white px-6 py-4 sticky top-16 z-40">
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.78rem] font-semibold text-gray-600 bg-gray-50 hover:bg-[#fdf5f9] hover:text-[#D81B7D] transition-colors whitespace-nowrap"
                >
                  {s.title.split("–")[0].trim()}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Sections */}
        <section className="py-14 px-6 bg-white">
          <div className="max-w-5xl mx-auto flex flex-col gap-14">
            {sections.map((sec) => (
              <div key={sec.id} id={sec.id} className="scroll-mt-28">
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
                  >
                    <span className="text-white">{sec.icon}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[1.3rem] font-bold text-gray-900 leading-snug">{sec.title}</h2>
                    <a
                      href={sec.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.75rem] text-gray-400 hover:text-[#E72E8A] transition-colors flex items-center gap-1"
                    >
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                        <path d="M10 2h4v4M14 2l-7 7M6 4H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {sec.source}
                    </a>
                  </div>
                </div>

                <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6 pl-14">{sec.intro}</p>

                <div className="pl-14 flex flex-col gap-6">
                  {sec.subsections.map((sub) => (
                    <div key={sub.title} className="flex flex-col gap-3">
                      <h3 className="text-[0.95rem] font-bold text-gray-800 border-l-2 pl-3" style={{ borderColor: "#E72E8A" }}>
                        {sub.title}
                      </h3>
                      <SectionContent content={sub.content} />
                    </div>
                  ))}
                </div>

                <div className="mt-8 pl-14">
                  <div className="h-px bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Source notice */}
        <section className="py-10 px-6 bg-[#fdf5f9]">
          <div className="max-w-5xl mx-auto rounded-2xl border border-[#E72E8A]/15 bg-white p-6 flex gap-4 items-start">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5" style={{ color: "#E72E8A" }} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div className="flex flex-col gap-1">
              <p className="text-[0.88rem] font-bold text-gray-900">Om informationen på denna sida</p>
              <p className="text-[0.83rem] text-gray-600 leading-relaxed">
                Innehållet är inhämtat från{" "}
                <a
                  href="https://kunskapsstodforvardgivare.se/omraden/barn--och-ungdomars-halsa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium hover:text-[#D81B7D] transition-colors"
                >
                  kunskapsstodforvardgivare.se
                </a>
                , Region Stockholms och Gotlands regionala kunskapsstöd för vårdgivare, godkänt av RPO Barn och ungdomars hälsa. Informationen utgör offentliga riktlinjer och rekommendationer framtagna av medicinska experter. Vid akut sjukdom hos barn – ring 112 eller 1177. För icke-akuta frågor, kontakta din läkare via appen.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-6 bg-white text-center">
          <div className="max-w-xl mx-auto flex flex-col items-center gap-5">
            <h2 className="text-[1.5rem] font-bold text-gray-900">Frågor om ditt barns hälsa?</h2>
            <p className="text-[0.95rem] text-gray-600">
              Starta ett ärende i appen och prata med din läkare – svar ofta samma dag.
            </p>
            <Link
              href="/appen"
              className="btn-cta px-10 py-4 rounded-full text-[1rem] font-bold text-white transition-all"
            >
              Öppna appen
            </Link>
          </div>
        </section>

      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
