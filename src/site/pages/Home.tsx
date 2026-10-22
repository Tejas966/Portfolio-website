import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { alsoBuilt, decisions, person, projects, record, stages, toolkit, type Project } from '../../data/content';
import { gsap, ScrollTrigger, scrollToTarget, useMotion } from '../motion';
import WatcherEye from '../WatcherEye';
import { FxBoard } from '../diagrams/Diagrams';

const numerals = ['I', 'II', 'III', 'IV'];

function Hero({ reduced }: { reduced: boolean }) {
  return (
    <section className="cc-hero" aria-labelledby="hero-title">
      <div className="cc-hero__stage">
        {/* The eye is a character, not decoration: say who it is. */}
        <div className="cc-watcher">
          <WatcherEye reduced={reduced} />
          <Link className="cc-watcher__cap" to="/work/room-that-fights-back">The Warden · from The Room That Fights Back<span aria-hidden="true"> →</span></Link>
        </div>
        <p className="cc-eyebrow cc-hero__role">{person.role}</p>
        {/* One heading, read as one sentence: who, what, then the thesis. */}
        <h1 id="hero-title" className="cc-hero__title">
          <span className="cc-hero__id"><span className="cc-hero__name">{person.name}</span> builds AI systems that answer to rules.</span>{' '}
          <span className="cc-hero__mask"><span className="cc-hero__line">It watches.</span></span>{' '}
          <span className="cc-hero__mask"><span className="cc-hero__line">It proposes.</span></span>{' '}
          <span className="cc-hero__mask"><span className="cc-hero__line cc-hero__line--accent">The rules decide.</span></span>
        </h1>
      </div>
      <div className="cc-hero__foot">
        <p>{person.intro}</p>
        <div className="cc-actions">
          <Link className="cc-btn" to="/#work">Enter the work</Link>
          <a className="cc-btn cc-btn--ghost" href={person.github} target="_blank" rel="noopener noreferrer">GitHub<span aria-hidden="true"> ↗</span></a>
        </div>
      </div>
    </section>
  );
}

const vetoCase = decisions[0];
const vetoAt = stages.indexOf(vetoCase.stage);

/**
 * The Echo review pipeline in miniature: the real failure-demo proposal travels through the nine stages
 * and stops at SOLVABILITY. The markup is the final state, so it reads correctly without JavaScript and
 * under reduced motion; with motion on, setStrip() rewinds it and the reel scroll replays it.
 */
function VetoStrip() {
  return (
    <figure className="cc-veto" data-veto-strip>
      <figcaption className="sr-only">
        Gemma proposed {vetoCase.proposal}. It passed {vetoAt} checks, was vetoed at {vetoCase.stage} because {vetoCase.reason}, and never reached the game.
      </figcaption>
      <p className="cc-veto__prop" aria-hidden="true"><span>Gemma proposes</span> <code>{vetoCase.proposal}</code></p>
      <ol className="cc-veto__stages" aria-hidden="true">
        {stages.map((s, i) => <li key={s} className={i < vetoAt ? 'pass' : i === vetoAt ? 'veto' : 'skip'}>{s}</li>)}
      </ol>
      <p className="cc-veto__verdict show" aria-hidden="true"><strong>VETOED · {vetoCase.stage}</strong> {vetoCase.reason}.</p>
    </figure>
  );
}

/** Lights `n` stages of a veto strip (n > vetoAt means the verdict has landed). Writes classes directly: it runs on scroll. */
function setStrip(el: HTMLElement, n: number) {
  if (el.dataset.n === String(n)) return;
  el.dataset.n = String(n);
  const landed = n > vetoAt;
  el.querySelectorAll('li').forEach((li, i) => {
    li.className = i < Math.min(n, vetoAt) ? 'pass' : i === vetoAt && landed ? 'veto' : i > vetoAt && landed ? 'skip' : '';
  });
  el.querySelector('.cc-veto__verdict')?.classList.toggle('show', landed);
}

function Monitor({ p }: { p: Project }) {
  const m = p.monitor!;
  const board = 'board' in m;
  return (
    <figure className="cc-monitor">
      <figcaption className="cc-monitor__cap"><span className="cc-monitor__rec" aria-hidden="true" />{m.label}</figcaption>
      {/* Image feeds keep their own proportions so nothing on the captured screen gets cropped. */}
      <div className={board ? 'cc-monitor__frame cc-monitor__frame--board' : 'cc-monitor__frame'} style={board ? undefined : { aspectRatio: `${m.width} / ${m.height}` }}>
        {board
          ? <FxBoard compact />
          : <img src={m.src} alt={m.alt} width={m.width} height={m.height} loading="lazy" decoding="async" style={m.position ? { objectPosition: m.position } : undefined} />}
      </div>
    </figure>
  );
}

function ChapterReel() {
  return (
    <section id="work" className="cc-reel" aria-labelledby="work-title" tabIndex={-1}>
      {/* Shown only while the reel is pinned (the class is added by the scroll setup in Home). */}
      <nav className="cc-chapters" aria-label="Chapters">
        <ol>
          {projects.map((p, i) => (
            <li key={p.slug}>
              <button type="button" data-chapter={i} style={{ ['--chap' as string]: p.color }}>
                <span aria-hidden="true">{numerals[i]}</span><span className="sr-only">Go to chapter {numerals[i]}: {p.name}</span>
              </button>
            </li>
          ))}
        </ol>
        <span className="cc-chapters__track" aria-hidden="true"><span className="cc-chapters__fill" /></span>
        <span className="cc-chapters__now" aria-hidden="true">Selected work</span>
      </nav>
      <div className="cc-reel__track">
        <div className="cc-reel__intro">
          <p className="cc-eyebrow">Selected work · three chapters</p>
          <h2 id="work-title">Each one gives a model, or a metric, some power, then limits it.</h2>
          <p className="cc-hint" aria-hidden="true">Keep scrolling →</p>
        </div>
        {projects.map((p, i) => (
          <article key={p.slug} className={p.monitor ? 'cc-panel cc-panel--media' : 'cc-panel'} style={{ ['--chap' as string]: p.color }} aria-labelledby={`panel-${p.slug}`}>
            <span className="cc-panel__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div className="cc-panel__text">
              <p className="cc-eyebrow">Chapter {numerals[i]} · {p.kicker}</p>
              <h3 id={`panel-${p.slug}`}>{p.name}</h3>
              <p className="cc-panel__one">{p.oneLiner}</p>
              {i === 0 ? <VetoStrip /> : (
                <div className="cc-panel__decision">
                  <p className="cc-eyebrow">The decision</p>
                  <p><strong>{p.decision.title}.</strong> {p.decision.body}</p>
                </div>
              )}
              <dl className="cc-panel__ev">
                {p.evidence.slice(0, 2).map((e) => <div key={e.label}><dt>{e.label}</dt><dd>{e.value}</dd></div>)}
              </dl>
              <p className="cc-panel__meta">
                {p.status} · {p.context}{p.contextPending && <span className="cc-pending"> · role to confirm</span>}
                <span aria-hidden="true"> · </span><span className="sr-only">. Stack: </span>{p.stack.join(' / ')}
              </p>
              <div className="cc-panel__links">
                <Link className="cc-btn cc-btn--chap" to={`/work/${p.slug}`}>Read the case study<span className="sr-only">: {p.name}</span></Link>
                <a className="cc-link" href={p.repo} target="_blank" rel="noopener noreferrer">Source<span className="sr-only"> code for {p.name} on GitHub</span><span aria-hidden="true"> ↗</span></a>
              </div>
            </div>
            {p.monitor && <Monitor p={p} />}
          </article>
        ))}
      </div>
    </section>
  );
}

function SideRooms() {
  return (
    <section className="cc-also" aria-labelledby="also-title">
      <h2 id="also-title" className="cc-eyebrow">Side rooms · smaller projects &amp; coursework</h2>
      <ul>
        {alsoBuilt.map((a) => (
          <li key={a.name}>
            <a href={a.repo} target="_blank" rel="noopener noreferrer">{a.name}<span aria-hidden="true"> ↗</span></a>
            <span>{a.note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function About() {
  const words = person.about[0].split(' ');
  return (
    <section id="about" className="cc-about" aria-labelledby="about-title" tabIndex={-1}>
      <h2 id="about-title" className="cc-eyebrow">About</h2>
      <p className="cc-about__big">{words.map((w, i) => <span key={i} className="cc-about__w">{w} </span>)}</p>
      <div className="cc-about__rest">{person.about.slice(1).map((t) => <p key={t}>{t}</p>)}</div>
      <ul className="cc-chips" aria-label="Interests">{person.interests.map((s) => <li key={s}>{s}</li>)}</ul>
    </section>
  );
}

function Toolkit() {
  return (
    <section className="cc-tools" aria-labelledby="tools-title">
      <div className="cc-section-head">
        <h2 id="tools-title">Toolkit</h2>
        <p>Only things I’ve shipped in a project, with where to find them.</p>
      </div>
      <div className="cc-tools__grid">
        {toolkit.map((g) => (
          <div key={g.group} className="cc-tools__group">
            <h3 className="cc-eyebrow">{g.group}</h3>
            <ul>{g.items.map((it) => <li key={it.name}><span>{it.name}</span><small>{it.where}</small></li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Record() {
  return (
    <section className="cc-record" aria-labelledby="record-title">
      <div className="cc-section-head"><h2 id="record-title">Record</h2></div>
      <ol>
        {record.map((r) => (
          <li key={r.what}>
            <span className="cc-record__when">{r.when}</span>
            <span className="cc-record__what">{r.what}</span>
            <span className="cc-record__detail">{r.detail}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Copies the address; rendered only once JavaScript runs, so the no-JS page never shows a dead button. */
function CopyEmail() {
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState('');
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  const copy = async () => {
    try { await navigator.clipboard.writeText(person.email); setStatus('Copied'); }
    catch { setStatus('Couldn’t copy: the address is on the left'); }
    window.setTimeout(() => setStatus(''), 2500);
  };
  return (
    <>
      <button type="button" className="cc-copy" onClick={copy}>{status === 'Copied' ? 'Copied ✓' : 'Copy email'}</button>
      <span className="sr-only" role="status">{status}</span>
    </>
  );
}

function Contact() {
  return (
    <section id="contact" className="cc-contact" aria-labelledby="contact-title" tabIndex={-1}>
      <p className="cc-eyebrow">Contact</p>
      <h2 id="contact-title">The door is open.</h2>
      <p className="cc-contact__lede">Internships, collaborations, or a model that needs a rulebook. Email is the fastest way to reach me.</p>
      <div className="cc-contact__row">
        <a className="cc-contact__mail" href={`mailto:${person.email}`}>{person.email}</a>
        <CopyEmail />
      </div>
      <div className="cc-actions">
        <a className="cc-btn cc-btn--ghost" href={person.github} target="_blank" rel="noopener noreferrer">GitHub<span aria-hidden="true"> ↗</span></a>
        <a className="cc-btn cc-btn--ghost" href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<span aria-hidden="true"> ↗</span></a>
        {person.resume && <a className="cc-btn cc-btn--ghost" href={person.resume} download>Résumé (PDF)</a>}
      </div>
    </section>
  );
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const { lenis, reduced } = useMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.cc-about__w', { opacity: 0.5 }, {
        opacity: 1, stagger: 0.04, ease: 'none',
        scrollTrigger: { trigger: '.cc-about', start: 'top 70%', end: 'bottom 60%', scrub: true },
      });

      const strip = root.current!.querySelector<HTMLElement>('[data-veto-strip]');
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', () => {
        const reel = root.current!.querySelector<HTMLElement>('.cc-reel')!;
        const track = reel.querySelector<HTMLElement>('.cc-reel__track')!;
        const panels = [...track.querySelectorAll<HTMLElement>('.cc-panel')];
        const index = reel.querySelector<HTMLElement>('.cc-chapters')!;
        const fill = index.querySelector<HTMLElement>('.cc-chapters__fill')!;
        const now = index.querySelector<HTMLElement>('.cc-chapters__now')!;
        const buttons = [...index.querySelectorAll<HTMLButtonElement>('button')];
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        // Progress (0–1) at which a panel sits centred in the viewport.
        const centreOf = (panel: HTMLElement) => Math.min(1, Math.max(0, (panel.offsetLeft - (window.innerWidth - panel.offsetWidth) / 2) / (distance() || 1)));
        let centres = panels.map(centreOf);
        let active = -2;

        const onUpdate = (self: ScrollTrigger) => {
          const p = self.progress;
          fill.style.transform = `scaleX(${p.toFixed(4)})`;
          // The chapter whose centre is nearest, once we're at least halfway to chapter I.
          let a = -1;
          centres.forEach((c, i) => { if (p >= c - (i === 0 ? c / 2 : (c - centres[i - 1]) / 2)) a = i; });
          if (a !== active) {
            active = a;
            buttons.forEach((b, i) => b.toggleAttribute('aria-current', i === a));
            now.textContent = a < 0 ? 'Selected work' : projects[a].name;
          }
          // Veto strip: the Echo panel is already partly on screen when the reel pins, so the proposal
          // travels through the stages between the start of the pin and the panel reaching the centre.
          if (strip) {
            const t = Math.min(1, p / ((centres[0] || 0.1) * 0.9));
            setStrip(strip, Math.round(t * (vetoAt + 1)));
          }
        };

        reel.classList.add('is-pinned');
        if (strip) setStrip(strip, 0);
        const tween = gsap.to(track, {
          x: () => -distance(), ease: 'none',
          scrollTrigger: {
            trigger: reel, pin: true, scrub: 0.6, end: () => `+=${distance()}`, invalidateOnRefresh: true,
            onRefresh: (self) => { centres = panels.map(centreOf); onUpdate(self); },
            onUpdate,
          },
        });
        const goTo = (progress: number) => {
          const st = tween.scrollTrigger;
          if (!st) return;
          scrollToTarget(lenis, st.start + progress * (st.end - st.start), true);
          st.update();
        };
        // Keyboard users: when focus lands in an off-screen panel, scroll the page so that panel is in view.
        const onFocus = (e: FocusEvent) => {
          const panel = (e.target as HTMLElement).closest<HTMLElement>('.cc-panel, .cc-reel__intro');
          if (!panel) return;
          const progress = centreOf(panel);
          // The browser scrolls the overflow box to the focused element after focusin; undo that,
          // then move the page so the pinned tween itself brings the panel into view.
          setTimeout(() => { reel.scrollLeft = 0; goTo(progress); }, 0);
        };
        const onIndex = (e: MouseEvent) => {
          const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-chapter]');
          if (!b) return;
          const st = tween.scrollTrigger;
          const panel = panels[Number(b.dataset.chapter)];
          if (!st || !panel) return;
          const y = st.start + centreOf(panel) * (st.end - st.start);
          if (lenis) lenis.scrollTo(y, { duration: 1.1 }); else window.scrollTo({ top: y });
        };
        reel.addEventListener('focusin', onFocus);
        index.addEventListener('click', onIndex);
        return () => {
          reel.removeEventListener('focusin', onFocus);
          index.removeEventListener('click', onIndex);
          reel.classList.remove('is-pinned');
          buttons.forEach((b) => b.removeAttribute('aria-current'));
          now.textContent = 'Selected work';
          if (strip) setStrip(strip, stages.length);
        };
      });
      // Stacked reel (narrow screens): the strip replays as it scrolls through the viewport.
      mm.add('(max-width: 899px)', () => {
        if (!strip) return;
        setStrip(strip, 0);
        const st = ScrollTrigger.create({
          trigger: strip, start: 'top 85%', end: 'top 40%',
          onUpdate: (self) => setStrip(strip, Math.round(self.progress * (vetoAt + 1))),
        });
        return () => { st.kill(); setStrip(strip, stages.length); };
      });
    }, root);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced, lenis]);

  return (
    <div ref={root}>
      <Hero reduced={reduced} />
      <ChapterReel />
      <SideRooms />
      <About />
      <Toolkit />
      <Record />
      <Contact />
    </div>
  );
}
