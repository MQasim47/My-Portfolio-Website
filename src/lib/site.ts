// One place for the site's identity: metadata, sitemap, robots, JSON-LD and the OG image read it.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
export const SITE_NAME = 'Muhammad Qasim';
export const SITE_TITLE = 'Muhammad Qasim | Full-stack & Mobile Engineer';
export const SITE_DESCRIPTION =
  'Full-stack and mobile engineer building web apps and Flutter mobile apps, and shipping them to production.';
export const SOCIAL = {
  github: 'https://github.com/MQasim47',
  linkedin: 'https://www.linkedin.com/in/rao-qasim-005821248/',
} as const;
