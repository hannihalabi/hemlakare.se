import type { Metadata } from "next";
import { ServicePageBody } from "@/components/ServicePageBody";
import { healthcareServicesBySlug } from "@/data/services";
import { SITE_URL } from "@/lib/site";

const service = healthcareServicesBySlug.get("fysiskt-lakarbesok")!;
const canonicalPath = "lakare/hembesok";
export const metadata: Metadata = {
  title: service.seoTitle,
  description: service.metaDescription,
  alternates: { canonical: `/${canonicalPath}` },
  openGraph: {
    title: service.seoTitle,
    description: service.metaDescription,
    url: `${SITE_URL}/${canonicalPath}`,
    locale: "sv_SE",
  },
};

export default function LakareHembesokPage() {
  return <ServicePageBody service={service} canonicalPath={canonicalPath} />;
}
