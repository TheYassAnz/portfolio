import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project covers: docs/cover.png in each GitHub repo.
    remotePatterns: [new URL("https://raw.githubusercontent.com/TheYassAnz/**")],
  },
};

export default nextConfig;
