import type { MetadataRoute } from 'next';
import { SITE_URLS } from '@/lib/brand';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', SITE_URLS.hub).toString(),
  };
}
