const COOKIE_CONSENT_KEY = 'cortano-cookie-consent'

export const getCookieConsent = (): 'accepted' | 'declined' | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(COOKIE_CONSENT_KEY) as 'accepted' | 'declined' | null
}

export const hasCookieConsent = (): boolean => {
  return getCookieConsent() === 'accepted'
}

export const setCookieConsent = (status: 'accepted' | 'declined'): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(COOKIE_CONSENT_KEY, status)
  }
}

export const clearCookieConsent = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(COOKIE_CONSENT_KEY)
  }
}
