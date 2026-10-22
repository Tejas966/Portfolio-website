# Prompt: research the best portfolio website designs

Copy everything below the line into a new session opened in `C:\Users\lenovo\Desktop\Portfolio-website`.

---

## Role

Act as a senior art director and design researcher who also reads code: someone who has judged Awwwards and can explain *why* a site works, not just that it looks good.

## Context: read these first

You're working in the repository for my personal developer portfolio. The site already exists and is **not** to be rebuilt from scratch.

- **Design.** Concept C, "The Watcher":
  - dark, cinematic
  - a pointer-tracking procedural canvas eye in the hero
  - projects shown as "chapters" in a GSAP-pinned horizontal reel with Lenis smooth scroll
  - per-chapter accent colours (ice `#cfe1ff`, ember `#f0a93b`, red `#e5484d`)
  - Bricolage Grotesque (display) + Geist (body)
  - case-study pages at `/work/:slug`
- **Stack.** React 19, TypeScript, Vite 8, React Router 7, GSAP 3.15 + ScrollTrigger, Lenis 1.3, prerendered static HTML. Mobile Lighthouse is 90–93 for performance and 100 for accessibility, and those must not regress.
- **Who I am.** A third-year Computer Engineering student in India. I build AI systems that answer to deterministic rules. Featured projects:
  - **The Room That Fights Back.** A local-LLM game master with a rules engine; it won Hacktoberfest Nashik.
  - **FundamentalX.** A stock-fundamentals platform with a grounded Gemini explanation.
  - **MPLADS Risk Intelligence.** Explainable public-spending risk signals; Smart India Hackathon 2026, where I was team lead.
- **Thesis.** "Models propose. Systems decide."

Before researching, read:

- `README.md`
- `docs/portfolio-research.md` (verified facts about me)
- `docs/design-directions.md` (the three concepts and why C was chosen)
- `docs/verification.md`
- `src/data/content.ts`
- `src/site/styles/site.css`
- `src/site/pages/Home.tsx`
- `src/site/pages/CaseStudy.tsx`

Then run the site (`npm run build && npm run preview`, http://localhost:4173) and look at it yourself at desktop and phone widths. You need to know what exists before judging what to change.

## Goal

Research the best portfolio and creative-developer websites currently online, and turn that research into **specific, prioritised, evidence-backed recommendations for improving my existing site within its current design direction**.

This is a research task. **Do not modify any source code, styles, content or dependencies.** The only files you create are the research deliverables listed below.

## Research method

### 1. Build a candidate list (aim for 40+, then cut to the best 15–20)

Pull candidates from several kinds of source, not just one list:

- **Awwwards.** Sites of the Day/Month and Developer Award winners in the Portfolio category from the last ~18 months, plus the Portfolio and Developer collections.
- **Galleries.** Godly (godly.website), SiteInspire, Land-book, Minimal Gallery, CSS Design Awards, The FWA.
- **Independent developer and designer portfolios** that practitioners widely cite, such as engineers at Vercel, Linear, Stripe or Figma, and creative technologists.
- **Creative-development studios.** For example, darkroom.engineering (the Lenis authors), Active Theory, Locomotive, Resn, Lusion, 14islands, Immersive Garden.
- **Technical storytelling references.** Interactive explainers and long-form engineering writing, e.g. Bartosz Ciechanowski, Stripe Press, Josh Comeau, Pudding.cool.
- **Dark, cinematic and game-adjacent sites**, since those are closest to my direction.

Prefer sites that are **live and recent**. Discard dead links, anything built mainly from a purchased template, and sites whose appeal is only a heavy WebGL demo with no content.

### 2. Actually visit every finalist

For each of the 15–20 finalists:

- **Open it in the browser.** Don't rely on gallery thumbnails, search snippets or someone else's summary.
- **Look at it at ~1440 px desktop and ~390 px mobile.** Scroll the whole homepage and open at least one project or case-study page.
- **Take screenshots** of the specific moments you'll cite. Save them under `docs/design-research/shots/<site-slug>-<n>.png`.
- **Note concrete observations, not adjectives.** For example: "hero headline ~11vw, condensed grotesk, single line, no subhead until scroll", or "project list is a 4-column table: index / name / role / year; hover swaps a video thumbnail that follows the cursor". "Clean and modern" is not an observation.
- **Record how the site behaves technically where you can tell:** smooth scrolling, scroll-pinning, WebGL or canvas, page transitions, load time, what happens with `prefers-reduced-motion`, keyboard focus visibility, and mobile degradation. Use DevTools or `read_page`/`get_page_text` where useful. Don't claim a library is used unless you can see evidence (script names, globals, DOM classes like `.lenis` or `.pin-spacer`).
- **Run a quick Lighthouse mobile pass on 5–8 of them** (`npx -y lighthouse@13.5.0 <url> --only-categories=performance,accessibility --form-factor=mobile`). That shows which beautiful sites are also fast and accessible, and which aren't.

If a site blocks automation, asks you to sign in, or shows a cookie banner, decline non-essential cookies, never sign in, and move on to another site if needed. Never fabricate an observation about a site you couldn't load.

### 3. Analyse across sites

Group findings by these dimensions, and for each one say what the strongest sites do differently from average ones:

1. **First five seconds.** How quickly the hero communicates who the person is and what they do; headline length; how big the name is versus the claim.
2. **Typography.** Display/body pairing, scale ratios, tracking at large sizes, how condensed faces are handled, how type behaves on mobile.
3. **Layout and grid.** Density, whitespace, asymmetric compositions, how sections are separated (rules, colour shifts, full-bleed changes).
4. **Project presentation.** Lists vs cards vs reels vs full-screen chapters; what a project tile shows (title, role, year, outcome, media); how media is used (video loops, stills, live embeds, diagrams); hover and preview patterns.
5. **Case-study storytelling.** Structure, the ratio of visuals to text, how technical depth is presented without overwhelming (diagrams, annotated screenshots, code, metrics, sidenotes), and the "next project" pattern.
6. **Motion.** What is animated, why, duration and easing, scroll-linked vs time-based, and which effects add meaning versus decoration. Note anything that felt exhausting or hijacked the scroll.
7. **Navigation and wayfinding.** Menus, progress indicators, section indexes, cursor-following elements, page transitions, back-to-top.
8. **Personality and voice.** How copy creates a sense of a real person: microcopy, footers, easter eggs, about sections.
9. **Media handling.** How sites present projects that have no great screenshots (relevant to my FundamentalX), e.g. typographic treatments, diagrams, UI recreations, abstract visuals.
10. **Mobile.** What the best sites change, rather than shrink, on phones.
11. **Accessibility and performance.** Which award-level sites manage both, and how.

## Deliverables

Create these files and nothing else:

### `docs/design-research/portfolio-references.md`

1. **Summary.** Half a page: the five biggest lessons for my site.
2. **Reference catalogue.** One entry per finalist:
   - name
   - URL
   - date visited
   - type (dev portfolio / studio / editorial / technical storytelling)
   - one-line verdict
   - 3–6 specific observations, each linked to a screenshot file
   - what's worth learning
   - what to avoid
   - Lighthouse scores if measured
3. **Cross-site analysis** across the 11 dimensions above, with examples cited by site.
4. **Gap analysis of my site.** Compare my current site against the best references, dimension by dimension. Be blunt: what's already strong, what's weak, what looks generic.
5. **Recommendations**, ranked by impact versus effort. Each one includes:
   - the problem on my site, with a screenshot of my site
   - the reference(s) that inspired it
   - the concrete change (what, where, approximate values: sizes, timings, colours)
   - which files it would touch (`src/site/...`)
   - risks to performance, accessibility or mobile, and how to mitigate them
   - effort estimate (S/M/L)
   - whether it stays within "The Watcher" direction

   Include specifically:
   - a recommendation for presenting **FundamentalX** until real screenshots exist, and once they do
   - ideas for using **real project screenshots and video** (the panels now use desaturated screenshot backgrounds)
   - whether the hero and the reel could be more distinctive without becoming slower or less readable
6. **Things not to do.** Popular patterns that would hurt this particular site, and why.
7. **Sources.** Every URL visited, with access date.

### `docs/design-research/shots/`

Screenshots referenced in the document, named `<site-slug>-<n>.png`. Keep each under ~400 KB (JPEG/WebP is fine).

## Rules

- **Originality.** The aim is to learn principles, not to copy. Never recommend reproducing another site's layout, branding, copy or signature interaction wholesale. Every recommendation should be adapted to my content and to "The Watcher".
- **Truthfulness.** Don't invent facts about me or my projects. Use only what's in `docs/portfolio-research.md` and `src/data/content.ts`. If a recommendation needs content I haven't provided (a video, a new metric), say so and mark it as needing my input.
- **Evidence.** Every observation about a reference site must come from actually loading it in this session. If a page failed to load, say so.
- **No dependency creep.** Prefer recommendations achievable with the existing stack (GSAP, Lenis, Canvas 2D, CSS). If you think a new library such as Three.js is justified, argue the cost (bundle size, mobile, accessibility) explicitly.
- **Constraints.** Recommendations must keep mobile Lighthouse ≥ 90 for performance and 100 for accessibility, keep reduced-motion support, and keep content readable without JavaScript.
- **Scope.** Don't change code. Don't commit anything. Don't install packages into the project.
- **When done.** Summarise the top five recommendations in chat, link the document, and ask me which ones to implement.
