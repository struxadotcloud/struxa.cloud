"use server";

import { rateLimit } from "@/lib/rate-limit";
import type { SupportedLocale } from "@/lib/mail";
import { headers } from "next/headers";

export interface NewsletterSignupData {
  email: string;
  locale: SupportedLocale;
  firstName?: string;
  lastName?: string;
  source?: string;
}

export interface NewsletterSignupResult {
  success: boolean;
  message: string;
  rateLimited?: boolean;
  errorCode?: string;
}

export async function signupForNewsletter(
  data: NewsletterSignupData,
): Promise<NewsletterSignupResult> {
  const startTime = Date.now();

  try {
    const headersList = await headers();
    const forwarded = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const ipAddress = forwarded?.split(",")[0]?.trim() || realIp || "unknown";

    console.log(`Newsletter signup attempt: ${data.email} from ${ipAddress}`);

    const { success: rateLimitSuccess } = await rateLimit(
      `newsletter-signup:${ipAddress}`,
      5,
      3600000,
    );

    if (!rateLimitSuccess) {
      console.warn(`Rate limit exceeded for IP: ${ipAddress}`);
      return {
        success: false,
        message: "Too many signup attempts. Please try again later.",
        rateLimited: true,
        errorCode: "RATE_LIMITED",
      };
    }

    const email = data.email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      console.warn(`Invalid email format: ${email}`);
      return {
        success: false,
        message: "Please enter a valid email address.",
        errorCode: "INVALID_EMAIL",
      };
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is missing");
      return {
        success: false,
        message: "Newsletter service is not configured.",
        errorCode: "RESEND_NOT_CONFIGURED",
      };
    }

    const response = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        first_name: data.firstName,
        last_name: data.lastName,
        unsubscribed: false,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();

      // Handle duplicate contact gracefully
      if (response.status === 409 || /already exists/i.test(errorText)) {
        console.warn(`Already subscribed: ${email}`);
        return {
          success: false,
          message: "Email is already subscribed to our newsletter.",
          errorCode: "ALREADY_SUBSCRIBED",
        };
      }

      console.error(
        `Resend contact create failed for ${email}: ${response.status} ${errorText}`,
      );
      return {
        success: false,
        message: "An error occurred. Please try again later.",
        errorCode: "RESEND_ERROR",
      };
    }

    const duration = Date.now() - startTime;
    console.log(`Newsletter signup completed in ${duration}ms for: ${email}`);

    return {
      success: true,
      message: "Successfully subscribed.",
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`Newsletter signup error after ${duration}ms:`, error);

    return {
      success: false,
      message: "An error occurred. Please try again later.",
      errorCode: "INTERNAL_ERROR",
    };
  }
}
