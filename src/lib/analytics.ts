import posthog from 'posthog-js'

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, properties)
  }
}

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.identify(userId, properties)
  }
}

export const resetUser = () => {
  if (typeof window !== 'undefined') {
    posthog.reset()
  }
}

export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.people.set(properties)
  }
}

// Common event tracking functions
export const trackPageView = (page: string, properties?: Record<string, any>) => {
  trackEvent('page_view', { page, ...properties })
}

export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('button_click', { button_name: buttonName, location })
}

export const trackFeatureUsed = (featureName: string, properties?: Record<string, any>) => {
  trackEvent('feature_used', { feature_name: featureName, ...properties })
}

export const trackSignup = (method?: string) => {
  trackEvent('user_signup', { signup_method: method })
}

export const trackLogin = (method?: string) => {
  trackEvent('user_login', { login_method: method })
}
