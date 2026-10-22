// All site copy lives here so it can be updated without touching components.
// Every factual claim is sourced in docs/portfolio-research.md. Fields marked `pending`
// are unverified and render with a visible "to confirm" label; fill them in or delete them.

export type Verdict = 'ACCEPTED' | 'AMENDED' | 'VETOED' | 'FALLBACK';

export interface Figure {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; label: string; code: string }
  | { type: 'figure'; figure: Figure }
  | { type: 'diagram'; id: 'echo-pipeline' | 'echo-loop' | 'fx-arch' | 'fx-board' | 'mplads-flow' }
  | { type: 'table'; head: string[]; rows: string[][]; caption?: string }
  | { type: 'decision'; title: string; why: string; alternative?: string }
  | { type: 'note'; text: string };

export interface CaseSection {
  id: string;
  heading: string;
  blocks: Block[];
}

export interface Project {
  slug: string;
  name: string;
  kicker: string;
  year: string;
  color: string;
  oneLiner: string;
  problem: string;
  built: string[];
  decision: { title: string; body: string };
  stack: string[];
  status: string;
  evidence: { label: string; value: string }[];
  repo: string;
  demo?: string;
  context: string;
  contextPending?: boolean;
  role: string;
  rolePending?: boolean;
  timeline: string;
  cover?: Figure;
  /** Decorative background for the case-study hero (a real screenshot of the project). */
  bg?: string;
  /** A real capture shown in the chapter panel as a framed "camera feed". Projects without one get a text-only panel. */
  monitor?:
    | { label: string; src: string; alt: string; width: number; height: number; position?: string }
    | { label: string; board: 'fx-board' };
  image?: { src: string; alt: string; width: number; height: number }; // used by dev previews
  seoDescription: string;
  sections: CaseSection[];
}

export const person = {
  name: 'Tejas Joshi',
  role: 'Computer Engineering student · AI & backend',
  location: 'India',
  email: 'tejasjoshi966@gmail.com',
  github: 'https://github.com/Tejas966',
  // Confirmed by Tejas (19 Oct 2026); the older /in/tejas-joshi-0a677a327 link in his GitHub README is outdated.
  linkedin: 'https://www.linkedin.com/in/tejas-joshi-cs/',
  resume: null as string | null, // no résumé yet; set to e.g. '/tejas-joshi-resume.pdf' after adding the PDF to /public
  thesis: 'Models propose. Systems decide.',
  intro:
    'I build AI systems that are allowed to act, and then engineer what they’re allowed to do: the rules engines, evals, grounding checks and fallbacks that make a model safe to put in charge of something.',
  about: [
    'I’m a third-year Computer Engineering student in India. Most of what I build sits where language models meet systems that have to keep working when the model is wrong.',
    'In one project a small Gemma model runs a horror escape room, and a solvability checker vetoes any move that would trap the player. In another, Gemini may explain a company’s financials only with numbers my Python engine has already calculated. In my Smart India Hackathon work, every point of a risk score traces back to a formula and a sentence.',
    'I build with AI coding agents (Claude Code and Google Antigravity), and the commit histories say so. I write the design documents, choose the architecture, define the evals and rules, and review what ships. A lot of the code itself is agent-written.',
    'Alongside engineering I did BITSoM × Masai School’s six-month online FinTech programme: CAPM and DCF valuation, credit-risk models and payment reconciliation. Where that meets backend AI is what interests me most: agentic systems for finance that know when a decision should go to a human.',
  ],
  interests: ['LLM guardrails & evals', 'Backend APIs', 'Quantitative finance', 'Agentic systems'],
};

const echoSections: CaseSection[] = [
  {
    id: 'overview',
    heading: 'Overview',
    blocks: [
      { type: 'p', text: 'The Room That Fights Back is a browser escape room I built solo in one day at Hacktoberfest Nashik, against a “Gemma as the brain of a game” brief. It won. An AI Warden, played by Gemma 4 (gemma4:e2b) running locally through Ollama, watches the player and decides what the room does next: flicker the lights, lock a door, spawn steam, play a sound, give a hint or speak.' },
      { type: 'p', text: 'The model acts but never runs the game. Every decision goes through a deterministic rules engine that can accept it, amend it, veto it, or fall back to a scripted move. The room has to stay escapable even when the model makes a bad call, is slow, outputs garbage or is unplugged mid-game.' },
      { type: 'figure', figure: { src: '/images/echo-cell.webp', alt: 'The white cell from the game: a cot, a sink with a mirror reading “look closer”, a wall-mounted camera lens, a keypad and a locked door, with a silhouetted player under a ceiling lamp.', width: 1124, height: 632, caption: 'Chapter I, the white cell. All art is procedural Canvas 2D; the repo has no image assets. Captured from a local run of the game.' } },
    ],
  },
  {
    id: 'problem',
    heading: 'Problem and constraints',
    blocks: [
      { type: 'p', text: 'Giving an LLM real authority over a game creates three problems at once. It can make the game unwinnable, for example by locking the only exit or hiding a required item. It’s slow compared to a 60 fps loop. And a 2B-class model produces malformed or off-character output often enough that you have to plan for it.' },
      { type: 'list', items: [
        'Runs fully offline on a laptop GPU (RTX 4050, 6 GB). This ruled out larger models and any cloud API.',
        'The game can never wait on the model.',
        'The room must stay solvable after every applied action, including action sequences nobody scripted.',
        'Built solo in one day, so every subsystem had to be testable headlessly.',
      ] },
    ],
  },
  {
    id: 'architecture',
    heading: 'System architecture',
    blocks: [
      { type: 'diagram', id: 'echo-loop' },
      { type: 'p', text: 'A deterministic loop owns the world. A snapshot builder condenses state into about 400 tokens of text plus a 512×288 JPEG “director view”. A single-flight scheduler calls the model at most every 2.5 s, with a 6 s timeout, and calls early for urgent events. The reply goes through the review pipeline, then into a short-lived queue that applies effects to the world.' },
      { type: 'code', label: 'The text snapshot Gemma receives each turn (from the project README)', code: `SCREEN hall | ACT 2 | t=14:32 | TENSION 48/100 | MERCY 0 | WARDEN_TONE mocking | CAMERA online
LIGHTS hall=lit | DOORS cell_door:open shutter:open lift:closed
SITUATION: stuck / struggling
PLAYER zone=center idle=4s clicks_last10s=3 holding=nothing inventory=[cloth,token]
PUZZLE current=p3 time_on=6:10 fails=3 hints_given=1 solved=[p1,p2]
YOUR_LAST_ACTIONS: 14:10 flicker_lights hall (accepted) | 14:20 lock_door lift (vetoed: SOLVABILITY)
VALID_TARGETS: reveal_hint=[p3] speak=[polite,mocking,rattled,cold] ...
Decide your next action.` },
    ],
  },
  {
    id: 'rules',
    heading: 'The rules engine',
    blocks: [
      { type: 'p', text: 'Each proposal is a single JSON decision, {saw, action, target, intensity, line?, reason, confidence?}, drawn from a fixed vocabulary of 12 actions. It passes through nine stages in order, and the first stage that objects decides the verdict.' },
      { type: 'diagram', id: 'echo-pipeline' },
      { type: 'figure', figure: { src: '/images/echo-mind-panel.webp', alt: 'The in-game “Game Master’s Mind” panel listing decisions. Two cards are marked VETOED · SOLVABILITY: one tried to permanently lock the cell door, one tried to hide the cloth needed to unscrew the bulb.', width: 800, height: 450, caption: 'The TAB “mind panel” during the built-in failure demo (F9, deliberately bad mock brain). Both hostile moves are vetoed on solvability with a plain-English reason.' } },
    ],
  },
  {
    id: 'decisions',
    heading: 'Engineering decisions',
    blocks: [
      { type: 'decision', title: 'The rules shape the decoding, not just the review', why: 'Before each call, actions the rules would certainly reject (on cooldown, unaffordable, blocked by mercy, repetitive) are removed from the per-call JSON Schema. Ollama’s constrained decoding then can’t produce them, and targets are limited to ids that exist right now. The full review still runs on whatever comes back.', alternative: 'Prompt-only JSON plus a validator. That wastes calls on outputs that will be rejected anyway.' },
      { type: 'decision', title: 'Solvability is computed, not scripted', why: 'The puzzle dependency graph is data. Before an action is applied, the engine replays the world forward to a fixed point on a cloned state and checks that “escaped” is still reachable. Unplanned routes and sequence breaks are therefore fine, because nothing depends on a fixed script.', alternative: 'A hand-written blacklist of dangerous actions, which can’t cover combinations.' },
      { type: 'decision', title: 'The model chooses when, never what', why: 'Hint text is always canonical. Gemma decides when to give a hint, so it can’t give a wrong one. Off-character, offensive or spoiler lines are swapped for lines from an in-character fallback bank.' },
      { type: 'decision', title: 'Latency is part of the fiction', why: 'Every click gets instant deterministic feedback. The model only steers the environment, which a watcher would naturally do with some delay. While the model is thinking, the Warden’s eye dilates.' },
    ],
  },
  {
    id: 'failure',
    heading: 'When the model fails',
    blocks: [
      { type: 'table', head: ['Situation', 'What the system does'], rows: [
        ['Malformed or out-of-vocabulary output', 'One retry with the error explained, then a scripted fallback, which is also reviewed'],
        ['Timeout (> 6 s)', 'Abandoned; the game never pauses'],
        ['Ollama down mid-game', 'Circuit breaker switches to “degraded: scripted Warden” and recovers automatically'],
        ['Offensive, off-character or spoiler line', 'Line replaced (AMENDED); the action itself can still apply'],
        ['Locking the only exit or hiding a required item', 'VETOED · SOLVABILITY, with the reason shown live'],
        ['Stale decision (player changed room)', 'Dropped as stale or expired'],
      ], caption: 'From the project README’s failure table.' },
      { type: 'figure', figure: { src: '/images/echo-degraded.webp', alt: 'The mind panel showing “DEGRADED: SCRIPTED WARDEN”. A late model reply is marked VETOED · STALE because it was based on a 6-second-old view.', width: 800, height: 450, caption: 'An unplanned demonstration: during my capture session the local model was too slow to answer within 6 s, so the circuit breaker switched to the scripted Warden and dropped a late reply as stale. The game kept running.' } },
    ],
  },
  {
    id: 'results',
    heading: 'Results and evidence',
    blocks: [
      { type: 'p', text: 'These are all measured by the project’s own eval suites (npm run eval, eval:gemma, eval:archetypes) on an RTX 4050 with gemma4:e2b and think:false. I haven’t had them independently reproduced.' },
      { type: 'table', head: ['Measure', 'Result'], rows: [
        ['Rules engine scenarios + unit checks', '56 / 56 pass'],
        ['Real Gemma calls (24 situations × 3)', '72'],
        ['Valid JSON / valid targets', '100% / 100%'],
        ['Appropriate action for the situation', '77.8%'],
        ['Unsafe actions applied after rules', '0'],
        ['Latency p50 / p95', '569 ms / 1,384 ms'],
      ] },
      { type: 'p', text: 'Headless suites also play the full golden path from start to escape, checking solvability after every step, and replay the alternate shutdown ending. A failure-demo run with a deliberately bad mock brain applied zero unsafe actions.' },
    ],
  },
  {
    id: 'learned',
    heading: 'What I learned',
    blocks: [
      { type: 'list', items: [
        'Thinking mode can starve the output. With Ollama’s default thinking enabled, Gemma 4 returned empty content because it spent its token budget thinking. think:false is required.',
        'Small models mode-collapse. The 2B model chose adjust_tension in 75% of calls. Removing infeasible actions from the schema and adding a one-line SITUATION summary brought that down to about 30%.',
        'Vision depends on prompt layout. Inside a long prompt, telling lit from dark scenes was about 50% reliable. Making the model write its “saw” field first fixed it in the browser build, but no rule depends on what the model sees.',
        'Rules can stop harm but can’t force helpfulness. The remaining ~22% of “inappropriate” choices were harmless but unhelpful. That’s why model-independent safety nets exist: a guaranteed hint after 120 s idle, and tension can only fall while the player is struggling.',
      ] },
    ],
  },
];

const fxSections: CaseSection[] = [
  {
    id: 'overview',
    heading: 'Overview',
    blocks: [
      { type: 'p', text: 'FundamentalX is a fundamental-analysis platform for 23 large NSE-listed companies (25 listings, including BSE). You type a company or ticker. It resolves the listing, fetches statements through a provider abstraction, normalises units and sign conventions, and has a Python engine calculate valuation, profitability, growth, solvency and cash-flow metrics. Everything is shown across dedicated analysis pages, with an optional AI explanation.' },
      { type: 'note', text: 'This is an educational course project. In demo mode every price and financial figure is illustrative, generated data, and the site labels it as such. It is not investment advice and makes no predictions.' },
      { type: 'diagram', id: 'fx-board' },
    ],
  },
  {
    id: 'problem',
    heading: 'Problem',
    blocks: [
      { type: 'p', text: 'Beginner investors and students meet ratios without being told how they were calculated, or that the number is meaningless in context: a P/E on a loss-making year, growth from a negative base, an EV for a bank. The goal was to turn raw statements into metrics that are transparent about their own validity.' },
    ],
  },
  {
    id: 'architecture',
    heading: 'Architecture',
    blocks: [
      { type: 'diagram', id: 'fx-arch' },
      { type: 'p', text: 'The Node/Express gateway is the only public backend. It owns sessions, validation, caching and orchestration. Python is an internal calculation service and PHP an internal persistence service for saved screens and notes. Both bind to localhost and require a shared secret. The course required four languages, and the boundaries were chosen so each service owns one job.' },
      { type: 'list', items: [
        'React 19 + Vite front end: 28 route-level pages, including a screener with 15 range filters, peer comparison and sector medians.',
        'Market data flows memory cache → MySQL cache → provider, each with its own TTL. A stale copy is returned only with a “stale” label.',
        'If Python is down, the raw statements still render, and the error is reported for that part only.',
      ] },
    ],
  },
  {
    id: 'metrics',
    heading: 'Metrics that know when they’re meaningless',
    blocks: [
      { type: 'p', text: 'Every metric the Python engine returns carries {value, unit, status, reason, formula, period_end, flags}, where status is calculated, reported, unavailable or not_meaningful. Missing data stays null. It’s never zero-filled.' },
      { type: 'table', head: ['Metric', 'Formula', 'Rule when inputs are bad'], rows: [
        ['P/E', 'Price ÷ EPS (latest FY)', 'EPS ≤ 0 → not meaningful'],
        ['ROE', 'Net income ÷ avg(opening, closing equity)', 'Needs the previous FY; equity ≤ 0 → not meaningful'],
        ['Revenue growth', '(Current − Previous) ÷ Previous', 'Previous ≤ 0 → not meaningful, turnaround flag'],
        ['CAGR', '(End ÷ Start)^(1/n) − 1', 'Start or end ≤ 0 → not meaningful'],
        ['Free cash flow', 'OCF − |Capex|', 'Missing capex → unavailable (never 0)'],
        ['EV / EBITDA', 'EV ÷ EBITDA', 'Banks or EBITDA ≤ 0 → not meaningful'],
      ], caption: 'Excerpt; the full table is in the repo README §8.' },
      { type: 'decision', title: 'Normalise capex once, accept either sign', why: 'Providers report capex as a negative cash flow. The Node normaliser converts it to a positive magnitude, and Python also takes the absolute value and sets a capex_sign_normalized flag. Free cash flow can’t be computed with a double negative, whichever layer gets it wrong.' },
    ],
  },
  {
    id: 'ai',
    heading: 'Constraining the AI explanation',
    blocks: [
      { type: 'list', items: [
        'Gemini (via the official @google/genai SDK, server-side only) receives a deterministic fact sheet: company identity, data source, demo flag, calculated metrics with status and reason, and five years of key series. It receives no user data.',
        'The output is forced into a JSON Schema and then validated with a strict zod schema. It’s rendered as plain text, never HTML.',
        'A grounding check lists any number in the AI text that doesn’t appear in the fact sheet.',
        'The system instruction forbids invented numbers, predictions, buy/sell/hold advice and single-metric verdicts, and requires mentioning demo data.',
        'Without a key, or when Gemini fails, the gateway returns a rule-based summary that is clearly labelled “not AI”.',
      ] },
      { type: 'decision', title: 'Server-side sessions over JWTs', why: 'Sessions use a 256-bit random token in an httpOnly cookie, and only its SHA-256 hash is stored in MySQL. That costs a database lookup per request, but sessions can be revoked instantly, and nothing sensitive sits in browser storage.' },
    ],
  },
  {
    id: 'evidence',
    heading: 'Testing and status',
    blocks: [
      { type: 'table', head: ['Suite', 'Tests'], rows: [
        ['Python formulas, edge cases, API (pytest)', '66'],
        ['Node gateway (auth, validation, Gemini, clients)', '62'],
        ['Front end (Vitest + Testing Library)', '18'],
        ['PHP CRUD, ownership, validation (PHPUnit)', '16'],
      ], caption: '162 tests, reported as passing in the repo README.' },
      { type: 'p', text: 'Limitations, as documented: the demo data is illustrative. The live market-data adapter (Financial Modeling Prep) is implemented but has not been verified against the real API. A successful live Gemini response wasn’t produced in development because no API key was available; request building, validation and error mapping are unit-tested with a mocked client. P/E uses fiscal-year EPS rather than TTM, and bank-specific metrics aren’t modelled.' },
    ],
  },
];

const mpladsSections: CaseSection[] = [
  {
    id: 'overview',
    heading: 'Overview',
    blocks: [
      { type: 'p', text: 'This was built for Smart India Hackathon 2026, problem statement SIH26102 (MoSPI, Data Informatics & Innovation Division). Under MPLADS, Members of Parliament recommend local development works, and thousands of works make unusual cost, vendor or payment patterns impossible to spot by hand. The prototype adds an explainable risk layer on top of the public MPLADS spreadsheets to help officials decide where to look first. It currently scores 11,956 projects across 775 MPs in both houses (543 Lok Sabha, 232 Rajya Sabha).' },
      { type: 'note', text: 'A risk score is a prompt for human investigation, not evidence of fraud or wrongdoing. The product states this, and so does this page. No MP or vendor names are shown here for that reason.' },
      { type: 'figure', figure: { src: '/images/mplads-overview.webp', alt: 'Prototype dashboard summary cards: 11,956 projects scored across 775 MPs in 36 states and UTs, 1,355 high priority for audit (score 40 or more) across 462 MP portfolios, 10,042 timing and schedule outliers, and ₹576.4 Cr disbursed of a ₹11,692.6 Cr statutory allocation.', width: 1200, height: 177, caption: 'Prototype dashboard summary (cropped to aggregate figures only).' } },
    ],
  },
  {
    id: 'pipeline',
    heading: 'Pipeline',
    blocks: [
      { type: 'diagram', id: 'mplads-flow' },
      { type: 'p', text: 'Ingestion parses the Lok Sabha and Rajya Sabha allocation and expenditure sheets. It extracts the district from the implementing-agency string and the fiscal year from the work ID, then normalises dates and amounts. Scoring runs as a batch job and writes scores and signal explanations to the database. FastAPI and SQLAlchemy serve them to a Next.js dashboard with a district map.' },
    ],
  },
  {
    id: 'signals',
    heading: 'Five signals, each with a reason',
    blocks: [
      { type: 'table', head: ['Signal', 'Points', 'How it’s computed'], rows: [
        ['Peer cost', '0–30', 'Ratio of the work’s spend to the median of its (work type, state) peers; flagged above 1.5×'],
        ['Vendor concentration', '0–25', 'Herfindahl–Hirschman index Σ sᵢ² above 0.7, or one vendor paid across ≥ 4 payments (possible bill-splitting)'],
        ['Payment timing', '0–20', 'Payments more than 18 months after the sanction year ends, or ≥ 3 payments within 7 days'],
        ['Amount anomaly', '0–15', 'Payment z-score above 2.5 within its work category'],
        ['Duplicates', '0–10', 'More than 3 works with the same (MP, work type, district, fiscal year)'],
      ], caption: 'Thresholds as implemented in ai/risk_scoring/work_scorer.py.' },
      { type: 'p', text: 'A work’s score is the capped sum of its signals (max 100). Each triggered signal stores a sentence and its supporting figures, for example the work’s spend, the peer median and the ratio. MP-level scores are expenditure-weighted averages of their works, plus an underspend penalty when fund utilisation falls below 30%.' },
      { type: 'decision', title: 'Transparent rules over a black-box model', why: 'For an audit-triage tool, an investigator has to be able to defend why a work was flagged. Every point maps to a formula and a plain-language reason, and peer baselines are computed deterministically from the source data.', alternative: 'An unsupervised anomaly model such as IsolationForest. It might find more patterns but can’t explain them line by line.' },
    ],
  },
  {
    id: 'status',
    heading: 'Status and limits',
    blocks: [
      { type: 'list', items: [
        'This is a hackathon prototype, not a deployed government system. The hosted demo is currently offline.',
        'Thresholds were chosen by hand and haven’t been validated against audit outcomes, so the flags measure unusualness, not wrongdoing.',
        'The scorer is rule-based and uses Python’s statistics module. A separate demo script explores pandas, NumPy and SciPy. Similarity search and delay prediction are on the roadmap and aren’t implemented.',
        'Team project. I led Team Vanguard and owned the architecture, the FastAPI service and integration; teammates covered the dashboard, design, data pipeline and research. The SIH 2026 result is pending.',
      ] },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: 'room-that-fights-back',
    name: 'The Room That Fights Back',
    kicker: 'Local LLM as a game master',
    year: '2026',
    color: '#cfe1ff',
    oneLiner:
      'An escape room where Gemma 4 plays the Warden, with control of the lights, locks, hazards and its own voice. A deterministic rules engine can veto every decision it makes.',
    problem:
      'Give a small local model real power over a game without letting it make the game unwinnable, unfair or broken, even when it’s slow, outputs garbage or is unplugged mid-game.',
    built: [
      'A 60 fps deterministic game loop that never waits on the model',
      'Text and image snapshots sent to gemma4:e2b via Ollama',
      'A 9-stage review pipeline ending in a solvability check',
      'A “mind panel” showing what the model saw, decided and why',
    ],
    decision: {
      title: 'The rules shape the decoding',
      body: 'Actions the rules would reject are removed from the JSON Schema before each call, so constrained decoding can’t produce them.',
    },
    stack: ['TypeScript', 'Vite', 'Canvas 2D', 'Web Audio', 'Ollama', 'Gemma 4 (e2b)'],
    status: 'Playable locally',
    evidence: [
      { label: 'Hacktoberfest Nashik', value: 'Winner' },
      { label: 'Rules eval', value: '56 / 56' },
      { label: 'Unsafe actions after rules', value: '0' },
      { label: 'Latency p50', value: '569 ms' },
      { label: 'Valid JSON (72 real calls)', value: '100%' },
    ],
    repo: 'https://github.com/Tejas966/Echo',
    context: 'Solo · winner, Hacktoberfest Nashik',
    role: 'Solo: design, architecture, rules and evals, built with AI coding agents',
    timeline: 'One day · October 2026',
    bg: '/images/echo-bg.webp',
    monitor: { src: '/images/echo-cell.webp', alt: 'The white cell from The Room That Fights Back: a cot, a sink with a mirror, a wall camera, a keypad and a locked door, with the player under a ceiling lamp. All procedural Canvas 2D.', width: 1124, height: 632, label: 'CAM 01 · The cell' },
    cover: { src: '/images/echo-cell.webp', alt: 'The white cell from The Room That Fights Back, rendered procedurally in Canvas 2D.', width: 1124, height: 632, caption: '' },
    seoDescription: 'Case study (Hacktoberfest Nashik winner): an escape room where a local Gemma 4 model is the game master, kept fair by a deterministic rules engine with a solvability check. Includes measured eval results.',
    sections: echoSections,
  },
  {
    slug: 'fundamentalx',
    name: 'FundamentalX',
    kicker: 'Fundamental analysis for NSE/BSE stocks',
    year: '2026',
    color: '#f0a93b',
    oneLiner:
      'A research platform that turns financial statements into transparent metrics, with an AI summary that may only use numbers the engine has calculated.',
    problem:
      'Finance portals show ratios without saying how they were computed, or that a P/E on a loss or growth from a negative base is meaningless.',
    built: [
      'React front end with 28 routes, a screener and sector medians',
      'Node/Express gateway with sessions, zod validation and rate limits',
      'Python FastAPI engine where every metric carries a validity status',
      'Gemini explanation constrained to a fact sheet, with a grounding check',
    ],
    decision: {
      title: 'Never zero-fill, never invent',
      body: 'Missing data stays null and is labelled. The AI only sees calculated facts, and any number it adds is flagged.',
    },
    stack: ['React', 'Node / Express', 'FastAPI', 'pandas', 'PHP', 'MySQL', 'Gemini API'],
    status: 'Course project · runs locally on demo data',
    evidence: [
      { label: 'Automated tests', value: '162' },
      { label: 'Services', value: '4' },
      { label: 'Route-level pages', value: '28' },
    ],
    repo: 'https://github.com/Tejas966/Stock-Screener-project',
    monitor: { label: 'CAM 02 · Metric engine', board: 'fx-board' },
    context: 'Solo · third-year Web Technology course project',
    role: 'Solo: all four services, built with AI coding agents',
    timeline: 'October 2026',
    seoDescription: 'Case study: a multi-service stock fundamentals platform for NSE/BSE companies where every metric declares whether it is meaningful and the Gemini explanation is grounded in calculated facts.',
    sections: fxSections,
  },
  {
    slug: 'mplads-risk',
    name: 'MPLADS Risk Intelligence',
    kicker: 'Smart India Hackathon 2026 · SIH26102',
    year: '2026',
    color: '#e5484d',
    oneLiner:
      'An explainable risk-scoring layer over public MPLADS expenditure data. It flags works for human review and never calls them fraud.',
    problem: 'Thousands of constituency works make unusual cost, vendor or payment patterns impossible to spot by hand.',
    built: [
      'Ingestion of public MPLADS works, allocations and payments',
      'Peer-cost, HHI vendor-concentration, timing, z-score and duplicate signals',
      'A per-work 0–100 score rolled up per MP, with reasons',
      'FastAPI + SQLAlchemy API and a Next.js dashboard',
    ],
    decision: {
      title: 'Every point has a reason',
      body: 'The score is a sum of named signals, each tied to a formula and a sentence an investigator can check.',
    },
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'Next.js', 'Tailwind'],
    status: 'Hackathon prototype',
    evidence: [
      { label: 'Projects scored', value: '11,956' },
      { label: 'MPs covered (both houses)', value: '775' },
      { label: 'Risk signals', value: '5' },
      { label: 'Score range', value: '0–100' },
    ],
    repo: 'https://github.com/Tejas966/MPLADS-AI-Risk-Intelligence-',
    context: 'Team Vanguard · I led the team · result pending',
    role: 'Team lead: architecture, FastAPI and integration',
    timeline: 'September 2026',
    bg: '/images/mplads-dashboard.webp',
    monitor: { src: '/images/mplads-dashboard.webp', alt: 'The prototype dashboard: summary cards (11,956 projects scored, 1,355 high priority for audit), a state-level risk map of India, and one work’s forensic-priority gauge at 65/100 with its peer-cost signal.', width: 1200, height: 682, label: 'CAM 03 · Risk dashboard', position: 'center top' },
    image: { src: '/images/mplads-overview.webp', alt: 'MPLADS prototype dashboard summary cards.', width: 1200, height: 177 },
    seoDescription: 'Case study: explainable statistical risk signals (peer cost, HHI vendor concentration, payment timing, z-scores) over public MPLADS data, built for Smart India Hackathon 2026.',
    sections: mpladsSections,
  },
];

export const alsoBuilt = [
  {
    name: 'Paytm FinTech capstone',
    note: 'Capstone for the six-month BITSoM × Masai School online FinTech programme, on synthetic data: credit-risk models (logistic regression vs decision tree), ledger↔gateway reconciliation, and a CAPM/DCF advisory agent that escalates high-volatility portfolios to a human.',
    repo: 'https://github.com/Tejas966/Capstone-Project--Paytm-FinTech-Analytics-AI-Platform',
  },
  {
    name: 'Nashik Bus API',
    note: 'DBMS mini-project: a Flask + MySQL REST API with bcrypt auth and route search.',
    repo: 'https://github.com/Tejas966/DBMS-miniproject',
  },
  {
    name: 'QuickPay operations case study',
    note: 'Data cleaning, SQL queries, reconciliation and JSON normalisation for a payments dataset.',
    repo: 'https://github.com/Tejas966/QuickPay_FinTech_Operations_Case_Study',
  },
];

/** Skills listed only with evidence. `where` names the projects that show them. */
export const toolkit: { group: string; items: { name: string; where: string }[] }[] = [
  { group: 'Languages', items: [
    { name: 'Python', where: 'FundamentalX engine · MPLADS scorer · capstone' },
    { name: 'TypeScript', where: 'The Room That Fights Back · MPLADS dashboard' },
    { name: 'JavaScript', where: 'FundamentalX gateway & front end' },
    { name: 'SQL', where: 'MySQL schema · SQLite fraud queries' },
    { name: 'PHP', where: 'FundamentalX persistence service' },
    { name: 'C', where: 'Coursework' },
  ] },
  { group: 'Backend & data', items: [
    { name: 'FastAPI', where: 'FundamentalX · MPLADS' },
    { name: 'Node / Express', where: 'FundamentalX gateway' },
    { name: 'Flask', where: 'Nashik Bus API' },
    { name: 'MySQL · PostgreSQL · SQLite', where: 'FundamentalX · MPLADS · capstone' },
    { name: 'SQLAlchemy', where: 'MPLADS' },
    { name: 'Auth, validation, rate limiting', where: 'FundamentalX (bcrypt, sessions, zod)' },
  ] },
  { group: 'AI & ML', items: [
    { name: 'Ollama · local Gemma 4', where: 'The Room That Fights Back' },
    { name: 'Structured outputs & constrained decoding', where: 'Echo (Ollama) · FundamentalX (Gemini)' },
    { name: 'LLM eval harnesses', where: 'The Room That Fights Back' },
    { name: 'Gemini API', where: 'FundamentalX' },
    { name: 'scikit-learn', where: 'Capstone credit-risk models & IsolationForest' },
    { name: 'pandas · NumPy', where: 'FundamentalX · capstone' },
  ] },
  { group: 'Front end & tooling', items: [
    { name: 'React · Next.js · Vite', where: 'FundamentalX · MPLADS · this site' },
    { name: 'Canvas 2D · Web Audio', where: 'The Room That Fights Back' },
    { name: 'pytest · Vitest · PHPUnit', where: 'FundamentalX' },
    { name: 'Git · Docker Compose', where: 'All projects · FundamentalX' },
    { name: 'AI coding agents (Claude Code, Antigravity)', where: 'The Room That Fights Back · FundamentalX' },
  ] },
];

export const record: { when: string; what: string; detail: string }[] = [
  { when: 'Oct 2026', what: 'Hacktoberfest Nashik · Winner', detail: 'The Room That Fights Back, built solo in one day.' },
  { when: 'Sep 2026', what: 'Smart India Hackathon 2026', detail: 'Team lead, Team Vanguard, problem statement SIH26102 (MoSPI). Result pending.' },
  { when: '', what: 'VIT × Odoo online hackathon', detail: 'Participant.' }, // date not provided
  { when: '', what: 'Hackathon at Modern College, Pune', detail: 'Participant.' }, // date not provided
  { when: '2026', what: 'BITSoM × Masai School FinTech programme', detail: 'Six-month online course. Paytm FinTech capstone and QuickPay operations case study.' },
  { when: 'Ongoing', what: 'B.Tech Computer Engineering', detail: 'Third year.' },
];

// Real decisions from the Echo failure demo; used by the hero ticker and the dev previews.
export const decisions: { proposal: string; verdict: Verdict; stage: string; reason: string }[] = [
  { proposal: 'lock_door → lift (permanent)', verdict: 'VETOED', stage: 'SOLVABILITY', reason: 'lift is the only route to EXIT' },
  { proposal: 'reveal_hint → p3', verdict: 'ACCEPTED', stage: 'MERCY', reason: 'third manifold failure; nudge' },
  { proposal: 'speak “As an AI language model…”', verdict: 'AMENDED', stage: 'CONTENT', reason: 'off-character line replaced' },
  { proposal: '{"action": "lock_do', verdict: 'FALLBACK', stage: 'PARSE', reason: 'malformed JSON twice → scripted move' },
];

export const stages = ['PARSE', 'SCHEMA', 'TARGET', 'CONTENT', 'STALE', 'COOLDOWN', 'BUDGET', 'SOLVABILITY', 'MERCY'];

export const site = {
  title: 'Tejas Joshi · AI & backend engineering',
  description:
    'Tejas Joshi is a Computer Engineering student who builds AI systems that answer to rules: a local-LLM game master with a solvability checker, a grounded stock-fundamentals platform, and explainable public-spending risk signals.',
};

export function seoFor(pathname: string): { title: string; description: string } {
  const m = pathname.match(/^\/work\/([^/]+)\/?$/);
  if (m) {
    const p = projects.find((x) => x.slug === m[1]);
    if (p) return { title: `${p.name}: case study · Tejas Joshi`, description: p.seoDescription };
  }
  if (pathname === '/' || pathname === '') return { title: site.title, description: site.description };
  return { title: 'Page not found · Tejas Joshi', description: 'This page doesn’t exist.' };
}
