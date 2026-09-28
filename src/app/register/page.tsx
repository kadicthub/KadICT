import { ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/site/Container';
import { PageHero } from '@/components/site/PageHero';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register for training at KAD ICT Hub, Kaduna.',
  alternates: { canonical: '/register' },
};

const FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSc013bOG-U1eOXkUGfvDtB5bkWJjrZ0P1CkrK7dgt5Q05m8Bw/viewform';

export default function RegisterPage() {
  return (
    <>
      <PageHero
        eyebrow="Register"
        title="Register for training"
        lead="Tell us which program you are interested in and we will contact you about the next intake, fees and payment options."
        image="/images/lab-in-session.jpg"
      />
      <Container className="max-w-3xl space-y-6 py-16">
        <p className="text-muted-foreground">
          Not sure which course is right for you? See{' '}
          <Link
            href="/programs"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            our training programs
          </Link>{' '}
          first. If the form below does not load,{' '}
          <a
            href={FORM}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
          >
            open it in a new tab <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
          .
        </p>
        <iframe
          src={`${FORM}?embedded=true`}
          title="KAD ICT Hub registration form"
          loading="lazy"
          className="h-[1600px] w-full rounded-xl border bg-card"
        >
          Loading…
        </iframe>
      </Container>
    </>
  );
}
