// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/auth",
      permanent: false,
    },
  ],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/, // solo para imports desde JS/TS/JSX/TSX
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
