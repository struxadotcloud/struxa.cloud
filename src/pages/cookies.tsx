import { LegalDocument } from '../components/legal-document';
import { SectionHeader } from '../components/section';
import { Seo } from '../components/seo';
import { COOKIES } from '../data/legal-content';

export default function CookiesPage() {
  return (
    <div>
      <Seo
        title="Cookie Policy — struxa"
        description="How struxa uses cookies and similar technologies."
        path="/cookies"
      />

      <div className="px-6 pt-20 md:px-16">
        <SectionHeader
          label="Legal"
          heading="Cookie Policy"
          description="How struxa uses cookies and similar technologies."
        />
      </div>

      <LegalDocument doc={COOKIES} />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
