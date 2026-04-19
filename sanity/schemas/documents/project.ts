import { defineField, defineType } from "sanity";

export const PROJECT_CATEGORIES = [
  { title: "Kitchen", value: "kitchen" },
  { title: "Bathroom", value: "bathroom" },
  { title: "Basement", value: "basement" },
  { title: "Deck & Fence", value: "deck" },
  { title: "Flooring", value: "flooring" },
  { title: "Wall Panelling", value: "panelling" },
  { title: "Whole Home", value: "whole-home" },
  { title: "Other", value: "other" },
] as const;

export const project = defineType({
  name: "project",
  title: "Project",
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
      name: "category",
      type: "string",
      options: { list: [...PROJECT_CATEGORIES], layout: "dropdown" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      options: { layout: "grid" },
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "completedDate",
      title: "Completed",
      type: "date",
      options: { dateFormat: "MMMM YYYY" },
    }),
    defineField({
      name: "featured",
      type: "boolean",
      description: "Show on the home page featured gallery.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "cover" },
  },
});
