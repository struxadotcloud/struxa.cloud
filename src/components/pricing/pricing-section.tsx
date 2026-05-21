"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FeatureComingSoonDialog } from "@/components/ui/feature-coming-soon-dialog";
import { cn } from "@/lib/utils";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  priceSubtext: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
  featureName: string;
}

const plans: Plan[] = [
  {
    id: "paymentFee",
    name: "Self-Hosted",
    price: "Free",
    priceSubtext: "forever",
    description: "Deploy on your own infrastructure. Free, open-source, full feature set.",
    features: [
      { text: "Full feature set", included: true },
      { text: "Own your data", included: true },
      { text: "Community support via GitHub", included: true },
      { text: "Any Wings-compatible game", included: true },
      { text: "MIT License", included: true },
      { text: "Self-managed updates", included: true },
    ],
    cta: "Get the code",
    featureName: "Self-Hosted",
  },
  {
    id: "standard",
    name: "Struxa Cloud",
    price: "Coming soon",
    priceSubtext: "",
    description: "We host the panel for you. Bring your own Wings nodes and game servers.",
    features: [
      { text: "Panel hosted by us", included: true },
      { text: "Automatic updates", included: true },
      { text: "Priority support", included: true },
      { text: "Custom domain support", included: true },
      { text: "No panel self-hosting needed", included: true },
      { text: "Monitoring included", included: true },
      { text: "SLA uptime guarantee", included: true },
    ],
    cta: "Join waitlist",
    popular: true,
    featureName: "Struxa Cloud",
  },
  {
    id: "proBrand",
    name: "Enterprise",
    price: "Contact us",
    priceSubtext: "",
    description: "Custom deployments and dedicated support for large-scale operations.",
    features: [
      { text: "Everything in Cloud", included: true },
      { text: "Dedicated infrastructure", included: true },
      { text: "SLA guarantees", included: true },
      { text: "Dedicated support engineer", included: true },
      { text: "Custom integrations", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Custom onboarding", included: true },
      { text: "All Cloud features", included: true },
    ],
    cta: "Get in touch",
    featureName: "Enterprise",
  },
];

export function PricingSection() {
  return (
    <section className="bg-background py-28 md:py-32">
      {/* Header */}
      <div className="px-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          Choose how you run Struxa
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 max-w-2xl text-lg text-muted-foreground"
        >
          Self-host for free with the full feature set, or join the waitlist for Struxa Cloud — we host the panel, you bring the Wings nodes.
        </motion.p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="flex"
            >
              <div
                className={cn(
                  "relative flex w-full flex-col rounded-xl border p-6 bg-card",
                  plan.popular
                    ? "border-foreground ring-1 ring-foreground/10"
                    : "border-border"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-4">
                    <Badge className="rounded-full px-3 py-1 text-xs font-medium">
                      Recommended
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-2 text-lg font-medium text-foreground">
                    {plan.name}
                  </h3>
                  <div className="mb-3">
                    <span className="text-3xl font-medium text-foreground">
                      {plan.price}
                    </span>
                    {plan.priceSubtext && (
                      <span className="ml-1 text-sm text-muted-foreground">
                        {plan.priceSubtext}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6 flex-1 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-foreground"
                      />
                      <span className="text-foreground">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <FeatureComingSoonDialog featureName={plan.featureName}>
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </FeatureComingSoonDialog>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 pt-20 border-t border-border"
        >
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
            Compare Options
          </h2>
          <FeatureComparisonTable />
        </motion.div>
      </div>
    </section>
  );
}

const comparisonCategories = [
  {
    name: "Core Features",
    features: [
      { name: "Cost", paymentFee: "Free", standard: "TBD", proBrand: "Custom" },
      { name: "Game server management", paymentFee: true, standard: true, proBrand: true },
      { name: "Unlimited servers", paymentFee: true, standard: true, proBrand: true },
      { name: "Node management", paymentFee: "Self-managed", standard: "Managed", proBrand: "Managed" },
      { name: "Real-time monitoring", paymentFee: true, standard: true, proBrand: true },
      { name: "Backup management", paymentFee: true, standard: true, proBrand: true },
    ],
  },
  {
    name: "Management & Access",
    features: [
      { name: "Multi-user support", paymentFee: true, standard: true, proBrand: true },
      { name: "Custom domain", paymentFee: true, standard: true, proBrand: true },
      { name: "Remove Struxa branding", paymentFee: true, standard: true, proBrand: true },
      { name: "Custom panel themes", paymentFee: true, standard: false, proBrand: true },
      { name: "Custom email notifications", paymentFee: true, standard: false, proBrand: true },
    ],
  },
  {
    name: "Support & Services",
    features: [
      { name: "Email support", paymentFee: false, standard: true, proBrand: true },
      { name: "Community support", paymentFee: true, standard: false, proBrand: false },
      { name: "Priority support", paymentFee: false, standard: false, proBrand: true },
      { name: "All features included", paymentFee: false, standard: false, proBrand: true },
    ],
  },
  {
    name: "Monitoring & Reporting",
    features: [
      { name: "Server metrics", paymentFee: true, standard: true, proBrand: true },
      { name: "Activity logs", paymentFee: true, standard: true, proBrand: true },
      { name: "Resource usage tracking", paymentFee: true, standard: true, proBrand: true },
      { name: "Advanced reports and exports", paymentFee: true, standard: true, proBrand: true },
    ],
  },
];

function FeatureComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">
              Feature
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-foreground">
              Self-Hosted
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-foreground">
              Cloud
            </th>
            <th className="relative px-6 py-4 text-center text-sm font-medium text-foreground">
              <span className="flex items-center justify-center gap-2">
                Enterprise
                <Sparkles className="h-4 w-4 text-foreground" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonCategories.map((category) => (
            <React.Fragment key={category.name}>
              <tr className="border-b border-border bg-muted/30">
                <td
                  colSpan={4}
                  className="px-6 py-3 text-sm font-semibold text-foreground"
                >
                  {category.name}
                </td>
              </tr>
              {category.features.map((feature, featureIndex) => (
                <tr
                  key={`${category.name}-${featureIndex}`}
                  className="border-b border-border"
                >
                  <td className="px-6 py-4 text-sm text-foreground">
                    {feature.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <FeatureValue value={feature.paymentFee} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <FeatureValue value={feature.standard} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <FeatureValue value={feature.proBrand} highlight />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FeatureValue({
  value,
  highlight = false,
}: {
  value: boolean | string;
  highlight?: boolean;
}) {
  if (typeof value === "boolean") {
    if (value) {
      return (
        <Check
          className={cn(
            "mx-auto h-5 w-5",
            highlight ? "text-foreground" : "text-muted-foreground"
          )}
        />
      );
    }
    return <span className="text-muted-foreground">—</span>;
  }
  return (
    <span
      className={cn(
        "text-sm",
        highlight ? "font-medium text-foreground" : "text-foreground"
      )}
    >
      {value}
    </span>
  );
}
