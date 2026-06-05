# Samarth Jindal — Personal Website

A fast, **minimal** personal website and engineering blog built with [Astro](https://astro.build) — styled in the spirit of [Bear Blog](https://bearblog.dev): a single narrow column, system fonts, no client-side bloat, and content that's the focus. Static-site generated, mobile-first, dark-mode aware, and deployable to Cloudflare Pages or GitHub Pages.

## Highlights

- **Astro + static generation** — ships near-zero JavaScript; pages are pre-rendered HTML.
- **Blog engine** — Markdown content collections with tags, categories, client-side search, reading time, and related posts.
- **Dark mode** — system-aware with a no-flash inline theme script and a manual toggle.
- **SEO** — per-page meta + Open Graph + Twitter cards, JSON-LD structured data, `sitemap-index.xml`, `robots.txt`, and an RSS feed at `/rss.xml`.
- **Analytics** — optional Plausible or Cloudflare Web Analytics, enabled via env vars.

## Tech stack

| Concern        | Choice                                  |
| -------------- | --------------------------------------- |
| Framework      | Astro 5 (static output)                 |
| Styling        | Minimal hand-rolled CSS (no framework)  |
| Content        | Markdown via Astro content collections  |
| Fonts          | System font stack (zero font downloads) |
| Search         | Client-side filter over an embedded index |
| Deploy         | Cloudflare Pages or GitHub Pages        |

## Getting started

Requires Node 18.20+, 20.3+, or 22+.

```bash
npm install
npm run dev      # http://localhost:4321
```

Other commands:

```bash
npm run build    # type-check + build to ./dist
npm run preview  # serve the production build locally
```

## Make it yours

Almost everything is driven from one file: **`src/config.ts`**. Edit it to change:

- Name, tagline, description, and production URL (`SITE`)
- Navigation and social links (`NAV`, `SOCIALS`)
- Current role, intro, expertise, technologies (`CURRENT_ROLE`, `EXPERTISE`, `TECHNOLOGIES`)
- Career/education timeline (`TIMELINE`)
- About-page copy (`CAREER_GOALS`, `TECHNICAL_INTERESTS`, `PERSONAL_INTERESTS`)

Then update the production domain in **`astro.config.mjs`** (`SITE_URL`) — it drives canonical URLs, the sitemap, RSS, and Open Graph tags.

### Assets to replace

- `public/og-default.svg` — the social share image. For best results on Twitter/LinkedIn (which don't render SVG), export a **1200×630 PNG**, drop it in as `public/og-default.png`, and set `ogImage: "/og-default.png"` in `src/config.ts`.
- `public/favicon.svg` — the site icon.

## Writing a blog post

**Fastest way — one command:**

```bash
npm run new-post -- "Your Post Title" --category "Distributed Systems" --tag Kafka --tag "System Design"
```

This creates `src/content/blog/your-post-title.md` with today's date and frontmatter filled in, as a `draft`. Write your Markdown, delete `draft: true`, and you're published. (The `--` after `new-post` is required so npm passes the flags through.)

**Or by hand:** add a Markdown file under `src/content/blog/`. The filename becomes the URL slug (`my-post.md` → `/blog/my-post`).

```markdown
---
title: "Your Post Title"
description: "One-sentence summary used for previews and SEO."
pubDate: 2026-06-01
category: "Distributed Systems"
tags: ["Kafka", "System Design"]
# optional:
# updatedDate: 2026-06-10
# draft: true        # hidden in production, visible in `npm run dev`
# readingTime: 8     # overrides the auto estimate
---

Your content in Markdown. `##` and `###` headings auto-populate the table of contents.
```

Suggested categories: Distributed Systems, Kafka, Kubernetes, MongoDB, Production Engineering, Incident Management, System Design, Career Growth. Tags and categories automatically get filterable `/tags/<slug>` pages.

### Content cadence

The site is built for **one article a month**. Strong topics: real production incidents, system-design lessons, performance optimizations, debugging methodologies, and engineering-leadership reflections. Four sample posts ship in `src/content/blog/` as templates.

## Analytics

Copy `.env.example` to `.env` and set what you need:

- `PUBLIC_PLAUSIBLE_DOMAIN` — enable Plausible for that domain, **or**
- `PUBLIC_CF_BEACON_TOKEN` — enable Cloudflare Web Analytics.

On Cloudflare Pages / GitHub, set the same variables in the project's environment-variable settings.

## Deployment

### Option A — Cloudflare Pages (recommended)

**Via the dashboard (Git integration):**

1. Push this repo to GitHub/GitLab.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Add any environment variables, then **Save and Deploy**.

**Via Wrangler CLI (one command):**

```bash
npm run deploy   # = astro build && wrangler pages deploy dist
```

`wrangler.toml` already sets `pages_build_output_dir = "dist"`. Security and cache headers are configured in `public/_headers`.

### Option B — GitHub Pages

A workflow is included at `.github/workflows/deploy.yml`.

1. Repo **Settings → Pages → Source: GitHub Actions**.
2. Push to `main`; the action builds and deploys.

> **Project sites only** (`username.github.io/repo`): set a `base` in `astro.config.mjs` (e.g. `base: "/repo"`). Not needed for a custom domain or a user/organization site.

### Custom domain

- **Cloudflare Pages:** project → **Custom domains** → add your domain (DNS auto-configures if the zone is on Cloudflare).
- **GitHub Pages:** add a `CNAME` file in `public/` containing your domain, and point DNS at GitHub.

After pointing your domain, update `SITE_URL` in `astro.config.mjs` so canonical URLs, the sitemap, and RSS use it.

## Project structure

```
website/
├─ public/                 # static assets (favicon, og image, _headers)
├─ scripts/                # new-post.mjs (post scaffolding)
├─ src/
│  ├─ components/          # SEO, Header, Footer, ThemeToggle, PostCard, Timeline…
│  ├─ content/
│  │  └─ blog/             # blog posts (Markdown)
│  ├─ layouts/             # BaseLayout
│  ├─ pages/               # routes: /, /about, /blog, /contact, /tags, rss.xml, robots.txt
│  ├─ styles/              # global.css (minimal theme, dark mode)
│  ├─ utils/               # posts/tags helpers
│  ├─ config.ts            # ← single source of truth for site data
│  └─ content.config.ts    # content collection schemas
├─ astro.config.mjs
└─ wrangler.toml
```

## License

Personal project — content © Samarth Jindal. Reuse the code structure freely.
