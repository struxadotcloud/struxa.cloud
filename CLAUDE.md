# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Next.js dev server with Turbopack

# Build & production
npm run build
npm run start

# Lint
npm run lint         # ESLint
```

No test suite is configured.

## Architecture

This is the **syntetiq.pl marketing/landing site** — a Next.js 16 app deployed on Cloudflare (via `@opennextjs/cloudflare`).

### Internationalization

The entire `src/app` is under `src/app/[locale]/` using **next-intl** (v4). Two locales are supported: `pl` (default) and `en`. Route middleware is in `src/proxy.ts` (used as Next.js middleware entry). Translation strings live in `src/messages/pl.json` and `src/messages/en.json`. The i18n config is at `src/i18n/config.ts`.

- Use `getTranslations("namespace")` (server) or `useTranslations("namespace")` (client) from `next-intl`
- Locale prefix strategy: `"as-needed"` — `/` resolves to Polish, `/en/...` for English

### Blog System

Blog posts are MDX files in `src/content/{locale}/{slug}.mdx` with gray-matter frontmatter (`title`, `description`, `author`, `date`, `tags`, `featured`). The `src/lib/blog.ts` utility reads them at build time using Node `fs`. Routes: `/[locale]/blog` (list) and `/[locale]/blog/[post]` (detail).

### Component Organization

- `src/components/` — page-level section components (Navbar, Hero, Features, FAQ, CTA, Footer, etc.)
- `src/components/ui/` — shadcn/ui primitives (new-york style, neutral base color, Lucide icons)
- `src/components/mvpblocks/` — third-party block components (e.g. SimplePricing)
- `src/components/providers/` — PostHog analytics provider

### Other Routes

- `/[locale]/pricing` — standalone pricing page
- `/[locale]/legal/[[...document]]` — catch-all for legal documents (uses `src/lib/legal.ts` and `src/lib/legal-content.ts`)
- `/[locale]/hiring` — jobs/careers page
- `/[locale]/dashboard` — dashboard stub

### Key Libraries

- **Styling**: Tailwind CSS v4 with `tw-animate-css`, CSS variables for theming, `clsx` + `tailwind-merge` via `src/lib/utils.ts`
- **UI**: shadcn/ui components (configured via `components.json`)
- **Animations**: Framer Motion / Motion, tsParticles (sparkles effect)
- **Analytics**: PostHog (EU region, proxied via `/ingest/*` rewrites in `next.config.ts`)
- **Email**: AWS SES via `@aws-sdk/client-ses`, React Email templates in `src/lib/mail/template/`
- **MDX**: `@next/mdx` + `next-mdx-remote` + `gray-matter` for blog content

### Adding Translations

When adding new UI strings, add keys to **both** `src/messages/pl.json` and `src/messages/en.json`. Polish is the primary language; English is secondary.
