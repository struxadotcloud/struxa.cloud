"use client";

import { motion } from "motion/react";
import { BookOpen, Palette, DollarSign, Rocket } from "lucide-react";
import { useState, useEffect } from "react";

const steps = [
  { icon: BookOpen, label: "Add a node" },
  { icon: Palette, label: "Configure allocations" },
  { icon: DollarSign, label: "Deploy a server" },
  { icon: Rocket, label: "Monitor & manage" },
] as const;

export function VisualWorkflowBuilder() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-base font-medium text-card-foreground mb-1">
          From setup to running servers
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A typical deployment flow inside Struxa.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="relative pl-6">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

          <div className="space-y-5">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i === activeStep;
              const isPast = i < activeStep;
              return (
                <motion.div
                  key={i}
                  className="relative flex items-center gap-3"
                  animate={{ opacity: isActive || isPast ? 1 : 0.35 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Dot */}
                  <div
                    className={`absolute -left-6 size-3.5 rounded-full border transition-all duration-300 ${
                      isActive
                        ? "bg-foreground border-foreground"
                        : isPast
                          ? "bg-foreground/30 border-foreground/30"
                          : "bg-background border-border"
                    }`}
                  />
                  <Icon
                    className={`size-4 shrink-0 transition-colors duration-300 ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      isActive ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
