# SEO & OG Image Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a static og:image, complete OG/Twitter metadata, sitemap, robots.txt, and JSON-LD Person schema to improve discoverability.

**Architecture:** All changes land in `src/app/layout.tsx` (metadata + JSON-LD) and two new route files (`sitemap.ts`, `robots.ts`). The og:image is a manually created static PNG placed in `public/`. An HTML template is provided to make screenshotting the PNG straightforward. No new dependencies.

**Tech Stack:** Next.js 16, TypeScript 5, Next.js `MetadataRoute` API

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `public/og-image-template.html` | Render the og:image design in a browser for screenshotting |
| Create (manual) | `public/og-image.png` | The 1200×630 PNG screenshotted from the template |
| Modify | `src/app/layout.tsx` | Add `metadataBase`, `og:images`, and JSON-LD `<script>` |
| Create | `src/app/sitemap.ts` | Generate `/sitemap.xml` via Next.js `MetadataRoute` |
| Create | `src/app/robots.ts` | Generate `/robots.txt` via Next.js `MetadataRoute` |

---

### Task 1: Create the og:image HTML template

**Files:**
- Create: `public/og-image-template.html`

This file is a standalone HTML page that renders the og:image design at exactly 1200×630px. You'll open it in a browser and screenshot it to produce `public/og-image.png`. It is never linked from the site.

- [ ] **Step 1: Create the template file**

Create `public/og-image-template.html` with the following content:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      height: 630px;
      background: #0d1117;
      font-family: 'Courier New', Courier, monospace;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 80px;
      overflow: hidden;
    }
    .card {
      display: flex;
      flex-direction: column;
    }
    .prompt {
      font-size: 14px;
      color: rgba(0, 255, 65, 0.4);
      margin-bottom: 28px;
    }
    .name {
      font-size: 52px;
      font-weight: bold;
      color: #e6edf3;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      margin-bottom: 8px;
    }
    .role {
      font-size: 24px;
      color: #00ff41;
      margin-bottom: 32px;
    }
    .url {
      font-size: 16px;
      color: rgba(139, 148, 158, 0.6);
    }
  </style>
</head>
<body>
  <div class="card">
    <p class="prompt">$ whoami</p>
    <p class="name">Adam Wheatley</p>
    <p class="role">Full-Stack Developer</p>
    <p class="url">adamwheatley.net</p>
  </div>
</body>
</html>
```

- [ ] **Step 2: Screenshot the template to produce og-image.png**

Open `public/og-image-template.html` directly in a browser (drag to browser or `open public/og-image-template.html`). The page is fixed at 1200×630px. Screenshot just the page content (not the browser chrome) and save as `public/og-image.png`.

Tips:
- In Chrome DevTools, set the device to a custom 1200×630 viewport, then use the screenshot command (`Cmd+Shift+P` → "Capture screenshot")
- Or use any screenshot tool sized to 1200×630

- [ ] **Step 3: Verify the PNG exists**

```bash
ls -lh public/og-image.png
```

Expected: file exists, size is a few hundred KB or less.

- [ ] **Step 4: Commit**

```bash
git add public/og-image-template.html public/og-image.png
git commit -m "feat: add og:image and screenshot template"
```

---

### Task 2: Update layout.tsx — metadataBase and og:images

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add `metadataBase` and `images` to the metadata export**

In `src/app/layout.tsx`, replace the entire `metadata` export with:

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://adamwheatley.net'),
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
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Adam Wheatley — Full-Stack Developer',
      },
    ],
  },
}
```

- [ ] **Step 2: Verify TypeScript is happy**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add metadataBase and og:image to layout metadata"
```

---

### Task 3: Add JSON-LD structured data to layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add the JSON-LD script tag to the layout body**

In `src/app/layout.tsx`, find the `RootLayout` component and add a `<script>` tag as the first child of `<body>`, before `<BackgroundLayers />`:

Replace:
```tsx
      <body>
        <BackgroundLayers />
```

With:
```tsx
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Adam Wheatley',
              jobTitle: 'Full-Stack Developer',
              url: 'https://adamwheatley.net',
              sameAs: [
                'https://github.com/A-Wheeto',
                'https://uk.linkedin.com/in/adam-wheatley-643810195',
              ],
            }),
          }}
        />
        <BackgroundLayers />
```

- [ ] **Step 2: Verify TypeScript is happy**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add JSON-LD Person structured data"
```

---

### Task 4: Create sitemap.ts

**Files:**
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Create the file**

Create `src/app/sitemap.ts` with the following content:

```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://adamwheatley.net',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://adamwheatley.net/projects',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
```

- [ ] **Step 2: Verify TypeScript is happy**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add sitemap.xml generation"
```

---

### Task 5: Create robots.ts

**Files:**
- Create: `src/app/robots.ts`

- [ ] **Step 1: Create the file**

Create `src/app/robots.ts` with the following content:

```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://adamwheatley.net/sitemap.xml',
  }
}
```

- [ ] **Step 2: Verify TypeScript is happy**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/robots.ts
git commit -m "feat: add robots.txt generation"
```

---

### Task 6: Final build verification

- [ ] **Step 1: Run a full production build**

```bash
npm run build
```

Expected: build completes with no errors. Check the output for these lines confirming the new routes were generated:
```
○ /robots.txt
○ /sitemap.xml
```

- [ ] **Step 2: Start the production server and inspect the output**

```bash
npm run start
```

Then open these URLs in a browser and verify:

| URL | Expected |
|-----|----------|
| `http://localhost:3000/sitemap.xml` | XML with two `<url>` entries for `/` and `/projects` |
| `http://localhost:3000/robots.txt` | `User-agent: *`, `Allow: /`, `Sitemap: https://...` |
| `http://localhost:3000` | In DevTools → Elements, `<head>` contains `og:image` meta tag with absolute URL. `<body>` contains `<script type="application/ld+json">` with Person schema. |

- [ ] **Step 3: Validate the og:image meta tag**

In DevTools on `http://localhost:3000`, find:
```html
<meta property="og:image" content="https://adamwheatley.net/og-image.png" />
```

The URL must be absolute (starting with `https://`), not relative — this confirms `metadataBase` is working.

- [ ] **Step 4: Validate with a social preview tool (optional but recommended)**

After deploying to Vercel, paste `https://adamwheatley.net` into the LinkedIn post inspector (`https://www.linkedin.com/post-inspector/`) to confirm the og:image preview renders correctly.
