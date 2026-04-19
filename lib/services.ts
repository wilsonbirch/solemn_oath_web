/**
 * Services data orchestrator. Sanity content wins per-slug; anything
 * missing falls back to SERVICES_DEFAULTS so all 9 service detail
 * pages render even on an empty CMS.
 */

import {
  allServiceSlugsQuery,
  serviceBySlugQuery,
  servicesIndexQuery,
} from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import { sanityImageProps, type SanityImage } from "@/lib/sanity-image";
import {
  SERVICES_DEFAULTS,
  SERVICES_INDEX_DEFAULTS,
  type Service,
  type ServiceProcessStep,
} from "@/lib/services-defaults";
import type { TestimonialTeaser } from "@/lib/home-defaults";

type RawService = {
  _id?: string;
  title?: string;
  slug?: string;
  shortDescription?: string;
  icon?: string;
  heroImage?: SanityImage | null;
  body?: unknown;
  process?: ServiceProcessStep[] | null;
  gallery?: SanityImage[] | null;
  relatedTestimonials?: Array<{
    _id: string;
    name?: string;
    projectType?: string;
    rating?: number;
    quote?: string;
    date?: string;
  }> | null;
  seo?: {
    title?: string;
    description?: string;
  };
};

type RawServicesIndex = {
  page: {
    heroTitle?: string;
    heroSubtitle?: string;
    heroImage?: SanityImage | null;
    intro?: unknown;
    seo?: { title?: string; description?: string };
  } | null;
  services: Array<{
    _id: string;
    title?: string;
    slug?: string;
    shortDescription?: string;
    icon?: string;
    heroImage?: SanityImage | null;
  }>;
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

/**
 * For the index page: return Sanity services if any exist, otherwise
 * fall back to the full defaults list. We DON'T merge per-slug here —
 * if you've started populating Sanity, it's the source of truth.
 */
export async function getServicesIndex() {
  let raw: RawServicesIndex = null;
  try {
    raw = await sanityFetch<RawServicesIndex>({
      query: servicesIndexQuery,
      tags: ["servicesIndex", "service"],
    });
  } catch (err) {
    console.warn("[services] Failed to fetch servicesIndex, using defaults:", err);
  }

  const heroImage = sanityImageProps(raw?.page?.heroImage, { width: 2400 });
  const introParagraphs = portableTextToParagraphs(raw?.page?.intro);

  const services: Service[] = raw?.services?.length
    ? raw.services
        .filter((s) => Boolean(s.title && s.slug))
        .map((s) => mergeService(s))
    : [...SERVICES_DEFAULTS];

  return {
    hero: {
      title: raw?.page?.heroTitle ?? SERVICES_INDEX_DEFAULTS.hero.title,
      subtitle: raw?.page?.heroSubtitle ?? SERVICES_INDEX_DEFAULTS.hero.subtitle,
      image: heroImage
        ? { src: heroImage.src, alt: heroImage.alt }
        : SERVICES_INDEX_DEFAULTS.hero.image,
    },
    intro: introParagraphs.length ? introParagraphs : [SERVICES_INDEX_DEFAULTS.intro],
    services,
  };
}

/**
 * Merge a single (possibly partial) Sanity service doc with the
 * matching default by slug. If no default matches, return what Sanity
 * gave us with empty fallbacks where required.
 */
function mergeService(raw: RawService): Service {
  const def = SERVICES_DEFAULTS.find((s) => s.slug === raw.slug);

  const heroImage = sanityImageProps(raw.heroImage, { width: 2000 });
  const bodyParagraphs = portableTextToParagraphs(raw.body);

  return {
    _id: raw._id ?? def?._id ?? `service-${raw.slug}`,
    title: raw.title ?? def?.title ?? "",
    slug: raw.slug ?? def?.slug ?? "",
    shortDescription: raw.shortDescription ?? def?.shortDescription ?? "",
    icon: raw.icon ?? def?.icon ?? "wrench",
    heroImage: heroImage
      ? { src: heroImage.src, alt: heroImage.alt }
      : def?.heroImage ?? { src: "", alt: "" },
    body: bodyParagraphs.length ? bodyParagraphs : def?.body ?? [],
    process: raw.process?.length ? raw.process : def?.process ?? [],
    order: def?.order ?? 99,
  };
}

/**
 * Fetch a service detail page. Returns null only if the slug is unknown
 * to BOTH Sanity and defaults.
 */
export async function getServiceBySlug(slug: string): Promise<{
  service: Service;
  gallery: ReadonlyArray<{ src: string; alt: string }>;
  testimonials: ReadonlyArray<TestimonialTeaser>;
} | null> {
  let raw: RawService | null = null;
  try {
    raw = await sanityFetch<RawService | null>({
      query: serviceBySlugQuery,
      params: { slug },
      tags: ["service"],
    });
  } catch (err) {
    console.warn(`[services] Failed to fetch service "${slug}", trying defaults:`, err);
  }

  // If Sanity returned nothing AND no default exists, the slug is unknown.
  const def = SERVICES_DEFAULTS.find((s) => s.slug === slug);
  if (!raw && !def) return null;

  const service = raw ? mergeService({ ...raw, slug }) : (def as Service);

  const gallery = (raw?.gallery ?? [])
    .map((img) => sanityImageProps(img, { width: 1600 }))
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map((p) => ({ src: p.src, alt: p.alt }));

  const testimonials: TestimonialTeaser[] = (raw?.relatedTestimonials ?? [])
    .filter((t): t is NonNullable<typeof t> & { name: string; quote: string } =>
      Boolean(t?.name && t?.quote),
    )
    .map((t) => ({
      _id: t._id,
      name: t.name,
      projectType: t.projectType,
      rating: t.rating ?? 5,
      quote: t.quote,
      date: t.date,
    }));

  return { service, gallery, testimonials };
}

/**
 * For generateStaticParams. Combines Sanity slugs and defaults so every
 * known service prerenders.
 */
export async function getAllServiceSlugs(): Promise<string[]> {
  let sanitySlugs: string[] = [];
  try {
    sanitySlugs = await sanityFetch<string[]>({
      query: allServiceSlugsQuery,
      tags: ["service"],
    });
  } catch (err) {
    console.warn("[services] Failed to fetch slugs from Sanity:", err);
  }

  const defaultSlugs = SERVICES_DEFAULTS.map((s) => s.slug);
  return Array.from(new Set([...defaultSlugs, ...(sanitySlugs ?? [])]));
}
