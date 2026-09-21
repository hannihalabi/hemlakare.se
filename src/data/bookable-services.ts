import { healthcareServicesBySlug } from "@/data/services";
import { bookingTestServices } from "@/data/booking-test-services";

/**
 * Alla tjänster som går att slå upp för bokning (publika tjänster +
 * eventuella interna testtjänster, se booking-test-services.ts). Används
 * bara av /boka/[slug] och bokningens API-rutter – aldrig av publika ytor
 * som startsidan, footern eller sitemap.ts, som fortsätter använda
 * healthcareServices/healthcareServicesBySlug direkt.
 */
export const bookableServicesBySlug = new Map(healthcareServicesBySlug);

for (const service of bookingTestServices) {
  bookableServicesBySlug.set(service.slug, service);
}
