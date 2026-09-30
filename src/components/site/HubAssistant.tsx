'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { Assistant } from '@/components/brand/Assistant';
import { SITE_URLS } from '@/lib/brand';

const PAGE = /^\/[a-z0-9\-/]{0,120}$/;

/**
 * The KAD assistant for visitors to kadhub.ng. It is served by KAD Learn,
 * which knows the live course catalogue and reads this site's
 * `/hub-facts.json`; the page path lets it tell which course or service a
 * visitor is looking at.
 */
export function HubAssistant() {
  const pathname = usePathname();
  const extra = useMemo(
    () => ({ site: 'hub', ...(PAGE.test(pathname) ? { page: pathname } : {}) }),
    [pathname],
  );
  return (
    <Assistant
      endpoint={new URL('/api/public/assistant', SITE_URLS.learn).toString()}
      mode="public"
      extra={extra}
      storageKey="kad-assistant:hub"
    />
  );
}
