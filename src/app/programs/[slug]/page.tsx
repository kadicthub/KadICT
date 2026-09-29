import { permanentRedirect } from 'next/navigation';
import { SITE_URLS } from '@/lib/brand';

/**
 * Programs moved to KAD Learn under the same slugs; renamed ones are mapped in
 * next.config.ts. Old links and search results land on the course there.
 */
export default async function ProgramRedirect({ params }: PageProps<'/programs/[slug]'>) {
  const { slug } = await params;
  permanentRedirect(new URL(`/courses/${encodeURIComponent(slug)}`, SITE_URLS.learn).toString());
}
