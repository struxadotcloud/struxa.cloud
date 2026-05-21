"use client";

import { motion } from "motion/react";
import { Server, Settings2, Rocket, Activity } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  { icon: Server, label: "Add your node" },
  { icon: Settings2, label: "Configure allocations" },
  { icon: Rocket, label: "Deploy servers" },
  { icon: Activity, label: "Monitor live" },
];

export function VisualFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-base font-medium text-card-foreground">
        How it works
      </h3>

      <div className="flex-1 flex items-center min-h-[120px]">
        <div className="relative w-full flex items-start">
          {/* Background connector line — spans between first and last circle centers */}
          <div className="absolute top-4 left-[12.5%] right-[12.5%] h-px bg-border" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            const isPast = index < activeStep;

            return (
              <div key={index} className="relative flex-1 flex flex-col items-center gap-2">
                <motion.div
                  className={`size-8 rounded-full border flex items-center justify-center z-10 bg-background transition-all duration-300 ${
                    isActive
                      ? "border-foreground bg-foreground"
                      : isPast
                        ? "border-foreground/20"
                        : "border-border"
                  }`}
                  animate={{ scale: isActive ? 1.08 : 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <Icon
                    className={`size-3.5 transition-colors duration-300 ${
                      isActive
                        ? "text-background"
                        : isPast
                          ? "text-foreground/40"
                          : "text-muted-foreground/40"
                    }`}
                  />
                </motion.div>
                <span
                  className={`text-[11px] text-center leading-tight max-w-14 transition-colors duration-300 ${
                    isActive ? "text-foreground font-medium" : "text-muted-foreground/50"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
