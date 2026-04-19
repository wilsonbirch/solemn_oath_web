import type { StructureResolver } from "sanity/structure";

import { SINGLETON_TYPES } from "./schemas";

const SINGLETON_TITLES: Record<string, string> = {
  siteSettings: "Site Settings",
  homePage: "Home Page",
  aboutPage: "About Page",
  servicesIndex: "Services Page",
  projectsPage: "Projects Page",
  testimonialsPage: "Testimonials Page",
  contactPage: "Contact Page",
};

const SINGLETON_ICONS: Record<string, string> = {
  siteSettings: "⚙️",
  homePage: "🏠",
  aboutPage: "📖",
  servicesIndex: "🔧",
  projectsPage: "🖼️",
  testimonialsPage: "⭐",
  contactPage: "✉️",
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETON_TYPES.map((type) =>
        S.listItem()
          .title(`${SINGLETON_ICONS[type] ?? ""} ${SINGLETON_TITLES[type] ?? type}`.trim())
          .id(type)
          .child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
    ]);
