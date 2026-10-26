# Refonte du portfolio — direction brutaliste / tech

Date : 2026-10-26 · Statut : validé (direction, accent, fonctionnalités)

## Objectif

Transformer yassanz.com d'un site « freelance générique » en portfolio de développeur full-stack qui convainc un **recruteur en CDI** en moins d'une minute : qui je suis, ce que j'ai construit, mon parcours, mon CV.

## Ce qui ne marche pas aujourd'hui

- La section Projets est vide en production : le service Strapi sur Railway (`strapi-portfolio-prod.up.railway.app`) répond « Application not found ». Le code journalise désormais l'erreur et masque la section ; **il faut restaurer le service sur Railway** (hors code).
- Le design reprend le « template dev 2024 » : navbar en pilule, nom en dégradé, terminal incliné, cartes de services.
- Le contenu vise des clients freelance (Services, Calendly) et pas des recruteurs : pas de parcours, pas de photo, pas de CV.
- Les couleurs ne vont pas ensemble : fond noir pur avec des cartes bleu marine `#14213d`.
- La route `/api/contact` injecte le nom et le message sans échappement dans le HTML de l'email.

## Direction visuelle

Brutaliste / tech : grilles visibles, filets de 1px, aucun arrondi, typo mono pour l'interface, grotesque serrée pour les titres, une seule couleur d'accent.

| Token | Sombre (défaut) | Clair |
|---|---|---|
| `bg` | `#0A0A0A` | `#F2F0EA` |
| `fg` | `#E8E8E8` | `#0A0A0A` |
| `fg-muted` | `#8A8A8A` | `#5C5A55` |
| `line` (filets, grille) | `#2A2A2A` | `#D6D2C7` |
| `accent` (fonds pleins) | `#C6FF3D` | `#C6FF3D` |
| `accent-ink` (texte accent) | `#C6FF3D` | `#4D7A00` |
| `on-accent` (texte sur accent) | `#0A0A0A` | `#0A0A0A` |

- Polices (next/font/google) : **Space Grotesk** 500 pour les titres, **JetBrains Mono** 400/500 pour le reste de l'interface et le texte courant.
- Fond : grille de 32px tracée avec `line`, sur `body`.
- Rayon : `0` partout. Bordures : `1px solid line`.
- Animations : sobres, avec une apparition au scroll (opacité + 8px) et le terminal tapé. `MotionConfig reducedMotion="user"`. Pas d'effet d'inclinaison (TiltCard supprimé).
- Libellés de navigation en style terminal : `~/yassanz`, `01 travaux`, `02 parcours`, `03 stack`, `04 contact`, `[ cv.pdf ]`.

## Structure de la page d'accueil

1. **Navbar** : barre d'onglets à filets, avec le CV, la langue (FR/EN) et le thème.
2. **Hero** : commentaire `// développeur full-stack · paris`, nom `YASSINE ANZAR_BASHA`, stack en une ligne, CTA `[ cv.pdf ]` (accent) et `$ contact`. Le terminal tapé (existant, restylé) est à droite sur desktop.
3. **Chiffres clés** : bande de 4 cellules sous le hero (valeur + libellé).
4. **Travaux** (`#projects`) : liste de projets en lignes numérotées (n°, titre, année, stack, statut) ; chaque ligne mène à l'étude de cas.
5. **Parcours** (`#about`) : photo + court texte, puis frise des expériences et formations (période, poste, structure, une ligne).
6. **Stack** (`#stack`) : remplace Services, avec des compétences groupées (Front, Mobile, Back, Infra/DevOps, Design).
7. **Contact** (`#contact`) : remplace Calendly. Email copiable, LinkedIn, GitHub et formulaire existant restylé.
8. **Footer** : une ligne mono.

## Fonctionnalités

### Études de cas — `/[lang]/projects/[slug]`
Sections : en-tête (titre, rôle, année, statut, liens GitHub/démo), contexte/problème, solution, résultats, stack, galerie. Elles remplacent la modale projet (supprimée). Champs Strapi ajoutés au type `Project` : `role` (string), `year` (integer), `problem`, `solution`, `results` (text, paragraphes séparés par une ligne vide), `gallery` (media multiple). `longDescription` est conservé comme intro.

### FR / EN
- Routes préfixées `/fr/...` et `/en/...`. `proxy.ts` redirige toute URL sans préfixe vers la même URL préfixée, en choisissant `en` si `Accept-Language` commence par `en`, sinon `fr`.
- Les textes de l'interface sont dans `src/content/fr.ts` et `src/content/en.ts`. `en` est typé `Dictionary = typeof fr` : une clé manquante casse le build.
- Projets : plugin i18n de Strapi 5 sur les champs texte, avec le même `slug` dans les deux langues. Si la version EN n'existe pas, on retombe sur la FR.
- Le sélecteur de langue garde le chemin courant.
- Métadonnées : `alternates.languages` (hreflang) sur chaque page.

### Thème clair / sombre
Sombre par défaut si aucune préférence n'est enregistrée et que `prefers-color-scheme` ne demande pas le clair. Le bouton bascule la classe `light` sur `<html>` et l'enregistre dans `localStorage["theme"]`. Un script inline dans `<head>` applique la classe avant le premier rendu, sans flash.

### Parcours + photo
Photo `public/me.jpg` via `next/image`. Les entrées de la frise et le texte sont dans les dictionnaires.

### Chiffres clés
4 entrées `{ value, label }` dans les dictionnaires.

## Hors périmètre

Blog, palette ⌘K, statut en direct, images OG dynamiques, Calendly, témoignages.

## Contenu à fournir par Yassine

| Élément | Fichier | Nécessaire pour |
|---|---|---|
| Photo carrée ≥ 800px | `app/public/me.jpg` | Parcours |
| CV FR et EN | `app/public/cv-fr.pdf`, `app/public/cv-en.pdf` | Navbar, Hero |
| Expériences et formations (période, poste, structure, une ligne) | `src/content/fr.ts` / `en.ts` | Parcours |
| 4 chiffres clés | idem | Chiffres clés |
| Textes des études de cas + traductions EN | Strapi | Études de cas |
| Service Strapi Railway restauré | Railway + `STRAPI_URL` sur Vercel | Travaux |
