import type { MetadataRoute } from "next";

import { absoluteUrl, isIndexingEnabled } from "@/lib/seo";
import { getAllServiceSlugs } from "@/lib/services";

/**
 * Native Next.js sitemap. Listed routes are static; service detail
 * pages are pulled from the same source (Sanity + defaults) that
 * generateStaticParams uses, so the sitemap stays in sync.
 *
 * Returns an empty list while indexing is disabled — keeps Google off
 * the demo even if someone discovers /sitemap.xml.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isIndexingEnabled()) return [];

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, priority: 1.0, changeFrequency: "weekly" },
    { url: absoluteUrl("/about"), lastModified: now, priority: 0.7, changeFrequency: "monthly" },
    { url: absoluteUrl("/services"), lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: absoluteUrl("/projects"), lastModified: now, priority: 0.9, changeFrequency: "weekly" },
    { url: absoluteUrl("/testimonials"), lastModified: now, priority: 0.6, changeFrequency: "monthly" },
    { url: absoluteUrl("/contact"), lastModified: now, priority: 0.8, changeFrequency: "yearly" },
  ];

  const slugs = await getAllServiceSlugs();
  const serviceRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: absoluteUrl(`/services/${slug}`),
    lastModified: now,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...serviceRoutes];
}
