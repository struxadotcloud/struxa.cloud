'use client'

import { useEffect, useState } from 'react'
import posthog from 'posthog-js'

export function usePostHog() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && posthog.__loaded) {
      setIsLoaded(true)
    }
  }, [])

  return {
    posthog: isLoaded ? posthog : null,
    isLoaded,
  }
}
