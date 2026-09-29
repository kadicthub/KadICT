import { cn } from '@/lib/utils';

/**
 * The techy layer behind the navy brand bands: a fading circuit grid, slowly
 * drifting glows in the logo's colours and a thin scan line. Purely
 * decorative; place it first inside a `relative isolate overflow-hidden`
 * section. The motion stops for visitors who prefer reduced motion.
 */
export function TechBackdrop({ className, scan = true }: { className?: string; scan?: boolean }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 -z-10', className)}>
      <div className="tech-grid absolute inset-0" />
      <div className="tech-orb -top-24 -left-16 size-72 bg-brand-blue md:size-[28rem]" />
      <div
        className="tech-orb top-1/3 -right-24 size-64 bg-brand-cyan opacity-40 md:size-[24rem] md:opacity-55"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="tech-orb -bottom-32 left-1/3 size-56 bg-brand-magenta opacity-25 md:size-[22rem] md:opacity-30"
        style={{ animationDelay: '-12s' }}
      />
      {scan && <div className="tech-scan absolute inset-x-0 bottom-0 h-px" />}
    </div>
  );
}
