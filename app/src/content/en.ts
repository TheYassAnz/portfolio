import type { Dictionary } from "./index";

const en: Dictionary = {
  meta: {
    title: "Yassine ANZAR BASHA — Full-Stack Developer",
    description:
      "Portfolio of Yassine ANZAR BASHA, Full-Stack developer based in Paris. Web, Mobile, UI/UX, Architecture.",
  },
  nav: {
    home: "Home",
    work: "Work",
    about: "About",
    stack: "Stack",
    contact: "Contact",
    cv: "Resume",
    cvHref: "/cv-en.pdf",
    theme: "Toggle theme",
    menu: "Menu",
  },
  hero: {
    comment: "full-stack developer · paris",
    firstName: "YASSINE",
    lastName: "ANZAR_BASHA",
    stackLine: "react · next.js · expo · node · terraform · k8s",
    contactCta: "contact",
    terminal: [
      { cmd: "whoami", output: "Yassine ANZAR BASHA" },
      { cmd: "title", output: "Full-Stack Developer" },
      { cmd: "location", output: "Paris, France" },
      { cmd: "stack", output: "React · Next.js · Expo · K8s · Terraform" },
      { cmd: "status", output: "Available" },
    ],
  },
  stats: [],
  work: {
    title: "Work",
    empty: "No projects to show yet.",
    status: {
      done: "Completed",
      in_progress: "In progress",
      archived: "Archived",
    },
    back: "Back to projects",
    problem: "Problem",
    solution: "Solution",
    results: "Results",
    stack: "Tech stack",
    gallery: "Gallery",
    code: "Code",
    demo: "Live demo",
  },
  about: {
    title: "About",
    intro:
      "I design and build modern web and mobile applications, from design to infrastructure — for companies and ambitious entrepreneurs.",
    photoAlt: "Portrait of Yassine ANZAR BASHA",
    timeline: [
      {
        period: "Jul. 2025 — Present",
        role: "Full Stack Developer",
        org: "Crédit Agricole Leasing & Factoring",
        summary:
          "Application redesign to Angular and Java 21, UI component library development.",
      },
      {
        period: "Sep. 2024 — Jun. 2025",
        role: "Cloud Solutions Developer",
        org: "Crédit Agricole Assurances",
        summary:
          "Development and integration of cloud solutions on the ServiceNow platform.",
      },
      {
        period: "Jan. 2023 — Feb. 2023",
        role: "Full Stack Developer (Intern)",
        org: "Ceos Tech",
        summary:
          "Website development for fast-food businesses in a digital web agency.",
      },
    ],
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
    title: "Let's work together",
    intro:
      "Have a role to fill or a question? Write to me — I reply within 24h.",
    email: "Email",
    copy: "Copy",
    copied: "Copied!",
    form: {
      name: "Name",
      namePlaceholder: "John Doe",
      email: "Email",
      emailPlaceholder: "john@example.com",
      subject: "Subject",
      subjectPlaceholder: "Choose a subject...",
      subjects: ["Job opportunity", "Question", "Other"],
      message: "Message",
      messagePlaceholder: "Describe your project or your need...",
      submit: "Send message",
      sending: "Sending...",
      successTitle: "Message sent!",
      successText: "I will get back to you within 24 hours.",
      another: "Send another message",
      error: "Something went wrong. Try again or email me directly.",
    },
  },
  footer: {
    rights: "Yassine ANZAR BASHA",
  },
};

export default en;
