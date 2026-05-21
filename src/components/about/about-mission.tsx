"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    key: "creatorSuccess",
    title: "Open Source First",
    description: "Everything we build is open-source. You can inspect, fork, and contribute. No black boxes, no lock-in.",
  },
  {
    key: "simplicity",
    title: "Built for Operators",
    description: "Every feature is designed for people who manage game servers. Clean UI, sensible defaults, no enterprise fluff.",
  },
  {
    key: "growth",
    title: "Developer Friendly",
    description: "Modern TypeScript stack, type-safe API layer, and clean architecture that makes contributing a pleasure.",
  },
] as const;

export function AboutMission() {
  return (
    <section className="border-t border-border bg-background py-28 md:py-32">
      <div className="px-6">
        {/* Section header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.h2
            className="text-4xl font-bold tracking-tight text-foreground md:text-5xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-base text-muted-foreground leading-relaxed max-w-sm"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            We believe game server operators deserve a modern, maintained panel without the baggage of aging software. Our mission is to make game server management as clean and reliable as the games running on it.
          </motion.p>
        </div>

        {/* Numbered rows */}
        <div>
          {pillars.map((pillar, i) => (
            <div key={pillar.key}>
              {/* Animated separator line */}
              <motion.div
                className="h-px bg-border"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ transformOrigin: "left" }}
              />

              {/* Row */}
              <motion.div
                className="flex items-start gap-8 py-10 md:gap-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true }}
              >
                {/* Number */}
                <span className="text-6xl font-bold text-foreground/8 tabular-nums select-none flex-shrink-0 leading-none mt-1 md:text-8xl">
                  0{i + 1}
                </span>

                {/* Content */}
                <div className="flex-1 flex flex-col md:flex-row md:items-start md:gap-12">
                  <h3 className="text-xl font-semibold text-foreground mb-2 md:mb-0 md:w-48 flex-shrink-0">
                    {pillar.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}

          {/* Final line */}
          <motion.div
            className="h-px bg-border"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
}
