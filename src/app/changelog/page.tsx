import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { changelog, formatChangelogDate } from "@/lib/changelog";
import { CheckIcon } from "lucide-react";

const TYPE_STYLES = {
  major: { label: "Major",  className: "bg-[#66C72E]/15 text-[#66C72E] border-[#66C72E]/30" },
  minor: { label: "Minor",  className: "bg-blue-500/15  text-blue-400  border-blue-500/30"  },
  patch: { label: "Patch",  className: "bg-zinc-500/15  text-zinc-400  border-zinc-500/30"  },
};

export default function ChangelogPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl border-x border-border min-h-screen">
        <Navbar />

        {/* Hero */}
        <section className="px-6 py-28 border-b border-border">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
            What&apos;s new
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-4">
            Changelog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Every release, every fix, every improvement to Struxa — documented here.
          </p>
        </section>

        {/* Entries */}
        <section className="px-6 py-16">
          <div className="flex flex-col">
              {changelog.map((entry, idx) => {
                const type = TYPE_STYLES[entry.type];
                return (
                  <div
                    key={entry.version}
                    id={entry.version}
                    className={`relative pl-8 border-l border-border ${idx < changelog.length - 1 ? "pb-16" : "pb-2"}`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[4.5px] top-2 size-[9px] rounded-full bg-background border-2 border-border" />

                    {/* Date + version header */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-sm text-muted-foreground">
                        {formatChangelogDate(entry.date)}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${type.className}`}
                      >
                        {entry.version}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${type.className}`}
                      >
                        {type.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
                      {entry.title}
                    </h2>

                    {/* Description */}
                    <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                      {entry.description}
                    </p>

                    {/* Changes */}
                    <ul className="flex flex-col gap-2.5 mb-6 max-w-2xl">
                      {entry.changes.map((change, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#66C72E]/15">
                            <CheckIcon className="size-2.5 text-[#66C72E]" />
                          </span>
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {change}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
