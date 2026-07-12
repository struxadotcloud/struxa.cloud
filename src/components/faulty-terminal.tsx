'use client';

import { useEffect, useMemo, useRef } from 'react';
import { hexToRgb, runFaultyTerminal, type FaultyTerminalConfig, type Vec2 } from './faulty-terminal-gl';

export interface FaultyTerminalProps {
  scale?: number;
  gridMul?: Vec2;
  digitSize?: number;
  timeScale?: number;
  scanlineIntensity?: number;
  glitchAmount?: number;
  flickerAmount?: number;
  noiseAmp?: number;
  chromaticAberration?: number;
  dither?: number;
  curvature?: number;
  tint?: string;
  mouseReact?: boolean;
  mouseStrength?: number;
  brightness?: number;
  className?: string;
}

function supportsOffscreenWorker() {
  return (
    typeof Worker !== 'undefined' &&
    typeof OffscreenCanvas !== 'undefined' &&
    'transferControlToOffscreen' in HTMLCanvasElement.prototype
  );
}

export default function FaultyTerminal({
  scale = 1,
  gridMul = [2, 1],
  digitSize = 1.5,
  timeScale = 0.3,
  scanlineIntensity = 0.2,
  glitchAmount = 1,
  flickerAmount = 1,
  noiseAmp = 1,
  chromaticAberration = 0,
  dither = 0,
  curvature = 0.1,
  tint = '#3b82f6',
  mouseReact = false,
  mouseStrength = 0.2,
  brightness = 1,
  className,
}: FaultyTerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tintVec = useMemo(() => hexToRgb(tint), [tint]);

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    const config: FaultyTerminalConfig = {
      scale,
      gridMul,
      digitSize,
      timeScale,
      scanlineIntensity,
      glitchAmount,
      flickerAmount,
      noiseAmp,
      chromaticAberration,
      dither,
      curvature,
      tint: tintVec,
      mouseReact,
      mouseStrength,
      brightness,
    };

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    ctn.appendChild(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      if (worker) worker.postMessage({ type: 'mouse', x, y });
      else controller?.setMouse(x, y);
    };
    if (mouseReact) ctn.addEventListener('mousemove', handleMouseMove);

    let worker: Worker | undefined;
    let controller: ReturnType<typeof runFaultyTerminal> | undefined;
    let resizeObserver: ResizeObserver | undefined;

    // ponytail: preferred path — the entire GL setup (including the
    // KHR_parallel_shader_compile fallback's blocking status query on
    // renderers without it) runs on a worker thread via OffscreenCanvas, so
    // it structurally cannot freeze the page no matter how slow the
    // renderer is. Falls back to running on the main thread (still
    // non-blocking on capable renderers) where OffscreenCanvas transfer
    // isn't supported.
    if (supportsOffscreenWorker()) {
      const offscreen = canvas.transferControlToOffscreen();
      worker = new Worker(new URL('./faulty-terminal-worker.ts', import.meta.url), {
        type: 'module',
      });
      worker.postMessage(
        {
          type: 'init',
          canvas: offscreen,
          config,
          width: ctn.offsetWidth,
          height: ctn.offsetHeight,
        },
        [offscreen],
      );

      resizeObserver = new ResizeObserver(() => {
        worker?.postMessage({ type: 'resize', width: ctn.offsetWidth, height: ctn.offsetHeight });
      });
      resizeObserver.observe(ctn);
    } else {
      const gl = (canvas.getContext('webgl', { antialias: false, depth: false, stencil: false }) ??
        canvas.getContext('experimental-webgl', {
          antialias: false,
          depth: false,
          stencil: false,
        })) as WebGLRenderingContext | null;

      if (gl) {
        const RENDER_SCALE = gl.getExtension('KHR_parallel_shader_compile') ? 0.45 : 0.25;
        controller = runFaultyTerminal(gl, canvas, config);

        const resize = () => {
          controller?.resize(
            Math.max(1, Math.round(ctn.offsetWidth * RENDER_SCALE)),
            Math.max(1, Math.round(ctn.offsetHeight * RENDER_SCALE)),
          );
        };
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(ctn);
        resize();
      }
    }

    return () => {
      if (mouseReact) ctn.removeEventListener('mousemove', handleMouseMove);
      resizeObserver?.disconnect();
      if (worker) {
        worker.postMessage({ type: 'dispose' });
        worker.terminate();
      }
      controller?.dispose();
      if (canvas.parentElement === ctn) ctn.removeChild(canvas);
    };
  }, [
    scale,
    gridMul,
    digitSize,
    timeScale,
    scanlineIntensity,
    glitchAmount,
    flickerAmount,
    noiseAmp,
    chromaticAberration,
    dither,
    curvature,
    tintVec,
    mouseReact,
    mouseStrength,
    brightness,
  ]);

  return (
    <div ref={containerRef} className={`relative h-full w-full overflow-hidden ${className ?? ''}`} />
  );
}
