import { FeatureCell, FeatureGrid, FeatureRow } from '../components/bento-grid';
import { DitherText } from '../components/dither-text';
import { DotGrid } from '../components/dot-grid';
import { FaqSection } from '../components/faq-section';
import { Hero } from '../components/hero';
import { ManagedCloudCta } from '../components/managed-cloud-cta';
import { PlanCatalog } from '../components/plan-catalog';
import { ScreenshotGallery } from '../components/screenshot-gallery';
import { SectionHeader } from '../components/section';
import { Seo } from '../components/seo';
import { SponsorsSection } from '../components/sponsors-section';
import { StatGraphs } from '../components/stat-graphs';

export default function HomePage() {
  return (
    <div>
      <Seo
        title="struxa — self-hosted game server management"
        description="struxa is a self-hosted, open-source panel for managing game servers — the panel, the agent, and the storefront in one modern stack."
        path="/"
      />

      <Hero />

      <SponsorsSection />

      <section className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <DotGrid className="-right-24 top-0" />
        </div>

        <div className="px-6 pt-20">
          <SectionHeader
            label="Platform"
            heading="Everything you need to run game servers."
            description="From provisioning a node to billing customers — the panel, the agent, and the storefront in one self-hosted stack."
          />
        </div>

        <FeatureGrid>
          <FeatureCell
            heading="A dark, modern control panel."
            description="Manage servers, users, and nodes from a clean operator-focused dashboard — built with a fully typed TypeScript stack instead of the legacy PHP panel."
          >
            <ScreenshotGallery />
          </FeatureCell>

          <FeatureCell
            heading="Live infrastructure stats."
            description="Wings, the node agent, streams CPU, memory, and disk usage back to the panel in real time."
          >
            <div className="-mx-6 -mb-6 md:-mx-8 md:-mb-8">
              <StatGraphs />
            </div>
          </FeatureCell>

          <FeatureRow>
            <FeatureCell
              heading="Sell hosting, not just servers."
              description="A plan catalog, checkout, and recurring subscriptions — customers buy a plan, and it renews automatically."
            >
              <PlanCatalog />
            </FeatureCell>

            <div className="relative h-full min-h-72 overflow-hidden p-6 md:p-8">
              <DitherText className="absolute inset-0 h-full w-full" />
              <div className="relative z-10">
                <h3 className="font-medium text-neutral-100">Your infrastructure, your rules.</h3>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-neutral-400">
                  Fully open-source, self-hosted on your own hardware — no vendor lock-in, no
                  per-seat pricing.
                </p>
              </div>
            </div>
          </FeatureRow>
        </FeatureGrid>
      </section>

      <ManagedCloudCta />

      <FaqSection />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
