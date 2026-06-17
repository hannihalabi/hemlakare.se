import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VarforHemlakare from "@/components/VarforHemlakare";
import Prickmottagning from "@/components/Prickmottagning";
import Lunchforelasning from "@/components/Lunchforelasning";
import Omdomen from "@/components/Omdomen";
import Aktuellt from "@/components/Aktuellt";
import HurFungerar from "@/components/HurFungerar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Hemläkare.se",
  url: "https://hemlakare.se",
  logo: "https://hemlakare.se/og-image.jpg",
  description:
    "Snabb digital kontakt med din egen läkare och sköterska. Fysiska möten i hemmet, på arbetet eller på mottagningen.",
  medicalSpecialty: "General Practice",
  availableService: [
    { "@type": "MedicalTherapy", name: "Digital konsultation" },
    { "@type": "MedicalTherapy", name: "Hembesök" },
    { "@type": "MedicalTherapy", name: "Prickmottagning" },
    { "@type": "MedicalTherapy", name: "Lunchföreläsningar om ungas psykiska hälsa" },
  ],
  areaServed: { "@type": "Country", name: "Sverige" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: "Swedish",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main>
        <Hero />
        <VarforHemlakare />
        <HurFungerar />
        <Prickmottagning />
        <Lunchforelasning />
        <Omdomen />
        <Aktuellt />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
