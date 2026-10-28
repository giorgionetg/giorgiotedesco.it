import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  allowedDevOrigins: ['127.0.0.1'],
  trailingSlash: true,
  images: { unoptimized: true }
};

// Development-only pages use page.dev.tsx and are not discovered during export.
if (process.env.NODE_ENV === 'development') {
  nextConfig.pageExtensions = ['dev.tsx', 'tsx', 'ts', 'jsx', 'js', 'mdx'];
}

export default nextConfig;
