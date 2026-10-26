import type { Locale } from "./i18n.ts";

export type ProjectStatus = "done" | "in_progress" | "archived";

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  done: "Terminé",
  in_progress: "En cours",
  archived: "Archivé",
};

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

const img = (i: StrapiImage) => `${STRAPI_URL}${i.url}`;

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
async function fetchList(query: string, lang: Locale): Promise<StrapiProject[]> {
  const get = async (locale: Locale) => {
    const res = await fetch(
      `${STRAPI_URL}/api/projects?${query}&locale=${locale}`,
      fetchOptions
    );
    if (!res.ok) throw new Error(`status ${res.status}`);
    const { data }: { data: StrapiProject[] } = await res.json();
    return data;
  };
  const data = await get(lang);
  // Untranslated content falls back to the default locale.
  return data.length || lang === "fr" ? data : get("fr");
}

export async function getProjects(lang: Locale): Promise<Project[]> {
  try {
    const data = await fetchList(`${POPULATE}&sort=createdAt:desc`, lang);
    return data.map(mapProject);
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
