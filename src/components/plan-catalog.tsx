'use client';

import { useState } from 'react';

const PLANS = [
  { name: 'Basic', price: 5, ram: '2 GB', cpu: '100%', slots: 10 },
  { name: 'Standard', price: 12, ram: '6 GB', cpu: '250%', slots: 30 },
  { name: 'Premium', price: 24, ram: '16 GB', cpu: '400%', slots: 100 },
];

export function PlanCatalog() {
  const [selected, setSelected] = useState(1);
  const plan = PLANS[selected]!;

  return (
    <div className="border border-neutral-800 bg-neutral-950/60">
      <div className="grid grid-cols-3 divide-x divide-neutral-800">
        {PLANS.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => setSelected(i)}
            className={`border-b-2 px-3 py-3 text-left transition-colors ${
              selected === i
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-transparent hover:bg-neutral-900'
            }`}
          >
            <p className="font-mono text-xs text-neutral-500">{p.name}</p>
            <p className="mt-1 font-display text-lg font-semibold text-neutral-50">
              ${p.price}
              <span className="text-xs font-normal text-neutral-500">/mo</span>
            </p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 divide-x divide-neutral-800 border-t border-neutral-800 font-mono text-[11px] text-neutral-400">
        {[
          ['RAM', plan.ram],
          ['CPU', plan.cpu],
          ['Slots', plan.slots],
        ].map(([label, value]) => (
          <div key={label} className="px-3 py-2.5">
            <p className="text-neutral-600">{label}</p>
            <p className="mt-0.5 text-neutral-200">{value}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-between border-t border-neutral-800 px-4 py-3 font-mono text-xs text-neutral-300 transition-colors hover:bg-neutral-900"
      >
        <span>Subscribe · {plan.name}</span>
        <span className="text-blue-400">checkout →</span>
      </button>
    </div>
  );
}
