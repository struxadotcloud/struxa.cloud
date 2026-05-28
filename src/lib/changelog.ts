export type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  description: string;
  changes: string[];
  tags: string[];
  type: "major" | "minor" | "patch";
};

export const changelog: ChangelogEntry[] = [
  {
    version: "v1.0.1",
    date: "2026-05-28",
    title: "Animations, SEO Settings & MIT License",
    description:
      "Polish release on top of the 1.0.0 launch — smooth panel animations, a new SEO settings tab in the admin section, and the license switch to MIT.",
    changes: [
      "Smooth page and tab transition animations across the panel",
      "SEO settings tab in admin with live platform previews",
      "Accessibility: animations respect prefers-reduced-motion",
    ],
    tags: ["panel", "admin", "animations"],
    type: "patch",
  },
  {
    version: "v1.0.0",
    date: "2026-05-26",
    title: "Production Release",
    description:
      "Struxa is now ready for production use. This release brings a complete email system, full mobile responsiveness, and the foundational community guidelines and security policy.",
    changes: [
      "Email configuration, templates, and delivery system",
      "Internationalization for email settings and editor (Polish, German, French, Spanish)",
      "Full mobile-responsive web application",
      "MinIO object storage with avatar upload support",
      "User account page and admin user detail page",
      "Admin activity log with full audit trail",
      "Server activity log instrumentation",
      "Admin node management redesign with tab navigation and Wings config sync",
      "Extended instance settings with social authentication and 2FA enhancements",
      "Console color and formatting handlers",
    ],
    tags: ["launch", "email", "mobile", "i18n"],
    type: "major",
  },
];

export function formatChangelogDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
