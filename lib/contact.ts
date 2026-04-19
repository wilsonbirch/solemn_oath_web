/**
 * Contact-page orchestrator. Sanity content layered over defaults
 * (same shape regardless of CMS state).
 */

import { contactPageQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import { sanityImageProps, type SanityImage } from "@/lib/sanity-image";
import { CONTACT_DEFAULTS, type FaqEntry } from "@/lib/contact-defaults";

type RawContactPage = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImage | null;
  formIntro?: unknown;
  hours?: string;
  faq?: FaqEntry[] | null;
} | null;

function portableTextToParagraphs(blocks: unknown): string[] {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .filter((b: { _type?: string }) => b?._type === "block")
    .map((b: { children?: Array<{ text?: string }> }) =>
      (b.children ?? []).map((c) => c.text ?? "").join(""),
    )
    .filter((p) => p.trim().length > 0);
}

export async function getContactPageData() {
  let raw: RawContactPage = null;
  try {
    raw = await sanityFetch<RawContactPage>({
      query: contactPageQuery,
      tags: ["contactPage"],
    });
  } catch (err) {
    console.warn("[contact] Failed to fetch contactPage, using defaults:", err);
  }

  const heroImage = sanityImageProps(raw?.heroImage, { width: 2400 });
  const formIntro = portableTextToParagraphs(raw?.formIntro);

  const faq: FaqEntry[] =
    raw?.faq?.length
      ? raw.faq.filter((f): f is FaqEntry => Boolean(f?.question && f?.answer))
      : [...CONTACT_DEFAULTS.faq];

  return {
    hero: {
      title: raw?.heroTitle ?? CONTACT_DEFAULTS.hero.title,
      subtitle: raw?.heroSubtitle ?? CONTACT_DEFAULTS.hero.subtitle,
      image: heroImage
        ? { src: heroImage.src, alt: heroImage.alt }
        : CONTACT_DEFAULTS.hero.image,
    },
    formIntro: formIntro.length ? formIntro : [...CONTACT_DEFAULTS.formIntro],
    hours: raw?.hours ?? CONTACT_DEFAULTS.hours,
    faq,
  };
}
