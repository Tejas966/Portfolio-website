import { useEffect, useState } from 'react';
import '@fontsource-variable/instrument-sans';
import '@fontsource-variable/martian-mono';
import './a.css';
import { alsoBuilt, decisions, person, projects, stages } from '../../data/content';
import { useReducedMotion } from '../useReducedMotion';
import ConceptSwitcher from '../ConceptSwitcher';

const verdictClass: Record<string, string> = { ACCEPTED: 'ok', AMENDED: 'amend', VETOED: 'veto', FALLBACK: 'fall' };

/** Hero signature: a proposal walks through the real review stages and receives a verdict. */
function PipelineCard() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [step, setStep] = useState(0);
  const d = decisions[i];
  const stopAt = stages.indexOf(d.stage);

  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => {
      if (step <= stopAt) setStep(step + 1);
      else { setI((i + 1) % decisions.length); setStep(0); }
    }, step <= stopAt ? 260 : 2600);
    return () => window.clearTimeout(t);
  }, [step, stopAt, i, reduced]);

  const shown = reduced ? stopAt + 1 : step;
  const done = shown > stopAt;

  return (
    <figure className="ca-card" aria-label="Example decision passing through the rules engine">
      <div className="ca-card__bar">
        <span>rules.review()</span>
        <span>#{String(i + 1).padStart(2, '0')} / {String(decisions.length).padStart(2, '0')}</span>
      </div>
      <p className="ca-card__label">model proposed</p>
      <p className="ca-card__proposal"><code>{d.proposal}</code></p>
      <ol className="ca-stages" aria-hidden="true">
        {stages.map((s, k) => (
          <li key={s} className={k < shown ? (k === stopAt ? `hit ${verdictClass[d.verdict]}` : 'pass') : ''}>{s}</li>
        ))}
      </ol>
      <div className={`ca-verdict ${done ? 'show' : ''} ${verdictClass[d.verdict]}`} aria-live="polite">
        {done && (<><strong>{d.verdict}</strong><span>· {d.stage} · {d.reason}</span></>)}
      </div>
      <figcaption>Real cases from the failure demo in <em>The Room That Fights Back</em>.</figcaption>
    </figure>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  return (
    <button className="ca-btn ca-btn--ghost" type="button" onClick={async () => {
      try { await navigator.clipboard.writeText(person.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked: the mailto link still works */ }
    }}>{copied ? 'Copied ✓' : 'Copy address'}</button>
  );
}

export default function ConceptA() {
  const [open, setOpen] = useState<string>(projects[0].slug);
  useEffect(() => { document.title = 'Concept A · Review Pipeline · Tejas Joshi'; }, []);

  return (
    <div className="ca">
      <a className="skip-link" href="#ca-main">Skip to content</a>
      <header className="ca-top">
        <a href="#ca-main" className="ca-mark">TJ<span>/</span><b className="ca-mark__long">review-pipeline</b></a>
        <nav aria-label="Sections">
          <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="ca-main">
        <section className="ca-hero" aria-labelledby="ca-h1">
          <div className="ca-hero__text">
            <p className="ca-meta">{person.name} · {person.role}</p>
            <h1 id="ca-h1">Models propose.<br /><span>Systems decide.</span></h1>
            <p className="ca-lede">{person.intro}</p>
            <div className="ca-actions">
              <a className="ca-btn" href="#work">See the work ↓</a>
              <a className="ca-btn ca-btn--ghost" href={person.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </div>
          </div>
          <PipelineCard />
        </section>

        <section id="work" className="ca-section" aria-labelledby="ca-work">
          <div className="ca-section__head">
            <h2 id="ca-work">Case files</h2>
            <p className="ca-meta">03 projects · each one puts a model or a metric under rules</p>
          </div>
          <ul className="ca-files">
            {projects.map((p, n) => {
              const isOpen = open === p.slug;
              return (
                <li key={p.slug} className={`ca-file ${isOpen ? 'open' : ''}`}>
                  <h3>
                    <button type="button" aria-expanded={isOpen} aria-controls={`ca-${p.slug}`} onClick={() => setOpen(isOpen ? '' : p.slug)}>
                      <span className="ca-file__n">{String(n + 1).padStart(2, '0')}</span>
                      <span className="ca-file__name">{p.name}</span>
                      <span className="ca-file__kicker">{p.kicker}</span>
                      <span className="ca-file__status">{p.status.split('·')[0].trim()}</span>
                      <span className="ca-file__toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                    </button>
                  </h3>
                  <div id={`ca-${p.slug}`} className="ca-file__body" hidden={!isOpen}>
                    <div className="ca-file__grid">
                      <div>
                        <p className="ca-file__one">{p.oneLiner}</p>
                        <p className="ca-label">problem</p>
                        <p>{p.problem}</p>
                        <p className="ca-label">what I built</p>
                        <ul className="ca-list">{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
                      </div>
                      <aside>
                        <div className="ca-decision">
                          <p className="ca-label">key decision</p>
                          <p className="ca-decision__t">{p.decision.title}</p>
                          <p>{p.decision.body}</p>
                        </div>
                        <dl className="ca-evidence">
                          {p.evidence.map((e) => (<div key={e.label}><dt>{e.label}</dt><dd>{e.value}</dd></div>))}
                        </dl>
                        <p className="ca-label">stack</p>
                        <ul className="ca-tags">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                        <p className={`ca-context ${p.contextPending ? 'pending' : ''}`}>{p.context}</p>
                        <a className="ca-link" href={p.repo} target="_blank" rel="noopener noreferrer">Source on GitHub ↗</a>
                      </aside>
                    </div>
                    {p.image && <img className="ca-shot" src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} loading="lazy" />}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="ca-also">
            <p className="ca-label">also built</p>
            <ul>{alsoBuilt.map((a) => <li key={a.name}><a href={a.repo} target="_blank" rel="noopener noreferrer">{a.name} ↗</a><span>{a.note}</span></li>)}</ul>
          </div>
        </section>

        <section id="about" className="ca-section ca-about" aria-labelledby="ca-about">
          <div className="ca-section__head"><h2 id="ca-about">About</h2></div>
          <div className="ca-about__body">
            {person.about.map((t) => <p key={t}>{t}</p>)}
            <ul className="ca-tags">{person.interests.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </section>

        <section id="contact" className="ca-section ca-contact" aria-labelledby="ca-contact">
          <h2 id="ca-contact" className="ca-meta">contact</h2>
          <a className="ca-email" href={`mailto:${person.email}`}>{person.email}</a>
          <div className="ca-actions">
            <CopyEmail />
            <a className="ca-btn ca-btn--ghost" href={person.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a className="ca-btn ca-btn--ghost" href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <span className="ca-btn ca-btn--disabled" aria-disabled="true">Résumé · coming soon</span>
          </div>
        </section>
      </main>
      <footer className="ca-foot"><span>© 2026 Tejas Joshi</span><span>Concept A preview</span></footer>
      <ConceptSwitcher />
    </div>
  );
}
