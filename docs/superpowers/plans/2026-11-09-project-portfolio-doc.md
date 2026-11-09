# Portfolio doc + auto gallery on the project page — Plan

Goal: the project page `/[lang]/projects/[slug]` shows a portfolio-oriented text written in the project's own repo (`docs/portfolio.<lang>.md`), with a gallery built from `docs/screenshots/`. The README stays as a fallback.

There is no separate spec. These decisions were taken with the user in chat:
- **Text source order:** `docs/portfolio.<lang>.md` → `docs/portfolio.fr.md` → README → `project.description`.
- **Gallery:** shown only when the text comes from a `docs/portfolio.*.md` file. With the README fallback it is hidden, to avoid images appearing twice.
- **GitHub token:** `GITHUB_TOKEN` is set in production.
- **Dependencies:** none added.

## Verified API facts (2026-11-09)

- **`POST https://api.github.com/markdown`** with body `{ "text", "mode": "gfm", "context": "TheYassAnz/<slug>" }`:
  - Returns sanitized HTML with **bare** `<h1>`/`<h2>`.
  - The output has no `markdown-body` wrapper and no `markdown-heading` divs.
  - Relative `src`/`href` are kept as written.
- **`GET /repos/TheYassAnz/<slug>/contents/docs/screenshots`:**
  - Returns an array of `{ name, type, download_url }`.
  - `download_url` points to `https://raw.githubusercontent.com/TheYassAnz/<slug>/<branch>/docs/screenshots/<name>`, which `next.config.ts` `remotePatterns` already allows.
  - A missing folder returns 404.
- **Raw files:** `https://raw.githubusercontent.com/TheYassAnz/<slug>/HEAD/docs/portfolio.fr.md` works without using API quota.

## Global Constraints

- Work from `app/`. Commands: `npm run lint`, `npm test`, `npm run build`. Run `npx prettier --write` on changed TS/TSX files.
- No new npm dependency.
- Every new fetch uses the existing `cached` options (ISR, 3600 s) and the existing `githubHeaders(...)` helper for api.github.com calls.
- Every new fetch returns an empty result on failure and never throws:
  - a 404 is silent;
  - any other failure is logged with `console.error("[projects] ...", err)`.
- GitHub requests use `project.slug` only, after `getProject` matched it. Never use the raw URL slug. Wrap the slug in `encodeURIComponent` in URLs.
- Relative paths in `docs/portfolio.*.md` resolve from `docs/`, as on GitHub. For example, `screenshots/a.png` becomes `docs/screenshots/a.png`.
- Styling follows the brutalist rules: no rounded corners, 1px `border-line`, no shadows, theme variables only.
- Never commit `.superpowers/`, untracked `.claude/*` files, or `app/public/cv-*.pdf`.

## Task 1: Data layer (`app/src/lib/projects.ts` + tests)

1. **`absolutizeReadme`:** add an optional third parameter `dir = ""`, the repo-relative directory of the source file (for example `"docs/"`).
   - Relative values (no leading `/`) resolve against `.../HEAD/<dir>`.
   - A leading `/` still means the repo root.
   - Existing behaviour is unchanged when `dir` is omitted.
2. **`portfolioDocPaths(lang)`:** add this pure, exported function.
   - It returns `["docs/portfolio.<lang>.md", "docs/portfolio.fr.md"]`, deduplicated.
   - For `fr`, it returns only `["docs/portfolio.fr.md"]`.
3. **`getProjectContent(slug, lang)`:** add it with return type `Promise<{ html: string; source: "portfolio" | "readme" } | null>`.
   - For each path from `portfolioDocPaths(lang)`, GET the raw file from `raw.githubusercontent.com/.../HEAD/<path>`. The first OK response wins.
   - Render it with `POST /markdown` (`mode: "gfm"`, `context: "TheYassAnz/<slug>"`, headers `githubHeaders("text/html")`, `Content-Type: application/json`).
   - Wrap the result in `<div class="markdown-body">…</div>`, then call `absolutizeReadme(html, slug, "docs/")`. Return `source: "portfolio"`.
   - If no portfolio file is found, return `getReadme(slug)` as `{ html, source: "readme" }`, or `null`.
   - If the raw file exists but the render call fails, log the error and fall back to the README.
4. **Caching check:** Next must cache the `POST /markdown` response like the GETs.
   - Check the Next 16 docs for `fetch` POST caching with `next.revalidate` (context7, `/vercel/next.js`).
   - If POST is not cached, wrap the render in `unstable_cache` (or the `"use cache"` directive if the project already enables it) with `revalidate: 3600`, keyed by slug and file content.
5. **Screenshots:** add `toScreenshots(items)` (pure, exported) and `getScreenshots(slug): Promise<string[]>`.
   - `toScreenshots` keeps entries where `type === "file"` and `name` matches `/\.(png|jpe?g|webp|gif)$/i`, sorts them by `name` with `localeCompare(..., undefined, { numeric: true })`, and returns their `download_url`.
   - `getScreenshots` calls the contents API and passes the result through `toScreenshots`.
6. **Tests** in `projects.test.ts`:
   - `absolutizeReadme` with `dir`: `screenshots/a.png` becomes `.../HEAD/docs/screenshots/a.png` for both src and href (href uses `blob/HEAD/docs/...`), `../README.md` resolves to the repo root, and `/x.png` resolves to the repo root.
   - `portfolioDocPaths`: `en` gives both paths, `fr` gives one.
   - `toScreenshots`: filters out dirs and non-images, applies numeric sort (`2.png` before `10.png`), and maps to `download_url`.
7. Commit `feat: load project text from docs/portfolio.<lang>.md`.

## Task 2: Page, gallery and styles

Files: `app/src/app/[lang]/projects/[slug]/page.tsx`, `app/src/content/fr.ts`, `app/src/content/en.ts`, `app/src/app/globals.css`.

1. **Page fetch:** after `notFound` checks, fetch `getProjectContent(project.slug, lang)` and `getScreenshots(project.slug)` in parallel with `Promise.all`. Call `getScreenshots` only if needed; parallel is fine since both are cached.
2. **Content:** render `content.html` in the existing `.readme` div. When `content` is null, keep the description fallback.
3. **Gallery:** render it only when `content?.source === "portfolio"` and there is at least one screenshot.
   - Add a section below the content: `h2` with `work.gallery` (same style as the old one: `text-sm text-fg-muted uppercase`), then a `grid gap-4 md:grid-cols-2` of `next/image`.
   - Image attributes: `width={1600} height={900}`, `sizes="(min-width: 768px) 50vw, 100vw"`, `className="h-auto w-full border border-line"`, `alt={`${project.title} — ${i + 1}`}`.
   - Each image is wrapped in a link to the full image, opening in a new tab with `rel="noopener noreferrer"`.
4. **Dictionaries:** re-add `work.gallery`, with `"Galerie"` in `fr.ts` and `"Gallery"` in `en.ts`.
5. **`globals.css`:** add `.readme .markdown-body > h1:first-child { display: none; }`. The `/markdown` output has a bare h1, while the existing rule only targets README's `.markdown-heading` wrapper.
6. Commit `feat: auto gallery from docs/screenshots`.

## Task 3: Docs

1. `.claude/CLAUDE.md`, Projects paragraph:
   - The page text comes from `docs/portfolio.<lang>.md`, falling back to `docs/portfolio.fr.md`, then README, then description.
   - Paths in that file are relative to `docs/`.
   - The gallery comes from `docs/screenshots/*` (sorted by name, shown only with a portfolio doc).
   - Convention: don't embed screenshots inline in `portfolio.*.md`, and don't start it with a `# Title`; the title is hidden anyway.
2. Update the header comment of `app/src/content/projects.ts` to match.
3. Commit `docs: document portfolio doc and screenshots conventions`.

## Verification (controller)

- `npm test`, `npm run lint`, `npm run build`.
- Browser checks:
  - a project with no portfolio doc still shows its README and no gallery (boxing-timer has `docs/screenshots/` but no portfolio doc);
  - an unknown slug returns 404.
- For a project with a portfolio doc: the user adds `docs/portfolio.fr.md` to one repo, or the reviewer temporarily points `portfolioDocPaths` at a test repo. Check FR, EN→FR fallback, the gallery, and that images in the text resolve from `docs/`.
- Dev server logs: repeated page loads must not call `POST /markdown` again.
