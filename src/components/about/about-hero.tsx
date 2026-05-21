"use client";

import { PaintedUnderline } from "@/components/ui/painted-underline";
import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="bg-background relative overflow-hidden">
      <div className="px-6 pt-24 pb-20">
        <h1 className="mb-8 max-w-4xl text-5xl font-bold leading-[1.06] tracking-tight text-foreground md:text-6xl lg:text-[4.5rem]">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The panel built for
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            <PaintedUnderline delay={0.5}>modern game server operators</PaintedUnderline>
          </motion.span>
        </h1>

        <motion.p
          className="text-base text-muted-foreground leading-relaxed max-w-md md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          Struxa is an open-source game server management panel built to replace Pterodactyl — modern stack, dark UI, fully self-hosted.
        </motion.p>
      </div>

      {/* Decorative bottom rule with animated gradient fill */}
      <motion.div
        className="absolute bottom-0 left-6 right-0 h-px bg-border origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      />
    </section>
  );
}
