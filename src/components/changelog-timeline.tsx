'use client';

import { useState } from 'react';
import { CHANGELOG, formatChangelogDate } from '../data/changelog';

const PAGE_SIZE = 3;

const TYPE_STYLES = {
  major: { label: 'Major', className: 'border-blue-500/40 bg-blue-500/10 text-blue-400' },
  minor: { label: 'Minor', className: 'border-neutral-700 bg-neutral-800/60 text-neutral-300' },
  patch: { label: 'Patch', className: 'border-neutral-800 bg-neutral-900 text-neutral-500' },
} as const;

export function ChangelogTimeline() {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(CHANGELOG.length / PAGE_SIZE);
  const entries = CHANGELOG.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div>
      <div className="flex flex-col">
        {entries.map((entry, i) => {
          const type = TYPE_STYLES[entry.type];
          const isLast = i === entries.length - 1 && page === pageCount - 1;
          return (
            <div
              key={entry.version}
              className={`relative border-l border-neutral-800 pl-8 ${isLast ? 'pb-2' : 'pb-16'}`}
            >
              <div className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full border-2 border-blue-500 bg-neutral-950" />

              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-neutral-500">{formatChangelogDate(entry.date)}</span>
                <span className="rounded-md border border-neutral-800 px-2 py-0.5 font-mono text-[11px] text-neutral-300">
                  {entry.version}
                </span>
                <span className={`rounded-md border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide ${type.className}`}>
                  {type.label}
                </span>
              </div>

              <a
                href={`https://github.com/struxadotcloud/struxa/releases/tag/${entry.version}`}
                target="_blank"
                rel="noreferrer"
                className="group mt-3 inline-flex items-center gap-2"
              >
                <h2 className="font-display text-2xl font-semibold text-neutral-50 transition-colors group-hover:text-blue-400 md:text-3xl">
                  {entry.title}
                </h2>
                <span className="text-neutral-600 transition-colors group-hover:text-blue-400">↗</span>
              </a>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">{entry.description}</p>

              <ul className="mt-5 flex max-w-2xl flex-col gap-2">
                {entry.changes.map((change) => (
                  <li key={change} className="flex items-start gap-2.5 font-mono text-[11px] text-neutral-400">
                    <svg viewBox="0 0 12 12" className="mt-0.5 h-3 w-3 shrink-0 text-blue-500">
                      <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                    <span className="leading-relaxed">{change}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-neutral-800 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {pageCount > 1 ? (
        <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-6">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="font-mono text-xs uppercase tracking-wide text-neutral-400 transition-colors hover:text-neutral-100 disabled:pointer-events-none disabled:opacity-30"
          >
            ← Newer
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === page ? 'bg-blue-500' : 'bg-neutral-700 hover:bg-neutral-600'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={page === pageCount - 1}
            className="font-mono text-xs uppercase tracking-wide text-neutral-400 transition-colors hover:text-neutral-100 disabled:pointer-events-none disabled:opacity-30"
          >
            Older →
          </button>
        </div>
      ) : null}
    </div>
  );
}
