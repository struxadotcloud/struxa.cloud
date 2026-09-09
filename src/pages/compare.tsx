import { ProjectComparison } from '../components/project-comparison';
import { SectionHeader } from '../components/section';
import { Seo } from '../components/seo';

export default function ComparePage() {
  return (
    <div>
      <Seo
        title="Compare — struxa"
        description="Compare struxa with Pterodactyl, Pelican, Calagopus, FeatherPanel, and Pyrodactyl."
        path="/compare"
      />
      <div className="px-6 pt-20 md:px-16">
        <SectionHeader
          label="Compare"
          heading="How struxa stacks up."
          description="Choose a panel to compare its stack, setup, and hosting features with struxa."
        />
      </div>
      <ProjectComparison />
    </div>
  );
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
