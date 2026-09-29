import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from './Container';
import { PageHero } from './PageHero';

export function EventArticle({
  title,
  when,
  image,
  imageAlt,
  children,
}: {
  title: string;
  when: string;
  image: string;
  imageAlt: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={`Events · ${when}`} title={title} image={image} />
      <Container className="max-w-3xl space-y-8 py-16">
        <Image
          src={image}
          alt={imageAlt}
          width={1600}
          height={1000}
          sizes="(min-width: 768px) 720px, 100vw"
          className="h-auto w-full rounded-xl"
        />
        <div className="prose max-w-none dark:prose-invert prose-headings:font-heading prose-a:text-primary">
          {children}
        </div>
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> All events
        </Link>
      </Container>
    </>
  );
}
