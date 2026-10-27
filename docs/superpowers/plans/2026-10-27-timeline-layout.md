# Timeline en rail vertical — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rendre la timeline du parcours (section About) lisible en remplaçant la ligne unique `date | poste @ org | résumé` par un rail vertical : un repère carré par poste, la date au-dessus, le poste et l'entreprise, puis le résumé en pleine largeur.

**Architecture:** Changement de rendu uniquement, dans `about-section.tsx` (composant serveur). Les données (`about.timeline` dans `fr.ts` / `en.ts`) ne changent pas.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4 (tokens de `globals.css`).

**Spec:** Disposition « C — rail vertical » choisie dans la conversation du 2026-10-27 (pas de document séparé).

## Global Constraints

- Brutalisme : aucun coin arrondi, bordures 1px `border-line`, aucune ombre.
- Tokens uniquement : `border-line`, `bg-accent`, `bg-bg`, `text-fg`, `text-fg-muted`, `font-mono`.
- Pas de nouveau composant ni de nouvelle dépendance ; pas de changement aux dictionnaires.
- Les dates ne sont jamais coupées sur deux lignes (`whitespace-nowrap`).
- Fonctionne en clair (`html.light`) et en sombre, en FR et en EN.

## Review Focus

1. Écran 375px avec un nom d'entreprise long (« Crédit Agricole Leasing & Factoring ») : le texte passe à la ligne sous le titre, sans dépasser horizontalement, et le rail reste aligné.
2. Repère du poste en cours : il est en `bg-accent` et doit rester visible en thème clair comme en thème sombre ; les autres repères (bordure seule) doivent rester visibles sur la grille de fond.
3. Le repère accentué cible le premier élément, ce qui suppose une timeline triée du plus récent au plus ancien (c'est le cas dans `fr.ts` et `en.ts`).
4. Le dernier poste : le rail ne doit pas dépasser bien en dessous du dernier résumé (pas de `padding-bottom` sur le dernier élément).
5. Lecteurs d'écran : les repères sont décoratifs (`aria-hidden`) ; l'ordre de lecture est date → poste → entreprise → résumé.

---

### Task 1: Rail vertical dans AboutSection

**Files:**
- Modify: `app/src/components/about-section.tsx` (le bloc `<ol>…</ol>`)

**Interfaces:**
- Consumes: `dict.timeline: { period: string; role: string; org: string; summary: string }[]` (inchangé)
- Produces: rien de réutilisé ailleurs

- [ ] **Step 1: Remplacer le `<ol>`**

Structure à obtenir :
- `<ol>` : `mt-10 ml-3 border-l border-line font-mono text-sm` (le `border-t` actuel disparaît).
- Chaque `<li>` (clé inchangée) : `relative pl-6 pb-8 last:pb-0`.
- Repère : `<span aria-hidden>` en `absolute -left-[5px] top-1 size-[9px]` ; `bg-accent` si `i === 0`, sinon `border border-line bg-bg`.
- Contenu, dans l'ordre :
  - `<p className="whitespace-nowrap text-xs text-fg-muted">{e.period}</p>`
  - `<p className="mt-1 text-fg">{e.role} <span className="text-fg-muted">@ {e.org}</span></p>`
  - `<p className="mt-1 text-fg-muted">{e.summary}</p>`
- Supprimer les deux `<span aria-hidden>|</span>`.

- [ ] **Step 2: Lint et build**

Run: `npm run lint && npm run build` (depuis `app/`)
Expected: aucune erreur ESLint, build terminé avec les routes `/[lang]` en SSG.

- [ ] **Step 3: Vérifier dans le navigateur**

Avec `npm run dev`, sur `/fr#about` puis `/en#about` :
- 1280px : la date est sur une seule ligne, le repère du premier poste est en accent, le rail s'arrête au dernier résumé (Review Focus 1, 3, 4).
- 375px : aucun défilement horizontal (`document.documentElement.scrollWidth === 375`), l'entreprise passe à la ligne proprement (Review Focus 1).
- Thème clair puis sombre via `ThemeToggle` : les deux types de repère restent visibles (Review Focus 2).
- Console sans erreur.

- [ ] **Step 4: Commit**

```bash
git add app/src/components/about-section.tsx
git commit -m "feat(about): vertical rail layout for timeline"
```
