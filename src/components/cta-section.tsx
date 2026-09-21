import { Button } from './ui/button';
import { ComingSoonButton } from './coming-soon-button';
import { DitherHeroBackground } from './dither-hero-background';

// Mini-hero close: same dithered navy card language as the hero, at content
// width. Replaces the old ManagedCloudCta (kept on disk, unused).
export function CtaSection() {
  return (
    <section className="px-6 py-14">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/15 bg-[radial-gradient(120%_90%_at_50%_0%,#16337a_0%,#12244d_45%,#0e1c3c_100%)] px-6 py-16 text-center sm:py-20">
        <DitherHeroBackground />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_30%,rgb(96_165_250/0.14),transparent_70%)]" />

        <div className="relative">
          <h2 className="font-display mx-auto max-w-xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Start self-hosting today.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-balance leading-relaxed text-blue-100/75">
            The panel, the storefront, and Wings in one stack. Free,
            open-source, and yours.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="border-white bg-white text-neutral-950 hover:bg-neutral-200 data-pressed:bg-neutral-300"
              render={<a href="https://docs.struxa.cloud" />}
            >
              Read the docs
            </Button>
            <ComingSoonButton
              size="lg"
              className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15 data-pressed:bg-white/20"
            >
              Get Started
            </ComingSoonButton>
          </div>
        </div>
      </div>
    </section>
  );
}
