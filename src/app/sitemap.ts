import type { MetadataRoute } from "next";
import { articles as aktuelltArticles } from "@/data/articles";
import { healthcareServices } from "@/data/services";
import { getPublishedContentSitemapEntriesSafe } from "@/lib/content-server";
import { SITE_URL } from "@/lib/site";

const faqSlugs = [
  "vad-kostar-det",
  "lista-mig",
  "var-finns-ni",
  "hur-fungerar-det",
  "bokning",
  "prata-med-oss",
];

const vardguidenSlugs = [
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/patientavgifter`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/mottagningar`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/om`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/recensioner`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/aktuellt`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/vardguiden`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/vardguiden/akut-vard`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/vardguiden/barn-ungdomshalsa`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const cmsEntries = await getPublishedContentSitemapEntriesSafe();
  const articleEntries = new Map(
    aktuelltArticles.map((article) => [
      article.slug,
      article.updatedAtIso ?? article.publishedAtIso ?? null,
    ]),
  );
  for (const entry of cmsEntries) {
    articleEntries.set(entry.slug, entry.lastModified);
  }
  const aktuelltRoutes: MetadataRoute.Sitemap = [...articleEntries].map(([slug, lastModified]) => ({
    url: `${SITE_URL}/aktuellt/${slug}`,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const faqRoutes: MetadataRoute.Sitemap = faqSlugs.map((slug) => ({
    url: `${SITE_URL}/faq/${slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const vardguidenRoutes: MetadataRoute.Sitemap = vardguidenSlugs.map((slug) => ({
    url: `${SITE_URL}/vardguiden/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = healthcareServices.map((service) => ({
    url:
      service.slug === "fysiskt-lakarbesok"
        ? `${SITE_URL}/lakare/hembesok`
        : `${SITE_URL}/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...serviceRoutes, ...aktuelltRoutes, ...faqRoutes, ...vardguidenRoutes];
}
