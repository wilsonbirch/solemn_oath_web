import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      initialValue: "Get in touch",
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
      name: "formIntro",
      title: "Form intro",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "string",
      description: "e.g. Mon–Fri 8:00–17:00",
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", validation: (Rule) => Rule.required() },
            { name: "answer", type: "text", rows: 4, validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});
