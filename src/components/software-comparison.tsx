'use client';

import { useMemo, useState } from 'react';

type FeatureValue = boolean | string;
type SoftwareId = 'pterodactyl' | 'pelican' | 'manual';

type AtAGlanceRow = {
  label: string;
  struxa: FeatureValue;
  competitors: Record<SoftwareId, FeatureValue>;
};

const SOFTWARE_OPTIONS: { id: SoftwareId; label: string; subtitle: string }[] = [
  { id: 'pterodactyl', label: 'Pterodactyl', subtitle: 'Classic panel baseline' },
  { id: 'pelican', label: 'Pelican', subtitle: 'Fork baseline' },
  { id: 'manual', label: 'DIY stack', subtitle: 'Assemble everything yourself' },
];

const AT_A_GLANCE_ROWS: AtAGlanceRow[] = [
  { label: 'Open-source self-hosting', struxa: true, competitors: { pterodactyl: true, pelican: true, manual: true } },
  { label: 'Built-in billing and subscriptions', struxa: true, competitors: { pterodactyl: false, pelican: false, manual: false } },
  { label: 'Customer storefront included', struxa: true, competitors: { pterodactyl: false, pelican: false, manual: false } },
  { label: 'Wallet and credit workflow', struxa: true, competitors: { pterodactyl: false, pelican: false, manual: false } },
  { label: 'One-line install flow', struxa: true, competitors: { pterodactyl: false, pelican: false, manual: false } },
  {
    label: 'Operational overhead',
    struxa: 'Low',
    competitors: { pterodactyl: 'Medium', pelican: 'Medium', manual: 'High' },
  },
  {
    label: 'Best fit',
    struxa: 'Panels + business in one stack',
    competitors: {
      pterodactyl: 'Panel-only setup',
      pelican: 'Panel-only setup',
      manual: 'Custom architecture teams',
    },
  },
];

function Cell({ value, highlight, align = 'center' }: { value: FeatureValue; highlight?: boolean; align?: 'center' | 'left' }) {
  if (typeof value === 'boolean') {
    return value ? (
      <svg viewBox="0 0 12 12" className={`h-3.5 w-3.5 ${align === 'center' ? 'mx-auto' : ''} ${highlight ? 'text-blue-400' : 'text-neutral-500'}`}>
        <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ) : (
      <span className="text-neutral-700">—</span>
    );
  }
  return <span className={`${highlight ? 'text-blue-300' : 'text-neutral-300'} ${align === 'left' ? 'text-left' : ''}`}>{value}</span>;
}

export function SoftwareComparison() {
  const [selected, setSelected] = useState<SoftwareId>('pterodactyl');
  const selectedOption = useMemo(() => SOFTWARE_OPTIONS.find((option) => option.id === selected)!, [selected]);
  const wins = useMemo(
    () =>
      AT_A_GLANCE_ROWS.reduce((count, row) => {
        const competitorValue = row.competitors[selected];
        return count + Number(row.struxa === true && competitorValue === false);
      }, 0),
    [selected]
  );

  return (
    <>
      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-neutral-500">At a glance</p>
          <h3 className="mt-1 text-lg font-semibold text-neutral-50">Choose software to compare against struxa</h3>
        </div>
        <div className="inline-flex rounded-lg border border-neutral-800 bg-neutral-950 p-1">
          {SOFTWARE_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelected(option.id)}
              className={`rounded-md px-3 py-2 text-left transition-colors ${
                selected === option.id
                  ? 'bg-blue-500/20 text-blue-300'
                  : 'text-neutral-400 hover:bg-neutral-900'
              }`}
            >
              <p className="font-mono text-[11px] uppercase tracking-wide">{option.label}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <div className="border border-blue-500/40 bg-blue-500/5 px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-wide text-blue-300">struxa edge</p>
          <p className="mt-1 font-display text-2xl text-neutral-50">{wins} rows</p>
          <p className="mt-1 text-[11px] text-neutral-400">Where struxa provides built-in capabilities and {selectedOption.label} does not.</p>
        </div>
        <div className="border border-neutral-800 bg-neutral-900/30 px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-wide text-neutral-500">Compared software</p>
          <p className="mt-1 font-display text-xl text-neutral-100">{selectedOption.label}</p>
          <p className="mt-1 text-[11px] text-neutral-500">{selectedOption.subtitle}</p>
        </div>
        <div className="border border-neutral-800 bg-neutral-900/30 px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-wide text-neutral-500">Comparison mode</p>
          <p className="mt-1 font-display text-xl text-neutral-100">At-a-glance</p>
          <p className="mt-1 text-[11px] text-neutral-500">Focused on setup speed, business features, and ongoing operations.</p>
        </div>
      </div>

      <div className="overflow-x-auto border-y border-neutral-800">
        <table className="w-full min-w-[680px] border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="px-4 py-3.5 text-left font-normal uppercase tracking-wide text-neutral-500 md:px-6">Category</th>
              <th className="px-4 py-3.5 text-center font-normal uppercase tracking-wide text-blue-400 md:px-6">struxa</th>
              <th className="px-4 py-3.5 text-center font-normal uppercase tracking-wide text-neutral-500 md:px-6">
                {selectedOption.label}
              </th>
            </tr>
          </thead>
          <tbody>
            {AT_A_GLANCE_ROWS.map((row) => (
              <tr key={row.label} className="border-b border-neutral-800 last:border-b-0">
                <td className="px-4 py-3 text-neutral-300 md:px-6">{row.label}</td>
                <td className="px-4 py-3 text-center md:px-6">
                  <Cell value={row.struxa} highlight align={typeof row.struxa === 'boolean' ? 'center' : 'left'} />
                </td>
                <td className="px-4 py-3 text-center md:px-6">
                  <Cell
                    value={row.competitors[selected]}
                    align={typeof row.competitors[selected] === 'boolean' ? 'center' : 'left'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
