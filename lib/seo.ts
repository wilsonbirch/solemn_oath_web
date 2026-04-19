/**
 * Centralised SEO helpers. Keeps the "is this site allowed to be
 * indexed?" decision in one place — flip the SEO_INDEX env flag to
 * go live (and remember to also remove the temporary noindex from
 * the layout if it's still there).
 */

import { env } from "@/lib/env";

/**
 * Returns true once the owner has explicitly opted in to crawling.
 * Defaults to false so the demo never gets indexed by accident.
 */
export function isIndexingEnabled(): boolean {
  return process.env.SEO_INDEX === "true";
}

export function siteUrl(): string {
  return env.SITE_URL.replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  const base = siteUrl();
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}
