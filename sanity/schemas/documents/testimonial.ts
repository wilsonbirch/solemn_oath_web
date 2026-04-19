import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      description: "Client name (e.g. \"Ellie & Ray\").",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projectType",
      title: "Project type",
      type: "string",
      description: "e.g. Bathroom Renovation, Second Story Deck.",
    }),
    defineField({
      name: "rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      initialValue: 5,
    }),
    defineField({
      name: "quote",
      type: "text",
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      type: "date",
      options: { dateFormat: "MMMM YYYY" },
    }),
    defineField({
      name: "relatedProject",
      title: "Related project",
      type: "reference",
      to: [{ type: "project" }],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      description: "Show on the home page testimonials section.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "projectType", rating: "rating" },
    prepare({ title, subtitle, rating }) {
      return {
        title,
        subtitle: `${"★".repeat(rating ?? 0)}${subtitle ? ` — ${subtitle}` : ""}`,
      };
    },
  },
});
