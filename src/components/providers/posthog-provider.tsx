'use client'

import { Suspense, useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'
import { initPostHog } from '@/lib/posthog'
import { getCookieConsent } from '@/lib/cookie-consent'
import { ErrorBoundary } from '@/components/error-boundary'
import { errorTracking } from '@/lib/error-tracking'

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && typeof window !== 'undefined') {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }

      if (posthog.__loaded) {
        posthog.capture('$pageview', {
          $current_url: url,
        })
      }
    }
  }, [pathname, searchParams])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [cookieConsent, setCookieConsent] = useState<string | null>(null)

  useEffect(() => {
    initPostHog()
    setTimeout(() => {
      errorTracking.init()
    }, 1000)
  }, [])

  useEffect(() => {
    const checkConsent = () => {
      const consent = getCookieConsent()
      if (consent !== cookieConsent) {
        setCookieConsent(consent)
      }
    }

    checkConsent()
    window.addEventListener('storage', checkConsent)
    const interval = setInterval(checkConsent, 1000)

    return () => {
      window.removeEventListener('storage', checkConsent)
      clearInterval(interval)
    }
  }, [cookieConsent])

  return (
    <ErrorBoundary>
      {children}
      <Suspense>
        <PostHogPageView />
      </Suspense>
    </ErrorBoundary>
  )
}
