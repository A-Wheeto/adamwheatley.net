# Portfolio Redesign — Design Spec

**Date:** 2026-05-07  
**Author:** Adam Wheatley  
**Status:** Pending user review

---

## Context

The current site uses blocks.css as its styling foundation, which constrains the design and produces a generic look. The goal is a complete visual and code overhaul: remove blocks.css entirely, rebuild all components with pure Tailwind CSS and CSS custom properties, and apply a cohesive dark/terminal aesthetic throughout. The content (career journey, projects, currently climbing) stays intact — only the presentation changes.

---

## Design Decisions

### Visual Identity

| Decision | Choice |
|---|---|
| Theme | Dark & Technical |
| Accent colour | Terminal green `#00ff41` |
| Typography | Mixed — monospace for labels/grades/tags/UI chrome; sans-serif for body and headings |
| Card style | Left accent bar — 3px solid green left border on a dark panel with `backdrop-filter: blur` |
| Background | Ambient green glow blobs (bottom-right + top-right) + faint scanlines + faded Ruby code snippet (bottom-right corner) |
| Nav brand | `> adam_wheatley.rb` with a blinking block cursor (CSS animation, no JS) |

### CSS Design Tokens (custom properties)

```css
:root {
  --green:        #00ff41;
  --green-dim:    rgba(0, 255, 65, 0.12);
  --green-border: rgba(0, 255, 65, 0.25);
  --surface:      #161b22;
  --border:       #21262d;
  --muted:        #8b949e;
  --bg:           #0d1117;
}
```

---

## Site Structure

### Pages (keep)
- `/` — Home: career journey (V0–V6)
- `/projects` — Projects showcase + Currently Climbing

### Pages (remove)
- `/about` — delete entirely
- `/contact` — delete entirely

### Navigation
- **Navbar (sticky, top):** Brand name left, GitHub + LinkedIn icon-buttons right. No page links — tabs handle navigation.
- **Tabs (sticky, below nav):** `home.rb` | `projects.rb` — monospace font, green underline on active tab.
- **Footer:** Brand name left (`adam_wheatley · {year}`), GitHub + LinkedIn text links right.

---

## Home Page (`/`)

### Layout
Two-column grid: `64px` progress sidebar | `1fr` content area.

### Progress Sidebar
- Sticky, full viewport height below nav+tabs
- Slightly transparent dark background with `backdrop-filter: blur`
- V0–V6 dots connected by vertical lines
- Each dot has grade label beside it (V0, V1…)
- Active dot: solid green with `box-shadow` glow
- Visited dots: dim green fill
- Active card is determined by scroll position using `IntersectionObserver` (same as current site)
- Clicking a dot smooth-scrolls to the corresponding card
- **Mobile:** sidebar collapses; replaced by a bottom-fixed progress bar (existing behaviour to preserve)

### Career Cards (V0–V6)
Each card:
- `border-left: 3px solid var(--border)` — inactive
- `border-left: 3px solid var(--green)` — active/current
- `background: rgba(22, 27, 34, 0.8)` with `backdrop-filter: blur(6px)`
- `border-radius: 0 8px 8px 0`
- Active card adds `box-shadow: 0 0 24px rgba(0,255,65,0.06)`
- Inactive cards remain full opacity — border colour alone signals state
- Content: grade badge (monospace, green-tinted), date (monospace, muted), role title (sans-serif bold), org (green), description (sans-serif, muted), skill tags (monospace, green-tinted pills)

### V6 Card — Aspirational Treatment
V6 ("The Next Challenge") is styled differently from V0–V5 to signal it's future rather than past:
- `border-left: 3px dashed rgba(0,255,65,0.35)` 
- Reduced background opacity
- Text and tags at ~50–60% opacity
- "next challenge" label in top-right corner (monospace, faint green)

---

## Projects Page (`/projects`)

### Layout
Full-width content area with padding.

### Projects Grid
Responsive column count:
- **< 640px (mobile):** 1 column
- **640–1024px (tablet):** 2 columns
- **> 1024px (desktop):** 3 columns

Each project card:
- Matches career card style: `border-left: 3px solid var(--border)`, dark surface background
- On hover: `border-left-color` transitions to `var(--green)`, subtle `translateY(-2px)`
- Content: title (bold), description (muted), tech tags (monospace pills)

### Currently Climbing Section
- Section heading: monospace green, with a horizontal rule extending to the right
- **2-column grid** (all viewports ≥ 640px; 1 column on mobile)
- Each item: dark surface card with name and short description

---

## Background Treatment

Applied globally via fixed-position layers behind all page content:

1. **Ambient glow blobs** — two `radial-gradient` divs, `position: fixed`:
   - Bottom-right: `420px × 420px`, `rgba(0,255,65,0.07)` centre → transparent
   - Top-right: `260px × 260px`, `rgba(0,255,65,0.04)` centre → transparent
2. **Scanlines** — `position: fixed; inset: 0`, `repeating-linear-gradient` at 4px intervals, `rgba(0,0,0,0.04)` — subtle CRT effect
3. **Corner code** — `position: fixed; bottom: 60px; right: 28px`, faded Ruby class snippet (`opacity: 0.2`), syntax-coloured with green/yellow/blue, `pointer-events: none`

Cards use `backdrop-filter: blur(6px)` so they lift cleanly off the background layers.

---

## Code Refactor

### Remove
- `blocks.css` and all its class references (`.block`, `.fixed`, `.accent`, `.round`)
- `/src/app/about/` directory
- `/src/app/contact/` directory

### Keep (untouched)
- `/src/data/careerGrades.ts`
- `/src/data/projects.ts`
- `/src/types/career.ts`
- `/src/types/project.ts`

### Rewrite
- `/src/app/globals.css` — replace with CSS custom properties, scrollbar styling, background layer styles, blinking cursor animation, breakpoint utilities
- `/src/app/layout.tsx` — update metadata, remove dead nav links, add GitHub/LinkedIn links, add background layers, blinking cursor on brand
- `/src/app/page.tsx` — home page, career journey layout
- `/src/app/projects/page.tsx` — projects grid + currently climbing
- `/src/components/CareerCard.tsx` — new design, V6 aspirational variant
- `/src/components/ProgressIndicator.tsx` — grade labels beside dots, mobile bottom bar
- `/src/components/ProjectCard.tsx` — new design matching career card style

### New component
- `/src/components/BackgroundLayers.tsx` — renders the three fixed background layers (glow blobs, scanlines, corner code) as a single server component

### Tailwind approach
Use Tailwind utilities for layout, spacing, and responsive breakpoints. Use CSS custom properties (defined in `globals.css`) for all colour values — do not hardcode colour hex values in component files.

---

## Responsive Behaviour

| Element | Mobile (< 640px) | Desktop (≥ 1024px) |
|---|---|---|
| Progress sidebar | Hidden — bottom bar shown | Visible left sidebar |
| Career cards | Full width, reduced padding | Max 760px, standard padding |
| Projects grid | 1 column | 3 columns |
| Currently Climbing | 1 column | 2 columns |
| Background code | Hidden (too narrow) | Visible |
| Tabs | Full width | Standard |

---

## Verification

1. `pnpm dev` — site loads with no console errors
2. Home page: scroll through all 7 career cards, confirm progress dots update, confirm clicking dots scrolls to correct card
3. V6 card: confirm dashed border, faded text, "next challenge" label visible
4. Blinking cursor: confirm it animates in the nav bar
5. Projects page: resize browser — confirm grid collapses to 2 then 1 column
6. Currently Climbing: confirm 2-column on desktop, 1-column on mobile
7. GitHub + LinkedIn links present in nav and footer
8. Background layers: confirm glow blobs, scanlines, and corner code are visible but subtle
9. `/about` and `/contact` routes return 404
10. `pnpm build` — no TypeScript or build errors
