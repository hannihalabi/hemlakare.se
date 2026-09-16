import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frågor & svar",
  description: "Svar på vanliga frågor om Hemläkare.se — kostnader, listning, bokning och hur vården fungerar.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frågor & svar — Hemläkare.se",
    description: "Svar på vanliga frågor om Hemläkare.se — kostnader, listning, bokning och hur vården fungerar.",
    url: `${SITE_URL}/faq`,
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
