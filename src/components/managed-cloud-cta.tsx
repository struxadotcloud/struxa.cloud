import { Button } from './button';
import { ComingSoonButton } from './coming-soon-button';
import { CornerTick } from './corner-tick';

export function ManagedCloudCta() {
  return (
    <section className="relative border-b border-neutral-800">
      <CornerTick position="tl" />
      <CornerTick position="tr" />
      <CornerTick position="bl" />
      <CornerTick position="br" />

      <div className="max-w-xl px-6 py-14 pb-16 md:max-w-2xl md:px-16">
        <p className="font-mono text-xs uppercase tracking-wide text-blue-500">Managed</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-neutral-50 md:text-4xl">
          Bring your own nodes. We run the dashboard.
        </h2>
        <p className="mt-4 leading-relaxed text-neutral-400">
          Keep your hardware — point it at struxa cloud and get a fully managed,
          always-up-to-date panel with backups, monitoring, and updates handled for you.
          No infrastructure to maintain, no self-hosting the control plane.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ComingSoonButton>Get Started</ComingSoonButton>
          <Button href="/pricing" variant="secondary">
            See pricing
          </Button>
        </div>
      </div>

      <div className="mx-6 mb-6 w-auto border border-neutral-800 bg-neutral-950 md:absolute md:bottom-0 md:right-0 md:mx-0 md:mb-0 md:w-80 md:border-b-0 md:border-r-0">
        <div className="border-b border-neutral-800 px-5 py-4">
          <p className="font-mono text-xs uppercase tracking-wide text-blue-500">Struxa Cloud</p>
          <p className="mt-1.5 font-display text-2xl font-semibold text-neutral-50">Coming soon</p>
          <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
            We host the panel for you. Bring your own Wings nodes and game servers.
          </p>
        </div>
        <ul className="space-y-2 px-5 py-4 font-mono text-[11px] text-neutral-400">
          {[
            'Panel hosted by us',
            'Automatic updates',
            'Custom domain support',
            'Monitoring included',
            'SLA uptime guarantee',
            'Priority support',
          ].map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 text-blue-500">
                <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <ComingSoonButton variant="row">
          <span>Join waitlist</span>
          <span className="text-blue-400">→</span>
        </ComingSoonButton>
      </div>
    </section>
  );
}
