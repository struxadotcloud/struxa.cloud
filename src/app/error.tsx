'use client'

import { useEffect } from 'react'
import { trackError } from '@/lib/posthog'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Track the error with PostHog
    trackError(error, {
      errorPage: true,
      digest: error.digest,
      source: 'next_error_page'
    })
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-destructive mb-4">
            Something went wrong!
          </h2>
          <p className="text-muted-foreground mb-4">
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <details className="mb-4">
              <summary className="cursor-pointer text-sm font-medium">
                Error Details (Development Only)
              </summary>
              <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
                {error.message}
                {error.stack && (
                  <>
                    {'\n\n'}
                    {error.stack}
                  </>
                )}
                {error.digest && (
                  <>
                    {'\n\nDigest: '}
                    {error.digest}
                  </>
                )}
              </pre>
            </details>
          )}
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
