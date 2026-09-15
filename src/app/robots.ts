import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://xn--hemlkare-3za.se/sitemap.xml",
    host: "https://xn--hemlkare-3za.se",
  };
}
