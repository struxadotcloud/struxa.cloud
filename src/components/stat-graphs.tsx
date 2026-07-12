'use client';

import { useEffect, useState } from 'react';
import { DitherChart } from './dither-chart';

const METRICS = [
  { label: 'CPU', color: '#3b82f6', history: [22, 28, 24, 31, 27, 35, 30, 26, 33, 29, 24, 34] },
  { label: 'Memory', color: '#f59e0b', history: [58, 60, 57, 62, 59, 63, 61, 58, 60, 64, 59, 62] },
  { label: 'Disk', color: '#10b981', history: [41, 41, 42, 42, 43, 43, 44, 44, 44, 45, 45, 46] },
];

function jitter(history: number[]) {
  const last = history[history.length - 1]!;
  const next = Math.min(96, Math.max(4, last + (Math.random() * 8 - 4)));
  return [...history.slice(1), next];
}

export function StatGraphs() {
  const [series, setSeries] = useState(() => METRICS.map((m) => m.history));

  useEffect(() => {
    const id = setInterval(() => {
      setSeries((prev) => prev.map(jitter));
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-1 divide-y divide-neutral-800 border-t border-neutral-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {METRICS.map((metric, i) => (
        <div key={metric.label} className="overflow-hidden pt-4">
          <p className="px-4 font-mono text-[11px] uppercase tracking-wide text-neutral-500">
            {metric.label}
          </p>
          <p className="mt-1 px-4 font-mono text-lg text-neutral-100">
            {Math.round(series[i]![series[i]!.length - 1]!)}%
          </p>
          <div className="mt-3">
            <DitherChart values={series[i]!} color={metric.color} className="block h-12 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
