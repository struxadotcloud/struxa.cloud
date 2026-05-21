import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono, Cal_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import { CookieConsent } from "@/components/cookie-consent";

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const calSans = Cal_Sans({ weight: "400", subsets: ["latin"], variable: "--font-heading" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  themeColor: "#66C72E",
};

export const metadata: Metadata = {
  title: {
    default: "Struxa - Open-source Game Server Management Panel",
    template: "%s | Struxa",
  },
  description:
    "Open-source, self-hosted game server management panel. A modern replacement for Pterodactyl — real-time monitoring, file management, multi-user access, and a clean operator-focused UI.",
  keywords: [
    "game server panel",
    "game server management",
    "pterodactyl alternative",
    "open source game panel",
    "self-hosted game servers",
    "minecraft server panel",
    "game server hosting",
    "wings daemon",
    "server management",
    "typescript game panel",
    "struxa",
  ],
  authors: [{ name: "Struxa" }],
  creator: "Struxa",
  publisher: "Struxa",
  metadataBase: new URL("https://struxa.cloud"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Struxa - Open-source Game Server Management Panel",
    description:
      "Open-source, self-hosted game server management panel. A modern replacement for Pterodactyl.",
    url: "https://struxa.cloud",
    siteName: "Struxa",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Struxa - Open-source Game Server Management Panel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Struxa - Open-source Game Server Management Panel",
    description:
      "Open-source, self-hosted game server management panel. A modern replacement for Pterodactyl.",
    creator: "@struxacloud",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "", // Add your Google Search Console verification code
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Struxa",
  description:
    "Open-source, self-hosted game server management panel. A modern replacement for Pterodactyl.",
  url: "https://struxa.cloud",
  logo: "https://static.struxa.cloud/logos/logo.svg",
  sameAs: ["https://twitter.com/struxacloud", "https://github.com/struxadotcloud/struxa"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["Polish", "English"],
  },
  serviceArea: {
    "@type": "Place",
    name: "Worldwide",
  },
  offers: {
    "@type": "Offer",
    description: "Open-source Game Server Management Panel",
    category: "Developer Tools",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "overflow-x-hidden font-sans",
        inter.variable,
        calSans.variable,
        geistMono.variable,
      )}
    >
      <body className="antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <div className="overflow-x-hidden">
            <PostHogProvider>
              {children}
              <CookieConsent />
            </PostHogProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
