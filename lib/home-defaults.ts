/**
 * Home page fallbacks. Copy is lifted directly from solemnoathco.com so
 * a fresh deploy with an empty Sanity dataset still demos the company
 * accurately. Once the Home Page document is published in Sanity, those
 * values win.
 *
 * Hero/about/about images use Unsplash as visual placeholders — swap
 * for real Sanity assets via the studio.
 */

export type Cta = { label: string; href: string; style?: "primary" | "secondary" | "link" };

export type ValueCard = {
  icon: string;
  title: string;
  description: string;
};

export type ServiceTeaser = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  icon?: string;
};

export type ProjectTeaser = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description?: string;
  cover?: { src: string; alt: string };
};

export type TestimonialTeaser = {
  _id: string;
  name: string;
  projectType?: string;
  rating: number;
  quote: string;
  date?: string;
};

// Construction-themed Unsplash placeholders. Royalty-free, hotlinkable.
const UNSPLASH = {
  hero: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?auto=format&fit=crop&w=2400&q=80",
  about1: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80",
  about2: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
  proj1: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
  proj2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  proj3: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  proj4: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  proj5: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  proj6: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80",
} as const;

export const HOME_DEFAULTS = {
  hero: {
    eyebrow: "Solemn Oath Contracting",
    title: "Your home, our passion.",
    subtitle:
      "Experienced, reliable contractors that specialize in home renovations across the Ottawa region.",
    image: { src: UNSPLASH.hero, alt: "Renovated open-concept living room with warm wood accents" },
    primaryCta: { label: "Get a free quote", href: "/contact" } as Cta,
    secondaryCta: { label: "See our work", href: "/projects" } as Cta,
  },
  about: {
    title: "Built on a promise.",
    body: [
      "Welcome to Solemn Oath, a home renovation company committed to providing exceptional service and craftsmanship.",
      "We make a solemn oath to deliver outstanding results on every project — bringing your vision to life with quality workmanship and clear, honest communication.",
    ],
    images: [
      { src: UNSPLASH.about1, alt: "Carpenter measuring a renovation framing project" },
      { src: UNSPLASH.about2, alt: "Modern kitchen renovation in progress" },
    ],
  },
  values: {
    title: "Why choose Solemn Oath?",
    items: [
      {
        icon: "hammer",
        title: "Expertise",
        description:
          "Experienced licensed professionals that bring craft and care to every project.",
      },
      {
        icon: "compass",
        title: "Customised solutions",
        description:
          "We tailor our services to your unique needs, turning your vision into reality.",
      },
      {
        icon: "clock",
        title: "Timely delivery",
        description:
          "Efficient schedules and on-time completion — without compromising on quality.",
      },
      {
        icon: "messages-square",
        title: "Transparent communication",
        description:
          "Clear, honest pricing and updates at every stage of your renovation.",
      },
    ] as ValueCard[],
  },
  services: {
    title: "What we do",
    subtitle: "From single-room refreshes to whole-home transformations.",
    items: [
      {
        _id: "default-bathroom",
        title: "Bathroom remodelling",
        slug: "bathroom-remodelling",
        shortDescription: "Tile, fixtures, vanities, and full layouts — bathrooms that feel like a hotel.",
        icon: "bath",
      },
      {
        _id: "default-kitchen",
        title: "Kitchen remodelling",
        slug: "kitchen-remodelling",
        shortDescription: "Cabinetry, counters, lighting, and the heart-of-the-home flow.",
        icon: "utensils",
      },
      {
        _id: "default-basement",
        title: "Basement renovations",
        slug: "basement-renovations",
        shortDescription: "Reclaim square footage with finished basements built for daily life.",
        icon: "layers",
      },
      {
        _id: "default-decks",
        title: "Decks & fences",
        slug: "decks-and-fences",
        shortDescription: "Outdoor living spaces — decks, fences, and finishing touches that last.",
        icon: "trees",
      },
    ] as ServiceTeaser[],
  },
  projects: {
    title: "Recent transformations",
    subtitle: "A peek at recent work across the Ottawa region.",
    items: [
      { _id: "p1", title: "Hill Park deck", slug: "hill-park-deck", category: "deck", cover: { src: UNSPLASH.proj1, alt: "Multi-level cedar deck" } },
      { _id: "p2", title: "Britannia bath", slug: "britannia-bath", category: "bathroom", cover: { src: UNSPLASH.proj2, alt: "Walk-in tile shower" } },
      { _id: "p3", title: "Centretown kitchen", slug: "centretown-kitchen", category: "kitchen", cover: { src: UNSPLASH.proj3, alt: "White-and-walnut kitchen" } },
      { _id: "p4", title: "Westboro basement", slug: "westboro-basement", category: "basement", cover: { src: UNSPLASH.proj4, alt: "Finished basement living area" } },
      { _id: "p5", title: "Glebe accent wall", slug: "glebe-accent-wall", category: "panelling", cover: { src: UNSPLASH.proj5, alt: "Slat-wood feature wall in a bedroom" } },
      { _id: "p6", title: "Manotick mudroom", slug: "manotick-mudroom", category: "whole-home", cover: { src: UNSPLASH.proj6, alt: "Custom mudroom with built-in storage" } },
    ] as ProjectTeaser[],
  },
  testimonials: {
    title: "Clients on Solemn Oath",
    items: [
      {
        _id: "t1",
        name: "Ellie & Ray",
        projectType: "Bathroom Renovation",
        rating: 5,
        quote:
          "Andrew and Alex just finished some renovations at our home. Two nicer guys you could never meet. So conscientious, talented and professional. Excellent job on the new tiled shower, lighting, heated tile flooring and fixing the drywall ceiling problems I've had for 40 years.",
        date: "2023-04-01",
      },
      {
        _id: "t2",
        name: "Robina & Gary",
        projectType: "Second-storey deck",
        rating: 5,
        quote:
          "Their unwavering hard work, dedication, and professionalism are truly commendable. From inception to completion, every task was executed with precision and care. Thank you for designing the deck of our dreams.",
        date: "2023-05-01",
      },
      {
        _id: "t3",
        name: "Matt & Aimé",
        projectType: "Basement & bathroom",
        rating: 5,
        quote:
          "Embarking on our basement bathroom renovation with Solemn Oath was an absolute delight. Their youthful energy, humour, and professional expertise created an enjoyable atmosphere. We couldn't be happier with the stunning transformation.",
        date: "2024-01-01",
      },
    ] as TestimonialTeaser[],
  },
  cta: {
    title: "Ready to start your renovation?",
    subtitle: "Discover the endless possibilities with Solemn Oath Contracting.",
    button: { label: "Get a free quote", href: "/contact" } as Cta,
  },
} as const;
