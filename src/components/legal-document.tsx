import { Fragment, type ReactNode } from 'react';
import type { Block, LegalDoc, ListItem } from '../data/legal-content';

const EMAIL_RE = /^[\w.+-]+@[\w-]+\.[\w.-]+$/;

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*.+?\*\*|\[.+?\]\(.+?\))/g).filter(Boolean);

  return parts.map((part, i) => {
    const boldMatch = part.match(/^\*\*(.+)\*\*$/);
    if (boldMatch) {
      const inner = boldMatch[1]!;
      return (
        <strong key={i} className="font-medium text-neutral-200">
          {EMAIL_RE.test(inner) ? (
            <a href={`mailto:${inner}`} className="text-blue-400 hover:text-blue-300 hover:underline">
              {inner}
            </a>
          ) : (
            inner
          )}
        </strong>
      );
    }

    const linkMatch = part.match(/^\[(.+)\]\((.+)\)$/);
    if (linkMatch) {
      return (
        <a key={i} href={linkMatch[2]} className="text-blue-400 hover:text-blue-300 hover:underline">
          {linkMatch[1]}
        </a>
      );
    }

    if (EMAIL_RE.test(part.trim())) {
      return (
        <a key={i} href={`mailto:${part.trim()}`} className="text-blue-400 hover:text-blue-300 hover:underline">
          {part}
        </a>
      );
    }

    return <Fragment key={i}>{part}</Fragment>;
  });
}

function renderListItem(item: ListItem): ReactNode {
  if (typeof item === 'string') return renderInline(item);
  return (
    <>
      {renderInline(item.text)}
      <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-neutral-700">
        {item.sub.map((sub) => (
          <li key={sub} className="text-neutral-400">
            {renderInline(sub)}
          </li>
        ))}
      </ul>
    </>
  );
}

function renderBlock(block: Block, i: number): ReactNode {
  if (block.type === 'p') {
    return (
      <p key={i} className="leading-relaxed text-neutral-400">
        {renderInline(block.text)}
      </p>
    );
  }
  if (block.type === 'ul') {
    return (
      <ul key={i} className="list-disc space-y-1.5 pl-5 marker:text-neutral-700">
        {block.items.map((item) => (
          <li key={item} className="text-neutral-400">
            {renderInline(item)}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ol key={i} className="list-decimal space-y-2.5 pl-5 marker:text-neutral-600">
      {block.items.map((item, j) => (
        <li key={j} className="text-neutral-400">
          {renderListItem(item)}
        </li>
      ))}
    </ol>
  );
}

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <div className="relative border-t border-neutral-800">
      <div className="px-6 py-14 md:px-16">
        <article className="max-w-2xl space-y-10">
          <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">
            Last updated <span className="text-neutral-300">{doc.lastUpdated}</span>
          </p>

          {doc.intro ? <div className="space-y-4">{doc.intro.map(renderBlock)}</div> : null}

          {doc.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="font-display text-xl font-semibold text-neutral-50">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-sm">{section.body.map(renderBlock)}</div>
            </section>
          ))}
        </article>
      </div>

      <div className="hidden border border-neutral-800 bg-neutral-950 p-5 md:absolute md:right-0 md:top-0 md:block md:w-96 md:border-r-0 md:border-t-0">
        <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">On this page</p>
        <ul className="mt-3 space-y-2">
          {doc.sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="block text-xs leading-relaxed text-neutral-500 transition-colors hover:text-blue-400"
              >
                {section.heading}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
