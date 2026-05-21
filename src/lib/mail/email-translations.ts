import {
  generateLocalizedSteps,
  generateLocalizedLinks,
} from "./template/signup";

// Import translation files
const enMessages = require("@/messages/en.json");

const messages = {
  en: enMessages,
} as const;

export type SupportedLocale = keyof typeof messages;

export function getEmailTranslations(locale: SupportedLocale = "en") {
  const localeMessages = messages[locale] || messages.en;
  const emailTranslations = localeMessages.welcomeEmail;

  return {
    translations: emailTranslations,
    steps: generateLocalizedSteps(emailTranslations),
    links: generateLocalizedLinks(emailTranslations),
    locale,
  };
}

export function getSupportedLocales(): SupportedLocale[] {
  return Object.keys(messages) as SupportedLocale[];
}
