import type { MetadataRoute } from "next";
import { articles as aktuelltArticles } from "@/data/articles";

const BASE = "https://hemlakare.se";

const faqSlugs = [
  "vad-kostar-det",
  "lista-mig",
  "var-finns-ni",
  "hur-fungerar-det",
  "bokning",
  "prata-i-appen",
];

const vardguidenSlugs = [
  "akut-vard",
  "barn-ungdomshalsa",
  "cancer",
  "endokrina-sjukdomar",
  "hjart-karlsjukdomar",
  "hud-konssjukdomar",
  "infektionssjukdomar",
  "kirurgi-plastikkirurgi",
  "kvinnosjukdomar-forlossning",
  "levnadsvanor",
  "lung-allergisjukdomar",
  "mag-tarmsjukdomar",
  "medicinsk-diagnostik",
  "nervsystemets-sjukdomar",
  "njursjukdomar",
  "perioperativ-vard",
  "primarvard",
  "psykisk-halsa",
  "rehabilitering",
  "reumatiska-sjukdomar",
  "rorelseorganens-sjukdomar",
  "sallsynta-sjukdomar",
  "tandvard",
  "urinvagssjukdomar",
  "aldres-halsa",
  "ogonsjukdomar",
  "oron-nas-hals",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/patientavgifter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/mottagningar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/om`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/recensioner`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/aktuellt`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/vardguiden`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/vardguiden/akut-vard`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/vardguiden/barn-ungdomshalsa`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const aktuelltRoutes: MetadataRoute.Sitemap = aktuelltArticles.map((a) => ({
    url: `${BASE}/aktuellt/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const faqRoutes: MetadataRoute.Sitemap = faqSlugs.map((slug) => ({
    url: `${BASE}/faq/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const vardguidenRoutes: MetadataRoute.Sitemap = vardguidenSlugs.map((slug) => ({
    url: `${BASE}/vardguiden/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...aktuelltRoutes, ...faqRoutes, ...vardguidenRoutes];
}
