import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { brand, contact, footerNav, siteHref, socials, type Site } from '@/lib/brand';
import { BrandStripe } from './BrandStripe';
import { Logo } from './Logo';
import { SocialIcon } from './SocialIcon';

/** The footer both KAD sites share: who we are, where to go, how to reach us. */
export function SiteFooter({ current }: { current: Site }) {
  return (
    <footer className="bg-brand text-brand-foreground">
      <BrandStripe />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div className="space-y-4">
          <Logo href={siteHref('hub', '/', current)} tone="light" className="h-14" />
          <p className="max-w-sm text-sm leading-relaxed text-brand-muted-foreground">
            {brand.summary}
          </p>
          <ul aria-label={brand.followUs} className="flex gap-2">
            {socials.map((s) => (
              <li key={s.network}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full bg-brand-foreground/10 transition-colors hover:bg-brand-foreground/20"
                >
                  <SocialIcon network={s.network} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        {footerNav.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className="space-y-3">
            <h2 className="font-heading text-sm font-semibold tracking-wide uppercase">
              {col.heading}
            </h2>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={`${l.site}${l.path}`}>
                  <Link
                    href={siteHref(l.site, l.path, current)}
                    className="text-brand-muted-foreground transition-colors hover:text-brand-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="space-y-3">
          <h2 className="font-heading text-sm font-semibold tracking-wide uppercase">
            {brand.contactHeading}
          </h2>
          <address className="space-y-3 text-sm text-brand-muted-foreground not-italic">
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                {contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              <a href={contact.phoneHref} className="hover:text-brand-foreground">
                {contact.phone}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className="hover:text-brand-foreground">
                {contact.email}
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-brand-foreground/15">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-brand-muted-foreground">
          <span>{brand.rights(new Date().getFullYear())}</span>
          <span className="tracking-widest uppercase">{brand.motto}</span>
        </div>
      </div>
    </footer>
  );
}
