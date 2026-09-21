'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu as MenuIcon,
} from 'lucide-react';

type SectionKey = 'product' | 'resources';
type PanelKey = SectionKey | 'all';

type NavItem = {
  label: string;
  href: string;
  description: string;
};

const SECTIONS: Record<SectionKey, { label: string; items: NavItem[] }> = {
  product: {
    label: 'Product',
    items: [
      {
        label: 'Pricing',
        href: '/pricing',
        description: 'Free self-hosting and Struxa Cloud plans',
      },
      {
        label: 'Compare',
        href: '/compare',
        description: 'struxa vs Pterodactyl and Pelican',
      },
      {
        label: 'Changelog',
        href: '/changelog',
        description: 'Every release and fix, documented',
      },
      {
        label: 'Struxa Cloud',
        href: '/pricing',
        description: 'Managed hosting, join the waitlist',
      },
    ],
  },
  resources: {
    label: 'Resources',
    items: [
      {
        label: 'Docs',
        href: 'https://docs.struxa.cloud',
        description: 'Install, configure, and run struxa',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/struxadotcloud/struxa',
        description: 'Source code, MIT licensed',
      },
      {
        label: 'Discord',
        href: 'https://discord.struxa.cloud',
        description: 'Community chat and support',
      },
      {
        label: 'Branding',
        href: '/branding',
        description: 'Logos, colors, and brand assets',
      },
    ],
  },
};

const triggerClass =
  'flex cursor-pointer items-center gap-1 rounded-sm text-xs uppercase tracking-widest text-neutral-300 hover:text-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400';

// One shared panel for both sections: opening Product then hovering Resources
// swaps the grid inside the panel (crossfade) instead of popping a second
// dropdown. Hover intent is desktop-only; click/Escape/click-outside work
// everywhere.
const CLOSE_DELAY = 120;
const EXIT_MS = 150;

export function NavMenus() {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const exitTimer = useRef<number | undefined>(undefined);
  const canHover = useRef(false);
  const [panel, setPanel] = useState<PanelKey | null>(null);
  const [closing, setClosing] = useState(false);

  const close = () => {
    if (!panel || closing) return;
    setClosing(true);
    exitTimer.current = window.setTimeout(() => {
      setPanel(null);
      setClosing(false);
    }, EXIT_MS);
  };

  // document listeners below are attached once on mount; route them through a
  // ref so they always call the latest close() instead of a stale closure.
  const closeRef = useRef(close);
  closeRef.current = close;

  useEffect(() => {
    canHover.current = window.matchMedia('(hover: hover)').matches;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.clearTimeout(closeTimer.current);
        closeRef.current();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        window.clearTimeout(closeTimer.current);
        closeRef.current();
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
      window.clearTimeout(closeTimer.current);
      window.clearTimeout(exitTimer.current);
    };
  }, []);

  const open = (key: PanelKey) => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(exitTimer.current);
    setClosing(false);
    setPanel(key);
  };

  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(close, CLOSE_DELAY);
  };
  const cancelClose = () => window.clearTimeout(closeTimer.current);

  const isOpen = (key: PanelKey) => panel === key && !closing;

  return (
    <div
      ref={rootRef}
      className="relative flex items-center gap-7"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      {(Object.keys(SECTIONS) as SectionKey[]).map((key) => (
        <button
          key={key}
          type="button"
          className={`${triggerClass} hidden lg:flex ${
            isOpen(key) ? 'text-neutral-100' : ''
          }`}
          aria-expanded={isOpen(key)}
          aria-haspopup="true"
          onMouseEnter={() => canHover.current && open(key)}
          onClick={() => (panel === key ? close() : open(key))}
        >
          {SECTIONS[key].label}
          <ChevronDown
            className={`size-3.5 opacity-70 transition-transform duration-200 motion-reduce:transition-none ${
              isOpen(key) ? 'rotate-180' : ''
            }`}
          />
        </button>
      ))}

      <button
        type="button"
        className={`${triggerClass} px-2 py-2 lg:hidden`}
        aria-expanded={isOpen('all')}
        aria-haspopup="true"
        aria-label="Open menu"
        onClick={() => (panel === 'all' ? close() : open('all'))}
      >
        <MenuIcon className="size-4" />
      </button>

      {panel ? (
        <div
          className={`nav-menu-panel absolute inset-x-0 top-full mx-auto mt-3 max-h-[min(34rem,calc(100dvh-5rem))] w-fit max-w-[calc(100vw-1.5rem)] overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950/90 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl ${
            closing ? 'nav-menu-panel-out' : ''
          }`}
          role="group"
          aria-label="Site menu"
          onClick={close}
        >
          <div key={panel} className="nav-menu-section">
            {panel === 'all' ? (
              <div className="flex w-72 max-w-full flex-col">
                <MenuGrid section="product" labeled cols={1} />
                <MenuGrid section="resources" labeled cols={1} />
              </div>
            ) : (
              <MenuGrid section={panel} cols={2} />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MenuGrid({
  section,
  labeled = false,
  cols,
}: {
  section: SectionKey;
  labeled?: boolean;
  cols: 1 | 2;
}) {
  const { label, items } = SECTIONS[section];

  return (
    <div>
      {labeled ? (
        <p className="px-3 pb-1 pt-2 text-[10px] uppercase tracking-widest text-neutral-600">
          {label}
        </p>
      ) : null}

      <div
        className={`grid gap-1 ${cols === 2 ? 'w-[30rem] grid-cols-2' : 'grid-cols-1'}`}
      >
        {items.map((item, i) => {
          const external = item.href.startsWith('http');
          const Arrow = external ? ArrowUpRight : ArrowRight;

          return (
            <a
              key={item.label}
              href={item.href}
              className="nav-menu-item group flex items-center justify-between gap-3 rounded-xl p-3 pr-4 transition-colors hover:bg-white/5"
              style={{ '--menu-i': i } as CSSProperties}
            >
              <span className="min-w-0">
                <span className="block text-sm font-medium text-neutral-100">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-neutral-500">
                  {item.description}
                </span>
              </span>
              <Arrow
                className={`size-3.5 shrink-0 text-neutral-700 transition-all duration-200 motion-reduce:transition-none group-hover:text-blue-400 ${
                  external
                    ? 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
                    : 'group-hover:translate-x-0.5'
                }`}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
