import { trackError } from '@/lib/posthog'
import posthog from 'posthog-js'

// Extend the Window interface to include posthog
declare global {
  interface Window {
    posthog: typeof posthog
  }
}

// Performance monitoring utilities
export const performanceMonitor = {
  // Track page load performance
  trackPageLoad: () => {
    if (typeof window === 'undefined') return

    window.addEventListener('load', () => {
      // Use the Navigation Timing API to get performance metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (navigation) {
        const metrics = {
          dns_lookup: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcp_connection: navigation.connectEnd - navigation.connectStart,
          server_response: navigation.responseEnd - navigation.requestStart,
          dom_processing: navigation.domContentLoadedEventEnd - navigation.responseEnd,
          page_load: navigation.loadEventEnd - navigation.fetchStart,
          first_byte: navigation.responseStart - navigation.requestStart,
          dom_interactive: navigation.domInteractive - navigation.fetchStart,
          dom_complete: navigation.domComplete - navigation.fetchStart
        }

        // Track performance metrics with PostHog
        if (window.posthog && window.posthog.__loaded) {
          window.posthog.capture('page_performance', {
            ...metrics,
            url: window.location.href,
            user_agent: navigator.userAgent,
            timestamp: new Date().toISOString()
          })
        }
      }
    })
  },

  // Track Core Web Vitals
  trackWebVitals: () => {
    if (typeof window === 'undefined') return

    // Track Largest Contentful Paint (LCP)
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      
      if (window.posthog && window.posthog.__loaded) {
        window.posthog.capture('web_vital_lcp', {
          value: lastEntry.startTime,
          url: window.location.href,
          timestamp: new Date().toISOString()
        })
      }
    })

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (error) {
      // LCP not supported in this browser
    }

    // Track First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        const fidEntry = entry as any // Type assertion for FID entry
        if (window.posthog && window.posthog.__loaded) {
          window.posthog.capture('web_vital_fid', {
            value: fidEntry.processingStart - fidEntry.startTime,
            url: window.location.href,
            timestamp: new Date().toISOString()
          })
        }
      })
    })

    try {
      fidObserver.observe({ entryTypes: ['first-input'] })
    } catch (error) {
      // FID not supported in this browser
    }

    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
    })

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      
      // Send CLS value when the page is hidden
      const sendCLS = () => {
        if (window.posthog && window.posthog.__loaded) {
          window.posthog.capture('web_vital_cls', {
            value: clsValue,
            url: window.location.href,
            timestamp: new Date().toISOString()
          })
        }
      }

      window.addEventListener('visibilitychange', sendCLS)
      window.addEventListener('beforeunload', sendCLS)
    } catch (error) {
      // CLS not supported in this browser
    }
  },

  // Track slow API requests
  trackSlowApiRequests: () => {
    if (typeof window === 'undefined') return

    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      const startTime = performance.now()
      const url = args[0] instanceof Request ? args[0].url : args[0].toString()
      
      try {
        const response = await originalFetch(...args)
        const endTime = performance.now()
        const duration = endTime - startTime

        // Track slow requests (over 2 seconds)
        if (duration > 2000) {
          if (window.posthog && window.posthog.__loaded) {
            window.posthog.capture('slow_api_request', {
              url,
              duration,
              status: response.status,
              timestamp: new Date().toISOString()
            })
          }
        }

        return response
      } catch (error) {
        const endTime = performance.now()
        const duration = endTime - startTime

        // Track failed requests
        if (window.posthog && window.posthog.__loaded) {
          window.posthog.capture('failed_api_request', {
            url,
            duration,
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
          })
        }

        throw error
      }
    }
  }
}

// Error boundaries and handlers
export const errorTracking = {
  // Initialize all error tracking
  init: () => {
    if (typeof window === 'undefined') return

    performanceMonitor.trackPageLoad()
    performanceMonitor.trackWebVitals()
    performanceMonitor.trackSlowApiRequests()
  },

  // Track custom business logic errors
  trackBusinessError: (context: string, error: Error, metadata?: Record<string, any>) => {
    trackError(error, {
      context,
      type: 'business_logic_error',
      ...metadata
    })
  },

  // Track user interaction errors
  trackInteractionError: (interaction: string, error: Error, element?: HTMLElement) => {
    const elementInfo = element ? {
      tagName: element.tagName,
      className: element.className,
      id: element.id,
      innerHTML: element.innerHTML.substring(0, 100) // Limit to prevent large data
    } : undefined

    trackError(error, {
      interaction,
      type: 'user_interaction_error',
      element: elementInfo
    })
  },

  // Track navigation errors
  trackNavigationError: (fromUrl: string, toUrl: string, error: Error) => {
    trackError(error, {
      type: 'navigation_error',
      fromUrl,
      toUrl
    })
  }
}

// Hook for React components to use error tracking
export const useErrorTracking = () => {
  return {
    trackError: errorTracking.trackBusinessError,
    trackInteractionError: errorTracking.trackInteractionError,
    trackNavigationError: errorTracking.trackNavigationError
  }
}
