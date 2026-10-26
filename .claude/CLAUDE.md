# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a monorepo with two separate apps:

- `app/` — Next.js 16 frontend (portfolio site)
- `backend/` — Strapi 5 headless CMS (projects are fetched by the frontend via `src/lib/strapi.ts`)

## Commands

All commands run from the `app/` directory:

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
npm test         # node --test (lib unit tests)
```

Prettier runs via editor integration (`.prettierrc` with `prettier-plugin-tailwindcss` for class sorting).

## Frontend Architecture

**Stack:** Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS 4. Brutalist / tech look, FR/EN, light/dark.

**Routes:** everything lives under `src/app/[lang]/` (`fr` | `en`). `src/proxy.ts` redirects every path without a locale prefix to `/fr` or `/en` (negotiated from Accept-Language), except `/api`, `/_next` and dotted paths. Case studies: `[lang]/projects/[slug]`. Contact form posts to `src/app/api/contact/route.ts` (Resend).

**Page structure:** Single page, anchor nav. Order: Hero → Stats → Projects (`#projects`) → About (`#about`) → Stack (`#stack`) → Contact (`#contact`). Navbar and Footer are in `[lang]/layout.tsx`.

**i18n:** dictionaries in `src/content/{fr,en}.ts`, `Dictionary = typeof fr` (en must match fr's shape); `src/content/index.ts` exposes the getter. Components receive their dictionary slice as a `dict` prop (or the full `Dictionary` where several slices are needed, e.g. Navbar), and `lang` where needed. Strapi i18n: `fr` is default, `en` falls back to fr per project when a translation is missing (`src/lib/strapi.ts`).

**Strapi i18n migration runbook** (before the i18n schema goes live):
1. Strapi admin → Settings → Internationalization: create the `fr` locale and set it as default; create `en` too.
2. Deploy the schema.
3. Verify existing project entries are in `fr`.
4. Add `en` versions of each project. Slugs must be identical across locales.

**Path alias:** `@/*` maps to `src/*`

**Component conventions:**
- Sections in `src/components/` named `<Name>Section`; reusable pieces in `src/components/ui/`
- Sections use IDs for anchor links and `scroll-mt-14` for the sticky navbar
- Client interactivity needs `"use client"`
- Shared social URLs: `src/lib/socials.ts`

**Styling:** Tailwind utilities only; tokens in `globals.css` (`bg-bg`, `text-fg`, `text-fg-muted`, `border-line`, `bg-accent`, `text-accent-ink` for text on the page background, `text-on-accent`, `font-display`, `font-mono`). Light theme = `html.light`. Brutalist rules: no rounded corners, 1px `border-line` borders, no shadows. Use `md:`, `lg:`, `xl:` breakpoints.

**Env vars:** `STRAPI_URL`, `CLOUDINARY_NAME` (own Cloudinary cloud, same as backend; allowlists `res.cloudinary.com/<name>/**` for next/image), `NEXT_PUBLIC_CONTACT_EMAIL` (displayed/copy), `CONTACT_EMAIL` (form recipient), `RESEND_API_KEY`, `REVALIDATE_SECRET` (Strapi webhook revalidation).

**Content still to provide:** `public/me.jpg`, `public/cv-fr.pdf`, `public/cv-en.pdf`, real stats and timeline in the dictionaries.
