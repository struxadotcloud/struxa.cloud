"use client"

import { motion } from "motion/react"
import { useState, useEffect } from "react"
import { Shield, Lock, Eye, Database } from "lucide-react"

export function SecurityFeatures() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [mounted, setMounted] = useState(false)

  const features = [
    { icon: Shield, label: "SOC 2 Compliant", status: "Active" },
    { icon: Lock, label: "End-to-end Encryption", status: "Enabled" },
    { icon: Database, label: "Data Retention", status: "30 days" },
    { icon: Eye, label: "Audit Logging", status: "Real-time" }
  ]

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-full justify-center">
      <h3 className="text-lg font-semibold mb-4 text-card-foreground">
        Enterprise Security
      </h3>
      
      <div className="space-y-2">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 ${
              index === activeFeature ? 'bg-green-500/10 border border-green-500/20' : 'bg-muted/30'
            }`}
            animate={{
              scale: index === activeFeature ? 1.02 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-2">
              <feature.icon className={`w-4 h-4 ${
                index === activeFeature ? 'text-green-600' : 'text-muted-foreground'
              }`} />
              <span className={`text-sm font-medium ${
                index === activeFeature ? 'text-card-foreground' : 'text-muted-foreground'
              }`}>
                {feature.label}
              </span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              index === activeFeature 
                ? 'bg-green-500/20 text-green-600' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {feature.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
