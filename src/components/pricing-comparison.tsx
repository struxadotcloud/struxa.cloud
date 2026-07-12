import { Fragment } from 'react';

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
      <svg viewBox="0 0 12 12" className={`mx-auto h-3.5 w-3.5 ${highlight ? 'text-blue-400' : 'text-neutral-500'}`}>
        <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ) : (
      <span className="text-neutral-700">—</span>
    );
  }
  return <span className={highlight ? 'text-blue-400' : 'text-neutral-400'}>{value}</span>;
}

export function PricingComparison() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse font-mono text-xs">
        <thead>
          <tr className="border-b border-neutral-800">
            <th className="px-6 py-3.5 text-left font-normal uppercase tracking-wide text-neutral-500 md:px-16">
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
              <tr className="border-b border-neutral-800 bg-neutral-900/40">
                <td colSpan={4} className="px-6 py-2.5 text-neutral-300 md:px-16">
                  {category.name}
                </td>
              </tr>
              {category.features.map((feature) => (
                <tr key={feature.name} className="border-b border-neutral-800">
                  <td className="px-6 py-3 text-neutral-300 md:px-16">{feature.name}</td>
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
