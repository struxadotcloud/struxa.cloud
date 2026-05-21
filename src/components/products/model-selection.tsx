"use client"

import { motion } from "motion/react"
import { useState, useEffect } from "react"

const models = [
  { name: "Minecraft" },
  { name: "CS2" },
  { name: "Valheim" },
  { name: "Custom" },
]

export function ModelSelection() {
  const [selectedModel, setSelectedModel] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setSelectedModel((prev) => (prev + 1) % models.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-base font-semibold mb-2 text-card-foreground">
        Supported Games
      </h3>

      <div className="grid grid-cols-2 gap-1.5 flex-1">
        {models.map((model, index) => (
          <motion.div
            key={index}
            className={`relative p-1.5 rounded-lg transition-all duration-300 ${
              index === selectedModel
                ? 'bg-primary/10 border border-primary/20'
                : 'bg-muted/30'
            }`}
            animate={{
              scale: index === selectedModel ? 1.02 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center text-center h-full">
              <div className="flex-1 flex items-center justify-center">
                <div className={`text-xs font-medium ${
                  index === selectedModel ? 'text-card-foreground' : 'text-muted-foreground'
                }`}>
                  {model.name}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
