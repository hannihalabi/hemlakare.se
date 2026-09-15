import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://xn--hemlkare-3za.se"),
  applicationName: "Hemläkare",
  icons: {
    icon: "/icon.svg",
  },
  title: {
    default: "Hemläkare.se — Din läkare, på dina villkor",
    template: "%s — Hemläkare.se",
  },
  description: "Snabb digital kontakt med din egen läkare och sköterska. Fysiska möten i hemmet, på arbetet eller på mottagningen.",
  openGraph: {
    siteName: "Hemläkare",
    locale: "sv_SE",
    type: "website",
    title: "Hemläkare.se — Din läkare, på dina villkor",
    description: "Snabb digital kontakt med din egen läkare och sköterska. Fysiska möten i hemmet, på arbetet eller på mottagningen.",
    url: "https://xn--hemlkare-3za.se",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Hemläkare.se" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hemläkare.se — Din läkare, på dina villkor",
    description: "Snabb digital kontakt med din egen läkare och sköterska. Fysiska möten i hemmet, på arbetet eller på mottagningen.",
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
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
