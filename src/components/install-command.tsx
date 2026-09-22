'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from './ui/button';

const COMMAND = 'bash <(curl -fsSL https://install.struxa.cloud)';

export function InstallCommand() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex max-w-full items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950/60 py-2 pl-3 pr-2 shadow-sm shadow-black/30 sm:gap-3 sm:pl-4">
      <code className="min-w-0 overflow-x-auto whitespace-nowrap text-xs text-neutral-300 sm:text-sm">
        <span className="text-blue-400">$</span> {COMMAND}
      </code>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy install command'}
        className="shrink-0 text-neutral-400 hover:text-neutral-100"
      >
        {copied ? <Check className="text-blue-400" /> : <Copy />}
      </Button>
    </div>
  );
}
