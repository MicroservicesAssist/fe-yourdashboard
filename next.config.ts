import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirección inicial
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth",
        permanent: false,
      },
    ];
  },

  // Configuración de webpack para usar SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/, 
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
