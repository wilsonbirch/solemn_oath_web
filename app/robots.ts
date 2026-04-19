import type { MetadataRoute } from "next";

import { absoluteUrl, isIndexingEnabled } from "@/lib/seo";

/**
 * Robots policy. Until SEO_INDEX=true is set, deny everything (full
 * stop, no sitemap reference). On go-live: flip the env flag and
 * crawlers see an open policy + sitemap pointer.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexingEnabled()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
