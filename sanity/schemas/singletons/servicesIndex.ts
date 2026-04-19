import { defineField, defineType } from "sanity";

export const servicesIndex = defineType({
  name: "servicesIndex",
  title: "Services Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      initialValue: "Services",
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
    defineField({
      name: "intro",
      title: "Intro body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Services Page" }) },
});
