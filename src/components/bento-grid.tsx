import type { ReactNode } from 'react';
import { CornerTick } from './corner-tick';

export function FeatureGrid({ children }: { children: ReactNode }) {
  return (
    <div className="relative border-y border-neutral-800">
      <CornerTick position="tl" />
      <CornerTick position="tr" />
      <CornerTick position="bl" />
      <CornerTick position="br" />
      <div className="divide-y divide-neutral-800">{children}</div>
    </div>
  );
}

export function FeatureRow({ children }: { children: ReactNode }) {
  return (
    <div className="grid divide-neutral-800 md:grid-cols-2 md:divide-x">
      {children}
    </div>
  );
}

export function FeatureCell({
  heading,
  description,
  children,
}: {
  heading: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="p-6 md:p-8">
      <h3 className="font-medium text-neutral-100">{heading}</h3>
      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-neutral-400">
        {description}
      </p>
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}
