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

## Git Workflow

Git flow. `main` = production, `dev` = integration.

- Never commit directly on `dev` or `main`: every change starts from a branch and comes back through a PR.
- Branch names: `feature/<name>` and `bugfix/<name>` (created from `dev`), `hotfix/<name>` (created from `main`).
- PR targets: `feature/*` and `bugfix/*` → `dev`, **never `main`**. Only `dev` (release PR) and `hotfix/*` may target `main`.
- After a `hotfix/*` is merged into `main`, merge `main` back into `dev`.

## Frontend Architecture

**Stack:** Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS 4. Brutalist / tech look, FR/EN, light/dark.

**Routes:** everything lives under `src/app/[lang]/` (`fr` | `en`). `src/proxy.ts` redirects every path without a locale prefix to `/fr` or `/en` (negotiated from Accept-Language), except `/api`, `/_next` and dotted paths. Case studies: `[lang]/projects/[slug]`. Contact form posts to `src/app/api/contact/route.ts` (Resend).

**Page structure:** Single page, anchor nav. Order: Hero → Stats → Projects (`#projects`) → About (`#about`) → Stack (`#stack`) → Contact (`#contact`). Navbar and Footer are in `[lang]/layout.tsx`.

**i18n:** dictionaries in `src/content/{fr,en}.ts`, `Dictionary = typeof fr` (en must match fr's shape); `src/content/index.ts` exposes the getter. Components receive their dictionary slice as a `dict` prop (or the full `Dictionary` where several slices are needed, e.g. Navbar), and `lang` where needed.

**Projects:** listed from GitHub in `src/lib/projects.ts`: every public repo of `TheYassAnz` with the `portfolio` topic (search API, ISR 1h, sorted by last push). GitHub gives description, topics → stack, homepage → demo, created year, and `docs/cover.png` in the repo → image (only if it exists). `src/content/projects.ts` holds optional per-slug overrides (slug = repo name): EN translations, title, role, or any field (no case-study text: the project page shows the repo README, fetched from the GitHub API, ISR 1h). Add the `featured` topic to mark a favorite: ★ on the card and project page, listed first. To add a project: add the `portfolio` topic to the repo; the slug becomes `/[lang]/projects/<slug>` (ISR, `dynamicParams = true`). A GitHub failure hides the section instead of breaking the build.

**Path alias:** `@/*` maps to `src/*`

**Component conventions:**
- Sections in `src/components/` named `<Name>Section`; reusable pieces in `src/components/ui/`
- Sections use IDs for anchor links and `scroll-mt-14` for the sticky navbar
- Client interactivity needs `"use client"`
- Shared social URLs: `src/lib/socials.ts`

**Styling:** Tailwind utilities only; tokens in `globals.css` (`bg-bg`, `text-fg`, `text-fg-muted`, `border-line`, `bg-accent`, `text-accent-ink` for text on the page background, `text-on-accent`, `font-display`, `font-mono`). Light theme = `html.light`. Brutalist rules: no rounded corners, 1px `border-line` borders, no shadows. Use `md:`, `lg:`, `xl:` breakpoints.

**Env vars:** `NEXT_PUBLIC_CONTACT_EMAIL` (displayed/copy), `CONTACT_EMAIL` (form recipient), `RESEND_API_KEY`, `GITHUB_TOKEN` (optional, raises the GitHub API rate limit).

**Content still to provide:** real stats in the dictionaries.
