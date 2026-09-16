import type { Article } from "./types";
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

const publishedArticles: Article[] = [
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
