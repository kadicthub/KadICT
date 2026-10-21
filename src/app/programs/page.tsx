import { CalendarCheck, GraduationCap, MonitorPlay } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/site/Container';
import { CourseCard } from '@/components/site/CourseCard';
import { PageHero } from '@/components/site/PageHero';
import { SectionHeading } from '@/components/site/SectionHeading';
import { buttonVariants } from '@/components/ui/button';
import { contact } from '@/lib/brand';
import { getLmsCatalog, type LmsCourse } from '@/lib/lms';

export const metadata: Metadata = {
  title: 'Training programs',
  description:
    'Data analytics, cyber security, AI, UI/UX, web, software and mobile development, networking, digital literacy graphic design and digital marketing at KAD ICT Hub, Kaduna.',
  alternates: { canonical: '/programs' },
};

// The list comes from KAD Learn; re-read it at most every five minutes
// (CATALOG_REVALIDATE in src/lib/lms.ts; Next needs a literal here).
export const revalidate = 300;

const steps = [
  {
    icon: GraduationCap,
    title: 'Choose a course',
    body: 'Each course page on KAD Learn shows what you will learn, how long it runs and the class times.',
  },
  {
    icon: CalendarCheck,
    title: 'Join an intake',
    body: 'Enrol in an open intake on KAD Learn, or register your interest and we will contact you when the next one starts.',
  },
  {
    icon: MonitorPlay,
    title: 'Learn at the hub and online',
    body: 'Classes hold at the hub in Kaduna; your lessons, materials and progress stay on KAD Learn.',
  },
];

const digitalMarketingCourse: LmsCourse = {
  slug: 'digital-marketing',
  title: 'Digital Marketing',
  summary: 'Duration: 2 months.',
  url: '/register',
  coverUrl: '/images/computer-lab.jpg',
  category: { name: 'Marketing', slug: 'marketing' },
  teacher: 'KAD ICT Hub',
  price: { kind: 'from', label: '₦150,000', kobo: 15000000 },
  nextCohort: null,
};

export default async function ProgramsPage() {
  const catalog = await getLmsCatalog();
  const courses = [
    digitalMarketingCourse,
    ...(catalog.status === 'ok'
      ? catalog.courses.filter((course) => course.slug !== digitalMarketingCourse.slug)
      : []),
  ];
  return (
    <>
      <PageHero
        eyebrow="Training programs"
        title="Learn the skills Kaduna is building its future on"
        lead="Our programs run in morning and afternoon classes at the hub, with flexible payment options. Browse courses on KAD Learn or register your interest in Digital Marketing."
        image="/images/computer-lab.jpg"
      />
      <section aria-labelledby="courses" className="py-16">
        <Container className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="courses" title="Our courses" />
            <a
              href={catalog.catalogUrl}
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
            >
              Search the full catalogue on KAD Learn
            </a>
          </div>
          {courses.length > 0 ? (
            <ul data-reveal-stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c, i) => (
                <li key={c.slug}>
                  <CourseCard course={c} preload={i < 3} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border bg-card p-8 text-center">
              <p className="font-heading text-lg font-semibold">
                The course list could not be loaded just now.
              </p>
              <p className="mt-2 text-muted-foreground">
                Every course is on KAD Learn, and our team can help by email.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a href={catalog.catalogUrl} className={buttonVariants({ size: 'lg' })}>
                  Browse courses on KAD Learn
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className={buttonVariants({ size: 'lg', variant: 'outline' })}
                >
                  Email {contact.email}
                </a>
              </div>
            </div>
          )}
        </Container>
      </section>
      <section aria-labelledby="how" className="bg-surface-panel py-16">
        <Container className="space-y-8">
          <SectionHeading id="how" title="How it works" />
          <ol data-reveal-stagger className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li
                key={s.title}
                data-spotlight
                className="h-full space-y-3 rounded-xl border bg-card p-6"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <s.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-heading text-sm font-semibold text-muted-foreground">
                    Step {i + 1}
                  </span>
                </span>
                <h3 className="font-heading text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="text-muted-foreground">
            Questions about fees or schedules?{' '}
            <Link
              href="/contact"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Contact us
            </Link>{' '}
            or{' '}
            <Link
              href="/register"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              register your interest
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
