import { useEffect, useRef } from 'react';
import '@fontsource-variable/newsreader/opsz.css';
import '@fontsource-variable/newsreader/opsz-italic.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './b.css';
import { alsoBuilt, person, projects, stages } from '../../data/content';
import ConceptSwitcher from '../ConceptSwitcher';

const roman = ['I', 'II', 'III', 'IV'];

/** Line-art figure for Echo: the review pipeline drawn like an engraving. */
function PipelineFigure() {
  const w = 640, step = w / stages.length;
  return (
    <figure className="cb-fig">
      <svg viewBox={`0 0 ${w} 150`} role="img" aria-labelledby="cb-fig1-t">
        <title id="cb-fig1-t">Diagram: Gemma's proposal passes through nine rule stages before it reaches the game world.</title>
        <text x="0" y="18" className="cb-fig__small">GEMMA PROPOSES</text>
        <line x1="0" y1="62" x2={w} y2="62" className="cb-fig__line" />
        {stages.map((s, i) => (
          <g key={s} transform={`translate(${i * step + step / 2}, 62)`}>
            <circle r="9" className={s === 'SOLVABILITY' ? 'cb-fig__dot cb-fig__dot--key' : 'cb-fig__dot'} />
            <text y={i % 2 ? 36 : -20} textAnchor="middle" className="cb-fig__small">{s}</text>
          </g>
        ))}
        <text x={w} y="140" textAnchor="end" className="cb-fig__small">THE RULES DISPOSE →</text>
      </svg>
      <figcaption><span>Fig. 1</span> The review pipeline. The marked stage replays the puzzle graph to prove the exit is still reachable.</figcaption>
    </figure>
  );
}

export default function ConceptB() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Concept B · Field Notes · Tejas Joshi';
    // Progressive reveal: content is visible by default; only once JS runs do we hide-then-reveal.
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.add('cb--js');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    el.querySelectorAll('.cb-reveal').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <div className="cb" ref={root}>
      <a className="skip-link" href="#cb-main">Skip to content</a>
      <header className="cb-mast">
        <div className="cb-mast__row">
          <span>No. 01</span>
          <a href="#cb-main" className="cb-mast__title">Tejas Joshi</a>
          <span>October 2026</span>
        </div>
        <nav aria-label="Sections" className="cb-mast__nav">
          <a href="#contents">Contents</a><a href="#about">The author</a><a href="#contact">Correspondence</a>
        </nav>
      </header>

      <main id="cb-main">
        <section className="cb-hero" aria-labelledby="cb-h1">
          <p className="cb-kicker">Field notes on constrained machines</p>
          <h1 id="cb-h1">I build AI that is allowed to act, <em>and the rules it has to answer to.</em></h1>
          <div className="cb-hero__cols">
            <p className="cb-dropcap">{person.intro} I’m a third-year Computer Engineering student. These are three projects where a model, or a metric, had to earn its place in the system.</p>
            <div className="cb-hero__aside">
              <a className="cb-btn" href="#contents">Read the projects</a>
              <a className="cb-textlink" href={person.github} target="_blank" rel="noopener noreferrer">Source code on GitHub ↗</a>
            </div>
          </div>
        </section>

        <section id="contents" className="cb-toc" aria-labelledby="cb-toc-h">
          <h2 id="cb-toc-h" className="cb-label">In this issue</h2>
          <ol>
            {projects.map((p, i) => (
              <li key={p.slug}>
                <a href={`#${p.slug}`}>
                  <span className="cb-toc__n">{roman[i]}</span>
                  <span className="cb-toc__t">{p.name}</span>
                  <span className="cb-toc__k">{p.kicker}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        {projects.map((p, i) => (
          <article key={p.slug} id={p.slug} className="cb-essay" aria-labelledby={`cb-${p.slug}`}>
            <header className="cb-essay__head cb-reveal">
              <p className="cb-label">{roman[i]} · {p.kicker} · {p.year}</p>
              <h2 id={`cb-${p.slug}`}>{p.name}</h2>
              <p className="cb-standfirst">{p.oneLiner}</p>
            </header>
            <div className="cb-essay__body">
              <div className="cb-essay__main cb-reveal">
                <h3>The problem</h3>
                <p>{p.problem}</p>
                <h3>What I built</h3>
                <ul>{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
                <blockquote className="cb-pull">
                  <p>{p.decision.title}.</p>
                  <footer>{p.decision.body}</footer>
                </blockquote>
                {i === 0 && <PipelineFigure />}
                {p.image && (
                  <figure className="cb-fig cb-fig--img">
                    <img src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} loading="lazy" />
                    <figcaption><span>Fig. {i + 1}</span> Prototype dashboard: summary of the scored works. Flags are prompts for investigation, not findings of fraud.</figcaption>
                  </figure>
                )}
              </div>
              <aside className="cb-margin cb-reveal" aria-label={`${p.name} notes`}>
                <p className="cb-label">Measured</p>
                <dl>{p.evidence.map((e) => (<div key={e.label}><dt>{e.label}</dt><dd>{e.value}</dd></div>))}</dl>
                <p className="cb-label">Built with</p>
                <p className="cb-margin__stack">{p.stack.join(' · ')}</p>
                <p className="cb-label">Status</p>
                <p>{p.status}</p>
                <p className={p.contextPending ? 'cb-pending' : ''}>{p.context}</p>
                <a className="cb-textlink" href={p.repo} target="_blank" rel="noopener noreferrer">Read the source ↗</a>
              </aside>
            </div>
          </article>
        ))}

        <section className="cb-also" aria-labelledby="cb-also-h">
          <h2 id="cb-also-h" className="cb-label">Also in the archive</h2>
          <ul>{alsoBuilt.map((a) => <li key={a.name}><a href={a.repo} target="_blank" rel="noopener noreferrer">{a.name}</a> · {a.note}</li>)}</ul>
        </section>

        <section id="about" className="cb-about" aria-labelledby="cb-about-h">
          <h2 id="cb-about-h" className="cb-label">About the author</h2>
          <div className="cb-about__cols">
            {person.about.map((t) => <p key={t}>{t}</p>)}
          </div>
        </section>

        <section id="contact" className="cb-contact" aria-labelledby="cb-contact-h">
          <h2 id="cb-contact-h" className="cb-label">Correspondence</h2>
          <p className="cb-contact__line">Questions, internships, or a project that needs a model kept on a leash: <a href={`mailto:${person.email}`}>{person.email}</a></p>
          <p className="cb-contact__links">
            <a href={person.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className="cb-pending">Résumé: available soon</span>
          </p>
        </section>
      </main>
      <footer className="cb-foot"><span>Set in Newsreader &amp; IBM Plex Mono</span><span>Concept B preview</span></footer>
      <ConceptSwitcher />
    </div>
  );
}
