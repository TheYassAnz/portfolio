# Refonte brutaliste du portfolio — plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refaire yassanz.com en direction brutaliste / tech, bilingue FR/EN, thème clair/sombre, orienté recruteur (études de cas, parcours, chiffres clés, CV).

**Architecture:** Routes App Router sous `src/app/[lang]/`, `proxy.ts` pour la redirection de langue, dictionnaires TS typés pour les textes de l'interface, projets depuis Strapi 5 (plugin i18n, repli FR). Les couleurs sont des variables CSS exposées comme tokens Tailwind 4 ; le thème bascule via la classe `light` sur `<html>`.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Tailwind CSS 4, framer-motion, Strapi 5.8, `node --test` (Node 26, TS natif).

**Spec:** `docs/superpowers/specs/2026-10-26-portfolio-redesign-design.md`

## Global Constraints

- Tokens couleur exacts de la spec : bg `#0A0A0A`/`#F2F0EA`, fg `#E8E8E8`/`#0A0A0A`, fg-muted `#8A8A8A`/`#5C5A55`, line `#2A2A2A`/`#D6D2C7`, accent `#C6FF3D`, accent-ink `#C6FF3D`/`#4D7A00`, on-accent `#0A0A0A`.
- Utiliser uniquement les classes Tailwind `bg-bg text-fg text-fg-muted border-line bg-accent text-accent-ink text-on-accent` ; aucun hex dans les composants.
- Rayon 0 et bordures `1px` partout : aucune classe `rounded-*`.
- Polices : `Space Grotesk` 500 (`font-display`), `JetBrains Mono` 400/500 (`font-mono`, police du `body`).
- Aucun texte d'interface en dur dans un composant : tout passe par `Dictionary`.
- Pas de nouvelle dépendance npm. Supprimer `react-calendly` (inutilisé).
- Conventions du repo : sections `<Name>Section` dans `src/components/`, UI dans `src/components/ui/`, `"use client"` seulement si nécessaire, alias `@/*`.
- Chaque tâche finit avec `npm run lint`, `npx tsc --noEmit` et `npm test` verts (depuis `app/`).

## Review Focus

1. **Strapi injoignable** (cas réel aujourd'hui) : l'accueil s'affiche sans section Travaux, `/fr/projects/x` renvoie la 404 Next, le build ne plante pas → test dans Task 4.
2. **Projet sans version EN** : `/en/projects/x` affiche la version FR au lieu d'une 404 → test dans Task 4.
3. **Anciennes URL sans préfixe** partagées sur LinkedIn (`/projects/x`, `/#projects`) : redirection vers `/fr/projects/x` ou `/en/...`, avec chemin et query conservés ; `/api/*` et les assets ne sont jamais redirigés → test de `negotiateLocale` dans Task 2 + vérif curl.
4. **Flash de thème** au chargement en mode clair : aucune frame sombre, aucun warning d'hydratation → vérif navigateur dans Task 1.
5. **Mobile 375px** : le nom `ANZAR_BASHA` en grand et la grille de fond ne créent aucun scroll horizontal → vérif navigateur dans Task 3 et Task 9.

---

### Task 1: Tokens, polices et thème clair/sombre

**Files:**
- Modify: `app/src/app/globals.css`
- Modify: `app/src/app/layout.tsx`
- Create: `app/src/components/ui/theme-toggle.tsx`
- Modify: `app/package.json` (retirer `react-calendly`, ajouter `"test": "node --test 'src/**/*.test.ts'"`)
- Modify: `app/tsconfig.json` (`"allowImportingTsExtensions": true`, pour que les tests importent `./x.ts`)

**Interfaces:**
- Produces: utilitaires Tailwind `bg-bg`, `text-fg`, `text-fg-muted`, `border-line`, `bg-accent`, `text-accent-ink`, `text-on-accent`, `font-display`, `font-mono` ; classe `.grid-bg` ; `ThemeToggle({ label }: { label: string })` (client) ; constante `THEME_SCRIPT: string` exportée par `theme-toggle.tsx`.

- [ ] **Step 1:** Dans `globals.css`, remplacer le bloc `@theme` par des tokens `--color-bg|fg|fg-muted|line|accent|accent-ink|on-accent` pointant vers des variables `:root` (valeurs sombres) surchargées sous `html.light` (valeurs claires), avec les valeurs exactes des Global Constraints. Ajouter `--font-display: var(--font-space-grotesk)` et `--font-mono: var(--font-jetbrains)`. Ajouter `.grid-bg` : deux `linear-gradient` 1px en `var(--color-line)`, `background-size: 32px 32px`.
- [ ] **Step 2:** `THEME_SCRIPT`, script inline (chaîne) : `light` si `localStorage.theme === "light"`, ou si aucune valeur n'est stockée et que `matchMedia('(prefers-color-scheme: light)').matches` ; il ajoute alors la classe `light` à `document.documentElement`. Enveloppé dans un `try/catch` (localStorage peut lever une exception).
- [ ] **Step 3:** `ThemeToggle` : bouton mono `[ ☾ ]`/`[ ☀ ]` avec `aria-label={label}`. Au clic, il bascule `light` sur `<html>` et écrit `localStorage.theme` (dans un `try/catch`). L'état initial est lu dans un `useEffect` (pas de lecture du DOM pendant le rendu).
- [ ] **Step 4:** `layout.tsx` : remplacer Inter/DM Serif par `Space_Grotesk({ weight: "500", variable: "--font-space-grotesk" })` et `JetBrains_Mono({ weight: ["400","500"], variable: "--font-jetbrains" })`. `<html suppressHydrationWarning>`, `<head><script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} /></head>`, `body` en `grid-bg bg-bg text-fg font-mono`, enveloppé dans `<MotionConfig reducedMotion="user">` via un petit wrapper client si nécessaire.
- [ ] **Step 5: Vérifier.** `npm run dev`, ouvrir `http://localhost:3000`, exécuter `localStorage.theme='light'` puis recharger : le fond est `#F2F0EA` dès la première frame, sans warning d'hydratation dans la console. Ensuite `npm run lint && npx tsc --noEmit` doit passer.
- [ ] **Step 6: Commit** `feat: brutalist design tokens, fonts and theme toggle`

### Task 2: Routage FR/EN et dictionnaires

**Files:**
- Create: `app/src/lib/i18n.ts`, `app/src/lib/i18n.test.ts`
- Create: `app/src/content/fr.ts`, `app/src/content/en.ts`, `app/src/content/index.ts`
- Create: `app/src/proxy.ts`
- Move: `app/src/app/layout.tsx` → `app/src/app/[lang]/layout.tsx`, `app/src/app/page.tsx` → `app/src/app/[lang]/page.tsx`, `app/src/app/projects/` → `app/src/app/[lang]/projects/`
- Modify: `app/src/app/api/revalidate/route.ts`

**Interfaces:**
- Produces:
  - `locales = ["fr", "en"] as const` ; `type Locale = (typeof locales)[number]` ; `isLocale(v: string): v is Locale` ; `negotiateLocale(acceptLanguage: string | null): Locale` — dans `i18n.ts`, sans import alias (testable par `node --test`).
  - `type Dictionary = typeof fr` ; `getDictionary(lang: Locale): Dictionary` dans `content/index.ts`.
  - Forme de `fr` (clés requises, valeurs reprises du site actuel quand elles existent) : `meta { title, description }`, `nav { home, work, about, stack, contact, cv, cvHref, theme, switchLang }`, `hero { comment, firstName, lastName, stackLine, cta, contactCta, terminal: { cmd, output }[] }`, `stats: { value: string; label: string }[]` (4), `work { title, empty, status: Record<ProjectStatus,string>, back, problem, solution, results, stack, gallery, code, demo }`, `about { title, intro, photoAlt, timeline: { period, role, org, summary }[] }`, `stack { title, groups: { name, items: string[] }[] }`, `contact { title, intro, email, copy, copied, form: {...libellés et messages de ContactForm} }`, `footer { rights }`.
  - Les pages reçoivent `params: Promise<{ lang: string }>` ; chaque page/layout fait `if (!isLocale(lang)) notFound()`.

- [ ] **Step 1: Test qui échoue** — `i18n.test.ts` :

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { negotiateLocale, isLocale } from "./i18n.ts";

test("negotiateLocale", () => {
  assert.equal(negotiateLocale(null), "fr");
  assert.equal(negotiateLocale(""), "fr");
  assert.equal(negotiateLocale("en-US,en;q=0.9"), "en");
  assert.equal(negotiateLocale("fr-FR,fr;q=0.9,en;q=0.8"), "fr");
  assert.equal(negotiateLocale("de-DE,de;q=0.9"), "fr");
});

test("isLocale", () => {
  assert.equal(isLocale("en"), true);
  assert.equal(isLocale("de"), false);
});
```

- [ ] **Step 2:** `npm test` → FAIL (module introuvable).
- [ ] **Step 3:** Implémenter `i18n.ts` : `negotiateLocale` renvoie `"en"` si la première langue de l'en-tête commence par `en`, sinon `"fr"`.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** `proxy.ts` (convention Next 16, ex-`middleware`) : si le premier segment n'est pas une locale, redirection 307 vers `/${negotiateLocale(...)}${pathname}${search}`. `config.matcher` exclut `api`, `_next`, et tout chemin contenant un point (assets, `cv-fr.pdf`, `favicon.ico`).
- [ ] **Step 6:** Déplacer les routes sous `[lang]`, avec `generateStaticParams` renvoyant `locales.map(lang => ({ lang }))` dans le layout. `<html lang={lang}>`. `generateMetadata` lit `meta` dans le dictionnaire et pose `alternates.languages = { fr: "/fr", en: "/en" }` (chemin équivalent sur les pages projet). Écrire `fr.ts` et `en.ts` (`const en: Dictionary = {...}`). Les valeurs de `stats` et `about.timeline` qui manquent encore portent un texte explicite `"À COMPLÉTER"` et sont listées dans le commit.
- [ ] **Step 7:** `revalidate/route.ts` : revalider `"/[lang]"` et `"/[lang]/projects/[slug]"` (type `"page"`).
- [ ] **Step 8: Vérifier.** `npm run build` doit passer. Avec `npm run start` : `curl -sI -H 'Accept-Language: en' localhost:3000/projects/x` renvoie `location: /en/projects/x` ; `curl -sI localhost:3000/` renvoie `location: /fr` ; `curl -sI localhost:3000/favicon.ico` renvoie 200 ; `curl -sI localhost:3000/de` renvoie 404.
- [ ] **Step 9: Commit** `feat: fr/en routing with typed dictionaries`

### Task 3: Navbar, Hero, Chiffres clés, Footer

**Files:**
- Rewrite: `app/src/components/navbar.tsx`, `app/src/components/hero-section.tsx`, `app/src/components/footer-section.tsx`
- Create: `app/src/components/stats-section.tsx`
- Modify: `app/src/components/ui/terminal.tsx` (lignes reçues en prop, sans emoji)
- Create: `app/src/components/ui/lang-switch.tsx`
- Delete: `app/src/components/ui/tilt-card.tsx`

**Interfaces:**
- Consumes: `Dictionary`, `Locale`, `ThemeToggle`.
- Produces: `Navbar({ dict, lang })`, `HeroSection({ dict })`, `StatsSection({ stats }: { stats: Dictionary["stats"] })`, `FooterSection({ dict })`, `LangSwitch({ lang, label })` (client, `usePathname` : remplace le premier segment par l'autre locale), `Terminal({ lines }: { lines: { cmd: string; output: string }[] })`.

- [ ] **Step 1:** `Navbar` : barre d'onglets séparés par `border-r border-line` : `~/yassanz` (onglet actif `bg-accent text-on-accent`, lien `/${lang}`), `01 travaux` `/${lang}#projects`, `02 parcours` `/${lang}#about`, `03 stack` `/${lang}#stack`, `04 contact` `/${lang}#contact` (préfixés pour fonctionner depuis une étude de cas), puis à droite `[ cv.pdf ]` (`href=dict.nav.cvHref`, `download`), `LangSwitch` et `ThemeToggle`. `sticky top-0 bg-bg border-b border-line`. Sous `md`, les 4 liens d'ancre passent dans un menu déroulant à filets (bouton avec `aria-expanded`).
- [ ] **Step 2:** `HeroSection` : `dict.hero.comment` en `text-fg-muted`, nom en `font-display` `text-5xl md:text-8xl tracking-tight leading-none break-words`, `stackLine`, puis CTA `[ cv.pdf ]` en `bg-accent text-on-accent` et `$ contact` en filet. `Terminal lines={dict.hero.terminal}` à droite à partir de `md`.
- [ ] **Step 3:** `StatsSection` : `grid grid-cols-2 md:grid-cols-4` de cellules à filets (`divide-x divide-y divide-line`) ; valeur en `font-display text-4xl`, libellé en `text-fg-muted text-xs`.
- [ ] **Step 4:** `FooterSection` : une ligne mono `© {année} Yassine ANZAR BASHA` + GitHub/LinkedIn (`aria-label` conservés), `border-t border-line`.
- [ ] **Step 5:** Brancher le tout dans `[lang]/layout.tsx` et `[lang]/page.tsx` (ordre de la spec).
- [ ] **Step 6: Vérifier.** Dans le navigateur : desktop 1280px puis mobile 375px, en FR/EN et clair/sombre. `document.documentElement.scrollWidth <= innerWidth` doit être vrai à 375px. `LangSwitch` sur `/fr` mène à `/en`. Le fichier `[ cv.pdf ]` se télécharge s'il est présent dans `public/`. Ensuite `npm run lint && npx tsc --noEmit && npm test`.
- [ ] **Step 7: Commit** `feat: brutalist navbar, hero, stats and footer`

### Task 4: Données projets — champs d'étude de cas et i18n Strapi

**Files:**
- Modify: `backend/src/api/project/content-types/project/schema.json`
- Modify: `app/src/lib/strapi.ts`
- Create: `app/src/lib/strapi.test.ts`

**Interfaces:**
- Consumes: `Locale` (importé via `./i18n.ts`).
- Produces : `Project` étendu avec `role?: string; year?: number; problem: string; solution: string; results: string; gallery: string[]` ; `getProjects(lang: Locale): Promise<Project[]>` ; `getProject(slug: string, lang: Locale): Promise<Project | null>` ; `getProjectSlugs(): Promise<string[]>` (locale fr) ; `toParagraphs(text: string): string[]`. `STATUS_LABELS` est supprimé (les libellés passent par `dict.work.status`).

- [ ] **Step 1:** Schéma Strapi : `"pluginOptions": { "i18n": { "localized": true } }` sur le type ; `localized: true` sur `title`, `description`, `longDescription`, `role`, `problem`, `solution`, `results` ; `localized: false` sur `slug`, `image`, `stack`, `github`, `demo`, `projectStatus`, `year`, `gallery`. Nouveaux attributs : `role` string, `year` integer, `problem`/`solution`/`results` text, `gallery` media `multiple: true`, images uniquement.
- [ ] **Step 2: Tests qui échouent** — `strapi.test.ts`, avec `mock.method(globalThis, "fetch", ...)` :

```ts
test("toParagraphs splits on blank lines and drops empties", () => {
  assert.deepEqual(toParagraphs("a\n\n\nb\n"), ["a", "b"]);
  assert.deepEqual(toParagraphs(""), []);
});
test("getProject falls back to fr when en is missing", async () => {
  // fetch: url contient "locale=en" → { data: [] } ; "locale=fr" → { data: [rawFixture] }
  assert.equal((await getProject("demo", "en"))?.title, rawFixture.title);
});
test("getProjects returns [] when Strapi is unreachable", async () => {
  // fetch rejette
  assert.deepEqual(await getProjects("fr"), []);
});
test("getProject returns null on 404", async () => {
  // fetch → { ok: false, status: 404 }
  assert.equal(await getProject("demo", "fr"), null);
});
```

- [ ] **Step 3:** `npm test` → FAIL.
- [ ] **Step 4:** Implémenter : ajouter `&locale=${lang}` aux requêtes et `populate[0]=image&populate[1]=gallery`. Si `lang !== "fr"` et que le résultat est vide, refaire la requête en `fr`. Garder le `console.error` + `return []`/`null` existants. Le slug va dans l'URL via `encodeURIComponent`.
- [ ] **Step 5:** `npm test` → PASS.
- [ ] **Step 6: Commit** `feat: case-study fields and localized projects from strapi`

### Task 5: Liste des travaux

**Files:**
- Rewrite: `app/src/components/project-section.tsx`, `app/src/components/ui/project-card.tsx`, `app/src/components/ui/animated-project-grid.tsx`
- Delete: `app/src/components/ui/project-modal.tsx`

**Interfaces:**
- Consumes: `getProjects(lang)`, `Dictionary["work"]`.
- Produces: `ProjectSection({ lang, dict })` (server, `id="projects"`, renvoie `null` si la liste est vide — comportement actuel conservé), `ProjectCard({ project, index, lang, dict })` (un `<Link>` vers `/${lang}/projects/${slug}`).

- [ ] **Step 1:** Ligne de projet en grille à filets : `01` (index sur 2 chiffres), titre en `font-display`, `year`, 3 techs maximum, statut `[ terminé ]`. Au survol : `bg-accent text-on-accent`. Sur mobile : titre + n° sur une ligne, méta en dessous.
- [ ] **Step 2:** `AnimatedProjectGrid` : apparition au scroll (opacité + `y: 8`), `stagger 0.05`. Pas de `whileHover` en JS : le survol est en CSS.
- [ ] **Step 3: Vérifier.** Avec Strapi en local (`cd backend && npm run develop`) et 2 projets publiés : les lignes s'affichent et le clic mène à `/fr/projects/<slug>`. Sans Strapi : la section est absente et la page s'affiche. Ensuite lint + tsc + test.
- [ ] **Step 4: Commit** `feat: brutalist project list linking to case studies`

### Task 6: Page d'étude de cas

**Files:**
- Rewrite: `app/src/app/[lang]/projects/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getProject(slug, lang)`, `getProjectSlugs()`, `toParagraphs`, `Dictionary["work"]`.

- [ ] **Step 1:** `generateStaticParams` : produit croisé de `locales` × `getProjectSlugs()`. `generateMetadata` : titre et description du projet, `alternates.languages` vers `/fr/projects/${slug}` et `/en/projects/${slug}`.
- [ ] **Step 2:** Mise en page : retour `← dict.work.back` vers `/${lang}#projects` ; en-tête à filets (titre `font-display`, `role · year · statut`, liens `[ code ]` `[ démo ]` s'ils existent) ; image principale `next/image` ; puis les blocs `problem`, `solution`, `results`, chacun en grille 2 colonnes (libellé mono à gauche, paragraphes `toParagraphs` à droite) et omis si vide ; la stack ; la galerie en grille `md:grid-cols-2`, avec un `alt` = `${title} — ${i + 1}`.
- [ ] **Step 3: Vérifier.** `/fr/projects/<slug>` et `/en/projects/<slug>` s'affichent ; un projet sans EN montre la FR ; un slug inconnu donne la 404. Ensuite `npm run build` + lint + tsc + test.
- [ ] **Step 4: Commit** `feat: case study page`

### Task 7: Parcours et Stack

**Files:**
- Create: `app/src/components/about-section.tsx`, `app/src/components/stack-section.tsx`
- Delete: `app/src/components/service-section.tsx`, `app/src/components/ui/service-card.tsx`, `app/src/components/ui/animated-service-grid.tsx`

**Interfaces:**
- Produces: `AboutSection({ dict }: { dict: Dictionary["about"] })` (`id="about"`), `StackSection({ dict }: { dict: Dictionary["stack"] })` (`id="stack"`). Les deux sont des composants serveur.

- [ ] **Step 1:** `AboutSection` : `md:grid-cols-[280px_1fr]`, avec `next/image` `/me.jpg` 280×280 (`alt={dict.photoAlt}`, `grayscale` + bordure `line`) et l'intro. Dessous, la frise en `<ol>` : chaque entrée sur une ligne à filet `period | role @ org | summary`.
- [ ] **Step 2:** `StackSection` : grille de groupes (`md:grid-cols-3`) ; titre du groupe en `text-accent-ink`, éléments en liste mono `> item`. Groupes et éléments viennent de la spec et du site actuel : Front (React, Next.js, TypeScript, Tailwind), Mobile (React Native, Expo), Back (Node.js, Strapi), Infra/DevOps (Terraform, Kubernetes, Jenkins), Design (Figma).
- [ ] **Step 3: Vérifier.** Dans le navigateur, en FR/EN, clair/sombre et 375px. Ensuite lint + tsc + test.
- [ ] **Step 4: Commit** `feat: about timeline and stack sections`

### Task 8: Contact (remplace Calendly) et sécurisation de l'API

**Files:**
- Create: `app/src/components/contact-section.tsx`
- Delete: `app/src/components/calendly-section.tsx`
- Modify: `app/src/components/ui/contact-form.tsx` (textes via props, style brutaliste)
- Create: `app/src/components/ui/copy-email.tsx`
- Modify: `app/src/app/api/contact/route.ts`
- Create: `app/src/lib/escape-html.ts`, `app/src/lib/escape-html.test.ts`

**Interfaces:**
- Produces: `ContactSection({ dict })` (`id="contact"`), `ContactForm({ dict }: { dict: Dictionary["contact"]["form"] })`, `CopyEmail({ email, copy, copied })` (client, `navigator.clipboard.writeText`, avec repli sur un lien `mailto:` si l'API est absente), `escapeHtml(s: string): string`.

- [ ] **Step 1: Test qui échoue** — `escapeHtml('<a href="x">&\'</a>')` doit renvoyer `'&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;'`.
- [ ] **Step 2:** `npm test` → FAIL ; implémenter ; `npm test` → PASS.
- [ ] **Step 3:** `route.ts` : passer `name`, `email`, `subject` et `message` dans `escapeHtml` avant de les injecter dans `html`. Rejeter avec 400 un `email` qui ne correspond pas à `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` ou un champ de plus de 5000 caractères.
- [ ] **Step 4:** `ContactSection` : à gauche `CopyEmail` + LinkedIn + GitHub en liste de commandes (`$ mail`, `$ linkedin`, `$ github`), à droite `ContactForm`. Champs à filets, sans arrondi, focus `outline outline-accent`. Le bouton d'envoi est en `bg-accent text-on-accent`.
- [ ] **Step 5: Vérifier.** En dev, envoyer le formulaire avec `<b>x</b>` dans le message : l'email reçu affiche le texte littéral. Un email invalide renvoie 400. Ensuite lint + tsc + test.
- [ ] **Step 6: Commit** `feat: contact section and escaped contact email`

### Task 9: Nettoyage et vérification finale

**Files:**
- Modify: `app/src/app/globals.css` (supprimer les keyframes et tokens inutilisés), `.claude/CLAUDE.md` (sections, couleurs, i18n, `npm test`)

- [ ] **Step 1:** `grep -rn "surface\|text-muted\|font-serif\|rounded-full\|STATUS_LABELS\|react-calendly" app/src` ne doit plus rien renvoyer.
- [ ] **Step 2:** Mettre à jour `.claude/CLAUDE.md` : ordre des sections, tokens, routes `[lang]`, dictionnaires et `npm test`.
- [ ] **Step 3: Vérifier.** `npm run build && npm run lint && npm test` doivent passer. Dans le navigateur, sur `/fr` et `/en`, en clair/sombre, à 375px et 1280px : pas de scroll horizontal, la navigation par ancres fonctionne, aucune erreur console. Lighthouse accessibilité ≥ 95 sur `/fr`.
- [ ] **Step 4: Commit** `chore: remove legacy styles and update CLAUDE.md`
