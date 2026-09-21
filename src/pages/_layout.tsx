import '../styles.css';

import type { ReactNode } from 'react';
import { Footer } from '../components/footer';
import { Navbar } from '../components/navbar';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <div className="isolate flex min-h-svh flex-col bg-neutral-950 font-sans text-neutral-200">
      <link rel="icon" type="image/png" href={data.icon} />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

      {/* Navbar and hero-sized pages span the viewport; each page owns its
          own content container instead of a shared one here. */}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

const getData = async () => {
  const data = {
    icon: '/images/brand/favicon.png',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
