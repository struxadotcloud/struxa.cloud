'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, type ButtonProps } from './ui/button';

type Variant = 'primary' | 'secondary' | 'text' | 'row';

const VARIANT_CLASS: Record<Variant, string> = {
  primary: '',
  secondary: '',
  text: 'text-sm text-neutral-400 hover:bg-transparent hover:text-neutral-100',
  row: 'flex w-full items-center justify-between border-t border-neutral-800 px-5 py-3.5 text-sm text-neutral-300 transition-colors hover:bg-neutral-900',
};

export function ComingSoonButton({
  children,
  variant = 'primary',
  className = '',
  size,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  size?: ButtonProps['size'];
}) {
  const [open, setOpen] = useState(false);

  if (variant === 'row') {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className || VARIANT_CLASS.row}
      >
        {children}
      </button>
    );
  }

  const cossVariant =
    variant === 'primary' ? 'default' : variant === 'secondary' ? 'outline' : 'ghost';

  return (
    <>
      <Button
        variant={cossVariant}
        size={size}
        className={variant === 'text' ? VARIANT_CLASS.text : className}
        onClick={() => setOpen(true)}
      >
        {children}
      </Button>
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
        className="w-full max-w-sm rounded-xl border border-neutral-800 bg-neutral-950 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs font-medium uppercase tracking-wide text-blue-500">Struxa Cloud</p>
        <h3 className="mt-3 font-display text-xl font-semibold text-neutral-50">Coming soon</h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          Managed hosting isn't open yet — we're putting the finishing touches on it. In the meantime you can
          self-host struxa for free, or check the pricing page for what's planned.
        </p>

        <div className="mt-6">
          <Button onClick={onClose}>Got it</Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
