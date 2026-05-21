"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import {
  Server, Terminal, FolderOpen, Database, Clock, Users,
  Archive, Globe, Settings, Activity, ChevronLeft, ChevronRight,
  User, CreditCard, LifeBuoy, SendHorizontal, File,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type PowerState = "running" | "offline" | "starting" | "stopping";
type Tab = "console" | "files" | "databases" | "backups" | "schedules" | "users" | "network" | "settings" | "activity";

interface FakeServer { id: string; name: string; egg: string; alloc: string; initial: PowerState }

// ─── Static data ──────────────────────────────────────────────────────────────

const SERVERS: FakeServer[] = [
  { id: "1", name: "Survival SMP",    egg: "Minecraft", alloc: "node1:25565", initial: "running"  },
  { id: "2", name: "CS2 Competitive", egg: "CS2",       alloc: "node1:27015", initial: "running"  },
  { id: "3", name: "Valheim World",   egg: "Valheim",   alloc: "node1:2456",  initial: "offline"  },
  { id: "4", name: "ARK: Evolved",    egg: "ARK",       alloc: "node1:7777",  initial: "offline"  },
];

const STATUS: Record<PowerState, { color: string; bg: string; label: string; pulse: boolean }> = {
  running:  { color: "#22c55e", bg: "rgba(34,197,94,0.15)",   label: "Running",  pulse: false },
  offline:  { color: "#71717a", bg: "rgba(113,113,122,0.15)", label: "Offline",  pulse: false },
  starting: { color: "#f59e0b", bg: "rgba(245,158,11,0.15)",  label: "Starting", pulse: true  },
  stopping: { color: "#f59e0b", bg: "rgba(245,158,11,0.15)",  label: "Stopping", pulse: true  },
};

const LOGS: Record<string, { text: string; color: string }[]> = {
  Minecraft: [
    { text: "[INFO]: Starting Minecraft server 1.21.4",    color: "#4ade80" },
    { text: "[INFO]: Loading properties...",               color: "#a1a1aa" },
    { text: "[INFO]: Preparing spawn area: 100%",         color: "#a1a1aa" },
    { text: "[INFO]: Done (3.847s)! For help, type 'help'",color: "#4ade80" },
    { text: "[INFO]: Saving chunks for level 'world'",    color: "#a1a1aa" },
    { text: "[WARN]: Can't keep up! Skipping 21 ticks",   color: "#fbbf24" },
    { text: "[INFO]: Autosave complete.",                  color: "#a1a1aa" },
  ],
  CS2: [
    { text: "Connecting to Steam...",                     color: "#a1a1aa" },
    { text: "VAC secure mode enabled.",                   color: "#4ade80" },
    { text: "Server up on :27015",                        color: "#4ade80" },
    { text: "Map: de_inferno loaded.",                    color: "#a1a1aa" },
    { text: "Network: 64 tick, sv_pure 1",               color: "#a1a1aa" },
    { text: "ROUND START",                                color: "#fbbf24" },
    { text: "ROUND END: CT wins",                         color: "#4ade80" },
  ],
  Valheim: [
    { text: "Starting Valheim Dedicated Server...",       color: "#a1a1aa" },
    { text: "World 'HardcoreRun' loaded.",                color: "#4ade80" },
    { text: "DungeonDB initialized.",                     color: "#a1a1aa" },
    { text: "Server listening on :2456",                  color: "#4ade80" },
    { text: "ZoneSystem initialized.",                    color: "#a1a1aa" },
  ],
  ARK: [
    { text: "ARK: Survival Evolved v358.15",              color: "#a1a1aa" },
    { text: "Loading The Island...",                      color: "#a1a1aa" },
    { text: "Full NavMesh build completed.",              color: "#a1a1aa" },
    { text: "Server ready on :7777",                      color: "#4ade80" },
    { text: "Cluster ID: cluster_survival",               color: "#a1a1aa" },
  ],
};

const FILES = [
  { name: "server.jar",        type: "file" as const, size: "43.2 MB" },
  { name: "server.properties", type: "file" as const, size: "2.1 KB"  },
  { name: "eula.txt",          type: "file" as const, size: "0.2 KB"  },
  { name: "world",             type: "dir"  as const, children: [
    { name: "level.dat", type: "file" as const, size: "8.4 KB" },
    { name: "region",    type: "dir"  as const, children: [] },
  ]},
  { name: "plugins",           type: "dir"  as const, children: [
    { name: "EssentialsX.jar", type: "file" as const, size: "3.1 MB" },
    { name: "LuckPerms.jar",   type: "file" as const, size: "2.6 MB" },
  ]},
  { name: "logs", type: "dir" as const, children: [
    { name: "latest.log", type: "file" as const, size: "128 KB" },
  ]},
];

const DATABASES = [
  { name: "mc_survival",  user: "u_survival", host: "localhost:3306" },
  { name: "mc_creative",  user: "u_creative",  host: "localhost:3306" },
];

const BACKUPS = [
  { name: "2026-05-21 14:32", size: "245 MB" },
  { name: "2026-05-20 14:31", size: "243 MB" },
  { name: "2026-05-19 14:30", size: "241 MB" },
];

const MAIN_NAV = [
  { key: "servers", label: "Game Servers", icon: Server    },
  { key: "account", label: "Account",      icon: User      },
  { key: "billing", label: "Billing",      icon: CreditCard },
  { key: "support", label: "Support",      icon: LifeBuoy  },
];

const SERVER_NAV: { key: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { key: "console",   label: "Console",   icon: Terminal  },
  { key: "files",     label: "Files",     icon: FolderOpen },
  { key: "databases", label: "Databases", icon: Database  },
  { key: "backups",   label: "Backups",   icon: Archive   },
  { key: "schedules", label: "Schedules", icon: Clock     },
  { key: "users",     label: "Users",     icon: Users     },
  { key: "network",   label: "Network",   icon: Globe     },
  { key: "settings",  label: "Settings",  icon: Settings  },
  { key: "activity",  label: "Activity",  icon: Activity  },
];

// ─── File tree node ───────────────────────────────────────────────────────────

type FileNode = { name: string; type: "file" | "dir"; size?: string; children?: FileNode[] };

function FileRow({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [open, setOpen] = useState(false);
  const isDir = node.type === "dir";
  return (
    <>
      <button
        onClick={() => isDir && setOpen((o) => !o)}
        className="w-full flex items-center gap-1.5 py-[3px] rounded hover:bg-white/5 text-left transition-colors"
        style={{ paddingLeft: `${6 + depth * 10}px`, paddingRight: "6px" }}
      >
        {isDir
          ? <FolderOpen className="size-2.5 text-yellow-400/70 shrink-0" />
          : <File       className="size-2.5 text-blue-400/50  shrink-0" />}
        <span className={`text-[9px] truncate ${isDir ? "text-white/70" : "text-white/50"}`}>{node.name}</span>
        {!isDir && node.size && <span className="ml-auto text-[8px] text-white/25 shrink-0 pl-1">{node.size}</span>}
        {isDir && (
          <ChevronRight className={`ml-auto size-2 text-white/25 transition-transform shrink-0 ${open ? "rotate-90" : ""}`} />
        )}
      </button>
      {isDir && open && (node.children ?? []).map((c, i) => (
        <FileRow key={i} node={c} depth={depth + 1} />
      ))}
    </>
  );
}

// ─── Console tab ─────────────────────────────────────────────────────────────

function ConsoleTab({ egg, power }: { egg: string; power: PowerState }) {
  const [lines, setLines] = useState<{ text: string; color: string }[]>([]);
  const [cmd, setCmd] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const logLines = LOGS[egg] ?? LOGS["Minecraft"]!;

  useEffect(() => {
    if (power !== "running") { setLines([]); return; }
    setLines([]);
    let i = 0;
    const iv = setInterval(() => {
      const item = logLines[i];
      if (item) {
        setLines((p) => [...p, item]);
        i++;
      }
      if (i >= logLines.length) clearInterval(iv);
    }, 380);
    return () => clearInterval(iv);
  }, [power, egg]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-1.5 font-mono">
        {power === "offline" && (
          <p className="text-[9px] text-white/20 italic">Server is offline.</p>
        )}
        {(power === "starting" || power === "stopping") && (
          <motion.p
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-[9px] text-amber-400/60"
          >
            {power === "starting" ? "Starting server..." : "Stopping server..."}
          </motion.p>
        )}
        {lines.map((l, i) => (
          <div key={i} className="text-[9px] leading-relaxed truncate" style={{ color: l.color }}>
            {l.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1 border-t border-white/10 bg-[#161616] px-2 py-1 shrink-0">
        <span className="text-[9px] font-mono text-white/30">{">"}</span>
        <input
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setCmd("")}
          placeholder="Type a command..."
          className="flex-1 bg-transparent text-[9px] font-mono text-white/60 outline-none placeholder:text-white/20 min-w-0"
        />
        <button onClick={() => setCmd("")} className="text-white/25 hover:text-green-400 transition-colors">
          <SendHorizontal className="size-2.5" />
        </button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function WhitelabelShowcase() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("console");
  const [powers, setPowers] = useState<Record<string, PowerState>>(
    () => Object.fromEntries(SERVERS.map((s) => [s.id, s.initial]))
  );

  const server = SERVERS.find((s) => s.id === selectedId) ?? null;
  const power: PowerState = (selectedId ? powers[selectedId] : undefined) ?? "offline";

  function triggerPower(action: "start" | "stop" | "restart") {
    if (!selectedId) return;
    if (action === "start") {
      setPowers((p) => ({ ...p, [selectedId]: "starting" }));
      setTimeout(() => setPowers((p) => ({ ...p, [selectedId]: "running" })), 2000);
    } else if (action === "stop") {
      setPowers((p) => ({ ...p, [selectedId]: "stopping" }));
      setTimeout(() => setPowers((p) => ({ ...p, [selectedId]: "offline" })), 2000);
    } else {
      setPowers((p) => ({ ...p, [selectedId]: "stopping" }));
      setTimeout(() => {
        setPowers((p) => ({ ...p, [selectedId]: "starting" }));
        setTimeout(() => setPowers((p) => ({ ...p, [selectedId]: "running" })), 1500);
      }, 1500);
    }
  }

  const canStart   = power === "offline";
  const canStop    = power === "running";
  const canRestart = power === "running";
  const canKill    = power === "starting" || power === "stopping";
  const s = STATUS[power];

  return (
    <div className="flex flex-col h-full gap-2 min-h-0">
      <h3 className="text-base font-medium text-card-foreground flex-shrink-0">
        One panel. Every server.
      </h3>

      {/* Browser shell */}
      <div className="flex-1 flex flex-col rounded-lg border border-border bg-[#0a0a0a] overflow-hidden min-h-0">

        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-white/8 bg-[#141414] shrink-0">
          <span className="size-1.5 rounded-full bg-white/15" />
          <span className="size-1.5 rounded-full bg-white/15" />
          <span className="size-1.5 rounded-full bg-white/15" />
          <div className="flex-1 ml-2 flex items-center gap-1.5 rounded bg-white/5 border border-white/8 px-2 py-0.5">
            <Globe className="size-2 text-white/25 shrink-0" />
            <span className="text-[9px] text-white/35 font-mono">
              {server ? `panel.struxa.cloud/servers/${server.id}/${tab}` : "panel.struxa.cloud"}
            </span>
          </div>
        </div>

        {/* Panel layout */}
        <div className="flex flex-1 min-h-0">

          {/* Sidebar */}
          <div className="w-[100px] border-r border-white/8 bg-[#111] flex flex-col shrink-0 overflow-y-auto">
            <div className="flex items-center px-2.5 py-2 border-b border-white/8">
              <img
                src="https://static.struxa.cloud/logos/logo-white.svg"
                alt="Struxa"
                className="h-3.5 w-auto opacity-70"
              />
            </div>

            {server ? (
              <div className="flex flex-col py-1">
                <button
                  onClick={() => { setSelectedId(null); setTab("console"); }}
                  className="flex items-center gap-1 px-2 py-1 text-[8px] text-white/30 hover:text-white/60 transition-colors"
                >
                  <ChevronLeft className="size-2" /> All Servers
                </button>
                {SERVER_NAV.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-[9px] transition-colors ${
                      tab === key
                        ? "bg-white/10 text-white/80"
                        : "text-white/35 hover:text-white/60 hover:bg-white/5"
                    }`}
                  >
                    <Icon className="size-2.5 shrink-0" />
                    {label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col py-1">
                {MAIN_NAV.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-[9px] transition-colors ${
                      key === "servers"
                        ? "bg-white/10 text-white/80"
                        : "text-white/35 hover:text-white/60 hover:bg-white/5"
                    }`}
                  >
                    <Icon className="size-2.5 shrink-0" />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main content */}
          <AnimatePresence mode="wait">
            {!server ? (
              /* ── Server list ── */
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <div className="px-3 py-2 border-b border-white/8 shrink-0">
                  <p className="text-[9px] font-semibold text-white/60">Game Servers</p>
                  <p className="text-[8px] text-white/25">
                    {SERVERS.filter((s) => powers[s.id] === "running").length} of {SERVERS.length} running
                  </p>
                </div>
                <div className="flex-1 overflow-y-auto p-2 grid grid-cols-2 gap-1.5 content-start">
                  {SERVERS.map((srv) => {
                    const st = STATUS[powers[srv.id] ?? "offline"];
                    return (
                      <motion.button
                        key={srv.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => { setSelectedId(srv.id); setTab("console"); }}
                        className="flex flex-col gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] p-2 text-left transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`size-1.5 rounded-full shrink-0 ${st.pulse ? "animate-pulse" : ""}`}
                            style={{ backgroundColor: st.color }}
                          />
                          <span className="text-[9px] font-medium text-white/70 truncate">{srv.name}</span>
                        </div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[8px] text-white/25 font-mono truncate">{srv.alloc}</span>
                          <span
                            className="text-[8px] font-medium rounded-full px-1.5 py-px shrink-0"
                            style={{ color: st.color, backgroundColor: st.bg }}
                          >
                            {st.label}
                          </span>
                        </div>
                        <span
                          className="text-[8px] rounded px-1 py-px self-start"
                          style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
                        >
                          {srv.egg}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              /* ── Server view ── */
              <motion.div
                key={`server-${selectedId}-${tab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex-1 flex flex-col overflow-hidden min-h-0"
              >
                {/* Server header */}
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/8 bg-[#0f0f0f] shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`size-1.5 rounded-full ${s.pulse ? "animate-pulse" : ""}`}
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="text-[9px] font-medium text-white/60">{server.name}</span>
                    <span className="text-[8px] text-white/25">·</span>
                    <span className="text-[8px] font-mono text-white/25">{server.alloc}</span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      disabled={!canStart}
                      onClick={() => triggerPower("start")}
                      className="text-[8px] rounded px-1.5 py-0.5 bg-green-500/20 text-green-400 disabled:opacity-25 hover:bg-green-500/30 transition-colors"
                    >
                      Start
                    </button>
                    <button
                      disabled={!canRestart}
                      onClick={() => triggerPower("restart")}
                      className="text-[8px] rounded px-1.5 py-0.5 bg-white/10 text-white/50 disabled:opacity-25 hover:bg-white/15 transition-colors"
                    >
                      Restart
                    </button>
                    <button
                      disabled={!canStop && !canKill}
                      onClick={() => triggerPower(canKill ? "stop" : "stop")}
                      className="text-[8px] rounded px-1.5 py-0.5 bg-red-500/20 text-red-400 disabled:opacity-25 hover:bg-red-500/30 transition-colors"
                    >
                      {canKill ? "Kill" : "Stop"}
                    </button>
                  </div>
                </div>

                {/* Tab content */}
                <div className="flex-1 overflow-hidden min-h-0">
                  {tab === "console" && (
                    <div className="h-full bg-[#0f0f0f]">
                      <ConsoleTab egg={server.egg} power={power} />
                    </div>
                  )}

                  {tab === "files" && (
                    <div className="h-full overflow-y-auto p-1.5 bg-[#0f0f0f]">
                      {FILES.map((f, i) => <FileRow key={i} node={f} />)}
                    </div>
                  )}

                  {tab === "databases" && (
                    <div className="h-full overflow-y-auto p-2">
                      <table className="w-full text-[8px]">
                        <thead>
                          <tr className="text-white/30 border-b border-white/10">
                            <th className="text-left pb-1.5 font-medium">Database</th>
                            <th className="text-left pb-1.5 font-medium">Username</th>
                            <th className="text-left pb-1.5 font-medium">Host</th>
                          </tr>
                        </thead>
                        <tbody>
                          {DATABASES.map((db) => (
                            <tr key={db.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                              <td className="py-1.5 text-white/60 font-mono">{db.name}</td>
                              <td className="py-1.5 text-white/40 font-mono">{db.user}</td>
                              <td className="py-1.5 text-white/30 font-mono">{db.host}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {tab === "backups" && (
                    <div className="h-full overflow-y-auto p-2 flex flex-col gap-1">
                      {BACKUPS.map((b) => (
                        <div key={b.name} className="flex items-center justify-between rounded border border-white/10 bg-white/[0.03] px-2.5 py-1.5">
                          <div>
                            <p className="text-[9px] text-white/60 font-mono">{b.name}</p>
                            <p className="text-[8px] text-white/25">{b.size}</p>
                          </div>
                          <span className="text-[8px] text-green-400/70 bg-green-500/10 rounded-full px-1.5 py-px">Complete</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {(tab === "schedules" || tab === "users" || tab === "network" || tab === "activity") && (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-[9px] text-white/20 italic">No data yet.</p>
                    </div>
                  )}

                  {tab === "settings" && (
                    <div className="h-full overflow-y-auto p-2 flex flex-col gap-1.5">
                      {[
                        { label: "Server Name", value: server.name },
                        { label: "Egg",         value: server.egg  },
                        { label: "Allocation",  value: server.alloc },
                        { label: "Memory",      value: "2048 MB"   },
                        { label: "CPU",         value: "200%"      },
                        { label: "Disk",        value: "10240 MB"  },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between border-b border-white/8 pb-1.5">
                          <span className="text-[8px] text-white/30">{row.label}</span>
                          <span className="text-[8px] text-white/55 font-mono">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
