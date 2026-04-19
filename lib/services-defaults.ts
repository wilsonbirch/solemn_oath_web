/**
 * Services data — the 9 services from solemnoathco.com.
 *
 * These act as fallbacks. Once corresponding `service` documents are
 * created in Sanity (matching slugs), the CMS data wins. The Sanity
 * studio templates can use this file as a starting point for content
 * entry.
 *
 * Imagery uses Unsplash placeholders. Replace with real project shots
 * uploaded via /studio.
 */

export type ServiceProcessStep = {
  title: string;
  description: string;
};

export type Service = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  icon: string;
  heroImage: { src: string; alt: string };
  body: ReadonlyArray<string>;
  process: ReadonlyArray<ServiceProcessStep>;
  order: number;
};

const UNSPLASH = {
  basement: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80",
  bathroom: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=2000&q=80",
  kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2000&q=80",
  decks: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=2000&q=80",
  flooring: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=2000&q=80",
  drywall: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2000&q=80",
  panelling: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=2000&q=80",
  trim: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=2000&q=80",
  demo: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=2000&q=80",
} as const;

const STANDARD_PROCESS: ReadonlyArray<ServiceProcessStep> = [
  {
    title: "Free in-home consultation",
    description:
      "We meet at your home, listen to your goals, take measurements, and talk through what's possible.",
  },
  {
    title: "Transparent quote",
    description:
      "A line-itemed estimate with materials, labour, and timeline — no surprises, no upsells.",
  },
  {
    title: "Scheduled execution",
    description:
      "Once you approve, we book the work, protect your space, and keep you updated through every milestone.",
  },
  {
    title: "Walkthrough & warranty",
    description:
      "We finish with a final walkthrough together, a deep clean, and a warranty on workmanship.",
  },
] as const;

export const SERVICES_DEFAULTS: ReadonlyArray<Service> = [
  {
    _id: "default-bathroom",
    title: "Bathroom remodelling",
    slug: "bathroom-remodelling",
    shortDescription:
      "Tile, fixtures, vanities, and full layouts — bathrooms that feel like a hotel.",
    icon: "bath",
    heroImage: { src: UNSPLASH.bathroom, alt: "Modern bathroom with walk-in tile shower" },
    body: [
      "From a single-vanity refresh to a full gut and rebuild, our bathroom renovations cover demolition, plumbing rough-in, tile, fixtures, lighting, and finishing.",
      "We work with your fixture choices or help you source — we have trusted local suppliers for tile, vanities, glass, and hardware. Heated floors, niches, frameless glass: it's all on the table.",
    ],
    process: STANDARD_PROCESS,
    order: 1,
  },
  {
    _id: "default-kitchen",
    title: "Kitchen remodelling",
    slug: "kitchen-remodelling",
    shortDescription:
      "Cabinetry, counters, lighting, and the heart-of-the-home flow.",
    icon: "utensils",
    heroImage: { src: UNSPLASH.kitchen, alt: "Renovated kitchen with white cabinetry and island" },
    body: [
      "Kitchens are where families live. We handle layout reworks, cabinetry installs, counter and backsplash, appliance fit-out, electrical, and flush trim work.",
      "Whether you're refacing existing cabinets or starting from a stripped studs, we'll keep the project organised and the dust contained — kitchens often serve double duty during the work.",
    ],
    process: STANDARD_PROCESS,
    order: 2,
  },
  {
    _id: "default-basement",
    title: "Basement renovations",
    slug: "basement-renovations",
    shortDescription:
      "Reclaim square footage with finished basements built for daily life.",
    icon: "layers",
    heroImage: { src: UNSPLASH.basement, alt: "Finished basement with seating area and natural light" },
    body: [
      "Whether you want a media room, in-law suite, or a kid-friendly play space, we frame, insulate, drywall, and finish basements to feel like part of the house — not an afterthought.",
      "Permits, egress windows, bathroom roughs, sub-floor systems for warmth and dryness — we handle the technical pieces while you focus on the look.",
    ],
    process: STANDARD_PROCESS,
    order: 3,
  },
  {
    _id: "default-decks",
    title: "Decks & fences",
    slug: "decks-and-fences",
    shortDescription:
      "Outdoor living spaces — decks, fences, and finishing touches that last.",
    icon: "trees",
    heroImage: { src: UNSPLASH.decks, alt: "Multi-level cedar deck overlooking a backyard" },
    body: [
      "Single-level, multi-tier, second-storey decks with composite or pressure-treated decking — built to code and to outlast Ottawa winters.",
      "Privacy fencing, gates, and railing systems round out the outdoor scope. We can also handle pergolas and small landscape carpentry as part of the same build.",
    ],
    process: STANDARD_PROCESS,
    order: 4,
  },
  {
    _id: "default-flooring",
    title: "Flooring installation",
    slug: "flooring-installation",
    shortDescription:
      "Engineered hardwood, vinyl plank, tile — clean installs over solid sub-floor prep.",
    icon: "layers",
    heroImage: { src: UNSPLASH.flooring, alt: "Wide-plank engineered hardwood floor in a bright living room" },
    body: [
      "We install engineered hardwood, vinyl plank, laminate, and tile — including transitions, baseboards, and quarter-round.",
      "Sub-floor prep is half the job: we level, patch, and underlay properly so the finish lasts and feels right underfoot.",
    ],
    process: STANDARD_PROCESS,
    order: 5,
  },
  {
    _id: "default-drywall",
    title: "Drywall install & finish",
    slug: "drywall",
    shortDescription:
      "From single patches to whole-room hangs and Level-5 finishes.",
    icon: "wrench",
    heroImage: { src: UNSPLASH.drywall, alt: "Freshly drywalled and primed room interior" },
    body: [
      "Hanging, taping, mudding, sanding, priming. We can come in for a small repair after a plumbing fix, or handle whole-house drywall as part of a larger reno.",
      "If you want flawless walls under raking light, ask about Level-5 finish — extra skim coats give a perfectly smooth surface.",
    ],
    process: STANDARD_PROCESS,
    order: 6,
  },
  {
    _id: "default-panelling",
    title: "Decorative wall panelling",
    slug: "decorative-wall-panelling",
    shortDescription:
      "Slat walls, board-and-batten, shiplap — the right feature wall changes a room.",
    icon: "layers",
    heroImage: { src: UNSPLASH.panelling, alt: "Slat-wood feature wall behind a bed" },
    body: [
      "Wood slat walls, MDF board-and-batten, shiplap, wainscoting — we mill, install, and paint to match your existing trim and palette.",
      "Great for bedroom accent walls, entryways, dining nooks, and home-office Zoom backdrops.",
    ],
    process: STANDARD_PROCESS,
    order: 7,
  },
  {
    _id: "default-trim",
    title: "Trim & doors",
    slug: "trim-and-doors",
    shortDescription:
      "Crown moulding, casings, baseboards, interior doors, and hardware — the details that finish a room.",
    icon: "hammer",
    heroImage: { src: UNSPLASH.trim, alt: "Carpenter installing baseboard trim" },
    body: [
      "Trim is the easiest way to make a room feel custom. We replace tired baseboards and casings, install crown, hang new interior doors, and swap hardware.",
      "Pairs well with a fresh paint job — we can coordinate with your painter or roll it into the scope.",
    ],
    process: STANDARD_PROCESS,
    order: 8,
  },
  {
    _id: "default-demolition",
    title: "Demolition & disposal",
    slug: "demolition-and-disposal",
    shortDescription:
      "Strip-outs, careful demo, and clean haul-away — even on its own.",
    icon: "wrench",
    heroImage: { src: UNSPLASH.demo, alt: "Interior demolition in progress with protective sheeting" },
    body: [
      "We do controlled demolition with proper dust containment, salvage of reusable items, and full disposal — we bring the bin and we take it away.",
      "Often the first phase of a larger renovation, but available as a standalone service if you want to start with a clean slate.",
    ],
    process: STANDARD_PROCESS,
    order: 9,
  },
] as const;

export const SERVICES_INDEX_DEFAULTS = {
  hero: {
    title: "Services",
    subtitle:
      "Whole-home renovations, single-room refreshes, and everything in between — across the Ottawa region.",
    image: {
      src: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?auto=format&fit=crop&w=2400&q=80",
      alt: "Renovated open living space with warm wood accents",
    },
  },
  intro:
    "We work directly with homeowners — no middlemen, no subcontracted-out estimates. Andrew or Alex will come to your home, walk through the project, and put together a clear, honest quote.",
} as const;
