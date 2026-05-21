"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PaintedUnderline } from "@/components/ui/painted-underline";

export function CTA() {
  return (
    <section className="border-t border-border bg-background py-28 md:py-36">
      <div className="px-6 text-center">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-[3.25rem] leading-[1.1]"
        >
          Take control of{" "}
          <PaintedUnderline delay={0.5}>your game servers</PaintedUnderline>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground leading-relaxed"
        >
          Struxa gives you everything you need to manage game servers: real-time monitoring, file management, multi-user access, and a modern panel — all self-hosted.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8"
        >
          <Button
            type="button"
            size="lg"
            className="px-8 font-semibold"
            render={<a href="https://github.com/struxadotcloud/struxa" target="_blank" rel="noopener noreferrer" />}
          >
            Self-host for free
            <ArrowRight aria-hidden="true" className="ml-2 size-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="px-8 font-semibold"
            render={<a href="https://github.com/struxadotcloud/struxa" target="_blank" rel="noopener noreferrer" />}
          >
            View on GitHub
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
