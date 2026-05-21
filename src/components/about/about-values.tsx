"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Layers, Users } from "lucide-react";

const values = [
  {
    key: "creatorFirst",
    Icon: Heart,
    title: "Open Source",
    description: "The codebase is yours. We build in public, accept contributions, and never lock you in.",
  },
  {
    key: "reliability",
    Icon: Shield,
    title: "Reliability",
    description: "Game servers run 24/7. Your panel should too. We build for uptime, not just features.",
  },
  {
    key: "simplicity",
    Icon: Layers,
    title: "Simplicity",
    description: "If a feature needs a manual to explain it, we simplify it until it doesn't.",
  },
  {
    key: "accessibility",
    Icon: Users,
    title: "Transparency",
    description: "Open roadmap, open development. No surprises in what we're building or why.",
  },
] as const;

export function AboutValues() {
  return (
    <section className="border-t border-border bg-background py-28 md:py-32">
      <div className="px-6">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl mb-4">
            Our Values
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md">
            The principles behind every decision we make.
          </p>
        </motion.div>

        {/* Divided columns — no card backgrounds */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {values.map(({ key, Icon, title, description }, i) => (
            <motion.div
              key={key}
              className="py-8 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 md:border-l border-border first:border-0 md:first:border-l-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <Icon className="size-5 text-foreground mb-5" aria-hidden="true" strokeWidth={1.5} />
              <h3 className="text-sm font-semibold text-foreground mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
