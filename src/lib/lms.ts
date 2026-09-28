import { z } from 'zod';
import { SITE_URLS } from './brand';

/**
 * KAD Learn (learn.kadhub.ng) is where the hub's courses live; this site lists
 * them from its public catalogue feed, `GET /api/public/catalog`.
 */
const courseSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  url: z.string().url(),
  coverUrl: z.string().url().nullable(),
  category: z.object({ name: z.string(), slug: z.string() }).nullable(),
  teacher: z.string(),
  price: z.object({
    kind: z.enum(['free', 'from', 'closed']),
    label: z.string(),
    kobo: z.number().optional(),
  }),
  nextCohort: z.object({ name: z.string(), startsAt: z.string() }).nullable(),
});

const responseSchema = z.object({
  data: z.object({ courses: z.array(courseSchema), total: z.number() }),
});

export type LmsCourse = z.infer<typeof courseSchema>;

export type LmsCatalog =
  | { status: 'ok'; courses: LmsCourse[]; total: number; catalogUrl: string }
  | { status: 'unavailable'; catalogUrl: string };

/** Seconds a catalogue response is reused before the page asks KAD Learn again. */
export const CATALOG_REVALIDATE = 300;

type Fetcher = (input: string, init?: RequestInit & { next?: object }) => Promise<Response>;

/**
 * The published KAD Learn courses, newest first. Never throws: if KAD Learn is
 * unreachable or answers with something unexpected, the caller gets
 * `unavailable` and links visitors to the catalogue instead of failing the page.
 */
export async function getLmsCatalog({
  limit = 24,
  fetcher = fetch,
}: { limit?: number; fetcher?: Fetcher } = {}): Promise<LmsCatalog> {
  const learn = new URL(SITE_URLS.learn);
  const catalogUrl = new URL('/courses', learn).toString();
  const unavailable = { status: 'unavailable', catalogUrl } as const;
  try {
    const res = await fetcher(new URL(`/api/public/catalog?limit=${limit}`, learn).toString(), {
      next: { revalidate: CATALOG_REVALIDATE, tags: ['lms-catalog'] },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return unavailable;
    const parsed = responseSchema.safeParse(await res.json());
    if (!parsed.success) return unavailable;
    const courses = parsed.data.data.courses
      // Only ever send visitors to KAD Learn itself.
      .filter((c) => new URL(c.url).hostname === learn.hostname)
      .map((c) => ({ ...c, coverUrl: isAllowedImage(c.coverUrl, learn) ? c.coverUrl : null }));
    return { status: 'ok', courses, total: parsed.data.data.total, catalogUrl };
  } catch {
    return unavailable;
  }
}

/** Matches `images.remotePatterns` in next.config.ts; anything else would fail to render. */
function isAllowedImage(url: string | null, learn: URL): url is string {
  if (!url) return false;
  const { protocol, hostname } = new URL(url);
  return (
    (protocol === learn.protocol && hostname === learn.hostname) ||
    (protocol === 'https:' && hostname.endsWith('.public.blob.vercel-storage.com'))
  );
}
