import { projects } from "../content/projects.ts";
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
  status: ProjectStatus;
  stack: string[];
  year?: number;
  github?: string;
  demo?: string;
  image?: string;
  gallery?: string[];
  fr: LocalizedFields;
  en?: Partial<LocalizedFields>;
};

export function localize(entry: ProjectEntry, lang: Locale): Project {
  const { fr, en, image, gallery, ...common } = entry;
  // Per-field fallback: undefined or "" in `en` keeps the fr value.
  const over = Object.fromEntries(
    Object.entries(lang === "en" ? (en ?? {}) : {}).filter(([, v]) => v !== undefined && v !== "")
  );
  return { ...common, ...fr, ...over, image: image ?? "", gallery: gallery ?? [] };
}

export function getProjects(lang: Locale): Project[] {
  return projects.map((p) => localize(p, lang));
}

export function getProject(slug: string, lang: Locale): Project | null {
  const entry = projects.find((p) => p.slug === slug);
  return entry ? localize(entry, lang) : null;
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function toParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
