import type { ProjectStatus } from "@/lib/projects";

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
    theme: "Changer de thème",
    menu: "Menu",
  },
  hero: {
    comment: "développeur full-stack · paris",
    firstName: "YASSINE",
    lastName: "ANZAR_BASHA",
    stackLine: "react · next.js · expo · node · terraform · k8s",
    contactCta: "contact",
  },
  stats: [] as { value: string; label: string }[],
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
      {
        period: "Juil. 2025 — Présent",
        role: "Développeur Full Stack",
        org: "Crédit Agricole Leasing & Factoring",
        summary:
          "Refonte d'une application vers Angular et Java 21, création d'une librairie de composants.",
      },
      {
        period: "Sept. 2024 — Juin 2025",
        role: "Développeur Solution Cloud",
        org: "Crédit Agricole Assurances",
        summary:
          "Développement et intégration de solutions cloud sur la plateforme ServiceNow.",
      },
      {
        period: "Janv. 2023 — Févr. 2023",
        role: "Développeur Full Stack (Stage)",
        org: "Ceos Tech",
        summary:
          "Création de sites web pour la restauration rapide au sein d'une agence digitale.",
      },
    ] as { period: string; role: string; org: string; summary: string }[],
  },
  stack: {
    title: "Stack",
    groups: [
      { name: "Front", items: ["React", "Next.js", "Angular 21", "TypeScript", "Tailwind"] },
      { name: "Mobile", items: ["React Native", "Expo"] },
      { name: "Back", items: ["Node.js", "Java 21", "Strapi"] },
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
