'use client';

import { Fragment, useMemo, useState } from 'react';

type FeatureValue = boolean | string;
type SoftwareId = 'pterodactyl' | 'pelican' | 'manual';

type Feature = {
  name: string;
  struxa: FeatureValue;
  competitors: Record<SoftwareId, FeatureValue>;
};

const SOFTWARE_OPTIONS: { id: SoftwareId; label: string; pitch: string }[] = [
  { id: 'pterodactyl', label: 'Pterodactyl', pitch: 'Legacy panel baseline' },
  { id: 'pelican', label: 'Pelican', pitch: 'Community-first fork baseline' },
  { id: 'manual', label: 'DIY stack', pitch: 'Build and maintain it yourself' },
];

const CATEGORIES: { name: string; features: Feature[] }[] = [
  {
    name: 'Core',
    features: [
      { name: 'Open source', struxa: 'MIT', competitors: { pterodactyl: 'Custom license', pelican: 'AGPL-3.0', manual: 'Varies' } },
      { name: 'Docker-isolated servers', struxa: true, competitors: { pterodactyl: true, pelican: true, manual: 'Custom setup' } },
      { name: 'Egg templates for game servers', struxa: true, competitors: { pterodactyl: true, pelican: true, manual: 'Manual import' } },
      { name: 'Security — 2FA, SSL, encryption', struxa: true, competitors: { pterodactyl: true, pelican: true, manual: 'Manual hardening' } },
      { name: 'Free to self-host', struxa: true, competitors: { pterodactyl: true, pelican: true, manual: true } },
    ],
  },
  {
    name: 'Business-ready',
    features: [
      { name: 'Built-in billing, wallet, subscriptions', struxa: true, competitors: { pterodactyl: false, pelican: false, manual: false } },
      { name: 'Launch paid plans without extra plugins', struxa: true, competitors: { pterodactyl: false, pelican: false, manual: false } },
      { name: 'Backup destinations — S3, Google Drive', struxa: true, competitors: { pterodactyl: false, pelican: false, manual: 'Extra tooling' } },
      { name: 'Custom domain and branding', struxa: true, competitors: { pterodactyl: true, pelican: true, manual: true } },
      { name: 'Internationalization', struxa: true, competitors: { pterodactyl: false, pelican: false, manual: 'Custom localization' } },
    ],
  },
  {
    name: 'Operations',
    features: [
      { name: 'One-line installer', struxa: true, competitors: { pterodactyl: false, pelican: false, manual: false } },
      { name: 'Real-time resource monitoring', struxa: true, competitors: { pterodactyl: true, pelican: true, manual: 'Multiple tools' } },
      { name: 'Managed cloud hosting path', struxa: 'Waitlist', competitors: { pterodactyl: false, pelican: false, manual: false } },
      { name: 'Integrated admin and customer experience', struxa: true, competitors: { pterodactyl: false, pelican: false, manual: false } },
    ],
  },
];

function Cell({ value, highlight }: { value: FeatureValue; highlight?: boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <svg viewBox="0 0 12 12" className={`mx-auto h-3.5 w-3.5 ${highlight ? 'text-blue-400' : 'text-neutral-500'}`}>
        <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ) : (
      <span className="text-neutral-700">—</span>
    );
  }
  return <span className={highlight ? 'text-blue-400' : 'text-neutral-400'}>{value}</span>;
}

export function SoftwareComparison() {
  const [selected, setSelected] = useState<SoftwareId>('pterodactyl');
  const selectedOption = useMemo(() => SOFTWARE_OPTIONS.find((option) => option.id === selected)!, [selected]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {SOFTWARE_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelected(option.id)}
              className={`border px-3 py-2 text-left transition-colors ${
                selected === option.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-neutral-800 bg-neutral-900/20 hover:bg-neutral-900'
              }`}
            >
              <p className={`font-mono text-[11px] uppercase tracking-wide ${selected === option.id ? 'text-blue-300' : 'text-neutral-400'}`}>
                {option.label}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-neutral-600">{option.pitch}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="py-3.5 pr-4 pl-0 text-left font-normal uppercase tracking-wide text-neutral-500">Feature</th>
              <th className="px-4 py-3.5 text-center font-normal uppercase tracking-wide text-blue-400">struxa</th>
              <th className="py-3.5 pr-0 pl-4 text-center font-normal uppercase tracking-wide text-neutral-500">
                {selectedOption.label}
              </th>
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((category) => (
              <Fragment key={category.name}>
                <tr className="border-b border-neutral-800 bg-neutral-900/40">
                  <td colSpan={3} className="py-2.5 pr-0 pl-0 text-neutral-300">
                    {category.name}
                  </td>
                </tr>
                {category.features.map((feature) => (
                  <tr key={feature.name} className="border-b border-neutral-800">
                    <td className="py-3 pr-4 pl-0 text-neutral-300">{feature.name}</td>
                    <td className="px-4 py-3 text-center">
                      <Cell value={feature.struxa} highlight />
                    </td>
                    <td className="py-3 pr-0 pl-4 text-center">
                      <Cell value={feature.competitors[selected]} />
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
