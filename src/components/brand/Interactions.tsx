'use client';

import { useEffect } from 'react';

const REVEAL_STAGGER_MS = 70;
const REVEAL_MAX_DELAY_MS = 420;

/**
 * The platform's small interactions, wired once for the whole page by
 * attribute rather than per component:
 *
 * - `data-spotlight`: the pointer position is written to `--mx`/`--my` so the
 *   CSS glow in globals.css follows it across the card.
 * - `data-reveal`: content that starts below the fold fades up as it scrolls
 *   into view. Anything already on screen is left alone, so nothing visible
 *   ever flickers; with reduced motion nothing is held back at all.
 *   `data-reveal-stagger` on a list reveals its children one after another.
 * - `data-scrolled` on <html> once the page has scrolled, for the header.
 *
 * Renders nothing; mount it once near the root.
 */
export function Interactions() {
  useEffect(() => {
    const root = document.documentElement;

    const onPointerMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>('[data-spotlight]');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };

    const onScroll = () => root.toggleAttribute('data-scrolled', window.scrollY > 8);
    onScroll();

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let io: IntersectionObserver | undefined;
    let mo: MutationObserver | undefined;
    let frame = 0;
    if (!reduceMotion && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.removeAttribute('data-reveal-pending');
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
      );
      io = observer;
      const scan = () => {
        frame = 0;
        document.querySelectorAll('[data-reveal-stagger]').forEach((list) => {
          Array.from(list.children).forEach((child, i) => {
            if (child.hasAttribute('data-reveal')) return;
            child.setAttribute('data-reveal', '');
            (child as HTMLElement).style.setProperty(
              '--reveal-delay',
              `${Math.min(i * REVEAL_STAGGER_MS, REVEAL_MAX_DELAY_MS)}ms`,
            );
          });
        });
        document.querySelectorAll('[data-reveal]:not([data-reveal-seen])').forEach((el) => {
          el.setAttribute('data-reveal-seen', '');
          if (el.getBoundingClientRect().top < window.innerHeight) return;
          el.setAttribute('data-reveal-pending', '');
          observer.observe(el);
        });
      };
      scan();
      // Client-side navigation swaps page content without a reload.
      mo = new MutationObserver(() => {
        if (!frame) frame = window.requestAnimationFrame(scan);
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      io?.disconnect();
      mo?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
