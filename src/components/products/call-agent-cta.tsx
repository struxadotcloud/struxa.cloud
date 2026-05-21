"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Phone } from "lucide-react"
import { motion } from "framer-motion"
import GradientDither from "@/components/ui/gradient-dither"

export function CallAgentCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <GradientDither strength={0.05} />

      {/* very subtle floating icons */}
      <motion.div className="absolute top-20 left-10 w-72 h-72 bg-primary/2 rounded-full blur-[200px]" animate={{ x: [0, 18, 0], y: [0, -12, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/1 rounded-full blur-[250px]" animate={{ x: [0, -22, 0], y: [0, 18, 0] }} transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 5 }} />
      <motion.div className="absolute top-32 right-1/4 text-primary/8" animate={{ y: [0, -10, 0], rotate: [0, 45, 90] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}>
        <Sparkles className="w-4 h-4" />
      </motion.div>
      <motion.div className="absolute bottom-40 left-1/4 text-primary/6" animate={{ y: [0, 8, 0], rotate: [0, -45, -90] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}>
        <Phone className="w-4 h-4" />
      </motion.div>

      <div className="relative z-20 mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm">
            <motion.div className="mr-2 h-2 w-2 rounded-full bg-primary" animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity }} />
            Ready to take control of your game servers?
          </Badge>
        </div>

        {/* Headline */}
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="relative mb-6 text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
          Self-host Struxa and manage your entire game server infrastructure from one modern panel.
        </motion.h2>

        {/* Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="relative flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="mailto:hello@cortano.app?subject=Call%20Agent%20Demo" className="w-full sm:w-auto">
            <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold">
              Get the code
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <a href="mailto:hello@cortano.app?subject=Enterprise%20Inquiry" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full px-8 py-4 text-lg font-semibold border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5">
              Read the docs
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
