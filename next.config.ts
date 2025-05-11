import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [{
      source: "/",
      destination: "/conversations",
      permanent: true,
    },
    ];
  },
};

export default nextConfig;
