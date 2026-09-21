// Tech-stack marquee. Logos are served monochrome from Simple Icons so the
// strip stays quiet on the dark background; the track duplicates the set and
// translates -50% for a seamless loop (keyframes in styles.css). Pure CSS, no
// client JS. Replaced the sponsors grid — sponsorsSection.tsx and its assets
// are kept on disk for later reuse.
const STACK = [
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'React', slug: 'react' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'Drizzle ORM', slug: 'drizzle' },
  { name: 'MySQL', slug: 'mysql' },
  { name: 'Zod', slug: 'zod' },
  { name: 'Bun', slug: 'bun' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Turborepo', slug: 'turborepo' },
];

export function TechMarquee() {
// Six copies so half the track (~2500px) always exceeds the section width
// (capped at 1840px) — the -50% translate then loops with no visible seam.
const COPIES = 6;
const logos = Array.from({ length: COPIES }, () => STACK).flat();

  return (
    <section
      aria-label="Technologies struxa is built with"
      className="mx-auto w-full max-w-[1840px] px-3 pb-10 pt-2 sm:px-4"
    >
      <p className="text-center text-[11px] uppercase tracking-[0.2em] text-neutral-600">
        Built with
      </p>

      <div className="mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="tech-marquee-track flex w-max items-center gap-14 pr-14">
          {logos.map((logo, i) => (
            <img
              key={`${logo.slug}-${i}`}
              src={`https://cdn.simpleicons.org/${logo.slug}/737373`}
              alt={logo.name}
              width={28}
              height={28}
              className="h-6 w-6 shrink-0 opacity-70 transition-opacity duration-300 hover:opacity-100 sm:h-7 sm:w-7 motion-reduce:transition-none"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
