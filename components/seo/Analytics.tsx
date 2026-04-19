import Script from "next/script";

/**
 * Privacy-friendly analytics via Plausible (no cookies, no PII).
 *
 * Activated only when both env vars are set:
 *   - NEXT_PUBLIC_PLAUSIBLE_DOMAIN — the domain you registered with Plausible
 *   - NEXT_PUBLIC_PLAUSIBLE_SRC    — script URL, defaults to plausible.io
 *                                    (override for self-hosted Plausible)
 *
 * To enable in production:
 *   fly secrets set \
 *     NEXT_PUBLIC_PLAUSIBLE_DOMAIN=solemnoathco.com
 *
 * Skips entirely on dev to avoid polluting stats.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  if (process.env.NODE_ENV !== "production") return null;

  const src =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js";

  return (
    <Script
      defer
      data-domain={domain}
      src={src}
      strategy="afterInteractive"
    />
  );
}
