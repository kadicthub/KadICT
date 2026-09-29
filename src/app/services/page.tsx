import { ArrowRight, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/site/Container';
import { PageHero } from '@/components/site/PageHero';
import { SectionHeading } from '@/components/site/SectionHeading';
import { services } from '@/content/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'ERP systems, training, software testing, blockchain, startup incubation, big data and cybersecurity from KAD ICT Hub.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="A wide range of remote and on-site services"
        lead="An outsourcing partner for the public and private sector’s technology needs."
        image="/images/staircase.jpg"
      />
      <section aria-label="Services" className="py-16">
        <Container>
          <ul data-reveal-stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  data-spotlight
                  className="group flex h-full flex-col gap-3 rounded-xl border bg-card p-6 focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <s.icon className="size-7 text-primary" aria-hidden="true" />
                  <h2 className="font-heading text-lg font-semibold">{s.title}</h2>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section aria-labelledby="featured" className="bg-surface-panel py-16">
        <Container className="space-y-8">
          <SectionHeading
            id="featured"
            eyebrow="Featured project"
            title="Automated Vehicle Registration Platform"
          />
          <div
            data-reveal
            data-spotlight
            className="grid items-center gap-8 overflow-hidden rounded-xl border bg-card md:grid-cols-[280px_1fr]"
          >
            <Image
              src="/images/kadvreg.jpg"
              alt="The KADVREG platform on a phone"
              width={900}
              height={1279}
              sizes="280px"
              className="h-full max-h-96 w-full object-cover object-top"
            />
            <div className="space-y-4 p-6 md:pl-0">
              <p className="leading-relaxed text-muted-foreground">
                We are proud to have developed the first fully automated vehicle registration
                platform in Nigeria for the Kaduna State Internal Revenue Service (KADIRS).
              </p>
              <a
                href="https://kadvreg.net/index.php"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline"
              >
                Visit KADVREG <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
