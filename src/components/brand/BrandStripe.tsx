import { cn } from '@/lib/utils';

/** The three dots of the logo's tree, as a thin rule. Purely decorative. */
export function BrandStripe({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('flex h-1 w-full', className)}>
      <span className="flex-1 bg-brand-magenta" />
      <span className="flex-1 bg-brand-cyan" />
      <span className="flex-1 bg-brand-lime" />
    </div>
  );
}
