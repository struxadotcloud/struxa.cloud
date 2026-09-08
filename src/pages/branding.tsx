import { Seo } from '../components/seo';

const variants = [
  { key: 'whiteblue', name: 'White + blue', background: '#0a0a0a' },
  { key: 'bluebg', name: 'On blue', background: '#155dfc' },
  { key: 'whitebg', name: 'On white', background: '#ffffff' },
  { key: 'blackbg', name: 'On black', background: '#000000' },
];

const colors = [
  { name: 'Struxa blue', hex: '#155DFC', rgb: '21, 93, 252', text: '#ffffff' },
  { name: 'White', hex: '#FFFFFF', rgb: '255, 255, 255', text: '#0a0a0a' },
  { name: 'Black', hex: '#000000', rgb: '0, 0, 0', text: '#ffffff' },
  { name: 'Website background', hex: '#0A0A0A', rgb: '10, 10, 10', text: '#ffffff' },
];

const downloadClass = 'inline-flex min-h-11 items-center font-mono text-xs text-neutral-300 underline decoration-neutral-600 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400';

export default function BrandingPage() {
  return (
    <div>
      <Seo title="Branding - struxa" description="The struxa brand: logos, colors, icons, and graphics. Download our original brand assets." path="/branding" />

      <header className="px-6 pb-12 pt-20 md:px-16">
        <p className="font-mono text-xs uppercase tracking-wide text-blue-400">Brand resources</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-neutral-50 md:text-5xl">The struxa identity.</h1>
        <p className="mt-4 max-w-xl leading-relaxed text-neutral-400">Our logos, colors, and graphics in one place. Pick the version that fits your background and download the original.</p>
      </header>

      <section aria-labelledby="logos-heading" className="border-t border-neutral-800 px-6 py-14 md:px-16">
        <h2 id="logos-heading" className="font-display text-2xl font-semibold text-neutral-50">Logos & icons</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-neutral-400">Use the full wordmark wherever space allows. The compact icon is for avatars and smaller placements.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {variants.map((variant) => (
            <figure key={variant.key}>
              <div className="flex aspect-[2/1] items-center justify-center gap-6 border border-white/10 px-6 sm:px-10" style={{ backgroundColor: variant.background }}>
                <img src={`/images/brand/long-${variant.key}.png`} alt={`struxa wordmark, ${variant.name.toLowerCase()}`} width="640" height="128" className="h-auto w-2/3 object-contain" loading="lazy" />
                <img src={`/images/brand/icon-${variant.key}.png`} alt={`struxa icon, ${variant.name.toLowerCase()}`} width="160" height="120" className="h-auto w-1/5 object-contain" loading="lazy" />
              </div>
              <figcaption className="pt-4">
                <h3 className="text-sm text-neutral-200">{variant.name}</h3>
                <div className="flex flex-wrap gap-x-6">
                  <a className={downloadClass} href={`/images/struxa-long-${variant.key}.png`} download>Download wordmark PNG</a>
                  <a className={downloadClass} href={`/images/struxa-icon-${variant.key}.png`} download>Download icon PNG</a>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-400">Keep the original proportions and colors, leave clear space around the logo, and choose a background with strong contrast. The white + blue assets have transparent backgrounds.</p>
      </section>

      <section aria-labelledby="colors-heading" className="border-t border-neutral-800 px-6 py-14 md:px-16">
        <h2 id="colors-heading" className="font-display text-2xl font-semibold text-neutral-50">Brand colors</h2>
        <p className="mt-3 text-neutral-400">Signature blue, paired with white and black. Near-black anchors the website.</p>
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-neutral-800 bg-neutral-800 sm:grid-cols-2 lg:grid-cols-4">
          {colors.map((color) => (
            <div key={color.hex} className="flex min-h-48 flex-col justify-between p-6" style={{ backgroundColor: color.hex, color: color.text }}>
              <h3 className="text-sm font-medium">{color.name}</h3>
              <div className="mt-10 font-mono text-sm"><p>{color.hex}</p><p className="mt-1 text-xs">RGB {color.rgb}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="graphics-heading" className="border-y border-neutral-800 px-6 py-14 md:px-16">
        <h2 id="graphics-heading" className="font-display text-2xl font-semibold text-neutral-50">Graphics</h2>
        <p className="mt-3 text-neutral-400">Ready-to-use visuals for sharing struxa.</p>
        <figure className="mt-8">
          <img src="/images/brand/social.jpg" alt="struxa: Game hosting. Simplified. Open source game management panel for modern hosting providers, alongside the server console." width="1200" height="662" className="h-auto w-full" loading="lazy" />
          <figcaption className="mt-3 flex flex-wrap gap-x-6">
            <a className={downloadClass} href="/images/struxa-og.png" download>Download original PNG</a>
            <a className={downloadClass} href="/images/brand/social.jpg" download>Download web JPG</a>
            <a className={downloadClass} href="/images/struxa-favicon.png" download>Download favicon PNG</a>
          </figcaption>
        </figure>
        <figure className="mt-10">
          <h3 className="mb-4 text-sm font-medium text-neutral-200">Small banner</h3>
          <img src="/images/struxa-small-banner.png" alt="Game hosting. Simplified. A wide blue banner with the struxa wordmark." width="15360" height="4240" className="h-auto w-full" loading="lazy" />
          <figcaption className="mt-3">
            <a className={downloadClass} href="/images/struxa-small-banner.png" download>Download small banner PNG</a>
          </figcaption>
        </figure>
      </section>
    </div>
  );
}

export const getConfig = async () => ({ render: 'static' } as const);
