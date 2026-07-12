'use client';

const NODES = [
  { name: 'node-a', region: 'fra1', status: 'online' as const, cpu: 34, players: 112 },
  { name: 'node-b', region: 'ams3', status: 'offline' as const, cpu: null, players: null },
  { name: 'node-c', region: 'nyc1', status: 'online' as const, cpu: 58, players: 87 },
  { name: 'node-d', region: 'sgp1', status: 'online' as const, cpu: 21, players: 40 },
];

export function InfraComparison() {
  return (
    <div className="w-full max-w-sm border border-neutral-800 bg-neutral-950/60">
      <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2.5">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">Nodes</p>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-red-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
          </span>
          1 incident
        </span>
      </div>

      <div className="divide-y divide-neutral-800">
        {NODES.map((node, i) => (
          <div
            key={node.name}
            className="flex items-center justify-between px-4 py-2.5 opacity-0"
            style={{
              animation: 'row-in 400ms ease-out forwards',
              animationDelay: `${i * 90}ms`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  node.status === 'online' ? 'bg-blue-500' : 'bg-red-500'
                }`}
              />
              <span className="font-mono text-xs text-neutral-200">{node.name}</span>
              <span className="font-mono text-[11px] text-neutral-600">{node.region}</span>
            </div>

            {node.status === 'online' ? (
              <span className="font-mono text-[11px] text-neutral-500">
                {node.cpu}% cpu · {node.players} players
              </span>
            ) : (
              <span className="font-mono text-[11px] uppercase tracking-wide text-red-400">
                offline
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="border-t border-neutral-800 px-4 py-3 text-[11px] leading-snug text-neutral-500">
        node-b stopped reporting 2 minutes ago — dashboard flagged it automatically.
      </p>
    </div>
  );
}
