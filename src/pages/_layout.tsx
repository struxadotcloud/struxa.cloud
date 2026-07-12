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
      <meta name="description" content={data.description} />
      <link rel="icon" type="image/png" href={data.icon} />
      <DitherBackground />

      <div className="relative mx-auto max-w-6xl border-x border-neutral-800">
        <CornerTick position="tl" />
        <CornerTick position="tr" />
        <CornerTick position="bl" />
        <CornerTick position="br" />

        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}

const getData = async () => {
  const data = {
    description:
      'struxa is a self-hosted, open-source panel for managing game servers.',
    icon: '/images/favicon.png',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
