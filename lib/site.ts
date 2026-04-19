import { siteSettingsQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import { withSiteDefaults, type SiteSettings } from "@/lib/site-defaults";

/**
 * Fetch the singleton Site Settings doc, layering defaults on top so that
 * consumers always see a complete object even on an empty dataset.
 *
 * Wrapped in try/catch so a missing Sanity project (or local dev with
 * stale credentials) doesn't crash the layout — we just fall back to
 * defaults and log a warning server-side.
 */
export async function getSiteSettings() {
  try {
    const data = await sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    });
    return withSiteDefaults(data);
  } catch (error) {
    console.warn("[site] Failed to fetch siteSettings, using defaults:", error);
    return withSiteDefaults(null);
  }
}
