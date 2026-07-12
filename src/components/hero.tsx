import { Button } from './button';
import { ComingSoonButton } from './coming-soon-button';
import { CornerTick } from './corner-tick';
import { DotGrid } from './dot-grid';
import { InstallCommand } from './install-command';
import { RotatingWord } from './rotating-word';

export function Hero() {
  return (
    <section className="relative border-b border-neutral-800">
      <CornerTick position="bl" />
      <CornerTick position="br" />

      <div className="relative overflow-hidden px-6 pb-20 pt-24 text-center">
        <DotGrid className="-left-16 top-8" />
        <DotGrid className="-right-16 top-8" />

        <h1 className="font-display text-5xl font-semibold tracking-tight text-neutral-50 sm:text-6xl">
          Run, monitor, and <RotatingWord />
          <br />
          your game servers.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-balance text-neutral-400">
          struxa is a self-hosted, open-source panel for managing game
          servers — built for operators and hosting providers, with
          plans, checkout, and subscriptions built in.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <ComingSoonButton>Get Started</ComingSoonButton>
          <Button href="#" variant="secondary">
            View on GitHub
          </Button>
        </div>

        <div className="mx-auto mt-8 w-fit max-w-full">
          <InstallCommand />
        </div>
      </div>

      <div className="relative flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-neutral-800 px-6 py-4">
        <CornerTick position="tl" />
        <CornerTick position="tr" />
        <span className="font-mono text-xs text-neutral-500">
          100% open source
        </span>
        <span className="hidden h-4 w-px bg-neutral-800 sm:block" />
        <span className="font-mono text-xs text-neutral-500">
          No vendor lock-in
        </span>
        <span className="hidden h-4 w-px bg-neutral-800 sm:block" />
        <span className="font-mono text-xs text-neutral-500">
          Built for operators
        </span>
      </div>
    </section>
  );
}
