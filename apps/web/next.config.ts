import type { NextConfig } from "next";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  // @sujha/db ships raw TypeScript rather than a build step, so Next compiles
  // it alongside the app. One less build to keep in sync.
  transpilePackages: ["@sujha/db"],

  images: {
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
      : [],
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      // The CRA site used the plural. Preserve the inbound links and whatever
      // Search Console equity the old URL has accrued.
      { source: "/designs", destination: "/design", permanent: true },
    ];
  },
};

export default nextConfig;
