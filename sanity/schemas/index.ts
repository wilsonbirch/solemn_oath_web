import type { SchemaTypeDefinition } from "sanity";

import { cta } from "./objects/cta";
import { imageWithAlt } from "./objects/imageWithAlt";
import { processStep } from "./objects/processStep";
import { seo } from "./objects/seo";

import { project } from "./documents/project";
import { service } from "./documents/service";
import { testimonial } from "./documents/testimonial";

import { aboutPage } from "./singletons/aboutPage";
import { contactPage } from "./singletons/contactPage";
import { homePage } from "./singletons/homePage";
import { projectsPage } from "./singletons/projectsPage";
import { servicesIndex } from "./singletons/servicesIndex";
import { siteSettings } from "./singletons/siteSettings";
import { testimonialsPage } from "./singletons/testimonialsPage";

export const SINGLETON_TYPES = [
  "siteSettings",
  "homePage",
  "aboutPage",
  "servicesIndex",
  "projectsPage",
  "testimonialsPage",
  "contactPage",
] as const;

export type SingletonType = (typeof SINGLETON_TYPES)[number];

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  cta,
  imageWithAlt,
  processStep,
  seo,
  // documents
  project,
  service,
  testimonial,
  // singletons
  siteSettings,
  homePage,
  aboutPage,
  servicesIndex,
  projectsPage,
  testimonialsPage,
  contactPage,
];
