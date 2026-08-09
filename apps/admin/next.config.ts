import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@sujha/db"],
  // The CMS must never be indexed — it is not linked from the public site and
  // should not appear in search results if the URL ever leaks.
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
