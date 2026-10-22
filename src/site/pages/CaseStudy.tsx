import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects, type Block } from '../../data/content';
import Diagram from '../diagrams/Diagrams';
import { gsap, ScrollTrigger, useMotion } from '../motion';
import NotFound from './NotFound';

const numerals = ['I', 'II', 'III', 'IV'];

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case 'p': return <p>{b.text}</p>;
    case 'list': return <ul className="cs-list">{b.items.map((t) => <li key={t}>{t}</li>)}</ul>;
    case 'note': return <p className="cs-note" role="note">{b.text}</p>;
    case 'code': return (
      <figure className="cs-code">
        <figcaption>{b.label}</figcaption>
        <pre tabIndex={0}><code>{b.code}</code></pre>
      </figure>
    );
    case 'figure': return (
      <figure className="cs-fig">
        <img src={b.figure.src} alt={b.figure.alt} width={b.figure.width} height={b.figure.height} loading="lazy" decoding="async" />
        <figcaption>{b.figure.caption}</figcaption>
      </figure>
    );
    case 'diagram': return <Diagram id={b.id} />;
    case 'table': return (
      <figure className="cs-table">
        <div className="cs-table__scroll" tabIndex={0} role="region" aria-label={b.caption ?? b.head.join(', ')}>
          <table>
            <thead><tr>{b.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
            <tbody>{b.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
        {b.caption && <figcaption>{b.caption}</figcaption>}
      </figure>
    );
    case 'decision': return (
      <div className="cs-decision">
        <p className="cc-eyebrow">Decision</p>
        <h3>{b.title}</h3>
        <p>{b.why}</p>
        {b.alternative && <p className="cs-decision__alt"><span>Rejected alternative:</span> {b.alternative}</p>}
      </div>
    );
  }
}

export default function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const root = useRef<HTMLElement>(null);
  const { reduced } = useMotion();

  useEffect(() => {
    if (reduced || index < 0) return;
    const ctx = gsap.context(() => {
      gsap.to('.cs-progress span', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: true } });
      // Only sections still below the fold animate, so nothing already visible flickers after hydration.
      gsap.utils.toArray<HTMLElement>('.cs-section').filter((el) => el.getBoundingClientRect().top > window.innerHeight).forEach((el) => {
        gsap.from(el, { opacity: 0, y: 28, duration: 0.8, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
    }, root);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced, index]);

  // "On this page": mark the section currently being read (works with or without motion).
  useEffect(() => {
    if (index < 0) return;
    const links = new Map([...document.querySelectorAll<HTMLAnchorElement>('.cs-toc a')].map((a) => [a.hash.slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        links.forEach((a, id) => (id === e.target.id ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
      }
    }, { rootMargin: '-25% 0px -65% 0px' });
    document.querySelectorAll('.cs-section').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [index]);

  if (index < 0) return <NotFound />;
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <article ref={root} className="cs" style={{ ['--chap' as string]: p.color }} aria-labelledby="cs-title">
      <div className="cs-progress" aria-hidden="true"><span /></div>
      <header className="cs-hero">
        {p.bg && <img className="cs-hero__bg" src={p.bg} alt="" aria-hidden="true" decoding="async" />}
        <span className="cs-hero__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <nav aria-label="Breadcrumb" className="cs-crumb"><Link to="/#work">Work</Link> <span aria-hidden="true">/</span> <span aria-current="page">Chapter {numerals[index]}</span></nav>
        <p className="cc-eyebrow">{p.kicker}</p>
        <h1 id="cs-title">{p.name}</h1>
        <p className="cs-hero__one">{p.oneLiner}</p>
        <dl className="cs-meta">
          <div><dt>Role</dt><dd>{p.role}{p.rolePending && <span className="cc-pending"> (to confirm)</span>}</dd></div>
          <div><dt>Timeline</dt><dd>{p.timeline}</dd></div>
          <div><dt>Status</dt><dd>{p.status}</dd></div>
          <div><dt>Stack</dt><dd>{p.stack.join(', ')}</dd></div>
        </dl>
        <div className="cc-actions">
          <a className="cc-btn cc-btn--chap" href={p.repo} target="_blank" rel="noopener noreferrer">Source on GitHub<span aria-hidden="true"> ↗</span></a>
          {p.demo && <a className="cc-btn cc-btn--ghost" href={p.demo} target="_blank" rel="noopener noreferrer">Live demo<span aria-hidden="true"> ↗</span></a>}
        </div>
      </header>

      <div className="cs-body">
        <nav className="cs-toc" aria-label="On this page">
          <p className="cc-eyebrow">On this page</p>
          <ol>{p.sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.heading}</a></li>)}</ol>
        </nav>
        <div className="cs-content">
          {p.sections.map((s) => (
            <section key={s.id} id={s.id} className="cs-section" aria-labelledby={`h-${s.id}`} tabIndex={-1}>
              <h2 id={`h-${s.id}`}>{s.heading}</h2>
              {s.blocks.map((b, i) => <BlockView key={i} b={b} />)}
            </section>
          ))}
        </div>
      </div>

      <Link to={`/work/${next.slug}`} className="cs-next" style={{ ['--next' as string]: next.color }}>
        <span className="cc-eyebrow">Next chapter</span>
        <span className="cs-next__name">{next.name} <span aria-hidden="true">→</span></span>
      </Link>
    </article>
  );
}
