"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Server, Cloud } from "lucide-react";

const OPTIONS = [
  {
    key: "self",
    label: "Self-Hosted",
    sub: "Your infrastructure. Your rules.",
    icon: Server,
    accent: "#7aad5a",
    glow: "rgba(122,173,90,0.06)",
    badge: "Available now",
  },
  {
    key: "cloud",
    label: "Struxa Cloud",
    sub: "Panel hosted by us. Bring your own nodes.",
    icon: Cloud,
    accent: "#6b9fd4",
    glow: "rgba(107,159,212,0.06)",
    badge: "Coming soon",
  },
] as const;

type Key = "self" | "cloud";

export function LanguageShowcase() {
  const [active, setActive] = useState<Key>("self");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const iv = setInterval(() => setActive((p) => (p === "self" ? "cloud" : "self")), 3500);
    return () => clearInterval(iv);
  }, []);

  if (!mounted) return null;

  const opt = OPTIONS.find((o) => o.key === active)!;

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-base font-medium text-card-foreground mb-3 flex-shrink-0">
        Deploy your way
      </h3>

      {/* Single card */}
      <div className="flex-1 relative overflow-hidden rounded-xl border border-border min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col p-4"
            style={{ backgroundColor: opt.glow }}
          >
            {/* Icon + badge row */}
            <div className="flex items-start justify-between mb-3">
              <div
                className="size-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${opt.accent}18` }}
              >
                <opt.icon className="size-4.5" style={{ color: opt.accent }} />
              </div>
              <span
                className="text-[9px] font-semibold rounded-full px-2 py-0.5 mt-0.5"
                style={{ color: opt.accent, backgroundColor: `${opt.accent}18` }}
              >
                {opt.badge}
              </span>
            </div>

            {/* Label */}
            <p className="text-sm font-bold text-foreground leading-tight">{opt.label}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{opt.sub}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Line indicators */}
      <div className="flex gap-1.5 mt-3 flex-shrink-0">
        {OPTIONS.map((o) => (
          <button
            key={o.key}
            onClick={() => setActive(o.key)}
            className="h-0.5 flex-1 rounded-full transition-all duration-400 overflow-hidden relative"
            style={{ backgroundColor: "rgba(128,128,128,0.2)" }}
          >
            {active === o.key && (
              <motion.span
                layoutId="line-indicator"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: opt.accent }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
