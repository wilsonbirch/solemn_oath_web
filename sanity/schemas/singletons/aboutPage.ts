import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      initialValue: "About Solemn Oath",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "storyTitle",
      title: "Story title",
      type: "string",
      initialValue: "Our story",
    }),
    defineField({
      name: "story",
      title: "Story body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "storyImages",
      title: "Story images",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "teamTitle",
      title: "Team section title",
      type: "string",
      initialValue: "Meet the team",
    }),
    defineField({
      name: "team",
      title: "Team members",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", validation: (Rule) => Rule.required() },
            { name: "role", type: "string" },
            { name: "photo", type: "imageWithAlt" },
            { name: "bio", type: "text", rows: 4 },
          ],
        },
      ],
    }),
    defineField({
      name: "nameMeaningTitle",
      title: "\"About the name\" title",
      type: "string",
      initialValue: "About the name",
    }),
    defineField({
      name: "nameMeaningBody",
      title: "\"About the name\" body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
