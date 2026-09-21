'use client';

import { useEffect, useState } from 'react';
import { ComingSoonButton } from './coming-soon-button';
import { NavMenus } from './nav-menus';

// At rest the row is transparent and sits inside the hero card (the hero pulls
// itself up under the header with a matching negative margin) — mt-2 keeps the
// row clear of the card's top border. Past ~16px of scroll it morphs into a
// detached floating pill that also narrows to content width. The header's top
// padding stays constant in both states so the pill floats with a gap below
// the viewport edge. Total top-state height is env(safe-area-inset-top) +
// 4.5rem (1rem gap + 0.5rem offset + 3rem row) — keep hero.tsx's negative
// margin in sync.
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-[calc(env(safe-area-inset-top)+1rem)] sm:px-4">
      <div
        className={`mx-auto flex w-full items-center justify-between gap-4 rounded-full border transition-all duration-300 ease-out motion-reduce:transition-none ${
          scrolled
            ? 'mt-0 h-11 max-w-6xl border-white/10 bg-neutral-950/80 px-8 shadow-lg shadow-black/30 backdrop-blur-md'
            : 'mt-2 h-12 max-w-[1840px] border-transparent bg-transparent px-6'
        }`}
      >
        <a href="/" className="shrink-0">
          <img
            src="/images/brand/wordmark.png"
            alt="struxa"
            width="448"
            height="90"
            className={`h-auto transition-all duration-300 ease-out motion-reduce:transition-none ${
              scrolled ? 'w-20' : 'w-24'
            }`}
          />
        </a>

        <NavMenus />

        <div className="flex items-center gap-4">
          <div
            className={`hidden overflow-hidden whitespace-nowrap transition-all duration-300 ease-out motion-reduce:transition-none sm:block ${
              scrolled ? 'max-w-0 opacity-0' : 'max-w-24 opacity-100'
            }`}
          >
            <ComingSoonButton variant="text">Log in</ComingSoonButton>
          </div>
          <ComingSoonButton className="border-white bg-white text-neutral-950 hover:bg-neutral-200 data-pressed:bg-neutral-300">
            Get Started
          </ComingSoonButton>
        </div>
      </div>
    </header>
  );
}
