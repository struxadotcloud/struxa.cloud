"use client"

import { motion } from "motion/react"
import { useState, useEffect } from "react"
import { Zap, Link, Webhook, Database } from "lucide-react"

const integrations = [
  { icon: Database, name: "Salesforce", type: "CRM", status: "Connected" },
  { icon: Link, name: "Zapier", type: "Automation", status: "Active" },
  { icon: Webhook, name: "Custom API", type: "Webhook", status: "Live" },
  { icon: Zap, name: "HubSpot", type: "Marketing", status: "Syncing" },
]

export function IntegrationShowcase() {
  const [activeIntegration, setActiveIntegration] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setActiveIntegration((prev) => (prev + 1) % integrations.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-base font-semibold mb-2 text-card-foreground">
        Integrations
      </h3>

      <div className="grid grid-cols-2 gap-1.5 flex-1">
        {integrations.map((integration, index) => (
          <motion.div
            key={index}
            className={`flex items-center space-x-1.5 p-1.5 rounded-lg transition-all duration-300 ${
              index === activeIntegration ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'
            }`}
            animate={{
              scale: index === activeIntegration ? 1.02 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className={`p-1 rounded-full ${
              index === activeIntegration ? 'bg-primary' : 'bg-muted'
            }`}>
              <integration.icon className="w-2.5 h-2.5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-medium ${
                index === activeIntegration ? 'text-card-foreground' : 'text-muted-foreground'
              }`}>
                {integration.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
