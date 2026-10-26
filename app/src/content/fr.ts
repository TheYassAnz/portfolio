import type { ProjectStatus } from "@/lib/strapi";

const TODO = "À COMPLÉTER";

const fr = {
  meta: {
    title: "Yassine ANZAR BASHA — Développeur Full-Stack",
    description:
      "Portfolio de Yassine ANZAR BASHA, développeur Full-Stack basé à Paris. Web, Mobile, UI/UX, Architecture.",
  },
  nav: {
    home: "Accueil",
    work: "travaux",
    about: "parcours",
    stack: "Stack",
    contact: "Contact",
    cv: "CV",
    cvHref: "/cv-fr.pdf",
    theme: "Changer de thème",
    menu: "Menu",
  },
  hero: {
    comment: "développeur full-stack · paris",
    firstName: "YASSINE",
    lastName: "ANZAR_BASHA",
    stackLine: "react · next.js · expo · node · terraform · k8s",
    contactCta: "contact",
    terminal: [
      { cmd: "whoami", output: "Yassine ANZAR BASHA" },
      { cmd: "title", output: "Développeur Full-Stack" },
      { cmd: "location", output: "Paris, France" },
      { cmd: "stack", output: "React · Next.js · Expo · K8s · Terraform" },
      { cmd: "status", output: "Disponible" },
    ],
  },
  stats: [
    { value: TODO, label: `${TODO} 1` },
    { value: TODO, label: `${TODO} 2` },
    { value: TODO, label: `${TODO} 3` },
    { value: TODO, label: `${TODO} 4` },
  ] as { value: string; label: string }[],
  work: {
    title: "Projets",
    empty: "Aucun projet à afficher pour le moment.",
    status: {
      done: "Terminé",
      in_progress: "En cours",
      archived: "Archivé",
    } as Record<ProjectStatus, string>,
    back: "Retour aux projets",
    problem: "Problème",
    solution: "Solution",
    results: "Résultats",
    stack: "Stack technique",
    gallery: "Galerie",
    code: "Code",
    demo: "Demo live",
  },
  about: {
    title: "À propos",
    intro:
      "Je conçois et développe des applications web et mobiles modernes, du design à l'infrastructure — pour les entreprises et les entrepreneurs ambitieux.",
    photoAlt: "Portrait de Yassine ANZAR BASHA",
    timeline: [
      { period: `${TODO} 1`, role: TODO, org: TODO, summary: TODO },
      { period: `${TODO} 2`, role: TODO, org: TODO, summary: TODO },
      { period: `${TODO} 3`, role: TODO, org: TODO, summary: TODO },
    ] as { period: string; role: string; org: string; summary: string }[],
  },
  stack: {
    title: "Stack",
    groups: [
      { name: "Front", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
      { name: "Mobile", items: ["React Native", "Expo"] },
      { name: "Back", items: ["Node.js", "Strapi"] },
      { name: "Infra / DevOps", items: ["Terraform", "Kubernetes", "Jenkins"] },
      { name: "Design", items: ["Figma"] },
    ],
  },
  contact: {
    title: "Travaillons ensemble",
    intro:
      "Un poste à pourvoir ou une question ? Écrivez-moi, je réponds sous 24h.",
    email: "Email",
    copy: "Copier",
    copied: "Copié !",
    form: {
      name: "Nom",
      namePlaceholder: "Jean Dupont",
      email: "Email",
      emailPlaceholder: "jean@exemple.com",
      subject: "Sujet",
      subjectPlaceholder: "Choisir un sujet...",
      subjects: ["Opportunité CDI", "Question", "Autre"],
      message: "Message",
      messagePlaceholder: "Décrivez votre projet ou votre besoin...",
      submit: "Envoyer le message",
      sending: "Envoi en cours...",
      successTitle: "Message envoyé !",
      successText: "Je vous répondrai dans les 24 heures.",
      another: "Envoyer un autre message",
      error: "Une erreur est survenue. Réessayez ou contactez-moi par email.",
    },
  },
  footer: {
    rights: "Yassine ANZAR BASHA",
  },
};

export default fr;
