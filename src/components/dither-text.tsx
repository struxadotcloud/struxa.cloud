'use client';

import { useEffect, useRef } from 'react';

// ponytail: single canvas covers the whole card. Baseline is "MIT" flickering
// in sparse accent-dithered dots (same grain as dither-chart.tsx). Moving the
// mouse paints a dithered accent trail across the card; where that trail
// crosses the glyphs, they cut back to the card's background color — a
// highlighter revealing negative space where the letters read as a dark
// cutout inside the solid highlight.
// Resizes on a ResizeObserver, not just once at mount, because the grid row
// this card sits in doesn't reach its final stretched height until sibling
// content (screenshots, fonts) finishes loading.
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const TEXT = 'MIT';
const ACCENT = '#3b82f6';
const BG = '#0a0a0a';
const CHAR_OFFSET = [0, -0.14, 0.1];
const CELL = 3;
const FRAME_INTERVAL = 1000 / 10;
const RADIUS_RATIO = 0.32; // fraction of card's larger dimension

export function DitherText({ className = 'absolute inset-0' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let cancelled = false;

    let devW = 0;
    let devH = 0;
    let radiusPx = 0;
    let cellPx = 0;
    let maskData: Uint8ClampedArray | null = null;

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      devW = Math.max(1, Math.round(width * dpr));
      devH = Math.max(1, Math.round(height * dpr));
      canvas.width = devW;
      canvas.height = devH;

      cellPx = CELL * dpr;
      radiusPx = Math.max(devW, devH) * RADIUS_RATIO;
      // heading + description occupy the top ~40% of the card, so center
      // the badge in the remaining space below them rather than the full box
      const textCenterY = devH * 0.65;

      const mask = document.createElement('canvas');
      mask.width = devW;
      mask.height = devH;
      const mctx = mask.getContext('2d')!;
      const fontSize = devH * 0.3;
      mctx.font = `700 ${fontSize}px 'Funnel Display', sans-serif`;
      mctx.textBaseline = 'middle';
      mctx.fillStyle = '#fff';

      const gap = fontSize * 0.08;
      const widths = TEXT.split('').map((c) => mctx.measureText(c).width);
      const totalWidth = widths.reduce((a, b) => a + b, 0) + gap * (TEXT.length - 1);
      let cursor = (devW - totalWidth) / 2;
      TEXT.split('').forEach((char, i) => {
        const offsetY = (CHAR_OFFSET[i % CHAR_OFFSET.length] ?? 0) * fontSize;
        mctx.fillText(char, cursor, textCenterY + offsetY);
        cursor += widths[i]! + gap;
      });
      maskData = mctx.getImageData(0, 0, devW, devH).data;
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      mouseRef.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr,
      };
    };
    const onLeave = () => {
      mouseRef.current = null;
    };
    // listen on the parent, not the canvas: the heading/description sit in a
    // higher z-index sibling above the canvas, so pointer events over that
    // text never reach a listener on the canvas itself — they still bubble
    // up to the shared parent, though.
    const hoverTarget = canvas.parentElement ?? canvas;
    hoverTarget.addEventListener('pointermove', onMove);
    hoverTarget.addEventListener('pointerleave', onLeave);

    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(canvas);

    // ponytail: the per-cell dither loop is real main-thread work every
    // frame — running it off-screen (card is far below the fold) stole
    // cycles from initial hydration and made the page feel laggy right
    // after load. Only animate while the card is actually visible.
    let visible = false;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    document.fonts.ready.then(() => {
      if (cancelled) return;
      layout();

      let lastFrame = 0;

      const draw = (t: number) => {
        rafId = requestAnimationFrame(draw);
        if (!visible) return;
        if (t - lastFrame < FRAME_INTERVAL) return;
        lastFrame = t;
        if (!maskData) return;

        ctx.clearRect(0, 0, devW, devH);
        const mouse = mouseRef.current;

        for (let y = 0; y < devH; y += cellPx) {
          for (let x = 0; x < devW; x += cellPx) {
            const maskIdx = (y * devW + x) * 4;
            const isGlyph = maskData[maskIdx + 3]! > 60;

            const dist = mouse ? Math.hypot(x - mouse.x, y - mouse.y) : Infinity;
            const inRadius = dist < radiusPx;

            const bayerY = Math.floor(y / cellPx) % 4;
            const bayerX = Math.floor(x / cellPx) % 4;
            const threshold = (BAYER_4X4[bayerY]![bayerX]! + 0.5) / 16;

            if (isGlyph && inRadius) {
              ctx.fillStyle = BG;
              ctx.globalAlpha = 1;
              ctx.fillRect(x, y, cellPx - 0.6, cellPx - 0.6);
              continue;
            }

            if (isGlyph) {
              const noisy = 0.6 + (Math.random() - 0.5) * 0.7;
              if (noisy > threshold) {
                ctx.fillStyle = ACCENT;
                ctx.globalAlpha = 0.55 + Math.random() * 0.45;
                ctx.fillRect(x, y, cellPx - 0.6, cellPx - 0.6);
              }
              continue;
            }

            if (inRadius) {
              const proximity = 1 - dist / radiusPx;
              const noisy = proximity * 0.9 + (Math.random() - 0.5) * 0.4;
              if (noisy > threshold) {
                ctx.fillStyle = ACCENT;
                ctx.globalAlpha = 0.25 + proximity * 0.6 + Math.random() * 0.15;
                ctx.fillRect(x, y, cellPx - 0.6, cellPx - 0.6);
              }
            }
          }
        }
        ctx.globalAlpha = 1;
      };
      rafId = requestAnimationFrame(draw);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      hoverTarget.removeEventListener('pointermove', onMove);
      hoverTarget.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
