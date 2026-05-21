"use client"

import { motion } from "motion/react"
import { useState, useEffect } from "react"

const outcomes = [
  { label: "Running", value: 18, accent: "bg-green-500/20 text-green-500" },
  { label: "Starting", value: 12, accent: "bg-blue-500/20 text-blue-500" },
  { label: "Offline", value: 7, accent: "bg-yellow-500/20 text-yellow-500" },
  { label: "Restarting", value: 4, accent: "bg-purple-500/20 text-purple-500" },
]

export function CallOutcomes() {
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setActive((p) => (p + 1) % outcomes.length), 2000)
    return () => clearInterval(id)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-base font-semibold mb-2 text-card-foreground">Server States</h3>
      <div className="grid grid-cols-2 gap-1.5 flex-1">
        {outcomes.map((o, i) => (
          <motion.div
            key={o.label}
            className={`rounded-lg p-1.5 ${i === active ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'}`}
            animate={{ scale: i === active ? 1.02 : 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="text-xs text-muted-foreground">{o.label}</div>
              <div className="mt-0.5 text-sm font-semibold text-card-foreground">{o.value}</div>
              <span className={`mt-1 text-[10px] px-1.5 py-0.5 rounded-full ${o.accent}`}>+{Math.max(1, Math.round(o.value/10))}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
