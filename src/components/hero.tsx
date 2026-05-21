"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PaintedUnderline } from "@/components/ui/painted-underline";

export function Hero() {
  return (
    <section className="bg-background">
      <div className="px-6 pt-20 pb-0">
        {/* Headline */}
        <h1 className="mb-6 max-w-4xl text-5xl font-bold leading-[1.06] tracking-tight text-foreground md:text-6xl lg:text-[4.5rem] break-words">
          The modern game{" "}
          <PaintedUnderline delay={0.3}>server panel</PaintedUnderline>
        </h1>

        {/* Description */}
        <p className="mb-10 text-base text-muted-foreground leading-relaxed max-w-lg md:text-lg">
          Open-source, self-hosted alternative to Pterodactyl. Manage your game servers with a modern TypeScript stack, real-time dashboards, and a clean operator-focused UI.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-start gap-3 mb-16">
          <Button
            type="button"
            size="lg"
            className="px-7 font-semibold"
            render={<a href="https://github.com/struxadotcloud/struxa" target="_blank" rel="noopener noreferrer" />}
          >
            Self-host for free
            <ArrowRight aria-hidden="true" className="ml-1.5 size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="px-7 font-semibold"
            render={<Link href="/pricing" />}
          >
            Deployment
          </Button>
        </div>
      </div>

      {/* Bottom strip: trust indicators flush to section border */}
      <div className="px-6 py-4 border-t border-border flex flex-wrap items-center gap-x-8 gap-y-2">
        <span className="text-sm text-muted-foreground">100% open source</span>
        <span aria-hidden="true" className="hidden sm:block w-px h-4 bg-border" />
        <span className="text-sm text-muted-foreground">No vendor lock-in</span>
        <span aria-hidden="true" className="hidden sm:block w-px h-4 bg-border" />
        <span className="text-sm text-muted-foreground">Built for operators</span>
      </div>
    </section>
  );
}
