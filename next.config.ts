import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'firecrawl.dev',
      },
      {
        protocol: 'https',
        hostname: '**.firecrawl.dev',
      },
    ],
  },
};

export default nextConfig;
