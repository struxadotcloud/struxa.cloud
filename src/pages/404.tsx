import { Button } from '../components/button';
import { Seo } from '../components/seo';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center px-6 py-32 text-center md:px-16">
      <Seo title="404 — struxa" description="Page not found." path="/404" />

      <p className="font-mono text-xs uppercase tracking-wide text-blue-500">
        Error
      </p>
      <h1 className="mt-3 font-display text-6xl font-semibold text-neutral-50 md:text-7xl">
        404
      </h1>
      <p className="mt-4 max-w-md text-neutral-400 leading-relaxed">
        This page doesn't exist, or has moved.
      </p>

      <div className="mt-8">
        <Button href="/">Back home</Button>
      </div>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
