import { ComingSoonButton } from './coming-soon-button';
import { DitherHeroBackground } from './dither-hero-background';
import { InstallCommand } from './install-command';
import { Button } from './ui/button';

// The card is pulled up under the transparent navbar (negative margin equals
// the header's total height) so the nav reads as sitting inside the card.
// Keep the margin in sync with the header geometry in navbar.tsx.
export function Hero() {
  return (
    <section className="relative -mt-[calc(env(safe-area-inset-top)+4.5rem)] px-3 pb-6 pt-3 sm:px-4 sm:pb-8 sm:pt-4">
      <div className="relative mx-auto max-w-[1840px] overflow-hidden rounded-[1.75rem] border border-white/15 bg-[radial-gradient(120%_90%_at_50%_0%,#16337a_0%,#12244d_45%,#0e1c3c_100%)] pb-0 pt-24 text-center">
        <DitherHeroBackground />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_30%,rgb(96_165_250/0.14),transparent_70%)]" />

        <div className="relative px-6">
          <h1 className="font-display mx-auto max-w-4xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Run, monitor, and scale your game servers.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-balance text-lg leading-relaxed text-blue-100/75">
            struxa is a self-hosted, open-source panel for managing game
            servers — built for operators and hosting providers, with
            plans, checkout, and subscriptions built in.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ComingSoonButton
              size="lg"
              className="border-white bg-white text-neutral-950 hover:bg-neutral-200 data-pressed:bg-neutral-300"
            >
              Get Started
            </ComingSoonButton>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15 data-pressed:bg-white/20"
              render={
                <a
                  href="https://github.com/struxadotcloud/struxa"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              View on GitHub
            </Button>
          </div>

          <div className="mx-auto mt-8 w-fit max-w-full">
            <InstallCommand />
          </div>
        </div>

        <div className="relative mt-10 h-56 sm:h-80 md:h-[24rem]">
          <img
            src="/screenshots/console.png"
            alt="struxa panel console"
            width={2492}
            height={1346}
            className="w-full object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0e1c3c]/90 via-[#0e1c3c]/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
