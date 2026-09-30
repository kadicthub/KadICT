# KAD ICT Hub — kadhub.ng

The public website of KAD ICT Hub, Kaduna: who the hub is, its services,
incubated startups, events, and its training programs. The courses themselves
live on **KAD Learn** ([learn.kadhub.ng](https://learn.kadhub.ng), repository
`Yaqub-J/kad-lms`); this site lists them from KAD Learn's public catalogue feed
and links every course there.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Base UI
primitives, lucide icons, Vitest. Deployed on Vercel. pnpm only.

## Develop

```bash
nvm use            # Node 22
pnpm install
pnpm dev           # http://localhost:3000
```

| Command             | Purpose             |
| ------------------- | ------------------- |
| `pnpm dev`          | Development server  |
| `pnpm build`        | Production build    |
| `pnpm typecheck`    | Route types + `tsc` |
| `pnpm lint`         | ESLint              |
| `pnpm format:check` | Prettier            |
| `pnpm test`         | Unit tests (Vitest) |

CI (`.github/workflows/ci.yml`) runs all of the above on every pull request.

### Environment

Nothing is required. Two optional variables point the cross-site links at
another pair of deployments (a preview of each, say):

- `NEXT_PUBLIC_LEARN_URL` — KAD Learn, default `https://learn.kadhub.ng`
- `NEXT_PUBLIC_HUB_URL` — this site, default `https://www.kadhub.ng`

## One platform with KAD Learn

The two sites share one identity. These files are **identical copies** of the
ones in the kad-lms repository — change both together:

- `src/styles/globals.css` — design tokens (the logo's royal blue, the navy
  brand band, the magenta/cyan/lime accents of the logo's tree)
- `src/lib/brand.ts` — navigation, contact details, social links, `siteHref`
- `src/components/brand/*` — logo, header, footer, theme toggle
- `public/brand/*` — the logo in colour and for dark surfaces

`siteHref(site, path, current)` keeps same-site links relative and makes links
to the other site absolute, so the shared header and footer work on both.

### The KAD assistant

The **Ask Kad** button on every page opens the shared assistant
(`src/components/brand/Assistant.tsx`, identical in kad-lms). It is served by
KAD Learn at `POST https://learn.kadhub.ng/api/public/assistant`, which knows
the live course catalogue and reads what this site says about the hub from
**`/hub-facts.json`**. That feed is generated at build time from
`src/content/*` and `src/lib/brand.ts`, the same files the pages render, so a
content change here reaches the assistant on the next deploy (it caches the
feed for an hour). Keep it to what the pages already say publicly.

## Courses

`/programs` and the home page call `GET {LEARN_URL}/api/public/catalog`
(`src/lib/lms.ts`), cached for five minutes. If KAD Learn cannot be reached the
page still renders, with a link to the catalogue instead of the list. Course
cards link to the course page on KAD Learn; the old `/programs/<slug>` pages
redirect there (renamed slugs are mapped in `next.config.ts`).

To add or change a course, do it in KAD Learn's Studio; it appears here within
five minutes.

## Content

Page copy lives in `src/content/` (`hub.ts` for the hub's story, stats,
testimonials, startups and events; `services.ts` for the six services). The home page's welcome popup (once per browser session) shows the course
flyers from `src/content/flyers.ts` / `public/images/flyers`. Images
are in `public/images`, resized for the web. The STEM Festival 2024 brochure is
still served from `public/assets/img/` (24 MB; a compressed PDF would help).
