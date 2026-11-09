# Project README on the project page — Plan

Goal: the project page `/[lang]/projects/[slug]` shows the repo's GitHub README (HTML rendered by GitHub) instead of the case-study blocks.

No separate spec: decisions were taken with the user in chat (README replaces all body content, GitHub-rendered HTML, same README for fr/en, small custom CSS, no new dependency).

## Global Constraints

- Work from `app/`. Commands: `npm run lint`, `npm test`, `npm run build`.
- No new npm dependency.
- README fetched with `GET https://api.github.com/repos/${GITHUB_USER}/${slug}/readme`, header `Accept: application/vnd.github.html`, plus `Authorization: Bearer ${GITHUB_TOKEN}` when the env var is set. Same ISR cache as the rest of the file (`cached`, 3600 s).
- Any README fetch failure (non-OK status, network error) returns `null` and never throws.
- Page layout after the change: back link → header (title, meta line, Code/Demo links) → README article. Removed from the page: cover image, intro (longDescription), Problem/Solution/Results blocks, Stack section, Gallery.
- When README is `null`, show `project.description` in a `<p>` instead (skip if empty).
- The cover `image` stays in the data model (the home `ProjectCard` uses it).
- Styling: Tailwind tokens/brutalist rules from `globals.css`: no rounded corners, 1px `var(--color-line)` borders, no shadows.
- Never commit `.superpowers/`, `.claude/`, `app/public/cv-*.pdf`.

## Task 1: Fetch the README and drop the case-study model

Files: `app/src/lib/projects.ts`, `app/src/lib/projects.test.ts`, `app/src/app/[lang]/projects/[slug]/page.tsx`, `app/src/content/fr.ts`, `app/src/content/en.ts`, `app/src/content/projects.ts` (header comment only), `.claude/CLAUDE.md`.

1. In `projects.ts` add and export `async function getReadme(slug: string): Promise<string | null>` per the Global Constraints. Reuse the header-building logic of `fetchRepos` (extract a small `githubHeaders(accept)` helper if it avoids duplication). Log failures with `console.error("[projects] README fetch failed:", ...)` like `fetchRepos`. A 404 (no README) returns `null` without logging an error.
2. Rewrite relative image/link URLs the GitHub HTML may contain: in the returned HTML, replace `src="` attributes whose value does not start with `http`, `//`, `data:` or `#` with `https://raw.githubusercontent.com/${GITHUB_USER}/${slug}/HEAD/<path>` (strip a leading `./` or `/`). Put this in an exported pure function `absolutizeReadme(html: string, slug: string): string` and unit-test it in `projects.test.ts` (relative `docs/a.png`, `./b.png`, `/c.png` rewritten; `https://x/y.png` and `data:` untouched).
3. Remove the fields `longDescription`, `problem`, `solution`, `results` from `Project` and `LocalizedFields`; remove `gallery` from `Project` and `ProjectEntry`. Update `toEntry` and `localize` accordingly. Delete `toParagraphs`. Update `projects.test.ts` so all tests still assert the same behaviour with remaining fields (e.g. use `role`/`description` where `problem` was used) and delete the `toParagraphs` test.
4. In `page.tsx`: fetch `getReadme(slug)` in parallel with the project (only after `isLocale` check). Render back link, header (unchanged), then either `<article className="readme border-b border-line py-8" dangerouslySetInnerHTML={{ __html: readme }} />` or the description fallback. Remove `Image` import if unused, cover image, intro, blocks, Stack, Gallery. Add a one-line comment above `dangerouslySetInnerHTML`: HTML comes from GitHub's renderer, which sanitizes it.
5. Remove dictionary keys `work.problem`, `work.solution`, `work.results`, `work.stack`, `work.gallery` from `fr.ts` and `en.ts` (verify with grep they are unused elsewhere).
6. Update the header comment of `content/projects.ts` and the Projects paragraph of `.claude/CLAUDE.md`: no more case-study text; the project page shows the repo README.
7. Run `npm run lint`, `npm test`, `npm run build` — all must pass. Commit: `feat: show GitHub README on project page`.

## Task 2: README styles

File: `app/src/app/globals.css`.

Add a `.readme` block (plain CSS, after existing rules, ~20-30 lines, using the theme CSS variables already defined in `@theme`):
- `.readme > h1:first-child { display: none; }` (title already in page header)
- headings: `font-family: var(--font-display)`, spacing; `h2` with a bottom 1px border in line colour
- `p, ul, ol, pre, table, blockquote` vertical margins; `ul` disc / `ol` decimal with left padding
- `a`: accent-ink colour, underline
- `code`, `pre`: `var(--font-mono)`, 1px line border, small padding, `pre` with `overflow-x: auto`
- `img { max-width: 100%; height: auto; display: inline-block }`
- `table`: border-collapse, 1px line borders on `th, td`, padding
- `blockquote`: left 1px line border, muted colour
- no `border-radius`, no `box-shadow`
- max readable width on text (`max-width: 48rem` on the article content is fine)

Use the exact CSS variable names defined in `globals.css` (`@theme` block). Run `npm run lint` and `npm run build`. Commit: `feat: style README content`.
