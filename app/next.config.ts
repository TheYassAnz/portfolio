import type { NextConfig } from "next";

const strapiUrl = process.env.STRAPI_URL ?? "http://localhost:1337";
const cloudName = process.env.CLOUDINARY_NAME;
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
      ...(cloudName
        ? [
            {
              protocol: "https" as const,
              hostname: "res.cloudinary.com",
              pathname: `/${cloudName}/**`,
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
