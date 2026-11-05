import { overrides } from "../content/projects.ts";
import type { Locale } from "./i18n.ts";

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  stack: string[];
  github?: string;
  demo?: string;
  role?: string;
  year?: number;
  problem: string;
  solution: string;
  results: string;
  gallery: string[];
};

export type LocalizedFields = {
  title: string;
  description: string;
  longDescription: string;
  role?: string;
  problem: string;
  solution: string;
  results: string;
};

export type ProjectEntry = {
  slug: string;
  stack: string[];
  year?: number;
  github?: string;
  demo?: string;
  image?: string;
  gallery?: string[];
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
const REVALIDATE = 3600;

export const coverUrl = (repo: Repo) =>
  `https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/${repo.default_branch}/docs/cover.png`;

const titleCase = (name: string) =>
  name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const defined = <T extends object>(o: T) =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as Partial<T>;

export function toEntry(repo: Repo, override?: ProjectOverride, image?: string): ProjectEntry {
  const { fr, ...rest } = override ?? {};
  return {
    slug: repo.name,
    stack: repo.topics.filter((t) => t !== GITHUB_TOPIC),
    year: new Date(repo.created_at).getFullYear(),
    github: repo.html_url,
    demo: repo.homepage || undefined,
    image,
    ...defined(rest),
    fr: {
      title: titleCase(repo.name),
      description: repo.description ?? "",
      longDescription: "",
      problem: "",
      solution: "",
      results: "",
      ...defined(fr ?? {}),
    },
  };
}

export function localize(entry: ProjectEntry, lang: Locale): Project {
  const { fr, en, image, gallery, ...common } = entry;
  // Per-field fallback: undefined or "" in `en` keeps the fr value.
  const over = Object.fromEntries(
    Object.entries(lang === "en" ? (en ?? {}) : {}).filter(([, v]) => v !== undefined && v !== "")
  );
  return { ...common, ...fr, ...over, image: image ?? "", gallery: gallery ?? [] };
}

// GitHub data is cached by Next for REVALIDATE seconds (ISR); outside Next the
// extra `next` option is ignored.
const cached = { next: { revalidate: REVALIDATE } } as RequestInit;

async function fetchRepos(): Promise<Repo[]> {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
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
  return Promise.all(
    repos.map(async (repo) =>
      toEntry(repo, overrides.find((o) => o.slug === repo.name), await findCover(repo))
    )
  );
}

export async function getProjects(lang: Locale): Promise<Project[]> {
  return (await getEntries()).map((p) => localize(p, lang));
}

export async function getProject(slug: string, lang: Locale): Promise<Project | null> {
  const entry = (await getEntries()).find((p) => p.slug === slug);
  return entry ? localize(entry, lang) : null;
}

export async function getProjectSlugs(): Promise<string[]> {
  return (await getEntries()).map((p) => p.slug);
}

export function toParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
