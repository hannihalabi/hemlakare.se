import type { Article } from "./types";
import lunginflammationEfterInfluensa2026 from "./lunginflammation-efter-influensa-varningssignaler-2026";
import halsflussAntibiotika2026 from "./halsfluss-antibiotika-eller-virus-nar-soka-vard-2026";
import kikhostaGravid2026 from "./kikhosta-gravid-vaccin-skydda-spadbarn-2026";
import hostaEfterForkylning2026 from "./hosta-efter-forkylning-hur-lange-2026";
import covidAldre2026 from "./covid-19-aldre-nar-soka-vard-november-2026";
import rsVaccinAldre2026 from "./rs-virus-vaccin-aldre-75-ar-riskgrupp-2026";
import antiviralInfluensa2026 from "./influensa-antiviral-behandling-riskgrupp-2026";
import influensaSmitta2026 from "./influensa-hur-lange-smittar-stanna-hemma-2026";
import fluVsCovid2026 from "./influensa-eller-covid-symtom-november-2026";
import influensaStart2026 from "./influensaepidemin-startat-november-2026";
import handeksemVinter2026 from "./handeksem-vintern-sprickor-hander-2026";
import nasblodVinter2026 from "./nasblod-torr-luft-vintern-stoppa-blodning-2026";
import torraOgonVinter2026 from "./torra-ogon-inomhusluft-vintern-2026";
import vinterkraksjukaHemma2026 from "./vinterkraksjuka-smitta-hemma-stadning-2026";
import dVitaminVinter2026 from "./d-vitamin-vintern-vem-behover-tillskott-2026";
import rsAntikroppar2026 from "./rs-virus-antikroppar-nyfodda-2026";
import influensaGravid2026 from "./influensavaccin-gravid-vecka-12-hosten-2026";
import koldskador2026 from "./koldskador-fingrar-tar-nar-soka-vard-vintern-2026";
import feberBarn2026 from "./feber-hos-barn-nar-soka-vard-vintern-2026";
import halkrisk2026 from "./fallrisk-aldre-halka-vintern-2026";
import torrHud2026 from "./torr-hud-vintern-nar-soka-vard-2026";
import skyddaAldre2026 from "./skydda-aldre-luftvagsvirus-vintern-2026";
import influensavaccin2026 from "./influensavaccin-2026-vem-far-vaccin-forst";
import vinterkraksjuka2026 from "./vinterkraksjuka-vatskebrist-nar-soka-vard-2026";
import allergi from "./allergi-symtom-behandling";
import baltros from "./baltros-symtom-behandling-vaccin";
import bihaleinflammation from "./bihaleinflammation-symtom-behandling";
import hostblasor from "./hostblasor-barn-symtom-smitta";
import hudcancer from "./hudcancer-kolla-leverflackar";
import tarmhalsa from "./kost-for-bra-tarmsundhet";
import krupp from "./krupp-barn-symtom";
import nastappa from "./nastappa-snuva-orsaker-behandling";
import rsVirus from "./rs-virus-barn-symtom";
import solskydd from "./solvax-och-solskydd";
import somnloshet from "./somnloshet-kronisk";

import searchGuide0 from "./1177-hembesok-lakare-stockholm";
import searchGuide1 from "./blodande-leverflack";
import searchGuide2 from "./vard-hemma-hembesok-hemsjukvard";

const publishedArticles: Article[] = [
  lunginflammationEfterInfluensa2026,
  halsflussAntibiotika2026,
  kikhostaGravid2026,
  hostaEfterForkylning2026,
  covidAldre2026,
  rsVaccinAldre2026,
  antiviralInfluensa2026,
  influensaSmitta2026,
  fluVsCovid2026,
  influensaStart2026,
  handeksemVinter2026,
  nasblodVinter2026,
  torraOgonVinter2026,
  vinterkraksjukaHemma2026,
  dVitaminVinter2026,
  rsAntikroppar2026,
  influensaGravid2026,
  koldskador2026,
  feberBarn2026,
  halkrisk2026,
  torrHud2026,
  skyddaAldre2026,
  influensavaccin2026,
  vinterkraksjuka2026,
  searchGuide0,
  searchGuide1,
  searchGuide2,

  allergi,
  baltros,
  bihaleinflammation,
  hostblasor,
  hudcancer,
  tarmhalsa,
  krupp,
  nastappa,
  rsVirus,
  solskydd,
  somnloshet,
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

export const articles = publishedArticles.toSorted(
  (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime(),
);

export const articlesBySlug: Record<string, Article> = Object.fromEntries(
  articles.map((article) => [article.slug, article]),
);
