import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// A single-page site: one URL.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 }];
}
