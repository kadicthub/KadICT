import Image from 'next/image';
import { TechBackdrop } from '@/components/brand/TechBackdrop';
import { Container } from './Container';

/**
 * The navy band that opens every inner page: a photo of the hub under the
 * brand colour, the page title and an optional lead paragraph and actions.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand text-brand-foreground">
      <Image
        src={image}
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover opacity-20"
      />
      <TechBackdrop />
      <Container className="flex flex-col items-start gap-4 py-16 md:py-24">
        {eyebrow && (
          <p className="font-heading text-sm font-semibold tracking-widest text-brand-muted-foreground uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-gradient-brand font-heading text-4xl font-bold tracking-tight [text-wrap:balance] md:text-5xl">
          {title}
        </h1>
        {lead && <p className="max-w-2xl text-lg text-brand-muted-foreground">{lead}</p>}
        {children}
      </Container>
    </section>
  );
}
