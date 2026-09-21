import { Fragment } from 'react';
import { Check } from 'lucide-react';
import { CtaSection } from '../components/cta-section';
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
      <Check className={`mx-auto size-3.5 ${highlight ? 'text-blue-400' : 'text-neutral-500'}`} />
    ) : (
      <span className="text-neutral-700">-</span>
    );
  }
  return <span className={highlight ? 'text-blue-400' : 'text-neutral-400'}>{value}</span>;
}

export default function ComparePage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <Seo
        title="Compare — struxa"
        description="How struxa stacks up against Pterodactyl and Pelican."
        path="/compare"
      />

      <div className="px-6 pt-16">
        <SectionHeader
          label="Compare"
          heading="How struxa stacks up."
          description="The feature comparison between struxa, Pterodactyl and Pelican — based on publicly available information."
        />
      </div>

      <div className="px-6 py-10">
        <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/30 shadow-[inset_0_1px_0_rgb(255_255_255/0.03)]">
          <table className="w-full min-w-[36rem] border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-800/70">
                <th className="px-5 py-3.5 text-left font-normal uppercase tracking-wide text-neutral-500">
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
                  <tr className="border-b border-neutral-800/70 bg-white/[0.02]">
                    <td colSpan={4} className="px-5 py-2.5 text-neutral-300">
                      {category.name}
                    </td>
                  </tr>
                  {category.features.map((feature) => (
                    <tr key={feature.name} className="border-b border-neutral-800/50 last:border-b-0">
                      <td className="px-5 py-3 text-neutral-300">{feature.name}</td>
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

        <p className="mt-4 text-[11px] text-neutral-600">
          Based on publicly available information as of August 2026.
        </p>
      </div>

      <CtaSection />
    </div>
  );
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
