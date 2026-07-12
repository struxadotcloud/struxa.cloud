export function DotGrid({ className }: { className: string }) {
  return (
    <div
      className={`pointer-events-none absolute h-64 w-64 opacity-40 ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(59,130,246,0.5) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
        maskImage: 'radial-gradient(circle, black 0%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(circle, black 0%, transparent 70%)',
      }}
    />
  );
}
