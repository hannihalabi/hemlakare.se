import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const categories = [
  {
    label: "Akut vård",
    slug: "akut-vard",
    icon: "/bilder/Omrade-akutvard-.svg",
    intro: "Akut vård ges vid plötsliga och allvarliga tillstånd som kräver omedelbar medicinsk bedömning. Det kan handla om allt från bröstsmärta och andnöd till skador och medvetslöshet.",
    topics: [
      "Hjärtinfarkt och hjärtstillestånd",
      "Stroke – symtom och snabb behandling",
      "Svåra allergiska reaktioner (anafylaxi)",
      "Akuta skador och frakturer",
      "Förgiftning och överdosering",
      "Andningssvårigheter",
    ],
  },
  {
    label: "Barn- och ungdomars hälsa",
    slug: "barn-ungdomshalsa",
    icon: "/bilder/Omrade-barn-ungdomshalsa-.svg",
    intro: "Barn och ungdomars hälsa spänner över allt från vanliga barnsjukdomar till tillväxt, utveckling och psykisk hälsa. En fast barnläkarkontakt är viktig för god uppföljning.",
    topics: [
      "Feberkramper och feber hos barn",
      "Astma och allergi hos barn",
      "ADHD och neuropsykiatriska funktionsnedsättningar",
      "Tillväxt och pubertetsutveckling",
      "Vaccinationer och BVC-uppföljning",
      "Ångest och depression hos unga",
    ],
  },
  {
    label: "Cancersjukdomar",
    slug: "cancer",
    icon: "/bilder/Omrade-cancer.svg",
    intro: "Cancer är ett samlingsnamn för sjukdomar där kroppens celler delar sig okontrollerat. Tidig upptäckt och rätt behandling är avgörande för prognosen.",
    topics: [
      "Bröstcancer – symtom och screening",
      "Prostatacancer och PSA-test",
      "Hudcancer och melanom",
      "Tarmcancer och koloskopi",
      "Lungcancer",
      "Lymfom och blodcancer",
    ],
  },
  {
    label: "Endokrina sjukdomar",
    slug: "endokrina-sjukdomar",
    icon: "/bilder/Omrade-endokrina-sjukdomar.svg",
    intro: "Endokrina sjukdomar påverkar hormonsystemet och de körtlar som producerar hormoner. Diabetes, sköldkörtelsjukdomar och binjureproblem är vanliga exempel.",
    topics: [
      "Typ 1 och typ 2 diabetes",
      "Hypotyreos och hypertyreos",
      "Sköldkörtelknutar",
      "Binjuresjukdomar och Cushings syndrom",
      "Osteoporos och D-vitaminbrist",
      "Polycystiskt ovariesyndrom (PCOS)",
    ],
  },
  {
    label: "Hjärt- och kärlsjukdomar",
    slug: "hjart-karlsjukdomar",
    icon: "/bilder/Omrade-hjart-karlsjukdomar.svg",
    intro: "Hjärt- och kärlsjukdomar är den vanligaste dödsorsaken i Sverige. Förebyggande vård, tidig diagnos och livsstilsförändringar kan rädda liv.",
    topics: [
      "Högt blodtryck (hypertoni)",
      "Hjärtinfarkt och angina",
      "Förmaksflimmer",
      "Hjärtsvikt",
      "Ateroskleros och höga blodfetter",
      "Djup ventrombos och lungemboli",
    ],
  },
  {
    label: "Hud- och könssjukdomar",
    slug: "hud-konssjukdomar",
    icon: "/bilder/Omrade-hud-konssjukdomar.svg",
    intro: "Hudsjukdomar kan vara allt från eksem och akne till infektioner och tumörer. Könssjukdomar är vanliga och kräver ofta snabb diagnos och behandling.",
    topics: [
      "Eksem och psoriasis",
      "Akne – behandling och förebyggande",
      "Sexuellt överförbara infektioner (STI)",
      "Hudinfektioner och svamp",
      "Melanom och basalcellscancer",
      "Urticaria och utslag",
    ],
  },
  {
    label: "Infektionssjukdomar",
    slug: "infektionssjukdomar",
    icon: "/bilder/Omrade-infektionssjukdomarsvg.svg",
    intro: "Infektionssjukdomar orsakas av bakterier, virus, svampar eller parasiter. Många är vanliga och självläkande, men vissa kräver snabb medicinsk behandling.",
    topics: [
      "Luftvägsinfektioner och pneumoni",
      "Urinvägsinfektioner",
      "Harpest och borrelia",
      "Covid-19 och influensa",
      "Magsjuka och norovirus",
      "Septikemi – blodförgiftning",
    ],
  },
  {
    label: "Kirurgi och plastikkirurgi",
    slug: "kirurgi-plastikkirurgi",
    icon: "/bilder/Omrade-kirurgi-plastikkirurgi.svg",
    intro: "Kirurgi används för att behandla ett brett spektrum av tillstånd. Plastikkirurgi innefattar rekonstruktiv kirurgi efter skada eller sjukdom, samt kosmetiska ingrepp.",
    topics: [
      "Blindtarmsinflammation – akut kirurgi",
      "Gallstensoperationer",
      "Bråckoperation",
      "Rekonstruktiv kirurgi efter olycka",
      "Ärrbehanding och hudtransplantat",
      "Laparoskopi och titthålskirurgi",
    ],
  },
  {
    label: "Kvinnosjukdomar och förlossning",
    slug: "kvinnosjukdomar-forlossning",
    icon: "/bilder/Omrade-kvinnosjukdommar-forlossning.svg",
    intro: "Gynekologi och obstetrik innefattar kvinnors reproduktiva hälsa, graviditet och förlossning. Regelbundna kontroller är viktiga för att förebygga och tidigt upptäcka sjukdomar.",
    topics: [
      "Cellprov och HPV-screening",
      "Endometrios",
      "Myom och cyster",
      "Graviditetskomplikationer",
      "Klimakteriet och hormonbehandling",
      "Inkontinens och bäckenbottenproblematik",
    ],
  },
  {
    label: "Levnadsvanor",
    slug: "levnadsvanor",
    icon: "/bilder/Omrade-levnadsvanor.svg",
    intro: "Levnadsvanor som kost, fysisk aktivitet, sömn och stress har stor påverkan på hälsan. Förändringar i livsstil kan förebygga många av de vanligaste folksjukdomarna.",
    topics: [
      "Kost och näring",
      "Fysisk aktivitet och träning",
      "Rökning och tobaksstopp",
      "Alkohol och riskbruk",
      "Sömnproblem och insomni",
      "Stresshantering och återhämtning",
    ],
  },
  {
    label: "Lung- och allergisjukdomar",
    slug: "lung-allergisjukdomar",
    icon: "/bilder/Omrade-lung-allergisjukdomar.svg",
    intro: "Lungsjukdomar påverkar andningen och syresättningen. Allergier kan drabba luftvägar, hud och matsmältning. Rätt diagnos och behandling förbättrar livskvaliteten avsevärt.",
    topics: [
      "Astma – utredning och behandling",
      "KOL (kronisk obstruktiv lungsjukdom)",
      "Pollenallergi och rinit",
      "Livsmedelsallergi och intolerans",
      "Lunginflammation",
      "Sömnapné",
    ],
  },
  {
    label: "Mag- och tarmsjukdomar",
    slug: "mag-tarmsjukdomar",
    icon: "/bilder/Omrade-mag-tarmsjukdomar.svg",
    intro: "Mag- och tarmsjukdomar är mycket vanliga och kan kraftigt påverka livskvaliteten. Allt från tillfälliga besvär till kroniska inflammatoriska tarmsjukdomar behandlas inom detta område.",
    topics: [
      "IBS – irritabel tarm",
      "Crohns sjukdom och ulcerös kolit",
      "Celiaki och glutenintolerans",
      "Magsår och reflux (GERD)",
      "Levercirros och hepatit",
      "Hemorrojder och analfissur",
    ],
  },
  {
    label: "Medicinsk diagnostik",
    slug: "medicinsk-diagnostik",
    icon: "/bilder/Omrade-medicinsk-diagnostik.svg",
    intro: "Medicinsk diagnostik innefattar de undersökningar, tester och metoder som används för att ställa diagnos. Rätt diagnostik är grunden för rätt behandling.",
    topics: [
      "Blodprover och vad de visar",
      "Röntgen, MR och CT",
      "EKG och hjärtundersökning",
      "Spirometri och lungfunktionstest",
      "Biopsi och vävnadsprov",
      "Tryckmätning och provtagning i hemmet",
    ],
  },
  {
    label: "Nervsystemets sjukdomar",
    slug: "nervsystemets-sjukdomar",
    icon: "/bilder/Omrade-nervsystemetssjukdomar.svg",
    intro: "Nervsystemets sjukdomar inkluderar tillstånd som påverkar hjärnan, ryggmärgen och perifera nerver. Symtom kan vara allt från huvudvärk till förlamning.",
    topics: [
      "Migrän och kronisk huvudvärk",
      "Epilepsi",
      "Multipel skleros (MS)",
      "Parkinsons sjukdom",
      "Polyneuropati",
      "TIA och stroke",
    ],
  },
  {
    label: "Njursjukdomar",
    slug: "njursjukdomar",
    icon: "/bilder/Omrade-njursjukdomar.svg",
    intro: "Njurarna reglerar kroppens vätskebalans och filtrerar blodet. Njursjukdomar kan vara akuta eller kroniska och kräver ofta nära uppföljning.",
    topics: [
      "Kronisk njursvikt",
      "Njursten",
      "Glomerulonefrit",
      "Njurcancer",
      "Dialys och njurtransplantation",
      "Urinvägsinfektion som når njurarna",
    ],
  },
  {
    label: "Perioperativ vård, intensivvård och transplantation",
    slug: "perioperativ-vard",
    icon: "/bilder/Omrade-perioperativ-vard-intensivvard-transplantation.svg",
    intro: "Perioperativ vård innefattar allt som sker runt ett kirurgiskt ingrepp – förberedelser, operation och återhämtning. Intensivvård ges till kritiskt sjuka patienter.",
    topics: [
      "Förberedelser inför operation",
      "Anestesi och sövning",
      "Postoperativ smärtlindring",
      "Intensivvård och respiratorbehandling",
      "Organtransplantation",
      "Rehabilitering efter operation",
    ],
  },
  {
    label: "Primärvård",
    slug: "primarvard",
    icon: "/bilder/Omrade-primarvard-.svg",
    intro: "Primärvård är din första kontakt med sjukvården och hanterar de flesta vanliga sjukdomar och besvär. En fast läkarkontakt i primärvården är grunden för god kontinuerlig vård.",
    topics: [
      "Allmänna hälsoundersökningar",
      "Kroniska sjukdomar i primärvård",
      "Remisser till specialistvård",
      "Förebyggande vård och vaccinationer",
      "Sjukskrivning och intyg",
      "Digital primärvård via app",
    ],
  },
  {
    label: "Psykisk hälsa",
    slug: "psykisk-halsa",
    icon: "/bilder/Omrade-psykisk-halsa.svg",
    intro: "Psykisk hälsa är en central del av det totala välmåendet. Depression, ångest och stress är vanliga tillstånd som kan behandlas effektivt med rätt stöd och vård.",
    topics: [
      "Depression och nedstämdhet",
      "Ångestsyndrom och panikattacker",
      "Bipolär sjukdom",
      "PTSD och traumabearbetning",
      "Ätstörningar",
      "Sömnproblem och psykisk ohälsa",
    ],
  },
  {
    label: "Rehabilitering, habilitering och försäkringsmedicin",
    slug: "rehabilitering",
    icon: "/bilder/Omrade-rehabilitering-habilitering-forsakringsmedicin.svg",
    intro: "Rehabilitering syftar till att återfå funktion efter sjukdom eller skada. Habilitering stödjer personer med medfödda eller tidigt förvärvade funktionsnedsättningar.",
    topics: [
      "Fysioterapi och sjukgymnastik",
      "Arbetsterapi",
      "Sjukskrivning och arbetsåtergång",
      "Smärtrehabilitering",
      "Hjälpmedel och anpassningar",
      "Försäkringsmedicinska intyg",
    ],
  },
  {
    label: "Reumatiska sjukdomar",
    slug: "reumatiska-sjukdomar",
    icon: "/bilder/Omrade-reumatiska-sjudkomar.svg",
    intro: "Reumatiska sjukdomar påverkar leder, muskler och bindväv. Många är autoimmuna tillstånd som kräver specialistbehandling och långsiktig uppföljning.",
    topics: [
      "Reumatoid artrit",
      "Artros",
      "Gikt",
      "Systemisk lupus erythematosus (SLE)",
      "Sjögrens syndrom",
      "Fibromyalgi",
    ],
  },
  {
    label: "Rörelseorganens sjukdomar",
    slug: "rorelseorganens-sjukdomar",
    icon: "/bilder/Omrade-rorelseorganens-sjukdomar.svg",
    intro: "Rörelseapparatens sjukdomar innefattar problem med muskler, senor, ligament, leder och skelett. Dessa är bland de vanligaste orsakerna till sjukskrivning.",
    topics: [
      "Ländryggssmärta och diskbråck",
      "Skulder- och rotatorkuffskador",
      "Knäproblem och meniskskador",
      "Karpaltunnelsyndrom",
      "Tennisarmbåge och senfästeinflammation",
      "Hälsporre och plantar fasciit",
    ],
  },
  {
    label: "Sällsynta sjukdomar",
    slug: "sallsynta-sjukdomar",
    icon: "/bilder/Omrade-sallsynta-sjukdomar.svg",
    intro: "Sällsynta sjukdomar drabbar färre än 5 av 10 000 personer. Trots att varje sjukdom är ovanlig är den samlade gruppen stor. Diagnos kan ta lång tid och kräver specialistkunskap.",
    topics: [
      "Cystisk fibros",
      "Huntingtons sjukdom",
      "Marfans syndrom",
      "Porfyri",
      "Primär immunbrist",
      "Wilsons sjukdom",
    ],
  },
  {
    label: "Tandvård",
    slug: "tandvard",
    icon: "/bilder/Omrade-tandvard.svg",
    intro: "God munhälsa påverkar hela kroppen. Tandsjukdomar som karies och parodontit kan leda till allvarligare systemiska tillstånd om de inte behandlas.",
    topics: [
      "Karies och hålreparation",
      "Parodontit – tandlossning",
      "Tandimplantat",
      "Bettproblematik och tandreglering",
      "Munslemhinneproblem",
      "Munhygien och förebyggande tandvård",
    ],
  },
  {
    label: "Urinvägssjukdomar",
    slug: "urinvagssjukdomar",
    icon: "/bilder/Omrade-urinvagssjukdomar.svg",
    intro: "Urinvägssjukdomar drabbar blåsa, urinrör, urinledare och njurar. Urinvägsinfektioner är mycket vanliga, särskilt hos kvinnor.",
    topics: [
      "Urinvägsinfektion (UVI)",
      "Blåssten och njursten",
      "Inkontinens",
      "Överaktiv blåsa",
      "Prostataförstoring",
      "Blåscancer",
    ],
  },
  {
    label: "Äldres hälsa",
    slug: "aldres-halsa",
    icon: "/bilder/Omrade-aldres-halsa.svg",
    intro: "Äldre personer har ofta flera samtidiga sjukdomar och är känsligare för läkemedelsbiverkningar och komplikationer. En helhetssyn på patientens hälsa är avgörande.",
    topics: [
      "Demens och Alzheimers sjukdom",
      "Fallprevention och osteoporos",
      "Läkemedelsgenomgång och polyfarmaci",
      "Hjärtsvikt hos äldre",
      "Trycksår och sårbehandling",
      "Palliativ vård och livets slutskede",
    ],
  },
  {
    label: "Ögonsjukdomar",
    slug: "ogonsjukdomar",
    icon: "/bilder/Omrade-ogon-sjukdomar.svg",
    intro: "Ögonsjukdomar kan påverka synen och livskvaliteten allvarligt. Många tillstånd kan behandlas effektivt om de upptäcks i tid.",
    topics: [
      "Grön starr (glaukom)",
      "Grå starr (katarakt)",
      "Makuladegeneration",
      "Diabetesretinopati",
      "Ögontorrhet och keratokonjunktivit",
      "Närsynthet och glasögonrecept",
    ],
  },
  {
    label: "Öron-, näs- och halssjukdomar",
    slug: "oron-nas-hals",
    icon: "/bilder/Omrade-oron-nas-hals-sjukdomar.svg",
    intro: "ÖNH-sjukdomar inkluderar ett brett spektrum av tillstånd som drabbar öron, näsa, sinus och hals. Hörselnedsättning och tonsillproblem är vanliga exempel.",
    topics: [
      "Hörselnedsättning och tinnitus",
      "Öroninflammation (otit)",
      "Sinuit och nästäppa",
      "Tonsillit och halsfluss",
      "Röstproblem och heshet",
      "Yrsel och Menières sjukdom",
    ],
  },
];

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  const title = cat ? `${cat.label} — Vårdguiden` : "Vårdguiden";
  const description = cat?.intro ?? "Din guide till bättre hälsa med Hemläkare.se.";
  return {
    title,
    description,
    openGraph: {
      title: `${title} | Hemläkare.se`,
      description,
      url: `https://hemlakare.se/vardguiden/${slug}`,
    },
  };
}

export default async function VardguidenSlugPage({ params }: Props) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Hero */}
        <section className="bg-[#fdf5f9] py-14 px-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-8">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center shrink-0"
              style={{ background: "white", boxShadow: "0 4px 20px rgba(231,46,138,0.12)" }}
            >
              <Image src={cat.icon} alt={cat.label} width={64} height={64} className="object-contain" />
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
              <h1 className="text-[2rem] sm:text-[2.4rem] font-black text-gray-900 leading-tight tracking-tight">
                {cat.label}
              </h1>
              <p className="text-[0.95rem] text-gray-600 leading-relaxed max-w-2xl">
                {cat.intro}
              </p>
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="py-14 px-6 bg-white">
          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            <h2 className="text-[1.4rem] font-bold text-gray-900">Vanliga ämnen inom {cat.label.toLowerCase()}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {cat.topics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-[#fdf5f9] hover:border-[#E72E8A]/30 transition-colors"
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-[0.9rem] text-gray-800 font-medium">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-6 bg-[#fdf5f9]">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-8 bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="flex flex-col gap-2 text-center sm:text-left flex-1">
              <h3 className="text-[1.1rem] font-bold text-gray-900">Har du frågor om {cat.label.toLowerCase()}?</h3>
              <p className="text-[0.9rem] text-gray-500">Starta ett ärende i appen och prata direkt med din läkare – oftast svar samma dag.</p>
            </div>
            <Link
              href="/appen"
              className="shrink-0 px-7 py-3.5 rounded-full text-[0.9rem] font-bold text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)",
                boxShadow: "0 4px 16px rgba(231,46,138,0.3)",
              }}
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
