'use client';

import { useEffect, useRef, useState } from 'react';

const DURATION_MS = 1400;

/**
 * A figure like "20,000+" that counts up from zero the first time it scrolls
 * into view. The server renders the final value (so it is right without
 * JavaScript and for crawlers), screen readers only ever hear the final value,
 * and visitors who prefer reduced motion just see it.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = /^([\d,]+)(.*)$/.exec(value);
  const target = match ? Number(match[1]!.replace(/,/g, '')) : NaN;
  const suffix = match?.[2] ?? '';
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !Number.isFinite(target)) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(`${Math.round(target * eased).toLocaleString('en-NG')}${suffix}`);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, suffix]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
