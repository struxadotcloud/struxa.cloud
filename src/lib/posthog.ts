import posthog from 'posthog-js'
import { hasCookieConsent } from './cookie-consent'

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || '/ingest'
    
    if (posthogKey && posthogKey.length > 0) {
      try {
        posthog.init(posthogKey, {
          api_host: posthogHost,
          person_profiles: 'identified_only',
          capture_pageview: false, // Disable automatic pageview capture, as we capture manually
          capture_pageleave: true,
          debug: false, // Enable debug mode in development
          // Enhanced error tracking configuration
          session_recording: {
            recordCrossOriginIframes: true,
          },
          loaded: (posthog) => {
            // Set up global error handlers after PostHog is loaded
            setupErrorTracking()
          }
        })
      } catch (error) {
        console.error('Error initializing PostHog:', error)
      }
    }
  }
}

// Client-side error tracking setup
const setupErrorTracking = () => {
  if (typeof window === 'undefined') return

  // Handle unhandled JavaScript errors
  window.addEventListener('error', (event) => {
    trackClientError({
      type: 'javascript_error',
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    })
  })

  // Handle unhandled Promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    trackClientError({
      type: 'unhandled_promise_rejection',
      message: event.reason?.message || 'Unhandled Promise Rejection',
      stack: event.reason?.stack,
      reason: event.reason,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    })
  })

  // Handle console errors (optional - be careful not to capture too much)
  const originalConsoleError = console.error
  console.error = (...args) => {
    // Only track if it looks like an actual error, not debug logs
    if (args.length > 0 && (args[0] instanceof Error || typeof args[0] === 'string')) {
      trackClientError({
        type: 'console_error',
        message: args.map(arg => 
          arg instanceof Error ? arg.message : String(arg)
        ).join(' '),
        stack: args[0] instanceof Error ? args[0].stack : undefined,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    }
    originalConsoleError.apply(console, args)
  }
}

// Track client-side errors
export const trackClientError = (errorData: {
  type: string
  message: string
  filename?: string
  lineno?: number
  colno?: number
  stack?: string
  reason?: any
  timestamp: string
  url: string
  userAgent: string
}) => {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.capture('$exception', {
      $exception_type: errorData.type,
      $exception_message: errorData.message,
      $exception_filename: errorData.filename,
      $exception_lineno: errorData.lineno,
      $exception_colno: errorData.colno,
      $exception_stack_trace_raw: errorData.stack,
      $exception_timestamp: errorData.timestamp,
      $current_url: errorData.url,
      $user_agent: errorData.userAgent,
      $exception_source: 'client',
      // Additional context
      environment: process.env.NODE_ENV,
      reason: errorData.reason
    })
  }
}

// Track server-side errors (for use in API routes and server components)
export const trackServerError = async (errorData: {
  type: string
  message: string
  stack?: string
  route?: string
  method?: string
  statusCode?: number
  userId?: string
  timestamp: string
  environment: string
  additionalContext?: Record<string, any>
}) => {
  try {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com'
    
    if (!posthogKey) return

    // For server-side, we need to make HTTP requests to PostHog API
    const response = await fetch(`${posthogHost}/capture/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: posthogKey,
        event: '$exception',
        properties: {
          $exception_type: errorData.type,
          $exception_message: errorData.message,
          $exception_stack_trace_raw: errorData.stack,
          $exception_timestamp: errorData.timestamp,
          $exception_source: 'server',
          route: errorData.route,
          method: errorData.method,
          status_code: errorData.statusCode,
          environment: errorData.environment,
          ...errorData.additionalContext
        },
        distinct_id: errorData.userId || 'anonymous',
        timestamp: errorData.timestamp
      })
    })

    if (!response.ok) {
      console.error('Failed to send error to PostHog:', response.statusText)
    }
  } catch (error) {
    console.error('Error sending server error to PostHog:', error)
  }
}

// Utility function to track custom errors manually
export const trackError = (error: Error, context?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // Client-side
    trackClientError({
      type: 'manual_error',
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...context
    })
  } else {
    // Server-side
    trackServerError({
      type: 'manual_error',
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      additionalContext: context
    })
  }
}
