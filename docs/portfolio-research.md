# Portfolio research dossier: Tejas Joshi

Researched on 19 Oct 2026, using public sources only.

**Labels used throughout**

- **[V] Verified.** Seen directly in a public source (linked).
- **[U] User-provided, unverified.** Stated in the brief, but no public evidence was found.
- **[?] Unknown.** Needs an answer from Tejas.

**Research method and limits**

- **GitHub.** Read through the public REST API and raw files: profile, all 12 public repos, READMEs, file trees, contributor counts, recent commit history, and selected source files.
- **LinkedIn.** `linkedin.com/in/tejas-joshi-cs/` redirects to a sign-in wall in the browser. **No LinkedIn data was read.** I did not sign in.
- **Live demos.** Opened in the in-app browser.
- **Code.** I did not clone or run any project. Test counts and eval numbers below are *as reported in the READMEs*. I have not re-run them.

---

## 1. Verified profile information

| Fact | Status | Source |
|---|---|---|
| GitHub account `Tejas966`, display name "Tejas Joshi", created Feb 2025, 12 public repos | V | https://api.github.com/users/Tejas966 |
| Full name "Tejas Vivek Joshi" | V | QuickPay README (student info table) |
| Enrolled in a BITSoM programme; student ID prefix `bitsom_ftai_` suggests a FinTech + AI course | V (programme name inferred) | QuickPay README; Capstone README ("Capstone Project — BITSoM") |
| Third-year B.Tech Computer Engineering | V | FundamentalX README: "Third-Year B.Tech Computer Engineering" course project |
| College / university name | ? | Not found anywhere public |
| Location: India | U (consistent with projects: NSE/BSE, MPLADS, Nashik Bus API) | — |
| Public email `tejasjoshi966@gmail.com` | V | `Tejas966/tejas966` profile README; also the git account email |
| LinkedIn URL | **Conflict** | Brief: `/in/tejas-joshi-cs/`. GitHub profile README and old site: `/in/tejas-joshi-0a677a327` |
| Previous portfolio at `tejas966.github.io` (static HTML, "Coming soon" projects, one blog post dated 31 Jan 2025) | V | https://tejas966.github.io (HTTP 200) |
| Hackathon win with an AI horror game | U | No public record found; the Echo README only says it was built for a challenge |

## 2. Project inventory

### 2.1 The Room That Fights Back ("Echo"): strongest candidate
Repo: https://github.com/Tejas966/Echo (TypeScript; 15 commits, all on 6 Oct 2026)

1. **Problem.** Let a small local LLM act as a game master with real power over the game, without being able to make the game unwinnable or unpleasant.
2. **Users.** Hackathon judges and players.
3. **Contribution.** README: "Built solo in one day for the 'Gemma as the Brain of a Game or Physical World' challenge" [V as a claim in the repo]. Commit trailers show co-authoring by AI coding agents (Claude, Google Antigravity) [V].
4. **Tech [V].**
   - TypeScript, Vite, Canvas 2D (fully procedural art) and Web Audio (synthesised sound).
   - Ollama running **`gemma4:e2b`**, verified in the README and `docs/01-approach-and-architecture.md`. `e4b` is optional.
   - Browser SpeechSynthesis for the Warden's voice.
5. **Implementation [V].**
   - A deterministic 60 fps loop that never waits on the model.
   - The snapshot builder sends about 400 tokens of text plus a 512×288 JPEG "director view".
   - Single-flight scheduler: at least 2.5 s between calls, 6 s timeout.
   - Three directors (Ollama, mock, scripted) behind a circuit breaker.
   - Rules pipeline: `PARSE → SCHEMA → TARGET → CONTENT → STALE → COOLDOWN → BUDGET → SOLVABILITY → MERCY`.
   - 12-action vocabulary.
   - The JSON Schema is rebuilt per call and leaves out the actions the rules would reject (constrained decoding).
   - Solvability check: replays the puzzle dependency graph to a fixed point and checks that `escaped` is still reachable.
   - "Mind panel" (TAB) showing what the model saw, decided and why, plus the rules verdict.
6. **Most interesting decision.** "Gemma proposes, the rules dispose." The rules also *shape decoding*: infeasible actions are removed from the schema before the call. A second one: the model chooses *when* to give a hint, never *what* the hint says.
7. **Status.** Playable and runs locally (needs Ollama plus a GPU). There's no hosted demo.
8. **Evidence [V as reported in the README].**
   - Rules eval: 56/56 pass.
   - Real-Gemma eval: 72 calls, 100% valid JSON, 77.8% appropriate actions, 0 unsafe actions after rules, p50/p95 latency 569/1384 ms on an RTX 4050 (6 GB).
   - Archetype simulations.
   - Lessons recorded in the README: `think:false` is required, the model mode-collapses, and vision is sensitive to prompt layout.
   - Screenshots: none in the repo, because all art is procedural. **Media would have to be captured by running the game locally.**
9. **Why feature it.** It's the most distinctive project, the one that is solo by its own account, and it has real measurements and honest lessons. It also embodies the through-line identified in §5.

### 2.2 FundamentalX (repo: `Stock-Screener-project`)
Repo: https://github.com/Tejas966/Stock-Screener-project (JS/Python/PHP; 6 commits on 14 Oct 2026, **all authored as "Claude"**)

1. **Problem.** Ratio-heavy finance portals hide how metrics are calculated and don't flag misleading values, such as P/E on a loss or growth from a negative base.
2. **Users.** Students and beginner investors.
3. **Contribution.** A third-year Web Technology course project [V]. Solo or team: ? The commit authorship suggests heavy AI-agent generation; how Tejas directed and verified it: ?
4. **Tech [V].**
   - React 19 + Vite + Recharts.
   - Node/Express 5 gateway with zod, helmet, bcrypt and server-side sessions.
   - PHP 8.3 persistence service (PDO).
   - Python FastAPI + pandas/NumPy calculation engine.
   - MySQL 8.
   - Google Gemini via `@google/genai` (default `gemini-2.5-flash`), with structured JSON output.
5. **Implementation [V].**
   - A provider abstraction: the demo dataset or FMP.
   - A normaliser for crore→rupee conversion and the capex sign.
   - Every metric carries a status: `calculated | reported | unavailable | not_meaningful`, plus a reason.
   - Data-quality checks.
   - Gemini only sees a deterministic fact sheet. A grounding check lists any number in the AI text that isn't in the facts.
   - A rule-based fallback summary when Gemini is unavailable.
   - 28 routes.
   - 162 tests reported passing.
6. **Interesting decision.** It refuses to zero-fill or invent data, and the AI is constrained to calculated facts and checked for ungrounded numbers.
7. **Status.** Works locally in demo mode. **All figures in demo mode are illustrative, generated data.** The FMP live provider is "implemented but not verified live". A live Gemini response was never produced because there was no API key (README §10).
8. **Evidence.** README, docs and test suites. No hosted demo, no screenshots. *Update (22 Oct 2026):* Tejas supplied a screenshot of the home page running locally in demo mode (banner: "all prices and financial figures are illustrative"). It is used on the site.
9. **Important correction to the brief.** The brief describes "DCF valuation, CAPM, discount rates". **FundamentalX contains no DCF or CAPM** (no matches in the README; it covers P/E, P/B, EV/EBITDA, ROE, ROCE, CAGR, D/E, FCF and similar). DCF, CAPM and WACC appear in the **BITSoM capstone** instead (§2.4). Either there's another, unpublished screener repo, or the two were merged in memory. **This needs confirmation.**

### 2.3 MPLADS AI Risk Intelligence (Smart India Hackathon 2026, PS SIH26102)
Repo: https://github.com/Tejas966/MPLADS-AI-Risk-Intelligence- (Next.js/TS + Python; Tejas: 16 of 18 commits; two other contributors with 1 each)

1. **Problem.** Thousands of MPLADS works make it hard to spot anomalous cost, vendor concentration or payment-timing patterns by hand.
2. **Users.** MoSPI, district authorities and auditors (the intended users).
3. **Contribution.** The team is "Team Vanguard" [V]. `docs/team-responsibilities.md` lists roles but not names. Tejas's exact role: ? (the commit share suggests he was the main integrator).
4. **Tech [V].**
   - Next.js 15 / React 19 / Tailwind.
   - FastAPI + SQLAlchemy 2.0.
   - SQLite/PostgreSQL (Supabase-compatible).
   - pandas, NumPy, SciPy and scikit-learn listed.
   - India state/district GeoJSON map.
5. **Implementation [V per SYSTEM_DOCUMENTATION.md].**
   - Peer buckets of `(work_type, state)`, using the median expenditure ratio.
   - HHI vendor concentration and a bill-splitting detector.
   - Payment-timing lags.
   - Transaction z-scores and duplicate clusters.
   - A composite 0–100 score per work, rolled up per MP (expenditure-weighted) with an underspend penalty.
   - A plain-language explanation per signal.
   - Built on public MPLADS spreadsheets (xlsx in the repo); documentation states 8,868 works and 542 MPs.
   - **Update (22 Oct 2026, from Tejas, with a dashboard screenshot):** the current version scores **11,956 projects across 775 MPs** (543 Lok Sabha + 232 Rajya Sabha, 36 states and UTs). It flags 1,355 as high priority for audit (score ≥ 40, 462 MP portfolios) and 10,042 timing or schedule outliers. The site now uses these figures. The dashboard is branded **SATARKAI**. These numbers come from the screenshot, not from the public repo, which still documents 8,868 / 542.
   - Code check (later in Phase 4): `ai/risk_scoring/work_scorer.py` implements all five signals using Python's standard-library `statistics` module plus SQLAlchemy. pandas, NumPy and SciPy appear only in `demo_ai_pipeline.py`, so the site lists them accordingly.
6. **Interesting decision.** Every point of the score maps to a formula and a sentence. The disclaimer that "a risk score does not constitute proof of fraud" is built into the product.
7. **Status.** A hackathon prototype. Hackathon result: ?
8. **Evidence.**
   - Source and docs.
   - `frontend/public/slide_assets/dashboard.png` and `dossier.png` (real UI screenshots).
   - **The live demo `mplads-ai-risk-intelligence.vercel.app` returns 404**: a dead link, don't publish it.
9. **Why feature it.** Real public data, explainable statistics, and responsible framing.
   - Note: the `docs/` describe some features as roadmap items (sentence-transformers similarity, delay prediction). Only the statistical signals in SYSTEM_DOCUMENTATION should be presented as implemented.

### 2.4 Paytm FinTech Analytics & AI Advisory (BITSoM capstone)
Repo: https://github.com/Tejas966/Capstone-Project--Paytm-FinTech-Analytics-AI-Platform (Python; 16 commits, all Tejas)

- **Part 1: payments.** Synthetic payments data, a SQLite schema, 9 fraud SQL queries, ledger↔gateway reconciliation, a dashboard and an Excel workbook.
- **Part 2: credit risk.** Leak-free preprocessing (transformers fit on train only), logistic regression vs decision tree (AUC 0.716 vs 0.634), risk-based pricing tiers, IsolationForest anomalies.
- **Part 3: AI advisory.** A Think→Act→Observe advisory agent, CAPM expected returns, portfolio variance, escalation to a human advisor above 20% σ, a bull/bear/synthesiser debate, and a DCF (FCFF, WACC via CAPM, Gordon terminal value, 3×3 sensitivity).
- **Status [V].** Graded coursework. All data is synthetic and the LLM runs in MOCK mode by default. Present it as coursework, not a product.

### 2.5 Smaller work (supporting evidence only)

| Repo | What it is | Use |
|---|---|---|
| QuickPay_FinTech_Operations_Case_Study | Graded assignment: cleaning, SQL, reconciliation, JSON normalisation, Looker Studio | "Also built" line at most |
| DBMS-miniproject | Flask 3 + MySQL "Nashik Bus API" (auth, routes, bcrypt) | Supports Flask/MySQL in the skills list |
| Test | `assignment3.c` | Supports C; not portfolio material |
| FinTech-hackathon-Demo, Team-Vanguard11---26251 | Empty | Omit |

## 3. Verified technologies (with evidence)

- **Languages:** Python, TypeScript, JavaScript, SQL, PHP, C. **C++: U**, no public C++ code found.
- **Backend:** FastAPI, Flask, Node/Express, PHP/PDO, SQLAlchemy, REST API design, session auth.
- **Data and ML:** pandas, NumPy, SciPy, scikit-learn (logistic regression, decision tree, IsolationForest), statistical anomaly detection (z-score, HHI).
- **AI:**
  - Ollama with Gemma 4: local inference, structured outputs, multimodal input.
  - Gemini API: structured JSON output, grounding checks.
  - Agent-style loops (Think/Act/Observe, multi-agent debate in mock mode).
  - LLM eval harnesses.
- **Frontend:** React, Next.js, Vite, Tailwind, Canvas 2D, Web Audio.
- **Databases:** MySQL, SQLite, PostgreSQL/Supabase.
- **Tools:** Git, Vitest/pytest/PHPUnit, Docker Compose (present in the FundamentalX repo), AI coding agents.
- **LangGraph / LangChain: U.** It's mentioned only as "learning" in the profile README; no code found.

## 4. Potential achievements

| Achievement | Status |
|---|---|
| Built "The Room That Fights Back" solo in one day for a Gemma game challenge | V (repo claim) |
| **Won** a hackathon with it | **U**: need the event name, date, result and a link |
| Smart India Hackathon 2026 participant (Team Vanguard, SIH26102) | V (repo docs). Stage reached: ? |
| BITSoM FinTech/AI programme capstone | V (programme details ?) |

## 5. Positioning

The through-line across every substantial repo: **an AI model is allowed to act, but it has to answer to a deterministic system.**

| Project | How the model answers to the system |
|---|---|
| Echo | Gemma proposes, a rules engine vetoes |
| FundamentalX | Gemini may only explain calculated facts; ungrounded numbers are flagged |
| MPLADS | Statistical flags are explainable and explicitly "not proof" |
| Capstone | The advisory agent escalates high-risk portfolios to a human |

Candidate positioning lines:

1. "I build AI systems that have to answer to rules."
2. "Models propose. Systems decide."
3. "Computer engineering student building AI that can act, and engineering what it's allowed to do."

Recommended framing: an *AI and backend engineering* student whose distinctive skill is **guardrails, evaluation and honest data handling**. That's credible at his level and backed by evidence.

## 6. Recommended featured projects

1. **The Room That Fights Back.** Most original, solo, measured.
2. **FundamentalX.** The breadth of full-stack work, plus the AI grounding.
3. **MPLADS Risk Intelligence.** Real public data and explainable statistics.
4. *(Secondary)* **BITSoM capstone.** CAPM/DCF/agent coursework. It's what actually backs the "quant finance" interest.

## 7. Claims that must not be published without confirmation

- Any hackathon **win** or placement (Echo or SIH).
- DCF/CAPM as part of the stock screener.
- C++ and LangGraph experience.
- Team-lead role on MPLADS.
- That FundamentalX shows real market data or live AI output (it's demo data; live Gemini is unverified).
- The MPLADS live demo link (currently 404).
- College name, graduation year, internships (none found).
- Eval numbers presented as independently verified. Present them as "measured by the project's own eval suite".

## 8. Questions for Tejas (only the ones that change the site)

1. Which LinkedIn URL is correct: `tejas-joshi-cs` or `tejas-joshi-0a677a327`?
2. The hackathon win: which event, when, what result, and is there a public link (Devpost, Kaggle, post)?
3. MPLADS: what was your role, and how far did the team get in SIH? Will the Vercel demo come back?
4. The "DCF + CAPM + Gemini stock screener": is it FundamentalX plus the capstone, or a separate repo I haven't seen?
5. **AI-assisted development.** Several repos are co-authored by Claude or Antigravity agents. Do you want the site to say so openly? (Recommended: "I design the architecture and evals and direct AI coding agents." It's honest and fits the AI-engineering identity.)
6. A résumé PDF, and your college name and graduation year if you want them shown.

## Sources

- GitHub profile: https://github.com/Tejas966 · API: https://api.github.com/users/Tejas966
- Echo: https://github.com/Tejas966/Echo (README, `docs/01-approach-and-architecture.md`, `technology-and-gemma-workflow.md`, `src/rules/solvability.ts`, commit log)
- FundamentalX: https://github.com/Tejas966/Stock-Screener-project (README §1–15, commit log)
- MPLADS: https://github.com/Tejas966/MPLADS-AI-Risk-Intelligence- (README, `SYSTEM_DOCUMENTATION.md`, `docs/*`, contributors)
- Capstone: https://github.com/Tejas966/Capstone-Project--Paytm-FinTech-Analytics-AI-Platform (README, `dcf_calculator.py`, `advisory_agent.py`, part READMEs)
- QuickPay: https://github.com/Tejas966/QuickPay_FinTech_Operations_Case_Study
- DBMS: https://github.com/Tejas966/DBMS-miniproject (`app.py`, `requirements.txt`)
- Profile README: https://github.com/Tejas966/tejas966 · old site: https://tejas966.github.io
- LinkedIn: sign-in wall, not read.

## 9. Answers from Tejas (19 Oct 2026)

These are user-provided. They're now published on the site as Tejas's own statements.

| Question | Answer | Effect on the site |
|---|---|---|
| LinkedIn URL | `linkedin.com/in/tejas-joshi-cs/` is correct | Used everywhere. The GitHub profile README still links the old URL; update it there. |
| Hackathon win | **Hacktoberfest Nashik**: won with The Room That Fights Back | Winner shown on the Echo panel, the case study and the Record section. No public results link yet; add one if it exists. |
| Other hackathons | SIH 2026 (result pending), VIT × Odoo online hackathon, Hackathon at Modern College Pune (participant) | Listed in Record. Dates for VIT × Odoo and Modern College weren't given, so they're shown undated. |
| MPLADS role | **Team lead**; SIH result pending | Role set to "Team lead: architecture, FastAPI and integration", matching the Team Lead row in the repo's `docs/team-responsibilities.md`. The "to confirm" labels were removed. |
| MPLADS website | Tejas says it's public | **Still returns 404** at `mplads-ai-risk-intelligence.vercel.app`, the only URL in the repo, as rechecked today. The demo link is left off until a working URL is provided. |
| MPLADS scale (22 Oct 2026) | **11,956 projects across 775 MPs** (543 Lok Sabha + 232 Rajya Sabha), shown in a current dashboard screenshot | Panel stats, case-study overview and alt text updated, replacing 8,868 works / 542 MPs. The screenshot replaced the old panel image and overview figure. Still not independently verifiable from the public repo. |
| DCF + CAPM | Part of the capstone for the **BITSoM × Masai School six-month online FinTech programme** | Capstone and programme described accordingly. FundamentalX stays described without DCF/CAPM. |
| AI coding agents | Say so openly | About paragraph and a toolkit entry added. The Echo role reads "built with AI coding agents". |
| Résumé | Not created yet | The résumé control was removed entirely (no placeholder button). |

Still open:

- ~~FundamentalX: solo or team?~~ Confirmed **solo** by Tejas (19 Oct 2026); the role now reads "Solo: all four services, built with AI coding agents".
- College name and graduation year: not shown.
