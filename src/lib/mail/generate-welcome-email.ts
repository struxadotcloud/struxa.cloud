import { SyntetiqWelcomeEmail } from "./template/signup";
import { getEmailTranslations } from "./email-translations";

// Example usage: Generate localized email for different languages

export function generateWelcomeEmail(locale: "en" = "en") {
  const { translations, steps, links } = getEmailTranslations(locale);

  return SyntetiqWelcomeEmail({
    steps,
    links,
    locale,
    translations,
  });
}

// Example: Generate English email
// const englishEmail = generateWelcomeEmail('en');

// Note: German/Spanish locales were removed from the website.

// Example: Generate Polish email
// const polishEmail = generateWelcomeEmail('pl');
