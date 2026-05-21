import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  pixelBasedPreset,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import type * as React from 'react';

interface StruxaWelcomeEmailProps {
  steps: {
    id: number;
    Description: React.ReactNode;
  }[];
  links: {
    title: string;
    href: string;
  }[];
  locale?: string;
  unsubscribeToken?: string;
  email?: string;
  translations?: {
    preview: string;
    welcome: string;
    thankYou: string;
    expectFrom: string;
    unsubscribe: string;
    companyInfo: string;
    steps: {
      productUpdates: {
        title: string;
        description: string;
        linkText: string;
      };
      industryInsights: {
        title: string;
        description: string;
        linkText: string;
      };
      exclusiveContent: {
        title: string;
        description: string;
        linkText: string;
      };
      earlyAccess: {
        title: string;
        description: string;
        linkText: string;
      };
    };
    links: {
      blog: string;
      documentation: string;
      support: string;
    };
  };
}

const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://struxa.cloud';

export const StruxaWelcomeEmail = ({
  steps,
  links,
  locale = 'en',
  unsubscribeToken,
  email,
  translations,
}: StruxaWelcomeEmailProps) => {
  // Default English translations
  const defaultTranslations = {
    preview: 'Welcome to Struxa - Your AI Call Agent Platform',
    welcome: 'Welcome to Struxa',
    thankYou: 'Thank you for subscribing to our newsletter! You\'re now part of our community that\'s revolutionizing customer support with AI-powered call agents.',
    expectFrom: 'Here\'s what you can expect from us:',
    unsubscribe: 'Unsubscribe',
    companyInfo: 'Struxa, London, United Kingdom',
    steps: {
      productUpdates: {
        title: 'Product Updates & Releases.',
        description: 'about new features, improvements, and AI call agent capabilities we\'re launching.',
        linkText: 'Be the first to know'
      },
      industryInsights: {
        title: 'Industry Insights.',
        description: 'Get expert analysis on customer service trends, AI automation, and best practices for scaling your support operations.',
        linkText: 'Read our latest insights'
      },
      exclusiveContent: {
        title: 'Exclusive Content.',
        description: 'Access to webinars, case studies, and tutorials that help you maximize your AI call agent implementation.',
        linkText: 'Explore our resource library'
      },
      earlyAccess: {
        title: 'Early Access Opportunities.',
        description: 'Get invited to beta test new features and provide feedback that shapes the future of our platform.',
        linkText: 'Join our beta program'
      }
    },
    links: {
      blog: 'Visit our blog',
      documentation: 'Read documentation',
      support: 'Contact support'
    }
  };

  const t = translations || defaultTranslations;
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                primary: 'oklch(0.7420 0.2045 136.8584)',
                'primary-foreground': 'oklch(0.2626 0.0147 166.4589)',
                background: 'oklch(0.9911 0 0)',
                foreground: 'oklch(0.2046 0 0)',
                muted: 'oklch(0.9461 0 0)',
                'muted-foreground': 'oklch(0.2435 0 0)',
                border: 'oklch(0.9037 0 0)',
                card: 'oklch(0.9911 0 0)',
                'card-foreground': 'oklch(0.2046 0 0)',
              },
              fontFamily: {
                sans: ['Outfit', 'system-ui', 'sans-serif'],
              },
              spacing: {
                0: '0px',
                20: '20px',
                45: '45px',
              },
            },
          },
        }}
      >
        <Preview>{t.preview}</Preview>
        <Body className="bg-background font-sans text-base">
          <Img
            src="https://static.struxa.cloud/logos/logo.svg"
            width="120"
            height="32"
            alt="Struxa"
            className="mx-auto my-20"
          />
          <Container className="bg-white p-45 border border-border rounded-lg">
            <Heading className="my-0 text-center leading-8 text-foreground">
              {t.welcome}
            </Heading>

            <Section>
              <Row>
                <Text className="text-base text-foreground">
                  {t.thankYou}
                </Text>

                <Text className="text-base text-foreground">
                  {t.expectFrom}
                </Text>
              </Row>
            </Section>

            <ul>{steps?.map(({ Description }: { Description: React.ReactNode }) => Description)}</ul>

            <Section className="mt-45">
              <Row>
                {links?.map((link: { title: string; href: string }) => (
                  <Column key={link.title}>
                    <Link
                      className="font-bold text-foreground underline"
                      href={link.href}
                    >
                      {link.title}
                    </Link>{' '}
                    <span className="text-foreground">→</span>
                  </Column>
                ))}
              </Row>
            </Section>
          </Container>

          <Container className="mt-20">
            <Section>
              <Row>
                <Column className="px-20 text-right">
                  <Link 
                    className="text-muted-foreground"
                    href={`${baseUrl}/unsubscribe?email=${encodeURIComponent(email || '')}&token=${unsubscribeToken || ''}`}
                  >
                    {t.unsubscribe}
                  </Link>
                </Column>
              </Row>
            </Section>
            <Text className="mb-45 text-center text-muted">
              {t.companyInfo}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Helper function to generate localized steps
export const generateLocalizedSteps = (t: any) => [
  {
    id: 1,
    Description: (
      <li className="mb-20" key={1}>
        <strong>{t.steps.productUpdates.title}</strong>{' '}
        <Link className="text-foreground underline">{t.steps.productUpdates.linkText}</Link> {t.steps.productUpdates.description}
      </li>
    ),
  },
  {
    id: 2,
    Description: (
      <li className="mb-20" key={2}>
        <strong>{t.steps.industryInsights.title}</strong> {t.steps.industryInsights.description}{' '}
        <Link className="text-foreground underline">{t.steps.industryInsights.linkText}</Link>.
      </li>
    ),
  },
  {
    id: 3,
    Description: (
      <li className="mb-20" key={3}>
        <strong>{t.steps.exclusiveContent.title}</strong> {t.steps.exclusiveContent.description}{' '}
        <Link className="text-foreground underline">{t.steps.exclusiveContent.linkText}</Link>.
      </li>
    ),
  },
  {
    id: 4,
    Description: (
      <li className="mb-20" key={4}>
        <strong>{t.steps.earlyAccess.title}</strong> {t.steps.earlyAccess.description}{' '}
        <Link className="text-foreground underline">{t.steps.earlyAccess.linkText}</Link>.
      </li>
    ),
  },
];

// Helper function to generate localized links
export const generateLocalizedLinks = (t: any) => [
  {
    title: t.links.blog,
    href: 'https://struxa.cloud/blog',
  },
  { 
    title: t.links.documentation, 
    href: 'https://docs.struxa.cloud' 
  },
  { 
    title: t.links.support, 
    href: 'mailto:hello@struxa.cloud' 
  },
];

StruxaWelcomeEmail.PreviewProps = {
  steps: generateLocalizedSteps({
    steps: {
      productUpdates: {
        title: 'Product Updates & Releases.',
        description: 'about new features, improvements, and AI call agent capabilities we\'re launching.',
        linkText: 'Be the first to know'
      },
      industryInsights: {
        title: 'Industry Insights.',
        description: 'Get expert analysis on customer service trends, AI automation, and best practices for scaling your support operations.',
        linkText: 'Read our latest insights'
      },
      exclusiveContent: {
        title: 'Exclusive Content.',
        description: 'Access to webinars, case studies, and tutorials that help you maximize your AI call agent implementation.',
        linkText: 'Explore our resource library'
      },
      earlyAccess: {
        title: 'Early Access Opportunities.',
        description: 'Get invited to beta test new features and provide feedback that shapes the future of our platform.',
        linkText: 'Join our beta program'
      }
    }
  }),
  links: generateLocalizedLinks({
    links: {
      blog: 'Visit our blog',
      documentation: 'Read documentation',
      support: 'Contact support'
    }
  }),
  locale: 'en',
} satisfies StruxaWelcomeEmailProps;

export default StruxaWelcomeEmail;
