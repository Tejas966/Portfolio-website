import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import '@fontsource-variable/bricolage-grotesque/standard.css';
import '@fontsource-variable/geist';
import './c.css';
import { alsoBuilt, person, projects } from '../../data/content';
import { useReducedMotion } from '../useReducedMotion';
import ConceptSwitcher from '../ConceptSwitcher';
import WatcherEye from './WatcherEye';

gsap.registerPlugin(ScrollTrigger);

const chapters = ['#cfe1ff', '#f0a93b', '#e5484d'];
const numerals = ['I', 'II', 'III'];

export default function ConceptC() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => { document.title = 'Concept C · The Watcher · Tejas Joshi'; }, []);

  useEffect(() => {
    if (reduced) return;
    // Lenis + ScrollTrigger, wired as the Lenis README recommends: one GSAP ticker drives both.
    const lenis = new Lenis({ autoRaf: false, anchors: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Hero lines rise in once; content is visible without JS because gsap.from only runs here.
      gsap.from('.pc-hero__line', { yPercent: 110, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.12, delay: 0.1 });

      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', () => {
        const track = document.querySelector<HTMLElement>('.pc-reel__track')!;
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: { trigger: '.pc-reel', pin: true, scrub: 0.6, end: () => `+=${distance()}`, invalidateOnRefresh: true },
        });
      });

      // About: words brighten as they scroll past (they never drop below a readable contrast).
      gsap.fromTo('.pc-about__w', { opacity: 0.5 }, {
        opacity: 1, stagger: 0.04, ease: 'none',
        scrollTrigger: { trigger: '.pc-about', start: 'top 70%', end: 'bottom 60%', scrub: true },
      });
    }, root);

    return () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, [reduced]);

  const aboutWords = person.about[0].split(' ');

  return (
    <div className="pc" ref={root}>
      <a className="skip-link" href="#pc-main">Skip to content</a>
      <header className="pc-top">
        <a href="#pc-main" className="pc-top__name">Tejas Joshi</a>
        <nav aria-label="Sections"><a href="#chapters">Work</a><a href="#about">About</a><a href="#contact">Exit</a></nav>
      </header>

      <main id="pc-main">
        <section className="pc-hero" aria-labelledby="pc-h1">
          <WatcherEye reduced={reduced} />
          <h1 id="pc-h1" className="pc-hero__title">
            <span className="pc-hero__mask"><span className="pc-hero__line">It watches.</span></span>
            <span className="pc-hero__mask"><span className="pc-hero__line">It proposes.</span></span>
            <span className="pc-hero__mask"><span className="pc-hero__line pc-hero__line--accent">The rules decide.</span></span>
          </h1>
          <div className="pc-hero__foot">
            <p>{person.name}: {person.intro}</p>
            <div className="pc-actions">
              <a className="pc-btn" href="#chapters">Enter the work</a>
              <a className="pc-btn pc-btn--ghost" href={person.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </div>
          </div>
        </section>

        <section id="chapters" className="pc-reel" aria-label="Projects">
          <div className="pc-reel__track">
            <div className="pc-reel__intro">
              <p className="pc-eyebrow">Three chapters</p>
              <h2>Each one hands a model, or a metric, some power, then limits it.</h2>
              <p className="pc-hint" aria-hidden="true">scroll →</p>
            </div>
            {projects.map((p, i) => (
              <article key={p.slug} className="pc-panel" style={{ ['--chap' as string]: chapters[i] }} aria-labelledby={`pc-${p.slug}`}>
                <span className="pc-panel__num" aria-hidden="true">{numerals[i]}</span>
                <p className="pc-eyebrow">Chapter {numerals[i]} · {p.kicker}</p>
                <h3 id={`pc-${p.slug}`}>{p.name}</h3>
                <p className="pc-panel__one">{p.oneLiner}</p>
                <div className="pc-panel__decision">
                  <p className="pc-eyebrow">The decision</p>
                  <p><strong>{p.decision.title}.</strong> {p.decision.body}</p>
                </div>
                <dl className="pc-panel__ev">{p.evidence.slice(0, 3).map((e) => <div key={e.label}><dd>{e.value}</dd><dt>{e.label}</dt></div>)}</dl>
                <p className="pc-panel__stack">{p.stack.join(' / ')}</p>
                <p className={`pc-panel__ctx ${p.contextPending ? 'pending' : ''}`}>{p.status} · {p.context}</p>
                <a className="pc-link" href={p.repo} target="_blank" rel="noopener noreferrer">Source ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section className="pc-also" aria-labelledby="pc-also-h">
          <h2 id="pc-also-h" className="pc-eyebrow">Side rooms</h2>
          <ul>{alsoBuilt.map((a) => <li key={a.name}><a href={a.repo} target="_blank" rel="noopener noreferrer">{a.name} ↗</a><span>{a.note}</span></li>)}</ul>
        </section>

        <section id="about" className="pc-about" aria-labelledby="pc-about-h">
          <h2 id="pc-about-h" className="pc-eyebrow">About</h2>
          <p className="pc-about__big">{aboutWords.map((w, i) => <span key={i} className="pc-about__w">{w} </span>)}</p>
          <div className="pc-about__rest">{person.about.slice(1).map((t) => <p key={t}>{t}</p>)}</div>
        </section>

        <section id="contact" className="pc-contact" aria-labelledby="pc-contact-h">
          <h2 id="pc-contact-h">The door is open.</h2>
          <a className="pc-contact__mail" href={`mailto:${person.email}`}>{person.email}</a>
          <div className="pc-actions">
            <a className="pc-btn pc-btn--ghost" href={person.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a className="pc-btn pc-btn--ghost" href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <span className="pc-btn pc-btn--off" aria-disabled="true">Résumé · soon</span>
          </div>
        </section>
      </main>
      <footer className="pc-foot"><span>© 2026 Tejas Joshi</span><span>Concept C preview</span></footer>
      <ConceptSwitcher />
    </div>
  );
}
