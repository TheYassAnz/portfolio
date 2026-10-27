# Retrait du téléchargement du CV — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Supprimer tous les liens `[ cv.pdf ]` du site et les clés de dictionnaire associées.

**Architecture:** Suppression pure, sans nouveau code. Trois liens à retirer (navbar desktop, menu mobile, hero), deux clés dans les dictionnaires (`nav.cv`, `nav.cvHref`), une ligne dans `.claude/CLAUDE.md`. Comme `Dictionary = typeof fr`, retirer les clés fait échouer le build sur tout usage oublié.

**Tech Stack:** Next.js 16, TypeScript strict, Tailwind CSS 4.

**Spec:** Demande du 2026-10-27 : « retirer la fonctionnalité de téléchargement du cv ».

## Global Constraints

- Aucun lien vers `/cv-fr.pdf` ou `/cv-en.pdf` ne reste dans `app/src`.
- `app/public/cv-fr.pdf` et `app/public/cv-en.pdf` ne sont **pas** supprimés par ce plan : ils ne sont pas suivis par git, donc les effacer serait définitif. Le propriétaire décide à part.
- Le hero garde un bouton principal : `$ contact` reprend le style plein `bg-accent text-on-accent` qu'avait `[ cv.pdf ]`.
- Brutalisme : coins carrés, bordures 1px, pas d'ombre.

## Review Focus

1. Navbar entre 640px et 768px (`sm` à `md`) : le lien CV y était visible à côté de LangSwitch et ThemeToggle ; sans lui, le bloc de droite reste aligné à droite (`ml-auto`), sans trou.
2. Menu mobile (< 640px) : le dernier `<li className="sm:hidden">` disparaît ; la liste se termine sur le dernier lien d'ancre, sans bordure orpheline.
3. Hero : `$ contact` devient le seul bouton, en style plein ; son survol ne doit pas rendre le texte illisible (retirer `hover:text-accent-ink`, qui donnerait un texte accent sur fond accent).
4. Un ancien lien direct vers `/cv-fr.pdf` répond toujours tant que le fichier existe dans `public/` ; c'est voulu et attendu (voir Global Constraints).
5. Pages FR et EN : aucune des deux ne doit encore afficher `[ cv.pdf ]`.

---

### Task 1: Retirer les liens et les clés CV

**Files:**
- Modify: `app/src/components/navbar.tsx` (le `<a href={nav.cvHref}>` du bloc `ml-auto` et le `<li className="sm:hidden">` du menu mobile)
- Modify: `app/src/components/hero-section.tsx` (le `<a href={dict.nav.cvHref}>` et le style du `<Link href="#contact">`)
- Modify: `app/src/content/fr.ts`, `app/src/content/en.ts` (supprimer `cv` et `cvHref` dans `nav`)
- Modify: `.claude/CLAUDE.md` (retirer `public/cv-fr.pdf`, `public/cv-en.pdf` de « Content still to provide »)

**Interfaces:**
- Consumes: rien
- Produces: `Dictionary["nav"]` sans `cv` ni `cvHref`

- [ ] **Step 1: Retirer les clés des dictionnaires d'abord**

Supprimer `cv` et `cvHref` de `nav` dans `fr.ts` et `en.ts`.

- [ ] **Step 2: Vérifier que le build échoue (test rouge)**

Run: `cd app && npx tsc --noEmit`
Expected: FAIL avec `Property 'cvHref' does not exist` dans `navbar.tsx` (2 fois) et `hero-section.tsx` (1 fois). Exactement trois erreurs, ce qui prouve qu'aucun autre usage n'existe.

- [ ] **Step 3: Retirer les trois liens**

- `navbar.tsx` : supprimer le `<a … download>[ cv.pdf ]</a>` du bloc `ml-auto` et le `<li className="sm:hidden">…</li>` du menu mobile.
- `hero-section.tsx` : supprimer le `<a … download>`. Le `<Link href="#contact">` prend `className="bg-accent px-5 py-3 text-on-accent"`.
- `.claude/CLAUDE.md` : la ligne devient « **Content still to provide:** real stats in the dictionaries. » (la photo et la timeline sont déjà fournies).

- [ ] **Step 4: Vérifier que tout repasse**

Run: `cd app && npx tsc --noEmit && npm run lint && npm run build && grep -rn -i "cv" src`
Expected: tsc, lint et build sans erreur ; `grep` ne renvoie rien.

- [ ] **Step 5: Vérifier dans le navigateur**

Sur `/fr` et `/en` avec `npm run dev` :
- 1280px : pas de `[ cv.pdf ]` dans la navbar ni dans le hero ; `$ contact` est en style plein et défile jusqu'à `#contact` (Review Focus 3, 5).
- 700px : le bloc LangSwitch / ThemeToggle reste aligné à droite (Review Focus 1).
- 375px : le menu ouvert ne contient que les liens d'ancre (Review Focus 2).

- [ ] **Step 6: Commit**

```bash
git add app/src/components/navbar.tsx app/src/components/hero-section.tsx app/src/content/fr.ts app/src/content/en.ts .claude/CLAUDE.md docs/superpowers/plans/2026-10-27-remove-cv-download.md
git commit -m "feat: remove CV download links"
```
