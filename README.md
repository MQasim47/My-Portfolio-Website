# Muhammad Qasim — Portfolio

Personal portfolio: full-stack and Flutter mobile engineer.

**Stack:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Configuration

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for metadata (`metadataBase`). Defaults to `http://localhost:3000`. |

The contact form posts to a Formspree endpoint defined in `src/app/components/Contact.tsx`.
Submissions are delivered to the email address configured in that Formspree form.

## Content

Content is currently hardcoded in the components under `src/app/components/`.
Static assets live in `public/` (project screenshots in `public/images/projects/`, resume at `public/resume.pdf`).

## Status

This repository is being rebuilt in phases (see `QUESTIONS.md` for open items).
The site is not yet deployed; it currently runs locally.
