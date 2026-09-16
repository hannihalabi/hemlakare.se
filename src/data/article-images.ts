const articleImageFallbacks: Record<string, { src: string; alt: string }> = {
  "baltros-symtom-behandling-vaccin": {
    src: "/bilder/artiklar/baltros-symtom-behandling-vaccin.png",
    alt: "En äldre kvinna som visar ett ensidigt hudutslag vid midjan som kan likna bältros.",
  },
};

function isUsableArticleImage(image: string | null | undefined) {
  return Boolean(image?.trim()) && !image?.startsWith("/bilder/aktuellt-");
}

export function resolveArticleImage(slug: string, image: string | null | undefined) {
  if (isUsableArticleImage(image)) {
    return { src: image as string, alt: null };
  }

  return articleImageFallbacks[slug] ?? null;
}
