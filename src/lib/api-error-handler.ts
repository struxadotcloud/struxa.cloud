import { NextRequest, NextResponse } from 'next/server'
import { trackServerError } from '@/lib/posthog'

export interface ApiError extends Error {
  statusCode?: number
  code?: string
}

export class ApiErrorHandler {
  static async handleError(
    error: ApiError,
    request: NextRequest,
    context?: Record<string, any>
  ): Promise<NextResponse> {
    const statusCode = error.statusCode || 500
    const errorId = crypto.randomUUID()

    // Track the error with PostHog
    await trackServerError({
      type: 'api_error',
      message: error.message,
      stack: error.stack,
      route: request.nextUrl.pathname,
      method: request.method,
      statusCode,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      additionalContext: {
        errorId,
        errorCode: error.code,
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        ...context
      }
    })

    // Log the error for server-side debugging
    console.error(`API Error [${errorId}]:`, {
      message: error.message,
      stack: error.stack,
      route: request.nextUrl.pathname,
      method: request.method,
      statusCode,
      context
    })

    // Return appropriate error response
    const isDevelopment = process.env.NODE_ENV === 'development'
    
    return NextResponse.json(
      {
        error: {
          message: isDevelopment ? error.message : 'An unexpected error occurred',
          ...(isDevelopment && { 
            stack: error.stack,
            details: context 
          }),
          errorId,
          timestamp: new Date().toISOString()
        }
      },
      { status: statusCode }
    )
  }

  static createErrorWrapper<T extends any[], R>(
    handler: (...args: T) => Promise<R>
  ) {
    return async (...args: T): Promise<R | NextResponse> => {
      try {
        return await handler(...args)
      } catch (error) {
        // Extract request from arguments (typically first argument in Next.js API routes)
        const request = args[0] as NextRequest
        
        if (error instanceof Error) {
          return await ApiErrorHandler.handleError(error, request)
        }
        
        // Handle non-Error objects
        const unknownError = new Error('Unknown error occurred')
        return await ApiErrorHandler.handleError(unknownError, request, {
          originalError: error
        })
      }
    }
  }
}

// Helper function to create a custom API error
export function createApiError(
  message: string,
  statusCode: number = 500,
  code?: string
): ApiError {
  const error = new Error(message) as ApiError
  error.statusCode = statusCode
  error.code = code
  return error
}

// Middleware wrapper for error handling
export function withErrorHandling<T extends any[], R>(
  handler: (...args: T) => Promise<R>
) {
  return ApiErrorHandler.createErrorWrapper(handler)
}
