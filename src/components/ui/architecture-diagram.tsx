import { Monitor, Cpu, Box } from "lucide-react";

const NODES = [
  {
    icon: Monitor,
    label: "Panel",
    sub: "Web UI",
    color: "#66C72E",
  },
  {
    icon: Cpu,
    label: "Wings",
    sub: "Daemon",
    color: "#6b9fd4",
  },
  {
    icon: Box,
    label: "Docker",
    sub: "Containers",
    color: "#a78bfa",
  },
];

export function ArchitectureDiagram() {
  return (
    <div className="flex flex-col h-full min-h-0">
      <h3 className="text-base font-medium text-card-foreground flex-shrink-0">
        How it&apos;s built
      </h3>
      <p className="text-xs text-muted-foreground mt-1 flex-shrink-0">
        A TypeScript panel talking to a Go daemon running isolated Docker containers.
      </p>

      <div className="flex-1 flex items-center justify-center gap-0 min-h-0">
        {NODES.map((node, i) => {
          const Icon = node.icon;
          return (
            <div key={node.label} className="flex items-center">
              {/* Node */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="size-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${node.color}15`, border: `1px solid ${node.color}30` }}
                >
                  <Icon className="size-5" style={{ color: node.color }} />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-foreground">{node.label}</p>
                  <p className="text-[10px] text-muted-foreground">{node.sub}</p>
                </div>
              </div>

              {/* Connector */}
              {i < NODES.length - 1 && (
                <div className="flex items-center mx-4 mb-5">
                  <div className="w-8 h-px bg-border" />
                  <div className="w-1 h-1 rounded-full bg-border ml-0.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
