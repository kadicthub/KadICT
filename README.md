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
| `pnpm typecheck`    | `tsc --noEmit`      |
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
testimonials, startups and events; `services.ts` for the six services). Images
are in `public/images`, resized for the web. The STEM Festival 2024 brochure is
still served from `public/assets/img/` (24 MB; a compressed PDF would help).
