import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
      description: "1–2 sentences shown on cards and meta tags.",
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "icon",
      type: "string",
      description: "lucide-react icon name (e.g. \"hammer\", \"wrench\", \"home\").",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }, { type: "imageWithAlt" }],
      description: "Long-form description shown on the service detail page.",
    }),
    defineField({
      name: "process",
      title: "Our process",
      type: "array",
      of: [{ type: "processStep" }],
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      options: { layout: "grid" },
    }),
    defineField({
      name: "relatedTestimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 100,
    }),
    defineField({
      name: "seo",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "shortDescription", media: "heroImage" },
  },
});
