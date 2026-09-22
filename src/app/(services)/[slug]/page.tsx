import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageBody } from "@/components/ServicePageBody";
import { healthcareServices, healthcareServicesBySlug } from "@/data/services";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  // Genererar statiskt bara de publika tjänsterna. Interna testtjänster
  // (t.ex. /boka/testtjanst) renderas ändå dynamiskt vid anrop eftersom
  // dynamicParams inte är satt till false. "fysiskt-lakarbesok" flyttade
  // till /lakare/hembesok (se next.config.ts-redirect) och exkluderas här.
  return healthcareServices
    .filter(({ slug }) => slug !== "fysiskt-lakarbesok")
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = healthcareServicesBySlug.get(slug);

  if (!service) return {};

  const url = `${SITE_URL}/${service.slug}`;
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

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  // "fysiskt-lakarbesok" har en permanent redirect till /lakare/hembesok
  // (next.config.ts) och renderas inte längre här.
  if (slug === "fysiskt-lakarbesok") notFound();

  const service = healthcareServicesBySlug.get(slug);
  if (!service) notFound();

  return <ServicePageBody service={service} />;
}
