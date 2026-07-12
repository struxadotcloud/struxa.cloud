'use client';

import { useEffect, useState } from 'react';

const SHOTS = [
  { src: '/screenshots/console.png', label: 'Console' },
  { src: '/screenshots/files.png', label: 'File manager' },
  { src: '/screenshots/backups.png', label: 'Backups' },
  { src: '/screenshots/plugins.png', label: 'Plugins' },
  { src: '/screenshots/activity.png', label: 'Activity log' },
  { src: '/screenshots/settings.png', label: 'Settings' },
];

// actual screenshot aspect ratio (2492x1346) — matching it exactly means
// object-cover never has to crop into the UI
const RATIO = '2492 / 1346';

const INTERVAL = 3500;

export function ScreenshotGallery() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SHOTS.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <div className="border border-neutral-800 bg-neutral-950/60">
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="group relative block w-full overflow-hidden border-b border-neutral-800"
        style={{ aspectRatio: RATIO }}
      >
        {SHOTS.map((shot, i) => (
          <img
            key={shot.src}
            src={shot.src}
            alt={shot.label}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <span className="absolute inset-0 flex items-center justify-center bg-neutral-950/0 opacity-0 transition-all group-hover:bg-neutral-950/40 group-hover:opacity-100">
          <span className="border border-neutral-700 bg-neutral-950/80 px-3 py-1.5 font-mono text-xs text-neutral-200">
            Enlarge
          </span>
        </span>
      </button>

      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="font-mono text-xs text-neutral-400">{SHOTS[active]!.label}</span>
        <div className="flex gap-1.5">
          {SHOTS.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={shot.label}
              className={`h-1.5 w-4 transition-colors ${
                i === active ? 'bg-blue-500' : 'bg-neutral-800 hover:bg-neutral-700'
              }`}
            />
          ))}
        </div>
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 p-6"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close"
            className="absolute right-6 top-6 border border-neutral-700 bg-neutral-950/80 px-3 py-1.5 font-mono text-xs text-neutral-300 hover:bg-neutral-900"
          >
            Close ✕
          </button>
          <img
            src={SHOTS[active]!.src}
            alt={SHOTS[active]!.label}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full border border-neutral-800 object-contain"
          />
        </div>
      ) : null}
    </div>
  );
}
