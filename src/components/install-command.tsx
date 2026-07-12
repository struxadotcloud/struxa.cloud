'use client';

import { useState } from 'react';

const COMMAND = 'bash <(curl -fsSL install.struxa.cloud)';

export function InstallCommand() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center justify-between gap-4 border border-neutral-800 bg-neutral-950/60 px-4 py-3">
      <code className="font-mono text-sm text-neutral-300">
        <span className="text-blue-400">$</span> {COMMAND}
      </code>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 border border-neutral-800 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-neutral-300 transition-colors hover:bg-neutral-900"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
