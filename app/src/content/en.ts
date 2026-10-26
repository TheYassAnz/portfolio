import type { Dictionary } from "./index";

const TODO = "TO COMPLETE";

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
    switchLang: "Passer en français",
    menu: "Menu",
  },
  hero: {
    comment: "Available for new missions",
    firstName: "Yassine",
    lastName: "ANZAR BASHA",
    stackLine: "Full-Stack Developer",
    cta: "See my work",
    contactCta: "Book a call",
    terminal: [
      { cmd: "whoami", output: "Yassine ANZAR BASHA" },
      { cmd: "title", output: "Full-Stack Developer" },
      { cmd: "location", output: "Paris, France" },
      { cmd: "stack", output: "React · Next.js · Expo · K8s · Terraform" },
      { cmd: "status", output: "Available" },
    ],
  },
  stats: [
    { value: TODO, label: TODO },
    { value: TODO, label: TODO },
    { value: TODO, label: TODO },
    { value: TODO, label: TODO },
  ],
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
      { period: TODO, role: TODO, org: TODO, summary: TODO },
      { period: TODO, role: TODO, org: TODO, summary: TODO },
      { period: TODO, role: TODO, org: TODO, summary: TODO },
    ],
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
    title: "Let's work together",
    intro:
      "Book a 15-minute call or send me a message: I reply within 24 hours.",
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
      subjects: ["Freelance mission", "Hiring", "Collaboration", "Other"],
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
