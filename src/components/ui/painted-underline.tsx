"use client";

import { motion } from "motion/react";

interface PaintedUnderlineProps {
  children: React.ReactNode;
  delay?: number;
}

export function PaintedUnderline({ children, delay = 0.4 }: PaintedUnderlineProps) {
  return (
    <span className="relative inline-block text-foreground">
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-2 left-0 right-0 h-[10px] pointer-events-none overflow-visible"
      >
        <motion.svg
          viewBox="0 0 200 10"
          preserveAspectRatio="none"
          className="w-full h-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Main brush stroke */}
          <motion.path
            d="M1,6 C25,2 55,9 90,5 C125,1 155,8 199,5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
          />
          {/* Slightly offset second stroke for painted thickness variation */}
          <motion.path
            d="M1,8 C30,5 60,10 95,7 C130,4 158,9 199,7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.4"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.7, delay: delay + 0.05, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
          />
        </motion.svg>
      </span>
    </span>
  );
}
