import { Button } from './button';
import { ComingSoonButton } from './coming-soon-button';
import { CornerTick } from './corner-tick';

type Plan = {
  id: string;
  name: string;
  price: string;
  priceSubtext?: string;
  description: string;
  features: string[];
  cta: string;
  ctaVariant: 'primary' | 'secondary';
  popular?: boolean;
  comingSoon?: boolean;
};

const PLANS: Plan[] = [
  {
    id: 'self-hosted',
    name: 'Self-Hosted',
    price: 'Free',
    priceSubtext: 'forever',
    description: 'Deploy on your own infrastructure. Free, open-source, full feature set.',
    features: [
      'Full feature set',
      'Own your data',
      'Community support via GitHub',
      'Any Wings-compatible game',
      'MIT License',
      'Self-managed updates',
    ],
    cta: 'Get the code',
    ctaVariant: 'secondary',
  },
  {
    id: 'cloud',
    name: 'Struxa Cloud',
    price: 'Coming soon',
    description: 'We host the panel for you. Bring your own Wings nodes and game servers.',
    features: [
      'Panel hosted by us',
      'Automatic updates',
      'Priority support',
      'Custom domain support',
      'No panel self-hosting needed',
      'Monitoring included',
      'SLA uptime guarantee',
    ],
    cta: 'Join waitlist',
    ctaVariant: 'primary',
    popular: true,
    comingSoon: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Contact us',
    description: 'Custom deployments and dedicated support for large-scale operations.',
    features: [
      'Everything in Cloud',
      'Dedicated infrastructure',
      'SLA guarantees',
      'Dedicated support engineer',
      'Custom integrations',
      'Advanced analytics',
      'Custom onboarding',
    ],
    cta: 'Get in touch',
    ctaVariant: 'secondary',
  },
];

export function PricingPlans() {
  return (
    <div className="relative border-y border-neutral-800">
      <CornerTick position="tl" />
      <CornerTick position="tr" />
      <CornerTick position="bl" />
      <CornerTick position="br" />

      <div className="grid divide-neutral-800 md:grid-cols-3 md:divide-x">
        {PLANS.map((plan) => (
          <div key={plan.id} className={`relative flex flex-col p-6 md:p-8 ${plan.popular ? 'bg-blue-500/5' : ''}`}>
            {plan.popular ? (
              <span className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-wide text-blue-400">
                Recommended
              </span>
            ) : null}

            <p className="font-mono text-xs uppercase tracking-wide text-blue-500">{plan.name}</p>
            <p className="mt-3 font-display text-3xl font-semibold text-neutral-50">
              {plan.price}
              {plan.priceSubtext ? (
                <span className="ml-1.5 font-sans text-sm font-normal text-neutral-500">{plan.priceSubtext}</span>
              ) : null}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">{plan.description}</p>

            <ul className="mt-6 flex-1 space-y-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 font-mono text-[11px] text-neutral-400">
                  <svg viewBox="0 0 12 12" className="mt-0.5 h-3 w-3 shrink-0 text-blue-500">
                    <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              {plan.comingSoon ? (
                <ComingSoonButton variant={plan.ctaVariant}>{plan.cta}</ComingSoonButton>
              ) : (
                <Button href="#" variant={plan.ctaVariant}>
                  {plan.cta}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
