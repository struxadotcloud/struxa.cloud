const POSITIONS = {
  tl: '-left-[7px] -top-[7px]',
  tr: '-right-[7px] -top-[7px]',
  bl: '-left-[7px] -bottom-[7px]',
  br: '-right-[7px] -bottom-[7px]',
} as const;

export function CornerTick({ position }: { position: keyof typeof POSITIONS }) {
  return (
    <span
      className={`pointer-events-none absolute z-10 flex h-[14px] w-[14px] items-center justify-center bg-neutral-950 ${POSITIONS[position]}`}
    >
      <svg viewBox="0 0 9 9" className="h-[9px] w-[9px] text-neutral-700">
        <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" strokeWidth="1" />
      </svg>
    </span>
  );
}
