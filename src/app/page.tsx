import { ArrowRight, Code2, GraduationCap, Handshake, Quote } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/site/Container';
import { CourseCard } from '@/components/site/CourseCard';
import { onBrandOutline, onBrandSolid } from '@/components/site/onBrand';
import { SectionHeading } from '@/components/site/SectionHeading';
import { buttonVariants } from '@/components/ui/button';
import { brand } from '@/lib/brand';
import { getLmsCatalog } from '@/lib/lms';
import { cn } from '@/lib/utils';
import { events, hubIntro, incubation, pillars, stats, testimonials } from '@/content/hub';
import { services } from '@/content/services';

export const metadata: Metadata = {
  title: { absolute: `${brand.name} — ${brand.motto}` },
  alternates: { canonical: '/' },
};

const pillarIcons = [GraduationCap, Code2, Handshake];

export default async function HomePage() {
  const catalog = await getLmsCatalog({ limit: 6 });
  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand text-brand-foreground">
        <Image
          src="/images/hero-awards.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-10 object-cover opacity-30"
        />
        <Container className="flex min-h-[70vh] flex-col items-start justify-center gap-6 py-20">
          <p className="font-heading text-sm font-semibold tracking-widest text-brand-muted-foreground uppercase">
            {brand.name}
          </p>
          <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight [text-wrap:balance] md:text-6xl">
            Engage. Innovate. Evolve.
          </h1>
          <p className="max-w-2xl text-lg text-brand-muted-foreground md:text-xl">{hubIntro}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/programs" className={cn(buttonVariants({ size: 'lg' }), onBrandSolid)}>
              Explore courses
            </Link>
            <Link
              href="/register"
              className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), onBrandOutline)}
            >
              Apply now
            </Link>
          </div>
        </Container>
      </section>

      <section aria-label="The hub in numbers" className="border-b bg-card">
        <Container className="grid gap-8 py-10 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="space-y-1">
              <p className="font-heading text-4xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section aria-labelledby="what-we-do" className="py-20">
        <Container className="space-y-10">
          <SectionHeading
            id="what-we-do"
            eyebrow="What we do"
            title="Skills, software and advice for Kaduna and beyond"
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = pillarIcons[i] ?? GraduationCap;
              return (
                <li key={p.title} className="space-y-3 rounded-xl border bg-card p-6">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-heading text-xl font-semibold">{p.title}</h3>
                  <p className="font-medium text-primary">{p.tagline}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="courses" className="bg-surface-panel py-20">
        <Container className="space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              id="courses"
              eyebrow="Training programs"
              title="Courses on KAD Learn"
              lead="Every KAD ICT Hub course lives on KAD Learn, our learning platform: see what each covers and register for the next intake."
            />
            <Link href="/programs" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              All programs <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          {catalog.status === 'ok' && catalog.courses.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {catalog.courses.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <CourseCard course={c} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">
              Browse every course on{' '}
              <a
                href={catalog.catalogUrl}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                KAD Learn
              </a>
              .
            </p>
          )}
        </Container>
      </section>

      <section aria-labelledby="services" className="py-20">
        <Container className="space-y-10">
          <SectionHeading
            id="services"
            eyebrow="Our services"
            title="What the public and private sector outsource to us"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-xl border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-accent/40 focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <s.icon className="size-7 text-primary" aria-hidden="true" />
                  <h3 className="font-heading text-lg font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more{' '}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="incubation" className="bg-brand py-20 text-brand-foreground">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5">
            <p className="font-heading text-sm font-semibold tracking-widest text-brand-muted-foreground uppercase">
              Startups
            </p>
            <h2 id="incubation" className="font-heading text-3xl font-bold">
              Startup incubation and acceleration
            </h2>
            <p className="leading-relaxed text-brand-muted-foreground">{incubation}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/startups" className={cn(buttonVariants({ size: 'lg' }), onBrandSolid)}>
                Meet our startups
              </Link>
              <Link
                href="/services/incubation-acceleration"
                className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), onBrandOutline)}
              >
                Apply for incubation
              </Link>
            </div>
          </div>
          <Image
            src="/images/incubation-collage.png"
            alt="Startup founders and winners at KAD ICT Hub events"
            width={900}
            height={1600}
            sizes="(min-width: 1024px) 400px, 80vw"
            className="mx-auto h-auto max-h-[560px] w-auto"
          />
        </Container>
      </section>

      <section aria-labelledby="events" className="py-20">
        <Container className="space-y-10">
          <SectionHeading
            id="events"
            eyebrow="Events"
            title="Challenges, festivals and hackathons"
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {events.map((e) => (
              <li key={e.slug}>
                <Link
                  href={e.href}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={e.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <p className="text-xs font-medium text-muted-foreground uppercase">{e.when}</p>
                    <h3 className="font-heading text-lg font-semibold">{e.title}</h3>
                    <p className="text-sm text-muted-foreground">{e.summary}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="testimonials" className="bg-surface-panel py-20">
        <Container className="space-y-10">
          <SectionHeading
            id="testimonials"
            eyebrow="Testimonials"
            title="What our partners say"
            align="center"
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name}>
                <figure className="flex h-full flex-col gap-5 rounded-xl border bg-card p-6">
                  <Quote className="size-6 text-primary" aria-hidden="true" />
                  <blockquote className="flex-1 leading-relaxed">“{t.quote}”</blockquote>
                  <figcaption className="flex items-center gap-3">
                    <Image
                      src={t.image}
                      alt=""
                      width={48}
                      height={48}
                      className="size-12 rounded-full object-cover"
                    />
                    <span>
                      <span className="block font-semibold">{t.name}</span>
                      <span className="block text-sm text-muted-foreground">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
