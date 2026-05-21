"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is Struxa?",
    answer: "Struxa is an open-source game server management panel built as a modern replacement for Pterodactyl. It lets you create, manage, and monitor game servers through a clean web interface.",
  },
  {
    question: "Is Struxa really free?",
    answer: "Yes. Struxa is fully open-source and free to self-host. There are no licensing fees. Struxa Cloud — a fully managed hosted version — is coming soon.",
  },
  {
    question: "How is Struxa different from Pterodactyl?",
    answer: "Struxa is a clean-room implementation built with a modern TypeScript stack (Next.js, oRPC, Drizzle ORM). It is actively maintained, has a dark operator-focused UI, and is designed for developer contribution.",
  },
  {
    question: "What game servers does Struxa support?",
    answer: "Struxa supports any game server that can run via Wings-compatible eggs — including Minecraft, Counter-Strike 2, Valheim, ARK: Survival Evolved, Rust, and more.",
  },
  {
    question: "How do I get started?",
    answer: "Clone the repository and follow the setup guide at docs.struxa.cloud. You'll need a server running the Wings daemon and a database to get started.",
  },
  {
    question: "What is Struxa Cloud?",
    answer: "Struxa Cloud hosts the panel for you — no need to self-host the panel itself. You still bring your own Wings nodes and game servers. Automatic updates, priority support, and more. Coming soon.",
  },
];

export function FAQ() {
  return (
    <section className="border-t border-border bg-background py-28 md:py-32 overflow-hidden">
      <div className="px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-xl">
            Everything you need to know about Struxa before you get started.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Accordion multiple className="divide-y divide-border border border-border rounded-xl overflow-hidden bg-card">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={String(index)} className="border-b-0 px-6">
                <AccordionTrigger className="text-base font-medium py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionPanel className="text-muted-foreground leading-relaxed pb-5">
                  {item.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Reach out via email or open an issue on GitHub — we&apos;re happy to help.
            </p>
            <a
              href="mailto:hello@struxa.cloud"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors duration-200"
            >
              Contact us →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
