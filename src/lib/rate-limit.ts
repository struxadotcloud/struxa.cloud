interface RateLimitState {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitState>();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

/**
 * Simple in-memory rate limiting
 * In production, you might want to use Redis or another persistent store
 */
export async function rateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const now = Date.now();
  const key = identifier;
  
  // Clean up expired entries
  for (const [k, state] of rateLimitStore.entries()) {
    if (now > state.resetTime) {
      rateLimitStore.delete(k);
    }
  }

  let state = rateLimitStore.get(key);
  
  if (!state || now > state.resetTime) {
    // Create new window
    state = {
      count: 0,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(key, state);
  }

  if (state.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: state.resetTime,
    };
  }

  state.count++;
  rateLimitStore.set(key, state);

  return {
    success: true,
    remaining: limit - state.count,
    resetTime: state.resetTime,
  };
}

/**
 * Get current rate limit status without consuming a request
 */
export async function getRateLimitStatus(
  identifier: string,
  limit: number
): Promise<Omit<RateLimitResult, 'success'>> {
  const now = Date.now();
  const state = rateLimitStore.get(identifier);
  
  if (!state || now > state.resetTime) {
    return {
      remaining: limit,
      resetTime: now,
    };
  }

  return {
    remaining: Math.max(0, limit - state.count),
    resetTime: state.resetTime,
  };
}

/**
 * Clear rate limit for an identifier (useful for testing or admin overrides)
 */
export function clearRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}
