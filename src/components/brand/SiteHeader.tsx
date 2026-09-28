'use client';

import { useState, type ReactNode } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { brand, primaryNav, siteHref, type Site } from '@/lib/brand';
import { cn } from '@/lib/utils';
import { BrandStripe } from './BrandStripe';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

/**
 * The header both KAD sites share. The navigation is the same on each; links
 * that belong to the other site leave it with a full URL. `actions` is the
 * per-site slot on the right (Register on the hub, the account on Learn).
 */
export function SiteHeader({ current, actions }: { current: Site; actions: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Close the mobile sheet once navigation lands on a new route, during render
  // rather than in an effect so it is already closed when the new page paints.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const links = (orientation: 'row' | 'column') =>
    primaryNav.map((item) => {
      const active = item.site === current && pathname.startsWith(item.path);
      return (
        <Link
          key={`${item.site}${item.path}`}
          href={siteHref(item.site, item.path, current)}
          aria-current={active ? 'page' : undefined}
          className={cn(
            'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
            active && 'text-primary',
            orientation === 'column' && 'text-base',
          )}
        >
          {item.label}
        </Link>
      );
    });

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <BrandStripe />
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Logo href={siteHref('hub', '/', current)} />
        {current === 'learn' && (
          <Link
            href="/"
            className="rounded-full bg-primary px-2.5 py-0.5 font-heading text-xs font-semibold tracking-wide text-primary-foreground uppercase"
          >
            {brand.learnBadge}
          </Link>
        )}
        <nav aria-label={brand.mainNavigation} className="ml-4 hidden items-center gap-0.5 lg:flex">
          {links('row')}
        </nav>
        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {actions}
        </div>
        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger aria-label={brand.menu} render={<Button variant="ghost" size="icon" />}>
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="flex w-72 flex-col gap-6 p-6">
              <nav aria-label={brand.mainNavigation} className="mt-8 flex flex-col gap-1">
                {links('column')}
              </nav>
              <div className="flex flex-col items-start gap-3 border-t pt-6">{actions}</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
