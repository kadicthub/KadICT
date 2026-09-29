import { Eye, Target } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/site/Container';
import { PageHero } from '@/components/site/PageHero';
import { SectionHeading } from '@/components/site/SectionHeading';
import { buttonVariants } from '@/components/ui/button';
import { history, mission, stats, vision } from '@/content/hub';

export const metadata: Metadata = {
  title: 'About us',
  description: history,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Kaduna State’s innovation hub"
        image="/images/training-room.jpg"
      />
      <section aria-labelledby="history" className="py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Image
            src="/images/hub-building.jpg"
            alt="The KAD ICT Hub building on Kanta Road, Kaduna"
            width={1280}
            height={960}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="h-auto w-full rounded-xl"
          />
          <div className="space-y-5">
            <SectionHeading id="history" eyebrow="Our history" title="History of KAD ICT Hub" />
            <p className="leading-relaxed text-muted-foreground">{history}</p>
            <dl className="grid gap-4 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-lg border bg-card p-4">
                  <dt className="text-xs text-muted-foreground">{s.label}</dt>
                  <dd className="font-heading text-2xl font-bold text-primary">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>
      <section aria-label="Mission and vision" className="bg-surface-panel py-16">
        <Container className="grid gap-6 md:grid-cols-2">
          {[
            { icon: Target, title: 'Our mission', body: mission },
            { icon: Eye, title: 'Our vision', body: vision },
          ].map((b) => (
            <article
              key={b.title}
              data-reveal
              data-spotlight
              className="space-y-3 rounded-xl border bg-card p-8"
            >
              <b.icon className="size-7 text-primary" aria-hidden="true" />
              <h2 className="font-heading text-2xl font-semibold">{b.title}</h2>
              <p className="leading-relaxed text-muted-foreground">{b.body}</p>
            </article>
          ))}
        </Container>
      </section>
      <section className="py-16">
        <Container className="flex flex-col items-start justify-between gap-4 rounded-2xl border bg-accent p-8 text-accent-foreground md:flex-row md:items-center">
          <div className="space-y-1">
            <h2 className="font-heading text-xl font-semibold">Work or learn with us</h2>
            <p>Train with us, bring us your project, or grow your startup at the hub.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/programs" className={buttonVariants({ size: 'lg' })}>
              Training programs
            </Link>
            <Link href="/contact" className={buttonVariants({ size: 'lg', variant: 'outline' })}>
              Contact us
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
