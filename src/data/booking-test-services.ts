import type { HealthcareService } from "@/data/services";

/**
 * Tjänster som ENDAST finns för att testa bokningsflödet (schema + Stripe +
 * Google Calendar) end-to-end med en låg, ofarlig summa. Visas aldrig
 * publikt – ingår inte i healthcareServices och dyker därför inte upp på
 * startsidan, i sitemap.ts, footern eller /[slug]-sidorna. Nås bara direkt
 * via /boka/testtjanst.
 *
 * Ta bort den här filen (och dess import i services.ts) när ni är klara
 * med testningen.
 */
export const bookingTestServices: HealthcareService[] = [
  {
    slug: "testtjanst",
    name: "Testtjänst",
    eyebrow: "Intern testning",
    seoTitle: "Testtjänst",
    metaDescription: "Intern testtjänst för att verifiera bokningsflödet.",
    title: "Testtjänst",
    lead: "Den här tjänsten finns bara för att testa bokning, betalning och kalenderkoppling.",
    price: "10 kr",
    priceNote: "Testbetalning – ingen riktig vård ingår.",
    bookingHref: "/boka/testtjanst",
    cardDescription: "Intern testtjänst för att verifiera bokningsflödet.",
    highlights: [],
    suitableTitle: "",
    suitableIntro: "",
    suitableFor: [],
    steps: [],
    scopeTitle: "",
    scopeIntro: "",
    scopeItems: [],
    importantTitle: "",
    important: [],
    faq: [],
    relatedSlugs: [],
    sources: [],
  },
];
