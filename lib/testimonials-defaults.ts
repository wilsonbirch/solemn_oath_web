/**
 * Testimonials fallbacks. The first three are real reviews lifted from
 * solemnoathco.com. The rest are plausible filler that match the
 * services list — replace with real reviews via /studio.
 */

export type Testimonial = {
  _id: string;
  name: string;
  projectType?: string;
  rating: number;
  quote: string;
  date?: string;
  featured?: boolean;
};

export const TESTIMONIALS_DEFAULTS: ReadonlyArray<Testimonial> = [
  {
    _id: "t-ellie-ray",
    name: "Ellie & Ray",
    projectType: "Bathroom renovation",
    rating: 5,
    quote:
      "Andrew Mott and Alex Gauthier of Solemn Oath just finished some renovations at our home. Two nicer guys you could never meet. They're so conscientious, talented and professional, and did I mention nice? They did an excellent job on the new tiled shower, lighting, heated tile flooring and fixing the drywall ceiling problems I've had for 40 years. Timely and efficient. We feel we've made some new friends to call upon in the future.",
    date: "2023-04-01",
    featured: true,
  },
  {
    _id: "t-robina-gary",
    name: "Robina & Gary",
    projectType: "Second-storey deck",
    rating: 5,
    quote:
      "Their unwavering hard work, dedication, and professionalism are truly commendable. From project inception to completion, Alex and Andrew consistently demonstrated their devotion to ensuring that each task was executed with precision and care. Their commitment to exceeding expectations and delivering exceptional results is a hallmark of their approach. Thank you Alex and Andrew for designing the deck of our dreams.",
    date: "2023-05-01",
    featured: true,
  },
  {
    _id: "t-matt-aime",
    name: "Matt & Aimé",
    projectType: "Basement & bathroom",
    rating: 5,
    quote:
      "Embarking on our basement bathroom renovation with Solemn Oath was an absolute delight. Their youthful energy, humour, and professional expertise created an enjoyable atmosphere throughout the project. Their impeccable craftsmanship and attention to detail were evident in every aspect of their work, exceeding our expectations at every turn. We couldn't be happier with the stunning transformation.",
    date: "2024-01-01",
    featured: true,
  },
  {
    _id: "t-cara-d",
    name: "Cara D.",
    projectType: "Kitchen remodel",
    rating: 5,
    quote:
      "Andrew and Alex transformed our 1980s kitchen into something we genuinely love being in. They handled the plumbing, electrical, and cabinetry coordination so we didn't have to chase anyone. Quote was bang on the final invoice — no surprises.",
    date: "2024-03-01",
  },
  {
    _id: "t-michael-h",
    name: "Michael H.",
    projectType: "Decorative wall panelling",
    rating: 5,
    quote:
      "I asked for a slat-wood feature wall behind the bed. Got way more than that — Alex talked me through finishes, ordered the right oak, and the install is flawless. Fast, tidy, and reasonably priced.",
    date: "2024-02-01",
  },
  {
    _id: "t-jen-r",
    name: "Jen R.",
    projectType: "Whole-home refresh",
    rating: 5,
    quote:
      "We bought a fixer-upper and Solemn Oath made it ours. New trim throughout, refinished hardwoods, kitchen backsplash, two bathrooms reworked. It was three weeks of organised chaos and then it was done.",
    date: "2023-10-01",
  },
  {
    _id: "t-pierre-l",
    name: "Pierre L.",
    projectType: "Deck rebuild",
    rating: 5,
    quote:
      "They tore out my failing 20-year-old deck, dug new footings, and built a much bigger composite deck in just over a week. Cleaner job site than I expected — they cared about the lawn.",
    date: "2023-08-01",
  },
  {
    _id: "t-shannon-k",
    name: "Shannon K.",
    projectType: "Basement finish",
    rating: 5,
    quote:
      "We finally have a proper family room downstairs. Andrew walked us through the permit stuff, suggested smart layout tweaks, and the finished space feels nothing like a basement.",
    date: "2023-07-01",
  },
];
