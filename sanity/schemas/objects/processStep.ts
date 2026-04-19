import { defineField, defineType } from "sanity";

export const processStep = defineType({
  name: "processStep",
  title: "Process Step",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
  ],
});
