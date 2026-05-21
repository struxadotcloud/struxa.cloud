"use client";

import {
  CheckCircle2,
  Headphones,
  Clock,
  CalendarDays,
  Shield,
  BarChart,
} from "lucide-react";

const featuresIcons = [Headphones, Clock, CalendarDays, Shield, BarChart];

const items = [
  {
    title: "Node provisioning",
    description: "Add and configure nodes across your infrastructure. Set memory, disk, and CPU limits.",
  },
  {
    title: "Real-time monitoring",
    description: "Live resource usage for every server. CPU, RAM, disk, and network at a glance.",
  },
  {
    title: "Allocation management",
    description: "Assign IP and port allocations to nodes and bind them to game servers.",
  },
  {
    title: "Maintenance mode",
    description: "Take nodes offline for maintenance without affecting other infrastructure.",
  },
  {
    title: "Activity logs",
    description: "Full audit trail of all actions taken across servers and nodes.",
  },
];

export function CallAgentFeatures() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            What you get
          </h2>
          <p className="mt-2 text-muted-foreground">Built for reliable, scalable game server infrastructure management</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ title, description }, idx) => {
            const Icon = featuresIcons[idx];
            return (
              <div
                key={idx}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-md bg-primary/10 p-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-foreground">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
