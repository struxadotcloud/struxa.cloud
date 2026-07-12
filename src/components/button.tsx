import type { ReactNode } from 'react';

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};

export function Button({ href, children, variant = 'primary' }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-md px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors';
  const styles =
    variant === 'primary'
      ? 'bg-blue-500 text-white hover:bg-blue-400'
      : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700';

  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}
