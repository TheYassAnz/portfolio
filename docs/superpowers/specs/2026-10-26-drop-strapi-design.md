# Abandon de Strapi — projets dans le dépôt

Date : 2026-10-26 · Statut : validé (format, images, migration, nettoyage)

## Pourquoi

Le Strapi de prod (Railway) est hors ligne et c'est la seule pièce du site qui casse. Une seule personne édite quelques projets : un serveur, une base et un CMS n'apportent rien. Le site devient entièrement statique sur Vercel.

## Décisions

- **Format** : un fichier TypeScript typé, `app/src/content/projects.ts`. Une faute de saisie (champ manquant, statut inconnu) casse le build. Les paragraphes longs sont séparés par une ligne vide, comme aujourd'hui (`toParagraphs`).
- **Ordre** : l'ordre du tableau est l'ordre d'affichage.
- **Traduction** : chaque projet a un bloc `fr` complet et un bloc `en` facultatif et partiel. En EN, chaque champ absent retombe sur la valeur FR (repli champ par champ).
- **Images** : dans `app/public/projects/<slug>/`, référencées par chemin absolu (`/projects/<slug>/cover.jpg`). Plus de Cloudinary ni d'images distantes.
- **Migration** : reprendre les 3 projets publiés de `backend/.tmp/data.db` : Portfolio, Course List, Boxing Timer (titre, description FR, stack, GitHub, statut `done`). Le slug `project` devient `portfolio`. Les textes EN, l'année, le rôle, les champs problème/solution/résultats et les images restent à écrire par Yassine.
- **Nettoyage** : supprimer `backend/`, `app/src/lib/strapi.ts` et son test, la route `/api/revalidate`, les `remotePatterns` de `next.config.ts`, et les variables `STRAPI_URL`, `CLOUDINARY_NAME` et `REVALIDATE_SECRET`.

## Comportement attendu

- L'accueil liste les projets dans l'ordre du fichier. La section Travaux reste masquée si le tableau est vide.
- `/fr/projects/<slug>` et `/en/projects/<slug>` sont générés au build pour chaque projet. Un slug inconnu renvoie une 404.
- Aucune requête réseau pour afficher un projet.

## Hors périmètre

Rendu Markdown riche, CMS de remplacement, pages par tag ou par année.
