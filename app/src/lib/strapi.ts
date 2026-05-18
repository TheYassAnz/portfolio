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
};

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const fetchOptions: RequestInit =
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" }
    : { next: { revalidate: 3600 } };

function mapProject(raw: StrapiProject): Project {
  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    longDescription: raw.longDescription ?? "",
    image: raw.image ? `${STRAPI_URL}${raw.image.url}` : "",
    stack: raw.stack ?? [],
    github: raw.github ?? undefined,
    demo: raw.demo ?? undefined,
    status: raw.projectStatus,
  };
}

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/projects?populate=image&sort=createdAt:desc`,
      fetchOptions
    );
    if (!res.ok) return [];
    const { data }: { data: StrapiProject[] } = await res.json();
    return data.map(mapProject);
  } catch {
    return [];
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=image`,
      fetchOptions
    );
    if (!res.ok) return null;
    const { data }: { data: StrapiProject[] } = await res.json();
    if (!data.length) return null;
    return mapProject(data[0]);
  } catch {
    return null;
  }
}

export async function getProjectSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/projects?fields[0]=slug&pagination[pageSize]=100`,
      fetchOptions
    );
    if (!res.ok) return [];
    const { data }: { data: Pick<StrapiProject, "slug">[] } = await res.json();
    return data.map((p) => p.slug);
  } catch {
    return [];
  }
}
