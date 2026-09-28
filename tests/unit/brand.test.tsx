import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
vi.mock('next/navigation', () => ({ usePathname: () => '/programs' }));
import { SiteFooter } from '@/components/brand/SiteFooter';
import { SiteHeader } from '@/components/brand/SiteHeader';
import { siteHref } from '@/lib/brand';

describe('the shared brand on kadhub.ng', () => {
  it('keeps hub links local and sends Courses to KAD Learn', () => {
    render(<SiteHeader current="hub" actions={null} />);
    expect(screen.getByRole('link', { name: 'Programs' })).toHaveAttribute('href', '/programs');
    expect(screen.getByRole('link', { name: 'Programs' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Courses' })).toHaveAttribute(
      'href',
      'https://learn.kadhub.ng/courses',
    );
    expect(screen.getByRole('link', { name: 'KAD ICT Hub' })).toHaveAttribute('href', '/');
    expect(screen.queryByRole('link', { name: 'Learn' })).toBeNull();
  });

  it('links the footer’s Learn column to KAD Learn', () => {
    render(<SiteFooter current="hub" />);
    const learn = screen.getByRole('navigation', { name: 'Learn' });
    expect(within(learn).getByRole('link', { name: 'Online courses' })).toHaveAttribute(
      'href',
      'https://learn.kadhub.ng/courses',
    );
    expect(within(learn).getByRole('link', { name: 'Training programs' })).toHaveAttribute(
      'href',
      '/programs',
    );
  });

  it('builds cross-site URLs from the hub', () => {
    expect(siteHref('learn', '/sign-in', 'hub')).toBe('https://learn.kadhub.ng/sign-in');
    expect(siteHref('hub', '/register', 'hub')).toBe('/register');
  });
});
