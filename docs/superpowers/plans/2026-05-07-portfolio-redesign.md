# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace blocks.css with a cohesive dark/terminal aesthetic using pure Tailwind CSS and CSS custom properties, applied across all components and both pages.

**Architecture:** All colour values live as CSS custom properties in `globals.css`; component CSS classes are defined there too. Tailwind handles layout, spacing, and responsive breakpoints only. A new `NavBar` client component handles routing-aware tab highlighting; a new `BackgroundLayers` server component renders the three fixed decorative layers. Data and type files are untouched.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, CSS custom properties

---

## File Map

| Action | File |
|---|---|
| Rewrite | `src/app/globals.css` |
| Rewrite | `src/app/layout.tsx` |
| Rewrite | `src/app/page.tsx` |
| Rewrite | `src/app/projects/page.tsx` |
| Rewrite | `src/components/CareerCard.tsx` |
| Rewrite | `src/components/ProgressIndicator.tsx` |
| Rewrite | `src/components/ProjectCard.tsx` |
| Create | `src/components/BackgroundLayers.tsx` |
| Create | `src/components/NavBar.tsx` |
| Delete | `src/app/about/` |
| Delete | `src/app/contact/` |
| Untouched | `src/data/careerGrades.ts`, `src/data/projects.ts`, `src/types/career.ts`, `src/types/project.ts` |

---

## Task 1: Rewrite globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the entire file**

```css
@import "tailwindcss";

/* ── Design tokens ── */
:root {
  --green:        #00ff41;
  --green-dim:    rgba(0, 255, 65, 0.12);
  --green-border: rgba(0, 255, 65, 0.25);
  --surface:      #161b22;
  --border:       #21262d;
  --muted:        #8b949e;
  --bg:           #0d1117;
  --mono:         'Courier New', Courier, monospace;
}

/* ── Base ── */
html { scroll-behavior: smooth; }

body {
  background-color: var(--bg);
  color: #e6edf3;
}

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--green-border); }

/* ── Cursor animation ── */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.cursor {
  display: inline-block;
  width: 7px;
  height: 0.85em;
  background: var(--green);
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: blink 1s step-end infinite;
}

/* ── Nav ── */
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(13, 17, 23, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
  padding: 0 2rem;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--green);
  letter-spacing: 0.05em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-icon {
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 5px 12px;
  font-size: 11px;
  color: var(--muted);
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s;
}

.nav-icon:hover {
  border-color: var(--green);
  color: var(--green);
}

/* ── Tabs ── */
.page-tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
  padding: 0 2rem;
  background: rgba(22, 27, 34, 0.95);
  position: sticky;
  top: 52px;
  z-index: 40;
}

.tab {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--muted);
  padding: 10px 18px;
  border-bottom: 2px solid transparent;
  text-decoration: none;
  transition: color 0.15s;
}

.tab-active {
  color: var(--green);
  border-bottom-color: var(--green);
}

/* ── Background layers ── */
.bg-glow-br {
  position: fixed;
  bottom: -80px;
  right: -80px;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(0, 255, 65, 0.07) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.bg-glow-tr {
  position: fixed;
  top: -60px;
  right: 60px;
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, rgba(0, 255, 65, 0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.bg-scanlines {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0, 0, 0, 0.04) 3px,
    rgba(0, 0, 0, 0.04) 4px
  );
  pointer-events: none;
}

.bg-code {
  position: fixed;
  bottom: 60px;
  right: 28px;
  z-index: 1;
  font-family: var(--mono);
  font-size: 11px;
  line-height: 2;
  text-align: right;
  pointer-events: none;
  user-select: none;
  opacity: 0.2;
  display: none;
}

.bg-code .kw  { color: #50fa7b; }
.bg-code .str { color: #f1fa8c; }
.bg-code .cmt { color: #6272a4; }
.bg-code .fn  { color: #8be9fd; }
.bg-code .acc { color: #00ff41; }

@media (min-width: 1024px) {
  .bg-code { display: block; }
}

/* ── Progress indicator ── */
.progress-sidebar {
  display: none;
  flex-direction: column;
  align-items: center;
  background: rgba(22, 27, 34, 0.6);
  border-right: 1px solid var(--border);
  backdrop-filter: blur(6px);
  position: sticky;
  top: 105px;
  height: calc(100vh - 105px);
  padding: 2rem 0;
}

.progress-mobile-bar {
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 40;
  background: rgba(22, 27, 34, 0.95);
  backdrop-filter: blur(6px);
  border-top: 1px solid var(--border);
  padding: 12px 24px;
}

@media (min-width: 1024px) {
  .progress-sidebar    { display: flex; }
  .progress-mobile-bar { display: none; }
}

.prog-track {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: space-around;
  width: 100%;
}

.prog-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 0 10px;
}

.prog-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid var(--border);
  background: transparent;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
  padding: 0;
}

.prog-dot:hover { border-color: var(--green-border); }

.prog-dot-active {
  background: var(--green);
  border-color: var(--green);
  box-shadow: 0 0 8px var(--green);
}

.prog-dot-visited {
  background: var(--green-dim);
  border-color: var(--green-border);
}

.prog-label {
  font-family: var(--mono);
  font-size: 9px;
  color: var(--muted);
  transition: color 0.2s;
}

.prog-label-active { color: var(--green); }

.prog-line {
  width: 1px;
  height: 24px;
  background: var(--border);
}

/* ── Career card ── */
.career-card {
  border-left: 3px solid var(--border);
  background: rgba(22, 27, 34, 0.8);
  backdrop-filter: blur(6px);
  border-radius: 0 8px 8px 0;
  padding: 24px;
  transition: border-left-color 0.2s, box-shadow 0.2s;
}

.career-card:hover {
  border-left-color: var(--green-border);
}

.career-card-active {
  border-left-color: var(--green);
  box-shadow: 0 0 24px rgba(0, 255, 65, 0.06), inset 0 0 40px rgba(0, 255, 65, 0.02);
}

.career-card-aspirational {
  border-left: 3px dashed rgba(0, 255, 65, 0.35);
  background: rgba(22, 27, 34, 0.5);
  backdrop-filter: blur(6px);
  border-radius: 0 8px 8px 0;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.career-card-aspirational::before {
  content: 'next challenge';
  position: absolute;
  top: 12px;
  right: 14px;
  font-family: var(--mono);
  font-size: 8px;
  color: rgba(0, 255, 65, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.grade-badge {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--green);
  background: var(--green-dim);
  padding: 2px 8px;
  border-radius: 2px;
  border: 1px solid var(--green-border);
}

.grade-badge-dim {
  font-family: var(--mono);
  font-size: 10px;
  color: rgba(0, 255, 65, 0.4);
  background: transparent;
  padding: 2px 8px;
  border-radius: 2px;
  border: 1px solid rgba(0, 255, 65, 0.2);
}

.card-date {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--muted);
}

.skill-tag {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--green);
  padding: 2px 8px;
  background: var(--green-dim);
  border-radius: 2px;
  border: 1px solid var(--green-border);
}

.skill-tag-dim {
  font-family: var(--mono);
  font-size: 10px;
  color: rgba(0, 255, 65, 0.4);
  padding: 2px 8px;
  background: transparent;
  border-radius: 2px;
  border: 1px dashed rgba(0, 255, 65, 0.2);
}

/* ── Project card ── */
.project-card {
  border-left: 3px solid var(--border);
  background: rgba(22, 27, 34, 0.8);
  border-radius: 0 8px 8px 0;
  padding: 20px;
  text-decoration: none;
  display: block;
  transition: border-left-color 0.2s, transform 0.15s;
}

.project-card:hover {
  border-left-color: var(--green);
  transform: translateY(-2px);
}

/* ── Climbing section ── */
.climbing-heading {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--green);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.climbing-heading::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.climbing-card {
  background: rgba(22, 27, 34, 0.8);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 12px;
}

/* ── Footer ── */
.footer {
  border-top: 1px solid var(--border);
  padding: 16px 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(13, 17, 23, 0.9);
  position: relative;
  z-index: 1;
}

.footer-brand {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--muted);
}

.footer-link {
  font-size: 11px;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.15s;
}

.footer-link:hover { color: var(--green); }
```

- [ ] **Step 2: Verify Tailwind compiles**

```bash
cd /Users/a.wheatley/Development/adamwheatley.net && pnpm build 2>&1 | head -30
```

Expected: Build may fail on TypeScript errors in other files (blocks.css classes) — that's fine. CSS itself should have no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "refactor: replace blocks.css tokens with terminal green design system"
```

---

## Task 2: Create BackgroundLayers component

**Files:**
- Create: `src/components/BackgroundLayers.tsx`

- [ ] **Step 1: Create the file**

```tsx
export default function BackgroundLayers() {
  return (
    <>
      <div className="bg-glow-br" aria-hidden="true" />
      <div className="bg-glow-tr" aria-hidden="true" />
      <div className="bg-scanlines" aria-hidden="true" />
      <div className="bg-code" aria-hidden="true">
        <span className="cmt"># career journey</span><br />
        <span className="kw">class</span>{' Developer\n'}<br />
        &nbsp;&nbsp;<span className="kw">include</span> <span className="acc">Curious</span><br />
        <br />
        &nbsp;&nbsp;<span className="kw">def</span> <span className="fn">initialize</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;{'@grade = '}<span className="str">&quot;V0&quot;</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;{'@stack = ['}<span className="str">&quot;Ruby&quot;</span>
        {', '}<span className="str">&quot;Rails&quot;</span>{','}<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="str">&quot;Next.js&quot;</span>{']'}<br />
        &nbsp;&nbsp;<span className="kw">end</span><br />
        <br />
        &nbsp;&nbsp;<span className="kw">def</span> <span className="fn">climb</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;{'@grade.'}<span className="fn">next!</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">self</span><br />
        &nbsp;&nbsp;<span className="kw">end</span><br />
        <span className="kw">end</span><br />
        <br />
        <span className="acc">Developer</span>{'.'}<span className="fn">new</span>
        {'.'}<span className="fn">climb</span>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
cd /Users/a.wheatley/Development/adamwheatley.net && npx tsc --noEmit 2>&1 | grep BackgroundLayers
```

Expected: No output (no errors for this file).

- [ ] **Step 3: Commit**

```bash
git add src/components/BackgroundLayers.tsx
git commit -m "feat: add BackgroundLayers component (glow, scanlines, corner code)"
```

---

## Task 3: Create NavBar client component

**Files:**
- Create: `src/components/NavBar.tsx`

- [ ] **Step 1: Create the file**

Replace `YOUR_LINKEDIN_URL` with your actual LinkedIn profile URL before committing.

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { label: 'home.rb', href: '/' },
  { label: 'projects.rb', href: '/projects' },
]

const GITHUB_URL = 'https://github.com/A-Wheeto'
const LINKEDIN_URL = 'YOUR_LINKEDIN_URL'

function GitHubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function NavBar() {
  const pathname = usePathname()

  return (
    <header>
      <nav className="nav">
        <span className="nav-brand">
          &gt; adam_wheatley.rb<span className="cursor" aria-hidden="true" />
        </span>
        <div className="nav-links">
          <a
            href={GITHUB_URL}
            className="nav-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <GitHubIcon />
            GitHub
          </a>
          <a
            href={LINKEDIN_URL}
            className="nav-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon />
            LinkedIn
          </a>
        </div>
      </nav>
      <div className="page-tabs" role="tablist">
        {TABS.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            role="tab"
            aria-selected={pathname === tab.href}
            className={`tab${pathname === tab.href ? ' tab-active' : ''}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
cd /Users/a.wheatley/Development/adamwheatley.net && npx tsc --noEmit 2>&1 | grep NavBar
```

Expected: No output.

- [ ] **Step 3: Commit**

```bash
git add src/components/NavBar.tsx
git commit -m "feat: add NavBar with blinking cursor, GitHub/LinkedIn links, route-aware tabs"
```

---

## Task 4: Rewrite root layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/NavBar'
import BackgroundLayers from '@/components/BackgroundLayers'

export const metadata: Metadata = {
  title: {
    default: 'Adam Wheatley | Full-Stack Developer',
    template: '%s | Adam Wheatley',
  },
  description:
    'Full-Stack Developer specialising in Ruby on Rails and Next.js. Career journey from IT support to development.',
  keywords: [
    'Adam Wheatley',
    'full-stack developer',
    'Ruby on Rails',
    'Next.js',
    'React',
    'TypeScript',
    'portfolio',
  ],
  authors: [{ name: 'Adam Wheatley' }],
  creator: 'Adam Wheatley',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://adamwheatley.net',
    title: 'Adam Wheatley | Full-Stack Developer',
    description: 'Full-Stack Developer specialising in Ruby on Rails and Next.js',
    siteName: 'Adam Wheatley Portfolio',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <BackgroundLayers />
        <NavBar />
        <main style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        <footer className="footer">
          <span className="footer-brand">adam_wheatley · {new Date().getFullYear()}</span>
          <div className="flex gap-4">
            <a
              href="https://github.com/A-Wheeto"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="YOUR_LINKEDIN_URL"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Run the dev server and check the shell renders**

```bash
cd /Users/a.wheatley/Development/adamwheatley.net && pnpm dev
```

Open http://localhost:3000. You should see:
- Dark background (#0d1117)
- Nav bar with brand name + blinking cursor + GitHub/LinkedIn buttons
- Two tabs: `home.rb` and `projects.rb`
- Green glow blobs in the corners
- Faint scanlines across the page
- Footer at the bottom

The page content will still look wrong until later tasks — that's expected.

- [ ] **Step 3: Stop dev server, commit**

```bash
git add src/app/layout.tsx
git commit -m "refactor: rebuild root layout — remove blocks.css, add NavBar and BackgroundLayers"
```

---

## Task 5: Rewrite CareerCard

**Files:**
- Modify: `src/components/CareerCard.tsx`

- [ ] **Step 1: Replace the entire file**

V6 is detected by `grade.grade === 'V6'` and gets the aspirational treatment. All other cards use the standard design. The `isActive` prop controls the green left border and glow on the current card.

```tsx
import { Grade } from '@/types/career'

interface CareerCardProps {
  grade: Grade
  isActive: boolean
}

export default function CareerCard({ grade, isActive }: CareerCardProps) {
  const isAspirational = grade.grade === 'V6'

  if (isAspirational) {
    return (
      <div className="career-card-aspirational">
        <div className="flex items-center gap-3 mb-3">
          <span className="grade-badge-dim">{grade.grade}</span>
          <span className="card-date" style={{ opacity: 0.6 }}>{grade.year}</span>
        </div>
        <h2
          className="text-2xl font-bold mb-1"
          style={{ color: 'rgba(230, 237, 243, 0.6)' }}
        >
          {grade.role}
        </h2>
        <p
          className="text-sm mb-4 leading-relaxed"
          style={{ color: 'rgba(139, 148, 158, 0.6)' }}
        >
          {grade.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {grade.skills.map((skill) => (
            <span key={skill} className="skill-tag-dim">{skill}</span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`career-card${isActive ? ' career-card-active' : ''}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="grade-badge">{grade.grade}</span>
        <span className="card-date">{grade.year}</span>
      </div>
      <h2 className="text-2xl font-bold mb-1" style={{ color: '#e6edf3' }}>
        {grade.role}
      </h2>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
        {grade.description}
      </p>
      {grade.skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {grade.skills.map((skill) => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
cd /Users/a.wheatley/Development/adamwheatley.net && npx tsc --noEmit 2>&1 | grep CareerCard
```

Expected: No output. (The home page will have a type error because it still passes `isLastSection` — fix in Task 7.)

- [ ] **Step 3: Commit**

```bash
git add src/components/CareerCard.tsx
git commit -m "refactor: rebuild CareerCard with terminal green design and V6 aspirational treatment"
```

---

## Task 6: Rewrite ProgressIndicator

**Files:**
- Modify: `src/components/ProgressIndicator.tsx`

- [ ] **Step 1: Replace the entire file**

Desktop variant: sticky sidebar with dots + V0–V6 labels, connected by lines.
Mobile variant: bottom bar with dots only (no labels — space is too tight).

```tsx
'use client'

import { Grade } from '@/types/career'

interface ProgressIndicatorProps {
  grades: Grade[]
  currentGrade: number
  onGradeClick: (index: number) => void
  variant: 'desktop' | 'mobile'
}

export default function ProgressIndicator({
  grades,
  currentGrade,
  onGradeClick,
  variant,
}: ProgressIndicatorProps) {
  if (variant === 'desktop') {
    return (
      <div className="progress-sidebar">
        <div className="prog-track">
          {grades.map((grade, index) => (
            <div key={grade.grade}>
              <div className="prog-item">
                <button
                  onClick={() => onGradeClick(index)}
                  aria-label={`Jump to ${grade.grade}`}
                  className={`prog-dot${index === currentGrade ? ' prog-dot-active' : index < currentGrade ? ' prog-dot-visited' : ''}`}
                />
                <span
                  className={`prog-label${index === currentGrade ? ' prog-label-active' : ''}`}
                >
                  {grade.grade}
                </span>
              </div>
              {index < grades.length - 1 && <div className="prog-line" />}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="progress-mobile-bar">
      <div className="flex items-center justify-between">
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--green)' }}>
          {grades[currentGrade].grade}
        </span>
        <div className="flex gap-2">
          {grades.map((grade, index) => (
            <button
              key={grade.grade}
              onClick={() => onGradeClick(index)}
              aria-label={`Jump to ${grade.grade}`}
              className={`prog-dot${index === currentGrade ? ' prog-dot-active' : index < currentGrade ? ' prog-dot-visited' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
cd /Users/a.wheatley/Development/adamwheatley.net && npx tsc --noEmit 2>&1 | grep ProgressIndicator
```

Expected: No output.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProgressIndicator.tsx
git commit -m "refactor: rebuild ProgressIndicator with grade labels and terminal green dots"
```

---

## Task 7: Rewrite home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the entire file**

The two-column grid layout: `64px` sidebar (desktop) | `1fr` cards. The scroll tracking uses `getBoundingClientRect` as before — no behaviour change, just new layout and prop names.

```tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { careerGrades } from '@/data/careerGrades'
import ProgressIndicator from '@/components/ProgressIndicator'
import CareerCard from '@/components/CareerCard'

export default function HomePage() {
  const [currentGrade, setCurrentGrade] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      sectionRefs.current.forEach((ref, index) => {
        if (!ref) return
        const rect = ref.getBoundingClientRect()
        const isVisible =
          rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2
        if (isVisible) setCurrentGrade(index)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <>
      {/* Desktop progress sidebar + content grid.
          grid-cols-1 on mobile (sidebar is display:none so collapses);
          64px sidebar + 1fr content on lg+. */}
      <div className="grid grid-cols-1 lg:grid-cols-[64px_1fr]">
        <ProgressIndicator
          grades={careerGrades}
          currentGrade={currentGrade}
          onGradeClick={scrollToSection}
          variant="desktop"
        />

        {/* pb-20 lg:pb-10 avoids overlap with the mobile bottom bar */}
        <div className="flex flex-col gap-6 py-10 px-4 md:px-12 pb-20 lg:pb-10" style={{ maxWidth: '760px' }}>
          {careerGrades.map((grade, index) => (
            <section
              key={grade.grade}
              ref={(el) => { sectionRefs.current[index] = el }}
              className="min-h-screen flex items-center"
            >
              <div className="w-full">
                <CareerCard grade={grade} isActive={index === currentGrade} />
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Mobile bottom progress bar */}
      <ProgressIndicator
        grades={careerGrades}
        currentGrade={currentGrade}
        onGradeClick={scrollToSection}
        variant="mobile"
      />
    </>
  )
}
```

- [ ] **Step 2: Start dev server and verify home page**

```bash
cd /Users/a.wheatley/Development/adamwheatley.net && pnpm dev
```

Open http://localhost:3000. Check:
- Dark background with glow blobs and scanlines visible
- Left sidebar with V0–V6 dots + labels (desktop)
- Scrolling updates the active dot and card border
- V0 card has green left border when in view
- Clicking a dot smooth-scrolls to that card
- V6 card has dashed border and "next challenge" label
- On narrow viewport (< 1024px): sidebar hidden, bottom bar appears

- [ ] **Step 3: Stop dev server, commit**

```bash
git add src/app/page.tsx
git commit -m "refactor: rebuild home page with two-column grid and terminal green career cards"
```

---

## Task 8: Rewrite ProjectCard

**Files:**
- Modify: `src/components/ProjectCard.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
    >
      <h3 className="text-sm font-bold mb-2" style={{ color: '#e6edf3' }}>
        {project.title}
      </h3>
      <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span key={tech} className="skill-tag">{tech}</span>
        ))}
      </div>
    </a>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
cd /Users/a.wheatley/Development/adamwheatley.net && npx tsc --noEmit 2>&1 | grep ProjectCard
```

Expected: No output.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "refactor: rebuild ProjectCard with left-accent border matching career card style"
```

---

## Task 9: Rewrite projects page

**Files:**
- Modify: `src/app/projects/page.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'

const currentlyClimbing = [
  { name: 'Next.js',     description: 'Server-side rendering and optimal performance' },
  { name: 'Vercel',      description: 'Seamless deployment and edge functions' },
  { name: 'React',       description: 'Component-based UI development' },
  { name: 'Auth0',       description: 'Secure authentication and authorization' },
  { name: 'PostgreSQL',  description: 'Robust relational database management' },
  { name: 'Shopify',     description: 'E-commerce platform development' },
  { name: 'Contentful',  description: 'Headless CMS for flexible content' },
  { name: 'APIs',        description: 'RESTful and GraphQL integration patterns' },
]

export const metadata = {
  title: 'Projects',
}

export default function ProjectsPage() {
  return (
    <div className="py-10 px-12" style={{ maxWidth: '1000px' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#e6edf3' }}>Projects</h1>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--muted)' }}>
          &gt; things I&apos;ve built
        </p>
      </div>

      {/* Projects grid — 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {/* Currently Climbing */}
      <h2 className="climbing-heading">Currently Climbing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentlyClimbing.map((item) => (
          <div key={item.name} className="climbing-card">
            <div className="text-sm font-semibold mb-1" style={{ color: '#e6edf3' }}>
              {item.name}
            </div>
            <div className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

> **Note:** The `currentlyClimbing` data above is taken verbatim from the existing `src/app/projects/page.tsx` (`learningSkills` array). The field is renamed from `benefit` → `description` to match the JSX below.

- [ ] **Step 2: Start dev server and verify projects page**

```bash
cd /Users/a.wheatley/Development/adamwheatley.net && pnpm dev
```

Open http://localhost:3000/projects. Check:
- Header with "Projects" title and `> things I've built` subtitle
- Projects grid: 1 column on mobile, 2 on tablet, 3 on desktop (resize to verify)
- Each project card: dark panel, left border turns green on hover, slight lift
- Currently Climbing: 2-column grid with dark cards
- Tab shows `projects.rb` as active

- [ ] **Step 3: Stop dev server, commit**

```bash
git add src/app/projects/page.tsx
git commit -m "refactor: rebuild projects page with responsive grid and climbing section"
```

---

## Task 10: Delete unused pages and final verification

**Files:**
- Delete: `src/app/about/`
- Delete: `src/app/contact/`

- [ ] **Step 1: Delete the about and contact directories**

```bash
rm -rf /Users/a.wheatley/Development/adamwheatley.net/src/app/about
rm -rf /Users/a.wheatley/Development/adamwheatley.net/src/app/contact
```

- [ ] **Step 2: Production build**

```bash
cd /Users/a.wheatley/Development/adamwheatley.net && pnpm build
```

Expected: `✓ Compiled successfully` with no TypeScript errors. Two routes compiled: `/` and `/projects`.

- [ ] **Step 3: Verify 404 on deleted routes**

```bash
cd /Users/a.wheatley/Development/adamwheatley.net && pnpm start
```

Open http://localhost:3000/about — should return the Next.js 404 page.
Open http://localhost:3000/contact — same.

- [ ] **Step 4: Full visual checklist**

With dev server running (`pnpm dev`), manually verify:

| Check | Expected |
|---|---|
| Nav brand | `> adam_wheatley.rb` with blinking green cursor |
| Nav social links | GitHub + LinkedIn buttons, hover turns green |
| Tabs | `home.rb` active on `/`, `projects.rb` active on `/projects` |
| Background | Green glow blobs in corners, faint scanlines, Ruby code bottom-right (desktop) |
| Home: scroll | Progress dot + card border updates as you scroll |
| Home: dot click | Smooth scrolls to correct card |
| Home: V0–V5 cards | Left border green when active, grey otherwise |
| Home: V6 card | Dashed border, faded text, "next challenge" label |
| Projects: grid | 3 col desktop → 2 col tablet → 1 col mobile |
| Projects: climbing | 2 col desktop → 1 col mobile |
| Footer | Brand left, GitHub + LinkedIn links right |
| `/about` | 404 |
| `/contact` | 404 |

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove about and contact pages, complete terminal green redesign"
```

---

## Post-Implementation

Update the LinkedIn URL placeholder in two places:
- `src/components/NavBar.tsx` — the `LINKEDIN_URL` constant
- `src/app/layout.tsx` — the footer LinkedIn `href`

Replace `YOUR_LINKEDIN_URL` with your actual LinkedIn profile URL (e.g. `https://linkedin.com/in/your-handle`).
