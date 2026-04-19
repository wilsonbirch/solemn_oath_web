# Solemn Oath Contracting — Website

Demo redesign of [solemnoathco.com](https://www.solemnoathco.com/), an Ottawa-area home renovation company. Marketing site with content managed in Sanity.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Sanity v5 · Fly.io

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
- your deployed URL once it exists (e.g. `https://solemn-oath.fly.dev`)

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
  (site)/                     Marketing routes (home, about, services, …)
  studio/[[...tool]]/         Embedded Sanity Studio
components/
  ui/                         Primitives (Button, Container, Heading, …)
  sections/                   Page sections (HomeHero, ServiceProcess, …)
  layout/                     Header, Footer, MobileNav
lib/
  env.ts                      Validated env vars
  sanity.ts                   Client + image URL builder
  queries.ts                  GROQ queries (one per page)
  *-defaults.ts               Hardcoded fallbacks per page
  home.ts / about.ts / …      Orchestrators that merge Sanity over defaults
sanity/
  schemas/objects/            Reusable field types (cta, seo, image+alt)
  schemas/documents/          Collections (service, project, testimonial)
  schemas/singletons/         One-per-site documents (homePage, etc.)
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Run production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Deploy to Fly.io

One-time setup (run from the project root):

```bash
# 1. Install flyctl if you don't have it
curl -L https://fly.io/install.sh | sh

# 2. Sign in (opens browser)
fly auth login

# 3. Launch the app. flyctl detects Next.js and generates a Dockerfile
#    + fly.toml. Accept defaults; pick a region close to Ottawa (yyz / iad).
#    Decline Postgres and Redis prompts.
fly launch --no-deploy --name solemn-oath

# 4. Set environment secrets (never commit these)
fly secrets set \
  NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id> \
  NEXT_PUBLIC_SANITY_DATASET=production \
  NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01 \
  NEXT_PUBLIC_SITE_URL=https://solemn-oath.fly.dev \
  SANITY_API_READ_TOKEN=<optional, only if using drafts>

# 5. Deploy
fly deploy

# 6. After it's live, add the URL to Sanity CORS origins:
#    https://www.sanity.io/manage → API → CORS → Add https://solemn-oath.fly.dev
```

Subsequent deploys are just `fly deploy` from a clean working tree. To tail live logs: `fly logs`. To open the app: `fly open`.

## Roadmap (one PR per item)

1. ✅ **PR 1 — Scaffolding** — Next.js + Sanity + theme + studio
2. ✅ **PR 2 — Layout, navigation, footer**
3. ✅ **PR 3 — Home page**
4. ✅ **PR 4 — About page**
5. ✅ **PR 5 — Services (index + dynamic detail)**
6. ✅ **PR 6 — Projects gallery + lightbox**
7. ⬜ **PR 7 — Testimonials page**
8. ⬜ **PR 8 — Contact page + form (Resend)**
9. ⬜ **PR 9 — SEO, sitemap, OG images, analytics + Fly Dockerfile polish**

See `/.claude/plans/clever-beaming-elephant.md` for the full plan.
