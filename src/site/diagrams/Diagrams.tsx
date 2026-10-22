import { useEffect, useRef, useState } from 'react';
import { stages } from '../../data/content';
import { ScrollTrigger, useMotion } from '../motion';

interface Step { label: string; sub?: string; tone?: 'model' | 'rules' | 'human' }

/** A linear flow drawn as an ordered list, so it reflows on small screens and reads correctly to assistive tech. */
function Flow({ title, steps, caption }: { title: string; steps: Step[]; caption: string }) {
  return (
    <figure className="dg">
      <figcaption className="dg__title">{title}</figcaption>
      <ol className="dg-flow">
        {steps.map((s) => (
          <li key={s.label} className={s.tone ? `dg-node dg-node--${s.tone}` : 'dg-node'}>
            <strong>{s.label}</strong>
            {s.sub && <span>{s.sub}</span>}
          </li>
        ))}
      </ol>
      <p className="dg__cap">{caption}</p>
    </figure>
  );
}

const stageInfo: Record<string, string> = {
  PARSE: 'Is it valid JSON?',
  SCHEMA: 'Known action, right shape?',
  TARGET: 'Does the target exist now?',
  CONTENT: 'Spoilers, slurs, off-character?',
  STALE: 'Based on an old view?',
  COOLDOWN: 'Repeated too soon?',
  BUDGET: 'Enough threat points?',
  SOLVABILITY: 'Is the exit still reachable?',
  MERCY: 'Is the player struggling?',
};

/** Signature interaction: the stages light up as the reader scrolls, ending in the real veto. */
function EchoPipeline() {
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useMotion();
  const veto = stages.indexOf('SOLVABILITY');
  const [lit, setLit] = useState(stages.length);
  const timer = useRef(0);
  useEffect(() => () => window.clearInterval(timer.current), []);
  // Reader-controlled replay, independent of scroll (one stage every 180 ms).
  const replay = () => {
    window.clearInterval(timer.current);
    let n = 0;
    setLit(0);
    timer.current = window.setInterval(() => {
      n += 1;
      setLit(n);
      if (n > veto) window.clearInterval(timer.current);
    }, 180);
  };

  useEffect(() => {
    if (reduced) { setLit(stages.length); return; }
    setLit(0);
    const st = ScrollTrigger.create({
      trigger: ref.current, start: 'top 75%', end: 'bottom 45%',
      onUpdate: (self) => setLit(Math.round(self.progress * (veto + 1))),
    });
    return () => st.kill();
  }, [reduced, veto]);

  const done = lit > veto;
  return (
    <figure className="dg dg-pipe" ref={ref}>
      <figcaption className="dg__title">The review pipeline · a real case from the failure demo</figcaption>
      <p className="dg-pipe__proposal"><span>Gemma proposes</span><code>lock_door → lift · intensity 3 (permanent)</code></p>
      <ol className="dg-pipe__stages">
        {stages.map((s, i) => {
          const state = i < Math.min(lit, veto) ? 'pass' : i === veto && done ? 'veto' : i > veto && done ? 'skip' : '';
          return (
            <li key={s} className={state}>
              <strong>{s}</strong>
              <span>{stageInfo[s]}</span>
              <em className="sr-only">{state === 'pass' ? 'passed' : state === 'veto' ? 'vetoed here' : state === 'skip' ? 'not reached' : ''}</em>
            </li>
          );
        })}
      </ol>
      <p className={`dg-pipe__verdict ${done ? 'show' : ''}`} aria-hidden={!done}>
        <strong>VETOED · SOLVABILITY</strong> “lift is the only route to EXIT”. The world is replayed on a cloned state, the escape becomes unreachable, so the action never touches the game.
      </p>
      <button type="button" className="dg-pipe__replay" onClick={replay}>Replay the review<span aria-hidden="true"> ↺</span></button>
    </figure>
  );
}

type FxStatus = 'calculated' | 'unavailable' | 'not_meaningful';
const fxRows: { metric: string; formula: string; status: FxStatus; why: string }[] = [
  { metric: 'P/E', formula: 'Price ÷ EPS', status: 'not_meaningful', why: 'EPS ≤ 0 in a loss year' },
  { metric: 'ROE', formula: 'NI ÷ avg(equity)', status: 'calculated', why: 'opening and closing equity present' },
  { metric: 'Revenue growth', formula: '(Cur − Prev) ÷ Prev', status: 'not_meaningful', why: 'previous ≤ 0 · turnaround flag' },
  { metric: 'Free cash flow', formula: 'OCF − |Capex|', status: 'unavailable', why: 'capex missing · never zero-filled' },
  { metric: 'EV / EBITDA', formula: 'EV ÷ EBITDA', status: 'not_meaningful', why: 'a bank, or EBITDA ≤ 0' },
];
const fxLabel: Record<FxStatus, string> = { calculated: 'Calculated', unavailable: 'Unavailable', not_meaningful: 'Not meaningful' };

/**
 * How FundamentalX labels its own metrics, drawn from the rules in the repo README. It shows statuses and
 * reasons, not values: demo-mode figures are illustrative, and the point of the project is the label.
 */
export function FxBoard({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={compact ? 'fxb fxb--compact' : 'fxb dg'}>
      <table>
        <caption className={compact ? 'sr-only' : 'dg__title'}>Every metric declares whether it means anything</caption>
        <thead>
          <tr><th scope="col">Metric</th><th scope="col" className="fxb__f">Formula</th><th scope="col">Status</th><th scope="col" className="fxb__w">Reason</th></tr>
        </thead>
        <tbody>
          {fxRows.map((r) => (
            <tr key={r.metric}>
              <th scope="row">{r.metric}</th>
              <td className="fxb__f"><code>{r.formula}</code></td>
              <td><span className={`fxb__s fxb__s--${r.status}`}>{fxLabel[r.status]}</span></td>
              <td className="fxb__w">{r.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!compact && <figcaption className="dg__cap">Example cases from the engine’s rules. Values are left out on purpose: in demo mode they’re illustrative data.</figcaption>}
    </figure>
  );
}

function FxArch() {
  const spokes: Step[] = [
    { label: 'MySQL', sub: 'users, sessions, caches, watchlist' },
    { label: 'Provider adapter', sub: 'demo dataset | FMP REST (unverified live)' },
    { label: 'Python · FastAPI', sub: 'ratios, growth, quality checks (internal)', tone: 'rules' },
    { label: 'PHP · PDO', sub: 'saved screens, research notes (internal)' },
    { label: 'Gemini API', sub: 'explanation of calculated facts only', tone: 'model' },
  ];
  return (
    <figure className="dg">
      <figcaption className="dg__title">Service boundaries</figcaption>
      <div className="dg-hub">
        <div className="dg-node"><strong>React SPA</strong><span>28 routes · Vite</span></div>
        <div className="dg-hub__arrow" aria-hidden="true">→</div>
        <div className="dg-node dg-node--core"><strong>Node / Express gateway</strong><span>the only public backend · sessions · zod · rate limits</span></div>
        <div className="dg-hub__arrow" aria-hidden="true">→</div>
        <ul className="dg-hub__spokes">{spokes.map((s) => <li key={s.label} className={s.tone ? `dg-node dg-node--${s.tone}` : 'dg-node'}><strong>{s.label}</strong><span>{s.sub}</span></li>)}</ul>
      </div>
      <p className="dg__cap">Python and PHP bind to localhost and require a shared secret; only the gateway is exposed.</p>
    </figure>
  );
}

export default function Diagram({ id }: { id: string }) {
  switch (id) {
    case 'echo-pipeline':
      return <EchoPipeline />;
    case 'echo-loop':
      return <Flow title="One turn of the Warden" caption="The game loop never waits: a slow, broken or missing model only means the environment reacts later or a scripted move is used." steps={[
        { label: 'Game loop', sub: '60 fps, deterministic' },
        { label: 'Snapshot', sub: '~400 tokens + 512×288 JPEG' },
        { label: 'Scheduler', sub: 'single-flight · ≥ 2.5 s gap · 6 s timeout' },
        { label: 'Director', sub: 'Ollama · Mock · Scripted, behind a circuit breaker', tone: 'model' },
        { label: 'Rules engine', sub: '9 stages → accept / amend / veto / fallback', tone: 'rules' },
        { label: 'Queue → world', sub: 'max 3 · 6 s TTL · 1 action / 1.5 s' },
        { label: 'Mind panel', sub: 'what it saw, decided, and why' },
      ]} />;
    case 'fx-arch':
      return <FxArch />;
    case 'fx-board':
      return <FxBoard />;
    case 'mplads-flow':
      return <Flow title="From spreadsheets to a human decision" caption="Scoring is a batch job; the dashboard only reads stored scores and explanations." steps={[
        { label: 'Public MPLADS sheets', sub: 'allocations, works, payments' },
        { label: 'Normalise', sub: 'district from agency string, FY from work ID' },
        { label: 'Peer baselines', sub: 'median by (work type, state)' },
        { label: '5 signals', sub: 'cost · vendor · timing · z-score · duplicates', tone: 'rules' },
        { label: 'Explanations', sub: 'a sentence + figures per signal' },
        { label: 'MP roll-up', sub: 'spend-weighted + underspend penalty' },
        { label: 'FastAPI → dashboard', sub: 'SQLAlchemy · Next.js' },
        { label: 'Human review', sub: 'flags prompt investigation, not verdicts', tone: 'human' },
      ]} />;
    default:
      return null;
  }
}
