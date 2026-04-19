# Solemn Oath Contracting — Website

Demo redesign of [solemnoathco.com](https://www.solemnoathco.com/), an Ottawa-area home renovation company. Marketing site with content managed in Sanity.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Sanity v5 · Vercel

## First-time setup

### 1. Provision a Sanity project

```bash
npx sanity@latest init --bare
```

Pick **Create new project**, name it `solemn-oath`, and use the `production` dataset. Grab the **Project ID** from the output (or from <https://www.sanity.io/manage>).

### 2. Configure environment

```bash
cp .env.example .env.local
```

Fill in `NEXT_PUBLIC_SANITY_PROJECT_ID` (and any others) from step 1.

### 3. Add the local dev origin to Sanity CORS

In [sanity.io/manage](https://www.sanity.io/manage) → your project → **API → CORS origins**, add:

- `http://localhost:3000` (dev)
- your Vercel preview URL once it exists

### 4. Install & run

```bash
npm install
npm run dev
```

- Site: <http://localhost:3000>
- Sanity Studio: <http://localhost:3000/studio>

The first visit to `/studio` will prompt you to log in to your Sanity account.

## Project structure

```
app/                          Next.js App Router routes
  (site)/                     Marketing routes (added in PR 2+)
  studio/[[...tool]]/         Embedded Sanity Studio
components/                   UI primitives & section components (PR 2+)
lib/
  env.ts                      Validated env vars
  sanity.ts                   Client + image URL builder
  queries.ts                  GROQ queries (one per page)
sanity/
  sanity.config.ts            Studio config
  structure.ts                Studio sidebar layout (singletons pinned)
  schemas/
    objects/                  Reusable field types (cta, seo, image+alt)
    documents/                Collections (service, project, testimonial)
    singletons/               One-per-site documents (homePage, etc.)
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Run production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Roadmap (one PR per item)

1. ✅ **PR 1 — Scaffolding** — Next.js + Sanity + theme + studio
2. ⬜ **PR 2 — Layout, navigation, footer**
3. ⬜ **PR 3 — Home page**
4. ⬜ **PR 4 — About page**
5. ⬜ **PR 5 — Services (index + dynamic detail)**
6. ⬜ **PR 6 — Projects gallery + lightbox**
7. ⬜ **PR 7 — Testimonials page**
8. ⬜ **PR 8 — Contact page + form (Resend)**
9. ⬜ **PR 9 — SEO, sitemap, OG images, analytics**

See `/.claude/plans/clever-beaming-elephant.md` for the full plan.
