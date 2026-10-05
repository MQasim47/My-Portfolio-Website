# Open questions

Decisions already made (from Phase 0 review) are applied in code and not repeated here.

## Needs an answer before the related work ships

### Technology claims still to verify
- [ ] **Riverpod** — dropped from the UI for now. Used in any project? (previously claimed on the Flutter expense app / M Hassan Traders)
- [ ] **YouTube API / "AI Analysis"** on Flacron GameZone — dropped from the UI for now. Actually used? Keep per project only if yes.
- [ ] **TypeScript** on GameZone — kept (production list), but the resume lists only Next.js and Node.js for it. Correct?
- [ ] **REST APIs** — kept in Skills (Backend) and not on your keep/drop lists. Keep?
- [ ] **Tailwind CSS** — kept in Skills (Frontend); not on your lists. Keep?
- [ ] **Firestore under "Database"** and **Sqflite under "Mobile"/"Database"** — placed in Skills. Fine?

### Projects
- [ ] **Synthect repo URL.** Candidate found under MQasim47: `Synnthect-an-offline-first-AI-powered-document-intelligence-app-` (note the double "n"). `docuai` might also be related. Which is it? **Not published yet** — the Source Code button is hidden until you confirm. The repo name says "offline-first"; should the card say so?
- [ ] **Synthect** needs screenshots (currently shows a "Screenshots coming soon" graphic) and an optional store/demo link.
- [ ] **M Hassan Traders screenshots.** The existing `public/images/projects/flutter-expense/*` images — are they M Hassan Traders screens? The GitHub repo description also mentions multi-item invoicing and local notifications; the resume says push notifications. Which wording is true?
- [ ] **Flacron GameZone hosting.** The old site claimed Azure; the resume says Render. Where does it actually run? (Needed for the Shipping Record.)
- [ ] **GameZone source repo.** `Flacron_Gamezone_Local` exists. Public to link? Currently no source link is shown.
- [ ] **SkillSwap vs SwapVarsity** — which name should the card use? Repo `skillswap-nextjs` exists; link it? No screenshots exist for it.
- [ ] **Archive / Flacron Auto Social** — links or repos to show? Descriptions currently minimal.

### Content
- [ ] **Experience role title.** Resume says "DevOps Engineer — Flacron Enterprise, 2025–Present"; that is what the site shows. Change to something broader (e.g. include full-stack)?
- [ ] **Experience bullets** are copied from the resume. Any additions?
- [ ] **Availability line.** Site now says "Open to internships, junior roles and project work" (from the resume). Confirm.
- [ ] **Location** is not stated anywhere (previously "Remote & Global"). What should it say?
- [ ] **Hero portrait** `public/images/hero-portrait.png` is 982 KB — will be re-encoded in Phase 4. Hero still uses `photo.jpeg` until then.
- [ ] **Resume** — updated PDF coming before launch (resume still says "Software Engineering Student ... DevOps Engineer").

## Deployment (blocks Phase 3)
- [ ] The site is local only. Target host for the portfolio? (Vercel assumed by the brief's `VERCEL_TOKEN` / deploy-status; confirm.) Database and R2 accounts needed for Phase 3.

## Shipping Record rows (Phase 6)
For each project: platform, delivery method, environment (Production / Staging / Internal / Coursework), month it went live.
- [ ] Flacron GameZone
- [ ] Synthect
- [ ] M Hassan Traders
- [ ] SkillSwap
- [ ] IBM Cloud (labelled Coursework) — which project/lab, and when?
- [ ] Azure App Service / AWS — which projects, if any?

## Contact form
- [ ] The form posts to Formspree (`mojygwvj`) to `aslamqasim126@gmail.com`. Delivery has **not** been tested end-to-end from here (a test would email you). Please submit one message and confirm it arrives.

## Phase 3 (visual build) additions
- [ ] **Hero meta column** says "Lahore, PK / Remote — UTC+5" (from your brief). Your resume/About say QUEST, Nawabshah — confirm Lahore is right.
- [ ] **"Read case study →"** is rendered as muted "Case study coming soon" on all three bands, because no case-study pages exist yet (a link would 404). It becomes the real link as soon as `caseStudyHref` is set per project.
- [ ] **`public/images/hero-portrait.png`** (982 KB) is no longer referenced (the AVIF/WebP versions are used). Delete it, or keep it as the source file?
- [ ] **Portrait asset:** the file was 1122×1402, not 464×1200. I cropped to the figure at 464:1200 and exported 580×1500. The cutout has small yellow/red fringe pixels along some edges (near the ears and arms) — worth a re-export of the cutout.
