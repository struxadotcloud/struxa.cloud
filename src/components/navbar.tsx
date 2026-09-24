'use client';

import { useEffect, useState } from 'react';
import { ComingSoonButton } from './coming-soon-button';
import { NavMenus } from './nav-menus';

// Proportions mirror usenotra.com: a slim row (44px mobile / 40px desktop)
// floats with generous air above it (40px desktop at rest), then morphs on
// scroll into a 56px pill 14px from the top (max-w-5xl). The weight comes
// from spacing and air, not a thick bar: 16px nav links, 16px Log in, a 32px
// rounded CTA. The nav is centered with a 1fr-auto-1fr grid (never a
// transform, which would become the containing block for the fixed panels).
//
// Header totals (keep in sync with hero.tsx and nav-menus.tsx):
//   rest:      safe-area + 0.75rem pad + 2.75rem row = safe-area + 3.5rem (mobile)
//              safe-area + 2.5rem  pad + 2.5rem row  = safe-area + 5rem   (lg)
//   scrolled:  lg -> safe-area + 0.875rem pad + 3.5rem row
//
// The scrolled blur lives on an absolute layer rather than the row: a
// backdrop-filter on the row would become the containing block for the mobile
// sheet's `position: fixed`, breaking its viewport anchoring.
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 px-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] transition-all duration-300 ease-out motion-reduce:transition-none sm:px-4 ${
        // mutually exclusive lg paddings: tailwind-merge cannot dedupe two
        // differing pt-[calc(...)] values, and the cascade would keep the rest
        // state's 2.5rem forever.
        scrolled
          ? 'lg:pt-[calc(env(safe-area-inset-top)+0.875rem)]'
          : 'lg:pt-[calc(env(safe-area-inset-top)+2.5rem)]'
      }`}
    >
      <div
        className={`relative mx-auto flex h-11 w-full items-center gap-2 rounded-2xl border transition-all duration-300 ease-out motion-reduce:transition-none sm:gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr] ${
          scrolled
            ? 'max-w-5xl border-white/10 px-3 shadow-lg shadow-black/40 sm:px-5 lg:h-14'
            : 'max-w-7xl border-transparent px-2 sm:px-3 lg:h-10'
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-0 rounded-2xl transition-colors duration-300 ease-out motion-reduce:transition-none ${
            scrolled ? 'bg-neutral-950/85 backdrop-blur-md' : 'bg-transparent'
          }`}
          aria-hidden
        />

        <a
          href="/"
          aria-label="struxa home"
          className="group relative flex items-center lg:justify-self-start"
        >
          <span className="flex items-center gap-2.5 transition-transform duration-150 ease-out group-active:scale-[0.97] motion-reduce:transition-none">
            <img
              src="/images/brand/favicon.png"
              alt=""
              aria-hidden
              width={64}
              height={64}
              className="size-8 shrink-0 sm:size-9"
            />
            <img
              src="/images/brand/wordmark.png"
              alt="struxa"
              width="448"
              height="90"
              className="h-4 w-auto sm:h-5"
            />
          </span>
        </a>

        <NavMenus />

        <div className="relative flex shrink-0 items-center gap-1.5 sm:gap-3 lg:justify-self-end">
          <div className="hidden sm:block">
            <ComingSoonButton variant="text" className="sm:text-base">
              Log in
            </ComingSoonButton>
          </div>
          <ComingSoonButton className="rounded-full border-white bg-white px-4 text-neutral-950 shadow-none hover:bg-neutral-200 data-pressed:bg-neutral-300">
            Get Started
          </ComingSoonButton>
        </div>
      </div>
    </header>
  );
}
