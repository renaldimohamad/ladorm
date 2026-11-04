import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ladorm.id",
      },
      {
        protocol: "https",
        hostname: "www.ladorm.id",
      },
    ],
  },
};

export default nextConfig;
