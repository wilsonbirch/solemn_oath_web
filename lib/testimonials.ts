/**
 * Testimonials orchestrator. Same wholesale-Sanity pattern as projects:
 * if the CMS has any testimonials, those win and defaults are dropped
 * (testimonials are atomic units of social proof).
 */

import { testimonialsPageQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import { sanityImageProps, type SanityImage } from "@/lib/sanity-image";
import {
  TESTIMONIALS_DEFAULTS,
  type Testimonial,
} from "@/lib/testimonials-defaults";

type RawTestimonialsPage = {
  page: {
    heroTitle?: string;
    heroSubtitle?: string;
    heroImage?: SanityImage | null;
  } | null;
  testimonials: Array<{
    _id: string;
    name?: string;
    projectType?: string;
    rating?: number;
    quote?: string;
    date?: string;
  }>;
} | null;

const PAGE_DEFAULTS = {
  hero: {
    title: "What clients say",
    subtitle:
      "Reviews from homeowners across the Ottawa region. Real names, real projects.",
    image: {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80",
      alt: "Sun-lit renovated open-concept living space",
    },
  },
} as const;

export async function getTestimonialsPage() {
  let raw: RawTestimonialsPage = null;
  try {
    raw = await sanityFetch<RawTestimonialsPage>({
      query: testimonialsPageQuery,
      tags: ["testimonialsPage", "testimonial"],
    });
  } catch (err) {
    console.warn("[testimonials] Failed to fetch, using defaults:", err);
  }

  const heroImage = sanityImageProps(raw?.page?.heroImage, { width: 2400 });

  const sanityTestimonials: Testimonial[] = (raw?.testimonials ?? [])
    .filter((t): t is NonNullable<typeof t> & { name: string; quote: string } =>
      Boolean(t?.name && t?.quote),
    )
    .map((t) => ({
      _id: t._id,
      name: t.name,
      projectType: t.projectType,
      rating: typeof t.rating === "number" ? t.rating : 5,
      quote: t.quote,
      date: t.date,
    }));

  const testimonials =
    sanityTestimonials.length > 0 ? sanityTestimonials : [...TESTIMONIALS_DEFAULTS];

  // Stats summary for the hero — averaged out of however many we have.
  const ratingSum = testimonials.reduce((sum, t) => sum + t.rating, 0);
  const avgRating = testimonials.length > 0 ? ratingSum / testimonials.length : 0;

  return {
    hero: {
      title: raw?.page?.heroTitle ?? PAGE_DEFAULTS.hero.title,
      subtitle: raw?.page?.heroSubtitle ?? PAGE_DEFAULTS.hero.subtitle,
      image: heroImage
        ? { src: heroImage.src, alt: heroImage.alt }
        : PAGE_DEFAULTS.hero.image,
    },
    stats: {
      count: testimonials.length,
      averageRating: avgRating,
    },
    testimonials,
  };
}
