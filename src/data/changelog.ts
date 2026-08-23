export type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  description: string;
  changes: string[];
  tags: string[];
  type: 'major' | 'minor' | 'patch';
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: 'v1.1.4',
    date: '2026-08-20',
    title: 'Backup Destinations and Google Drive',
    description:
      'Choose where each backup lands — local storage, S3, or Google Drive. Every server can have its own destination, with admin-level defaults and hardened OAuth security throughout.',
    changes: [
      'Google Drive backup destination with OAuth, download, and remote config routes',
      'Per-server backup destination on create and edit, with a global admin default',
      'Opt-in public downloads for S3 backups, with graceful panel handling',
      'Security hardening: token revocation on disconnect, remote_id validation, filename sanitization, and race guards',
    ],
    tags: ['backups', 'google-drive', 'security'],
    type: 'minor',
  },
  {
    version: 'v1.1.3',
    date: '2026-07-19',
    title: 'Multi-Engine Databases and Panel Redesign',
    description:
      'Database hosts now support MySQL, MariaDB, PostgreSQL, MongoDB and Redis — plus a full visual refresh: new dark theme, Funnel Display headings, and dither-kit charts and avatars across the panel.',
    changes: [
      'Database hosts now support MySQL, MariaDB, PostgreSQL, MongoDB and Redis',
      'Redesigned admin danger zones, user pickers with avatars, and allocation UI',
      'Dither-kit generative avatars as the default user avatar',
      'Server info sparklines replaced with dither-kit charts',
      'Host selection now uses cryptographically secure randomness',
    ],
    tags: ['database', 'design'],
    type: 'minor',
  },
  {
    version: 'v1.1.1',
    date: '2026-07-04',
    title: 'Modrinth Installer & Unified Save Feedback',
    description:
      'A focused follow-up to 1.1.0 — install Minecraft plugins and mods straight from Modrinth, plus consistent toast feedback whenever you save a setting.',
    changes: [
      'Modrinth plugin & mod installer built into the Minecraft server console',
      'Save actions across the panel now report success or failure via toast notifications',
    ],
    tags: ['minecraft', 'ux'],
    type: 'minor',
  },
  {
    version: 'v1.1.0',
    date: '2026-06-28',
    title: 'Billing, Wallet & Shop, Reworked Auth',
    description:
      'A major update centered on billing: a wallet and shop system, referral program, subscription extensions, and plan/node capacity checks — alongside a redesigned auth flow and a cleaner nodes and nests admin experience.',
    changes: [
      'Wallet, shop, and referral program for billing',
      "Extend a server's subscription before it expires",
      'Plan-node filtering with stock checks and sold-out states',
      'Egg switching on server reinstall, plus a billing tab on the admin user page',
      'Redesigned auth pages with SMTP-gated password reset',
      'Nodes and locations merged into one page with a categorized, collapsible table',
      'Reworked egg import UI in the nests admin section',
      'EULA and Java version alerts surfaced directly in the server console',
      'Security hardening: sanitized error logging and resolved code-scanning alerts',
    ],
    tags: ['billing', 'auth', 'nodes', 'security'],
    type: 'minor',
  },
  {
    version: 'v1.0.1',
    date: '2026-05-28',
    title: 'Animations, SEO Settings & MIT License',
    description:
      'Polish release on top of the 1.0.0 launch — smooth panel animations, a new SEO settings tab in the admin section, and the license switch to MIT.',
    changes: [
      'Smooth page and tab transition animations across the panel',
      'SEO settings tab in admin with live platform previews',
      'Accessibility: animations respect prefers-reduced-motion',
    ],
    tags: ['panel', 'admin', 'animations'],
    type: 'patch',
  },
  {
    version: 'v1.0.0',
    date: '2026-05-26',
    title: 'Production Release',
    description:
      'Struxa is now ready for production use. This release brings a complete email system, full mobile responsiveness, and the foundational community guidelines and security policy.',
    changes: [
      'Email configuration, templates, and delivery system',
      'Internationalization for email settings and editor (Polish, German, French, Spanish)',
      'Full mobile-responsive web application',
      'MinIO object storage with avatar upload support',
      'User account page and admin user detail page',
      'Admin activity log with full audit trail',
      'Server activity log instrumentation',
      'Admin node management redesign with tab navigation and Wings config sync',
      'Extended instance settings with social authentication and 2FA enhancements',
      'Console color and formatting handlers',
    ],
    tags: ['launch', 'email', 'mobile', 'i18n'],
    type: 'major',
  },
];

export function formatChangelogDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
