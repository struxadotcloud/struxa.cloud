"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  id?: string;
  size?: "sm" | "md" | "lg" | "xl";
  background?: "gradient" | "solid" | "pattern";
  compact?: boolean;
}

export function BentoCard({
  children,
  className,
  id,
  size = "sm",
  background = "solid",
  compact = false,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      id={id}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-200 hover:shadow-sm",
        className,
      )}
    >
      <div className="relative z-10 h-full p-4 flex flex-col">{children}</div>
    </motion.div>
  );
}
