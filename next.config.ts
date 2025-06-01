import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Only run ESLint on these directories during `next build`
    dirs: ["pages", "utils", "components", "lib"],
    // Or disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
