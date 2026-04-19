/**
 * Projects portfolio fallbacks. Twelve plausible Ottawa-area
 * renovations spread across categories. Replace with real photos
 * uploaded via /studio.
 */

export const PROJECT_CATEGORIES = [
  { value: "all", label: "All work" },
  { value: "kitchen", label: "Kitchens" },
  { value: "bathroom", label: "Bathrooms" },
  { value: "basement", label: "Basements" },
  { value: "deck", label: "Decks & fences" },
  { value: "panelling", label: "Panelling" },
  { value: "whole-home", label: "Whole home" },
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]["value"];

export type ProjectImage = { src: string; alt: string };

export type Project = {
  _id: string;
  title: string;
  slug: string;
  category: Exclude<ProjectCategory, "all">;
  description?: string;
  completedDate?: string;
  cover: ProjectImage;
  gallery?: ProjectImage[];
};

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PROJECTS_DEFAULTS: ReadonlyArray<Project> = [
  {
    _id: "p-hill-park-deck",
    title: "Hill Park multi-level deck",
    slug: "hill-park-deck",
    category: "deck",
    description: "Two-tier cedar deck with built-in benches and privacy slat wall.",
    completedDate: "2024-08-01",
    cover: { src: U("photo-1568605114967-8130f3a36994"), alt: "Cedar deck with built-in seating" },
    gallery: [
      { src: U("photo-1568605114967-8130f3a36994"), alt: "Cedar deck with built-in seating" },
      { src: U("photo-1572120360610-d971b9d7767c"), alt: "Deck stair detail" },
      { src: U("photo-1564540583246-934409427776"), alt: "Slat-wall privacy screen" },
    ],
  },
  {
    _id: "p-britannia-bath",
    title: "Britannia primary bath",
    slug: "britannia-bath",
    category: "bathroom",
    description: "Walk-in tile shower, niche, heated floor, and floating vanity.",
    completedDate: "2024-06-01",
    cover: { src: U("photo-1552321554-5fefe8c9ef14"), alt: "White tile walk-in shower" },
    gallery: [
      { src: U("photo-1552321554-5fefe8c9ef14"), alt: "White tile walk-in shower" },
      { src: U("photo-1620626011761-996317b8d101"), alt: "Floating vanity with brass fixtures" },
      { src: U("photo-1584622650111-993a426fbf0a"), alt: "Tile niche detail" },
    ],
  },
  {
    _id: "p-centretown-kitchen",
    title: "Centretown white-and-walnut kitchen",
    slug: "centretown-kitchen",
    category: "kitchen",
    description: "Refit with new cabinetry, quartz counters, walnut island, and pendant lighting.",
    completedDate: "2024-05-01",
    cover: { src: U("photo-1556909114-f6e7ad7d3136"), alt: "White-and-walnut kitchen" },
    gallery: [
      { src: U("photo-1556909114-f6e7ad7d3136"), alt: "White-and-walnut kitchen" },
      { src: U("photo-1556910103-1c02745aae4d"), alt: "Quartz counter with backsplash" },
      { src: U("photo-1565538810643-b5bdb714032a"), alt: "Pendant lighting over island" },
    ],
  },
  {
    _id: "p-westboro-basement",
    title: "Westboro family basement",
    slug: "westboro-basement",
    category: "basement",
    description: "Full basement finish: rec room, guest bath, and laundry.",
    completedDate: "2024-04-01",
    cover: { src: U("photo-1600585154526-990dced4db0d"), alt: "Finished basement living area" },
    gallery: [
      { src: U("photo-1600585154526-990dced4db0d"), alt: "Finished basement living area" },
      { src: U("photo-1600210492486-724fe5c67fb0"), alt: "Basement bar nook" },
    ],
  },
  {
    _id: "p-glebe-accent-wall",
    title: "Glebe slat-wood accent wall",
    slug: "glebe-accent-wall",
    category: "panelling",
    description: "Stained oak slat wall behind the primary bed.",
    completedDate: "2024-03-01",
    cover: { src: U("photo-1600210491892-03d54c0aaf87"), alt: "Slat-wood feature wall in a bedroom" },
  },
  {
    _id: "p-manotick-mudroom",
    title: "Manotick mudroom + entry",
    slug: "manotick-mudroom",
    category: "whole-home",
    description: "Custom built-ins with hooks, bench, and tile floor.",
    completedDate: "2024-02-01",
    cover: { src: U("photo-1605276374104-dee2a0ed3cd6"), alt: "Custom mudroom with built-in storage" },
  },
  {
    _id: "p-old-ottawa-south-bath",
    title: "Old Ottawa South family bath",
    slug: "old-ottawa-south-bath",
    category: "bathroom",
    description: "Tub-shower combo with subway tile and a custom vanity.",
    completedDate: "2024-01-01",
    cover: { src: U("photo-1620626011761-996317b8d101"), alt: "Subway-tile family bath" },
  },
  {
    _id: "p-orleans-kitchen",
    title: "Orléans kitchen open-up",
    slug: "orleans-kitchen",
    category: "kitchen",
    description: "Removed load-bearing wall to open kitchen to dining; new island.",
    completedDate: "2023-11-01",
    cover: { src: U("photo-1600210492486-724fe5c67fb0"), alt: "Open-concept kitchen with island" },
  },
  {
    _id: "p-kanata-deck",
    title: "Kanata back-yard deck & pergola",
    slug: "kanata-deck",
    category: "deck",
    description: "Composite decking with a cedar pergola and ambient lighting.",
    completedDate: "2023-09-01",
    cover: { src: U("photo-1564540583246-934409427776"), alt: "Composite deck with pergola" },
  },
  {
    _id: "p-alta-vista-basement",
    title: "Alta Vista in-law suite",
    slug: "alta-vista-basement",
    category: "basement",
    description: "Self-contained basement suite: kitchenette, bath, bedroom.",
    completedDate: "2023-08-01",
    cover: { src: U("photo-1600607687939-ce8a6c25118c"), alt: "Basement in-law suite living room" },
  },
  {
    _id: "p-rockcliffe-shiplap",
    title: "Rockcliffe shiplap entry",
    slug: "rockcliffe-shiplap",
    category: "panelling",
    description: "Painted shiplap in the main entry hall with a built-in bench.",
    completedDate: "2023-06-01",
    cover: { src: U("photo-1556228720-195a672e8a03"), alt: "Painted shiplap entryway with bench" },
  },
  {
    _id: "p-stittsville-whole-home",
    title: "Stittsville whole-home refresh",
    slug: "stittsville-whole-home",
    category: "whole-home",
    description: "Top-to-bottom paint, flooring, trim, and fixture replacement.",
    completedDate: "2023-04-01",
    cover: { src: U("photo-1600585154340-be6161a56a0c"), alt: "Refreshed open living room" },
  },
] as const;

export const PROJECTS_PAGE_DEFAULTS = {
  hero: {
    title: "Our work",
    subtitle:
      "A selection of recent renovations across the Ottawa region — kitchens, bathrooms, basements, decks, and beyond.",
    image: {
      src: U("photo-1505691938895-1758d7feb511", 2400),
      alt: "Sun-lit renovated living space",
    },
  },
} as const;
