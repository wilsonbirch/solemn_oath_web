import { absoluteUrl } from "@/lib/seo";

/**
 * Schema.org LocalBusiness markup. Helps Google show a richer card
 * for the company name (logo, area served, social links, hours).
 *
 * Pulls from Site Settings so all the values stay in one place.
 *
 * Reference: https://developers.google.com/search/docs/appearance/structured-data/local-business
 */
export function LocalBusinessJsonLd({
  businessName,
  email,
  phone,
  areaServed,
  social,
  hours = "Mo-Fr 08:00-17:00",
}: {
  businessName: string;
  email?: string;
  phone?: string;
  areaServed: string;
  social: { facebook?: string; instagram?: string };
  hours?: string;
}) {
  const sameAs = [social.facebook, social.instagram].filter(
    (url): url is string => typeof url === "string" && url.length > 0,
  );

  const json = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": absoluteUrl("/#business"),
    name: businessName,
    url: absoluteUrl("/"),
    image: absoluteUrl("/opengraph-image"),
    logo: absoluteUrl("/icon"),
    description:
      "Experienced, reliable home renovation contractors specializing in bathrooms, kitchens, basements, decks, and whole-home renovations across the Ottawa region.",
    areaServed: {
      "@type": "City",
      name: areaServed,
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    ...(email ? { email } : {}),
    ...(phone ? { telephone: phone } : {}),
    openingHours: hours,
    sameAs,
    priceRange: "$$$",
  } as const;

  return (
    <script
      type="application/ld+json"
      // Server-rendered string; React doesn't escape script body, so this
      // emits valid JSON-LD.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
