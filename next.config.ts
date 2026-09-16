import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.hemlakare.se" }],
        destination: "https://hemlakare.se/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "xn--hemlkare-3za.se" }],
        destination: "https://hemlakare.se/:path*",
        permanent: true,
      },
      { source: "/aktuellt/migr%C3%A4n-behandling", destination: "/aktuellt/migran-behandling", permanent: true },
      { source: "/aktuellt/sk%C3%B6ldk%C3%B6rteln-symtom", destination: "/aktuellt/skoldkorteln-symtom", permanent: true },
      { source: "/aktuellt/s%C3%A5r-som-inte-laker", destination: "/aktuellt/sar-som-inte-laker", permanent: true },
      { source: "/aktuellt/njurb%C3%A4ckeninflammation", destination: "/aktuellt/njurbackeninflammation", permanent: true },
      { source: "/aktuellt/s%C3%B6mnapne", destination: "/aktuellt/somnapne", permanent: true },
      { source: "/aktuellt/kortisonet-bip%C3%A5verkan", destination: "/aktuellt/kortisonet-bipaverkan", permanent: true },
    ];
  },
};

export default nextConfig;
