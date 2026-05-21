'use client'

import React from 'react'
import { trackError } from '@/lib/posthog'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo)
    
    // Track the error with PostHog
    trackError(error, {
      errorBoundary: true,
      componentStack: errorInfo.componentStack,
      errorInfo: errorInfo
    })

    // Call the optional onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    this.setState({ errorInfo })
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // If a custom fallback component is provided, use it
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md w-full mx-auto p-6">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-destructive mb-4">
                Something went wrong
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
                    {this.state.error.message}
                    {this.state.error.stack && (
                      <>
                        {'\n\n'}
                        {this.state.error.stack}
                      </>
                    )}
                  </pre>
                </details>
              )}
              <button
                onClick={this.resetError}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook for functional components to handle errors
export const useErrorHandler = () => {
  return React.useCallback((error: Error, errorInfo?: any) => {
    console.error('Error caught by useErrorHandler:', error)
    trackError(error, { errorInfo, hookUsage: true })
  }, [])
}
