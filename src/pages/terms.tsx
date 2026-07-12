import { LegalDocument } from '../components/legal-document';
import { SectionHeader } from '../components/section';
import { Seo } from '../components/seo';
import { TERMS } from '../data/legal-content';

export default function TermsPage() {
  return (
    <div>
      <Seo
        title="Terms of Service — struxa"
        description="The terms that govern your use of struxa's website and services."
        path="/terms"
      />

      <div className="px-6 pt-20 md:px-16">
        <SectionHeader
          label="Legal"
          heading="Terms of Service"
          description="The terms that govern your use of struxa's website and services."
        />
      </div>

      <LegalDocument doc={TERMS} />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
