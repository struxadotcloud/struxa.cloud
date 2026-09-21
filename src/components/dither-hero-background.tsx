'use client';

import { lazy, Suspense, useEffect, useState } from 'react';

const DitheredWaves = lazy(() =>
  import('ditherwave').then((m) => ({ default: m.DitheredWaves })),
);

// Bayer-dithered hero card texture (ditherwave, WebGL2). The card keeps a CSS
// navy gradient underneath, so there is no flash while the chunk loads, when
// WebGL2 is unavailable, or under prefers-reduced-motion (animation off).
export function DitherHeroBackground({
  className = 'absolute inset-0 overflow-hidden rounded-[inherit]',
}: {
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className={className} aria-hidden>
      <Suspense fallback={null}>
        <DitheredWaves
          className="h-full w-full"
          waveColor="#3b82f6"
          baseColor="#0e1c3c"
          pixelSize={3}
          colorNum={4}
          matrixSize={8}
          waveSpeed={0.025}
          waveFrequency={2.2}
          waveAmplitude={0.4}
          enableMouseInteraction={!reduce}
          disableAnimation={reduce}
        />
      </Suspense>
    </div>
  );
}
