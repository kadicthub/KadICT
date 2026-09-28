import { describe, expect, it, vi } from 'vitest';
import { getLmsCatalog } from '@/lib/lms';

const course = (over: Record<string, unknown> = {}) => ({
  slug: 'data-analytics',
  title: 'Data Analytics',
  summary: 'Turn raw data into decisions.',
  url: 'https://learn.kadhub.ng/courses/data-analytics',
  coverUrl: 'https://learn.kadhub.ng/course-covers/data-analytics.jpg',
  category: { name: 'Data & Analytics', slug: 'data-analytics' },
  teacher: 'KAD ICT Hub',
  price: { kind: 'closed', label: 'Next intake to be announced' },
  nextCohort: null,
  ...over,
});

const respond = (body: unknown, status = 200) =>
  vi.fn(async () => new Response(JSON.stringify(body), { status }));

describe('getLmsCatalog', () => {
  it('asks KAD Learn for its public catalogue and returns the courses', async () => {
    const fetcher = respond({ data: { courses: [course()], total: 1, catalogUrl: 'x' } });
    const out = await getLmsCatalog({ limit: 6, fetcher });
    expect(fetcher).toHaveBeenCalledWith(
      'https://learn.kadhub.ng/api/public/catalog?limit=6',
      expect.objectContaining({ next: { revalidate: 300, tags: ['lms-catalog'] } }),
    );
    expect(out).toEqual({
      status: 'ok',
      courses: [course()],
      total: 1,
      catalogUrl: 'https://learn.kadhub.ng/courses',
    });
  });

  it('drops courses that link off KAD Learn and covers it cannot render', async () => {
    const fetcher = respond({
      data: {
        courses: [
          course({ slug: 'elsewhere', url: 'https://evil.example/courses/x' }),
          course({ slug: 'odd-cover', coverUrl: 'https://img.example/x.jpg' }),
          course({ slug: 'blob', coverUrl: 'https://abc.public.blob.vercel-storage.com/c.jpg' }),
        ],
        total: 3,
      },
    });
    const out = await getLmsCatalog({ fetcher });
    if (out.status !== 'ok') throw new Error('expected ok');
    expect(out.courses.map((c) => [c.slug, c.coverUrl])).toEqual([
      ['odd-cover', null],
      ['blob', 'https://abc.public.blob.vercel-storage.com/c.jpg'],
    ]);
  });

  it.each([
    ['an error status', respond({ error: { code: 'MAINTENANCE' } }, 503)],
    ['an unexpected body', respond({ data: { courses: [{ slug: 1 }] } })],
    [
      'a network failure',
      vi.fn(async () => {
        throw new TypeError('fetch failed');
      }),
    ],
  ])('reports the catalogue unavailable on %s', async (_, fetcher) => {
    expect(await getLmsCatalog({ fetcher })).toEqual({
      status: 'unavailable',
      catalogUrl: 'https://learn.kadhub.ng/courses',
    });
  });
});
