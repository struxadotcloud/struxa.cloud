import { Fragment } from 'react';
import { Check } from 'lucide-react';

type FeatureValue = boolean | string;

const CATEGORIES: {
  name: string;
  features: { name: string; selfHosted: FeatureValue; cloud: FeatureValue; enterprise: FeatureValue }[];
}[] = [
  {
    name: 'Core Features',
    features: [
      { name: 'Cost', selfHosted: 'Free', cloud: 'TBD', enterprise: 'Custom' },
      { name: 'Game server management', selfHosted: true, cloud: true, enterprise: true },
      { name: 'Unlimited servers', selfHosted: true, cloud: true, enterprise: true },
      { name: 'Node management', selfHosted: 'Self-managed', cloud: 'Managed', enterprise: 'Managed' },
      { name: 'Real-time monitoring', selfHosted: true, cloud: true, enterprise: true },
      { name: 'Backup management', selfHosted: true, cloud: true, enterprise: true },
    ],
  },
  {
    name: 'Management & Access',
    features: [
      { name: 'Multi-user support', selfHosted: true, cloud: true, enterprise: true },
      { name: 'Custom domain', selfHosted: true, cloud: true, enterprise: true },
      { name: 'Remove struxa branding', selfHosted: true, cloud: true, enterprise: true },
      { name: 'Custom panel themes', selfHosted: true, cloud: false, enterprise: true },
      { name: 'Custom email notifications', selfHosted: true, cloud: false, enterprise: true },
    ],
  },
  {
    name: 'Support & Services',
    features: [
      { name: 'Email support', selfHosted: false, cloud: true, enterprise: true },
      { name: 'Community support', selfHosted: true, cloud: false, enterprise: false },
      { name: 'Priority support', selfHosted: false, cloud: false, enterprise: true },
      { name: 'All features included', selfHosted: false, cloud: false, enterprise: true },
    ],
  },
  {
    name: 'Monitoring & Reporting',
    features: [
      { name: 'Server metrics', selfHosted: true, cloud: true, enterprise: true },
      { name: 'Activity logs', selfHosted: true, cloud: true, enterprise: true },
      { name: 'Resource usage tracking', selfHosted: true, cloud: true, enterprise: true },
      { name: 'Advanced reports and exports', selfHosted: true, cloud: true, enterprise: true },
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

export function PricingComparison() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/30 shadow-[inset_0_1px_0_rgb(255_255_255/0.03)]">
      <table className="w-full min-w-[36rem] border-collapse text-xs">
        <thead>
          <tr className="border-b border-neutral-800/70">
            <th className="px-5 py-3.5 text-left font-normal uppercase tracking-wide text-neutral-500">
              Feature
            </th>
            <th className="px-4 py-3.5 text-center font-normal uppercase tracking-wide text-neutral-500">
              Self-Hosted
            </th>
            <th className="px-4 py-3.5 text-center font-normal uppercase tracking-wide text-blue-400">Cloud</th>
            <th className="px-4 py-3.5 text-center font-normal uppercase tracking-wide text-neutral-500">
              Enterprise
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
                    <Cell value={feature.selfHosted} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Cell value={feature.cloud} highlight />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Cell value={feature.enterprise} />
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
