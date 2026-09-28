import { cn } from '@/lib/utils';

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = 'left',
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={cn('space-y-3', align === 'center' && 'mx-auto max-w-2xl text-center')}>
      {eyebrow && (
        <p className="font-heading text-sm font-semibold tracking-widest text-primary uppercase">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="font-heading text-3xl font-bold tracking-tight [text-wrap:balance]">
        {title}
      </h2>
      {lead && <p className="text-lg text-muted-foreground">{lead}</p>}
    </div>
  );
}
