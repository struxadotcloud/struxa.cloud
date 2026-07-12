import { PricingComparison } from '../components/pricing-comparison';
import { PricingPlans } from '../components/pricing-plans';
import { SectionHeader } from '../components/section';
import { Seo } from '../components/seo';

export default function PricingPage() {
  return (
    <div>
      <Seo
        title="Pricing — struxa"
        description="Self-host struxa for free with the full feature set, or join the waitlist for Struxa Cloud — we host the panel, you bring the Wings nodes."
        path="/pricing"
      />

      <div className="px-6 pt-20 md:px-16">
        <SectionHeader
          label="Pricing"
          heading="Choose how you run struxa."
          description="Self-host for free with the full feature set, or join the waitlist for Struxa Cloud — we host the panel, you bring the Wings nodes."
        />
      </div>

      <PricingPlans />

      <div className="px-6 pb-2 pt-14 md:px-16">
        <p className="font-mono text-xs uppercase tracking-wide text-blue-500">Compare</p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-neutral-50">
          Every feature, side by side.
        </h2>
      </div>

      <div className="pb-16 pt-6">
        <PricingComparison />
      </div>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
