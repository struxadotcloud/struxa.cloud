"use client"

import { useEffect, useState } from "react"

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? "down" : "up"
      
      // Only update if we've scrolled more than 10px to avoid jitter
      if (Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction)
      }
      
      // Track if we're at the top of the page
      setIsAtTop(scrollY < 10)
      
      lastScrollY = scrollY > 0 ? scrollY : 0
    }

    const onScroll = () => {
      window.requestAnimationFrame(updateScrollDirection)
    }

    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return { scrollDirection, isAtTop }
}
