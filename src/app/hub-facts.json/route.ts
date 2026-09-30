import { brand, contact, SITE_URLS } from '@/lib/brand';
import {
  events,
  hubIntro,
  incubation,
  mission,
  pillars,
  startups,
  stats,
  vision,
} from '@/content/hub';
import { services } from '@/content/services';

export const dynamic = 'force-static';

const url = (path: string) => new URL(path, SITE_URLS.hub).toString();

/**
 * What this site says about the hub, as data: the KAD assistant on KAD Learn
 * reads it to answer visitors' questions about services, events, startups and
 * contact details. Built from the same content files as the pages, at build
 * time, so the assistant and the pages never disagree.
 */
export function GET() {
  return Response.json({
    version: 1,
    name: brand.name,
    motto: brand.motto,
    url: url('/'),
    intro: hubIntro,
    stats: stats.map((s) => ({ value: s.value, label: s.label })),
    pillars: pillars.map((p) => ({ title: p.title, body: p.body })),
    services: services.map((s) => ({
      title: s.title,
      description: s.description,
      features: s.features,
      url: url(`/services/${s.slug}`),
    })),
    training: {
      programsUrl: url('/programs'),
      registerUrl: url('/register'),
      howToRegister:
        'To join a program, fill in the registration form on the Register page and the hub will contact you about the next intake, fees and payment options (flexible payment options are available). Online courses on KAD Learn can be enrolled in directly on each course page.',
    },
    incubation,
    events: events.map((e) => ({
      title: e.title,
      when: e.when,
      summary: e.summary,
      url: url(e.href),
    })),
    startups: startups.map((s) => ({ name: s.name, description: s.description })),
    mission,
    vision,
    contact: {
      address: [...contact.address],
      phone: contact.phone,
      email: contact.email,
      url: url('/contact'),
    },
  });
}
