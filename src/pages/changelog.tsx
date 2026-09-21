import { ChangelogTimeline } from '../components/changelog-timeline';
import { CtaSection } from '../components/cta-section';
import { SectionHeader } from '../components/section';
import { Seo } from '../components/seo';

export default function ChangelogPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <Seo
        title="Changelog — struxa"
        description="Every release, every fix, every improvement to struxa — documented here."
        path="/changelog"
      />

      <div className="px-6 pb-6 pt-16">
        <SectionHeader
          label="What's new"
          heading="Changelog"
          description="Every release, every fix, every improvement to struxa — documented here."
        />
      </div>

      <div className="px-6 py-10">
        <ChangelogTimeline />
      </div>

      <CtaSection />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
