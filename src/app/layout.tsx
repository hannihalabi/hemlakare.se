import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hemlakare.se"),
  title: {
    default: "Hemläkare.se — Din läkare, på dina villkor",
    template: "%s — Hemläkare.se",
  },
  description: "Snabb digital kontakt med din egen läkare och sköterska. Fysiska möten i hemmet, på arbetet eller på vårdcentralen.",
  openGraph: {
    siteName: "Hemläkare.se",
    locale: "sv_SE",
    type: "website",
    title: "Hemläkare.se — Din läkare, på dina villkor",
    description: "Snabb digital kontakt med din egen läkare och sköterska. Fysiska möten i hemmet, på arbetet eller på vårdcentralen.",
    url: "https://hemlakare.se",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Hemläkare.se" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hemläkare.se — Din läkare, på dina villkor",
    description: "Snabb digital kontakt med din egen läkare och sköterska. Fysiska möten i hemmet, på arbetet eller på vårdcentralen.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
