'use client';

import type { ReactNode } from 'react';
import { Button as CossButton } from './ui/button';

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};

export function Button({ href, children, variant = 'primary' }: ButtonProps) {
  return (
    <CossButton
      render={<a href={href} />}
      variant={variant === 'primary' ? 'default' : 'outline'}
    >
      {children}
    </CossButton>
  );
}
