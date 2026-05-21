"use client"

import { motion } from "motion/react"
import { useState, useEffect } from "react"
import { Calendar, Clock, CheckCircle2, User } from "lucide-react"

export function AppointmentBooking() {
  const [step, setStep] = useState(0)
  const [mounted, setMounted] = useState(false)

  const steps = [
    { icon: Calendar, label: "Available slots", detail: "9:00 AM - 5:00 PM" },
    { icon: User, label: "Customer details", detail: "John Smith" },
    { icon: Clock, label: "Time selected", detail: "2:00 PM Today" },
    { icon: CheckCircle2, label: "Booking confirmed", detail: "Calendar updated" }
  ]

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-base font-semibold mb-2 text-card-foreground">
        Appointments
      </h3>
      
      <div className="grid grid-cols-2 gap-1.5 flex-1">
        {steps.map((stepItem, index) => (
          <motion.div
            key={index}
            className={`flex flex-col items-center text-center p-1.5 rounded-lg transition-all duration-300 ${
              index === step ? 'bg-primary/10 border border-primary/20' : 
              index < step ? 'bg-green-500/10' : 'bg-muted/30'
            }`}
            animate={{
              scale: index === step ? 1.02 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className={`p-1 rounded-full mb-1 ${
                index < step ? 'bg-green-500' :
                index === step ? 'bg-primary' : 'bg-muted'
              }`}
              animate={{
                rotate: index === step ? [0, 360] : 0
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <stepItem.icon className="w-2.5 h-2.5 text-white" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-medium ${
                index <= step ? 'text-card-foreground' : 'text-muted-foreground'
              }`}>
                {stepItem.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
