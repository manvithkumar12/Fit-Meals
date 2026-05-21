import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
console.log("ANALYZE =", process.env.ANALYZE);
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "xvpw4357-3000.inc1.devtunnels.ms"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drin721riupcf.cloudfront.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
