import type { NextConfig } from 'next';

const LEARN_URL = process.env.NEXT_PUBLIC_LEARN_URL || 'https://learn.kadhub.ng';
const learn = new URL(LEARN_URL);

/**
 * Programs used to live on this site at /programs/<slug>; they are KAD Learn
 * courses now. Slugs that changed in the move are mapped here, and every other
 * /programs/<slug> is forwarded by src/app/programs/[slug]/page.tsx.
 */
const RENAMED_PROGRAMS: Record<string, string> = {
  'data-analysis': 'data-analytics',
  'graphics-design': 'graphic-design',
  programming: 'software-engineering',
  'mobile-phone-repairs': 'artificial-intelligence',
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: learn.protocol === 'http:' ? 'http' : 'https', hostname: learn.hostname },
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  async redirects() {
    return [
      ...Object.entries(RENAMED_PROGRAMS).map(([from, to]) => ({
        source: `/programs/${from}`,
        destination: `${LEARN_URL}/courses/${to}`,
        permanent: true,
      })),
      // Template pages the old site shipped with placeholder content.
      { source: '/blog', destination: '/events', permanent: true },
      { source: '/blog-details', destination: '/events', permanent: true },
      { source: '/portfolio-details', destination: '/services', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
