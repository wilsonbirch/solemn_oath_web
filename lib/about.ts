/**
 * Loads the About page payload — Sanity content layered over hardcoded
 * defaults from solemnoathco.com. Same shape regardless of CMS state.
 */

import { aboutPageQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import { sanityImageProps, type SanityImage } from "@/lib/sanity-image";
import { ABOUT_DEFAULTS, type TeamMember } from "@/lib/about-defaults";

type RawTeamMember = {
  name?: string;
  role?: string;
  bio?: string;
  photo?: SanityImage | null;
};

type RawAboutPage = {
  heroTitle?: string;
  heroImage?: SanityImage | null;
  storyTitle?: string;
  story?: unknown;
  storyImages?: SanityImage[] | null;
  teamTitle?: string;
  team?: RawTeamMember[] | null;
  nameMeaningTitle?: string;
  nameMeaningBody?: unknown;
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

export async function getAboutPageData() {
  let raw: RawAboutPage = null;
  try {
    raw = await sanityFetch<RawAboutPage>({
      query: aboutPageQuery,
      tags: ["aboutPage"],
    });
  } catch (err) {
    console.warn("[about] Failed to fetch aboutPage, using defaults:", err);
  }

  const heroImage = sanityImageProps(raw?.heroImage, { width: 2400 });

  const storyImages = (raw?.storyImages ?? [])
    .map((img) => sanityImageProps(img, { width: 1200 }))
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const team: TeamMember[] = raw?.team?.length
    ? raw.team
        .filter((m): m is RawTeamMember & { name: string } => Boolean(m?.name))
        .map((m) => {
          const photo = sanityImageProps(m.photo, { width: 800 });
          return {
            name: m.name,
            role: m.role ?? "",
            bio: m.bio,
            photo: photo ? { src: photo.src, alt: photo.alt } : undefined,
          };
        })
    : [...ABOUT_DEFAULTS.team.members];

  const storyParagraphs = portableTextToParagraphs(raw?.story);
  const nameParagraphs = portableTextToParagraphs(raw?.nameMeaningBody);

  return {
    hero: {
      title: raw?.heroTitle ?? ABOUT_DEFAULTS.hero.title,
      image: heroImage
        ? { src: heroImage.src, alt: heroImage.alt }
        : ABOUT_DEFAULTS.hero.image,
    },
    story: {
      title: raw?.storyTitle ?? ABOUT_DEFAULTS.story.title,
      body: storyParagraphs.length ? storyParagraphs : [...ABOUT_DEFAULTS.story.body],
      images: storyImages.length
        ? storyImages.map((p) => ({ src: p.src, alt: p.alt }))
        : [...ABOUT_DEFAULTS.story.images],
    },
    team: {
      title: raw?.teamTitle ?? ABOUT_DEFAULTS.team.title,
      members: team,
    },
    name: {
      title: raw?.nameMeaningTitle ?? ABOUT_DEFAULTS.name.title,
      body: nameParagraphs.length ? nameParagraphs : [...ABOUT_DEFAULTS.name.body],
    },
    cta: ABOUT_DEFAULTS.cta,
  };
}
