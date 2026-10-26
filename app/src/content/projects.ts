// Add a project: append an entry below (fr required, en optional per field); images go in public/projects/<slug>/ and are referenced as "/projects/<slug>/file.webp".
import type { ProjectEntry } from "../lib/projects.ts";

const empty = { longDescription: "", problem: "", solution: "", results: "" };

export const projects: ProjectEntry[] = [
  {
    slug: "portfolio",
    status: "done",
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    github: "https://github.com/TheYassAnz/portfolio",
    fr: {
      title: "Portfolio",
      description:
        "Portfolio personnel développé avec Next.js 16, React 19 et Tailwind CSS 4. Design épuré orienté recruteurs et clients potentiels.",
      ...empty,
    },
  },
  {
    slug: "course-list",
    status: "done",
    stack: ["React Native", "Expo", "Tailwind", "EAS", "Express", "Postgresql"],
    github: "https://github.com/TheYassAnz/course-list",
    fr: {
      title: "Course List",
      description:
        "Application mobile pour partager sa liste de course avec les membres de sa famille.",
      ...empty,
    },
  },
  {
    slug: "boxing-timer",
    status: "done",
    stack: ["React Native", "Expo", "Tailwind", "EAS"],
    github: "https://github.com/TheYassAnz/boxing-timer",
    fr: {
      title: "Boxing Timer",
      description:
        "Application mobile pour lancer un timer de boxe en réglant le nombre de round, la durée d'un round et le temps de repos.",
      ...empty,
    },
  },
];
