import type { Article } from "./types";
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
