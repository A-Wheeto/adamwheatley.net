# SEO & OG Image Design

**Date:** 2026-05-08
**Branch:** portfolio-redesign
**Goal:** Improve discoverability — add a static og:image, complete OG metadata, sitemap, robots.txt, and JSON-LD Person schema.

---

## 1. Static og:image

**File:** `public/og-image.png` (1200×630px PNG)

Created manually — the spec includes an HTML template (`public/og-image-template.html`) that can be opened in a browser, sized to 1200×630, and screenshotted.

### Design

```
Background: #0d1117, padding ~80px on all sides

$ whoami          14px monospace, rgba(0, 255, 65, 0.4)
                  (28px gap)
Adam Wheatley     52px bold, #e6edf3
Full-Stack        24px monospace, #00ff41
Developer

adamwheatley.net  16px monospace, rgba(139, 148, 158, 0.6)
```

Font stack: same monospace as the site (`'Courier New', Courier, monospace`).

### Referenced in metadata

`metadataBase` is set to `https://adamwheatley.net` so Next.js resolves `/og-image.png` to an absolute URL in all meta tags.

The `openGraph` block in `layout.tsx` gains:
```ts
images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Adam Wheatley — Full-Stack Developer' }]
```

---

## 2. Metadata updates (`src/app/layout.tsx`)

### metadataBase (new)
```ts
metadataBase: new URL('https://adamwheatley.net'),
```

### openGraph — add images array
```ts
openGraph: {
  // ...existing fields unchanged...
  images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Adam Wheatley — Full-Stack Developer' }],
}
```

No Twitter/X card block — omitted by design.

---

## 3. Sitemap (`src/app/sitemap.ts`)

Next.js `MetadataRoute.Sitemap` — generates `/sitemap.xml` at build time.

```
/           changeFrequency: 'monthly'   priority: 1.0
/projects   changeFrequency: 'monthly'   priority: 0.8
```

---

## 4. Robots (`src/app/robots.ts`)

Next.js `MetadataRoute.Robots` — generates `/robots.txt` at build time.

- Allow all crawlers (`User-Agent: *`, `Allow: /`)
- Points to `https://adamwheatley.net/sitemap.xml`

---

## 5. JSON-LD structured data

Injected as an inline `<script type="application/ld+json">` in the `<body>` of `layout.tsx` via a React `<script>` tag with `dangerouslySetInnerHTML`. No Next.js `<Script>` component needed — this is static data, not a third-party script.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Adam Wheatley",
  "jobTitle": "Full-Stack Developer",
  "url": "https://adamwheatley.net",
  "sameAs": [
    "https://github.com/A-Wheeto",
    "https://uk.linkedin.com/in/adam-wheatley-643810195"
  ]
}
```

---

## Architecture notes

- No new dependencies — everything uses Next.js built-ins (`MetadataRoute`, `Metadata`, native `<script>`)
- No new pages or components — all changes are in `layout.tsx` and two new route files
- `og-image.png` is a static asset; updating it is a manual file replacement
- `og-image-template.html` stays in `public/` as a reference but is not linked from the site

---

## Out of scope

- Twitter/X card meta tags
- Dynamic og:image generation (next/og / ImageResponse)
- Per-page og:images (single shared image is sufficient)
- Google Search Console setup (manual step after deploy)
