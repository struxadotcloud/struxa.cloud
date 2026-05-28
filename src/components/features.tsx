"use client";

import { BentoCard } from "@/components/ui/bento-card";
import { FeatureHighlight } from "@/components/ui/feature-highlight";
import { MovingPartners } from "@/components/ui/moving-partners";
import { LanguageShowcase } from "@/components/ui/language-showcase";
import { VisualFlow } from "@/components/ui/visual-flow";
import { ArchitectureDiagram } from "@/components/ui/architecture-diagram";

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
          <BentoCard size="md" background="gradient" className="lg:col-span-2">
            <ArchitectureDiagram />
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

          <BentoCard size="md" background="pattern" compact>
            <FeatureHighlight
              title="Schedules & Automation"
              description="Run commands on a cron schedule — automatic restarts, timed broadcasts, routine maintenance — all without touching the server manually."
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

          <BentoCard size="md" background="pattern" compact>
            <FeatureHighlight
              title="Audit & Activity Log"
              description="Every power action, file write, and login recorded with timestamp and actor. Know exactly who did what and when."
            />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
