'use client';

import { lazy, Suspense, useEffect, useState } from 'react';

const FaultyTerminal = lazy(() => import('./faulty-terminal'));

export function DitherBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sideMask =
    'linear-gradient(to right, black 0, black calc(50% - 36rem), transparent calc(50% - 36rem), transparent calc(50% + 36rem), black calc(50% + 36rem), black 100%)';

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.15]"
      style={{ maskImage: sideMask, WebkitMaskImage: sideMask }}
    >
      <Suspense fallback={null}>
        <FaultyTerminal
          tint="#3b82f6"
          scale={1.4}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.25}
          scanlineIntensity={0.15}
          glitchAmount={0.6}
          flickerAmount={0.6}
          noiseAmp={0.8}
          curvature={0}
          brightness={0.6}
          mouseReact={false}
        />
      </Suspense>
    </div>
  );
}
