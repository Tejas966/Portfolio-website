# Portfolio design research: references and recommendations for "The Watcher"

Research date: 20 Oct 2026. Every observation about a reference site comes from loading it in this session: headless Chrome 141 at 1440×900 (desktop) and 390×844 (mobile, touch, Android UA), a reduced-motion pass (`prefers-reduced-motion: reduce`), a four-press Tab probe, and a script that read the DOM, fonts, loaded scripts and transfer sizes. Lighthouse 13.5 ran in mobile mode on 8 references and on this site. Screenshots are in [`shots/`](shots/); they're JPEG and named `<site>-<n>.jpg`.

**How to read the technical notes.** "Lenis" means the `lenis` class was on `<html>`. "GSAP" means `gsap`/`ScrollTrigger` strings were found in the site's own bundles. "WebGL renderer" means a `WebGLRenderer` string was in a bundle and a `<canvas>` was on the page. I don't name a library without one of those signals. Byte counts are what had transferred about 6 s after `networkidle`, so lazy-loaded media may add more. Focus results come from four Tab presses and the computed `outline`/`box-shadow` of `document.activeElement`.

**Limits.** These are headless Chromium runs on a laptop, not real phones, not Safari, and not field data. Frame-by-frame smoothness wasn't judged. Two sites (Houmahani Kane, Locomotive) couldn't be assessed properly, so they're not finalists (see [Sources](#7-sources)).

---

## 1. Summary: the five biggest lessons for this site

1. **The best dark, cinematic portfolios still say who and what in one sentence.** Sam Goddard's hero is a single 86 px sentence with name, role and employer ([samgoddard-1](shots/samgoddard-1.jpg)). Darkroom puts a dictionary definition under its 200 px slogan ([darkroom-1](shots/darkroom-1.jpg)). Your triad *"It watches. It proposes. The rules decide."* is more distinctive than any hero line in this set, but your name and what you do sit in a 17 px line above it ([tejas-1](shots/tejas-1.jpg)). That's a ratio of about 9:1. Keep the triad, and make the identity line carry real weight.
2. **Signature content beats signature effects.** The sites I'd learn most from make the work itself the spectacle: Rauno's craft page runs real, working components inside the cards ([rauno-2](shots/rauno-2.jpg)), and samwho's essays are playable simulations ([samwho-2](shots/samwho-2.jpg)). Your strongest asset is already built: the Echo veto pipeline that lands on `VETOED · SOLVABILITY` ([tejas-7](shots/tejas-7.jpg)). It's buried in the second screen of a case study. A compact version belongs on the home reel, and it costs no images or new libraries.
3. **Media should read as evidence, not wallpaper.** Basement gives project media about 57% of the row at full contrast ([basement-1](shots/basement-1.jpg)). Jesper Landberg shows the actual screens ([jesperlandberg-1](shots/jesperlandberg-1.jpg)). Your panel screenshots are greyscale, luminosity-blended at 30–42% opacity and covered by two gradients ([tejas-2](shots/tejas-2.jpg)). They read as texture, so a recruiter never actually *sees* Echo or MPLADS. Frame the capture as a visible "surveillance monitor" inside the panel and keep the wash only behind the text.
4. **Long horizontal reels need wayfinding.** Rauno ([rauno-1](shots/rauno-1.jpg)) and Stripe Press ([stripepress-1](shots/stripepress-1.jpg)) both pin a small tick-ruler that shows where you are in a long sideways or 3D track. Your pinned reel has no position indicator, and the only cue is "Keep scrolling →". A three-mark chapter index (I · II · III) that fills as the reel moves, and that is also a set of links, fixes that cheaply.
5. **Award-level sites get accessibility and restraint wrong more often than right, and that's your opening.** Among the 18 finalists, the Tab probe found no visible focus ring on Rauno, Lusion's first button, Basement's focus targets or samwho's logo keys. Igloo never moved focus off `<body>` and exposes no text in the DOM at all. Lenis stayed on under reduced motion at Darkroom, Olivier Larose and Cipher. Active Theory and Lusion (under reduced motion) still showed a loader after 6–16 s. Your site already beats all of that: 100 accessibility, Lenis and GSAP off under reduced motion, content readable with no JavaScript. One caution: Lighthouse gave Basement 100 for accessibility despite its invisible focus, so the score alone doesn’t prove much. Every recommendation below keeps your site ahead, and the cheapest distinctiveness win is to make that care *visible*: a colophon, plus a motion toggle.

---

## 2. Reference catalogue

18 finalists (chosen from 51 candidates, see §7). Types: **dev portfolio**, **studio**, **editorial**, **technical storytelling**. Lighthouse scores are mobile (performance / accessibility) where measured.

### 2.1 Sam Goddard
- **URL:** https://samgoddard.co.uk/ (case page: /work/fin) · visited 20 Oct 2026 · **dev portfolio** (in the Awwwards Portfolio listing, dated 12 Oct 2026)
- **Verdict:** the closest match to "dark, cinematic, engineer", and the best lesson in hero clarity and voice.
- **Observations**
  - The hero H1 is one sentence, *"Samuel Goddard. Staff Design Engineer. Currently helping humans bridge the gap between design and code at Fin."* It's set at 86.4 px in an editorial serif (`editorial`, regular weight, line-height 1.0, all caps) with stylistic alternates on a few letters, over a dithered greyscale portrait ([samgoddard-1](shots/samgoddard-1.jpg)).
  - Body, nav and meta are all Geist Mono caps at about 12 px, with `//` as the separator everywhere: `HOME // WORK // MUSIC // CONTACT`.
  - Projects are a ruled two-column index: `FIN // [CURRENT]` left, the one-line client description right-aligned, with hairline rules between rows ([samgoddard-2](shots/samgoddard-2.jpg)).
  - A fixed bottom HUD shows socials, a live presence counter ("1 HUMAN IS VISITING") and "LAST PLAYED" from a music feed. The page also has a colophon section saying how the site was built.
  - The case page is a fixed split: headline and mono body on the left, and on the right a dot-matrix (dithered) rendering of the client's mark instead of a screenshot. `ROLE // … YEAR // …` sits on top and `VISIT FIN · NEXT PROJECT // INTERCOM` along the bottom ([samgoddard-3](shots/samgoddard-3.jpg)).
  - On mobile, the H1 reflows to about 52 px over six lines and the nav stays inline ([samgoddard-4](shots/samgoddard-4.jpg)).
- **Technical:** 7 canvases (the dither effects), no Lenis, one reduced-motion media rule. The focus ring is a 1 px white dotted outline, which is visible but faint. There's a "Skip to content" link.
- **Worth learning:** a one-sentence identity at display size; an abstract treatment of a project's mark when a screenshot isn't the point; a single separator glyph used consistently as a voice device.
- **Avoid:** the 12 px all-caps mono body. It's hard to read in long paragraphs, and you have more to explain than Sam does.
- **Lighthouse:** 89 / 100 (see §2.20).

### 2.2 Brittany Chiang
- **URL:** https://brittanychiang.com/ (+ /archive) · visited 20 Oct 2026 · **dev portfolio**
- **Verdict:** the most-cited developer portfolio. It's not cinematic, but it's the benchmark for skimmability.
- **Observations**
  - A two-column layout: a sticky left column with the name (48 px), role, a one-line claim, a section nav and social icons, and a scrolling right column ([brittanychiang-1](shots/brittanychiang-1.jpg)).
  - The section nav marks the active section with a rule that lengthens next to the label (about 32 px → 64 px).
  - Experience rows follow `date range | role · company ↗ | 2–3 line summary | tech chips` ([brittanychiang-2](shots/brittanychiang-2.jpg)).
  - Hovering a row lifts it onto a slightly lighter card *and dims its siblings* ([brittanychiang-1](shots/brittanychiang-1.jpg): the "Algolia" row is hovered).
  - The footer colophon reads "Loosely designed in Figma and coded in Visual Studio Code… Built with Next.js and Tailwind CSS… set in the Inter typeface". A small TARDIS illustration sits bottom right as an easter egg.
- **Technical:** Next.js; 3 reduced-motion rules; default focus ring visible. The first capture (6 s) showed the page still fading in behind a large radial glow.
- **Worth learning:** hover-to-dim-siblings for the ruled lists (Side rooms, Record); a colophon; the lengthening active-nav rule.
- **Lighthouse:** 59 / 96, with an LCP of 11.5 s.
- **Avoid:** her layout itself. It's widely copied (this is the "Brittany template" problem), and it's not your direction.

### 2.3 Rauno Freiberg
- **URL:** https://rauno.me/ (+ /craft, /projects) · visited 20 Oct 2026 · **dev portfolio**
- **Verdict:** the strongest case for "show the working thing, not a picture of it".
- **Observations**
  - The home page is a horizontal strip of white cards on light grey, driven by wheel scroll. A tick-ruler minimap at the top centre shows your position in the strip ([rauno-1](shots/rauno-1.jpg)).
  - /craft is a three-column masonry of *live* micro-interactions. A combobox is being typed into, the "Ask Agent" pill is real, and one card has its own "Disable dynamic motion" switch. Each card has a title and a month and year ([rauno-2](shots/rauno-2.jpg)).
  - /projects is a plain two-column list of name and year.
  - **On mobile the horizontal strip is kept**, one card per screen, under the same ruler ([rauno-3](shots/rauno-3.jpg)).
- **Technical:** no Lenis, no canvas on the home page. **No visible focus indicator:** all four Tab stops had `outline: none` and no box-shadow.
- **Worth learning:** the minimap as wayfinding for a horizontal track; live UI as project media; a per-demo motion switch.
- **Avoid:** the invisible focus state.

### 2.4 Olivier Larose
- **URL:** https://olivierlarose.com/ · visited 20 Oct 2026 · **dev portfolio** (independent design engineer, Montreal)
- **Verdict:** the best project *index*: dense, scannable and fast.
- **Observations**
  - The hero is a centred block of editorial serif caps at 50 px (PP Editorial New, tracking −0.015 em) with ornamental glyphs. One letter pair is inverted in a black box ([olivierlarose-1](shots/olivierlarose-1.jpg)).
  - The project index is a full-width table of `project | role | client | year` with 40 px rows and hairline rules. The hovered row inverts to black and its text shifts about 14 px right ([olivierlarose-2](shots/olivierlarose-2.jpg)). Rows link straight to the live sites; there are no case studies.
  - The hairlines draw in from the left at staggered lengths on load.
  - **On mobile the table becomes two columns (project | year) at about 26 px.** The role and client columns are dropped, not squeezed ([olivierlarose-3](shots/olivierlarose-3.jpg)).
- **Technical:** **67 KB total, 10 KB JS.** It has Lenis, which **stays on under reduced motion.** Default focus ring visible.
- **Worth learning:** a table that sheds columns on mobile; the inverted hover row.
- **Lighthouse:** 92 / 95, but CLS is 0.159 (the only finalist above 0.1).
- **Avoid:** smooth scroll that ignores reduced motion.

### 2.5 Jesper Landberg
- **URL:** https://jesperlandberg.com/ (case: /projects/nathan-riley) · visited 20 Oct 2026 · **dev portfolio** (Awwwards SOTD, 29 Sep 2026)
- **Verdict:** a WebGL reel done well on desktop. It's also the best example of *changing* the format for mobile.
- **Observations**
  - On desktop, the projects sit on a curved WebGL carousel of real site captures over a dark perspective grid. Wheel scroll moves the track sideways. Titles are tiny labels under each screen ([jesperlandberg-1](shots/jesperlandberg-1.jpg)).
  - **On mobile the carousel is gone.** It becomes a vertical stack of full-width cards, each with media, a title and a round arrow button ([jesperlandberg-2](shots/jesperlandberg-2.jpg)).
  - A project opens as a sheet over the reel: a sticky left column (title, one sentence, year chip, external-link button) and a right column of stacked screenshots ([jesperlandberg-3](shots/jesperlandberg-3.jpg)).
  - The DOM includes a plain-text bio and award count ("77 awards — 30× Awwwards…"), plus `/llms.txt` and `/full` links.
- **Technical:** WebGL renderer plus GSAP. About 7.6 MB had transferred by 6 s. Reduced motion: the same WebGL carousel. Default focus ring visible on the project links.
- **Worth learning:** different mobile and desktop presentations of the same list; media that shows the actual product.
- **Lighthouse:** 66 / 100, with 33 MB transferred.
- **Avoid:** the payload. WebGL for the reel would undo your Lighthouse score.

### 2.6 Keita Yamada (p5aholic)
- **URL:** https://p5aholic.me/ (+ /projects/) · visited 20 Oct 2026 · **creative developer portfolio**
- **Verdict:** proof that a shader can be ambience rather than content.
- **Observations**
  - A full-viewport layout inside a 1 px frame inset about 36 px. The name is 60 px in a light weight, the nav is a bulleted list, and a narrow bio column sits bottom right. Behind it, a monochrome grain shader drifts with scroll ([p5aholic-1](shots/p5aholic-1.jpg)).
  - /projects has right-aligned project names at about 60 px light, each with a bold 12 px credit line (`April.2026 / Dev / Design: PUNCH`) ([p5aholic-2](shots/p5aholic-2.jpg)).
  - A vertical **Light / Dark / Monospaced** theme switch sits at the bottom left. There's also a "Copycats" page listing sites that copied his.
- **Technical:** WebGL renderer plus GSAP, about 500 KB. Default focus ring.
- **Worth learning:** one ambient effect, kept behind type; credits written as one line.
- **Avoid:** the 12 px light grey meta on mid-grey grain, which is borderline for contrast.

### 2.7 Lynn Fisher
- **URL:** https://lynnandtonic.com/ · visited 20 Oct 2026 · **dev/design portfolio** (rebuilt every year)
- **Verdict:** the best use of a *book* metaphor, relevant because your projects are already "chapters".
- **Observations**
  - A single screen: a 96 px display name (`Hubano-Rough`) and the line "Designer for the Web" over a **table of contents with dotted leaders and roman numerals** (`ABOUT ……… I`, `WORK ……… II`, up to VI) ([lynnandtonic-1](shots/lynnandtonic-1.jpg)).
  - **The focus ring is a 4 px solid red outline plus a shadow**, the most visible of any finalist, and it matches the design.
  - On mobile the name grows to fill the width.
- **Technical:** 411 KB, about 1 KB JS.
- **Worth learning:** a contents page as navigation; a focus style designed as part of the look.

### 2.8 darkroom.engineering
- **URL:** https://darkroom.engineering/ · visited 20 Oct 2026 · **studio** (the Lenis authors)
- **Verdict:** a single-accent dark system that's loud without becoming noisy.
- **Observations**
  - Red on black only. The H1 *WHERE THINGS GET DEVELOPED* is 200 px in a pixel display face (`therma`) with tracking −10 px (−0.05 em), followed by a dictionary entry: "[DARKROOM], NOUN — a lightproof room for developing photographs" ([darkroom-1](shots/darkroom-1.jpg)).
  - Three featured projects are full-bleed rendered scenes with the title overlaid ([darkroom-2](shots/darkroom-2.jpg)).
  - A section called "Tools we build and use" lists their open-source libraries (Satus, Lenis, Hamo, Tempus) as proof of craft.
  - **Mobile first screen:** only the header bar is visible, and the headline starts below the fold ([darkroom-3](shots/darkroom-3.jpg)).
- **Technical:** Lenis plus GSAP/ScrollTrigger, 2.4 MB. The focus ring is a 2 px solid red outline, visible and on-brand. **Lenis stays on under reduced motion.**
- **Worth learning:** one accent at a time (your per-chapter colours already do this; keep it disciplined); the definition device, which suits "The Watcher".
- **Lighthouse:** 88 / 96.
- **Avoid:** an empty first mobile screen.

### 2.9 Lusion
- **URL:** https://lusion.co/ · visited 20 Oct 2026 · **studio**
- **Verdict:** beautiful WebGL with clear copy. Its mobile and reduced-motion handling are cautionary.
- **Observations**
  - A one-sentence claim sits in the header row ("We create 3D visual storytelling and interactive web experiences…"), above a rounded frame with a live 3D render and crosshair marks at its corners ([lusion-1](shots/lusion-1.jpg)).
  - Further down, project cards hang on "strings" and tilt in 3D as you scroll.
  - **On mobile** the section heading "Work" overlaps the logo in the fixed header ([lusion-2](shots/lusion-2.jpg)).
  - **Under reduced motion** the page still showed a "0%" loader after the wait ([lusion-3](shots/lusion-3.jpg)).
- **Technical:** WebGL renderer, 3 canvases. The first Tab stop is a `back` button with `outline: none` and no shadow. The desktop evidence pass timed out, so there are no byte numbers.
- **Worth learning:** framing a live render as an object with crop marks rather than as a background.
- **Avoid:** loader-gated content, especially under reduced motion.

### 2.10 Active Theory
- **URL:** https://activetheory.net/ · visited 20 Oct 2026 · **studio**
- **Verdict:** a reminder that a loader can *be* the first impression.
- **Observations**
  - The desktop showed only a dot-sphere loader for the first two captures. A later capture showed an eye-like iris graphic (with a "/78" counter inside the sphere), which is close to your own motif ([activetheory-1](shots/activetheory-1.jpg)). The headline "DIGITAL EXPERIENCES" appeared only in the final capture.
  - On mobile, the nav is a glowing pill (`WORK —— CONTACT`) over a particle field ([activetheory-2](shots/activetheory-2.jpg)).
  - Under reduced motion the screen was black when captured.
- **Technical:** about 710 KB measured at triage (more streams in later). Clicked "Reject Cookies" on the consent banner.
- **Worth learning:** the eye/iris metaphor works at studio level too, so yours is in good company.
- **Avoid:** anything that delays the first readable words.

### 2.11 Igloo Inc.
- **URL:** https://www.igloo.inc/ · visited 20 Oct 2026 · **studio/brand**
- **Verdict:** a fully art-directed WebGL scroll film. It's the "most cinematic" pole, and a clear example of what not to do for a portfolio.
- **Observations**
  - The scroll drives a camera through a 3D igloo, into crystal, through a ring, and onto a pedestal with carousel arrows ([igloo-1](shots/igloo-1.jpg), [igloo-2](shots/igloo-2.jpg)).
  - The only copy is corner HUD text in monospace ("Scroll down to discover", "Sound: OFF", a short manifesto).
- **Technical:** **about 15 MB transferred. `document.body.innerText` was empty, and four Tab presses never moved focus off `<body>`.** No reduced-motion rules found.
- **Worth learning:** the HUD-corner typography and the opt-in sound label.
- **Avoid:** almost everything else, for a portfolio that has to be read.

### 2.12 basement.studio
- **URL:** https://basement.studio/ (case: /showcase/vercel-ship-a-home-for-innovation) · visited 20 Oct 2026 · **studio**
- **Verdict:** the best *project rows*, with heavy pages.
- **Observations**
  - Featured projects are rows of media at about 57% width, a 3–4 line description, the category, and a right-aligned title (about 40 px). As you scroll, each row collapses to a sliver under the next, so they stack ([basement-1](shots/basement-1.jpg)).
  - A cursor-following `[View Project]` label appears over the media.
  - The nav carries superscript counts: `Showcase (26)`, `Blog (29)`, `Online (3)`.
  - A `HUMAN | MACHINE` toggle is pinned bottom centre. I didn't test what it switches.
  - On mobile, rows become media first, then title, then a description at 20 px ([basement-2](shots/basement-2.jpg)).
  - The case page has a sticky meta column (`Client / Year / Type / Link`) and a media gallery ([basement-3](shots/basement-3.jpg)).
- **Technical:** **about 15 MB transferred, 2.5 MB JS** (WebGL hero room). Tab stops landed on `div`s with a transparent outline, so **there was no visible focus**.
- **Worth learning:** the media-first row ratio; the meta table on the case page (you already have one); counts in the nav.
- **Lighthouse:** 32 / 100, with an LCP of 36.5 s and 11 s of total blocking time.
- **Avoid:** the payload and the invisible focus.

### 2.13 Cipher
- **URL:** https://cipher.tv/ · visited 20 Oct 2026 · **studio** (production company)
- **Verdict:** a reel turned into an object. Gorgeous, but the work is unreadable.
- **Observations:** the home page is a WebGL ring of about 20 film stills that rotates with the wheel on black. Navigation is four tiny lowercase links; there's no other text ([cipher-1](shots/cipher-1.jpg)).
- **Technical:** Lenis plus GSAP, 3 canvases, about 780 KB. **Lenis stays on under reduced motion.** Default focus ring.
- **Avoid:** turning the chapter reel into a 3D object.

### 2.14 Bartosz Ciechanowski
- **URL:** https://ciechanow.ski/ (article: /moon/) · visited 20 Oct 2026 · **technical storytelling**
- **Verdict:** the gold standard for explaining a system with interactive figures.
- **Observations**
  - The home page *is* the latest article. The header is a blue band with the name, and the article starts with a 38 px title and two plain paragraphs ([ciechanowski-1](shots/ciechanowski-1.jpg)).
  - The page turns black where the story enters space. Each figure has its own slider directly underneath, and **the words in the prose are coloured to match the control they refer to** ("days", "hours", "figurine") ([ciechanowski-2](shots/ciechanowski-2.jpg)).
  - The body measure is about 700 px at 18 px IBM Plex Sans.
- **Technical:** 120 canvases in the article, with no visible library. Default focus ring.
- **Worth learning:** colour-keyed prose; the reader controls each figure; a background change to mark a new "world".

### 2.15 Josh W. Comeau
- **URL:** https://www.joshwcomeau.com/ (article: /css/anchor-positioning/) · visited 20 Oct 2026 · **technical storytelling**
- **Verdict:** the best example of teaching tone plus accessibility.
- **Observations**
  - A 3D mascot on a cloud hero; the article list sits beside "Browse by category" chips ([joshwcomeau-1](shots/joshwcomeau-1.jpg)).
  - Articles have a sticky right-hand TOC, a yellow "Browser support" callout and a blue "Intended audience" callout with icons, plus a like counter ([joshwcomeau-2](shots/joshwcomeau-2.jpg)).
  - The header has **sound and theme toggles**.
- **Technical:** **28 reduced-motion rules, the most of any finalist.** Skip link, and a 2 px blue focus ring.
- **Lighthouse:** 72 / 98, with 1.2 s of total blocking time.
- **Worth learning:** typed callouts (you already have `note`); a sound toggle that's off by default.

### 2.16 samwho
- **URL:** https://samwho.dev/ (essay: /load-balancing/) · visited 20 Oct 2026 · **technical storytelling**
- **Verdict:** the best answer to "my project has no good screenshot".
- **Observations**
  - The essay index is a grid of tiny abstract diagrams, one per topic: dots in a queue, a Bloom filter grid, load-balancer squares. None are screenshots ([samwho-1](shots/samwho-1.jpg)).
  - First-person section heads: "I write.", "I code.", "I read.", "I play the NYT games." The last shows today's status ("Not played yet.").
  - In the essays, each simulation has **replay, play/pause and a speed slider**. The prose uses coloured inline legends (■ servers, ● requests, ● dropped) that match the simulation's colours ([samwho-2](shots/samwho-2.jpg)).
- **Technical:** **72 KB total, 4 KB JS** on the home page. The keycap logo's `<g>` elements take focus with `outline: none`, so there's no visible ring there.
- **Lighthouse:** 92 / 94.
- **Worth learning:** abstract diagram thumbnails; user-controlled motion; a legend inside the prose.

### 2.17 Stripe Press
- **URL:** https://press.stripe.com/ (book: /nomad-letters) · visited 20 Oct 2026 · **editorial**
- **Verdict:** a 3D collection with real wayfinding and per-item colour.
- **Observations**
  - Book spines are stacked in WebGL, and scrolling moves through the stack. A **vertical tick-rail on the left** shows your position ([stripepress-1](shots/stripepress-1.jpg)).
  - The first capture (6 s) was empty apart from the logo while the stack loaded.
  - On a book page, a 3D book on the left, serif copy (Ivar) on the right, and **the page background is tinted from the cover's palette** ([stripepress-2](shots/stripepress-2.jpg)).
- **Technical:** 2 canvases, about 670 KB. The book `button`s had `outline: none` (3 px width, but no style); the links had the default ring.
- **Worth learning:** a tick-rail index; a per-item tint (your `--chap` already does this).

### 2.18 The Pudding
- **URL:** https://pudding.cool/ (story: /2026/10/lifeafter) · visited 20 Oct 2026 · **editorial**
- **Verdict:** a dark, game-like story, closest in *tone* to Echo.
- **Observations**
  - The home page is a grid of story cards: issue number (`#225`), month and year, a cover, a lowercase serif title and a one-line question ([pudding-1](shots/pudding-1.jpg)).
  - The story *life after death?* opens on a purple brick wall with three spot-lit doors labelled **no / not sure / yes** and "CLICK ON A DOOR". **Narration is off by default**, behind a "Turn on narration (recommended)" button ([pudding-2](shots/pudding-2.jpg)).
- **Technical:** Svelte. The story transferred about 12.9 MB. The focus ring is a 2 px solid green outline, and there's a skip link.
- **Worth learning:** choice as the entry point; opt-in sound; questions as titles.

### 2.19 Not finalists, but loaded and used as context
- **Houmahani Kane** (houmahani.com, in the Awwwards Portfolio listing, dated 13 Oct 2026). The WebGL scene never rendered in headless Chrome: only "drag to rotate" over a blank field, and the desktop evidence pass timed out. **Not assessed.**
- **Locomotive** (locomotive.ca) returned a Cloudflare 403 challenge. **Not assessed.** Its L.I.S.A. microsite was on the Awwwards list but wasn't visited.
- Triage-only (one desktop screenshot plus DOM probe): Huy Phan, Maria Vasilyeva, Meer Mohsin, Gil Huybrecht, Giordano Betti, Tommy Biglow, Jithin RP, Deji Ajetomobi, Léo Parpeix, Gionatan Nese, Michael Gatt, Artem Shcherbakov, Haoqi, Resn, 14islands, Immersive Garden, Unseen, Obys, Paco Coursey, Emil Kowalski, Lee Robinson, Jhey Tompkins, Cassie Evans, Bruno Simon, Henry Heffernan, Aristide Benoist, Maxime Heckel, Ahmad Shadeed, Made With GSAP, Godly, The Watch (60fps). They were cut because the first screen at 4 s was a loader or a blank canvas (Huy Phan, Gil Huybrecht, Michael Gatt, Aristide Benoist), because the site is mainly a 3D demo (Bruno Simon, Henry Heffernan), or because another finalist covers the same lesson better.

### 2.20 Lighthouse (mobile, Lighthouse 13.5, this laptop)

Runs were one at a time with nothing else running, using simulated mobile throttling. Scores vary by a few points between runs.

| Site | Perf | A11y | FCP | LCP | TBT | CLS | Total bytes |
|---|---|---|---|---|---|---|---|
| **This site `/`** (local preview) | **91** | **100** | 2.6 s | 3.0 s | 30 ms | 0.001 | 373 KiB |
| **This site `/work/fundamentalx`** | **93** | **100** | 2.6 s | 2.6 s | 40 ms | 0.002 | 315 KiB |
| olivierlarose.com | 92 | 95 | 1.7 s | 1.8 s | 0 ms | **0.159** | 66 KiB |
| samwho.dev | 92 | 94 | 1.0 s | 1.3 s | 360 ms | 0 | 70 KiB |
| samgoddard.co.uk | 89 | 100 | 1.1 s | 2.6 s | 270 ms | 0 | 298 KiB |
| darkroom.engineering | 88 | 96 | 1.1 s | 3.5 s | 170 ms | 0 | 557 KiB |
| joshwcomeau.com | 72 | 98 | 1.5 s | 2.7 s | 1,190 ms | 0 | 681 KiB |
| jesperlandberg.com | 66 | 100 | 0.8 s | 0.9 s | 2,210 ms | 0.002 | 33,150 KiB |
| brittanychiang.com | 59 | 96 | 1.6 s | 11.5 s | 410 ms | 0 | 1,517 KiB |
| basement.studio | 32 | 100 | 2.8 s | 36.5 s | 11,180 ms | 0 | 15,594 KiB |

**Readings:**
- Only Olivier Larose and samwho beat this site on performance, and both are near-static pages with less than 100 KiB in total.
- Two of the scores show the limits of the audit:
  - **Basement scores 100 on accessibility even though its Tab stops had no visible focus.** Lighthouse doesn't test focus visibility.
  - **Jesper's LCP is 0.9 s while 33 MB transfers**, because the LCP element is a small text label and the WebGL payload arrives afterwards.
- So "100" is necessary but not sufficient. The manual checks in this document (focus probe, reduced motion, DOM text) matter as much.
- Your FCP (2.6 s) is the slowest of the group. That's worth a look separately, for example font preloading or the size of the initial CSS and JS. It's not part of this design brief.

---

## 3. Cross-site analysis

### 3.1 First five seconds
- **Strongest:** the H1 states identity and claim in one breath. Sam Goddard puts name, role and employer in a single 86 px sentence. Brittany Chiang uses a 48 px name, the role and a one-line claim. Darkroom has a 200 px slogan plus a literal definition. Lusion's claim is in the header row. The name is at least as prominent as the claim, or merged into it.
- **Average or weak:** a loader or an empty WebGL field first. Active Theory, Igloo, Stripe Press, Lusion under reduced motion, Huy Phan and Michael Gatt at triage all showed a loader or blank field. Darkroom's mobile first screen is empty.
- **Headline length:** the strong ones are 4–20 words. Nobody serious uses a subhead before the scroll; they use a single supporting line.

### 3.2 Typography
- Display faces are **either condensed and loud, or editorial serif**: Darkroom's pixel face at −0.05 em, Sam's and Olivier's editorial serif caps, Lynn's rough display. Body is almost always a neutral grotesk or mono (Geist Mono at Sam's, Inter at Brittany's, IBM Plex at Ciechanowski's).
- **Tracking at size:** −0.015 em to −0.05 em. Your −0.045 em at `font-stretch: 80%` is in the same range and looks right ([tejas-1](shots/tejas-1.jpg)).
- **Scale ratio display:body:** Sam about 7:1 (86/12), Darkroom about 16:1, yours about 9:1 (151/17). The difference is that **their big type carries the name**.
- **Mobile:** the best sites *grow* key type relative to the viewport. Lynn's name fills the width. Sam keeps about 52 px on a 390 px screen, which is 13vw. Yours drops to the 48 px clamp floor (12vw) and leaves the bottom of the hero empty ([tejas-4](shots/tejas-4.jpg)).

### 3.3 Layout and grid
- Separation is by **hairline rules plus a background change**: Brittany's sticky column, Olivier's rules, Sam's `//` rows, Ciechanowski switching from white to black. Full-bleed colour changes mark a new "world": Ciechanowski's space section, Stripe Press's cover tint.
- Frames are used to make content feel like an object: p5aholic's 1 px inset frame, Lusion's crop marks, Sam's split panel.

### 3.4 Project presentation
- Three working patterns:
  1. the **ruled index**: Olivier (4 columns), Sam (2), Brittany (rows with chips);
  2. **media-first rows**: Basement at about 57% media;
  3. **a reel with real screens**: Jesper.
- The objects-not-content reels (Cipher's ring, Igloo's pedestal) are memorable but don't show the work.
- A good tile shows *title, one line, year or role, and media you can actually see*. Nobody shows more than three stats on a tile; most show none.
- Hover patterns: invert the row (Olivier), dim the siblings (Brittany), a cursor label (Basement).

### 3.5 Case-study storytelling
- **The best teach with controllable figures and colour-keyed prose** (Ciechanowski, samwho), use typed callouts (Josh), and keep a meta column visible (Basement, Sam).
- "Next project" is universal: Sam's `NEXT PROJECT // INTERCOM` bar, and Basement's "More Projects" list in the sticky column. You have this already ([tejas-6](shots/tejas-6.jpg) bottom).

### 3.6 Motion
- **Meaningful:** Rauno's live components, samwho's simulations, Ciechanowski's sliders, your Echo pipeline. All of these are user-controlled or explain something.
- **Decorative but cheap:** p5aholic's grain, Olivier's line draw-in, Brittany's glow.
- **Exhausting:** wheel-driven 3D tracks where scroll doesn't move the page (Cipher, Igloo). The Jesper and Stripe Press tracks work because they have a position indicator or real content.
- **Reduced motion is often ignored:** Lenis stayed on at Darkroom, Olivier and Cipher; Igloo and Jesper behaved the same with reduced motion on.

### 3.7 Navigation and wayfinding
- Tick-rulers and minimaps for long tracks (Rauno, Stripe Press). Active-section indicators (Brittany's lengthening rule). Counts in the nav (Basement). A contents page (Lynn).
- Persistent HUD bars (Sam's bottom bar, Igloo's corners) add atmosphere when they carry real information.

### 3.8 Personality and voice
- First-person section heads (samwho), colophons (Brittany, Sam), live presence or "last played" (Sam), easter eggs (Brittany's TARDIS), a "Copycats" page (p5aholic), and a definition (Darkroom).
- **Voice is in the microcopy, not the effects.**

### 3.9 Media when there are no good screenshots
- **Abstract diagram thumbnails** (samwho), a **dithered or dot-matrix mark** (Sam's case pages), **live UI recreations** (Rauno), **typographic covers** (Pudding's flat-colour cards with question titles). All of these suit FundamentalX.

### 3.10 Mobile
- The best **change the format** rather than shrink it: Jesper's carousel becomes cards, Olivier's table drops to two columns, Basement goes media first, Rauno keeps one card per screen.
- The weaker ones collide or go blank: Lusion's header overlap, Darkroom's empty first screen.

### 3.11 Accessibility and performance
- Fast and accessible: Olivier (67 KB), samwho (72 KB), Lynn (411 KB, 4 px focus ring), Josh (28 reduced-motion rules), Brittany. See the Lighthouse table in §2.20.
- Award-heavy studios trade both away: Igloo and Basement at about 15 MB each, invisible or stuck focus.
- **Your site is already in the first group. That's a design asset, not just a compliance checkbox.**

---

## 4. Gap analysis of this site

Screens: desktop [tejas-1](shots/tejas-1.jpg) (hero), [tejas-2](shots/tejas-2.jpg) (Echo panel), [tejas-3](shots/tejas-3.jpg) (reel mid-scroll), [tejas-10](shots/tejas-10.jpg) (MPLADS panel), [tejas-8](shots/tejas-8.jpg) (about), [tejas-9](shots/tejas-9.jpg) (contact). Mobile: [tejas-4](shots/tejas-4.jpg), [tejas-5](shots/tejas-5.jpg). Case studies: [tejas-6](shots/tejas-6.jpg) (FundamentalX), [tejas-7](shots/tejas-7.jpg) (Echo pipeline).

| Dimension | What's already strong | What's weak or generic |
|---|---|---|
| First five seconds | The triad is original and memorable. The eye is a genuine motif taken from Echo, not a stock effect. | **Identity is whispered.** "Tejas Joshi · Computer Engineering student · AI & backend" is 17 px against a 151 px headline. "It watches…" doesn't say *AI systems* or *student* until the 17 px intro paragraph. On desktop the eye sits top centre while the headline is left-aligned, which leaves the right half of the hero empty ([tejas-1](shots/tejas-1.jpg)). |
| Typography | The condensed Bricolage at −0.045 em matches the references. Geist body at 17 px/1.6 is very readable. | The mobile headline hits its 48 px floor. The outlined "02" numeral collides with the panel title on mobile ([tejas-5](shots/tejas-5.jpg)). |
| Layout and grid | Hairline rules, gradient section changes, a warm contact glow. | The reel intro ("Each one gives a model…") is a 64 px statement that competes with the hero. Side rooms, Toolkit and Record are three similar ruled lists in a row, which is visually monotone. |
| Project presentation | The panels have a real decision and real numbers; that content is better than most references. | **Density:** 9 text blocks per panel (eyebrow, title, one-liner, decision, 3 stats, stack, context, 2 links). **Media is invisible:** the greyscale luminosity wash at 30–42% opacity under two gradients ([tejas-2](shots/tejas-2.jpg)). FundamentalX has no media at all, just a gradient ([tejas-3](shots/tejas-3.jpg)). |
| Case-study storytelling | **This is the site's best part.** Meta table, sticky TOC, decision blocks with rejected alternatives, and the scroll-driven veto pipeline ([tejas-7](shots/tejas-7.jpg)). | The TOC has no active state. The pipeline is scroll-scrubbed only, so the reader can't replay or step through it. The prose doesn't colour-key "model", "rules" and "veto" the way the diagram does. The FundamentalX hero has no visual ([tejas-6](shots/tejas-6.jpg)). |
| Motion | Purposeful: mask rise, the eye, scrubbed about-text, the pinned reel. Reduced motion is handled fully. | The eye only tracks the pointer, so keyboard and touch users get a static eye. Nothing ties the eye to the "rules decide" story (for example, reacting to a veto). |
| Navigation and wayfinding | The `mix-blend-mode: difference` header, focus management, skip link. | **No position indicator in the pinned reel**; "Keep scrolling →" is the only cue. No progress bar on the home page (the case studies have one). |
| Personality and voice | "The door is open.", "Side rooms", "a model that needs a rulebook". | No colophon, no easter egg, no first-person microcopy outside the about section. The craft behind the site (no WebGL, 100 a11y, reduced motion) is invisible. |
| Media handling | Real captures exist for Echo and MPLADS. | They're used as texture. FundamentalX has nothing yet. |
| Mobile | The reel stacks below 900 px, nothing overflows, the eye resizes. | Each chapter is about 1.4 screens of text with the screenshot almost invisible ([tejas-5](shots/tejas-5.jpg)). The format shrinks rather than changes. |
| Accessibility and performance | 91–93 performance, 100 accessibility, Lenis and GSAP off under reduced motion, readable with no JS. | Nothing is broken. The constraint is the 150 KB gzipped JS budget, so any addition must be CSS or a few lines of GSAP. |

**Blunt summary:** the concept and the case studies are above the level of most references. The home page undersells both: the hero hides who you are, the reel hides the products, and the best visual you own (the veto) lives two clicks away.

---

## 5. Recommendations (ranked by impact ÷ effort)

Every item stays within GSAP, Lenis, Canvas 2D and CSS, adds no dependency, keeps content readable with no JavaScript, and keeps the reduced-motion path. Effort: **S** < half a day, **M** 1–2 days, **L** > 2 days.

### R1. Make the hero say who you are, at display size, without losing the triad · S · in direction
- **Problem:** [tejas-1](shots/tejas-1.jpg), [tejas-4](shots/tejas-4.jpg). The 17 px identity line against a 151 px headline; the empty right half on desktop; the empty lower third on mobile.
- **Inspired by:** Sam Goddard ([samgoddard-1](shots/samgoddard-1.jpg)), name and claim as one sentence. Darkroom ([darkroom-1](shots/darkroom-1.jpg)), a definition under the slogan.
- **Change:**
  - Replace `.cc-hero__who` with a two-part identity block above the triad:
    - "**Tejas Joshi**" in Bricolage 700 at `clamp(28px, 3.2vw, 48px)`, tracking −0.02 em;
    - then "builds AI systems that answer to rules." in Geist 400, same size, `--bone-2`.
  - Keep the triad as the visual headline.
  - Put the name inside the `<h1>` so the accessible name reads as one sentence: wrap the identity line and the three lines in the same `<h1>`, and keep the role ("Computer Engineering student · AI & backend") as a small eyebrow under it.
  - **Desktop ≥ 1100 px:** move the eye from top centre to the right column, vertically centred on the triad (`.cc-eye { top: auto; bottom: 34%; left: auto; right: var(--gutter); transform: none; width: min(38vw, 560px); height: min(16vw, 240px) }`). This fills the dead half and makes the eye look *at* the claim.
  - **Mobile:** raise the headline floor from 48 px to `clamp(56px, 15vw, …)`. "The rules decide." at 15vw in the 80% width face is about 330 px on a 390 px screen, so check that it fits.
- **Files:** `src/site/pages/Home.tsx` (Hero), `src/site/styles/site.css` (`.cc-hero*`, `.cc-eye`, the 600 px block).
- **Risks:** a bigger `<h1>` could shift LCP. The LCP element is probably the headline text already, so keep the CSS rise animation and don't add webfont weights (700 and 800 come from the same variable file). Recheck that "The rules decide." fits at 320 px.

### R2. Put the veto on the home page: a compact pipeline strip in the Echo panel · S–M · in direction (it *is* the direction)
- **Problem:** [tejas-2](shots/tejas-2.jpg) vs [tejas-7](shots/tejas-7.jpg). The most distinctive visual you own is two clicks deep, while the Echo panel describes the decision in prose.
- **Inspired by:** Rauno's live components as media ([rauno-2](shots/rauno-2.jpg)); samwho's playable figures ([samwho-2](shots/samwho-2.jpg)).
- **Change:**
  - In the Echo panel, replace the "The decision" paragraph with a single-row strip of the 9 stages (`PARSE … MERCY`). Use 10–11 px mono labels in 1 px boxes. Have the proposal `lock_door → lift (permanent)` travel left to right and stop on **SOLVABILITY** in `--veto`, with the verdict line underneath. The data already exists as `decisions` and `stages` in `src/data/content.ts`; `decisions` is commented as "used by the hero ticker", but nothing on the home page uses it now.
  - Drive it with the existing reel ScrollTrigger: progress 0.15–0.35 of the Echo panel lights the stages. Under reduced motion and with no JS, render the final state.
  - Keep "Read the case study" as the call to action.
- **Files:** `src/site/pages/Home.tsx` (ChapterReel), and reuse or extract the stage markup from `src/site/diagrams/Diagrams.tsx`. Styles go next to `.dg-pipe__*` in `site.css`.
- **Risks:** pure HTML and CSS, no media cost. Make sure the strip has a text equivalent (an `<ol>` of stages plus a verdict sentence) and that it doesn't add a tenth text block. It *replaces* the decision paragraph.

### R3. Turn the panel screenshots into visible "monitors", and simplify the panels · M · in direction
- **Problem:** [tejas-2](shots/tejas-2.jpg), [tejas-10](shots/tejas-10.jpg), [tejas-5](shots/tejas-5.jpg). The media is a wash, and each panel has 9 text blocks.
- **Inspired by:**
  - Basement's media-first rows ([basement-1](shots/basement-1.jpg));
  - Lusion's crop-marked frame ([lusion-1](shots/lusion-1.jpg));
  - Jesper's real screens ([jesperlandberg-1](shots/jesperlandberg-1.jpg)).
- **Change (desktop):**
  - Widen the panels from `min(88vw, 780px)` to `min(92vw, 1180px)`. Split them into a text column of about 44% and a **framed media column** of about 56%.
  - Frame the screenshot like a surveillance feed. This is "The Watcher" logic: the eye has been watching your projects.
    - A 1 px `--line-2` border with four 12 px corner ticks in `--chap`.
    - A mono caption strip above it: `CAM 01 · ECHO · CELL` / `CAM 03 · MPLADS · DASHBOARD`.
    - Desaturate to `grayscale(.6)` at full opacity. Restore colour on `:hover` and `:focus-within` with a 400 ms ease (`cubic-bezier(.16,1,.3,1)`, the same curve as the hero).
    - Optionally add scan lines with a 2 px `repeating-linear-gradient` at 6% opacity.
  - Remove the `.cc-panel__bg` wash, or keep it only as a 10% tint behind the text.
  - **Cut the text:**
    - keep the eyebrow, title, one-liner, R2's strip (Echo) or the decision (others), and **two** stats;
    - merge stack and context into one 13 px line;
    - keep both links.
  - The numeral stays.
- **Mobile (< 900 px):** see R5.
- **Files:** `src/site/pages/Home.tsx`, `site.css` (`.cc-panel*`, `.cc-reel__intro`). Possibly a `caption` field per project in `content.ts` for the CAM labels.
- **Risks:**
  - **LCP and bytes:** the images are already lazy and about 1000 px wide. Serve 1180 px WebP at q≈70 (aim for ≤ 120 KB each), and keep `loading="lazy"` because none of them is above the fold.
  - **Contrast:** text no longer sits on the image, so it gets *better*.
  - **Wider panels** mean a longer pin distance (`distance()` is computed already, so nothing breaks), but scrolling three wider panels takes longer. Keep the panel count at 3.
  - **MPLADS:** keep the existing crop with no MP or vendor names.

### R4. Add a chapter index to the pinned reel · S · in direction
- **Problem:** there's no position indicator during the pin; "Keep scrolling →" is the only cue.
- **Inspired by:** Rauno's tick-ruler ([rauno-1](shots/rauno-1.jpg)), Stripe Press's tick-rail ([stripepress-1](shots/stripepress-1.jpg)), Lynn Fisher's contents leaders ([lynnandtonic-1](shots/lynnandtonic-1.jpg)).
- **Change:**
  - A fixed bar at the bottom left during the pin, inside `.cc-reel`, so it's only visible while the reel is pinned: `I ——— II ——— III`, 12 px mono.
  - The segments fill in `--chap` with the tween's progress. Use `onUpdate` on the existing ScrollTrigger to set a CSS variable `--p`, and draw the fill with `transform: scaleX(var(--p))`, so it only composites.
  - Each numeral is a link to that panel, reusing the `focusin` and `scrollToTarget` logic you already have.
  - Optionally, rewrite the intro panel as a **contents page**: `I · The Room That Fights Back ………… 2026` with dotted leaders. That replaces the 64 px statement, which currently competes with the hero.
- **Files:** `src/site/pages/Home.tsx`, `site.css`.
- **Risks:**
  - Hide the index under reduced motion and below 900 px, because the reel stacks there.
  - The links need accessible names ("Chapter II: FundamentalX").
  - Keep it out of the tab order while the reel isn't pinned (`inert` or `visibility: hidden`).

### R5. Mobile: change the chapter format, don't shrink it · M · in direction
- **Problem:** [tejas-5](shots/tejas-5.jpg). About 1.4 screens of text per chapter, the media is invisible, and the numeral collides with the title.
- **Inspired by:** Jesper's mobile cards ([jesperlandberg-2](shots/jesperlandberg-2.jpg)), Basement's media-first mobile rows ([basement-2](shots/basement-2.jpg)), Olivier dropping columns ([olivierlarose-3](shots/olivierlarose-3.jpg)).
- **Change below 900 px:**
  - Put the framed media first (16:10, full width).
  - Then the eyebrow, title, one-liner, **one** stat, and the case-study button.
  - Hide the decision, stack and context there, since the case study has them. Do this with CSS (`display: none` on mobile is fine because the content is duplicated on the case page) or by moving it into a `<details>` titled "The decision".
  - Move the numeral into the eyebrow (`02 · Chapter II`) instead of an absolute overlay.
- **Files:** `site.css` (the `max-width: 899px` block), and a small markup reorder in `Home.tsx`, or CSS `order`.
- **Risks:** hiding content on mobile is fine for SEO here because the case page holds it, but don't hide the only link to it. Check tap targets stay ≥ 44 px (yours are 46 px).

### R6. FundamentalX media, now and later · M · in direction (needs your input for "later")
- **Problem:** [tejas-3](shots/tejas-3.jpg), [tejas-6](shots/tejas-6.jpg). There are no screenshots (MySQL access is denied locally), so the panel and hero are just gradients.
- **Now: a typographic "metric validity board".** Inspired by samwho's diagram thumbnails ([samwho-1](shots/samwho-1.jpg)), Sam Goddard's abstract mark ([samgoddard-3](shots/samgoddard-3.jpg)) and Rauno's live components ([rauno-2](shots/rauno-2.jpg)).
  - Build a static HTML/CSS component with four rows taken **verbatim from the rules table in `content.ts`**:
    - `P/E · NOT MEANINGFUL · EPS ≤ 0`
    - `FREE CASH FLOW · UNAVAILABLE · missing capex, never 0`
    - `REVENUE GROWTH · NOT MEANINGFUL · turnaround flag`
    - `ROE · CALCULATED · avg(opening, closing equity)`
  - Each row is a status chip (outlined, ember for calculated, `--muted` for unavailable, `--veto` for not meaningful, always with the text label) plus the formula in mono.
  - **Show no numeric values.** Real values would be invented, and demo values would need a label. The point of the project is that the status matters more than the number, so the board says exactly that.
  - Put it in R3's framed monitor (`CAM 02 · FUNDAMENTALX · ENGINE`) and in the case-study hero, right column.
- **Later, once screenshots exist:**
  - Capture the metric page showing a `not_meaningful` chip and the AI summary with its grounding check. Crop to that area, about 1180 px wide.
  - Keep the "demo data" label visible in the crop, and say "illustrative demo data" in the caption.
  - Use it as the monitor image and add it as a `figure` block in the case study. The README already describes the `bg` hookup.
  - **Needs your input:** a working local DB (fix `ER_ACCESS_DENIED_ERROR`) and a capture session.
- **Files:** a new `src/site/diagrams/` component (for example `FxBoard`), plus `Home.tsx`, `CaseStudy.tsx` (hero slot) and `site.css`.
- **Risks:** none for performance (HTML only). Accessibility: render it as a `<table>` or `<dl>` with a caption, not as divs.

### R7. Real video, used sparingly · M · in direction · **needs your input**
- **Ideas:**
  - **Echo:** a 3–4 s loop of the TAB mind panel flipping a card to `VETOED · SOLVABILITY`.
  - **MPLADS:** a 3 s pan across the aggregate map, with no MP or vendor names.
- **Where:** inside R3's monitor frame, replacing the still on hover or focus (desktop), or after it enters view (mobile).
- **Spec:**
  - `<video muted playsinline loop preload="none" poster="…webp">`, 1180×738, H.264 *and* WebM, ≤ 600 KB each.
  - Start it with IntersectionObserver only when `!reduced`, and pause it when off-screen.
  - Add a visible pause button (WCAG 2.2.2 applies to anything that moves for more than 5 s).
  - Keep the still as the poster, so no-JS and reduced-motion users see the frame.
- **Inspired by:** Lusion's framed reel ([lusion-1](shots/lusion-1.jpg)), Basement's media rows.
- **Files:** `content.ts` (an optional `video` field per project), `Home.tsx`, `site.css`.
- **Risks:** bytes. With `preload="none"` and the poster, the first load is unchanged. The Lighthouse "total byte weight" only grows when the video plays.
- **Needs from you:** recorded clips. Echo needs a local run with Ollama, and its "mind panel" capture already exists as a still.

### R8. Case-study upgrades: colour-keyed prose, a replay control, and an active TOC · S–M · in direction
- **Inspired by:** Ciechanowski's coloured words ([ciechanowski-2](shots/ciechanowski-2.jpg)), samwho's play and speed controls ([samwho-2](shots/samwho-2.jpg)), Brittany's active nav rule, Josh's typed callouts ([joshwcomeau-2](shots/joshwcomeau-2.jpg)).
- **Change:**
  - **Colour keys.** Add inline legend spans for **model** (`#a9b2ff`, the existing `.dg-node--model` colour), **deterministic** (`--chap`) and **veto** (`--veto`). Each gets a small square or dot glyph before the word, so the meaning doesn't depend on colour alone. Use them in the Echo "rules engine" and "When the model fails" prose. This needs a small `Block` extension, or a simple `[[model:Gemma]]` token in `p` text.
  - **Pipeline control.** Under the Echo pipeline, add `Replay` and `Step` buttons. They run the same stage sequence on click with a GSAP timeline (about 180 ms per stage, `power2.out`), independent of scroll. Under reduced motion, keep the final state and let Step move the highlight with no animation.
  - **Active TOC.** Use IntersectionObserver on `.cs-section` to set `aria-current="true"` on the TOC link. Style it with a 2 px `--chap` left border (you already have the hover style).
- **Files:** `src/site/diagrams/Diagrams.tsx`, `src/site/pages/CaseStudy.tsx`, `src/data/content.ts`, `site.css`.
- **Risks:** colour-keyed words must also have a glyph or underline, so they're not colour-only. Replay buttons need `aria-controls` and a live region for the verdict (the pipeline already has `aria-live` text).

### R9. Make the eye part of the system, not just the cursor · S · in direction
- **Change:**
  - **Keyboard and touch users.** On `focusin`, aim the gaze at the focused element's centre, so keyboard users get the same "being watched" moment as mouse users. On touch, aim at the last tap.
  - **Hover on a chapter.** When the pointer enters a chapter panel, tint the iris 20% towards that panel's `--chap` colour.
  - **During R2's veto.** Blink once when SOLVABILITY lights up.
  - Each of these is only a few lines in the existing rAF loop.
- **Inspired by:** your own Echo ("While the model is thinking, the Warden's eye dilates"). No reference does this. It's yours.
- **Files:** `src/site/WatcherEye.tsx`, `Home.tsx` (dispatch a custom event on veto).
- **Risks:**
  - None for performance; the loop is already paused off-screen.
  - Keep the eye `aria-hidden`.
  - Reduced motion still draws one frame.

### R10. Show the craft: a colophon and a motion toggle · S · in direction
- **Inspired by:** Brittany's colophon, Sam's colophon section, Darkroom's "Tools we build", Rauno's "Disable dynamic motion" switch, Josh's sound and theme toggles, p5aholic's theme modes.
- **Change:**
  - **Colophon.** In the footer, add one line: "Built with React, GSAP and Lenis. The eye is about 100 lines of Canvas 2D, no WebGL. Set in Bricolage Grotesque and Geist. Prerendered; works without JavaScript." Add the Lighthouse numbers only once they're measured on the deployed site. Don't publish the local numbers as fact.
  - **Motion toggle.** Add a "Motion: on / off" button in the footer. It writes to `localStorage` (inside try/catch) and makes `useMotion()` behave as if `prefers-reduced-motion` were set. That turns off Lenis and the pin, stacks the reel and freezes the eye, all of which already exists.
- **Files:** `src/site/Layout.tsx` (footer), `src/site/motion.tsx`, `site.css`.
- **Risks:**
  - Toggling should remount the motion provider, or call `ScrollTrigger.killAll()` and refresh. Test that hash links still land correctly after toggling.
  - SSR markup must not depend on `localStorage`, to avoid hydration mismatches. Apply it after mount.

### R11. Small polish
Each is S and stays in direction.
- **Hover-dim siblings in Side rooms and Record** (Brittany): `.cc-also ul:hover li:not(:hover) { opacity: .5 }` with a 200 ms transition, and the same under `:focus-within`.
- **Hairline draw-in on ruled lists** (Olivier): `scaleX` from 0 to 1 over 600 ms, staggered by 40 ms, triggered once. Skip it under reduced motion.
- **A progress bar on the home page too**, reusing `.cs-progress`, in the ember colour.
- **Contact:** "The door is open." is good. Add a copy-email button with a polite live-region "Copied" message, as originally planned in concept A.

### Does the hero or the reel need to be more distinctive, and can it be done without becoming slower?
**Yes, and without new libraries.**
- Distinctiveness here comes from *content you already own*: the veto strip (R2), the CAM-framed monitors (R3), and an eye that reacts to the system (R9). Every one of those is HTML, CSS or Canvas 2D, and none of them is above-the-fold media, so LCP stays the hero text.
- What would make the site slower *and* more generic is a WebGL reel (Jesper, Cipher), a preloader (Active Theory), or a 3D hero (Basement, Igloo).
- **Three.js is not justified.** A typical three.js build is well over 100 KB gzipped, which would roughly double your current 150 KB of JS. The references that use it measured 0.5–15 MB and none of them pairs it with a visible focus state and reduced-motion support. The eye already *is* the WebGL moment, done in 2D.

---

## 6. Things not to do

1. **A preloader or a "0%" counter.** Active Theory, Lusion (under reduced motion) and Stripe Press all showed little or nothing readable in their first 6 s. Your prerendered text is your LCP; keep it that way.
2. **A WebGL or 3D reel** (Cipher's ring, Jesper's curve, Igloo's camera path). It adds megabytes, makes `Tab` order meaningless, and turns your three chapters into objects instead of arguments.
3. **A custom cursor that hides the system cursor.** The eye already responds to the pointer. A second cursor follower would compete with it, and hiding the pointer hurts low-vision users.
4. **Smooth scroll under reduced motion** (Darkroom, Olivier, Cipher). You already turn Lenis off. Don't regress when you add R10's toggle.
5. **Invisible focus** (Rauno, Basement, Lusion's back button, samwho's logo keys). If the R3 hover effects get a `:focus-within` twin, keep the ember outline on top of the frame.
6. **More accent colours or a gradient mesh.** Darkroom shows the power of one accent at a time. Your three chapter colours plus ember is already the ceiling.
7. **Text scramble or "hacker" type effects, marquees, React Bits or Aceternity glow cards.** They're template signals. `docs/design-directions.md` already rejects them for good reason.
8. **Autoplaying sound.** The Pudding and Igloo both default to off. If Echo audio ever appears, make it opt-in with a visible label.
9. **Copying Sam Goddard's `//` HUD, Lynn Fisher's contents page or Rauno's ruler as-is.** Take the principle (one separator voice, a contents metaphor, a position indicator) and express it with your own chapter and surveillance vocabulary, as R1–R4 do.
10. **Publishing local Lighthouse scores, or any FundamentalX number, as fact.** Status labels are honest; invented values aren't.

---

## 7. Sources

All accessed **20 Oct 2026**.

**Candidate sourcing:**
- https://www.awwwards.com/websites/portfolio/
- https://www.awwwards.com/websites/portfolio/?award=sites_of_the_day
- https://www.awwwards.com/websites/portfolio/?award=developer
- https://www.awwwards.com/websites/sites_of_the_day/?category=portfolio (pages 1–3)
- Awwwards site pages for each SOTD listed below
- https://godly.website/

**Finalists** (home, plus the project or article page):
- https://samgoddard.co.uk/ · https://samgoddard.co.uk/work/fin
- https://brittanychiang.com/ · https://brittanychiang.com/archive
- https://rauno.me/ · https://rauno.me/craft · https://rauno.me/projects
- https://olivierlarose.com/
- https://jesperlandberg.com/ · https://jesperlandberg.com/projects/nathan-riley
- https://p5aholic.me/ · https://p5aholic.me/projects/
- https://lynnandtonic.com/
- https://darkroom.engineering/
- https://lusion.co/
- https://activetheory.net/
- https://www.igloo.inc/
- https://basement.studio/ · https://basement.studio/showcase/vercel-ship-a-home-for-innovation
- https://cipher.tv/
- https://ciechanow.ski/ · https://ciechanow.ski/moon/
- https://www.joshwcomeau.com/ · https://www.joshwcomeau.com/css/anchor-positioning/
- https://samwho.dev/ · https://samwho.dev/load-balancing/
- https://press.stripe.com/ · https://press.stripe.com/nomad-letters
- https://pudding.cool/ · https://pudding.cool/2026/10/lifeafter

**Triage only** (home page loaded once):
- https://huyml.co/ · https://www.mariavasilyeva.com/ · https://www.meermohsin.me/ · https://gilhuybrecht.com/ · https://giordanobetti.com/
- https://tommybiglow.com/ · https://jithinrp.com/ · https://dejiajetomobi.com/ · https://houmahani.com/ · https://leoparpeix.com/
- https://www.gionatannese.com/ · https://michaelgatt.com/ · https://artemartemartem.com/ · https://haoqi.design/
- https://resn.co.nz/ · https://14islands.com/ · https://immersive-g.com/ · https://unseen.co/ · https://obys.agency/
- https://paco.me/ · https://emilkowal.ski/ · https://leerob.com/ · https://bruno-simon.com/ · https://jhey.dev/ · https://www.cassie.codes/
- https://henryheffernan.com/ · https://aristidebenoist.com/ · https://blog.maximeheckel.com/ · https://ishadeed.com/
- https://thewatch.60fps.fr/ · https://madewithgsap.com/

**Failed:** https://locomotive.ca/ (Cloudflare 403).

**This site:** http://localhost:4173/ (`npm run build && npm run preview`): `/`, `/work/room-that-fights-back`, `/work/fundamentalx`.
