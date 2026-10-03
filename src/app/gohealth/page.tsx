import type { Metadata } from "next";
import Image from "next/image";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";
import GoHealth from "@/components/GoHealth";
import GoHealthStory from "@/components/GoHealthStory";
import Header from "@/components/Header";
import { SITE_URL } from "@/lib/site";
import styles from "./gohealth.module.css";

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
        <section aria-label="GoHealth – din hälsoöversikt" className={styles.hero}>
          <div className={styles.visual}>
          <Image
            src="/bilder/Svensk hjärthälsa på surfplatta.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 640px) 120vw, 88vw"
            className={styles.softImage}
          />
          <Image
            src="/bilder/Svensk hjärthälsa på surfplatta.png"
            alt="En person följer sin hälsoöversikt på en surfplatta med Hemläkares GoHealth."
            fill
            preload
            sizes="(max-width: 640px) 120vw, 88vw"
            className={styles.sharpImage}
          />
          </div>
        </section>
        <GoHealth headingLevel="h1" />
        <GoHealthStory />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
