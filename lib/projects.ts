/**
 * Projects orchestrator. Returns the index page hero + the full project
 * list. If Sanity has any projects, those win wholesale (we don't merge
 * per-project — projects are atomic units of "work shown to clients").
 */

import { projectsPageQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import { sanityImageProps, type SanityImage } from "@/lib/sanity-image";
import {
  PROJECTS_DEFAULTS,
  PROJECTS_PAGE_DEFAULTS,
  type Project,
  type ProjectImage,
} from "@/lib/projects-defaults";

type RawProjectsPage = {
  page: {
    heroTitle?: string;
    heroSubtitle?: string;
    heroImage?: SanityImage | null;
  } | null;
  projects: Array<{
    _id: string;
    title?: string;
    slug?: string;
    category?: string;
    description?: string;
    completedDate?: string;
    cover?: SanityImage | null;
    gallery?: SanityImage[] | null;
  }>;
} | null;

const VALID_CATEGORIES = new Set(
  ["kitchen", "bathroom", "basement", "deck", "flooring", "panelling", "whole-home", "other"],
);

export async function getProjectsPage() {
  let raw: RawProjectsPage = null;
  try {
    raw = await sanityFetch<RawProjectsPage>({
      query: projectsPageQuery,
      tags: ["projectsPage", "project"],
    });
  } catch (err) {
    console.warn("[projects] Failed to fetch projectsPage, using defaults:", err);
  }

  const heroImage = sanityImageProps(raw?.page?.heroImage, { width: 2400 });

  const sanityProjects: Project[] = (raw?.projects ?? [])
    .map((p): Project | null => {
      if (!p.title || !p.slug || !p.cover) return null;
      const cover = sanityImageProps(p.cover, { width: 1600 });
      if (!cover) return null;
      const category = (
        p.category && VALID_CATEGORIES.has(p.category) ? p.category : "other"
      ) as Project["category"];
      const gallery: ProjectImage[] = (p.gallery ?? [])
        .map((img) => sanityImageProps(img, { width: 1800 }))
        .filter((x): x is NonNullable<typeof x> => x !== null)
        .map((x) => ({ src: x.src, alt: x.alt }));

      return {
        _id: p._id,
        title: p.title,
        slug: p.slug,
        category,
        description: p.description,
        completedDate: p.completedDate,
        cover: { src: cover.src, alt: cover.alt },
        gallery,
      };
    })
    .filter((p): p is Project => p !== null);

  const projects = sanityProjects.length > 0 ? sanityProjects : [...PROJECTS_DEFAULTS];

  return {
    hero: {
      title: raw?.page?.heroTitle ?? PROJECTS_PAGE_DEFAULTS.hero.title,
      subtitle: raw?.page?.heroSubtitle ?? PROJECTS_PAGE_DEFAULTS.hero.subtitle,
      image: heroImage
        ? { src: heroImage.src, alt: heroImage.alt }
        : PROJECTS_PAGE_DEFAULTS.hero.image,
    },
    projects,
  };
}
