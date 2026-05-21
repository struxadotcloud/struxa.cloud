"use client"

import { motion } from "motion/react"
import { useState, useEffect } from "react"
import { Phone, Calendar, MessageSquare, Users, Clock, CheckCircle } from "lucide-react"

export function CallRoutingDemo() {
  const [activeRoute, setActiveRoute] = useState(0)
  const [mounted, setMounted] = useState(false)

  const routes = [
    { icon: Phone, label: "Sales", color: "bg-blue-500" },
    { icon: Users, label: "Support", color: "bg-green-500" },
    { icon: Calendar, label: "Booking", color: "bg-purple-500" },
    { icon: MessageSquare, label: "General", color: "bg-orange-500" }
  ]

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setActiveRoute((prev) => (prev + 1) % routes.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-full justify-center">
      <h3 className="text-lg font-semibold mb-4 text-card-foreground">
        Smart Call Routing
      </h3>
      
      <div className="space-y-3">
        {routes.map((route, index) => (
          <motion.div
            key={index}
            className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
              index === activeRoute ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'
            }`}
            animate={{
              scale: index === activeRoute ? 1.02 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className={`p-2 rounded-full ${route.color} ${index === activeRoute ? 'opacity-100' : 'opacity-60'}`}>
              <route.icon className="w-3 h-3 text-white" />
            </div>
            <span className={`text-sm font-medium ${
              index === activeRoute ? 'text-card-foreground' : 'text-muted-foreground'
            }`}>
              {route.label}
            </span>
            {index === activeRoute && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto"
              >
                <CheckCircle className="w-4 h-4 text-primary" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
