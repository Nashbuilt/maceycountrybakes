import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      {
        source: "/shop/macey-country-treat-box",
        destination: "/shop/chocolate-cake",
        permanent: true,
      },
      {
        source: "/shop/coffee-cake",
        destination: "/shop/chocolate-cake",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
};

export default nextConfig;
