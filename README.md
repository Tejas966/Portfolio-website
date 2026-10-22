# Tejas Joshi · Portfolio

Personal portfolio for Tejas Joshi, built on design direction **C, "The Watcher"**. It's a dark, cinematic site that borrows its pointer-tracking eye from *The Room That Fights Back*. Projects appear as chapters in a scroll-pinned reel, and each has its own engineering case study.

The home page has these sections: hero, chapter reel (3 projects), side rooms (smaller work), about, toolkit, record, and contact. Each case study is at `/work/:slug`.

What's on the page, briefly:

- **Hero.** "Tejas Joshi builds AI systems that answer to rules." above the thesis *It watches. It proposes. The rules decide.* The eye (the Warden from Echo, captioned and linked to its case study) follows the pointer or keyboard focus and glances around the page when left alone. On wide screens it sits beside the headline.
- **Chapter reel.** Each chapter pairs a short pitch with a framed "camera feed": the Echo cell, a live HTML "metric validity board" for FundamentalX (statuses and reasons, never values), and the MPLADS dashboard. Echo's panel replays the real veto from the failure demo, stage by stage, as the reel moves. A chapter index (I · II · III) shows where you are and jumps between chapters. Below 900 px each chapter becomes feed first, then title, one line, one number and the case-study link.
- **Case studies.** "On this page" highlights the section you're reading. The Echo pipeline has a "Replay the review" button. FundamentalX shows the metric validity board in its overview.
- **Footer.** A colophon, and a **Motion: on/off** switch that turns off smooth scroll, the pinned reel and the eye animation for visitors who want a calmer page. It's stored in `localStorage` and applied before first paint.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173 (includes the dev-only /previews routes)
npm run build      # typecheck → client build → SSR build → prerender into dist/
npm run preview    # serve dist/ at http://localhost:4173 like a static host
npm run typecheck
```

Requires Node 20+ (developed on Node 22).

## Stack

| Piece | Why it's here |
|---|---|
| React 19 + TypeScript 6 + Vite 8 | Component model, type safety, fast builds |
| React Router 7 | `/`, `/work/:slug`, 404, dev-only `/previews/*` |
| GSAP 3.15 + ScrollTrigger | Pinned horizontal chapter reel, scrubbed about-text, the Echo pipeline diagram, reading progress |
| Lenis 1.3 | Smooth scrolling, driven by the GSAP ticker so both share one frame (`src/site/motion.tsx`) |
| Canvas 2D | The Watcher eye (`src/site/WatcherEye.tsx`); no Three.js or WebGL |
| Fontsource | Self-hosted Bricolage Grotesque and Geist, so no third-party font requests |

There's no backend. The site is static and prerendered.

## How the build works

1. `vite build` builds the client bundle.
2. `vite build --ssr src/entry-server.tsx` builds a render function.
3. `scripts/prerender.mjs` renders every route to HTML, with a per-page `<title>`, description and Open Graph tags. It writes:
   - `dist/index.html`
   - `dist/work/<slug>/index.html` **and** `dist/work/<slug>.html`, so `/work/x`, `/work/x/` and `/work/x.html` all work without rewrites
   - `dist/404.html`
   - `dist/robots.txt`
4. The client then hydrates the prerendered HTML (`src/main.tsx`). Content is readable even without JavaScript.

## Deploying

`dist/` is plain static files, and works on Vercel, Netlify, Cloudflare Pages or GitHub Pages (root domain).

- Build command: `npm run build`. Output directory: `dist`.
- **The live domain** is `PRODUCTION_URL` in `scripts/prerender.mjs` (currently `https://tejas-joshi-portfolio.vercel.app`). It's used for canonical URLs, `og:url`, `og:image` (`/og.png`) and `sitemap.xml`. Change it there if the domain changes, or override a single build with `SITE_URL=https://example.com npm run build`.
- Hosts serve `404.html` for unknown paths automatically. `npm run preview` doesn't, and just returns a plain 404.
- GitHub Pages under a sub-path (`user.github.io/repo/`) would need Vite's `base` option; a user site or custom domain works as is.

**Live at https://tejas-joshi-portfolio.vercel.app**, deployed on Vercel from this repo's `main` branch; every push redeploys it.

## Updating content

All copy lives in **`src/data/content.ts`**:

| To change | Edit |
|---|---|
| Name, intro, about, links | `person` |
| Résumé | Put the PDF in `public/`, then set `person.resume = '/tejas-joshi-resume.pdf'`. The download button appears automatically. |
| Projects and case studies | `projects` (each case study is a list of typed blocks: `p`, `list`, `table`, `figure`, `diagram`, `decision`, `code`, `note`) |
| Skills | `toolkit` (each skill must name the project that shows it) |
| Timeline | `record` |
| Unverified fields | Marked `rolePending` / `contextPending`; they render a visible "to confirm" label. Remove the flag once the fact is confirmed. |

Images go in `public/images/` (WebP, with width and height set in the data).

New case studies need:

- a `slug` in `projects`
- an entry in `routes` (automatic, from `projects`)
- optionally a diagram in `src/site/diagrams/Diagrams.tsx`

## Project layout

```
src/
  data/content.ts         all copy + SEO
  site/
    motion.tsx            Lenis + GSAP provider, reduced-motion hook, scroll helper
    Layout.tsx            header/footer, per-route title/meta, scroll and focus on navigation
    WatcherEye.tsx        canvas eye
    pages/                Home, CaseStudy, NotFound
    diagrams/             accessible HTML diagrams (incl. the scroll-driven Echo pipeline)
    styles/site.css       tokens + all production styles (scoped under .cc)
  previews/               Phase 3 design concepts A/B/C (dev only, excluded from builds)
  entry-server.tsx        prerender entry
scripts/prerender.mjs
docs/                     research dossier, design directions
```

## Accessibility and motion

- Skip link, landmarks, one `h1` per page, visible focus rings.
- Focus moves to `<main>` (or to the target section) after navigation.
- Contrast is AA or better on every text token.
- `prefers-reduced-motion`:
  - no Lenis and no GSAP
  - the reel stacks vertically
  - the eye renders one still frame
  - the headline doesn't animate
  - the pipeline diagram shows its final state
- The footer's **Motion** switch gives the same reduced-motion behaviour on request (class `motion-off` on `<html>`, set by an inline script in `index.html` before first paint). When the OS already asks for reduced motion, the switch shows "off (system setting)".
- The eye follows keyboard focus as well as the pointer.
- Below 900 px the reel stacks instead of pinning.
- Keyboard focus inside the pinned reel scrolls the page so the focused panel slides into view.

## Measured results (local, `npm run preview`, Lighthouse 13.5 mobile emulation)

| Page | Perf | A11y | Best practices | SEO | LCP |
|---|---|---|---|---|---|
| `/` | 92–93 | 100 | – | – | 3.0–3.1 s |
| `/work/room-that-fights-back` | 94 | 100 | – | – | 3.0 s |
| `/work/fundamentalx` | 96 | 100 | – | – | 2.7 s |
| `/work/mplads-risk` | 92 | 100 | – | – | 3.1 s |

Re-measured on 22 Oct 2026 with everything above in place (performance and accessibility only; best practices and SEO were 100 in the earlier run and weren't re-run). FCP is 1.7–1.8 s and CLS 0 on every page, helped by the font preloads that `scripts/prerender.mjs` adds.

These are local runs on a dev laptop, not field data. A real host with HTTP/2 and compression will differ.

## Known limitations

- **JS weight.** About 151 KB gzipped: React, Router, GSAP and Lenis, loaded on every page. That's the cost of the chosen direction; mobile performance scores are 92–95.
- **Echo screenshots** are 800 px wide (the mind panel) and 1124 px (the scene), captured from a local run. The live-Gemma latencies in the case study come from the project README; the capture session itself ran in fallback mode because the local model was too slow, and the caption says so.
- **No screenshots of FundamentalX.** The local copy's database user is rejected by MySQL (`ER_ACCESS_DENIED_ERROR`), so its pages can't load. Its panel is text-only (no camera feed), and its case study uses diagrams and tables only. To add one, save a screenshot as `public/images/fundamentalx-bg.webp` (about 1000–1200 px wide), then on the FundamentalX entry in `src/data/content.ts` set `bg` (case-study hero) and `monitor` (the framed feed in the chapter panel, with `alt` and a `label` such as `CAM 02 · …`).
- **Chapter panels** show real captures in a framed “camera feed” (`monitor` in `content.ts`): the Echo cell scene, and the MPLADS dashboard cropped to aggregate cards and the map, so no MP or vendor names appear. They have real alt text, are desaturated until hover or focus, and are lazy-loaded. Case-study heroes still use `bg` as a decorative backdrop.
- **Notes on content:** there's no résumé yet, so no résumé link is shown. The MPLADS live demo returns 404, so it isn't linked. Hackathon results are Tejas's own statements, with no public results page linked. See `docs/portfolio-research.md` §8–9.
- No automated test suite. Verification was manual and browser-based (see the session notes in `docs/`).
