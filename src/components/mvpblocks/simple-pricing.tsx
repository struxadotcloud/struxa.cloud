"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FeatureComingSoonDialog } from "@/components/ui/feature-coming-soon-dialog";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Percent, Layers, Shield } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    id: "paymentFee",
    name: "Self-Hosted",
    icon: Percent,
    price: "Free",
    priceSubtext: "forever",
    description: "Deploy on your own infrastructure. Free, open-source, full feature set.",
    features: [
      "Full feature set",
      "Own your data",
      "Community support via GitHub",
      "Any Wings-compatible game",
      "MIT License",
      "Self-managed updates",
    ],
    cta: "Get the code",
    featureName: "Self-Hosted",
  },
  {
    id: "standard",
    name: "Struxa Cloud",
    icon: Layers,
    price: "Coming soon",
    priceSubtext: "",
    description: "We host the panel for you. Bring your own Wings nodes and game servers.",
    features: [
      "Panel hosted by us",
      "Automatic updates",
      "Priority support",
      "Custom domain support",
      "No panel self-hosting needed",
      "Monitoring included",
      "SLA uptime guarantee",
    ],
    cta: "Join waitlist",
    popular: true,
    featureName: "Struxa Cloud",
  },
  {
    id: "proBrand",
    name: "Enterprise",
    icon: Shield,
    price: "Contact us",
    priceSubtext: "",
    description: "Custom deployments and dedicated support for large-scale operations.",
    features: [
      "Everything in Cloud",
      "Dedicated infrastructure",
      "SLA guarantees",
      "Dedicated support engineer",
      "Custom integrations",
      "Advanced analytics",
      "Custom onboarding",
      "All Cloud features",
    ],
    cta: "Get in touch",
    featureName: "Enterprise",
  },
];

export default function SimplePricing() {
  return (
    <section
      id="pricing"
      className="border-t border-border bg-background py-28 md:py-32 scroll-mt-14"
    >
      <div className="px-6">
        {/* Section Header */}
        <div className="mb-20 max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Choose how you run Struxa
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Self-host for free with the full feature set, or join the waitlist for Struxa Cloud — we host the panel, you bring the Wings nodes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex"
            >
              <Card
                className={cn(
                  "relative flex h-full w-full flex-col border bg-card text-left transition-shadow duration-200 hover:shadow-md",
                  plan.popular ? "border-foreground" : "border-border",
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-6">
                    <Badge className="rounded-full px-3 py-0.5 text-xs font-medium">
                      Recommended
                    </Badge>
                  </div>
                )}

                <CardHeader className={cn("pb-4", plan.popular && "pt-8")}>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                      <plan.icon aria-hidden="true" className="size-4 text-foreground" />
                    </div>
                    <CardTitle className="text-lg font-medium text-foreground">
                      {plan.name}
                    </CardTitle>
                  </div>

                  <CardDescription className="space-y-3">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {plan.description}
                    </p>
                    <div className="pt-1">
                      <span className="text-3xl font-medium text-foreground">
                        {plan.price}
                      </span>
                      {plan.priceSubtext && (
                        <span className="ml-2 text-sm text-muted-foreground">
                          {plan.priceSubtext}
                        </span>
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-3 pb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-foreground"
                      />
                      <span className="text-muted-foreground leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="pt-4">
                  <FeatureComingSoonDialog featureName={plan.featureName}>
                    <Button
                      type="button"
                      variant={plan.popular ? "default" : "outline"}
                      className="w-full font-medium"
                    >
                      {plan.cta}
                      <ArrowRight aria-hidden="true" className="ml-2 size-4" />
                    </Button>
                  </FeatureComingSoonDialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
