"use client";

import { cn } from "@/lib/utils";
import React from "react";

type GradientDitherProps = {
  className?: string;
  /** Opacity multiplier, default 0.022 */
  strength?: number;
  /** Fade top/bottom edges to avoid section seams */
  fadeEdges?: boolean;
  /**
   * Blend mode to use; overlay works well on dark themes.
   * Try soft-light if overlay is too strong.
   */
  blendMode?: React.CSSProperties["mixBlendMode"];
};

/**
 * Lightweight grain overlay to reduce visible gradient banding.
 * Uses inline SVG noise as background-image for broad blend support.
 * Place inside a relatively positioned parent.
 */
export function GradientDither({
  className,
  strength = 0.022,
  fadeEdges = true,
  blendMode = "soft-light",
}: GradientDitherProps) {
  const clamped = Math.max(0, Math.min(0.06, strength));
  const edgeMask =
    "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)";
  const svg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">` +
      `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" seed="11"/><feColorMatrix type="saturate" values="0"/></filter>` +
      `<rect width="100%" height="100%" filter="url(#n)"/></svg>`,
  );
  const dataUrl = `url("data:image/svg+xml,${svg}")`;
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
      style={{
        mixBlendMode: blendMode,
        opacity: clamped,
        ...(fadeEdges
          ? {
              WebkitMaskImage: edgeMask,
              maskImage: edgeMask,
            }
          : {}),
        backgroundImage: dataUrl,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}

export default GradientDither;
