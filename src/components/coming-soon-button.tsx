'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CornerTick } from './corner-tick';

type Variant = 'primary' | 'secondary' | 'text' | 'row';

const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    'inline-flex items-center justify-center rounded-md bg-blue-500 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-blue-400',
  secondary:
    'inline-flex items-center justify-center rounded-md bg-neutral-800 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-neutral-200 transition-colors hover:bg-neutral-700',
  text: 'font-mono text-xs uppercase tracking-widest text-neutral-400 transition-colors hover:text-neutral-100',
  row: 'flex w-full items-center justify-between border-t border-neutral-800 px-5 py-3.5 font-mono text-xs text-neutral-300 transition-colors hover:bg-neutral-900',
};

export function ComingSoonButton({
  children,
  variant = 'primary',
  className = '',
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`${VARIANT_CLASS[variant]} ${className}`}>
        {children}
      </button>
      {open ? <ComingSoonModal onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function ComingSoonModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm border border-neutral-800 bg-neutral-950 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <CornerTick position="tl" />
        <CornerTick position="tr" />
        <CornerTick position="bl" />
        <CornerTick position="br" />

        <p className="font-mono text-xs uppercase tracking-wide text-blue-500">Struxa Cloud</p>
        <h3 className="mt-3 font-display text-xl font-semibold text-neutral-50">Coming soon</h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          Managed hosting isn't open yet — we're putting the finishing touches on it. In the meantime you can
          self-host struxa for free, or check the pricing page for what's planned.
        </p>

        <div className="mt-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-blue-400"
          >
            Got it
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
