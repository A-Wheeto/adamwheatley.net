# Portfolio Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the portfolio site with screenshot project cards, live links, a personal intro block, renamed tech section, and sharper career copy.

**Architecture:** Static data in `src/data/` drives all content; components in `src/components/` render it. All changes are additive — new optional fields on the `Project` type mean no existing card breaks. CSS changes are scoped to new class names where possible to avoid unintended regressions.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, global CSS custom properties

---

### Task 1: Extend the Project type

**Files:**
- Modify: `src/types/project.ts`

- [ ] **Step 1: Add optional fields to the Project interface**

Replace the entire contents of `src/types/project.ts` with:

```ts
export interface Project {
  title: string
  description: string
  url: string
  technologies: string[]
  featured?: boolean
  imageUrl?: string
  liveUrl?: string
  badge?: string
}
```

- [ ] **Step 2: Verify TypeScript is happy**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/project.ts
git commit -m "feat: add imageUrl, liveUrl, badge fields to Project type"
```

---

### Task 2: Rebuild ProjectCard with screenshot and split links

**Files:**
- Modify: `src/components/ProjectCard.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add CSS for image and card body**

In `src/app/globals.css`, find the `.project-card` block (around line 357) and replace it with:

```css
.project-card {
  border-left: 3px solid var(--border);
  background: rgba(22, 27, 34, 0.8);
  border-radius: 0 8px 8px 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-left-color 0.2s, transform 0.15s;
}

.project-card:hover {
  border-left-color: var(--green);
  transform: translateY(-2px);
}

.project-card-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  object-position: top;
  display: block;
  border-bottom: 1px solid var(--border);
}

.project-card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-card-links {
  display: flex;
  gap: 16px;
  margin-top: auto;
  padding-top: 12px;
}

.project-card-link-primary {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--green);
  text-decoration: none;
}

.project-card-link-primary:hover {
  text-decoration: underline;
}

.project-card-link-secondary {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--muted);
  text-decoration: none;
}

.project-card-link-secondary:hover {
  color: var(--green);
  text-decoration: underline;
}

.project-badge {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--muted);
  background: rgba(139, 148, 158, 0.1);
  border: 1px solid rgba(139, 148, 158, 0.2);
  border-radius: 2px;
  padding: 1px 6px;
  white-space: nowrap;
}
```

- [ ] **Step 2: Rewrite ProjectCard component**

Replace the entire contents of `src/components/ProjectCard.tsx` with:

```tsx
import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={`${project.title} screenshot`}
          className="project-card-image"
        />
      )}
      <div className="project-card-body">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-bold" style={{ color: '#e6edf3' }}>
            {project.title}
          </h3>
          {project.badge && (
            <span className="project-badge">{project.badge}</span>
          )}
        </div>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="skill-tag">{tech}</span>
          ))}
        </div>
        <div className="project-card-links">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link-primary"
            >
              ⬡ Live Demo
            </a>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-link-secondary"
          >
            ◈ GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npm run lint
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.tsx src/app/globals.css
git commit -m "feat: rebuild ProjectCard with screenshot, live link, and badge support"
```

---

### Task 3: Update projects data and add portfolio project

**Files:**
- Modify: `src/data/projects.ts`
- Create: `public/images/projects/` (directory — drop screenshots here manually)

- [ ] **Step 1: Create the screenshots directory**

```bash
mkdir -p public/images/projects
```

- [ ] **Step 2: Replace projects data**

Replace the entire contents of `src/data/projects.ts` with:

```ts
import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    title: 'TeachComputing.org',
    description: 'The main website for the National Centre for Computing Education, serving thousands of UK computing teachers. Built course management features, integrated Classmarker and Credly APIs, and maintained 96% test coverage with comprehensive RSpec testing.',
    url: 'https://github.com/NCCE/teachcomputing.org',
    liveUrl: 'https://teachcomputing.org',
    technologies: ['Ruby on Rails', 'JavaScript', 'Stimulus', 'RSpec', 'PostgreSQL', 'Heroku', 'API Integration'],
    featured: true,
  },
  {
    title: 'Python Dashboard',
    description: 'A desktop application built with Tkinter that aggregates and visualises various data sources in real-time. Features a clean GUI interface for monitoring multiple metrics and API endpoints simultaneously.',
    url: 'https://github.com/A-Wheeto/Dashboard',
    technologies: ['Python', 'Tkinter', 'GUI', 'Data Visualisation', 'API Calls'],
    featured: true,
  },
  {
    title: 'Instagram Rails Application',
    description: 'A full-featured Instagram clone built from scratch using Ruby on Rails. Includes user authentication, image uploads with Active Storage, post creation and sharing, and a responsive feed interface.',
    url: 'https://github.com/A-Wheeto/Instagram-Rails-Application',
    technologies: ['Ruby on Rails', 'PostgreSQL', 'Active Storage', 'Authentication', 'CSS'],
    featured: true,
  },
  {
    title: 'adamwheatley.net',
    description: 'This portfolio, built from scratch with Next.js and TypeScript. Custom terminal-green design system, scroll-tracked career timeline, and Vercel deployment — all written without a UI framework.',
    url: 'https://github.com/A-Wheeto/adamwheatley.net',
    liveUrl: 'https://adamwheatley.net',
    badge: 'This site',
    technologies: ['Next.js', 'TypeScript', 'Vercel', 'CSS Design System', 'React'],
    featured: true,
  },
]
```

> `imageUrl` is intentionally absent here — cards render cleanly without it. Screenshots are added in Task 7 once the real images are in place.

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add portfolio project, live links, and updated descriptions"
```

---

### Task 4: Rename "currently_climbing" to "current_stack"

**Files:**
- Modify: `src/app/projects/page.tsx`

- [ ] **Step 1: Update the heading text**

In `src/app/projects/page.tsx`, find:

```tsx
      <h2 className="climbing-heading">
        # currently_climbing
      </h2>
```

Replace with:

```tsx
      <h2 className="climbing-heading">
        # current_stack
      </h2>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/projects/page.tsx
git commit -m "fix: rename currently_climbing to current_stack"
```

---

### Task 5: Add `$ whoami` intro block on home page

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add CSS for the whoami block**

In `src/app/globals.css`, add the following after the `.skill-tag-dim` block:

```css
/* ── Whoami intro ── */
.whoami-block {
  padding: 0 0 8px 0;
}

.whoami-prompt {
  font-family: var(--mono);
  font-size: 12px;
  color: rgba(0, 255, 65, 0.4);
  margin-bottom: 10px;
}

.whoami-name {
  font-size: 28px;
  font-weight: bold;
  color: #e6edf3;
  margin-bottom: 4px;
}

.whoami-role {
  font-family: var(--mono);
  font-size: 14px;
  color: var(--green);
  margin-bottom: 10px;
}

.whoami-bio {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
  max-width: 540px;
}
```

- [ ] **Step 2: Add the whoami block in page.tsx**

In `src/app/page.tsx`, find the opening of the cards container:

```tsx
      <div className="flex flex-col gap-6 py-10 px-4 md:px-12 pb-20 lg:pb-10">
        {careerGrades.map((grade, index) => (
```

Replace with:

```tsx
      <div className="flex flex-col gap-6 py-10 px-4 md:px-12 pb-20 lg:pb-10">
        <div className="whoami-block">
          <p className="whoami-prompt">$ whoami</p>
          <p className="whoami-name">Adam Wheatley</p>
          <p className="whoami-role">Full-Stack Developer</p>
          <p className="whoami-bio">
            IT support turned developer — I bring systems thinking to full-stack engineering with Rails and Next.js.
          </p>
        </div>

        {careerGrades.map((grade, index) => (
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npm run lint
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/globals.css
git commit -m "feat: add whoami intro block above career timeline"
```

---

### Task 6: Sharpen V1 and V3 career card copy

**Files:**
- Modify: `src/data/careerGrades.ts`

- [ ] **Step 1: Update V1 description**

In `src/data/careerGrades.ts`, find the V1 entry and replace its `description` field:

Old:
```ts
    description: 'Started my tech career providing 1st line IT support to employees across UK, Ireland, and globally. Handled high-volume support calls, diagnosed issues with desktop machines, laptops, Citrix, RDP, and Virtual Machines. Building my foundation in troubleshooting and customer service.',
```

New:
```ts
    description: 'First role in tech: 1st line IT support across UK, Ireland, and globally for a major insurance firm. High-volume call handling — diagnosing desktop, laptop, Citrix, RDP, and Virtual Machine issues under pressure. Built the troubleshooting instincts that still shape how I approach every problem.',
```

- [ ] **Step 2: Update V3 description**

In `src/data/careerGrades.ts`, find the V3 entry and replace its `description` field:

Old:
```ts
    description: 'Transitioned to cloud technologies, specializing in automated SharePoint solutions for schools and businesses. Integrated with school MIS systems using Microsoft Data Sync, led client onboarding, and provided tailored consultations. The technical crux where cloud met infrastructure.',
```

New:
```ts
    description: 'Specialised in automated SharePoint solutions for schools and businesses, integrating with MIS systems via Microsoft Data Sync. Led client onboarding end-to-end — cutting manual setup from days to hours through automation. The crux where cloud infrastructure met real-world delivery.',
```

- [ ] **Step 3: Commit**

```bash
git add src/data/careerGrades.ts
git commit -m "fix: sharpen V1 and V3 career card descriptions with impact framing"
```

---

### Task 7: Final build verification

- [ ] **Step 1: Run a full production build**

```bash
npm run build
```

Expected: build completes with no errors. Warnings about image optimisation (`<img>` vs `<Image>`) are acceptable — the site doesn't use `next/image` and this is intentional.

- [ ] **Step 2: Spot-check in the dev server**

```bash
npm run dev
```

Open `http://localhost:3000` and check:
- Home page shows `$ whoami` block above V0 card
- Projects page shows 4 cards, TeachComputing and portfolio have "Live Demo" links
- Cards with `imageUrl` set to empty placeholder show no broken image (empty `<img>` with a real path returns a 404 — consider temporarily removing `imageUrl` from projects data until real screenshots are ready, then re-adding them)
- `# current_stack` heading appears correctly on projects page

- [ ] **Step 3: Add real screenshots and wire up imageUrl fields**

Take a screenshot of each project at ~1200px wide and save as PNG. The card image area is 160px tall at full card width — landscape crops work best.

Place files at:
- `public/images/projects/teachcomputing.png`
- `public/images/projects/python-dashboard.png`
- `public/images/projects/instagram-rails.png`
- `public/images/projects/portfolio.png`

Then add `imageUrl` to each project entry in `src/data/projects.ts`:

```ts
  {
    title: 'TeachComputing.org',
    // ... other fields unchanged ...
    imageUrl: '/images/projects/teachcomputing.png',
  },
  {
    title: 'Python Dashboard',
    // ... other fields unchanged ...
    imageUrl: '/images/projects/python-dashboard.png',
  },
  {
    title: 'Instagram Rails Application',
    // ... other fields unchanged ...
    imageUrl: '/images/projects/instagram-rails.png',
  },
  {
    title: 'adamwheatley.net',
    // ... other fields unchanged ...
    imageUrl: '/images/projects/portfolio.png',
  },
```

Then commit:

```bash
git add public/images/projects/ src/data/projects.ts
git commit -m "feat: add project screenshot images"
```
