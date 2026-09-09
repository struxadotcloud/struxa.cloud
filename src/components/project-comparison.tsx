'use client';

import { useEffect, useRef, useState } from 'react';

const PROJECTS = ['Pterodactyl', 'Pelican', 'Calagopus', 'FeatherPanel', 'Pyrodactyl'] as const;
type Project = (typeof PROJECTS)[number];

// Source: https://docs.struxa.cloud/comparison (reviewed September 9, 2026).
const FEATURES: {
  name: string;
  struxa: string;
  alternatives: Record<Project, string>;
}[] = [
  {
    name: 'Panel stack',
    struxa: 'Next.js 16 / TypeScript',
    alternatives: {
      Pterodactyl: 'Laravel / React',
      Pelican: 'Laravel / Filament',
      Calagopus: 'Axum / React',
      FeatherPanel: 'PHP 8.5 / Next.js 16',
      Pyrodactyl: 'Laravel / React 19',
    },
  },
  {
    name: 'Node agent',
    struxa: 'Rust Wings',
    alternatives: {
      Pterodactyl: 'Go Wings',
      Pelican: 'Go Wings-compatible',
      Calagopus: 'Rust Wings',
      FeatherPanel: 'FeatherWings',
      Pyrodactyl: 'Elytra',
    },
  },
  {
    name: 'Egg support',
    struxa: 'Pterodactyl-compatible',
    alternatives: {
      Pterodactyl: 'Nests and eggs',
      Pelican: 'Compatible / marketplace',
      Calagopus: 'Pterodactyl-compatible',
      FeatherPanel: 'Partially compatible',
      Pyrodactyl: 'Pterodactyl-based',
    },
  },
  {
    name: 'Installation',
    struxa: 'One command, auto-linked Wings',
    alternatives: {
      Pterodactyl: 'Community script',
      Pelican: 'Web installer',
      Calagopus: 'Single Docker image',
      FeatherPanel: 'One-click script',
      Pyrodactyl: 'Manual / Compose',
    },
  },
  {
    name: 'Billing',
    struxa: 'Built-in subscriptions and wallet',
    alternatives: {
      Pterodactyl: 'WHMCS / Blesta modules',
      Pelican: 'WHMCS / Blesta modules',
      Calagopus: 'Paymenter / WHMCS modules',
      FeatherPanel: 'Not built in',
      Pyrodactyl: 'Not built in',
    },
  },
  {
    name: 'Notifications',
    struxa: 'Discord / Telegram',
    alternatives: {
      Pterodactyl: 'Not built in',
      Pelican: 'Webhooks',
      Calagopus: 'Not built in',
      FeatherPanel: 'Not built in',
      Pyrodactyl: 'Not built in',
    },
  },
  {
    name: 'Backup storage',
    struxa: '6 destinations + user Google Drive',
    alternatives: {
      Pterodactyl: 'Local / S3',
      Pelican: 'Local / S3',
      Calagopus: '8 drivers',
      FeatherPanel: 'Local',
      Pyrodactyl: 'Local',
    },
  },
  {
    name: 'Disk limiters',
    struxa: 'Btrfs / XFS / ZFS / FUSE',
    alternatives: {
      Pterodactyl: 'Not built in',
      Pelican: 'Not built in',
      Calagopus: 'Btrfs / XFS / ZFS / FUSE',
      FeatherPanel: 'Not built in',
      Pyrodactyl: 'Not built in',
    },
  },
  {
    name: 'Project status',
    struxa: 'Active',
    alternatives: {
      Pterodactyl: 'Active',
      Pelican: 'Active',
      Calagopus: 'Active',
      FeatherPanel: 'Active',
      Pyrodactyl: 'Pre-release',
    },
  },
];

export function ProjectComparison() {
  const [project, setProject] = useState<Project>('Pterodactyl');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectorRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef({ value: '', time: 0 });

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !selectorRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);

  function choose(selected: Project) {
    setProject(selected);
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <section className="pb-16" aria-label="Project comparison">
      <div className="flex flex-col gap-3 px-6 pb-6 sm:flex-row sm:items-center sm:gap-4 md:px-16">
        <label htmlFor="comparison-project" className="font-mono text-xs uppercase tracking-wide text-neutral-400">
          Compare with
        </label>
        <div ref={selectorRef} className="relative w-full sm:w-64">
        <button
          ref={triggerRef}
          type="button"
          id="comparison-project"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? 'comparison-options' : undefined}
          aria-activedescendant={open ? `comparison-option-${activeIndex}` : undefined}
          onClick={() => {
            setActiveIndex(PROJECTS.indexOf(project));
            setOpen(!open);
          }}
          onBlur={() => setOpen(false)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              setOpen(false);
            } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              setActiveIndex(open
                ? (activeIndex + (event.key === 'ArrowDown' ? 1 : -1) + PROJECTS.length) % PROJECTS.length
                : PROJECTS.indexOf(project));
              setOpen(true);
            } else if (event.key === 'Home' || event.key === 'End') {
              event.preventDefault();
              setActiveIndex(event.key === 'Home' ? 0 : PROJECTS.length - 1);
              setOpen(true);
            } else if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              if (open) choose(PROJECTS[activeIndex]!);
              else {
                setActiveIndex(PROJECTS.indexOf(project));
                setOpen(true);
              }
            } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
              event.preventDefault();
              const now = Date.now();
              const value = (now - searchRef.current.time < 600 ? searchRef.current.value : '') + event.key.toLowerCase();
              searchRef.current = { value, time: now };
              const index = PROJECTS.findIndex((name) => name.toLowerCase().startsWith(value));
              if (index >= 0) {
                setActiveIndex(index);
                setOpen(true);
              }
            }
          }}
          className={`flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 border bg-neutral-950 px-4 py-2 text-left font-mono text-sm text-neutral-200 transition-colors hover:border-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 ${open ? 'border-blue-400' : 'border-neutral-700'}`}
        >
          {project}
          <span aria-hidden="true" className={`h-2 w-2 shrink-0 border-b border-r border-neutral-400 transition-transform motion-reduce:transition-none ${open ? 'translate-y-0.5 rotate-[225deg]' : '-translate-y-0.5 rotate-45'}`} />
        </button>
        {open && (
          <ul id="comparison-options" role="listbox" aria-label="Compare with" className="absolute inset-x-0 top-full z-30 mt-2 border border-neutral-700 bg-neutral-950 p-1">
            {PROJECTS.map((name, index) => (
              <li
                key={name}
                id={`comparison-option-${index}`}
                role="option"
                aria-selected={name === project}
                onPointerMove={() => setActiveIndex(index)}
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => choose(name)}
                className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 px-3 py-2 font-mono text-sm ${activeIndex === index ? 'bg-neutral-800 text-neutral-50' : 'text-neutral-400'} ${name === project ? 'text-blue-400' : ''}`}
              >
                {name}
                {name === project && <span aria-hidden="true" className="h-3 w-1.5 rotate-45 border-b border-r border-blue-400" />}
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>

      <div className="overflow-x-auto border-t border-neutral-800 focus-visible:outline-2 focus-visible:outline-blue-400" role="region" aria-label="Comparison table" tabIndex={0}>
        <table className="w-full min-w-[640px] table-fixed border-collapse font-mono text-xs leading-relaxed">
          <caption className="sr-only" aria-live="polite">struxa compared with {project}</caption>
          <thead>
            <tr className="border-b border-neutral-800">
              <th scope="col" className="w-[34%] px-6 py-4 text-left font-normal uppercase tracking-wide text-neutral-500 md:px-16">Feature</th>
              <th scope="col" className="px-4 py-4 text-center font-normal uppercase tracking-wide text-blue-400">struxa</th>
              <th scope="col" className="px-4 py-4 text-center font-normal uppercase tracking-wide text-neutral-400">{project}</th>
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((feature) => (
              <tr key={feature.name} className="border-b border-neutral-800">
                <th scope="row" className="px-6 py-4 text-left font-normal text-neutral-300 md:px-16">{feature.name}</th>
                <td className="px-4 py-4 text-center text-blue-400">{feature.struxa}</td>
                <td className="px-4 py-4 text-center text-neutral-400">{feature.alternatives[project]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="px-6 pt-6 font-mono text-[11px] leading-relaxed text-neutral-500 md:px-16">
        Based on the <a href="https://docs.struxa.cloud/comparison" className="text-neutral-400 underline underline-offset-4 hover:text-neutral-200">Struxa comparison docs</a>, reviewed September 9, 2026.
        {' '}Third-party extensions may add features listed as not built in.
      </p>
    </section>
  );
}
