export type ProjectStatus = "Terminé" | "En cours" | "Archivé";

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

export const projects: Project[] = [
  {
    slug: "portfolio",
    title: "Portfolio",
    description: "Mon portfolio personnel — design moderne, animations fluides.",
    longDescription:
      "Portfolio personnel développé avec Next.js 16, React 19 et Tailwind CSS 4. Design épuré orienté recruteurs et clients potentiels.",
    image: "",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/TheYassAnz/portfolio",
    status: "En cours",
  },
];
