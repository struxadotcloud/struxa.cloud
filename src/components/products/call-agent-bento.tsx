"use client"

import { BentoCard } from "@/components/ui/bento-card"
import { FeatureHighlight } from "@/components/ui/feature-highlight"
import { LanguageShowcase } from "@/components/ui/language-showcase"
import { VisualWorkflowBuilder } from "@/components/ui/visual-workflow-builder"
import { VisualFlow } from "@/components/ui/visual-flow"
import { ModelSelection } from "@/components/products/model-selection"
import { IntegrationShowcase } from "@/components/products/integration-showcase"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export function CallAgentBento() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2"
          >
            <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
            What you get
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Built for reliable, scalable game server infrastructure management
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          {/* Main Feature - Visual Builder */}
          <div className="lg:col-span-2 lg:row-span-2">
            <BentoCard size="lg" background="gradient" className="h-full min-h-[280px]">
              <VisualWorkflowBuilder />
            </BentoCard>
          </div>

          {/* AI Model Selection */}
          <div className="md:col-span-1">
            <BentoCard size="sm" background="pattern" className="h-full min-h-[140px]">
              <ModelSelection />
            </BentoCard>
          </div>

          {/* Languages */}
          <div className="md:col-span-1">
            <BentoCard size="sm" background="solid" className="h-full min-h-[140px]">
              <LanguageShowcase />
            </BentoCard>
          </div>

          {/* Feature Highlights - 24/7 Availability (wider) */}
          <div className="md:col-span-2">
            <BentoCard size="md" background="pattern" className="h-full min-h-[140px]">
              <FeatureHighlight title="Real-time monitoring" description="Live resource usage for every server. CPU, RAM, disk, and network at a glance." />
            </BentoCard>
          </div>

          {/* Integration Showcase */}
          <div className="md:col-span-2">
            <BentoCard size="md" background="pattern" className="h-full min-h-[140px]">
              <IntegrationShowcase />
            </BentoCard>
          </div>          {/* Visual Flow - How it Works */}
          <div className="md:col-span-2">
            <BentoCard size="md" background="gradient" className="h-full min-h-[160px]">
              <VisualFlow />
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  )
}
