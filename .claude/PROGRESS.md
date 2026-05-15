# Progress

## Phase 1 — Design system
- [ ] Ajouter les polices Playfair Display + Inter via `next/font`
- [ ] Appliquer la palette de couleurs (`#000000`, `#14213d`, `#fca311`, `#e5e5e5`) globalement
- [ ] Mettre à jour `globals.css` et `layout.tsx`

## Phase 2 — Navbar
- [ ] Ajouter les liens d'ancrage : Services, Projets, Contact
- [ ] Ajouter le bouton "Prendre RDV" en couleur accent (`#fca311`)
- [ ] Mettre à jour les couleurs selon la nouvelle palette

## Phase 3 — Hero
- [ ] Intégrer la photo de profil (à fournir)
- [ ] Mettre à jour nom, titre ("Développeur Full-Stack")
- [ ] Afficher les icones des 7 compétences : React, Next.js, Expo, Figma, Terraform, Jenkins, Kubernetes
- [ ] CTA "Prendre RDV" → scroll `#contact`

## Phase 4 — Services
- [ ] Ajouter la 4e carte : Conseil & Architecture
- [ ] Mettre à jour les couleurs et le style des cards

## Phase 5 — Projets
- [ ] Créer `src/data/projects.ts` avec la structure des projets (titre, description, stack, GitHub, statut, image, slug)
- [ ] Refaire `ProjectCard` : cliquable, ouvre une modale
- [ ] Créer `src/components/ui/project-modal.tsx` (stack, GitHub, statut)
- [ ] Créer `src/app/projects/[slug]/page.tsx` — page détail projet

## Phase 6 — Calendly
- [ ] Créer `.env.local` avec `NEXT_PUBLIC_CALENDLY_URL`
- [ ] Remplacer le lien hardcodé par la variable d'environnement

## Phase 7 — Footer
- [ ] Mettre à jour les couleurs selon la nouvelle palette

## Phase 8 — Contenu réel
- [ ] Fournir la photo de profil
- [ ] Remplir les données des projets dans `src/data/projects.ts`
- [ ] Fournir le lien Calendly pour `.env.local`
