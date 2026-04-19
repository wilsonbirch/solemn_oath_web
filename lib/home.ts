/**
 * Loads the home page payload — Sanity content layered over hardcoded
 * defaults from solemnoathco.com. The page renders the same shape no
 * matter how empty Sanity is.
 */

import { homePageQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import { sanityImageProps, type SanityImage } from "@/lib/sanity-image";
import {
  HOME_DEFAULTS,
  type Cta,
  type ProjectTeaser,
  type ServiceTeaser,
  type TestimonialTeaser,
  type ValueCard,
} from "@/lib/home-defaults";

type RawCta = { label?: string; href?: string; style?: string } | null | undefined;
type RawValue = { icon?: string; title?: string; description?: string };
type RawHomePage = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImage | null;
  heroPrimaryCta?: RawCta;
  heroSecondaryCta?: RawCta;
  aboutTitle?: string;
  aboutBody?: unknown;
  aboutImages?: SanityImage[] | null;
  valuesTitle?: string;
  values?: RawValue[] | null;
  featuredServicesTitle?: string;
  featuredServices?: Array<{
    _id: string;
    title?: string;
    slug?: string;
    shortDescription?: string;
    icon?: string;
  }>;
  featuredProjectsTitle?: string;
  featuredProjects?: Array<{
    _id: string;
    title?: string;
    slug?: string;
    category?: string;
    description?: string;
    cover?: SanityImage | null;
  }>;
  featuredTestimonials?: Array<{
    _id: string;
    name?: string;
    projectType?: string;
    rating?: number;
    quote?: string;
    date?: string;
  }>;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButton?: RawCta;
} | null;

function asCta(raw: RawCta, fallback?: Cta): Cta | undefined {
  if (raw && raw.label && raw.href) {
    return {
      label: raw.label,
      href: raw.href,
      style: (raw.style as Cta["style"]) ?? "primary",
    };
  }
  return fallback;
}

function portableTextToParagraphs(blocks: unknown): string[] {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .filter((b: { _type?: string }) => b?._type === "block")
    .map((b: { children?: Array<{ text?: string }> }) =>
      (b.children ?? []).map((c) => c.text ?? "").join(""),
    )
    .filter((p) => p.trim().length > 0);
}

export async function getHomePageData() {
  let raw: RawHomePage = null;
  try {
    raw = await sanityFetch<RawHomePage>({
      query: homePageQuery,
      tags: ["homePage", "service", "project", "testimonial"],
    });
  } catch (err) {
    console.warn("[home] Failed to fetch homePage, using defaults:", err);
  }

  const heroImageProps = sanityImageProps(raw?.heroImage, { width: 2400 });
  const aboutImageProps = (raw?.aboutImages ?? [])
    .map((img) => sanityImageProps(img, { width: 1200 }))
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const services: ServiceTeaser[] =
    raw?.featuredServices?.length
      ? raw.featuredServices
          .filter((s) => s.title && s.slug)
          .map((s) => ({
            _id: s._id,
            title: s.title!,
            slug: s.slug!,
            shortDescription: s.shortDescription ?? "",
            icon: s.icon,
          }))
      : [...HOME_DEFAULTS.services.items];

  const projects: ProjectTeaser[] =
    raw?.featuredProjects?.length
      ? raw.featuredProjects
          .filter((p) => p.title && p.slug && p.cover)
          .map((p) => {
            const cover = sanityImageProps(p.cover, { width: 1600 });
            return {
              _id: p._id,
              title: p.title!,
              slug: p.slug!,
              category: p.category ?? "other",
              description: p.description,
              cover: cover ? { src: cover.src, alt: cover.alt } : undefined,
            };
          })
      : [...HOME_DEFAULTS.projects.items];

  const testimonials: TestimonialTeaser[] =
    raw?.featuredTestimonials?.length
      ? raw.featuredTestimonials
          .filter((t) => t.name && t.quote)
          .map((t) => ({
            _id: t._id,
            name: t.name!,
            projectType: t.projectType,
            rating: t.rating ?? 5,
            quote: t.quote!,
            date: t.date,
          }))
      : [...HOME_DEFAULTS.testimonials.items];

  const values: ValueCard[] =
    raw?.values?.length
      ? raw.values
          .filter((v) => v.title)
          .map((v) => ({
            icon: v.icon ?? "wrench",
            title: v.title!,
            description: v.description ?? "",
          }))
      : [...HOME_DEFAULTS.values.items];

  const aboutParagraphs = portableTextToParagraphs(raw?.aboutBody);

  return {
    hero: {
      eyebrow: raw?.heroEyebrow ?? HOME_DEFAULTS.hero.eyebrow,
      title: raw?.heroTitle ?? HOME_DEFAULTS.hero.title,
      subtitle: raw?.heroSubtitle ?? HOME_DEFAULTS.hero.subtitle,
      image: heroImageProps
        ? { src: heroImageProps.src, alt: heroImageProps.alt }
        : HOME_DEFAULTS.hero.image,
      primaryCta: asCta(raw?.heroPrimaryCta, HOME_DEFAULTS.hero.primaryCta),
      secondaryCta: asCta(raw?.heroSecondaryCta, HOME_DEFAULTS.hero.secondaryCta),
    },
    about: {
      title: raw?.aboutTitle ?? HOME_DEFAULTS.about.title,
      body: aboutParagraphs.length ? aboutParagraphs : [...HOME_DEFAULTS.about.body],
      images: aboutImageProps.length
        ? aboutImageProps.map((p) => ({ src: p.src, alt: p.alt }))
        : [...HOME_DEFAULTS.about.images],
    },
    values: {
      title: raw?.valuesTitle ?? HOME_DEFAULTS.values.title,
      items: values,
    },
    services: {
      title: raw?.featuredServicesTitle ?? HOME_DEFAULTS.services.title,
      subtitle: HOME_DEFAULTS.services.subtitle,
      items: services,
    },
    projects: {
      title: raw?.featuredProjectsTitle ?? HOME_DEFAULTS.projects.title,
      subtitle: HOME_DEFAULTS.projects.subtitle,
      items: projects,
    },
    testimonials: {
      title: HOME_DEFAULTS.testimonials.title,
      items: testimonials,
    },
    cta: {
      title: raw?.ctaTitle ?? HOME_DEFAULTS.cta.title,
      subtitle: raw?.ctaSubtitle ?? HOME_DEFAULTS.cta.subtitle,
      button: asCta(raw?.ctaButton, HOME_DEFAULTS.cta.button),
    },
  };
}
