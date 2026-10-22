import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the whole storefront is build-time content (mock catalog +
  // client-side cart). This makes `next build` emit plain HTML/CSS/JS into `out/`
  // that Netlify (or any static host) serves with no server or functions.
  output: "export",
  images: {
    // Static export can't run next/image's on-the-fly optimizer, so serve the
    // (already-sized) local photos as-is.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
