export const SITE_URL = "https://hemlakare.se";
export const SITE_NAME = "Hemläkare";
export const SITE_TITLE = "Hemläkare.se — Din läkare, på dina villkor";
export const SITE_DESCRIPTION =
  "Snabb digital kontakt med din egen läkare och sköterska. Fysiska möten i hemmet, på arbetet eller på mottagningen.";
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
