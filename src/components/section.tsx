export function SectionHeader({
  label,
  heading,
  description,
}: {
  label: string;
  heading: string;
  description: string;
}) {
  return (
    <div className="mb-12 max-w-xl">
      <p className="font-mono text-xs uppercase tracking-wide text-blue-500">
        {label}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold text-neutral-50 md:text-4xl">
        {heading}
      </h2>
      <p className="mt-4 text-neutral-400 leading-relaxed">{description}</p>
    </div>
  );
}
