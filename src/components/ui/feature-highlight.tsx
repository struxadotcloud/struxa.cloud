"use client"

import { motion } from "motion/react"

interface FeatureHighlightProps {
  title: string
  description: string
}

export function FeatureHighlight({ 
  title, 
  description
}: FeatureHighlightProps) {
  return (
    <div className="flex flex-col h-full justify-center">
      <h3 className="text-base font-medium text-card-foreground mb-2 break-words overflow-wrap-break-word">
        {title}
      </h3>
      
      <p className="text-sm text-muted-foreground leading-relaxed break-words overflow-wrap-break-word">
        {description}
      </p>
    </div>
  )
}
