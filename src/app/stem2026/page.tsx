import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'STEM 2026 — Register to attend',
  description: 'Register to attend STEM 2026 at KAD ICT Hub.',
  alternates: { canonical: '/stem2026' },
};

export default function Stem2026Page() {
  return (
    <section aria-labelledby="stem2026-title" className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[600px] space-y-6">
        <div className="space-y-2 text-center">
          <h1 id="stem2026-title" className="font-heading text-3xl font-semibold sm:text-4xl">
            STEM 2026
          </h1>
          <p className="text-muted-foreground">Register to attend</p>
        </div>
        <iframe
          title="STEM 2026 event registration"
          src="https://luma.com/embed/event/evt-EB0gHtGGdCE17nt/simple"
          width="600"
          height="450"
          className="block w-full"
          style={{ border: '1px solid #bfcbda88', borderRadius: '4px' }}
          allow="fullscreen; payment"
          aria-hidden="false"
          tabIndex={0}
        />
      </div>
    </section>
  );
}
