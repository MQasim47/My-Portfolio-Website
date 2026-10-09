# Deploying to Vercel

Nothing here has been run for you. It is the exact sequence to follow.

## Before you deploy (in the repo)

1. Open `QUESTIONS.md` → **Phase 6 additions** and settle what you want live on day one. The ones that show on the page:
   - Synthect poster misspells the name as "SYNTHET" — fix the artwork or hide the poster.
   - The Synthect "Source code" link renders disabled until you confirm its repo URL.
   - The Shipping record "Since" column is empty until you fill in the months.
2. `public/resume.pdf` still says "DevOps Engineer" and lists IBM Cloud. The Resume buttons serve it. Replace it before launch if you do not want it contradicting the site.
3. Make sure the work is on the branch you will deploy (below) and that these pass locally:
   ```bash
   npm run lint
   npm run build
   ```

## 1. Which branch

Deploy **`main`** as the production branch.

The work currently lives on `redesign/phase-6-content`. Either:

- **Recommended:** open a pull request from `redesign/phase-6-content` into `main`, let CI (`.github/workflows/ci.yml`: lint + build) go green, merge it. Vercel's production branch is `main` by default.
- Or, to look at it first, import the repo and let Vercel build `redesign/phase-6-content` as a **Preview** deployment (every non-production branch gets one). Merge to `main` when you are happy.

## 2. Create the project

1. <https://vercel.com/new> → import the GitHub repo.
2. Framework preset: **Next.js** (auto-detected). Leave build command (`next build`), output directory and install command at their defaults. Node.js version: **20.x** (Project Settings → General → Node.js Version).
3. Root directory: the repo root.
4. Before you click **Deploy**, add the environment variable below.

## 3. Environment variables

| Name | Value | Environments |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | The site's final public URL, **with `https://` and no trailing slash** | Production (and Preview if you want previews to self-reference) |

That is the only variable the site reads. (The contact form's Formspree endpoint is in the source.)

### What to put in `NEXT_PUBLIC_SITE_URL`

- **Custom domain** (best): `https://yourdomain.com`. Use the exact host people will land on. If you serve `www`, use `https://www.yourdomain.com` and redirect the apex to it (or the other way round) so there is one canonical host.
- **No domain yet**: deploy once, copy the production URL Vercel assigns (Project → Domains, e.g. `https://my-portfolio-xxxx.vercel.app`), set it as the variable, then **redeploy**.

This variable is inlined at build time (it starts with `NEXT_PUBLIC_`). Changing it does nothing until you trigger a new deployment (Deployments → ⋯ → Redeploy; untick "Use existing build cache").

It feeds the canonical URL, `og:url`, the OG image URL, `sitemap.xml`, `robots.txt` and the JSON-LD `url`. If it is unset, all of those say `http://localhost:3000`, which is wrong for sharing.

## 4. Deploy

Click **Deploy**. Expect a build of roughly a minute. The OG image is generated during the build, so a build error mentioning `opengraph-image` means the font files in `src/fonts/og/` are missing from the commit.

## 5. Add the domain (if you have one)

Project → Settings → Domains → add it and follow the DNS instructions. Then make sure `NEXT_PUBLIC_SITE_URL` matches it and redeploy.

## 6. What to check after the first deploy

Replace `$SITE` with your URL.

1. **Page loads** on desktop and a real phone, light and dark. Scroll the whole page; the featured track should pin and release on desktop and stack on mobile.
2. **View source** of `$SITE/` and look for:
   - `<link rel="canonical" href="$SITE/">`
   - `og:image` pointing at `$SITE/opengraph-image?...` (not localhost)
   - the `application/ld+json` block with `sameAs` for GitHub and LinkedIn
3. **`$SITE/opengraph-image`** opens as a 1200×630 champagne card with your name and "Full-Stack & Mobile Developer".
4. **`$SITE/robots.txt`** shows `Sitemap: $SITE/sitemap.xml`, and **`$SITE/sitemap.xml`** lists `$SITE/`.
5. **Link previews.** Paste the URL into WhatsApp and LinkedIn. Both cache aggressively, so if a preview is wrong or blank after you fixed something, force a refresh:
   - LinkedIn: <https://www.linkedin.com/post-inspector/>
   - Facebook/WhatsApp: <https://developers.facebook.com/tools/debug/>
6. **Structured data**: <https://search.google.com/test/rich-results> or <https://validator.schema.org/> on the URL — a `Person` should parse with no errors.
7. **Favicon** shows in the tab (the MQ mark).
8. **Links that leave the site**: Unknot "Try it in your browser", APK and Source; flacrongamezone.com; the Resume buttons.
9. **Contact form**: send one message and confirm it arrives (it has never been tested end to end).
10. **Images** come back as AVIF in the Network tab (type `avif`) on a modern browser, and nothing is over 180 KB.
11. **Search Console** (optional but worth it): add the property, submit `$SITE/sitemap.xml`.

## Rolling back

Deployments → pick the previous good deployment → ⋯ → **Promote to Production**. No rebuild needed.
