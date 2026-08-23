import { Fragment } from 'react';
import { SectionHeader } from '../components/section';
import { Seo } from '../components/seo';

type FeatureValue = boolean | string;

const CATEGORIES: {
  name: string;
  features: { name: string; struxa: FeatureValue; pterodactyl: FeatureValue; pelican: FeatureValue }[];
}[] = [
  {
    name: 'Core',
    features: [
      { name: 'Open source', struxa: 'MIT', pterodactyl: 'Custom license', pelican: 'AGPL-3.0' },
      { name: 'Docker-isolated servers', struxa: true, pterodactyl: true, pelican: true },
      { name: 'Egg templates for game servers', struxa: true, pterodactyl: true, pelican: true },
      { name: 'Security — 2FA, SSL, encryption', struxa: true, pterodactyl: true, pelican: true },
      { name: 'Free to self-host', struxa: true, pterodactyl: true, pelican: true },
    ],
  },
  {
    name: 'Running a hosting business',
    features: [
      {
        name: 'Built-in billing, wallet, and subscriptions',
        struxa: true,
        pterodactyl: false,
        pelican: false,
      },
      { name: 'Backup destinations — S3, Google Drive', struxa: true, pterodactyl: false, pelican: false },
      { name: 'Custom domain and branding', struxa: true, pterodactyl: true, pelican: true },
      { name: 'Subusers and multi-user access', struxa: true, pterodactyl: true, pelican: true },
      { name: 'Internationalization', struxa: true, pterodactyl: false, pelican: false },
    ],
  },
  {
    name: 'Operations',
    features: [
      { name: 'One-line installer', struxa: true, pterodactyl: false, pelican: false },
      { name: 'Managed cloud hosting', struxa: 'Waitlist', pterodactyl: false, pelican: false },
      { name: 'Real-time resource monitoring', struxa: true, pterodactyl: true, pelican: true },
    ],
  },
];

function Cell({ value, highlight }: { value: FeatureValue; highlight?: boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <svg viewBox="0 0 12 12" className={`mx-auto h-3.5 w-3.5 ${highlight ? 'text-blue-400' : 'text-neutral-500'}`}>
        <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ) : (
      <span className="text-neutral-700">—</span>
    );
  }
  return <span className={highlight ? 'text-blue-400' : 'text-neutral-400'}>{value}</span>;
}

export default function ComparePage() {
  return (
    <div>
      <Seo
        title="Compare — struxa"
        description="How struxa stacks up against Pterodactyl and Pelican."
        path="/compare"
      />

      <div className="px-6 pt-20 md:px-16">
        <SectionHeader
          label="Compare"
          heading="How struxa stacks up."
          description="The feature comparison between struxa, Pterodactyl and Pelican — based on publicly available information."
        />
      </div>

      <div className="border-t border-neutral-800 px-6 py-14 md:px-16">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="px-6 py-3.5 text-left font-normal uppercase tracking-wide text-neutral-500 md:px-16">
                  Feature
                </th>
                <th className="px-4 py-3.5 text-center font-normal uppercase tracking-wide text-blue-400">struxa</th>
                <th className="px-4 py-3.5 text-center font-normal uppercase tracking-wide text-neutral-500">
                  Pterodactyl
                </th>
                <th className="px-4 py-3.5 text-center font-normal uppercase tracking-wide text-neutral-500">
                  Pelican
                </th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((category) => (
                <Fragment key={category.name}>
                  <tr className="border-b border-neutral-800 bg-neutral-900/40">
                    <td colSpan={4} className="px-6 py-2.5 text-neutral-300 md:px-16">
                      {category.name}
                    </td>
                  </tr>
                  {category.features.map((feature) => (
                    <tr key={feature.name} className="border-b border-neutral-800">
                      <td className="px-6 py-3 text-neutral-300 md:px-16">{feature.name}</td>
                      <td className="px-4 py-3 text-center">
                        <Cell value={feature.struxa} highlight />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Cell value={feature.pterodactyl} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Cell value={feature.pelican} />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 font-mono text-[11px] text-neutral-600">
          Based on publicly available information as of August 2026.
        </p>
      </div>
    </div>
  );
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
