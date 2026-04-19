#!/usr/bin/env node
/**
 * Seed the Sanity dataset with the home-page + site-settings content
 * that currently lives in lib/*-defaults.ts. After running, the same
 * copy is editable from /studio — perfect for demoing live edits.
 *
 * Idempotent: uses createOrReplace, so re-running is safe.
 *
 * Requires a write-scoped Sanity token. Get one from
 *   https://www.sanity.io/manage → solemn-oath → API → Tokens
 *   "Add API token" with permissions: Editor (or Deploy Studio).
 *
 * Then either export it inline or add to .env.local:
 *   SANITY_API_WRITE_TOKEN=sk_xxx npm run seed
 */

import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { config as loadDotenv } from "dotenv";

// Load .env.local — the user already has the project id there.
loadDotenv({ path: ".env.local" });
loadDotenv({ path: ".env" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("✖  NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Check .env.local.");
  process.exit(1);
}
if (!token) {
  console.error(
    "✖  SANITY_API_WRITE_TOKEN is not set.\n\n" +
      "   Get a write token at https://www.sanity.io/manage\n" +
      "   → solemn-oath → API → Tokens → Add API token\n" +
      "   Permissions: Editor (or Deploy Studio)\n\n" +
      "   Then run again:\n" +
      "     SANITY_API_WRITE_TOKEN=sk_xxx npm run seed",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

console.log(`→  Seeding ${projectId}/${dataset}\n`);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Wraps a plain string as a portable-text block array. */
function blocks(...paragraphs) {
  return paragraphs.map((text, idx) => ({
    _type: "block",
    _key: `p${idx}`,
    style: "normal",
    children: [{ _type: "span", _key: `s${idx}`, text, marks: [] }],
    markDefs: [],
  }));
}

/** Download an image to a temp file and upload it as a Sanity asset. */
async function uploadImageFromUrl(url, filename) {
  const tmp = join(tmpdir(), "solemn-seed");
  await mkdir(tmp, { recursive: true });
  const filepath = join(tmp, filename);

  console.log(`   ↓ fetching ${url.slice(0, 70)}…`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(filepath, buf);

  console.log(`   ↑ uploading ${filename} to Sanity…`);
  const asset = await client.assets.upload("image", createReadStream(filepath), {
    filename,
  });
  return asset._id;
}

function imageRef(assetId, alt) {
  return {
    _type: "imageWithAlt",
    asset: { _type: "reference", _ref: assetId },
    alt,
  };
}

// ---------------------------------------------------------------------------
// Site Settings
// ---------------------------------------------------------------------------

console.log("◇  Site Settings");
await client.createOrReplace({
  _id: "siteSettings",
  _type: "siteSettings",
  businessName: "Solemn Oath Contracting",
  tagline: "Your home, our passion.",
  navLinks: [
    { _key: "home", label: "Home", href: "/" },
    { _key: "about", label: "About", href: "/about" },
    { _key: "services", label: "Services", href: "/services" },
    { _key: "projects", label: "Projects", href: "/projects" },
    { _key: "testimonials", label: "Testimonials", href: "/testimonials" },
    { _key: "contact", label: "Contact", href: "/contact" },
  ],
  email: "hello@solemnoathco.com",
  areaServed: "Ottawa region",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61555518099269",
    instagram: "https://www.instagram.com/solemnoathco/",
  },
  footerText:
    "Experienced, reliable contractors specializing in home renovations.",
});
console.log("   ✓ siteSettings published\n");

// ---------------------------------------------------------------------------
// Home Page (with hero image)
// ---------------------------------------------------------------------------

console.log("◇  Home Page");
const heroAssetId = await uploadImageFromUrl(
  "https://images.unsplash.com/photo-1503387837-b154d5074bd2?auto=format&fit=crop&w=2400&q=80",
  "home-hero.jpg",
);
const aboutAsset1 = await uploadImageFromUrl(
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80",
  "home-about-1.jpg",
);
const aboutAsset2 = await uploadImageFromUrl(
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
  "home-about-2.jpg",
);

await client.createOrReplace({
  _id: "homePage",
  _type: "homePage",

  heroEyebrow: "Solemn Oath Contracting",
  heroTitle: "Your home, our passion.",
  heroSubtitle:
    "Experienced, reliable contractors that specialize in home renovations across the Ottawa region.",
  heroImage: imageRef(
    heroAssetId,
    "Renovated open-concept living room with warm wood accents",
  ),
  heroPrimaryCta: { _type: "cta", label: "Get a free quote", href: "/contact", style: "primary" },
  heroSecondaryCta: { _type: "cta", label: "See our work", href: "/projects", style: "secondary" },

  aboutTitle: "Built on a promise.",
  aboutBody: blocks(
    "Welcome to Solemn Oath, a home renovation company committed to providing exceptional service and craftsmanship.",
    "We make a solemn oath to deliver outstanding results on every project — bringing your vision to life with quality workmanship and clear, honest communication.",
  ),
  aboutImages: [
    imageRef(aboutAsset1, "Carpenter measuring a renovation framing project"),
    imageRef(aboutAsset2, "Modern kitchen renovation in progress"),
  ],

  valuesTitle: "Why choose Solemn Oath?",
  values: [
    {
      _key: "v1",
      icon: "hammer",
      title: "Expertise",
      description:
        "Experienced licensed professionals that bring craft and care to every project.",
    },
    {
      _key: "v2",
      icon: "compass",
      title: "Customised solutions",
      description:
        "We tailor our services to your unique needs, turning your vision into reality.",
    },
    {
      _key: "v3",
      icon: "clock",
      title: "Timely delivery",
      description:
        "Efficient schedules and on-time completion — without compromising on quality.",
    },
    {
      _key: "v4",
      icon: "messages-square",
      title: "Transparent communication",
      description:
        "Clear, honest pricing and updates at every stage of your renovation.",
    },
  ],

  featuredServicesTitle: "What we do",
  // featuredServices intentionally omitted — falls back to default services list

  featuredProjectsTitle: "Recent transformations",
  // featuredProjects pulled at query time from project docs (none exist yet,
  // so the page falls back to default project tiles)

  ctaTitle: "Ready to start your renovation?",
  ctaSubtitle:
    "Discover the endless possibilities with Solemn Oath Contracting.",
  ctaButton: { _type: "cta", label: "Get a free quote", href: "/contact", style: "primary" },
});
console.log("   ✓ homePage published\n");

console.log("✓  Done. Open /studio and visit Home Page to edit live.");
console.log("   Page revalidation runs every 60s — give it up to a minute to reflect changes.");
