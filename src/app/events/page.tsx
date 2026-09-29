import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/site/Container';
import { PageHero } from '@/components/site/PageHero';
import { events } from '@/content/hub';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Hackathons, the STEM and Creativity Festival and the Kaduna State Innovation Challenge.',
  alternates: { canonical: '/events' },
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Challenges, festivals and hackathons"
        image="/images/gallery/challenge-4.jpg"
      />
      <section aria-label="Events" className="py-16">
        <Container>
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <li key={e.slug}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card focus-within:ring-3 focus-within:ring-ring/50">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={e.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <p className="text-xs font-medium text-muted-foreground uppercase">{e.when}</p>
                    <h2 className="font-heading text-xl font-semibold">
                      <Link
                        href={e.href}
                        className="outline-none after:absolute after:inset-0 after:content-['']"
                      >
                        {e.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-muted-foreground">{e.summary}</p>
                    <span className="mt-auto pt-2 text-sm font-medium text-primary">Read more</span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
