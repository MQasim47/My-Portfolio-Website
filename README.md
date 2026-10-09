# Muhammad Qasim — Portfolio

The source of my personal portfolio: a single-page site for a full-stack and mobile (Flutter) developer.
It shows the work I have shipped, the technology behind it, and how it gets into production.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · [`motion`](https://motion.dev) 12 · self-hosted variable fonts

## What's on the page

- **Hero** and **About**
- **Featured work**: three projects on a pinned horizontal track (Flacron GameZone, Unknot, Synthect). Phone apps show their screens in an operable device frame; the web platform uses a screenshot carousel with a lightbox.
- **More work**
- **Currently building**
- **What I build with**
- **Shipping record**: a table of what is in production, on which platform, and how it is delivered
- **Experience** and **Contact**

Everything degrades cleanly: with JavaScript off all content is visible, with `prefers-reduced-motion` the pinned track becomes a plain vertical stack, and light/dark follows the system (with a manual toggle).

## Run it

Requires Node 20+.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # next lint
```

To verify a production build while `npm run dev` is running (they would otherwise share `.next`):

```bash
NEXT_DIST_DIR=.next-verify npm run build && NEXT_DIST_DIR=.next-verify npm start
```

## Configuration

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The site's public URL, no trailing slash (e.g. `https://example.com`). Drives `metadataBase`, the canonical URL, Open Graph URLs, `sitemap.xml`, `robots.txt` and the JSON-LD. Defaults to `http://localhost:3000`. |

The contact form posts to a Formspree endpoint defined in `src/app/components/Contact.tsx`.

## Project layout

```
src/app/
  layout.tsx            fonts, metadata, theme bootstrap
  page.tsx              the page, in section order, plus Person JSON-LD
  opengraph-image.tsx   the link-preview card (rendered at build with next/og)
  sitemap.ts, robots.ts
  globals.css           design tokens and component CSS — the single source of truth
  components/           one file per section, plus the motion controllers
    ui/                 shared primitives (Section, MonoLabel, Pic, TerminalBlock, ...)
src/lib/site.ts         site identity (URL, title, social links) shared by metadata and JSON-LD
src/fonts/              Bodoni Moda, Hanken Grotesk, JetBrains Mono (SIL OFL); og/ holds static TTF
                        instances for the OG image renderer, which cannot read WOFF2
scripts/                image export scripts
public/                 favicon, resume, optimised images
```

Content is hard-coded in the section components (project copy is in `Projects.tsx`, `MoreWork.tsx` and `ShippingRecord.tsx`). There is no CMS.

## Design system

`globals.css` holds the tokens (palette, hairline, section rhythm); `tailwind.config.js` reads them via `var()`. Components never contain a literal colour. The palette is a champagne paper with ink and a single emerald accent, plus one dark register (`--terminal`, `--panel`, `--signal`) used only for the Shipping record.

## Images

Project imagery is served as AVIF with a WebP fallback, each file under 180 KB, through the `Pic` component (`src/app/components/ui/Pic.tsx`). The full-size originals are kept locally in `design-source/` (git-ignored) and re-encoded with:

```bash
node scripts/export-project-images.mjs     # project imagery -> public/images/projects/
node scripts/export-portrait.mjs           # hero portrait
```

To add a screenshot, drop the source into `design-source/projects/<project>/`, add a row to `JOBS` in the script, run it, and reference the output path without its extension.

## Deployment

See [DEPLOY.md](DEPLOY.md).
