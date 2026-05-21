"use client"

import { motion } from "motion/react"
import { useState, useEffect } from "react"
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react"

export function CallAnalytics() {
  const [activeMetric, setActiveMetric] = useState(0)
  const [mounted, setMounted] = useState(false)

  const metrics = [
    { icon: BarChart3, label: "Call Volume", value: "1,247", change: "+12%" },
    { icon: Clock, label: "Avg Duration", value: "3:42", change: "+5%" },
    { icon: Users, label: "Success Rate", value: "94%", change: "+8%" },
    { icon: TrendingUp, label: "Satisfaction", value: "4.8/5", change: "+0.3" }
  ]

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-full justify-center">
      <h3 className="text-lg font-semibold mb-4 text-card-foreground">
        Real-time Analytics
      </h3>
      
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            className={`p-3 rounded-lg border transition-all duration-300 ${
              index === activeMetric 
                ? 'border-primary bg-primary/10' 
                : 'border-muted bg-muted/30'
            }`}
            animate={{
              scale: index === activeMetric ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <metric.icon className={`w-3 h-3 ${
                index === activeMetric ? 'text-primary' : 'text-muted-foreground'
              }`} />
              <span className={`text-xs font-medium ${
                index === activeMetric ? 'text-card-foreground' : 'text-muted-foreground'
              }`}>
                {metric.label}
              </span>
            </div>
            <div className={`text-lg font-bold ${
              index === activeMetric ? 'text-card-foreground' : 'text-muted-foreground'
            }`}>
              {metric.value}
            </div>
            <div className={`text-xs ${
              index === activeMetric ? 'text-green-600' : 'text-muted-foreground/60'
            }`}>
              {metric.change}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
