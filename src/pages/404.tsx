import { DitherHeroBackground } from '../components/dither-hero-background';
import { Seo } from '../components/seo';
import { Button } from '../components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-24">
      <Seo title="404 — struxa" description="Page not found." path="/404" />

      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-[radial-gradient(120%_90%_at_50%_0%,#16337a_0%,#12244d_45%,#0e1c3c_100%)] px-6 py-16 text-center">
        <DitherHeroBackground />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_30%,rgb(96_165_250/0.14),transparent_70%)]" />

        <div className="relative">
          <p className="text-xs uppercase tracking-wide text-blue-300">Error</p>
          <h1 className="font-display mt-3 text-6xl font-semibold tracking-tight text-white md:text-7xl">
            404
          </h1>
          <p className="mx-auto mt-4 max-w-md text-balance leading-relaxed text-blue-100/75">
            This page doesn't exist, or has moved.
          </p>

          <div className="mt-8">
            <Button
              size="lg"
              className="border-white bg-white text-neutral-950 hover:bg-neutral-200 data-pressed:bg-neutral-300"
              render={<a href="/" />}
            >
              Back home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
