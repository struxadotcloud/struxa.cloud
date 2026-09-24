'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import {
  Archive,
  ArrowDown,
  Box,
  Check,
  CircleAlert,
  Cloud,
  FileArchive,
  FileCog,
  FileJson,
  FileText,
  Folder,
  HardDrive,
  ListTodo,
  Loader2,
  MessageCircle,
  Plus,
  Timer,
  Vault,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

// --- shared bits -----------------------------------------------------------

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, inView] as const;
}

function Reveal({
  show,
  delay = 0,
  className = '',
  children,
}: {
  show: boolean;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-400 ease-out motion-reduce:transition-none ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Card = copy on the surface, app UI bleeding to the bottom edges like an
// embedded screenshot (card clips the corners via overflow-hidden).
function BentoCard({
  className = '',
  children,
  ref,
}: {
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      className={`flex min-w-0 flex-col rounded-2xl border border-neutral-800 bg-neutral-900/30 shadow-[inset_0_1px_0_rgb(255_255_255/0.03)] ${className}`}
    >
      {children}
    </div>
  );
}

function CardCopy({ heading, description }: { heading: string; description: string }) {
  return (
    <div className="px-6 pt-6">
      <h3 className="text-[15px] font-medium tracking-tight text-neutral-100">
        {heading}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
        {description}
      </p>
    </div>
  );
}

function AppArea({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`mt-6 flex flex-1 flex-col rounded-b-2xl border-t border-neutral-800/70 bg-neutral-950/70 ${className}`}
    >
      {children}
    </div>
  );
}

// --- backups (admin destinations table + working "add adapter" picker) -----

type DestStatus = 'completed' | 'failed' | 'retrying' | 'done';

// adapters straight from docs.struxa.cloud/wings/backup-adapters; brand logos
// from Simple Icons (same source as the tech marquee), lucide for the rest
const ADAPTERS: { icon?: LucideIcon; logo?: string; name: string }[] = [
  { icon: HardDrive, name: 'Wings (local)' },
  { icon: Cloud, name: 'S3-compatible' },
  { icon: Vault, name: 'Restic' },
  { icon: Box, name: 'Kopia' },
  { logo: 'proxmox', name: 'Proxmox Backup Server' },
  { icon: Archive, name: 'ddup-bak' },
  { logo: 'googledrive', name: 'Google Drive' },
];

function BackupDestinations({ show }: { show: boolean }) {
  const [pbs, setPbs] = useState<DestStatus>('failed');
  const [pct, setPct] = useState(41);
  const [addOpen, setAddOpen] = useState(false);
  const addRef = useRef<HTMLDivElement>(null);
  const retryTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(retryTimer.current), []);

  useEffect(() => {
    if (!show) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPct(64);
      return;
    }
    const id = window.setInterval(
      () => setPct((p) => (p >= 97 ? 97 : p + 1)),
      900,
    );
    return () => window.clearInterval(id);
  }, [show]);

  useEffect(() => {
    if (!addOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAddOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (addRef.current && !addRef.current.contains(e.target as Node)) {
        setAddOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [addOpen]);

  const retry = () => {
    setPbs('retrying');
    retryTimer.current = window.setTimeout(() => setPbs('done'), 1600);
  };

  const rows = [
    { name: 'wasabi-eu', tag: 's3', running: true, size: '1.1 GB' },
    { name: 'node-01', tag: 'wings', last: '2 min ago', size: '4.7 GB' },
    { name: 'offsite', tag: 'restic', last: '26 min ago', size: '1.1 GB' },
    { name: 'pbs-01', tag: 'proxmox', last: '3 d ago', size: '1.2 GB', failed: true },
  ];

  const revealClass = `transition-opacity duration-500 ease-out motion-reduce:transition-none ${
    show ? 'opacity-100' : 'opacity-0'
  }`;

  return (
    <AppArea className="p-3">
      <div className="mb-3 flex items-center justify-between gap-3 px-1.5">
        <p className="text-[11px] uppercase tracking-widest text-neutral-500">
          Destinations
          <span className="ml-2 font-mono text-[11px] text-neutral-600">4</span>
        </p>

        <div ref={addRef} className="relative">
          <button
            type="button"
            onClick={() => setAddOpen((open) => !open)}
            aria-expanded={addOpen}
            aria-haspopup="true"
            className={`flex h-6 cursor-pointer items-center gap-1 rounded-md border px-2 text-[11px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 motion-reduce:transition-none ${
              addOpen
                ? 'border-blue-500/40 bg-blue-500/10 text-blue-300'
                : 'border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white'
            }`}
          >
            <Plus className="size-3" />
            Add
          </button>

          {addOpen ? (
            <div className="nav-menu-panel absolute right-0 top-full z-10 mt-1.5 w-64 rounded-lg border bg-popover p-1 shadow-lg shadow-black/50">
              {ADAPTERS.map((adapter, i) => (
                <button
                  key={adapter.name}
                  type="button"
                  onClick={() => setAddOpen(false)}
                  className="nav-menu-item flex min-h-8 w-full cursor-pointer items-center gap-2.5 rounded-sm px-2 text-left text-sm text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-400 motion-reduce:transition-none"
                  style={{ '--menu-i': i } as CSSProperties}
                >
                  {adapter.logo ? (
                    <img
                      src={`https://cdn.simpleicons.org/${adapter.logo}/c4c4c4`}
                      alt=""
                      width={16}
                      height={16}
                      className="size-4 shrink-0 opacity-80"
                    />
                  ) : adapter.icon ? (
                    <adapter.icon className="size-4 shrink-0 opacity-80" />
                  ) : null}
                  <span className="truncate">{adapter.name}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <Table variant="card">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Destination</TableHead>
            <TableHead className="hidden text-right sm:table-cell">Last backup</TableHead>
            <TableHead className="text-right">Size</TableHead>
            <TableHead className="w-28 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row.name}
              className={revealClass}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <TableCell>
                <span className="font-medium text-foreground">{row.name}</span>
                <Badge
                  variant="outline"
                  className="ms-2 font-mono text-[11px] font-normal"
                >
                  {row.tag}
                </Badge>
              </TableCell>
              <TableCell className="hidden text-right font-mono text-xs text-muted-foreground sm:table-cell">
                {row.running ? 'in progress' : row.last}
              </TableCell>
              <TableCell className="text-right font-mono text-xs text-muted-foreground">
                {row.size}
              </TableCell>
              <TableCell className="text-right">
                {row.running ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-[3px] w-10 overflow-hidden rounded-full bg-white/10">
                      <span
                        className="block h-full rounded-full bg-blue-500 transition-[width] duration-700 ease-linear motion-reduce:transition-none"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                    <span className="font-mono text-xs tabular-nums text-blue-300">
                      {pct}%
                    </span>
                  </span>
                ) : row.failed ? (
                  pbs === 'failed' ? (
                    <button
                      type="button"
                      onClick={retry}
                      className="inline-flex min-h-6 cursor-pointer items-center gap-1 rounded px-1 font-mono text-[11px] text-amber-400/90 transition-colors hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 motion-reduce:transition-none"
                      aria-label="Retry failed Proxmox backup"
                    >
                      <CircleAlert className="size-3.5" />
                      retry
                    </button>
                  ) : pbs === 'retrying' ? (
                    <Loader2 className="inline size-3.5 animate-spin text-neutral-400 motion-reduce:animate-none" />
                  ) : (
                    <Check className="inline size-4 text-emerald-400/80" />
                  )
                ) : (
                  <Check className="inline size-4 text-emerald-400/80" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AppArea>
  );
}

// --- file explorer (real coss table, click to select) -----------------------

const FILES = [
  { icon: Folder, name: 'plugins', modified: '2 h ago', size: '12 items' },
  { icon: Folder, name: 'worlds', modified: '5 d ago', size: '4 items' },
  { icon: FileCog, name: 'config.yml', modified: '2 h ago', size: '4 KB' },
  { icon: FileArchive, name: 'paper-1.21.4.jar', modified: 'Mar 12', size: '48.2 MB' },
  { icon: FileText, name: 'server.properties', modified: 'just now', size: '6 KB' },
  { icon: FileJson, name: 'whitelist.json', modified: '3 d ago', size: '2 KB' },
];

function FileExplorer({ show }: { show: boolean }) {
  const [selected, setSelected] = useState('config.yml');

  return (
    <AppArea className="p-3">
      <Table variant="card">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>
              <span className="font-mono text-xs">
                servers <span className="text-neutral-700">/</span>{' '}
                <span className="text-neutral-400">mc-survival</span>
              </span>
            </TableHead>
            <TableHead className="hidden text-right sm:table-cell">Modified</TableHead>
            <TableHead className="text-right">Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {FILES.map((file, i) => (
            <TableRow
              key={file.name}
              onClick={() => setSelected(file.name)}
              data-state={selected === file.name ? 'selected' : undefined}
              className={`cursor-pointer transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                show ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <TableCell>
                <span className="flex items-center gap-2.5">
                  <file.icon
                    className={`size-4 shrink-0 ${
                      selected === file.name ? 'text-blue-400/80' : 'text-neutral-500'
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      selected === file.name ? 'text-foreground' : 'text-neutral-300'
                    }`}
                  >
                    {file.name}
                  </span>
                </span>
              </TableCell>
              <TableCell className="hidden text-right font-mono text-xs text-muted-foreground sm:table-cell">
                {file.modified}
              </TableCell>
              <TableCell className="text-right font-mono text-xs text-muted-foreground">
                {file.size}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AppArea>
  );
}

// --- extension hub (real coss buttons) --------------------------------------

type InstallState = 'idle' | 'installing' | 'installed';

const EXTENSIONS = [
  {
    icon: Timer,
    name: 'Scheduled restarts',
    meta: '@struxa · v2.1.0',
    initial: 'installed' as InstallState,
    auto: false,
  },
  {
    icon: MessageCircle,
    name: 'Discord alerts',
    meta: '@pl3x · 1.2k installs',
    initial: 'idle' as InstallState,
    auto: true,
  },
  {
    icon: ListTodo,
    name: 'MOTD builder',
    meta: '@nova · v0.9.0',
    initial: 'idle' as InstallState,
    auto: false,
  },
];

function ExtensionHub({ show }: { show: boolean }) {
  const [states, setStates] = useState<InstallState[]>(
    EXTENSIONS.map((ext) => ext.initial),
  );
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  // the Discord row demos the install lifecycle on its own once visible
  useEffect(() => {
    if (!show) return;
    const i = EXTENSIONS.findIndex((ext) => ext.auto);
    if (i === -1 || states[i] !== 'idle') return;
    timers.current.push(
      window.setTimeout(
        () => setStates((prev) => prev.map((s, j) => (j === i ? 'installing' : s))),
        900,
      ),
    );
    timers.current.push(
      window.setTimeout(
        () => setStates((prev) => prev.map((s, j) => (j === i ? 'installed' : s))),
        2400,
      ),
    );
  }, [show, states]);

  const install = (i: number) => {
    setStates((prev) => {
      if (prev[i] !== 'idle') return prev;
      const next = [...prev];
      next[i] = 'installing';
      return next;
    });
    timers.current.push(
      window.setTimeout(() => {
        setStates((prev) => {
          const next = [...prev];
          next[i] = 'installed';
          return next;
        });
      }, 1600),
    );
  };

  return (
    <AppArea>
      {EXTENSIONS.map((ext, i) => (
        <Reveal
          key={ext.name}
          show={show}
          delay={i * 90}
          className="flex-1 border-b border-neutral-800/60 last:border-b-0"
        >
          <div className="flex h-full items-center gap-3 px-4 py-3">
            <ext.icon className="size-4 shrink-0 text-neutral-400" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-foreground">
                {ext.name}
              </span>
              <span className="block truncate font-mono text-xs text-muted-foreground">
                {ext.meta}
              </span>
            </span>
            {states[i] === 'installed' ? (
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                <Check className="size-4 text-emerald-400/80" />
                Installed
              </span>
            ) : (
              <Button
                variant="outline"
                size="sm"
                loading={states[i] === 'installing'}
                disabled={states[i] === 'installing'}
                onClick={() => install(i)}
                className="shrink-0"
              >
                Install
              </Button>
            )}
          </div>
        </Reveal>
      ))}
    </AppArea>
  );
}

// --- egg compatibility (pterodactyl egg -> running struxa server) ----------

function EggImport({ show }: { show: boolean }) {
  return (
    <AppArea className="flex flex-col justify-center gap-3 p-4">
      {/* the egg, straight from a pterodactyl library */}
      <Reveal show={show}>
        <div className="flex items-center gap-3 rounded-lg border border-dashed border-neutral-700 px-3.5 py-3">
          <img
            src="https://cdn.simpleicons.org/pterodactyl/a3a3a3"
            alt=""
            width={18}
            height={18}
            className="size-[18px] shrink-0"
          />
          <span className="min-w-0 flex-1 truncate font-mono text-sm text-neutral-300">
            egg-paper.json
          </span>
        </div>
      </Reveal>

      <Reveal show={show} delay={350}>
        <div className="flex items-center justify-center gap-2 text-neutral-600">
          <span className="h-px flex-1 bg-neutral-800" />
          <ArrowDown className="size-3.5" />
          <span className="font-mono text-[11px]">imports as</span>
          <span className="h-px flex-1 bg-neutral-800" />
        </div>
      </Reveal>

      {/* what it becomes on struxa */}
      <Reveal show={show} delay={800}>
        <div className="flex items-center gap-3 rounded-lg border border-neutral-800/80 bg-white/[0.02] px-3.5 py-3">
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-foreground">
              Minecraft Paper
            </span>
            <span className="block font-mono text-xs text-muted-foreground">
              yolks:java_21
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
            <Check className="size-4 text-emerald-400/80" />
            Running
          </span>
        </div>
      </Reveal>
    </AppArea>
  );
}

// --- grid -------------------------------------------------------------------

export function FeaturesBento() {
  const [backupsRef, backupsInView] = useInView<HTMLDivElement>();
  const [filesRef, filesInView] = useInView<HTMLDivElement>();
  const [extensionsRef, extensionsInView] = useInView<HTMLDivElement>();
  const [customRef, customInView] = useInView<HTMLDivElement>();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      <BentoCard ref={backupsRef} className="md:col-span-2 lg:col-span-4">
        <CardCopy
          heading="Backups, anywhere"
          description="Seven adapters, from node-local storage to S3, Restic, Kopia, and Proxmox. Scheduled per instance."
        />
        <BackupDestinations show={backupsInView} />
      </BentoCard>

      <BentoCard ref={filesRef} className="md:col-span-2 lg:col-span-2 lg:row-span-2">
        <CardCopy
          heading="A real file manager"
          description="Browse, filter, and edit in place. Selecting a file opens it."
        />
        <FileExplorer show={filesInView} />
      </BentoCard>

      <BentoCard ref={extensionsRef} className="lg:col-span-2">
        <CardCopy
          heading="One-click extensions"
          description="Community extensions install from the hub. No shell, no restarts."
        />
        <ExtensionHub show={extensionsInView} />
      </BentoCard>

      <BentoCard ref={customRef} className="lg:col-span-2">
        <CardCopy
          heading="Bring your eggs with you"
          description="Pterodactyl eggs import and run as-is. Your existing library carries over."
        />
        <EggImport show={customInView} />
      </BentoCard>
    </div>
  );
}
