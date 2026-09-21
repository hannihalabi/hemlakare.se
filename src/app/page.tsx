import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VarforHemlakare from "@/components/VarforHemlakare";
import Prickmottagning from "@/components/Prickmottagning";
import Lunchforelasning from "@/components/Lunchforelasning";
import Omdomen from "@/components/Omdomen";
import Aktuellt from "@/components/Aktuellt";
import HurFungerar from "@/components/HurFungerar";
import HealthPackages from "@/components/HealthPackages";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Hemläkare.se",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description: SITE_DESCRIPTION,
  medicalSpecialty: "General Practice",
  availableService: [
    { "@type": "MedicalTherapy", name: "Digital konsultation" },
    { "@type": "MedicalTherapy", name: "Hembesök" },
    { "@type": "MedicalTherapy", name: "Vaccination hemma" },
    { "@type": "MedicalTherapy", name: "Blodprovstagning och hälsokontroller" },
    { "@type": "MedicalTherapy", name: "Prickmottagning" },
    { "@type": "MedicalTherapy", name: "Lunchföreläsningar om ungas psykiska hälsa" },
  ],
  areaServed: { "@type": "City", name: "Stockholm" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: "Swedish",
  },
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: "Hemläkare.se",
  url: `${SITE_URL}/`,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <Header />
      <main>
        <Hero />
        <VarforHemlakare />
        <Omdomen />
        <HurFungerar />
        <HealthPackages />
        <Prickmottagning />
        <Lunchforelasning />
        <Aktuellt />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
