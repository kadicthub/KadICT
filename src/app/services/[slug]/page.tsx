import { ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/site/Container';
import { PageHero } from '@/components/site/PageHero';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getService, services } from '@/content/services';

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({
  params,
}: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="space-y-4">
      <h2 className="font-heading text-2xl font-semibold">{title}</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ServicePage({ params }: PageProps<'/services/[slug]'>) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const isTraining = service.slug === 'training';
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={service.title}
        lead={service.description}
        image="/images/staircase.jpg"
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-semibold">Overview</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{service.overview}</p>
          </section>
          <List title="Key features" items={service.features} />
          <List title="Benefits" items={service.benefits} />
          {service.showcase && (
            <section className="space-y-3">
              <h2 className="font-heading text-2xl font-semibold">Showcase</h2>
              <a
                href={service.showcase.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline"
              >
                {service.showcase.label} <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </section>
          )}
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-4 rounded-xl border bg-card p-6">
            <h2 className="font-heading text-lg font-semibold">Get started</h2>
            <p className="text-sm text-muted-foreground">
              {isTraining
                ? 'Browse our courses and register for the next intake.'
                : 'Tell us about your project and we will get back to you.'}
            </p>
            <Link
              href={isTraining ? '/programs' : '/contact'}
              className={cn(buttonVariants({ size: 'lg' }), 'w-full')}
            >
              {isTraining ? 'See our courses' : 'Contact us'}
            </Link>
          </div>
          <nav aria-label="All services" className="rounded-xl border bg-card p-6">
            <h2 className="mb-3 font-heading text-lg font-semibold">All services</h2>
            <ul className="space-y-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    aria-current={s.slug === service.slug ? 'page' : undefined}
                    className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-accent aria-[current=page]:bg-accent aria-[current=page]:font-semibold aria-[current=page]:text-accent-foreground"
                  >
                    <s.icon className="size-4 text-primary" aria-hidden="true" />
                    {s.title}
                    {s.slug === service.slug && (
                      <ArrowRight className="ml-auto size-4" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </Container>
    </>
  );
}
