'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { contact } from '@/lib/brand';

const field =
  'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50';

/**
 * Opens the visitor's email app with the message addressed to the hub. The
 * site has no mail backend (the old form posted to a PHP script that never ran
 * on Vercel), and a mailto keeps every message in the hub's own inbox.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = String(data.get('name') ?? '').trim();
        const email = String(data.get('email') ?? '').trim();
        const subject = String(data.get('subject') ?? '').trim();
        const message = String(data.get('message') ?? '').trim();
        const body = `${message}\n\n— ${name} (${email})`;
        window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5 text-sm font-medium">
          <span>Your name</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="space-y-1.5 text-sm font-medium">
          <span>Your email</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block space-y-1.5 text-sm font-medium">
        <span>Subject</span>
        <input name="subject" required className={field} />
      </label>
      <label className="block space-y-1.5 text-sm font-medium">
        <span>Message</span>
        <textarea name="message" required rows={6} className={field} />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg">
          Write to us
        </Button>
        <p className="text-sm text-muted-foreground" role="status">
          {sent
            ? `Your email app should have opened. If it didn't, write to ${contact.email}.`
            : 'This opens your email app with your message ready to send.'}
        </p>
      </div>
    </form>
  );
}
