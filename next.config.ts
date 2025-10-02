import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/auth",
      permanent: false,
    },
  ],
  /* config options here */
};

export default nextConfig;
