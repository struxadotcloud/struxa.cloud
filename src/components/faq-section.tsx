'use client';

import { useState } from 'react';
import { CornerTick } from './corner-tick';
import { SectionHeader } from './section';

const FAQS = [
  {
    q: 'Is struxa really free and open-source?',
    a: 'Yes. The panel, the Wings node agent, and the storefront are all MIT-licensed and self-hostable on your own hardware — no license fees, no per-seat pricing.',
  },
  {
    q: 'What is Wings?',
    a: "Wings is struxa's node agent. It runs on each machine hosting game servers and streams CPU, memory, and disk stats back to the panel in real time, plus handles server start/stop/install.",
  },
  {
    q: "What's the difference between self-hosting and Struxa Cloud?",
    a: 'Self-hosting means you run the panel yourself alongside your nodes. Struxa Cloud lets you keep your own Wings nodes but we host and manage the panel for you — backups, updates, and uptime included.',
  },
  {
    q: 'Can I migrate from Pterodactyl?',
    a: "struxa is built as a modern, dark-UI replacement for Pterodactyl on a fully typed TypeScript stack. A migration guide is on the roadmap — join the waitlist or check GitHub for the current status.",
  },
  {
    q: 'Do I need to know how to code to use struxa?',
    a: 'No. struxa is an operator-facing dashboard for managing servers, users, and nodes — no coding required to run it day to day. Contributing to the codebase does need TypeScript.',
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative border-b border-neutral-800">
      <CornerTick position="tl" />
      <CornerTick position="tr" />
      <CornerTick position="bl" />
      <CornerTick position="br" />

      <div className="px-6 pt-14 md:px-16">
        <SectionHeader
          label="FAQ"
          heading="Questions, answered."
          description="Everything you need to know about running struxa yourself or on Struxa Cloud."
        />
      </div>

      <div className="divide-y divide-neutral-800 border-t border-neutral-800">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="transition-colors hover:bg-neutral-900/50">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-16"
              >
                <span className="font-medium text-neutral-100">{item.q}</span>
                <span
                  className={`shrink-0 font-mono text-blue-400 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-sm leading-relaxed text-neutral-400 md:px-16">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
