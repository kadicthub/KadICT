'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { siteHref } from '@/lib/brand';
import { cn } from '@/lib/utils';
import type { Flyer } from '@/content/flyers';

const INTERVAL_MS = 4500;

/**
 * A slideshow of course flyers, each linking to its course on KAD Learn. It
 * advances on its own unless the visitor prefers reduced motion or is
 * pointing at or tabbing through it; arrows and dots move it by hand.
 */
export function FlyerCarousel({ flyers }: { flyers: Flyer[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const count = flyers.length;
  const go = (to: number) => setIndex(((to % count) + count) % count);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || count < 2) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reducedMotion, count]);

  const current = flyers[index];
  if (!current) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Course flyers"
      className="space-y-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <div className="relative mx-auto aspect-[720/932] h-[min(52dvh,520px)] overflow-hidden rounded-lg border bg-muted shadow-sm">
        <div
          className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {flyers.map((f, i) => (
            <div
              key={f.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${f.title}`}
              aria-hidden={i !== index}
              inert={i !== index}
              className="relative h-full w-full shrink-0"
            >
              <a
                href={siteHref('learn', `/courses/${f.slug}`, 'hub')}
                className="relative block h-full w-full focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
              >
                <Image
                  src={f.image}
                  alt={`${f.title} course flyer`}
                  fill
                  sizes="(min-width: 640px) 400px, 80vw"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="object-cover"
                />
              </a>
            </div>
          ))}
        </div>
        <Button
          variant="secondary"
          size="icon"
          aria-label="Previous flyer"
          onClick={() => go(index - 1)}
          className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full shadow-md"
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          aria-label="Next flyer"
          onClick={() => go(index + 1)}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full shadow-md"
        >
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {flyers.map((f, i) => (
          <button
            key={f.slug}
            type="button"
            aria-label={`Show the ${f.title} flyer`}
            aria-current={i === index ? 'true' : undefined}
            onClick={() => go(i)}
            className={cn(
              'h-2 rounded-full bg-muted-foreground/35 transition-all focus-visible:ring-3 focus-visible:ring-ring/50',
              i === index ? 'w-6 bg-primary' : 'w-2 hover:bg-muted-foreground/60',
            )}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {current.title}
      </p>
    </section>
  );
}
