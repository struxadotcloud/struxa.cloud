'use client';

import { useEffect, useState } from 'react';
import { Button } from './button';

const links = ['Pricing', 'Docs', 'GitHub', 'Discord'];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between border-b transition-all duration-300 ease-out ${
        scrolled
          ? 'gap-4 border-neutral-800 bg-neutral-950/90 px-6 py-3 shadow-sm shadow-black/40 backdrop-blur'
          : 'gap-4 border-transparent bg-transparent px-6 py-6'
      }`}
    >
      <a href="/">
        <img src="/assets/logo-white.svg" alt="struxa" className="h-6 w-6" />
      </a>

      <nav
        className={`absolute left-1/2 hidden -translate-x-1/2 items-center font-mono text-xs uppercase tracking-widest text-neutral-400 transition-[gap] duration-300 ease-out md:flex ${
          scrolled ? 'gap-5' : 'gap-8'
        }`}
      >
        {links.map((link) => (
          <a key={link} href="#" className="hover:text-neutral-100">
            {link}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <a
          href="#"
          className={`hidden overflow-hidden whitespace-nowrap font-mono text-xs uppercase tracking-widest text-neutral-400 transition-all duration-300 ease-out hover:text-neutral-100 sm:block ${
            scrolled ? 'max-w-0 opacity-0' : 'max-w-24 opacity-100'
          }`}
        >
          Log in
        </a>
        <Button href="#">Get Started</Button>
      </div>
    </header>
  );
}
