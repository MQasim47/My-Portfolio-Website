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
- [ ] **SkillSwap** now lives in Currently building (status: In development). Its tech list is intentionally empty until you give the new stack; no live URL or GitHub link until you confirm them (a repo `skillswap-nextjs` exists — link it?). Name: SkillSwap or SwapVarsity?
- [ ] **Archive / Flacron Auto Social** — links or repos to show? Descriptions currently minimal.

### Content
- [x] Experience role is now "Full-Stack & Mobile Developer" (building leads, deployment supports).
- [ ] **Experience bullets** are copied from the resume. Any additions?
- [ ] **Availability line.** Site now says "Open to internships, junior roles and project work" (from the resume). Confirm.
- [ ] **Location** is not stated anywhere (previously "Remote & Global"). What should it say?
- [ ] **Hero portrait** `public/images/hero-portrait.png` is 982 KB — will be re-encoded in Phase 4. Hero still uses `photo.jpeg` until then.
- [ ] **Resume PDF is now inconsistent with the site** (`public/resume.pdf`, served by the Resume buttons): it still says "DevOps Engineer" in the headline, the summary ("contributing as a DevOps engineer at Flacron") and the Experience entry ("DevOps Engineer — Flacron Enterprise"), lists IBM Cloud, and describes Skill Swap as Next.js · Node.js · SQL · React. Updated PDF still to come.

## Deployment (blocks Phase 3)
- [ ] The site is local only. Target host for the portfolio? (Vercel assumed by the brief's `VERCEL_TOKEN` / deploy-status; confirm.) Database and R2 accounts needed for Phase 3.

## Shipping Record rows (Phase 6)
For each project: platform, delivery method, environment (Production / Staging / Internal / Coursework), month it went live.
- [ ] Flacron GameZone
- [ ] Synthect
- [ ] M Hassan Traders
- [ ] SkillSwap (move to Currently building; no deployment yet)
- [ ] IBM Cloud (labelled Coursework) — which project/lab, and when?
- [ ] Azure App Service / AWS — which projects, if any?

## Contact form
- [ ] The form posts to Formspree (`mojygwvj`) to `aslamqasim126@gmail.com`. Delivery has **not** been tested end-to-end from here (a test would email you). Please submit one message and confirm it arrives.

## Phase 3 (visual build) additions
- [x] Location corrected to "Nawabshah, PK" (Remote — UTC+5 unchanged).
- [ ] **"Read case study →"** is rendered as muted "Case study coming soon" on all three bands, because no case-study pages exist yet (a link would 404). It becomes the real link as soon as `caseStudyHref` is set per project.
- [ ] **`public/images/hero-portrait.png`** (982 KB) is no longer referenced (the AVIF/WebP versions are used). Delete it, or keep it as the source file?
- [ ] **Portrait asset:** the file was 1122×1402, not 464×1200. I cropped to the figure at 464:1200 and exported 580×1500. The cutout has small yellow/red fringe pixels along some edges (near the ears and arms) — worth a re-export of the cutout.

## Phase 3b (fixes) additions
- [x] New portrait (504x991) received and exported (AVIF 33 KB / WebP 52 KB). The figure now bleeds off the bottom edge at every breakpoint, so the floating cut edge is gone.
- [ ] **Dark-theme colours I had to invent** (the brief had none): `--warn #D9962B` and `--fail #E0705F` (lifted for contrast on dark). `--accent-deep` and `--accent-wash` in dark are derived with color-mix from `--signal`, `--paper-inv` and `--terminal`.

## Phase 6 additions

### Shipping record — "Since" months (the column renders, cells are empty)
Fill these in `src/app/components/ShippingRecord.tsx` (`since: ''`).
- [ ] Flacron GameZone on Azure — month it went live?
- [ ] Flacron GameZone on AWS ECS — month?
- [ ] Flacron Enterprises on Azure App Service — month? (which Flacron Enterprises site is this? the row says only "Flacron Enterprises")
- [ ] Unknot on GitHub Pages — month? (the first tagged release / first Pages deploy)

### Projects
- [x] **Synthect source URL.** Confirmed and enabled: `https://github.com/MQasim47/Synnthect-an-offline-first-AI-powered-document-intelligence-app-` (double "n" is the real repo name).
- [ ] **The Synthect poster says "SYNTHET"** (no "c") in its large headline and logo lockup. The band is named Synthect. Regenerate the poster with the right spelling before launch, or tell me to hide the poster and lead with the app screens.
- [ ] **M Hassan Traders poster** has "Case Study" and "Portfolio Showcase" pills baked into the artwork, which look like buttons but are not. Fine to keep, or re-export without them.
- [ ] **Synthect screenshots**: the source folder has image-1…6 and image-8 (no image-7). I used all seven in order. Intended?
- [ ] **GameZone mobile app**: the description now says only that you built it. Link or store listing to show?
- [ ] **Flacron GameZone hosting** is now shown as BOTH Azure (CI/CD on merge) and AWS ECS (Docker, own deployment), per your list. The earlier question (Azure vs Render) is superseded; confirm that both are live in production.

### Launch
- [ ] **Production URL** for `NEXT_PUBLIC_SITE_URL` (see DEPLOY.md). Until it is set, OG/canonical/sitemap point at `http://localhost:3000`.
- [ ] **Favicon** is `public/favicon.svg` (MQ mark). There is no `.ico` or Apple touch icon; add PNGs if you want the iOS home-screen icon.
