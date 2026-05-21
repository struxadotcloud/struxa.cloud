import crypto from "crypto";

/**
 * Generate a secure unsubscribe token
 */
export function createUnsubscribeToken(email: string): string {
  const secret = process.env.UNSUBSCRIBE_SECRET || "fallback-secret";
  const timestamp = Date.now().toString();
  const data = `${email}:${timestamp}`;

  const hash = crypto.createHmac("sha256", secret).update(data).digest("hex");

  // Combine timestamp and hash for token
  return `${timestamp}.${hash}`;
}

/**
 * Verify an unsubscribe token
 */
export function verifyUnsubscribeToken(email: string, token: string): boolean {
  try {
    const [timestamp, hash] = token.split(".");
    if (!timestamp || !hash) return false;

    // Check if token is not older than 30 days
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

    if (tokenAge > maxAge) return false;

    // Verify hash
    const secret = process.env.UNSUBSCRIBE_SECRET || "fallback-secret";
    const data = `${email}:${timestamp}`;
    const expectedHash = crypto
      .createHmac("sha256", secret)
      .update(data)
      .digest("hex");

    return hash === expectedHash;
  } catch (error) {
    return false;
  }
}

/**
 * Generate a random ID for rate limiting
 */
export function generateId(): string {
  return crypto.randomBytes(16).toString("hex");
}

/**
 * Hash email for privacy in logs/storage
 */
export function hashEmail(email: string): string {
  return crypto.createHash("sha256").update(email.toLowerCase()).digest("hex");
}
