import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import { SiteFooter } from '@/components/brand/SiteFooter';
import { HubHeader } from '@/components/site/HubHeader';
import { Providers } from '@/components/site/Providers';
import { brand, SITE_URLS } from '@/lib/brand';
import { hubIntro } from '@/content/hub';
import '@/styles/globals.css';

// The KAD ICT Hub typefaces, shared with learn.kadhub.ng.
const body = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});
const heading = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URLS.hub),
  title: { default: `${brand.name} — ${brand.motto}`, template: `%s · ${brand.name}` },
  description: hubIntro,
  applicationName: brand.name,
  keywords: ['KAD ICT Hub', 'Kaduna', 'tech training', 'innovation hub', 'startups', 'Nigeria'],
  openGraph: { siteName: brand.name, locale: 'en_NG', type: 'website' },
  twitter: { card: 'summary_large_image', site: '@thekadhub' },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${body.variable} ${heading.variable}`}>
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:ring-3 focus:ring-ring"
          >
            Skip to content
          </a>
          <HubHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter current="hub" />
        </Providers>
      </body>
    </html>
  );
}
