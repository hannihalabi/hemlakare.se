import type { Article } from "./types";
import article001 from "./krupp-barn-symtom";
import article002 from "./rs-virus-barn-symtom";
import article003 from "./hostblasor-barn-symtom-smitta";
import article004 from "./vanligaste-orsakerna-januari-2026";
import article005 from "./anhorigveckan-solna";
import article006 from "./semester-och-recept";
import article007 from "./hosta-som-inte-gar-over";
import article008 from "./hoga-blodtrycket";
import article009 from "./diabetes-typ-2-tidiga-tecken";
import article010 from "./stress-och-utmattning";
import article011 from "./magsmarta-orsaker";
import article012 from "./sova-battre";
import article013 from "./influensa-eller-forkylning";
import article014 from "./antibiotika-nar-behovs-det";
import article015 from "./ryggont-hemma";
import article016 from "./allergi-symtom-behandling";
import article017 from "./depression-tecken-hjalp";
import article018 from "./viktminskning-tips";
import article019 from "./urinvagsinfektion-kvinna";
import article020 from "./barnvaccination-schema";
import article021 from "./kolesterol-vad-ar-farligt";
import article022 from "./astma-hos-barn";
import article023 from "./rynkor-och-hudaldrande";
import article024 from "./migran-behandling";
import article025 from "./solvax-och-solskydd";
import article026 from "./skovlig-ledvark";
import article027 from "./psykisk-ohalsa-unga";
import article028 from "./feber-nar-sok-vard";
import article029 from "./nar-ga-till-akuten";
import article030 from "./graviditet-tidiga-tecken";
import article031 from "./kost-for-bra-tarmsundhet";
import article032 from "./kolesterolsankande-kost";
import article033 from "./skoldkorteln-symtom";
import article034 from "./alkohol-och-halsa";
import article035 from "./magsar-och-magsura";
import article036 from "./hudcancer-kolla-leverflackar";
import article037 from "./motion-for-hjarnhalsa";
import article038 from "./blodsocker-stabilt";
import article039 from "./tandhalsa-och-hjartat";
import article040 from "./angest-hantera";
import article041 from "./ekzem-psoriasis-skillnad";
import article042 from "./nyttigt-fett-daligt-fett";
import article043 from "./inkontinens-behandling";
import article044 from "./hjartinfarkt-tecken-kvinnor";
import article045 from "./snus-och-halsa";
import article046 from "./somnloshet-kronisk";
import article047 from "./prostataproblem";
import article048 from "./d-vitamin-brist";
import article049 from "./halsont-behandling";
import article050 from "./motion-vid-depression";
import article051 from "./forlossningsdepression";
import article052 from "./njursten-symtom";
import article053 from "./vaccinera-sig-vuxen";
import article054 from "./omega3-halsa";
import article055 from "./arbetstress-utmattning";
import article056 from "./osteoporos-forebygga";
import article057 from "./blodtrycket-hemma";
import article058 from "./graviditetstecken-vecka-for-vecka";
import article059 from "./barnets-fejber";
import article060 from "./pms-och-pmds";
import article061 from "./karpal-kanalens-syndrom";
import article062 from "./alzheimers-tidiga-tecken";
import article063 from "./sar-som-inte-laker";
import article064 from "./irritabel-tarm";
import article065 from "./polycystiskt-ovariesyndrom";
import article066 from "./ljusterapi-vinterdepression";
import article067 from "./barn-och-skarmtid";
import article068 from "./magnesium-brist-symtom";
import article069 from "./celiak-glutenintolerans";
import article070 from "./hudutslag-orsaker";
import article071 from "./hjartklappning-orsaker";
import article072 from "./ledigt-fran-jobb-sjukdom";
import article073 from "./svamp-i-underlivet";
import article074 from "./yrsel-bakomliggande-orsaker";
import article075 from "./kosttillskott-fungerar";
import article076 from "./mjallborrande-huvudvark";
import article077 from "./fibromyalgi-orsaker";
import article078 from "./blodprovsresultat-forstar";
import article079 from "./akne-vuxna";
import article080 from "./stroke-symtom-snabbt";
import article081 from "./horselskada-tinnitus";
import article082 from "./kronisk-smarta-hantera";
import article083 from "./njurarna-funktion";
import article084 from "./vegankost-halsa";
import article085 from "./aterhamtning-traning";
import article086 from "./gallsten-symtom";
import article087 from "./cancer-tidiga-tecken";
import article088 from "./kost-cancer-forebygga";
import article089 from "./viktnedgang-orsaker";
import article090 from "./ryggskolios";
import article091 from "./hiv-fakta-behandling";
import article092 from "./tarminflammation-crohn-uc";
import article093 from "./klamydia-sti-fakta";
import article094 from "./hormonersattning-klimakteriet";
import article095 from "./panikattack-hantera";
import article096 from "./trombos-djup-ventrombos";
import article097 from "./makuladegeneration-ogon";
import article098 from "./sjalvvard-vid-forkylning";
import article099 from "./adhd-vuxna";
import article100 from "./bipolart-syndrom";
import article101 from "./immunforsvaret-starka";
import article102 from "./hypertyreos-symtom";
import article103 from "./borrelia-fasting";
import article104 from "./tarmcancer-screening";
import article105 from "./prostata-godartad";
import article106 from "./kost-vid-hogblodtryck";
import article107 from "./njurbackeninflammation";
import article108 from "./hypoglykemi-lavt-blodsocker";
import article109 from "./somnapne";
import article110 from "./mensvark-behandling";
import article111 from "./rona-covid-seneffekter";
import article112 from "./lungcancer-tecken";
import article113 from "./kost-hjarna";
import article114 from "./resesjuka-forebygga";
import article115 from "./leverbettan";
import article116 from "./epilepsi-fakta";
import article117 from "./anemi-trotthet-jarnbrist";
import article118 from "./aptitlosa-aldring";
import article119 from "./diabetes-fotter";
import article120 from "./ms-multipel-skleros";
import article121 from "./vardaglig-rorelse";
import article122 from "./psoriasis-behandling";
import article123 from "./inkontinens-man";
import article124 from "./kronisk-bronkit";
import article125 from "./hjarnkonkussion";
import article126 from "./sarkopenin-muskelmassa-aldring";
import article127 from "./fodselmarkoppling";
import article128 from "./kostfiber-tarm";
import article129 from "./alkohol-lever-konsekvenser";
import article130 from "./barn-mage-appendicit";
import article131 from "./vitamin-b12-brist";
import article132 from "./atopisk-dermatit-vuxen";
import article133 from "./mononukleos-kysssjukan";
import article134 from "./overaktiv-blaasa";
import article135 from "./kortisonet-bipaverkan";
import article136 from "./overvikt-bmi";
import article137 from "./premenopaus-perimenopaus";
import article138 from "./fosterskador-alkohol";
import article139 from "./hjartsvikt-tecken";
import article140 from "./skadliga-kemikalier-mat";
import article141 from "./osteoartrit-artros";
import article142 from "./kost-inflammation";
import article143 from "./glaukom-ogontryck";
import article144 from "./folsyra-neural-ror";
import article145 from "./neuropati-domningar-ben";
import article146 from "./depression-kost";

const allArticles: Article[] = [
  article001,
  article002,
  article003,
  article004,
  article005,
  article006,
  article007,
  article008,
  article009,
  article010,
  article011,
  article012,
  article013,
  article014,
  article015,
  article016,
  article017,
  article018,
  article019,
  article020,
  article021,
  article022,
  article023,
  article024,
  article025,
  article026,
  article027,
  article028,
  article029,
  article030,
  article031,
  article032,
  article033,
  article034,
  article035,
  article036,
  article037,
  article038,
  article039,
  article040,
  article041,
  article042,
  article043,
  article044,
  article045,
  article046,
  article047,
  article048,
  article049,
  article050,
  article051,
  article052,
  article053,
  article054,
  article055,
  article056,
  article057,
  article058,
  article059,
  article060,
  article061,
  article062,
  article063,
  article064,
  article065,
  article066,
  article067,
  article068,
  article069,
  article070,
  article071,
  article072,
  article073,
  article074,
  article075,
  article076,
  article077,
  article078,
  article079,
  article080,
  article081,
  article082,
  article083,
  article084,
  article085,
  article086,
  article087,
  article088,
  article089,
  article090,
  article091,
  article092,
  article093,
  article094,
  article095,
  article096,
  article097,
  article098,
  article099,
  article100,
  article101,
  article102,
  article103,
  article104,
  article105,
  article106,
  article107,
  article108,
  article109,
  article110,
  article111,
  article112,
  article113,
  article114,
  article115,
  article116,
  article117,
  article118,
  article119,
  article120,
  article121,
  article122,
  article123,
  article124,
  article125,
  article126,
  article127,
  article128,
  article129,
  article130,
  article131,
  article132,
  article133,
  article134,
  article135,
  article136,
  article137,
  article138,
  article139,
  article140,
  article141,
  article142,
  article143,
  article144,
  article145,
  article146,
];

const monthMap: Record<string, number> = {
  januari: 0, februari: 1, mars: 2, april: 3, maj: 4, juni: 5,
  juli: 6, augusti: 7, september: 8, oktober: 9, november: 10, december: 11,
};

function parseDate(date: string): Date {
  const parts = date.replace(",", "").split(" ");
  const [month, day, year] = monthMap[parts[0]] !== undefined
    ? [parts[0], parts[1], parts[2]]
    : [parts[1], parts[0], parts[2]];
  return new Date(Number(year), monthMap[month], Number(day));
}

allArticles.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

// Keep only the quality-reviewed publishing window. Older legacy articles remain
// in this source file for audit/history but are not publicly routable or indexed.
const publicationCutoff = new Date(2026, 3, 8);
export const articles = allArticles.filter((article) => parseDate(article.date) > publicationCutoff);

export const articlesBySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));
