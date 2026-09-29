import { Mail, MapPin, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/site/ContactForm';
import { Container } from '@/components/site/Container';
import { PageHero } from '@/components/site/PageHero';
import { contact } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Visit KAD ICT Hub at ${contact.address.join(', ')}, call ${contact.phone} or email ${contact.email}.`,
  alternates: { canonical: '/contact' },
};

const directions =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('KAD ICT Hub, 47 Kanta Road, Kaduna');

export default function ContactPage() {
  const items = [
    {
      icon: MapPin,
      label: 'Visit us',
      value: contact.address.join(', '),
      href: directions,
      linkLabel: 'Get directions',
    },
    { icon: Phone, label: 'Call us', value: contact.phone, href: contact.phoneHref },
    { icon: Mail, label: 'Email us', value: contact.email, href: `mailto:${contact.email}` },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to KAD ICT Hub" image="/images/hub-interior.jpg" />
      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_1.4fr]">
        <ul className="space-y-4">
          {items.map((it) => (
            <li key={it.label} data-spotlight className="flex gap-4 rounded-xl border bg-card p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <it.icon className="size-5" aria-hidden="true" />
              </span>
              <div className="space-y-1">
                <h2 className="font-heading font-semibold">{it.label}</h2>
                <p className="text-muted-foreground">{it.value}</p>
                <a
                  href={it.href}
                  {...(it.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {it.linkLabel ?? it.value}
                </a>
              </div>
            </li>
          ))}
        </ul>
        <section
          aria-labelledby="message"
          className="space-y-5 rounded-xl border bg-card p-6 md:p-8"
        >
          <h2 id="message" className="font-heading text-2xl font-semibold">
            Send us a message
          </h2>
          <ContactForm />
        </section>
      </Container>
    </>
  );
}
