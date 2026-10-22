# Design directions (Phase 2–3)

## Creative brief

- **Identity.** A third-year Computer Engineering student who builds AI systems and then engineers their limits: rules engines, evals, grounding checks and fallbacks. Interests in backend work and quant finance (from `portfolio-research.md` §5).
- **Audience.**
  - Recruiters (they skim in about 30 s).
  - Technical founders and engineers (they read the case studies).
- **Main message.** *Models propose. Systems decide.*
- **Strongest narrative.** The Room That Fights Back: a small local model with real power, kept honest by a solvability checker. It's backed by measured evals.
- **Personality.** Precise, curious, honest about limits. Confident without overstating seniority.
- **Constraints.**
  - Static front end.
  - Fast on mid-range Android.
  - WCAG 2.2 AA.
  - No invented metrics.
  - No screenshots of named individuals beside risk flags.

## Library evaluation

| Library | Verdict | Reason |
|---|---|---|
| GSAP 3.15 + ScrollTrigger | **Use only where scroll choreography is the point (C)** | Best-in-class timelines and pinning; free under the Standard licence; `gsap.context()` and `matchMedia()` give clean React cleanup and responsive opt-outs. |
| Lenis 1.3 | **C only** | Smooth scroll is part of C's cinematic feel. Wired as the README says: `lenis.on('scroll', ScrollTrigger.update)`, a GSAP ticker drives `lenis.raf`, `lagSmoothing(0)`, and `autoRaf: false` so raf isn't driven twice. Skipped entirely under reduced motion. |
| Vanta | **Reject** | Last published in Sept 2022 and depends on Three.js. It produces generic animated backgrounds that say nothing about the work. |
| Three.js | **Reject for now** | No concept needs 3D. The Watcher eye is about 100 lines of Canvas 2D, echoing Echo's own procedural Canvas art. |
| Motion for React | **Not needed** | A and B only need CSS transitions and IntersectionObserver. Adding it would duplicate GSAP in C. |
| React Bits / Aceternity | **Reject** | Copy-paste effect components (spotlights, beams, glowing grids) are the visual language of template portfolios, the opposite of "original". |

## Concept A: Review Pipeline

1. **Thesis.** The site behaves like the systems it describes: a proposal enters, passes visible checks, and gets a verdict. It reads as an engineering logbook, not a showreel.
2. **Visual identity.**
   - Paper grey `#ecebe6`, ink `#121212`, signal orange `#c43c00` (text-safe) / `#ff4d00` (focus and selection).
   - Verdict colours: green, amber, red, indigo. Each is always paired with a text label.
   - Faint 12-column guides; hairline rules.
3. **Typography.** Instrument Sans (tight, very large display) and Martian Mono (meta, labels, logs). Fluid `clamp()` scale.
4. **Layout.** Split hero (statement + pipeline card), a sticky mono header, projects as a ruled table of expandable case files, and a giant mono email for contact.
5. **Motion.** One signature loop: a real decision from Echo's failure demo lights the 9 rule stages in sequence and receives a verdict. Everything else is an instant hover colour change.
6. **Interaction.**
   - The case files are disclosure buttons (`aria-expanded`).
   - A copy-email button that falls back gracefully.
   - The résumé appears as a visibly disabled, dashed control.
7. **Project storytelling.** One-liner → problem → what I built → *key decision* card → evidence grid → stack → context.
8. **Mobile.** The hero stacks. Case-file rows collapse to number, name and meta. Column guides are removed.
9. **Accessibility.**
   - Semantic headings and landmarks; a skip link.
   - `aria-live` on the verdict.
   - Reduced motion shows the final state with no cycling.
   - All text meets AA contrast.
10. **Performance risks.** Minimal: about 7 KB of JS for the route, plus two variable fonts.
11. **Trade-offs.** The thesis is immediately legible and very fast. Less emotional, and the density can feel like a dashboard.
12. **Implementation.** React + CSS only. Components: `PipelineCard`, `CaseFile`, `EvidenceGrid`.

## Concept B: Field Notes

1. **Thesis.** A small print journal about constrained machines. Projects are short essays with margin notes, pull quotes and engraved diagrams: an engineer who can explain *why*.
2. **Visual identity.** Ivory `#f3eee4`, ink `#1d1b18`, oxblood `#8b1e1e`, double rules and dotted leaders. The screenshot gets a slight sepia tint so it sits on the paper.
3. **Typography.** Newsreader with optical sizes (display at opsz 72, text at body size), italic for emphasis, a drop cap. IBM Plex Mono in small caps for metadata.
4. **Layout.** Masthead (issue number and date), a statement hero, "In this issue" contents, one essay per project in two columns (a 36 rem measure plus sticky margin notes), a shaded "About the author" panel, and a letter-style "Correspondence".
5. **Motion.** Paragraph groups settle in once on scroll; contents titles nudge on hover. Content stays visible if JS fails, because the hidden state only applies under `.cb--js`.
6. **Interaction.** Contents anchors, plus links. Deliberately quiet.
7. **Project storytelling.** The strongest for case studies: standfirst, problem, build, a pull-quote decision, a numbered figure, and evidence in the margin.
8. **Mobile.** Margin notes drop below the text; the masthead centres; the contents list becomes two columns.
9. **Accessibility.** A real reading order. The SVG figure has a `<title>`. Reveal is skipped for reduced motion. Oxblood on ivory is 8:1.
10. **Performance risks.** The heaviest fonts (Newsreader opsz, roman + italic, about 280 KB for Latin). In production, subset to Latin and preload the display face.
11. **Trade-offs.** The most distinctive among developer portfolios, and excellent for readers. Less spectacle for skimmers, and it reads "writer" before "AI engineer".
12. **Implementation.** React + CSS + IntersectionObserver. Components: `Essay`, `MarginNotes`, `Figure`, `PipelineFigure` (SVG).

## Concept C: The Watcher

1. **Thesis.** Taken from Echo itself: the visitor is watched by a procedural eye, and the projects are chapters of a dark, cinematic, scroll-driven reel.
2. **Visual identity.** Void `#0b0b0d`, bone `#e9e4da`, ember `#f0a93b`, and per-chapter colours (ice, ember, red) used as tinted gradients and huge numerals.
3. **Typography.** Bricolage Grotesque (800 weight, condensed width, huge) and Geist for body text.
4. **Layout.** A full-screen hero (eye + three-line statement), a pinned horizontal chapter reel, a large-type about section, and an "exit door" contact section with a warm glow.
5. **Motion.**
   - Hero lines rise from masks.
   - The Canvas eye tracks the pointer, blinks, and dilates over links.
   - A GSAP-pinned horizontal reel (scrub 0.6).
   - About-section words brighten with scroll, from 50% to 100% opacity, so they're never unreadable.
6. **Interaction.** The pointer-reactive eye, Lenis smooth scroll with native anchor handling, and the `mix-blend-mode: difference` header.
7. **Project storytelling.** Chapter panels: kicker, title, one-liner, decision, three headline numbers, stack and status. Best as a teaser, with depth pushed to case-study pages.
8. **Mobile.** Below 900 px, `gsap.matchMedia` turns pinning off and the reel stacks vertically. The eye is resized.
9. **Accessibility.**
   - Reduced motion: no Lenis, no GSAP, a still eye frame, stacked reel.
   - The eye is `aria-hidden`.
   - Muted text is 7.4:1.
10. **Performance risks.**
    - About 52 KB gzipped of extra JS (GSAP + Lenis).
    - A continuous canvas loop, paused off-screen and in hidden tabs, with DPR capped at 2.
    - Pin recalculation on resize.
11. **Trade-offs.** The most memorable and best demonstrates creative-coding range. Heaviest; the horror tone doesn't suit the finance or government projects; and it carries the most mobile QA risk.
12. **Implementation.** GSAP + ScrollTrigger + Lenis. Components: `WatcherEye` (Canvas 2D), `ChapterReel`, `ScrubText`.

## Isolation

- Each concept is a lazy-loaded route (`src/concepts/{a,b,c}`).
- Each has its own CSS file with every selector under its root class (`.ca`, `.cb`, `.cc`) and its own tokens.
- Fonts and libraries are imported inside the concept, so Vite emits them in that route's chunk.
- The preview switcher uses inline neutral styles so it inherits no concept's tokens.

## Recommendation

Use **A** for the system and home page, and **B's** editorial layout for the case-study pages. Reasoning is on the comparison page (`/`).

## Selection

Tejas chose **Concept C, The Watcher** (19 Oct 2026). It's implemented as the production site in `src/site/`. The previews stay available in development at `/previews`.

Changes from the preview made during production:

- The hero rise is CSS instead of GSAP, so it starts on first paint of the prerendered HTML.
- Roman numerals became outlined 01/02/03.
- Added case-study pages with a scroll-driven pipeline diagram, a toolkit section, a record section, and a 404 page.
