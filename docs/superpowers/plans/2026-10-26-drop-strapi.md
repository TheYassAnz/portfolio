# Abandon de Strapi — plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer Strapi par un fichier de contenu TypeScript dans le dépôt, avec images locales, et supprimer tout le code et l'infra Strapi.

**Architecture:** `app/src/content/projects.ts` contient un tableau `ProjectEntry[]` (bloc `fr` complet, bloc `en` partiel). `app/src/lib/projects.ts` le transforme en `Project` localisé, avec un repli FR champ par champ. Les accesseurs deviennent synchrones et remplacent ceux de `lib/strapi.ts` avec la même forme de `Project`, donc les composants ne changent que leurs imports et leurs `await`.

**Tech Stack:** Next.js 16, TypeScript strict, `node --test` (Node 26, TS natif).

**Spec:** `docs/superpowers/specs/2026-10-26-drop-strapi-design.md`

**Branche :** `feat/drop-strapi`, créée depuis `feat/brutalist-redesign` (la PR #4 n'est pas encore fusionnée).

## Global Constraints

- Aucune nouvelle dépendance npm.
- Le type `Project` garde exactement ses champs actuels : `slug, title, description, longDescription, image, stack, github?, demo?, status, role?, year?, problem, solution, results, gallery`.
- `ProjectStatus = "done" | "in_progress" | "archived"`.
- Les images sont des chemins absolus sous `/projects/<slug>/`, servis depuis `app/public/`. Image absente = `""`, galerie absente = `[]`.
- Les tests importent avec l'extension `.ts`, et les imports de types utilisent `import type`. Pas d'alias `@/` dans `lib/projects.ts` ni dans `content/projects.ts` (ils doivent être chargeables par `node --test`).
- Chaque tâche finit avec `npm run lint`, `npx tsc --noEmit`, `npm test` et `npm run build` qui passent (depuis `app/`).

## Review Focus

1. **Projet sans bloc `en`** : `/en/projects/<slug>` affiche le contenu FR au lieu d'une 404 ou de champs vides → test dans Task 1.
2. **Bloc `en` partiel** (par exemple seulement `title`) : les autres champs viennent du FR, et aucun champ ne devient `undefined` → test dans Task 1.
3. **Faute dans le fichier de contenu** : slug en double ou chemin d'image qui n'existe pas dans `public/` → le test échoue au lieu de produire une image cassée en prod → test dans Task 1.
4. **Slug inconnu** : `getProject` renvoie `null`, donc la page renvoie une 404 → test dans Task 1.
5. **Références Strapi oubliées** (variables d'env, `remotePatterns`, route revalidate, docs) : le build et le grep final ne trouvent plus rien → vérification dans Task 2.

---

### Task 1: Contenu et accesseurs locaux

**Files:**
- Create: `app/src/lib/projects.ts`
- Create: `app/src/lib/projects.test.ts`
- Create: `app/src/content/projects.ts`

**Interfaces:**
- Produces (dans `lib/projects.ts`) :
  - `type ProjectStatus = "done" | "in_progress" | "archived"`
  - `type Project` : les champs listés dans Global Constraints.
  - `type LocalizedFields = { title: string; description: string; longDescription: string; role?: string; problem: string; solution: string; results: string }`
  - `type ProjectEntry = { slug: string; status: ProjectStatus; stack: string[]; year?: number; github?: string; demo?: string; image?: string; gallery?: string[]; fr: LocalizedFields; en?: Partial<LocalizedFields> }`
  - `localize(entry: ProjectEntry, lang: Locale): Project` : renvoie `{ ...entry.fr, ...entry.en (si lang === "en") }` plus les champs communs. Les clés `en` à `undefined` ou `""` ne remplacent pas la valeur FR. `image` vaut `""` par défaut, `gallery` vaut `[]`.
  - `getProjects(lang: Locale): Project[]` (ordre du tableau), `getProject(slug: string, lang: Locale): Project | null`, `getProjectSlugs(): string[]`, `toParagraphs(text: string): string[]` (repris tel quel de `lib/strapi.ts`).
- Produces (dans `content/projects.ts`) : `export const projects: ProjectEntry[]`.

- [ ] **Step 1: Écrire les tests qui échouent** — `app/src/lib/projects.test.ts`

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { localize, getProject, getProjects, getProjectSlugs, toParagraphs } from "./projects.ts";
import type { ProjectEntry } from "./projects.ts";

const entry: ProjectEntry = {
  slug: "demo", status: "done", stack: ["Next.js"],
  fr: { title: "Démo", description: "desc fr", longDescription: "", problem: "p fr", solution: "", results: "" },
  en: { title: "Demo", problem: "" },
};

test("localize en overrides only provided non-empty fields", () => {
  const p = localize(entry, "en");
  assert.equal(p.title, "Demo");
  assert.equal(p.description, "desc fr");
  assert.equal(p.problem, "p fr");
  assert.equal(p.image, "");
  assert.deepEqual(p.gallery, []);
});

test("localize without en block falls back to fr", () => {
  assert.equal(localize({ ...entry, en: undefined }, "en").title, "Démo");
});

test("getProject returns null for unknown slug", () => {
  assert.equal(getProject("nope", "fr"), null);
});

test("content: slugs are unique and migrated projects exist", () => {
  const slugs = getProjectSlugs();
  assert.equal(new Set(slugs).size, slugs.length);
  for (const s of ["portfolio", "course-list", "boxing-timer"]) assert.ok(slugs.includes(s), s);
});

test("content: every image path exists in public/", () => {
  for (const p of getProjects("fr")) {
    for (const src of [p.image, ...p.gallery].filter(Boolean)) {
      assert.ok(src.startsWith(`/projects/${p.slug}/`), src);
      assert.ok(existsSync(new URL(`../../public${src}`, import.meta.url)), src);
    }
  }
});

test("toParagraphs splits on blank lines and drops empties", () => {
  assert.deepEqual(toParagraphs("a\n\n\nb\n"), ["a", "b"]);
});
```

- [ ] **Step 2: Lancer les tests et vérifier qu'ils échouent**

Run : `cd app && npm test`
Attendu : FAIL avec `Cannot find module './projects.ts'`.

- [ ] **Step 3: Implémenter `lib/projects.ts`** avec les signatures de l'Interfaces block. `lib/projects.ts` importe `projects` depuis `../content/projects.ts` et `type Locale` depuis `./i18n.ts`.

- [ ] **Step 4: Écrire `content/projects.ts`** avec les 3 projets publiés de `backend/.tmp/data.db`, dans cet ordre : `portfolio` (ancien slug `project`), `course-list`, `boxing-timer`. Pour chacun, reprendre exactement `title`, `description`, `stack`, `github` et `projectStatus` :

```bash
sqlite3 -json backend/.tmp/data.db "select slug, title, description, stack, github, demo, project_status from projects where published_at is not null;"
```

Les autres champs FR valent `""`. Pas de bloc `en`, pas d'`image`, pas de `gallery`, pas de `year` ni de `role` : ils restent à écrire. Mettre un commentaire d'une ligne en tête de fichier qui explique comment ajouter un projet et où placer les images.

- [ ] **Step 5: Lancer les tests et vérifier qu'ils passent**

Run : `cd app && npm test`
Attendu : tous les tests de `projects.test.ts` passent, et les tests existants aussi.

- [ ] **Step 6: Commit**

```bash
git add app/src/lib/projects.ts app/src/lib/projects.test.ts app/src/content/projects.ts
git commit -m "feat: local project content with per-field fr fallback"
```

### Task 2: Brancher les composants et supprimer Strapi

**Files:**
- Modify: `app/src/components/project-section.tsx` (`getProjects` synchrone depuis `@/lib/projects`, retirer `async`/`await`)
- Modify: `app/src/app/[lang]/projects/[slug]/page.tsx` (imports depuis `@/lib/projects`, plus de `await` sur `getProject` ni `getProjectSlugs`)
- Modify: `app/src/components/ui/project-card.tsx`, `app/src/components/ui/animated-project-grid.tsx`, `app/src/content/fr.ts` (imports de types vers `@/lib/projects`)
- Modify: `app/next.config.ts` (supprimer `images.remotePatterns` et les variables Strapi/Cloudinary ; ne garder que ce qui reste nécessaire)
- Modify: `.claude/CLAUDE.md` (projets dans `src/content/projects.ts`, images dans `public/projects/<slug>/`, comment ajouter un projet ; supprimer le paragraphe Strapi i18n, le runbook de migration, `backend/` et les variables `STRAPI_URL`, `CLOUDINARY_NAME`, `REVALIDATE_SECRET`)
- Delete: `app/src/lib/strapi.ts`, `app/src/lib/strapi.test.ts`, `app/src/app/api/revalidate/route.ts`, `backend/`

**Interfaces:**
- Consumes: `getProjects`, `getProject`, `getProjectSlugs`, `toParagraphs`, `type Project`, `type ProjectStatus` de Task 1.

- [ ] **Step 1:** Faire les modifications listées. `ProjectSection` garde son comportement : elle renvoie `null` quand la liste est vide.
- [ ] **Step 2:** Supprimer les fichiers listés (`git rm -r backend app/src/lib/strapi.ts app/src/lib/strapi.test.ts app/src/app/api/revalidate`).
- [ ] **Step 3: Vérifier qu'aucune référence ne reste**

Run : `grep -rniE "strapi|cloudinary|STRAPI_URL|REVALIDATE_SECRET|revalidatePath|remotePatterns" app/src app/next.config.ts .claude/CLAUDE.md`
Attendu : aucune sortie.

- [ ] **Step 4: Vérifier le build et les pages**

Run : `cd app && npm run lint && npx tsc --noEmit && npm test && npm run build`
Attendu : tout passe. La sortie du build liste `/fr/projects/portfolio`, `/fr/projects/course-list`, `/fr/projects/boxing-timer` et les 3 équivalents `/en`, et plus de route `/api/revalidate`.
Puis `npx next start -p 3500` en arrière-plan :
- `curl -s localhost:3500/en | grep -c 'href="/en/projects/'` → `3` ;
- `curl -so /dev/null -w '%{http_code}' localhost:3500/fr/projects/nope` → `404`.
Arrêter le serveur.

- [ ] **Step 5: Commit**

```bash
git add -A app .claude/CLAUDE.md backend
git commit -m "refactor: drop strapi, serve projects from repo content"
```

## Après exécution (Yassine)

- Supprimer le projet Railway et le webhook Strapi s'il existe. Retirer `STRAPI_URL`, `CLOUDINARY_NAME` et `REVALIDATE_SECRET` sur Vercel.
- Compléter `content/projects.ts` : blocs `en`, `year`, `role`, problème/solution/résultats, images dans `app/public/projects/<slug>/`.
