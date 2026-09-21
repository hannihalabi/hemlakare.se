import { healthPackages } from "@/data/healthPackages";
import { vaccinePriceGroups } from "@/data/services";

export type BookingVariant = {
  slug: string;
  label: string;
  description?: string;
  /** Pris i öre. Saknas priset (t.ex. "Från X kr") krävs ingen förskottsbetalning – se requiresPayment. */
  priceOre: number | null;
  priceLabel: string;
  /** false för tjänster där det verkliga priset avgörs vid besöket (t.ex. vaccin med "från"-pris). */
  requiresPayment: boolean;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseFixedPriceToOre(price: string): number | null {
  const match = price.replace(/\s/g, "").match(/^(\d[\d]*)(?:,(\d{2}))?kr$/i);
  if (!match) return null;
  const kronor = Number(match[1]);
  const ore = match[2] ? Number(match[2]) : 0;
  return kronor * 100 + ore;
}

/** Blodprovspaket – alla har fasta priser, förskottsbetalning krävs. */
export const bloodTestVariants: BookingVariant[] = healthPackages.map((pkg) => ({
  slug: slugify(pkg.name),
  label: pkg.name,
  description: `${pkg.level} · ${pkg.markers} markörer`,
  priceOre: parseFixedPriceToOre(pkg.price),
  priceLabel: pkg.price,
  requiresPayment: true,
}));

/** Vaccin – alla priser är "från X kr" (beror på antal doser/hembesök), ingen förskottsbetalning. */
export const vaccinationVariants: BookingVariant[] = vaccinePriceGroups.flatMap((group) =>
  group.items.map((item) => ({
    slug: slugify(item.name),
    label: item.name,
    description: group.category,
    priceOre: null,
    priceLabel: item.price,
    requiresPayment: false,
  })),
);

/** Bokningsbara varianter per tjänst-slug. Tjänster utan post här bokas med ett fast pris (se services.ts). */
export const bookingVariantsByService: Record<string, BookingVariant[]> = {
  blodprovstagning: bloodTestVariants,
  "vaccination-hemma": vaccinationVariants,
};
