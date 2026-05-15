# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a monorepo with two separate apps:

- `app/` — Next.js 16 frontend (portfolio site)
- `backend/` — Strapi 5 headless CMS (not yet integrated with frontend)

## Commands

All commands run from the `app/` directory:

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
```

There are no tests configured. Prettier runs via editor integration (configured in `.prettierrc` with `prettier-plugin-tailwindcss` for class sorting).

## Frontend Architecture

**Stack:** Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS 4

**Page structure:** Single-page portfolio with anchor-based navigation. Sections render in order: Hero → Services → Projects → Calendly booking → Footer.

**Path alias:** `@/*` maps to `src/*`

**Component conventions:**
- Section components live in `src/components/`, reusable UI pieces in `src/components/ui/`
- Sections use IDs (`#services`, `#projects`, `#contact`) for smooth-scroll nav links
- Client-side interactivity requires `"use client"` directive (e.g. `calendly-section.tsx`)
- Section components are named `<Name>Section`, card components `<Name>Card`

**Content:** Currently hardcoded inline in components (no CMS integration yet). The `backend/` Strapi instance exists but is not connected to the frontend.

**Styling:** Tailwind CSS 4 utility classes only — no CSS modules or custom stylesheets beyond `globals.css` (which just imports Tailwind). Dark background is `#231F20`. Use `md:`, `lg:`, `xl:` breakpoints for responsive design.
