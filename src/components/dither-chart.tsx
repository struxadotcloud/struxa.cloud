'use client';

import { useEffect, useRef } from 'react';

// ponytail: dither-kit's shadcn registry (tripwire.sh/r/*.json) was 500ing
// when this was built, so this is a small hand-rolled ordered-dither canvas
// fill instead of pulling in the real component.
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

function drawDitherArea(
  ctx: CanvasRenderingContext2D,
  values: number[],
  w: number,
  h: number,
  color: string,
) {
  const max = Math.max(...values);
  const step = w / (values.length - 1);

  ctx.clearRect(0, 0, w, h);

  const path = new Path2D();
  path.moveTo(0, h);
  values.forEach((v, i) => path.lineTo(i * step, h - (v / max) * h));
  path.lineTo(w, h);
  path.closePath();

  ctx.save();
  ctx.clip(path);

  const cell = 3;
  for (let y = 0; y < h; y += cell) {
    for (let x = 0; x < w; x += cell) {
      const threshold = (BAYER_4X4[(y / cell) % 4]![(x / cell) % 4]! + 0.5) / 16;
      const fade = 1 - y / h;
      if (fade > threshold) {
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.35 + fade * 0.4;
        ctx.fillRect(x, y, cell - 1, cell - 1);
      }
    }
  }
  ctx.restore();
  ctx.globalAlpha = 1;

  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  values.forEach((v, i) => {
    const px = i * step;
    const py = h - (v / max) * h;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.stroke();
}

export function DitherChart({
  values,
  color = '#3b82f6',
  className = 'h-10 w-full',
}: {
  values: number[];
  color?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    drawDitherArea(ctx, values, width, height, color);
  }, [values, color]);

  return <canvas ref={canvasRef} className={className} />;
}
