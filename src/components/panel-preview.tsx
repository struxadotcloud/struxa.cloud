"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Terminal, FolderOpen, Settings, Activity, Archive } from "lucide-react";
import Image from "next/image";

type PreviewTab = "console" | "files" | "settings" | "activity" | "backups";

const TABS: { key: PreviewTab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { key: "console",  label: "Console",  icon: Terminal  },
  { key: "files",    label: "Files",    icon: FolderOpen },
  { key: "backups",  label: "Backups",  icon: Archive   },
  { key: "settings", label: "Settings", icon: Settings  },
  { key: "activity", label: "Activity", icon: Activity  },
];

const SCREENSHOTS: Record<PreviewTab, string> = {
  console:  "/console.png",
  files:    "/files.png",
  settings: "/settings.png",
  activity: "/activity.png",
  backups:  "/backups.png",
};

export function PanelPreview() {
  const [activeTab, setActiveTab] = useState<PreviewTab>("console");

  return (
    <section className="border-t border-border bg-background py-28 md:py-32">
      <div className="px-6">
        {/* Section header */}
        <div className="mb-12 max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            See the panel in action
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Every view, every feature — one clean interface. Built for operators who care about what they&apos;re running.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 border border-border rounded-lg p-1 bg-card w-fit mb-6 overflow-x-auto">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </button>
          ))}
        </div>

        {/* Screenshot frame */}
        <div className="rounded-xl border border-border overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <Image
                src={SCREENSHOTS[activeTab]}
                alt={`${activeTab} view`}
                width={2492}
                height={1346}
                className="w-full h-auto block"
                priority={activeTab === "console"}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
