export const SITE_URL = "https://hemlakare.se";
export const SITE_NAME = "Hemläkare";
export const SITE_TITLE = "Hemläkare.se – Läkarbesök från 595 kr, svar samma dag";
export const SITE_DESCRIPTION =
  "Privat läkare i Stockholm – digitalt från 595 kr, hembesök från 995 kr. Svenska läkare, svar ofta inom timmar, snabb receptförnyelse och remiss.";
export const SOCIAL_IMAGE = "/landningspage/hero-1.png";

const LEGACY_SITE_ORIGINS = [
  "https://xn--hemlkare-3za.se",
  "https://www.hemlakare.se",
];

export function normalizeCanonicalUrl(url: string) {
  const legacyOrigin = LEGACY_SITE_ORIGINS.find(
    (origin) => url === origin || url.startsWith(`${origin}/`),
  );

  return legacyOrigin ? `${SITE_URL}${url.slice(legacyOrigin.length)}` : url;
}
