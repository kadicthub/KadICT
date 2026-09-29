import { ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/site/Container';
import { PageHero } from '@/components/site/PageHero';
import { buttonVariants } from '@/components/ui/button';
import { incubation, startups } from '@/content/hub';

export const metadata: Metadata = {
  title: 'Incubated startups',
  description: 'Startups incubated and accelerated by KAD ICT Hub.',
  alternates: { canonical: '/startups' },
};

export default function StartupsPage() {
  return (
    <>
      <PageHero
        eyebrow="Startups"
        title="Major startups incubated by KAD ICT Hub"
        lead={incubation}
        image="/images/gallery/challenge-1.jpg"
      />
      <section aria-label="Startups" className="py-16">
        <Container className="space-y-10">
          <ul data-reveal-stagger className="grid gap-6 md:grid-cols-3">
            {startups.map((s) => (
              <li
                key={s.name}
                data-spotlight
                className="flex flex-col overflow-hidden rounded-xl border bg-card"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center bg-card p-6">
                  <Image
                    src={s.logo}
                    alt={`${s.name} logo`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 border-t p-5">
                  <h2 className="font-heading text-lg font-semibold">{s.name}</h2>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                  <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    {s.website && (
                      <li>
                        <a
                          href={s.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
                        >
                          Website <ExternalLink className="size-3.5" aria-hidden="true" />
                        </a>
                      </li>
                    )}
                    {s.links.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border bg-accent p-8 text-accent-foreground md:flex-row md:items-center">
            <div className="space-y-1">
              <h2 className="font-heading text-xl font-semibold">Building a startup?</h2>
              <p>Mentorship, funding opportunities, workspace and access to industry experts.</p>
            </div>
            <Link
              href="/services/incubation-acceleration"
              className={buttonVariants({ size: 'lg' })}
            >
              Incubation and acceleration
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
