'use client';

import { ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const FAQS = [
  {
    q: 'Is struxa really free and open-source?',
    a: 'Yes. The panel, the Wings node agent, and the storefront are all MIT-licensed and self-hostable on your own hardware, with no license fees and no per-seat pricing.',
  },
  {
    q: 'What is Wings?',
    a: "Wings is struxa's node agent. It runs on each machine hosting game servers, streams CPU, memory, and disk stats back to the panel in real time, and handles server start, stop, and install.",
  },
  {
    q: "What's the difference between self-hosting and Struxa Cloud?",
    a: 'Self-hosting means you run the panel yourself alongside your nodes. Struxa Cloud lets you keep your own Wings nodes while we host and manage the panel for you, with backups, updates, and uptime included.',
  },
  {
    q: 'Can I migrate from Pterodactyl?',
    a: 'struxa runs Pterodactyl eggs as-is, so your server templates carry over directly. A full migration guide is on the roadmap: join the waitlist or check GitHub for the current status.',
  },
  {
    q: 'Do I need to know how to code to use struxa?',
    a: 'No. struxa is an operator-facing dashboard for managing servers, users, and nodes, and no coding is needed to run it day to day. Contributing to the codebase does need TypeScript.',
  },
];

export function FaqSection() {
  return (
    <section className="px-6 py-14">
      <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-14">
        <div>
          <p className="text-xs uppercase tracking-wide text-blue-500">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-neutral-50 md:text-4xl">
            Questions, answered.
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-400">
            Everything you need to know about running struxa yourself, or on
            Struxa Cloud.
          </p>
          <a
            href="https://discord.struxa.cloud"
            className="mt-6 inline-flex items-center gap-1.5 py-0.5 text-sm text-blue-400 transition-colors hover:text-blue-300 motion-reduce:transition-none"
          >
            Still stuck? Ask on Discord
            <ArrowRight className="size-3.5" />
          </a>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 px-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.03)]">
          <Accordion defaultValue={[0]} multiple>
            {FAQS.map((item) => (
              <AccordionItem key={item.q} className="border-neutral-800/70">
                <AccordionTrigger className="py-4.5">{item.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="leading-relaxed">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
