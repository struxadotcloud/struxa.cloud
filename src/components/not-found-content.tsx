"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { PaintedUnderline } from "@/components/ui/painted-underline";
import { Home, Zap, CreditCard, ArrowLeft } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const links = [
  {
    icon: Home,
    href: "/",
    label: "Home",
    description: "Back to start",
  },
  {
    icon: Zap,
    href: "/#features",
    label: "Features",
    description: "What we offer",
  },
  {
    icon: CreditCard,
    href: "/pricing",
    label: "Pricing",
    description: "Plans & pricing",
  },
];

export function NotFoundContent() {
  return (
    <section className="relative flex-1 flex items-center justify-center overflow-hidden px-6 py-24">
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Big 404 */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6 select-none"
        >
          <span
            className="block font-bold leading-none tracking-tighter text-foreground"
            style={{ fontSize: "clamp(6rem, 22vw, 14rem)" }}
          >
            404
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl"
        >
          This page{" "}
          <PaintedUnderline delay={0.4}>doesn&apos;t exist</PaintedUnderline>
        </motion.h1>

        {/* Description */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-10 text-base text-muted-foreground md:text-lg"
        >
          The address you entered doesn&apos;t exist or the page was moved. Maybe you&apos;ll find what you&apos;re looking for below.
        </motion.p>

        {/* Nav cards */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {links.map(({ icon: Icon, href, label, description }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col items-start gap-2 rounded-xl border border-border bg-card/50 p-4 text-left transition-colors hover:bg-accent hover:border-border/80"
            >
              <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-background group-hover:bg-muted transition-colors">
                <Icon className="size-4 text-foreground" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground">{description}</div>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Back link */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            render={<Link href="/" />}
          >
            <ArrowLeft className="mr-1.5 size-4" />
            Go back
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
