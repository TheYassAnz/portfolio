import { overrides } from "../content/projects.ts";
import type { Locale } from "./i18n.ts";

export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  stack: string[];
  featured: boolean;
  github?: string;
  demo?: string;
  role?: string;
  year?: number;
};

export type LocalizedFields = {
  title: string;
  description: string;
  role?: string;
};

export type ProjectEntry = {
  slug: string;
  stack: string[];
  featured: boolean;
  year?: number;
  github?: string;
  demo?: string;
  image?: string;
  fr: LocalizedFields;
  en?: Partial<LocalizedFields>;
};

// Local, optional enrichment of a GitHub repo, keyed by repo name (= slug).
export type ProjectOverride = Partial<Omit<ProjectEntry, "fr">> & {
  slug: string;
  fr?: Partial<LocalizedFields>;
};

// Subset of the GitHub search API repo object we read.
export type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  created_at: string;
  pushed_at: string;
  default_branch: string;
};

export const GITHUB_USER = "TheYassAnz";
export const GITHUB_TOPIC = "portfolio";
export const FEATURED_TOPIC = "featured";
const REVALIDATE = 3600;

export const coverUrl = (repo: Repo) =>
  `https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/${repo.default_branch}/docs/cover.png`;

const titleCase = (name: string) =>
  name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const defined = <T extends object>(o: T) =>
  Object.fromEntries(
    Object.entries(o).filter(([, v]) => v !== undefined),
  ) as Partial<T>;

export function toEntry(
  repo: Repo,
  override?: ProjectOverride,
  image?: string,
): ProjectEntry {
  const { fr, ...rest } = override ?? {};
  return {
    slug: repo.name,
    stack: repo.topics.filter(
      (t) => t !== GITHUB_TOPIC && t !== FEATURED_TOPIC,
    ),
    featured: repo.topics.includes(FEATURED_TOPIC),
    year: new Date(repo.created_at).getFullYear(),
    github: repo.html_url,
    demo: repo.homepage || undefined,
    image,
    ...defined(rest),
    fr: {
      title: titleCase(repo.name),
      description: repo.description ?? "",
      ...defined(fr ?? {}),
    },
  };
}

export function localize(entry: ProjectEntry, lang: Locale): Project {
  const { fr, en, image, ...common } = entry;
  // Per-field fallback: undefined or "" in `en` keeps the fr value.
  const over = Object.fromEntries(
    Object.entries(lang === "en" ? (en ?? {}) : {}).filter(
      ([, v]) => v !== undefined && v !== "",
    ),
  );
  return { ...common, ...fr, ...over, image: image ?? "" };
}

// GitHub data is cached by Next for REVALIDATE seconds (ISR); outside Next the
// extra `next` option is ignored.
const cached = { next: { revalidate: REVALIDATE } } as RequestInit;

function githubHeaders(accept: string): HeadersInit {
  const headers: Record<string, string> = { Accept: accept };
  if (process.env.GITHUB_TOKEN)
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

async function fetchRepos(): Promise<Repo[]> {
  const headers = githubHeaders("application/vnd.github+json");
  const url = `https://api.github.com/search/repositories?q=user:${GITHUB_USER}+topic:${GITHUB_TOPIC}&sort=updated&per_page=100`;
  try {
    const res = await fetch(url, { ...cached, headers });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const { items } = (await res.json()) as { items: Repo[] };
    return items.sort((a, b) => b.pushed_at.localeCompare(a.pushed_at));
  } catch (err) {
    // Never break the build/page on a GitHub outage or rate limit: hide projects instead.
    console.error("[projects] GitHub fetch failed:", err);
    return [];
  }
}

// docs/cover.png is optional: only use it if the repo actually has it.
async function findCover(repo: Repo): Promise<string | undefined> {
  const url = coverUrl(repo);
  try {
    const res = await fetch(url, { ...cached, method: "HEAD" });
    return res.ok ? url : undefined;
  } catch {
    return undefined;
  }
}

async function getEntries(): Promise<ProjectEntry[]> {
  const repos = await fetchRepos();
  const entries = await Promise.all(
    repos.map(async (repo) =>
      toEntry(
        repo,
        overrides.find((o) => o.slug === repo.name),
        await findCover(repo),
      ),
    ),
  );
  return sortFeaturedFirst(entries);
}

// Stable sort: favourites first, each group keeps the last-push order.
export const sortFeaturedFirst = <T extends { featured: boolean }>(
  items: T[],
) => items.toSorted((a, b) => Number(b.featured) - Number(a.featured));

export async function getProjects(lang: Locale): Promise<Project[]> {
  return (await getEntries()).map((p) => localize(p, lang));
}

export async function getProject(
  slug: string,
  lang: Locale,
): Promise<Project | null> {
  const entry = (await getEntries()).find((p) => p.slug === slug);
  return entry ? localize(entry, lang) : null;
}

export async function getProjectSlugs(): Promise<string[]> {
  return (await getEntries()).map((p) => p.slug);
}

// GitHub's README HTML keeps relative paths: point them at raw.githubusercontent.com.
export function absolutizeReadme(html: string, slug: string, dir = ""): string {
  return html.replace(
    /(?<![\w-])(src|href)="(?![a-z][a-z0-9+.-]*:|\/\/|#)([^"]*)"/gi,
    (_, attr: string, value: string) => {
      const root =
        attr.toLowerCase() === "src"
          ? "raw.githubusercontent.com"
          : "github.com";
      const path = attr.toLowerCase() === "src" ? "" : "blob/";
      // A leading "/" means repo root, as on GitHub.
      const url = new URL(
        value.replace(/^\//, ""),
        `https://${root}/${GITHUB_USER}/${slug}/${path}HEAD/${value.startsWith("/") ? "" : dir}`,
      ).href;
      return `${attr}="${url}"`;
    },
  );
}

// Rendered README HTML, or null when missing/unreachable (never throws).
export async function getReadme(slug: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${encodeURIComponent(slug)}/readme`,
      {
        ...cached,
        headers: githubHeaders("application/vnd.github.html"),
      },
    );
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    return absolutizeReadme(await res.text(), slug);
  } catch (err) {
    console.error("[projects] README fetch failed:", err);
    return null;
  }
}

export const portfolioDocPaths = (lang: Locale) => [
  ...new Set([`docs/portfolio.${lang}.md`, "docs/portfolio.fr.md"]),
];

// Next does not reliably cache POST fetches, so the render is wrapped in
// unstable_cache (dynamic import keeps this module loadable by node --test).
// render() runs directly only if next/cache can't load or there is no cache.
async function renderMarkdown(slug: string, text: string): Promise<string> {
  const render = async () => {
    const res = await fetch("https://api.github.com/markdown", {
      method: "POST",
      headers: {
        ...(githubHeaders("text/html") as Record<string, string>),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        mode: "gfm",
        context: `${GITHUB_USER}/${slug}`,
      }),
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    return res.text();
  };
  let cache: typeof import("next/cache").unstable_cache;
  try {
    ({ unstable_cache: cache } = await import("next/cache"));
  } catch {
    return render(); // next/cache not loadable (node --test)
  }
  try {
    return await cache(render, ["md", slug, text], {
      revalidate: REVALIDATE,
    })();
  } catch (err) {
    // Only "no incremental cache" (called outside Next) renders directly;
    // anything else (GitHub or network error) propagates to the caller.
    if (err instanceof Error && /incremental ?cache/i.test(err.message))
      return render();
    throw err;
  }
}

// Raw docs/portfolio.<lang>.md text, or null when absent/unreachable.
async function fetchRaw(slug: string, path: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${GITHUB_USER}/${encodeURIComponent(slug)}/HEAD/${path}`,
      cached,
    );
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`raw ${res.status}`);
    return await res.text();
  } catch (err) {
    console.error("[projects] portfolio doc fetch failed:", err);
    return null;
  }
}

// docs/portfolio.<lang>.md (fr fallback) rendered, else the README.
export async function getProjectContent(
  slug: string,
  lang: Locale,
): Promise<{ html: string; source: "portfolio" | "readme" } | null> {
  for (const path of portfolioDocPaths(lang)) {
    const text = await fetchRaw(slug, path);
    if (text === null) continue;
    try {
      const html = await renderMarkdown(slug, text);
      return {
        html: absolutizeReadme(
          `<div class="markdown-body">${html}</div>`,
          slug,
          "docs/",
        ),
        source: "portfolio",
      };
    } catch (err) {
      console.error("[projects] markdown render failed:", err);
      break;
    }
  }
  const html = await getReadme(slug);
  return html ? { html, source: "readme" } : null;
}

type ContentItem = { name: string; type: string; download_url: string | null };

export const toScreenshots = (items: ContentItem[]): string[] =>
  items
    .filter((i) => i.type === "file" && /\.(png|jpe?g|webp|gif)$/i.test(i.name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    .map((i) => i.download_url as string);

export async function getScreenshots(slug: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${encodeURIComponent(slug)}/contents/docs/screenshots`,
      { ...cached, headers: githubHeaders("application/vnd.github+json") },
    );
    if (res.status === 404) return [];
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    return toScreenshots((await res.json()) as ContentItem[]);
  } catch (err) {
    console.error("[projects] screenshots fetch failed:", err);
    return [];
  }
}
