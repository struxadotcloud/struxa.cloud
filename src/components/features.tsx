"use client";

import { BentoCard } from "@/components/ui/bento-card";
import { FeatureHighlight } from "@/components/ui/feature-highlight";
import { MovingPartners } from "@/components/ui/moving-partners";
import { LanguageShowcase } from "@/components/ui/language-showcase";
import { WhitelabelShowcase } from "@/components/ui/whitelabel-showcase";
import { VisualFlow } from "@/components/ui/visual-flow";

export function Features() {
  return (
    <section className="border-t border-border bg-background py-28 md:py-32" id="features">
      <div className="px-6">
        {/* Section Header */}
        <div className="mb-20 max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Everything you need to run game servers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            From provisioning a node to managing dozens of servers. Real-time monitoring, file editing, and multi-user access — all in one panel.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:auto-rows-[200px]">
          <BentoCard
            size="lg"
            background="gradient"
            className="min-h-[300px] md:min-h-0 lg:col-span-2 lg:row-span-2"
            id="journey"
          >
            <WhitelabelShowcase />
          </BentoCard>

          <BentoCard size="md" background="pattern" compact>
            <FeatureHighlight
              title="Server Lifecycle"
              description="Start, stop, restart, and configure game servers from a single panel. Full lifecycle control with live power state tracking."
            />
          </BentoCard>

          <BentoCard size="sm" background="solid">
            <MovingPartners />
          </BentoCard>

          <BentoCard size="sm" background="solid" className="min-h-[220px] md:min-h-0">
            <LanguageShowcase />
          </BentoCard>

          <BentoCard size="md" background="pattern" compact>
            <FeatureHighlight
              title="Real-time Monitoring"
              description="Live CPU, RAM, disk, and network usage with sparkline graphs. Know exactly what's happening across all your servers."
            />
          </BentoCard>

          <BentoCard size="md" background="pattern" compact>
            <FeatureHighlight
              title="File Manager & Editor"
              description="Browse and edit server files directly in the browser. No SSH needed for routine configuration changes."
            />
          </BentoCard>

          <BentoCard size="md" background="gradient" className="lg:col-span-2">
            <VisualFlow />
          </BentoCard>

          <BentoCard size="md" background="pattern" compact>
            <FeatureHighlight
              title="Multi-user & RBAC"
              description="Role-based access with admin and subuser support. Grant teammates access to specific servers without exposing the full panel."
            />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
