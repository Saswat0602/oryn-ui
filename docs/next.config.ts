import type { NextConfig } from "next";
import createMDX from '@next/mdx'
import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  outputFileTracingRoot: path.resolve(__dirname, ".."),
  transpilePackages: ["oryn-ui"],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig)

