/**
 * The KAD ICT Hub brand, shared by the hub site (kadhub.ng) and KAD Learn
 * (learn.kadhub.ng). Both repositories carry an identical copy of this file
 * and of `components/brand/*`, so the two sites present one header, one footer
 * and one set of contact details: change one copy, change the other.
 *
 * Links are written as `{ site, path }` rather than URLs, and `siteHref`
 * decides per site whether a link is local (a relative path, client-side
 * navigation) or crosses to the other site (an absolute URL).
 */
export type Site = 'hub' | 'learn';

export const SITE_URLS: Record<Site, string> = {
  hub: process.env.NEXT_PUBLIC_HUB_URL || 'https://www.kadhub.ng',
  learn: process.env.NEXT_PUBLIC_LEARN_URL || 'https://learn.kadhub.ng',
};

export function siteHref(site: Site, path: string, current: Site): string {
  return site === current ? path : new URL(path, SITE_URLS[site]).toString();
}

export type BrandLink = { label: string; site: Site; path: string };

export const brand = {
  name: 'KAD ICT Hub',
  learnName: 'KAD Learn',
  motto: 'Engage | Innovate | Evolve',
  summary:
    'A world-class innovation hub that has trained more than 20,000 residents of Kaduna State, an outsourcing partner for the public and private sector, and a home for startups.',
  logoAlt: 'KAD ICT Hub',
  learnBadge: 'Learn',
  menu: 'Menu',
  close: 'Close',
  mainNavigation: 'Main navigation',
  footerNavigation: 'Footer',
  toggleTheme: 'Toggle theme',
  contactHeading: 'Contact',
  followUs: 'Follow KAD ICT Hub',
  rights: (year: number) => `© ${year} KAD ICT Hub. All rights reserved.`,
} as const;

export const primaryNav: BrandLink[] = [
  { label: 'About', site: 'hub', path: '/about' },
  { label: 'Services', site: 'hub', path: '/services' },
  { label: 'Programs', site: 'hub', path: '/programs' },
  { label: 'Courses', site: 'learn', path: '/courses' },
  { label: 'Startups', site: 'hub', path: '/startups' },
  { label: 'Events', site: 'hub', path: '/events' },
  { label: 'Contact', site: 'hub', path: '/contact' },
];

export const footerNav: { heading: string; links: BrandLink[] }[] = [
  {
    heading: 'The Hub',
    links: [
      { label: 'About us', site: 'hub', path: '/about' },
      { label: 'Services', site: 'hub', path: '/services' },
      { label: 'Incubated startups', site: 'hub', path: '/startups' },
      { label: 'Events', site: 'hub', path: '/events' },
      { label: 'Innovation Challenge', site: 'hub', path: '/challenge' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { label: 'Training programs', site: 'hub', path: '/programs' },
      { label: 'Online courses', site: 'learn', path: '/courses' },
      { label: 'My learning', site: 'learn', path: '/dashboard' },
      { label: 'Register for training', site: 'hub', path: '/register' },
    ],
  },
];

export const contact = {
  address: ['No. 47 Kanta Road', 'by Independence Way', 'Kaduna, Kaduna State'],
  phone: '0704 864 1071',
  phoneHref: 'tel:+2347048641071',
  email: 'info@kadhub.ng',
} as const;

export type SocialNetwork = 'x' | 'facebook' | 'instagram';

export const socials: { network: SocialNetwork; label: string; href: string }[] = [
  { network: 'x', label: 'KAD ICT Hub on X', href: 'https://x.com/thekadhub' },
  {
    network: 'facebook',
    label: 'KAD ICT Hub on Facebook',
    href: 'https://www.facebook.com/theKADICTHUB',
  },
  {
    network: 'instagram',
    label: 'KAD ICT Hub on Instagram',
    href: 'https://www.instagram.com/thekadhub',
  },
];

/** The KAD assistant's words, the same on both sites. */
export const assistantCopy = {
  name: 'Kad',
  open: 'Ask Kad',
  openLabel: 'Open the KAD assistant',
  title: 'Kad · AI assistant',
  subtitle: 'KAD ICT Hub and KAD Learn',
  close: 'Close the assistant',
  closeShort: 'Close',
  newChat: 'New conversation',
  stop: 'Stop',
  send: 'Send',
  inputLabel: 'Your question',
  suggestionsLabel: 'Suggested questions',
  placeholder: {
    public: 'Ask about courses, prices or the hub…',
    app: 'Ask about a lesson or KAD Learn…',
  },
  thinking: 'Kad is thinking',
  disclaimer: 'Kad is an AI and can make mistakes. Check important details with the hub.',
  error: 'Kad could not answer just now. Please try again.',
  offline: 'Kad could not be reached. Check your connection and try again.',
  greeting: {
    public:
      'Hello! I am Kad. Ask me about KAD ICT Hub’s courses, cohorts and prices, our services, or how to register.',
    app: 'Hello! I am Kad. Ask me to explain a lesson, find something in your courses, or help you get around KAD Learn.',
  },
  suggestions: {
    public: [
      'Which course should I take to start a tech career?',
      'When does the next Data Analytics class start?',
      'Where is the hub and how do I register?',
    ],
    app: [
      'Explain this lesson in simpler words',
      'Quiz me on what I have learned',
      'How do I enrol in another course?',
    ],
  },
  you: 'You',
} as const;
