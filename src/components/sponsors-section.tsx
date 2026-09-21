import { Heart } from 'lucide-react';

const UTM = 'utm_source=struxa&utm_medium=referral&utm_campaign=sponsors';

const SPONSORS = [
  {
    name: 'psHost',
    logo: '/assets/psHost.png',
    href: `https://pshost.pl?${UTM}`,
    line: 'Game server hosting',
  },
  {
    name: 'elean',
    logo: '/assets/elean.png',
    href: `https://elean.app?${UTM}`,
    line: 'Task management',
  },
];

// Warm thank-you close: the page ends by crediting the people who keep the
// project free, and invites the reader to do the same.
export function SponsorsSection() {
  return (
    <section aria-label="Sponsors" className="px-6 py-10">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-50 sm:text-3xl">
          Built in the open, backed by friends.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          struxa is free and MIT-licensed, and it stays that way thanks to the
          people below. Thank you for keeping the lights on.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {SPONSORS.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group flex flex-col items-center gap-2.5 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.03)] transition-colors hover:border-blue-500/30 motion-reduce:transition-none"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-8 w-auto object-contain opacity-80 transition-opacity group-hover:opacity-100 motion-reduce:transition-none"
              />
              <span className="text-xs text-neutral-500">{sponsor.line}</span>
            </a>
          ))}
        </div>

        <a
          href="mailto:admin@disasterlimited.tech"
          className="mt-8 inline-flex items-center gap-1.5 text-sm text-blue-400 transition-colors hover:text-blue-300 motion-reduce:transition-none"
        >
          <Heart className="size-3.5" />
          Back struxa as a sponsor
        </a>
      </div>
    </section>
  );
}
