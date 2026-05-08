# Portfolio Improvements Design

**Date:** 2026-05-07
**Branch:** portfolio-redesign
**Goal:** Improve the portfolio site to better impress potential employers viewing it as part of a CV — generalist positioning, casual job search.

---

## 1. Projects Page — Screenshot Cards with Live Links

### What changes

The `Project` type gains two optional fields:

```ts
imageUrl?: string   // path relative to /public, e.g. "/images/projects/teachcomputing.png"
liveUrl?: string    // URL to a live demo
```

### ProjectCard layout (new)

```
┌─────────────────────────────────┐
│  [screenshot — full width top]  │
├─────────────────────────────────┤
│  Title           [Live] badge?  │
│  Description                    │
│  skill-tag  skill-tag  ...      │
│  ⬡ Live Demo    ◈ GitHub        │
└─────────────────────────────────┘
```

- Screenshot: `<img>` with `object-fit: cover`, fixed height (~160px), rendered only when `imageUrl` is present
- If no `imageUrl`, card renders as today (no broken layout)
- Live Demo link shown only when `liveUrl` is present; GitHub link always shown
- Both links open in a new tab with `rel="noopener noreferrer"`
- The card itself is no longer a wrapping `<a>` — links are explicit buttons/anchors inside the card

### Projects data updates

| Project | imageUrl | liveUrl | Description update |
|---|---|---|---|
| TeachComputing.org | `/images/projects/teachcomputing.png` | `https://teachcomputing.org` | Lead with scale: "serving thousands of UK computing teachers" |
| Python Dashboard | `/images/projects/python-dashboard.png` | — | No change |
| Instagram Rails App | `/images/projects/instagram-rails.png` | — | No change |
| adamwheatley.net *(new)* | `/images/projects/portfolio.png` | `https://adamwheatley.net` | "Portfolio built from scratch with Next.js and TypeScript. Custom terminal-green design system, scroll-tracked career timeline, and Vercel deployment." Tags: Next.js, TypeScript, Vercel, CSS Design System. Badge: "This site" |

Screenshot images are placed in `public/images/projects/` by Adam. The component gracefully omits the image section when `imageUrl` is absent.

### "This site" badge

The portfolio project card renders a small `"This site"` label alongside the title — styled as a dim secondary badge to distinguish it without being distracting.

---

## 2. Currently Climbing → current_stack

Single copy change in `src/app/projects/page.tsx`:

- `# currently_climbing` → `# current_stack`

No other changes to that section. The tech list and card layout stay the same.

---

## 3. Personal Intro — `$ whoami` Block

A new component or inline block rendered above the V0 career card on the home page.

### Layout

```
$ whoami
Adam Wheatley
Full-Stack Developer
IT support turned developer — I bring systems thinking to full-stack engineering with Rails and Next.js.
```

- `$ whoami` in dim green monospace (matches existing terminal aesthetic)
- Name in large bold white (`text-2xl font-bold`, `#e6edf3`)
- Role in green monospace
- One-sentence description in muted colour
- Separated from the V0 card by consistent vertical spacing (same gap as between cards)
- No border/card treatment — floats as a header above the timeline

The copy above is a starting point; exact wording to be finalised during implementation.

---

## 4. Career Card Copy Improvements

Review and tighten V1–V6 descriptions to lead with impact where possible. Specific targets:

**V1 — IT Analyst, Aviva**
Current opens with setup. Should lead with scale/volume — e.g. number of calls handled, team size, or geographic reach (UK, Ireland, global already mentioned — keep that).

**V3 — Support Engineer, Cloud Design Box**
No concrete numbers currently. Should include approximate number of schools/clients onboarded if Adam can recall a figure. If not, reframe to emphasise outcomes: "automated onboarding reduced setup time from days to hours" or similar.

**V2, V4, V5, V6** — already contain good metrics (2000+ users, 160+ employees, 96% test coverage). Minor polish only if needed.

---

## Architecture Notes

- `imageUrl` and `liveUrl` are optional — no existing card breaks if values are absent
- `ProjectCard` stops being a full-card link; individual link elements replace it
- Screenshot images are static assets in `public/` — no new dependencies or build steps
- No new pages, routes, or components beyond the `$ whoami` intro block (which can be inline in `page.tsx` or extracted to a small component if it grows)

---

## Out of Scope

- Contact form or email address (LinkedIn covers this)
- CV/resume PDF download
- Blog or writing section
- Testimonials
- GitHub stats or activity graphs
