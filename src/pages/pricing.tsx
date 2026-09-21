import { CtaSection } from '../components/cta-section';
import { PricingComparison } from '../components/pricing-comparison';
import { PricingPlans } from '../components/pricing-plans';
import { SectionHeader } from '../components/section';
import { Seo } from '../components/seo';

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <Seo
        title="Pricing — struxa"
        description="Self-host struxa for free with the full feature set, or join the waitlist for Struxa Cloud — we host the panel, you bring the Wings nodes."
        path="/pricing"
      />

      <div className="px-6 pt-16">
        <SectionHeader
          label="Pricing"
          heading="Choose how you run struxa."
          description="Self-host for free with the full feature set, or join the waitlist for Struxa Cloud — we host the panel, you bring the Wings nodes."
        />
      </div>

      <div className="px-6 pt-10">
        <PricingPlans />
      </div>

      <div className="px-6 pb-4 pt-14">
        <p className="text-xs uppercase tracking-wide text-blue-500">Compare</p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-neutral-50">
          Every feature, side by side.
        </h2>
      </div>

      <div className="px-6">
        <PricingComparison />
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
