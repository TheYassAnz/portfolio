# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

The Next.js 16 frontend (portfolio site) lives in `app/`. There is no backend.

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

**i18n:** dictionaries in `src/content/{fr,en}.ts`, `Dictionary = typeof fr` (en must match fr's shape); `src/content/index.ts` exposes the getter. Components receive their dictionary slice as a `dict` prop (or the full `Dictionary` where several slices are needed, e.g. Navbar), and `lang` where needed.

**Projects:** content lives in `src/content/projects.ts` (per-locale `fr`/`en` blocks; `en` falls back to `fr` per field), read through `src/lib/projects.ts`. Images go in `public/projects/<slug>/`. To add a project: add an entry in `projects.ts`, drop its images in that folder; the slug becomes `/[lang]/projects/<slug>` (statically generated).

**Path alias:** `@/*` maps to `src/*`

**Component conventions:**
- Sections in `src/components/` named `<Name>Section`; reusable pieces in `src/components/ui/`
- Sections use IDs for anchor links and `scroll-mt-14` for the sticky navbar
- Client interactivity needs `"use client"`
- Shared social URLs: `src/lib/socials.ts`

**Styling:** Tailwind utilities only; tokens in `globals.css` (`bg-bg`, `text-fg`, `text-fg-muted`, `border-line`, `bg-accent`, `text-accent-ink` for text on the page background, `text-on-accent`, `font-display`, `font-mono`). Light theme = `html.light`. Brutalist rules: no rounded corners, 1px `border-line` borders, no shadows. Use `md:`, `lg:`, `xl:` breakpoints.

**Env vars:** `NEXT_PUBLIC_CONTACT_EMAIL` (displayed/copy), `CONTACT_EMAIL` (form recipient), `RESEND_API_KEY`.

**Content still to provide:** real stats in the dictionaries.
