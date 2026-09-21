import { CtaSection } from '../components/cta-section';
import { FaqSection } from '../components/faq-section';
import { FeaturesBento } from '../components/features-bento';
import { Hero } from '../components/hero';
import { SectionHeader } from '../components/section';
import { Seo } from '../components/seo';
import { SponsorsSection } from '../components/sponsors-section';
import { TechMarquee } from '../components/tech-marquee';

export default function HomePage() {
  return (
    <div>
      <Seo
        title="struxa — self-hosted game server management"
        description="struxa is a self-hosted, open-source panel for managing game servers — the panel, the agent, and the storefront in one modern stack."
        path="/"
      />

      <Hero />

      <TechMarquee />

      <div className="mx-auto w-full max-w-6xl">
        <section className="relative">
          <div className="px-6 pt-16">
            <SectionHeader
              label="Platform"
              heading="Everything you need to run game servers."
              description="From scheduled backups to a real file manager, an extension hub, and Pterodactyl egg support, everything lives in one clean panel."
            />
          </div>

          <div className="px-6">
            <FeaturesBento />
          </div>
        </section>

        <FaqSection />

        <CtaSection />

        <SponsorsSection />
      </div>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
