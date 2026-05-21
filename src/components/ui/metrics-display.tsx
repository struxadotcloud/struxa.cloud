"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react"

interface MetricProps {
  value: number
  suffix: string
  label: string
  prefix?: string
}

function AnimatedMetric({ value, suffix, label, prefix = "" }: MetricProps) {
  const [count, setCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      const increment = value / 50
      const interval = setInterval(() => {
        setCount(prev => {
          if (prev + increment >= value) {
            clearInterval(interval)
            return value
          }
          return prev + increment
        })
      }, 30)
      return () => clearInterval(interval)
    }, 200)
    return () => clearTimeout(timer)
  }, [value])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-2xl font-bold text-primary">
        {prefix}{Math.floor(count)}{suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  )
}

export function MetricsDisplay() {
  return (
    <div className="flex flex-col h-full justify-center">
      <h3 className="text-lg font-semibold mb-6 text-card-foreground">
        Platform Statistics
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <AnimatedMetric
          value={99.9}
          suffix="%"
          label="Uptime"
        />
        <AnimatedMetric
          value={500}
          suffix="ms"
          label="Avg Response"
          prefix="<"
        />
        <AnimatedMetric
          value={10000}
          suffix="+"
          label="Events Processed"
        />
        <AnimatedMetric
          value={50}
          suffix="+"
          label="Integrations"
        />
      </div>
    </div>
  )
}
