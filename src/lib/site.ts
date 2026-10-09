// One place for the site's identity: metadata, sitemap, robots, JSON-LD and the OG image read it.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
export const SITE_NAME = 'Muhammad Qasim';
export const SITE_TITLE = 'Muhammad Qasim — Full-Stack & Mobile Developer';
export const SITE_DESCRIPTION =
  'Full-stack and Flutter mobile developer in Pakistan. I build web applications and mobile apps and ship them to production — Next.js, Node.js, Flutter, AWS.';
export const THEME_COLOR = '#F6EAD4';
export const SOCIAL = {
  github: 'https://github.com/MQasim47',
  linkedin: 'https://www.linkedin.com/in/rao-qasim-005821248/',
} as const;
