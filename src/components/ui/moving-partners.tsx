"use client";

import { useMotionValue, useAnimationFrame, motion } from "motion/react";
import { useRef } from "react";

const CONTAINERS = [
  { x: -38, y: -22, size: 10, duration: 3.2, phase: 0.0, opacity: 0.18 },
  { x:  32, y: -28, size:  8, duration: 3.8, phase: 1.1, opacity: 0.13 },
  { x: -28, y:  26, size:  7, duration: 4.1, phase: 2.2, opacity: 0.15 },
  { x:  36, y:  20, size: 11, duration: 3.5, phase: 0.8, opacity: 0.12 },
  { x:   4, y: -38, size:  6, duration: 4.4, phase: 1.7, opacity: 0.10 },
  { x:  -8, y:  38, size:  9, duration: 3.9, phase: 3.0, opacity: 0.14 },
];

function Floater({
  children,
  duration,
  phase = 0,
  amplitude = 6,
  className,
  style,
}: {
  children?: React.ReactNode;
  duration: number;
  phase?: number;
  amplitude?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const y = useMotionValue(0);

  useAnimationFrame((t) => {
    y.set(Math.sin((t / 1000 / duration) * Math.PI * 2 + phase) * amplitude);
  });

  return (
    <motion.div className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}

export function MovingPartners() {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-base font-medium text-card-foreground leading-tight">
        We run anything
      </h3>
      <p className="text-xs text-muted-foreground mt-1">
        Wings + Docker. Any game, any stack.
      </p>

      <div className="flex-1 flex items-center justify-center relative min-h-0">
        <div
          className="absolute size-24 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: "rgba(30,130,200,0.12)" }}
        />

        {CONTAINERS.map((c, i) => (
          <Floater
            key={i}
            duration={c.duration}
            phase={c.phase}
            amplitude={5}
            className="absolute rounded-sm border"
            style={{
              width: c.size,
              height: c.size,
              left: `calc(50% + ${c.x}px)`,
              top: `calc(50% + ${c.y}px)`,
              borderColor: `rgba(30,130,200,${c.opacity * 1.8})`,
              backgroundColor: `rgba(30,130,200,${c.opacity})`,
            }}
          />
        ))}

        <Floater duration={3.6} amplitude={7} className="relative">
          <img
            src="https://cdn.simpleicons.org/docker"
            alt="Docker"
            className="w-14 h-14 object-contain"
            style={{ filter: "brightness(0.75) saturate(0.9)" }}
          />
        </Floater>
      </div>
    </div>
  );
}
