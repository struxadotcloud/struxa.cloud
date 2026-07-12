import { ChangelogTimeline } from '../components/changelog-timeline';
import { SectionHeader } from '../components/section';
import { Seo } from '../components/seo';

export default function ChangelogPage() {
  return (
    <div>
      <Seo
        title="Changelog — struxa"
        description="Every release, every fix, every improvement to struxa — documented here."
        path="/changelog"
      />

      <div className="px-6 pb-6 pt-20 md:px-16">
        <SectionHeader
          label="What's new"
          heading="Changelog"
          description="Every release, every fix, every improvement to struxa — documented here."
        />
      </div>

      <div className="border-t border-neutral-800 px-6 py-14 md:px-16">
        <ChangelogTimeline />
      </div>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
