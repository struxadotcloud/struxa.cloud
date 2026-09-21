import { DitherHeroBackground } from './dither-hero-background';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Compare', href: '/compare' },
      { label: 'Docs', href: 'https://docs.struxa.cloud' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Branding', href: '/branding' },
      { label: 'GitHub', href: 'https://github.com/struxadotcloud/struxa' },
      { label: 'Discord', href: 'https://discord.struxa.cloud' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden pt-12">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <a href="/" aria-label="struxa home">
              <img src="/images/brand/wordmark.png" alt="struxa" width="448" height="90" className="h-auto w-28" />
            </a>
            <p className="mt-3 max-w-xs text-sm text-neutral-500">
              Self-hosted, open-source game server management.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                  {col.title}
                </p>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-neutral-400 hover:text-neutral-100"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-xs text-neutral-600">
          © {new Date().getFullYear()} Disaster Limited
        </p>
      </div>

      {/* brand lockup as a dim, near-full-width backdrop; the dither fades in
          from around the footer's vertical middle down to the page bottom */}
      <DitherHeroBackground className="absolute inset-x-0 bottom-0 h-[32rem] overflow-hidden [mask-image:linear-gradient(to_top,black_45%,transparent_95%)]" />
      <div className="relative z-10 mt-16 px-6 sm:px-10">
        <img
          src="/images/brand/long-whiteblue.png"
          alt=""
          aria-hidden
          width={640}
          height={128}
          className="-mb-6 w-full opacity-20"
        />
      </div>
    </footer>
  );
};
