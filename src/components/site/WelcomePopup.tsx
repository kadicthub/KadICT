'use client';

import { Dialog } from '@base-ui/react/dialog';
import { GraduationCap, UserPlus, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { flyers } from '@/content/flyers';
import { FlyerCarousel } from './FlyerCarousel';

// The original site's key, so visitors who already dismissed it this session
// are not shown it again after the upgrade.
const SEEN_KEY = 'hasSeenWelcomePopup';
const DELAY_MS = 1000;

function hasSeen(): boolean {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === 'true';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    window.sessionStorage.setItem(SEEN_KEY, 'true');
  } catch {
    // Private mode or blocked storage: the popup may show again, which is fine.
  }
}

/**
 * The hub's welcome popup: once per browser session, a second after the home
 * page opens, a slideshow of the course flyers and the two ways in.
 */
export function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (hasSeen()) return;
    const id = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) markSeen();
  };
  const close = () => onOpenChange(false);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-brand/60 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 max-h-[94dvh] w-[min(94vw,460px)] -translate-x-1/2 -translate-y-1/2 space-y-4 overflow-y-auto rounded-2xl border bg-popover p-5 text-popover-foreground shadow-2xl transition duration-200 outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 sm:p-6">
          <div className="space-y-1 pr-8 text-center sm:pr-0">
            <Dialog.Title className="font-heading text-2xl font-bold text-primary">
              Welcome to KAD ICT Hub!
            </Dialog.Title>
            <Dialog.Description className="text-muted-foreground">
              Transform your future with technology. Explore our courses:
            </Dialog.Description>
          </div>
          <FlyerCarousel flyers={flyers} />
          <div className="grid gap-2 sm:grid-cols-2">
            <Link
              href="/register"
              onClick={close}
              className={cn(buttonVariants({ size: 'lg' }), 'h-11 text-base')}
            >
              <UserPlus aria-hidden="true" /> Register now
            </Link>
            <Link
              href="/programs"
              onClick={close}
              className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'h-11 text-base')}
            >
              <GraduationCap aria-hidden="true" /> View courses
            </Link>
          </div>
          <Dialog.Close
            render={<Button variant="ghost" size="icon" className="absolute top-3 right-3" />}
            aria-label="Close"
          >
            <XIcon aria-hidden="true" />
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
