import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingFlow from "@/components/booking/BookingFlow";
import { healthcareServices, healthcareServicesBySlug } from "@/data/services";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return healthcareServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = healthcareServicesBySlug.get(slug);
  if (!service) return {};
  return {
    title: `Boka ${service.name}`,
    robots: { index: false, follow: true },
  };
}

export default async function BookingPage({ params }: PageProps) {
  const { slug } = await params;
  const service = healthcareServicesBySlug.get(slug);
  if (!service) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#D81B7D]">{service.eyebrow}</p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">Boka {service.name.toLowerCase()}</h1>
        <p className="mt-2 text-gray-600">{service.cardDescription}</p>

        <div className="mt-8">
          <BookingFlow service={service} />
        </div>
      </main>
      <Footer />
    </>
  );
}
