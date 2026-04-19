/**
 * Contact-page fallbacks. Hero copy + form intro + FAQ + hours.
 * Real contact info (phone, email, area-served, social) lives in
 * Site Settings — see siteSettings singleton.
 */

export type FaqEntry = { question: string; answer: string };

export const CONTACT_DEFAULTS = {
  hero: {
    title: "Let's talk about your project",
    subtitle:
      "Tell us a bit about what you have in mind. We'll get back within one business day to set up a free in-home consult.",
    image: {
      src: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?auto=format&fit=crop&w=2400&q=80",
      alt: "Bright open-concept renovated home interior",
    },
  },
  formIntro: [
    "The fastest way to start: a quick form below. We'll respond within one business day.",
  ],
  hours: "Mon–Fri 8:00–17:00 · Weekends by appointment",
  faq: [
    {
      question: "What's the turnaround on a quote?",
      answer:
        "We'll respond to your enquiry within one business day to schedule a free in-home consult. Most quotes go out within a week of that visit.",
    },
    {
      question: "Do you handle permits?",
      answer:
        "Yes — for projects that need them (basements, structural changes, additions), we handle the City of Ottawa permit process and inspections as part of the scope.",
    },
    {
      question: "How do payments work?",
      answer:
        "Typically a deposit at signing, milestone payments at agreed checkpoints, and a holdback at completion. We'll lay it out clearly in the contract — no surprises.",
    },
    {
      question: "Are you insured?",
      answer:
        "Yes — full liability and WSIB coverage. We can share documentation before any work starts.",
    },
    {
      question: "Do you have a warranty?",
      answer:
        "We back our workmanship with a one-year warranty on labour. Manufacturer warranties on materials apply per supplier (we'll point you to the terms).",
    },
  ] satisfies FaqEntry[],
} as const;

export const PROJECT_TYPE_OPTIONS = [
  "Bathroom",
  "Kitchen",
  "Basement",
  "Deck or fence",
  "Whole-home renovation",
  "Wall panelling",
  "Trim & doors",
  "Other",
] as const;

export const SOURCE_OPTIONS = [
  "Google",
  "Referral from friend or family",
  "Instagram",
  "Facebook",
  "Saw a project nearby",
  "Other",
] as const;
