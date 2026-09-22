import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageBody } from "@/components/ServicePageBody";
import { healthcareServicesBySlug } from "@/data/services";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const CANONICAL_PATH = "lakare/hembesok";

export function generateMetadata(): Metadata {
  const service = healthcareServicesBySlug.get("fysiskt-lakarbesok");
  if (!service) return {};

  const url = `${SITE_URL}/${CANONICAL_PATH}`;
  return {
    title: service.seoTitle,
    description: service.metaDescription,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "sv_SE",
      title: `${service.seoTitle} | ${SITE_NAME}`,
      description: service.metaDescription,
      url,
      siteName: "Hemläkare.se",
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.metaDescription,
    },
  };
}

export default function LakareHembesokPage() {
  const service = healthcareServicesBySlug.get("fysiskt-lakarbesok");
  if (!service) notFound();

  return <ServicePageBody service={service} canonicalPath={CANONICAL_PATH} />;
}
