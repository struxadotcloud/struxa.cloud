import { LegalDocument } from '../components/legal-document';
import { SectionHeader } from '../components/section';
import { Seo } from '../components/seo';
import { PRIVACY } from '../data/legal-content';

export default function PrivacyPage() {
  return (
    <div>
      <Seo
        title="Privacy Policy — struxa"
        description="How struxa collects, uses, and protects your personal data."
        path="/privacy"
      />

      <div className="px-6 pt-20 md:px-16">
        <SectionHeader
          label="Legal"
          heading="Privacy Policy"
          description="How struxa collects, uses, and protects your personal data."
        />
      </div>

      <LegalDocument doc={PRIVACY} />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
