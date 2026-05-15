# Besoins

## Sections

### Hero
- Photo de profil réelle (à fournir)
- Nom : Yassine ANZAR BASHA
- Titre : Développeur Full-Stack
- Compétences affichées via icones : React, Next.js, Expo, Figma, Terraform, Jenkins, Kubernetes
- CTA principal : "Prendre RDV" → scroll vers #contact

### Services
4 cartes :
- Développement Web
- Développement Mobile
- Design UI/UX
- Conseil & Architecture

### Projets
- Cards cliquables ouvrant une modale
- Modale contient : stack technique, lien GitHub, statut du projet
- Structure : one-page + pages dédiées `/projects/[slug]`
- Données dans `src/data/projects.ts`

### Calendrier (Calendly)
- Lien Calendly via variable d'environnement `NEXT_PUBLIC_CALENDLY_URL` (`.env.local`)
- Le lien sera fourni par l'utilisateur

## Navigation
- Navbar fixe en haut
- Liens d'ancrage : Services, Projets, Contact
- Bouton "Prendre RDV" en couleur accent dans la navbar

## Structure
- One-page avec scroll fluide
- Pages dédiées pour chaque projet : `/projects/[slug]`

## Design

### Palette de couleurs
- `#000000` — fond principal
- `#14213d` — fond sections alternées
- `#fca311` — couleur accent (boutons, highlights, bordures)
- `#e5e5e5` — textes clairs

### Typographie
- Titres : **Playfair Display** (serif élégant)
- Corps : **Inter** (sans-serif moderne)

### Style
- Moderne et professionnel
- Public cible : recruteurs et clients potentiels
