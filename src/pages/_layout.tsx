import '../styles.css';

import type { ReactNode } from 'react';
import { CornerTick } from '../components/corner-tick';
import { DitherBackground } from '../components/dither-background';
import { Footer } from '../components/footer';
import { Navbar } from '../components/navbar';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <div className="isolate min-h-svh bg-neutral-950 font-sans text-neutral-200">
      <link rel="icon" type="image/png" href={data.icon} />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <DitherBackground />

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col border-x border-neutral-800">
        <CornerTick position="tl" />
        <CornerTick position="tr" />
        <CornerTick position="bl" />
        <CornerTick position="br" />

        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

const getData = async () => {
  const data = {
    icon: '/images/favicon.png',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
