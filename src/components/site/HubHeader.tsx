import Link from 'next/link';
import { SiteHeader } from '@/components/brand/SiteHeader';
import { buttonVariants } from '@/components/ui/button';
import { siteHref } from '@/lib/brand';

/** The shared header, with the hub's actions: sign in to KAD Learn, or register. */
export function HubHeader() {
  return (
    <SiteHeader
      current="hub"
      actions={
        <>
          <a
            href={siteHref('learn', '/sign-in', 'hub')}
            className={buttonVariants({ size: 'lg', variant: 'ghost' })}
          >
            Sign in
          </a>
          <Link href="/register" className={buttonVariants({ size: 'lg' })}>
            Register
          </Link>
        </>
      }
    />
  );
}
