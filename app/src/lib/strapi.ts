import type { Locale } from "./i18n.ts";

export type ProjectStatus = "done" | "in_progress" | "archived";

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  stack: string[];
  github?: string;
  demo?: string;
  status: ProjectStatus;
  role?: string;
  year?: number;
  problem: string;
  solution: string;
  results: string;
  gallery: string[];
};

type StrapiImage = {
  url: string;
};

type StrapiProject = {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string | null;
  image: StrapiImage | null;
  stack: string[] | null;
  github: string | null;
  demo: string | null;
  projectStatus: ProjectStatus;
  role: string | null;
  year: number | null;
  problem: string | null;
  solution: string | null;
  results: string | null;
  gallery: StrapiImage[] | null;
};

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const fetchOptions: RequestInit =
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" }
    : { next: { revalidate: 3600 } };

// Cloudinary provider returns absolute URLs; local uploads are relative.
const img = (i: StrapiImage) =>
  i.url.startsWith("http") ? i.url : `${STRAPI_URL}${i.url}`;

function mapProject(raw: StrapiProject): Project {
  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    longDescription: raw.longDescription ?? "",
    image: raw.image ? img(raw.image) : "",
    stack: raw.stack ?? [],
    github: raw.github ?? undefined,
    demo: raw.demo ?? undefined,
    status: raw.projectStatus,
    role: raw.role ?? undefined,
    year: raw.year ?? undefined,
    problem: raw.problem ?? "",
    solution: raw.solution ?? "",
    results: raw.results ?? "",
    gallery: (raw.gallery ?? []).map(img),
  };
}

export function toParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

const POPULATE = "populate[0]=image&populate[1]=gallery";

// Throws on network error or non-OK response; caller decides how to degrade.
async function fetchLocale(query: string, locale: Locale): Promise<StrapiProject[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/projects?${query}&locale=${locale}`,
    fetchOptions
  );
  if (!res.ok) throw new Error(`status ${res.status}`);
  const { data }: { data: StrapiProject[] } = await res.json();
  return data;
}

async function fetchList(query: string, lang: Locale): Promise<StrapiProject[]> {
  const data = await fetchLocale(query, lang);
  // Untranslated content falls back to the default locale.
  return data.length || lang === "fr" ? data : fetchLocale(query, "fr");
}

export async function getProjects(lang: Locale): Promise<Project[]> {
  const query = `${POPULATE}&sort=createdAt:desc`;
  try {
    const fr = await fetchLocale(query, "fr");
    // Per-project fallback: keep fr order, swap in the translation when it exists.
    const translated =
      lang === "fr"
        ? []
        : await fetchLocale(query, lang).catch(() => [] as StrapiProject[]);
    const bySlug = new Map(translated.map((p) => [p.slug, p]));
    return fr.map((p) => mapProject(bySlug.get(p.slug) ?? p));
  } catch (err) {
    console.error("Strapi getProjects failed:", err);
    return [];
  }
}

export async function getProject(
  slug: string,
  lang: Locale
): Promise<Project | null> {
  try {
    const data = await fetchList(
      `filters[slug][$eq]=${encodeURIComponent(slug)}&${POPULATE}`,
      lang
    );
    return data.length ? mapProject(data[0]) : null;
  } catch {
    return null;
  }
}

export async function getProjectSlugs(): Promise<string[]> {
  try {
    const data = await fetchList(
      "fields[0]=slug&pagination[pageSize]=100",
      "fr"
    );
    return data.map((p) => p.slug);
  } catch {
    return [];
  }
}
