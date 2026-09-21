import { Check } from 'lucide-react';
import { ComingSoonButton } from './coming-soon-button';
import { Button } from './ui/button';

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
    <div className="grid gap-4 md:grid-cols-3">
      {PLANS.map((plan) => (
        <div
          key={plan.id}
          className={`relative flex flex-col rounded-2xl border p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.03)] md:p-7 ${
            plan.popular
              ? 'border-blue-500/30 bg-blue-500/[0.04]'
              : 'border-neutral-800 bg-neutral-900/30'
          }`}
        >
          {plan.popular ? (
            <span className="absolute right-6 top-6 text-[10px] uppercase tracking-wide text-blue-400">
              Recommended
            </span>
          ) : null}

          <p className="text-xs uppercase tracking-wide text-blue-500">{plan.name}</p>
          <p className="mt-3 font-display text-3xl font-semibold text-neutral-50">
            {plan.price}
            {plan.priceSubtext ? (
              <span className="ml-1.5 font-sans text-sm font-normal text-neutral-500">{plan.priceSubtext}</span>
            ) : null}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-400">{plan.description}</p>

          <ul className="mt-6 flex-1 space-y-2.5">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-[11px] text-neutral-400">
                <Check className={`mt-px size-3 shrink-0 ${plan.popular ? 'text-blue-400' : 'text-blue-500'}`} />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            {plan.comingSoon ? (
              <ComingSoonButton variant={plan.ctaVariant} className="w-full">
                {plan.cta}
              </ComingSoonButton>
            ) : plan.id === 'self-hosted' ? (
              <Button
                variant="outline"
                className="w-full"
                render={
                  <a
                    href="https://github.com/struxadotcloud/struxa"
                    target="_blank"
                    rel="noreferrer"
                  />
                }
              >
                {plan.cta}
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                render={<a href="mailto:hello@struxa.cloud" />}
              >
                {plan.cta}
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
