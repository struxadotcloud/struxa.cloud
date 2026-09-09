import { SectionHeader } from '../components/section';
import { Seo } from '../components/seo';
import { SoftwareComparison } from '../components/software-comparison';

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
          description="Select software and compare struxa across core operations and business-ready features."
        />
      </div>

      <div className="border-t border-neutral-800 px-6 py-14 md:px-16">
        <SoftwareComparison />

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
