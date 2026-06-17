import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Akut vård — Vårdguiden",
  description:
    "Akut vård innefattar tidig identifiering, riskvärdering, diagnostik och åtgärder utifrån symtom, tillstånd och skador som är tidskänsliga och potentiellt farliga för liv och hälsa.",
  openGraph: {
    title: "Akut vård — Vårdguiden | Hemläkare.se",
    description:
      "Akut vård innefattar tidig identifiering, riskvärdering, diagnostik och åtgärder utifrån symtom, tillstånd och skador som är tidskänsliga och potentiellt farliga för liv och hälsa.",
    url: "https://hemlakare.se/vardguiden/akut-vard",
  },
};

const sections = [
  {
    id: "sepsis",
    title: "Sepsis – tidig identifiering och behandling",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    source: "Regionalt kunskapsstöd – Region Stockholm/Gotland",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/akut-vard/regionala-kunskapsstod/sepsis---tidig-identifiering-och-behandling",
    intro:
      "Sepsis drabbar över 10 000 personer årligen i Region Stockholm och är ett livshotande tillstånd med hög dödlighet. Trots modern sjukvård orsakar sepsis stort patientlidande och höga samhällskostnader.",
    subsections: [
      {
        title: "Definitioner",
        content: [
          {
            type: "text",
            body: "Sepsis uppstår när en infektion utlöser organdysfunktion. Diagnosen ställs när Sequential Organ Failure Assessment (SOFA)-poäng ökar med minst 2 poäng från baslinjen, beräknat över sex organsystem: centrala nervsystemet, andning, cirkulation, lever, njurar och koagulation.",
          },
          {
            type: "text",
            body: "Septisk chock är ett allvarligare tillstånd där patienten trots adekvat vätskebehandling kräver vasopressorbehandling för att upprätthålla medelartärtrycket ≥65 mmHg, med laktat >2,0 mmol/L.",
          },
        ],
      },
      {
        title: "Klinisk bild",
        content: [
          {
            type: "text",
            body: "Symtombilden varierar kraftigt. Många patienter – särskilt äldre och nyfödda – saknar feber. Vanliga tecken är:",
          },
          {
            type: "list",
            items: [
              "Förändrat medvetandetillstånd eller konfusion",
              "Andnöd",
              "Muskelsvaghet",
              "Akut smärta",
              "Mag-tarmbesvär",
            ],
          },
        ],
      },
      {
        title: "Riskgrupper",
        content: [
          {
            type: "list",
            items: [
              "Vuxna över 75 år",
              "Immunosupprimerade individer",
              "Nyligen genomgången operation eller invasivt ingrepp",
              "Skadad hudbarriär",
              "Intravenöst missbruk",
              "Kateterbärare",
              "Nyligen genomgången graviditet eller förlossning",
            ],
          },
        ],
      },
      {
        title: "Epidemiologi",
        content: [
          {
            type: "text",
            body: "Sepsis drabbar ca 500 per 100 000 invånare årligen med 10–20 % mortalitet – jämförbart med akut hjärtinfarkt (20 %). Septisk chock har en mortalitet på ca 40 %.",
          },
        ],
      },
      {
        title: "Handläggning – identifiering",
        content: [
          {
            type: "subheading",
            body: "Primärvård/öppenvård",
          },
          {
            type: "text",
            body: "Systematisk bedömning av infektionsrisk baserad på allmäntillstånd, fysiologiska parametrar och identifierade riskfaktorer. Klassifikation sker i nivåerna låg–medel–hög sepsisrisk och styr remiss­beslut.",
          },
          {
            type: "subheading",
            body: "Akutmottagning",
          },
          {
            type: "text",
            body: "Akutmottagningen ska implementera \"sepsislarm\" utlöst av triagesystemet RETTS kombinerat med anamnes, vilket möjliggör snabb specialistbedömning av infektions- och intensivvårdsläkare.",
          },
          {
            type: "subheading",
            body: "Vårdavdelning",
          },
          {
            type: "text",
            body: "NEWS (National Early Warning Score) ≥5 poäng kombinerat med misstänkt infektion ska omedelbart notifieras till ansvarig läkare och sepsisbedömning initieras.",
          },
        ],
      },
      {
        title: "Behandlingsbunt – inom 60 minuter",
        content: [
          {
            type: "text",
            body: "Samtliga åtgärder nedan ska genomföras inom 60 minuter från identifiering:",
          },
          {
            type: "list",
            items: [
              "Blododlingar tas innan antibiotika ges",
              "Intravenös antibiotika startas omedelbart",
              "Laktatmätning",
              "Intravenös vätsketillförsel",
              "Vasopressor vid hypotension trots vätska",
              "Identifiering av infektionsfokus",
              "Upprepad monitorering av NEWS, laktat och diures",
              "Daglig omvärdering av antibiotikaval utifrån klinisk respons",
            ],
          },
        ],
      },
      {
        title: "Antibiotikaval",
        content: [
          {
            type: "text",
            body: "Behandlingen baseras på misstänkt infektionskälla med empirisk bredspektrumtäckning, justerad av infektionsläkare. Rekommendationer varierar beroende på fokus: okänt ursprung, luftvägar, buk, skelett, mjukdelar eller hjärnhinnor.",
          },
        ],
      },
      {
        title: "Fokussanering (source control)",
        content: [
          {
            type: "text",
            body: "Snabb identifiering och åtgärd av kontrollerbara infektionskällor (abscesser, obstruktioner, perforationer, endokardit, kateterinfektioner, nekrotiserande infektioner) inom 6 timmar optimerar utfallet.",
          },
        ],
      },
      {
        title: "Monitoreringsmål (1–6 timmar)",
        content: [
          {
            type: "list",
            items: [
              "Medelartärtryck ≥65 mmHg",
              "Diures >0,5 ml/kg/timme",
              "Sjunkande laktatnivåer",
              "Syresaturation 93–97 %",
            ],
          },
        ],
      },
      {
        title: "IVA-konsultation",
        content: [
          {
            type: "text",
            body: "Intensivvård bör övervägas vid:",
          },
          {
            type: "list",
            items: [
              "NEWS ≥7 poäng",
              "Laktat >1 mmol/L över referens med base excess <−5",
              "Klinisk försämring trots insatt behandling",
            ],
          },
        ],
      },
      {
        title: "Uppföljning",
        content: [
          {
            type: "text",
            body: "Långtidskomplikationer inklusive kognitiv och funktionell nedsättning motiverar uppföljning hos infektionsläkare och rehabiliteringsplanering efter utskrivning.",
          },
        ],
      },
    ],
  },
  {
    id: "stroke",
    title: "Prehospital triagering av patienter med stroke",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    source: "Regionalt kunskapsstöd – Region Stockholm/Gotland (uppdaterad juli 2025)",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/nervsystemets-sjukdomar/regionala-kunskapsstod/prehospital-triagering-av-patienter-med-stroke",
    intro:
      "Riktlinjerna syftar till att optimera det initiala omhändertagandet av patienter med misstänkt stroke och förkorta tiden från symtomidentifiering till reperfusionsbehandling. Gäller all ambulanssjukvård och akut strokevård inom Region Stockholm.",
    subsections: [
      {
        title: "Triageklassificering",
        content: [
          {
            type: "subheading",
            body: "Prioritet 1 – Strokelarm",
          },
          {
            type: "text",
            body: "Symtomdebut eller försämring inom 24 timmar, eller okänd debuttid med livshotande tillstånd eller påverkade vitalfunktioner.",
          },
          {
            type: "subheading",
            body: "Prioritet 2",
          },
          {
            type: "text",
            body: "Stationära symtom över 24 timmar eller fullständig symtomregress.",
          },
        ],
      },
      {
        title: "Identifieringsverktyg – AKUT-testet",
        content: [
          {
            type: "text",
            body: "Snabb screening med AKUT-testet:",
          },
          {
            type: "list",
            items: [
              "A – Ansikte: Ansiktsförlamning (ber patienten le)",
              "K – Kroppsdel: Arm- eller bensvaghet",
              "U – Uttal: Talsvårigheter",
              "T – Tid: Tidpunkt för symtomdebut",
            ],
          },
        ],
      },
      {
        title: "A2B2 – bedömning av stor stroke",
        content: [
          {
            type: "text",
            body: "Identifierar signifikant stroke genom ensidig arm- och benförlamning – armen faller inom 10 sekunder, benet inom 5 sekunder – vilket talar för möjlig stor kärlockusion.",
          },
          {
            type: "text",
            body: "Ytterligare tecken på svår stroke:",
          },
          {
            type: "list",
            items: [
              "Svår språkstörning (afasi)",
              "Neglekt (oförmåga att uppfatta stimuli från vänster sida)",
              "Akut synnedsättning eller hemianopi",
            ],
          },
        ],
      },
      {
        title: "Dirigeringsprotokoll",
        content: [
          {
            type: "subheading",
            body: "Misstänkt lindrig stroke",
          },
          {
            type: "text",
            body: "Kontakta närmaste sjukhus strokejour per telefon för triagbeslut.",
          },
          {
            type: "subheading",
            body: "Misstänkt svår stroke",
          },
          {
            type: "text",
            body: "Direktkontakt med Karolinska Solnas strokeenhet för möjlig direkttransport, oavsett patientens geografiska läge inom regionen. Sju regionala sjukhus har dedikerade jourtelefonlinjer dygnet runt.",
          },
        ],
      },
    ],
  },
  {
    id: "akut-kirurgi",
    title: "Akut kirurgi – behandlingshandbok",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 9H17v1.5c0 .83-.67 1.5-1.5 1.5"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8H3.5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 15H7v-1.5c0-.83.67-1.5 1.5-1.5"/>
      </svg>
    ),
    source: "Regionalt kunskapsstöd – Region Stockholm/Gotland",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/kirurgi-och-plastikkirurgi/regionala-kunskapsstod/akut-kirurgi-behandlingshandbok",
    intro:
      "Handboken innehåller aktuella riktlinjer och praktiskt stöd för alla som arbetar inom akut kirurgi i Region Stockholm. Rekommendationerna bygger på evidens och bästa kliniska praxis för diagnostik och behandling.",
    subsections: [
      {
        title: "Traumahandläggning",
        content: [
          {
            type: "list",
            items: [
              "Initialt traumaomhändertagande (ABCDE-systematik)",
              "Thoraxtrauma – pneumothorax, hemothorax, revbensfrakturer",
              "Buktrauma – bukorgan, mjältruptur, leverlaserationer",
              "Bäckentrauma",
              "Traumatisk hjärnskada och ryggmärgsskador",
              "Brännskador",
              "Ögonskador",
              "Traumatiskt hjärtstillestånd",
            ],
          },
        ],
      },
      {
        title: "Kirurgiska specialiteter",
        content: [
          {
            type: "list",
            items: [
              "Handkirurgi – infektioner, frakturer, luxationer",
              "Bröst- och endokrin kirurgi",
              "Urologi – njursten, urinretention, akut skrotum",
              "Allmän kirurgi – akut buk, gastrointestinala tillstånd",
              "Kärlkirurgi",
              "Barnkirurgi",
            ],
          },
        ],
      },
      {
        title: "Mindre kirurgi och procedurer",
        content: [
          {
            type: "list",
            items: [
              "Sårvård och sårrevision",
              "Lokala anestesitekniker",
              "Abscessincision och dränage",
              "Tetanusprofylax",
            ],
          },
        ],
      },
      {
        title: "Tilläggsresurser",
        content: [
          {
            type: "list",
            items: [
              "Checklistor (ABCDE traumabedömning)",
              "Blodprodukter och antikoagulationsriktlinjer",
              "Postoperativa komplikationer",
            ],
          },
          {
            type: "text",
            body: "En PDF-version (13,3 MB) finns tillgänglig för nedladdning via kunskapsstödsportalen.",
          },
        ],
      },
    ],
  },
  {
    id: "akut-hjarta",
    title: "Akut hjärtsjukvård – behandlingshandbok",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    source: "Regionalt kunskapsstöd – Region Stockholm/Gotland",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/hjart--och-karlsjukdomar/regionala-kunskapsstod/akut-hjartsjukvard",
    intro:
      "Kliniska riktlinjer för akut hjärtsjukvård i Region Stockholm och Gotland, med protokoll för akut och långsiktig handläggning av hjärtpatienter.",
    subsections: [
      {
        title: "Akuta koronara syndrom (AKS)",
        content: [
          {
            type: "list",
            items: [
              "Bröstsmärtabedömning och differentialdiagnostik",
              "ST-höjningsinfarkt (STEMI) – reperfusionsprotokoll",
              "Icke-ST-höjningsinfarkt (NSTEMI/UAP)",
              "Antiischemisk behandling",
              "Antitrombotisk terapi och blödningsriskbedömning",
              "Koronarangiografi – indikationer och timing",
            ],
          },
        ],
      },
      {
        title: "Arytmier",
        content: [
          {
            type: "list",
            items: [
              "Bradyarytmier – diagnos och behandling",
              "Takyarytmier",
              "Förmaksflimmer – akut och elektivt omhändertagande",
              "Synkope – utredning",
              "Pacemaker och ICD-hantering",
            ],
          },
        ],
      },
      {
        title: "Hjärtsvikt",
        content: [
          {
            type: "list",
            items: [
              "Diagnostik och klinisk bedömning",
              "Akut hjärtsvikt – behandling",
              "Kronisk hjärtsvikt – optimering",
            ],
          },
        ],
      },
      {
        title: "Övriga akuta tillstånd",
        content: [
          {
            type: "list",
            items: [
              "Hjärtstillestånd – HLR och post-resusciteringsvård",
              "Aortadissektion",
              "Hypertensiva kriser",
              "Myokardit",
              "Infektiös endokardit",
            ],
          },
        ],
      },
      {
        title: "Ambulans-EKG och inläggningskriterier",
        content: [
          {
            type: "text",
            body: "Protokoll för ambulans-EKG med direktlarm till katlab vid bekräftad STEMI. Tydliga inläggningskriterier baserade på EKG, troponin och klinisk bild.",
          },
        ],
      },
    ],
  },
  {
    id: "suicid-vuxna",
    title: "Suicidnära patienter – riskfaktorer och riskbedömning",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    source: "Regionalt kunskapsstöd – Psykisk hälsa, Region Stockholm/Gotland",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/psykisk-halsa/akut-handlaggning/suicidnara-patienter",
    intro:
      "Suicidrisk ska bedömas och dokumenteras vid psykiska sjukdomstillstånd. Den kliniska intervjun är det centrala verktyget – skattningsskalor är komplement, aldrig ersättning.",
    subsections: [
      {
        title: "Riskfaktorer",
        content: [
          {
            type: "text",
            body: "Samsjuklighet mellan flera av följande tillstånd ökar suicidrisken markant:",
          },
          {
            type: "list",
            items: [
              "Tidigare suicidförsök",
              "Psykossjukdom",
              "Depression och bipolär sjukdom",
              "Missbruk/beroende",
              "Neuropsykiatriska tillstånd och personlighetsstörning",
              "Långvarig/kronisk ätstörning",
              "Somatisk sjukdom",
              "Kön, ärftlighet och ålder",
              "Kriminalvård",
            ],
          },
        ],
      },
      {
        title: "Riskbedömning – strukturerade parametrar",
        content: [
          {
            type: "list",
            items: [
              "Suicidal intention och vilja att dö",
              "Tidigare självmordsförsök",
              "Muntlig suicidal kommunikation",
              "Suicid i familj eller närkrets",
              "Social situation och isolering",
              "Symtomatologi och psykiskt status",
              "Kroppslig sjukdom",
              "Risksituationer i relation till psykiatrisk vård (utskrivning, permission)",
            ],
          },
        ],
      },
      {
        title: "Bedömningsinstrument",
        content: [
          {
            type: "text",
            body: "Instrument som SSI, SIS, SUAS och C-SSRS används som stöd men ersätter aldrig den kliniska bedömningen. Den väsentliga delen av en suicidriskbedömning vilar på den kliniska intervjun.",
          },
        ],
      },
    ],
  },
  {
    id: "suicid-barn",
    title: "Suicidnära barn och ungdomar – risk- och skyddsfaktorer",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      </svg>
    ),
    source: "Regionalt kunskapsstöd – Psykisk hälsa, Region Stockholm/Gotland (uppdaterad mars 2020)",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/psykisk-halsa/akut-handlaggning/suicidnara-barn-och-ungdomar",
    intro:
      "Klinisk vägledning för riskbedömning av barn och ungdomar med suicidnärhet, inklusive risk- och skyddsfaktorer samt bedömningsstruktur.",
    subsections: [
      {
        title: "Akuta riskfaktorer (proximala)",
        content: [
          {
            type: "list",
            items: [
              "Nyligt suicidförsök",
              "Agitation och rastlöshet",
              "Tydlig suicidal intention",
              "Desperation från outhärdligt lidande",
              "Emotionell instabilitet",
              "Förluster (relationer, status, trygghet)",
              "Tillgång till letala metoder",
            ],
          },
        ],
      },
      {
        title: "Underliggande riskfaktorer (distala)",
        content: [
          {
            type: "list",
            items: [
              "Tidigare suicidförsök eller självskada",
              "Anhedoni (oförmåga att känna glädje)",
              "Långdraget, komplicerat behandlingsförlopp",
              "Trauma, utsatthet eller misshandel",
              "Social isolering",
              "Psykiatriska tillstånd: depression, substansmissbruk, bipolär sjukdom, psykos, ätstörning, ångest, personlighetsinstabilitet, dissociativa tillstånd, PTSD",
            ],
          },
        ],
      },
      {
        title: "Familje- och miljöfaktorer",
        content: [
          {
            type: "text",
            body: "Suicid eller suicidförsök i familjen ungefär fördubblar risken för barnet. Ytterligare faktorer:",
          },
          {
            type: "list",
            items: [
              "Psykisk sjukdom hos familjemedlemmar",
              "Allvarliga familjerelationsproblem",
              "Separationer eller dödsfall",
              "Migrationsrelaterad stress och asylprocessen",
            ],
          },
        ],
      },
      {
        title: "Bedömningsstruktur – när och hur",
        content: [
          {
            type: "subheading",
            body: "Bedömning krävs vid:",
          },
          {
            type: "list",
            items: [
              "Första besök",
              "Akuta besök",
              "Uppföljningsbesök",
              "In- och utskrivning",
              "Efter oväntade förbättringar (kan vara varningssignal)",
            ],
          },
          {
            type: "subheading",
            body: "Risknivåer:",
          },
          {
            type: "list",
            items: [
              "Minimal risk",
              "Viss risk",
              "Hög risk",
              "Mycket hög risk",
            ],
          },
          {
            type: "text",
            body: "Den kliniska intervjun är central. Skattningsskalor kompletterar men ersätter aldrig samtalet.",
          },
        ],
      },
    ],
  },
  {
    id: "biverkningar",
    title: "Akuta allvarliga biverkningar",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    source: "Regionalt kunskapsstöd – Psykisk hälsa, Region Stockholm/Gotland (publicerad januari 2017, författare: Mussie Msghina, överläkare Psykiatri Sydväst)",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/psykisk-halsa/akut-handlaggning/akuta-allvarliga-biverkningar",
    intro:
      "Kunskapsstödet täcker akuta allvarliga läkemedelsbiverkningar, framförallt kopplade till psykofarmaka. Tidig identifiering och korrekt handläggning är avgörande.",
    subsections: [
      {
        title: "Malignt neuroleptikasyndrom (MNS)",
        content: [
          {
            type: "text",
            body: "Utlöses av antipsykotika med en incidens på 0,1–1 %. Symtom: hög feber, muskelrigiditet och autonom dysfunktion. Mortalitet 10–20 %. Behandling: utsättning av läkemedel och intensivt stödjande vård.",
          },
        ],
      },
      {
        title: "Malign katatoni",
        content: [
          {
            type: "text",
            body: "Drabbar ca 10 % av psykiatriska patienter (17 % vid autismspektrumtillstånd). Kännetecknas av akinesi, rigiditet och mutism. Behandlas med lorazepam, ECT och adekvat hydrering.",
          },
        ],
      },
      {
        title: "Serotoninsyndrom",
        content: [
          {
            type: "text",
            body: "Uppstår vid överdriven serotoninaktivitet. Presenterar med muskelrigiditet, hög feber och agitation. Behandling: utsättning av serotonerga läkemedel och cyproheptadin (5-HT2a-antagonist).",
          },
        ],
      },
      {
        title: "Antikolinergt syndrom",
        content: [
          {
            type: "text",
            body: "Orsakar delirium, torr hud/slemhinnor och urinretention vid överdosering av antikolinerga läkemedel. Behandlas med utsättning av utlösande preparat.",
          },
        ],
      },
      {
        title: "Övriga allvarliga tillstånd",
        content: [
          {
            type: "list",
            items: [
              "Post-injektionsdelirium (PDSS) vid ZypAdhera",
              "Klozapin-inducerad agranulocytos",
              "QTc-förlängning",
              "SIADH (hyponatremi)",
              "Klozapinutsättningssyndrom",
              "Stevens-Johnsons syndrom",
              "Litiumintoxikation",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "alkohol",
    title: "Alkoholrelaterade akuta komplikationer",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    source: "Regionalt kunskapsstöd – Psykisk hälsa, Region Stockholm/Gotland",
    sourceUrl: "https://kunskapsstodforvardgivare.se/omraden/psykisk-halsa/akut-handlaggning/alkoholrelaterade-akuta-komplikationer",
    intro:
      "Kunskapsstödet täcker akut alkoholförgiftning, abstinens, Wernicke–Korsakoffs syndrom och tvångsvård vid alkoholrelaterade tillstånd.",
    subsections: [
      {
        title: "Akut alkoholförgiftning",
        content: [
          {
            type: "text",
            body: "Alkohol metaboliseras med ca 0,1 g/kg kroppsvikt per timme (5–10 g för de flesta vuxna). Blodalkoholen sjunker ungefär 0,15 promille per timme. Letaldosen är ca 300–400 ml ren alkohol.",
          },
          {
            type: "text",
            body: "Vanligaste dödsorsakerna: andningsdepression och aspiration.",
          },
        ],
      },
      {
        title: "Symtom vid olika promillenivåer",
        content: [
          {
            type: "table",
            rows: [
              ["Nivå", "Promille", "Symtom"],
              ["Lätt", "0,5–1,5", "Pratsamhet, eufori, långsammare reaktioner"],
              ["Måttlig", "1,3–3,0", "Koordinationssvårigheter, humörsvängningar, balansrubbningar"],
              ["Svår", "3,0–5,0", "Illamående, kräkning, medvetandepåverkan, aggressivitet"],
              ["Livshotande", ">5,0", "Koma, kramper, andningsdepression, cirkulationssvikt"],
            ],
          },
        ],
      },
      {
        title: "Wernicke–Korsakoffs syndrom",
        content: [
          {
            type: "text",
            body: "Neuropsykiatrisk störning orsakad av tiaminbrist. Den akuta fasen (Wernickes encefalopati) presenterar den klassiska triaden:",
          },
          {
            type: "list",
            items: [
              "Konfusion",
              "Cerebellär ataxi",
              "Ögonmuskelrubbningar (nystagmus, oftalmoplegia)",
            ],
          },
          {
            type: "text",
            body: "Behandling: Höga doser intravenöst tiamin – minimum 500 mg tre gånger dagligen i 2–3 dagar.",
          },
        ],
      },
      {
        title: "Alkoholabstinens",
        content: [
          {
            type: "text",
            body: "Behandlingen fokuserar på att förebygga kramper och delirium tremens med bensodiazepiner, där oxazepam är förstahandsval. Alla patienter med >2 dagars överkonsumtion kräver profylaktisk tiamin.",
          },
        ],
      },
      {
        title: "Tvångsvård",
        content: [
          {
            type: "text",
            body: "Två svenska lagar kan tillämpas: LPT (Lag om psykiatrisk tvångsvård) och LVM (Lag om vård av missbrukare i vissa fall).",
          },
        ],
      },
    ],
  },
];

function SectionContent({ content }: { content: { type: string; body?: string; items?: string[]; rows?: string[][] }[] }) {
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
              {block.items!.map((item, j) => (
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
          const [header, ...rows] = block.rows!;
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

export default function AkutVardPage() {
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
                src="/bilder/Omrade-akutvard-.svg"
                alt="Akut vård"
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
                Akut vård
              </h1>
              <p className="text-[0.95rem] text-gray-600 leading-relaxed max-w-2xl">
                Akut vård innefattar tidig identifiering, riskvärdering, diagnostik och åtgärder utifrån symtom, tillstånd och skador som är tidskänsliga och potentiellt farliga för liv och hälsa.
              </p>
              <p className="text-[0.8rem] text-gray-400 mt-1">
                Källa: <a href="https://kunskapsstodforvardgivare.se/omraden/akut-vard" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600 transition-colors">kunskapsstodforvardgivare.se</a> – Regionalt kunskapsstöd för vårdgivare, Region Stockholm
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
                {/* Section header */}
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

                {/* Intro */}
                <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6 pl-14">{sec.intro}</p>

                {/* Sub-sections */}
                <div className="pl-14 flex flex-col gap-6">
                  {sec.subsections.map((sub) => (
                    <div key={sub.title} className="flex flex-col gap-3">
                      <h3 className="text-[0.95rem] font-bold text-gray-800 border-l-2 pl-3" style={{ borderColor: "#E72E8A" }}>
                        {sub.title}
                      </h3>
                      <SectionContent content={sub.content as Parameters<typeof SectionContent>[0]["content"]} />
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
                Innehållet är inhämtat från <a href="https://kunskapsstodforvardgivare.se/omraden/akut-vard" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-[#D81B7D] transition-colors">kunskapsstodforvardgivare.se</a>, Region Stockholms och Gotlands regionala kunskapsstöd för vårdgivare. Informationen utgör offentliga riktlinjer och rekommendationer framtagna av medicinska experter. Vid akut sjukdom – ring 112. För icke-akuta frågor, kontakta din läkare via appen.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-6 bg-white text-center">
          <div className="max-w-xl mx-auto flex flex-col items-center gap-5">
            <h2 className="text-[1.5rem] font-bold text-gray-900">Har du frågor om akut vård?</h2>
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
