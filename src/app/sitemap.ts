import type { MetadataRoute } from 'next';
import { SITE_URLS } from '@/lib/brand';
import { services } from '@/content/services';

const PAGES = [
  '/',
  '/about',
  '/services',
  '/programs',
  '/startups',
  '/events',
  '/kad55hack',
  '/stemfest',
  '/challenge',
  '/contact',
  '/register',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, SITE_URLS.hub).toString();
  return [...PAGES, ...services.map((s) => `/services/${s.slug}`)].map((path) => ({
    url: url(path),
    changeFrequency: path === '/programs' ? 'daily' : 'monthly',
    priority: path === '/' ? 1 : path === '/programs' ? 0.9 : 0.6,
  }));
}
