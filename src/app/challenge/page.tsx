import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/site/Container';
import { PageHero } from '@/components/site/PageHero';

export const metadata: Metadata = {
  title: 'Kaduna State Innovation Challenge 2023',
  description:
    'A state-wide competition that celebrates creativity and ingenuity. Photos from the 2023 challenge.',
  alternates: { canonical: '/challenge' },
};

const photos = Array.from({ length: 8 }, (_, i) => `/images/gallery/challenge-${i + 1}.jpg`);

export default function ChallengePage() {
  return (
    <>
      <PageHero
        eyebrow="Events · 2023"
        title="Kaduna State Innovation Challenge"
        lead="A state-wide competition that celebrates creativity and ingenuity. Innovators compete against each other for prestigious awards and cash prizes, and the chance to make a lasting impact on their community and beyond."
        image="/images/gallery/challenge-6.jpg"
      />
      <section aria-label="Photo gallery" className="py-16">
        <Container>
          <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {photos.map((src, i) => (
              <li key={src}>
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[3/2] overflow-hidden rounded-lg focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Image
                    src={src}
                    alt={`Kaduna State Innovation Challenge 2023, photo ${i + 1} of ${photos.length}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
