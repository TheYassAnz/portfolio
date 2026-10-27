// Add a project: append an entry below (fr required, en optional per field).
// Images go in public/projects/<slug>/,
// referenced as "/projects/<slug>/file.webp".
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
  {
    slug: "my-pets",
    status: "in_progress",
    stack: ["React Native", "Expo", "Tailwind", "NestJS", "Prisma", "Supabase"],
    fr: {
      title: "My Pets",
      description:
        "Application mobile pour suivre la santé de ses animaux : carnet de santé, échéances, rappels par notification et export PDF, partagés au sein du foyer.",
      ...empty,
    },
    en: {
      description:
        "Mobile app to track your pets' health: health records, due dates, push reminders and PDF export, shared across the household.",
    },
  },
  {
    slug: "tennis-score",
    status: "done",
    stack: ["Next.js", "React", "Express", "Prisma", "Postgresql"],
    demo: "https://tennis-score-one.vercel.app",
    fr: {
      title: "Tennis Score",
      description:
        "Application web pour enregistrer ses matchs de tennis, suivre ses statistiques et se situer au classement avec un profil public.",
      ...empty,
    },
    en: {
      description:
        "Web app to record your tennis matches, track your stats and see where you stand on the leaderboard with a public profile.",
    },
  },
  {
    slug: "my-body",
    status: "in_progress",
    stack: ["Next.js", "React", "TypeScript", "Drizzle", "Postgresql"],
    demo: "https://my-body-green.vercel.app",
    fr: {
      title: "My Body",
      description:
        "Application web de suivi personnel en cours de développement, avec authentification complète (email, Google) et tests de bout en bout.",
      ...empty,
    },
    en: {
      description:
        "Personal tracking web app in development, with full authentication (email, Google) and end-to-end tests.",
    },
  },
];
