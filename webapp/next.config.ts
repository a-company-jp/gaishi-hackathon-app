import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true, // Image optimization is disabled in static builds
  },
  trailingSlash: true,
  distDir: "build",
};

export default nextConfig;
