# Verification log: production build of Concept C (19 Oct 2026)

## Technical checks

| Check | Result |
|---|---|
| `npm run typecheck` (strict TS) | Pass |
| `npm run build` (client + SSR + prerender) | Pass. 4 routes + 404 prerendered |
| Preview code excluded from the production bundle | Confirmed: no preview strings in `dist/assets/*.js` |
| Hydration errors (React #418) on all 4 routes | None after the fix below |
| Console errors (prod preview and dev) | None |
| External links (GitHub profile + 6 repos) | All HTTP 200 |
| LinkedIn link | Not verifiable: LinkedIn returns 999 to automated requests |
| Internal links and image assets | All HTTP 200 |

## Browser checks (in-app browser + headless Chrome)

- **Overflow.** No horizontal page overflow at 320, 375, 768, 1366 and 1920 px. Wide tables and code blocks scroll inside their own focusable containers.
- **Navigation.**
  - Header Work/About/Contact from any page lands on the right section, including the pinned reel, and moves focus there.
  - Case-study links, "next chapter" and breadcrumbs work.
  - Client-side navigation updates the title and description and moves focus to `<main>`.
  - Direct loads and refreshes of `/work/<slug>` with and without a trailing slash serve the correct prerendered page.
  - Unknown paths get the 404 page.
- **Scroll choreography.**
  - The reel pins and scrolls horizontally at ≥ 900 px and stacks below that.
  - The Echo pipeline diagram lights stages on scroll and lands on `VETOED · SOLVABILITY`.
- **Keyboard.** Tab order runs skip link → header → hero → chapter links → rest. Real Tab presses into the pinned reel scroll the page to the focused panel's position, not the overflow box.
- **Reduced motion** (`--force-prefers-reduced-motion`). No Lenis (`<html>` has no `lenis` class), no pin-spacer, headline rendered without animation, eye drawn as a still frame.
- **Lighthouse 13.5, mobile.** Performance 90–93, Accessibility 100, Best Practices 100, SEO 100 on all four pages (table in the README).

## Bugs found and fixed during testing

1. **Hash links into the pinned reel landed at the end of the pin.** Lenis measured the pinned (moving) element. Fixed by scrolling to GSAP's `pin-spacer` wrapper.
2. **Hydration mismatch on `/work/<slug>`.** `vite preview` fell back to `index.html` for paths without a trailing slash, so case-study code hydrated over home-page HTML. Fixed by emitting `work/<slug>.html` as well and turning off the SPA fallback in preview.
3. **The route effect re-ran when Lenis initialised.** It could steal focus or reset scroll on first load. Fixed by keying it to `location.key` only.
4. **Focus inside the pinned reel scrolled the overflow box sideways**, desyncing it from GSAP. Fixed by resetting `scrollLeft` after the browser's focus scroll and moving the page instead.
5. **Roman numeral "I" rendered as a bare bar** in the display face. Replaced with outlined 01/02/03.

## What could not be verified

- How things look in a *visible* window for timing-dependent effects. The in-app browser pane was hidden during testing, which pauses `requestAnimationFrame` and CSS animations. Logic was checked through DOM state and headless Chrome, and frame-by-frame smoothness wasn't observed.
- Real touch devices, Safari and Firefox. Only Chromium was tested.
- A screen-reader pass (NVDA/VoiceOver). Semantics were checked with the accessibility tree and Lighthouse only.
- Deployment. Nothing has been deployed.
