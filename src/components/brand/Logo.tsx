import Image from 'next/image';
import Link from 'next/link';
import { brand } from '@/lib/brand';
import { cn } from '@/lib/utils';

/**
 * The KAD ICT Hub logo. `tone="auto"` follows the colour scheme (the blue
 * wordmark on light surfaces, the white one in dark mode); `tone="light"` is
 * for surfaces that are always dark, like the footer. The link carries the
 * accessible name, so whichever image the colour scheme shows, it reads once.
 */
export function Logo({
  href,
  tone = 'auto',
  className,
}: {
  href: string;
  tone?: 'auto' | 'light';
  className?: string;
}) {
  const img = (src: string, extra?: string) => (
    <Image src={src} alt="" width={327} height={160} className={cn('h-full w-auto', extra)} />
  );
  return (
    <Link
      href={href}
      aria-label={brand.logoAlt}
      className={cn('inline-flex h-10 shrink-0 items-center', className)}
    >
      {tone === 'light' ? (
        img('/brand/kad-logo-light.png')
      ) : (
        <>
          {img('/brand/kad-logo.png', 'dark:hidden')}
          {img('/brand/kad-logo-light.png', 'hidden dark:block')}
        </>
      )}
    </Link>
  );
}
