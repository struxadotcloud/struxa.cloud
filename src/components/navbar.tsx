"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import {
  Globe,
  Code,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Activity,
  ChevronDown,
  Zap,
  CreditCard,
  Route,
  Info,
  Briefcase,
  Menu as MenuIcon,
  X,
  GitBranch,
} from "lucide-react";

type NavSubItem = {
  icon: React.ElementType;
  href: string;
  label: string;
  description: string;
  external?: boolean;
};

type NavMenuConfig = {
  id: string;
  label: string;
  width: number;
  items: NavSubItem[];
};

export function Navbar() {
  const menus: NavMenuConfig[] = [
    {
      id: "products",
      label: "Products",
      width: 300,
      items: [
        {
          icon: Globe,
          href: "/",
          label: "Server Panel",
          description: "Create, manage, and monitor game servers from one panel.",
        },
        {
          icon: Zap,
          href: "/#features",
          label: "Features",
          description: "Real-time monitoring, file management, multi-user access, and more.",
        },
        {
          icon: CreditCard,
          href: "/pricing",
          label: "Deployment",
          description: "Self-hosted for free or join the waitlist for Struxa Cloud — managed panel hosting coming soon.",
        },
        {
          icon: Route,
          href: "/#howItWorks",
          label: "How It Works",
          description: "From node setup to running game servers in minutes.",
        },
      ],
    },
    {
      id: "developer",
      label: "Platform",
      width: 300,
      items: [
        {
          icon: GitBranch,
          href: "https://github.com/struxadotcloud/struxa",
          label: "GitHub",
          description: "Browse the source code, open issues, and contribute to Struxa.",
          external: true,
        },
        {
          icon: Code,
          href: "https://docs.struxa.cloud",
          label: "Documentation",
          description: "Complete setup guides, API reference, and integration tutorials for Struxa.",
          external: true,
        },
        {
          icon: Activity,
          href: "https://status.struxa.cloud",
          label: "Status",
          description: "Real-time uptime and status monitoring for Struxa services.",
          external: true,
        },
        {
          icon: FileText,
          href: "/changelog",
          label: "Changelog",
          description: "Latest updates, new features, and changes to Struxa.",
        },
        {
          icon: ImageIcon,
          href: "/gallery",
          label: "Gallery",
          description: "Screenshots of the Struxa panel in action.",
        },
      ],
    },
    {
      id: "resources",
      label: "Resources",
      width: 280,
      items: [
        {
          icon: BookOpen,
          href: "/blog",
          label: "Blog",
          description: "Updates, guides, and insights from the Struxa team.",
        },
        {
          icon: FileText,
          href: "/legal",
          label: "Legal",
          description: "Privacy policy, terms of service, and other legal documentation.",
        },
        {
          icon: Info,
          href: "/about",
          label: "About",
          description: "Learn about our mission and the story behind Struxa.",
        },
        {
          icon: Briefcase,
          href: "/hiring",
          label: "Hiring",
          description: "Join our team and help us build the future of game server management.",
        },
      ],
    },
  ];

  // Desktop dropdown state
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [panelLeft, setPanelLeft] = useState(0);
  const [panelWidth, setPanelWidth] = useState(300);

  const navRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMenu = (menuId: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);

    const trigger = triggerRefs.current[menuId];
    const nav = navRef.current;
    if (trigger && nav) {
      const triggerRect = trigger.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      const menu = menus.find((m) => m.id === menuId)!;
      const centerX = triggerRect.left - navRect.left + triggerRect.width / 2;
      const rawLeft = centerX - menu.width / 2;
      setPanelLeft(Math.max(0, rawLeft));
      setPanelWidth(menu.width);
    }
    setActiveMenu(menuId);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const activeMenuConfig = menus.find((m) => m.id === activeMenu);

  return (
    <>
      <header className="sticky top-0 z-50 h-14 border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/90">
        <div className="flex h-full items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setMobileOpen(false)}>
            <img src="https://static.struxa.cloud/logos/logo.svg" alt="Struxa" className="h-5 w-auto dark:hidden" />
            <img src="https://static.struxa.cloud/logos/logo-white.svg" alt="Struxa" className="h-5 w-auto hidden dark:block" />
          </Link>

          {/* Desktop Navigation */}
          <nav
            ref={navRef}
            className="hidden md:flex items-center gap-0.5 relative"
            onMouseLeave={scheduleClose}
          >
            {menus.map((menu) => (
              <button
                key={menu.id}
                ref={(el) => {
                  triggerRefs.current[menu.id] = el;
                }}
                type="button"
                onMouseEnter={() => openMenu(menu.id)}
                className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors ${
                  activeMenu === menu.id
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {menu.label}
                <motion.span
                  animate={{ rotate: activeMenu === menu.id ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex items-center opacity-60"
                >
                  <ChevronDown aria-hidden="true" className="size-3" />
                </motion.span>
              </button>
            ))}

            {/* Animated dropdown panel */}
            <AnimatePresence>
              {activeMenu && activeMenuConfig && (
                <motion.div
                  key="dropdown"
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    left: panelLeft,
                    width: panelWidth,
                  }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{
                    opacity: { duration: 0.15 },
                    y: { duration: 0.15 },
                    scale: { duration: 0.15 },
                    left: { type: "spring", stiffness: 500, damping: 50, mass: 0.5 },
                    width: { type: "spring", stiffness: 500, damping: 50, mass: 0.5 },
                  }}
                  style={{ top: "calc(100% + 8px)" }}
                  className="absolute rounded-xl border border-border bg-background shadow-lg overflow-hidden"
                  onMouseEnter={cancelClose}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMenu}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="p-2"
                    >
                      {activeMenuConfig.items.map((item) => {
                        const Icon = item.icon;
                        const itemClassName =
                          "flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-accent transition-colors";
                        const itemContent = (
                          <>
                            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted">
                              <Icon className="size-4 text-foreground" aria-hidden="true" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-foreground leading-none mb-1">
                                {item.label}
                              </div>
                              <div className="text-xs text-muted-foreground leading-snug line-clamp-2">
                                {item.description}
                              </div>
                            </div>
                          </>
                        );

                        if (item.external) {
                          return (
                            <a
                              key={item.href}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={itemClassName}
                            >
                              {itemContent}
                            </a>
                          );
                        }

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setActiveMenu(null)}
                            className={itemClassName}
                          >
                            {itemContent}
                          </Link>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/pricing"
              className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Deployment
            </Link>
            <Button
              type="button"
              size="sm"
              className="hidden md:inline-flex"
              render={<a href="https://github.com/struxadotcloud/struxa" target="_blank" rel="noopener noreferrer" />}
            >
              Get Started
            </Button>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden flex items-center justify-center size-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="x"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    <X className="size-5" aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    <MenuIcon className="size-5" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-14 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="mobile-panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-14 inset-x-0 z-50 bg-background border-b border-border shadow-lg md:hidden overflow-y-auto max-h-[calc(100dvh-3.5rem)]"
            >
              <div className="px-4 py-5 space-y-5">
                {menus.map((menu) => (
                  <div key={menu.id}>
                    <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {menu.label}
                    </p>
                    <div className="space-y-0.5">
                      {menu.items.map((item) => {
                        const Icon = item.icon;
                        const cls =
                          "flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-foreground hover:bg-accent transition-colors";
                        if (item.external) {
                          return (
                            <a
                              key={item.href}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cls}
                              onClick={() => setMobileOpen(false)}
                            >
                              <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                              {item.label}
                            </a>
                          );
                        }
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cls}
                            onClick={() => setMobileOpen(false)}
                          >
                            <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="pt-3 border-t border-border">
                  <Button
                    type="button"
                    className="w-full"
                    render={<a href="https://github.com/struxadotcloud/struxa" target="_blank" rel="noopener noreferrer" />}
                    onClick={() => setMobileOpen(false)}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
