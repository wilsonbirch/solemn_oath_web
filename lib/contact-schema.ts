/**
 * Shared validation schema — imported by both the client form
 * (for inline error display) and the API route (for trusted
 * server-side validation). Keep this file dependency-free
 * apart from zod so it can run in either environment.
 */

import { z } from "zod";

import { PROJECT_TYPE_OPTIONS, SOURCE_OPTIONS } from "@/lib/contact-defaults";

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Required").max(80),
  lastName: z.string().trim().min(1, "Required").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  projectType: z.enum(PROJECT_TYPE_OPTIONS).optional(),
  source: z.enum(SOURCE_OPTIONS).optional(),
  message: z
    .string()
    .trim()
    .min(10, "A short description helps us prepare")
    .max(4000, "Keep it under 4000 characters"),
  // Honeypot — real users leave this empty. Validation accepts any string;
  // the route handler treats a filled value as a silent success (no email,
  // no field error returned to the bot).
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof ContactInput, string>> };
