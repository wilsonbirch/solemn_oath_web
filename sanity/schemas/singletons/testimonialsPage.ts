import { defineField, defineType } from "sanity";

export const testimonialsPage = defineType({
  name: "testimonialsPage",
  title: "Testimonials Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      initialValue: "Testimonials",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Testimonials Page" }) },
});
