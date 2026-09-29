import type { Metadata } from "next";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";
import GoHealth from "@/components/GoHealth";
import GoHealthStory from "@/components/GoHealthStory";
import Header from "@/components/Header";
import { SITE_URL } from "@/lib/site";

const description =
  "GoHealth följer dina hälsovärden över tid och hjälper vårdteamet att uppmärksamma avvikelser tidigt, innan de alltid hunnit ge tydliga symtom.";

export const metadata: Metadata = {
  title: "GoHealth – din hälsa, alltid uppkopplad",
  description,
  alternates: { canonical: "/gohealth" },
  openGraph: {
    title: "GoHealth – din hälsa, alltid uppkopplad | Hemläkare.se",
    description,
    url: `${SITE_URL}/gohealth`,
  },
};

export default function GoHealthPage() {
  return (
    <>
      <Header />
      <main>
        <GoHealth headingLevel="h1" />
        <GoHealthStory />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
