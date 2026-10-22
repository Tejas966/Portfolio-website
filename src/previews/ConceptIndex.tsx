import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const concepts = [
  {
    to: '/previews/a', letter: 'A', name: 'Review Pipeline',
    thesis: 'The portfolio itself behaves like the systems Tejas builds: a proposal goes in, it passes visible checks, and a verdict comes out. An engineering logbook rather than a showreel.',
    look: 'Warm paper grey, ink black, signal orange, verdict colours. Instrument Sans + Martian Mono. Faint 12-column guides.',
    motion: 'One signature loop: a real Gemma decision walking through the 9 rule stages. Everything else is instant.',
    projects: 'Expandable “case files”: dense, scannable, evidence grids up front.',
    swatch: ['#ecebe6', '#121212', '#c43c00', '#1d6b35'],
    pros: 'Says “I think in systems” in the first second. Fast, light, very readable.',
    cons: 'Less emotional; the information-dense look can feel like a dashboard.',
  },
  {
    to: '/previews/b', letter: 'B', name: 'Field Notes',
    thesis: 'A print journal about constrained machines. Projects read as short essays with margin notes, pull quotes and engraved diagrams: an engineer who can explain why.',
    look: 'Ivory paper, oxblood accent, double rules. Newsreader (optical sizes) + IBM Plex Mono.',
    motion: 'Almost none: paragraphs settle in as you read; hover nudges in the contents list.',
    projects: 'A table of contents, then one essay per project with sticky margin notes.',
    swatch: ['#f3eee4', '#1d1b18', '#8b1e1e', '#d6ccba'],
    pros: 'Most distinctive among developer portfolios; best for long-form case studies and recruiters who read.',
    cons: 'Quiet. Skimmers get less spectacle; the serif aesthetic is less “AI engineer” at first glance.',
  },
  {
    to: '/previews/c', letter: 'C', name: 'The Watcher',
    thesis: 'Borrowed from The Room That Fights Back: the visitor is watched by a procedural eye, and the projects are chapters in a dark, cinematic, scroll-driven reel.',
    look: 'Near-black void, bone text, per-chapter colours (ice, ember, red). Bricolage Grotesque + Geist.',
    motion: 'Canvas eye tracks the pointer and dilates on links; GSAP-pinned horizontal reel with Lenis smooth scroll; scrubbed text.',
    projects: 'Full-height chapter panels with big numerals and three headline numbers each.',
    swatch: ['#0b0b0d', '#e9e4da', '#f0a93b', '#e5484d'],
    pros: 'Most memorable and “wow”; shows creative-coding range; strong story hook.',
    cons: 'Heaviest (GSAP + Lenis + canvas), and dark and horror-adjacent, which may not suit finance or government projects. More to get right on mobile.',
  },
];

export default function ConceptIndex() {
  useEffect(() => { document.title = 'Design concepts · Tejas Joshi'; }, []);
  return (
    <div className="ci">
      <main>
        <header className="ci-head">
          <p className="ci-eyebrow">Tejas Joshi · portfolio · phase 3</p>
          <h1>Three design directions</h1>
          <p className="ci-lede">All three show the same verified content (hero, three featured projects, about, contact), so you can compare the design and not the information. Open each one, try it on your phone, and choose A, B or C, or tell me which parts to combine.</p>
        </header>

        <ol className="ci-grid">
          {concepts.map((c) => (
            <li key={c.letter} className="ci-card">
              <Link to={c.to} className="ci-card__link">
                <div className="ci-swatch" aria-hidden="true">{c.swatch.map((s) => <span key={s} style={{ background: s }} />)}</div>
                <p className="ci-eyebrow">Concept {c.letter}</p>
                <h2>{c.name} <span aria-hidden="true">→</span></h2>
              </Link>
              <p>{c.thesis}</p>
              <dl>
                <div><dt>Look</dt><dd>{c.look}</dd></div>
                <div><dt>Motion</dt><dd>{c.motion}</dd></div>
                <div><dt>Projects</dt><dd>{c.projects}</dd></div>
                <div><dt>Strength</dt><dd>{c.pros}</dd></div>
                <div><dt>Trade-off</dt><dd>{c.cons}</dd></div>
              </dl>
            </li>
          ))}
        </ol>

        <section className="ci-table" aria-labelledby="ci-cmp">
          <h2 id="ci-cmp">At a glance</h2>
          <div className="ci-scroll" tabIndex={0} role="region" aria-labelledby="ci-cmp">
            <table>
              <thead><tr><th scope="col">Aspect</th><th scope="col">A · Review Pipeline</th><th scope="col">B · Field Notes</th><th scope="col">C · The Watcher</th></tr></thead>
              <tbody>
                <tr><th scope="row">Personality</th><td>Precise, systematic</td><td>Thoughtful, literate</td><td>Cinematic, playful-dark</td></tr>
                <tr><th scope="row">Information density</th><td>High</td><td>Medium, long-form</td><td>Low per screen</td></tr>
                <tr><th scope="row">Animation libraries</th><td>None (CSS + React state)</td><td>None (IntersectionObserver)</td><td>GSAP ScrollTrigger + Lenis</td></tr>
                <tr><th scope="row">Signature element</th><td>Live rules-engine card</td><td>Margin notes &amp; engraved diagram</td><td>Pointer-tracking canvas eye</td></tr>
                <tr><th scope="row">Case-study fit</th><td>Good (logs, diagrams)</td><td>Excellent (essays)</td><td>Good (chapters)</td></tr>
                <tr><th scope="row">Mobile risk</th><td>Low</td><td>Low</td><td>Medium (pinning disabled &lt; 900px)</td></tr>
                <tr><th scope="row">Perf. risk</th><td>Very low</td><td>Very low</td><td>Moderate (≈ 50 KB gz JS + canvas loop)</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="ci-rec" aria-labelledby="ci-rec-h">
          <h2 id="ci-rec-h">My recommendation: A, with B’s case-study pages</h2>
          <p>The research gave one clear through-line: in every serious project, a model is allowed to act but has to answer to a deterministic system. Concept A makes that thesis visible in the first five seconds, using real data from the Echo failure demo, and it stays fast and readable for recruiters. Its weakness is long-form writing, which is exactly B’s strength, so the strongest final site would use A’s system for the home page and B’s editorial layout for the case-study pages. C is the most fun, but its horror tone fits only one of the three projects.</p>
        </section>

        <section className="ci-notes" aria-labelledby="ci-notes-h">
          <h2 id="ci-notes-h">Preview caveats</h2>
          <ul>
            <li>Items marked “to confirm” or “placeholder” (MPLADS role, résumé) are unverified and need your input; see <code>docs/portfolio-research.md</code> §8.</li>
            <li>The MPLADS screenshot is cropped to aggregate figures only, so no named MP or vendor appears next to a risk flag.</li>
            <li>Previews are not production pages: no case-study routes, SEO or 404 yet.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
