// Projects come from GitHub: every public repo of TheYassAnz with the
// `portfolio` topic is listed (see src/lib/projects.ts). From GitHub:
// description, topics → stack, homepage → demo, created year,
// docs/cover.png → image. The project page text comes from
// docs/portfolio.<lang>.md (fallback portfolio.fr.md, then README, then
// description), plus a gallery from docs/screenshots/* shown only with a
// portfolio doc.
// Entries below are optional local overrides keyed by repo name (= slug):
// EN translations, role, title, or any field to replace the GitHub value.
import type { ProjectOverride } from "../lib/projects.ts";

export const overrides: ProjectOverride[] = [
  {
    slug: "portfolio",
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    fr: {
      description:
        "Portfolio personnel développé avec Next.js 16, React 19 et Tailwind CSS 4. Design épuré orienté recruteurs et clients potentiels.",
    },
  },
  {
    slug: "course-list",
    stack: ["React Native", "Expo", "Tailwind", "EAS", "Express", "Postgresql"],
    fr: {
      description:
        "Application mobile pour partager sa liste de course avec les membres de sa famille.",
    },
  },
  {
    slug: "boxing-timer",
    stack: ["React Native", "Expo", "Tailwind", "EAS"],
    fr: {
      description:
        "Application mobile pour lancer un timer de boxe en réglant le nombre de round, la durée d'un round et le temps de repos.",
    },
  },
  {
    slug: "my-pets_app",
    stack: ["React Native", "Expo", "Tailwind", "TypeScript"],
    fr: { title: "My Pets" },
  },
  {
    slug: "my-body",
    stack: ["Next.js", "React", "Drizzle", "Postgresql", "Better Auth"],
  },
  {
    slug: "tennis-score",
    stack: ["Next.js", "React", "Express", "Prisma", "Postgresql"],
  },
  {
    slug: "ace-vision",
    stack: ["Swift", "SwiftUI", "Python", "YOLO"],
  },
];
