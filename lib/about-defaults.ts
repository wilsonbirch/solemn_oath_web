/**
 * About-page fallbacks. Copy is lifted directly from solemnoathco.com so
 * the page demos accurately on an empty Sanity dataset. Once the About
 * Page document is published in Sanity, those values win field-by-field.
 *
 * Imagery uses Unsplash placeholders — swap for real Sanity assets via
 * /studio (the existing site has portrait shots of Andrew & Alex that
 * can be uploaded later).
 */

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  photo?: { src: string; alt: string };
};

const UNSPLASH = {
  hero: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=80",
  story1: "https://images.unsplash.com/photo-1556909114-44e3e9399a2e?auto=format&fit=crop&w=900&q=80",
  story2: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
  // Generic professional headshots as placeholders — replace with real photos.
  andrew: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  alex: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
} as const;

export const ABOUT_DEFAULTS = {
  hero: {
    title: "About Solemn Oath",
    image: { src: UNSPLASH.hero, alt: "Sunlit construction site with timber framing" },
  },
  story: {
    title: "Our story",
    body: [
      "In January 2023, Alex and Andrew — former coworkers turned business partners — took a leap of faith to pursue their dream of becoming trusted contractors in the Ottawa region. Fifteen years of shared experience between them, and one shared standard for craftsmanship.",
      "From day one, they set out to bring honesty, hard work, and reliability to every project — knowing those values are what would set Solemn Oath apart in a crowded industry.",
      "A year in, they're grateful for the opportunities and the clients who've trusted them with their homes. Looking ahead, the bond and the vision are stronger than ever — and they're ready to keep that solemn oath of service to Ottawa-area homeowners.",
    ],
    images: [
      { src: UNSPLASH.story1, alt: "Carpenter working on a finishing detail" },
      { src: UNSPLASH.story2, alt: "Bright finished kitchen renovation" },
    ],
  },
  team: {
    title: "Meet the team",
    members: [
      {
        name: "Andrew Mott",
        role: "Owner & Co-founder",
        bio: "Andrew co-founded Solemn Oath after years on the tools alongside Alex. He oversees client relationships and project planning, with an obsessive eye for finishing details.",
        photo: { src: UNSPLASH.andrew, alt: "Portrait of Andrew Mott" },
      },
      {
        name: "Alex Gauthier",
        role: "Owner & Co-founder",
        bio: "Alex leads on-site execution and trades coordination. Carpentry, framing, and tile are where he's happiest — turning rough sketches into finished spaces.",
        photo: { src: UNSPLASH.alex, alt: "Portrait of Alex Gauthier" },
      },
    ] satisfies TeamMember[],
  },
  name: {
    title: "About the name",
    body: [
      "A \"solemn oath\" is a serious and formal promise — a commitment that a person stakes their reputation on. In our context, it's our pledge to quality, professionalism, and customer satisfaction.",
      "When we say solemn oath, we mean it. Every project is our reputation, and we treat it that way.",
    ],
  },
  cta: {
    title: "Tell us about your project.",
    subtitle:
      "Share a few details and we'll get back within one business day.",
    button: { label: "Get in touch", href: "/contact" } as const,
  },
} as const;
