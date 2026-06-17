import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frågor & svar",
  description: "Svar på vanliga frågor om Hemläkare.se — kostnader, listning, bokning och hur vården fungerar.",
  openGraph: {
    title: "Frågor & svar — Hemläkare.se",
    description: "Svar på vanliga frågor om Hemläkare.se — kostnader, listning, bokning och hur vården fungerar.",
    url: "https://hemlakare.se/faq",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
