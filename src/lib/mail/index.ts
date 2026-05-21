import { render } from "@react-email/components";
import {
  SESClient,
  SendEmailCommand,
  type SendEmailCommandOutput,
} from "@aws-sdk/client-ses";
import { StruxaWelcomeEmail } from "./template/signup";
import {
  getEmailTranslations,
  type SupportedLocale,
} from "./email-translations";
import { createUnsubscribeToken, verifyUnsubscribeToken } from "./utils";

// Environment variable validation
function validateEmailConfig() {
  const requiredVars = {
    SES_ACCESS_KEY_ID: process.env.SES_ACCESS_KEY_ID,
    SES_SECRET_ACCESS_KEY: process.env.SES_SECRET_ACCESS_KEY,
  };

  const missing = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.warn(`Missing AWS SES configuration: ${missing.join(", ")}`);
    return false;
  }

  return true;
}

// Production AWS SES client with fallback
const createSESClient = () => {
  if (!validateEmailConfig()) {
    console.warn("Using mock email client due to missing AWS configuration");
    return {
      send: async (command: any) => {
        console.log("Mock SES: Would send email", {
          to: command.input?.Destination?.ToAddresses,
          subject: command.input?.Message?.Subject?.Data,
        });
        return { MessageId: "mock-message-id" };
      },
    };
  }

  return new SESClient({
    region: process.env.SES_REGION || "us-east-1",
    credentials: {
      accessKeyId: process.env.SES_ACCESS_KEY_ID!,
      secretAccessKey: process.env.SES_SECRET_ACCESS_KEY!,
    },
  });
};

const sesClient = createSESClient();

// Email configuration
const DEFAULT_FROM_EMAIL = process.env.SES_FROM_EMAIL || "noreply@struxa.cloud";
const DEFAULT_FROM_NAME = process.env.SES_FROM_NAME || "Struxa";
const CONFIGURATION_SET = process.env.SES_CONFIGURATION_SET;

export interface NewsletterSubscriber {
  email: string;
  locale: SupportedLocale;
  firstName?: string;
  lastName?: string;
  unsubscribeToken?: string;
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

/**
 * Send email using AWS SES
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const fromAddress = `${DEFAULT_FROM_NAME} <${DEFAULT_FROM_EMAIL}>`;

    const params = {
      Source: options.from || fromAddress,
      Destination: {
        ToAddresses: [options.to],
      },
      Message: {
        Subject: {
          Data: options.subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: options.html,
            Charset: "UTF-8",
          },
          ...(options.text && {
            Text: {
              Data: options.text,
              Charset: "UTF-8",
            },
          }),
        },
      },
      ...(CONFIGURATION_SET && {
        ConfigurationSetName: CONFIGURATION_SET,
      }),
    };

    const command = new SendEmailCommand(params);
    const result = (await sesClient.send(command)) as SendEmailCommandOutput;

    console.log(`Email sent successfully. MessageId: ${result.MessageId}`);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

/**
 * Generate welcome email HTML for specific locale
 */
export async function generateWelcomeEmailHtml(
  locale: SupportedLocale = "en",
  subscriberInfo?: Partial<NewsletterSubscriber>,
): Promise<string> {
  const { translations, steps, links } = getEmailTranslations(locale);

  const emailHtml = await render(
    StruxaWelcomeEmail({
      steps,
      links,
      locale,
      translations,
      email: subscriberInfo?.email,
      unsubscribeToken: subscriberInfo?.unsubscribeToken,
    }),
  );

  return emailHtml;
}

/**
 * Send welcome email to new subscriber
 */
export async function sendWelcomeEmail(
  subscriber: NewsletterSubscriber,
): Promise<boolean> {
  try {
    const { translations } = getEmailTranslations(subscriber.locale);
    const emailHtml = await generateWelcomeEmailHtml(
      subscriber.locale,
      subscriber,
    );

    const subject = translations.welcome;

    return await sendEmail({
      to: subscriber.email,
      subject,
      html: emailHtml,
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return false;
  }
}

/**
 * Generate unsubscribe token for email
 */
export { createUnsubscribeToken } from "./utils";

/**
 * Verify unsubscribe token
 */
export { verifyUnsubscribeToken } from "./utils";

/**
 * Get subject line translations for different email types
 */
export function getEmailSubjects(locale: SupportedLocale = "en") {
  const subjects = {
    en: {
      welcome: "Welcome to Struxa — Your Game Server Management Panel",
      newsletter: "Struxa Newsletter",
      unsubscribe: "You've been unsubscribed",
    },
    de: {
      welcome: "Willkommen bei Struxa — Ihr Game-Server-Management-Panel",
      newsletter: "Struxa Newsletter",
      unsubscribe: "Sie wurden abgemeldet",
    },
    es: {
      welcome:
        "Bienvenido a Struxa — Tu Panel de Gestión de Servidores de Juegos",
      newsletter: "Boletín de Struxa",
      unsubscribe: "Te has dado de baja",
    },
    pl: {
      welcome: "Witamy w Struxa — Twój panel zarządzania serwerami gier",
      newsletter: "Newsletter Struxa",
      unsubscribe: "Zostałeś wypisany",
    },
  };

  return subjects[locale] || subjects.en;
}

// Export types
export type { SupportedLocale };
