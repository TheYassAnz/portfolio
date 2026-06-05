---
name: project-animation-patterns
description: Framer Motion animation patterns established for this portfolio — easing, timing, scroll triggers, and component-specific decisions
metadata:
  type: project
---

## Framer Motion is installed

`framer-motion` is in `app/package.json` dependencies.

## Global easing

All animations use Apple-style spring-like easing:
```ts
const ease = [0.16, 1, 0.3, 1] as const;
```

## Core entrance timing
- Stagger children: `0.1s` between siblings, `0.06s` for small chips
- Duration: `0.55–0.7s` for entrance, `0.2s` for hover/micro-interactions, `0.35s` for modals
- Exit animations use ~75% of enter duration

## Scroll-triggered pattern
All section-level animations use:
```tsx
whileInView="visible"
viewport={{ once: true, margin: "-100px" }}
```
The `margin: "-100px"` prevents premature trigger.

## Component-specific patterns

### HeroSection (`hero-section.tsx`)
- Converted to client component (added `"use client"`)
- Text block: `containerVariants` with `staggerChildren: 0.1`
- Skill chips: separate `skillsContainerVariants` with `staggerChildren: 0.06`
- Terminal: slides in from right (`x: 40 → 0`) with `delay: 0.2`

### ServiceCard (`ui/service-card.tsx`)
- Converted to client component with `"use client"`
- `whileHover={{ y: -4, borderColor: "rgba(252, 163, 17, 0.4)" }}`
- Removed Tailwind `hover:-translate-y-1 transition-transform duration-300`
- Wrapped by `motion.div` in `AnimatedServiceGrid`

### AnimatedServiceGrid (`ui/animated-service-grid.tsx`)
- Client wrapper for `ServiceSection` (keeps section as Server Component)
- Heading fades in first, then grid stagger with `staggerChildren: 0.1`
- Each card wrapped in `motion.div` with `cardVariants` (y: 24 → 0)

### AnimatedProjectGrid (`ui/animated-project-grid.tsx`)
- Same pattern as AnimatedServiceGrid, for ProjectSection
- Keeps `ProjectSection` as async Server Component

### ProjectCard (`ui/project-card.tsx`)
- `motion.button` with `whileHover={{ y: -4, borderColor: "rgba(252, 163, 17, 0.4)" }}`
- Removed `hover:-translate-y-1 transition-all duration-300`
- Modal wrapped in `<AnimatePresence>` for exit animation support

### ProjectModal (`ui/project-modal.tsx`)
- Backdrop: `opacity: 0 → 1`, exit `opacity: 0` (duration 0.2s)
- Panel: `opacity/scale(0.96)/y(12) → 1/1/0`, exit reverse (duration 0.35s)
- Overlay click still closes modal

### Navbar (`navbar.tsx`)
- Scroll shadow: `useEffect` listening to `window.scrollY > 50`
- `motion.nav` animates `boxShadow` on scroll (`0 8px 32px rgba(0,0,0,0.35)`)
- Hamburger icon: `AnimatePresence mode="wait"` with rotate transition
- Mobile menu: `motion.ul` `y: -10 → 0`, each `li` staggers `x: -8 → 0` with `0.05s` delays
- Removed `animate-fade-in-down` CSS class usage

## Server Component strategy
- `ServiceSection` and `ProjectSection` remain Server Components
- Client animation logic extracted to `AnimatedServiceGrid` and `AnimatedProjectGrid` wrappers
- `HeroSection` converted fully to client component (no async data fetching needed)

## accent color value
`rgba(252, 163, 17, 0.4)` = `accent/40` for border hover states (CSS var can't be used directly in Framer Motion style objects)
