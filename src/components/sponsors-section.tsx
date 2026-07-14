const UTM = 'utm_source=struxa&utm_medium=referral&utm_campaign=sponsors';

const SPONSORS = [
  { name: 'psHost', logo: '/assets/psHost.png', href: `https://pshost.pl?${UTM}` },
  { name: 'elean', logo: '/assets/elean.png', href: `https://elean.app?${UTM}` },
];

export function SponsorsSection() {
  return (
    <div className="grid divide-y divide-neutral-800 border-b border-neutral-800 md:grid-cols-3 md:divide-x md:divide-y-0">
      {SPONSORS.map((sponsor) => (
        <a
          key={sponsor.name}
          href={sponsor.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex h-32 items-center justify-center px-6 transition-colors hover:bg-neutral-900"
        >
          {sponsor.logo ? (
            <img src={sponsor.logo} alt={sponsor.name} className="max-h-12 max-w-full object-contain opacity-70 transition-opacity hover:opacity-100" />
          ) : (
            <span className="font-mono text-sm text-neutral-500">{sponsor.name}</span>
          )}
        </a>
      ))}

      <a
        href="mailto:admin@disasterlimited.tech"
        className="flex h-32 items-center justify-center px-6 font-mono text-sm text-blue-500 transition-colors hover:bg-neutral-900 hover:text-blue-400"
      >
        Become a sponsor →
      </a>
    </div>
  );
}
