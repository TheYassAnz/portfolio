import type { NextConfig } from "next";

const strapiUrl = process.env.STRAPI_URL ?? "http://localhost:1337";
const strapiParsed = new URL(strapiUrl);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: strapiParsed.protocol.replace(":", "") as "http" | "https",
        hostname: strapiParsed.hostname,
        port: strapiParsed.port,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
