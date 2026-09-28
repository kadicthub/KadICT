import type { SocialNetwork } from '@/lib/brand';

/** Brand glyphs for the social links (lucide ships no brand icons). */
export function SocialIcon({ network, className }: { network: SocialNetwork; className?: string }) {
  if (network === 'instagram') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={className}
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  const d =
    network === 'x'
      ? 'M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.59l5.25 6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3Z'
      : 'M9.1 23.69v-7.98H6.63v-3.67H9.1v-1.58c0-4.09 1.85-5.98 5.86-5.98.4 0 .96.04 1.47.1.39.04.77.11 1.14.2v3.32a8.6 8.6 0 0 0-1.39-.05c-.7 0-1.26.1-1.67.31-.29.14-.52.36-.68.63-.26.42-.38 1-.38 1.75v1.3h3.92l-.67 3.67h-3.25v8.24C19.4 23.24 24 18.18 24 12.04 24 5.42 18.63.04 12 .04S0 5.42 0 12.04c0 5.63 3.87 10.35 9.1 11.65Z';
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
