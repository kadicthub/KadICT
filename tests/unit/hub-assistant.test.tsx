import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
vi.mock('next/navigation', () => ({ usePathname: () => '/services/erp-systems' }));
import { GET } from '@/app/hub-facts.json/route';
import { HubAssistant } from '@/components/site/HubAssistant';

afterEach(() => vi.unstubAllGlobals());

describe('the KAD assistant on kadhub.ng', () => {
  it('asks KAD Learn, anonymously, with the page the visitor is on', async () => {
    const fetchMock = vi.fn(async () => new Response('Yes, we build ERP systems.'));
    vi.stubGlobal('fetch', fetchMock);
    render(<HubAssistant />);
    fireEvent.click(screen.getByRole('button', { name: 'Open the KAD assistant' }));
    fireEvent.change(screen.getByLabelText('Your question'), {
      target: { value: 'Do you build ERP systems?' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(await screen.findByText('Yes, we build ERP systems.')).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://learn.kadhub.ng/api/public/assistant');
    expect(init.credentials).toBe('omit');
    expect(JSON.parse(init.body as string)).toMatchObject({
      site: 'hub',
      page: '/services/erp-systems',
    });
  });
});

describe('/hub-facts.json', () => {
  it('publishes the hub’s services, contact details and training links', async () => {
    const facts = (await GET().json()) as {
      version: number;
      services: { title: string; url: string }[];
      contact: { email: string; url: string };
      training: { registerUrl: string };
    };
    expect(facts.version).toBe(1);
    expect(facts.services.map((s) => s.title)).toContain('ERP Systems');
    expect(facts.services[0]?.url).toMatch(/^https:\/\/www\.kadhub\.ng\/services\//);
    expect(facts.contact.email).toBe('info@kadhub.ng');
    expect(facts.training.registerUrl).toBe('https://www.kadhub.ng/register');
  });
});
