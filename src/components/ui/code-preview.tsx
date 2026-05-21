"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";

const codeSnippets = [
  {
    language: "JavaScript",
    code: `// Initialize AI Call Agent
const agent = new CortanoCallAgent({
  phone: '+1-555-0123',
  voice: 'professional',
  integrations: ['calendar', 'crm']
});

agent.start();`,
  },
  {
    language: "Python",
    code: `# Quick setup
from cortano import CallAgent

agent = CallAgent(
    phone_number="+1-555-0123",
    voice_personality="friendly",
    integrations=["calendar", "crm"]
)
agent.deploy()`,
  },
  {
    language: "cURL",
    code: `curl -X POST \\
  https://api.cortano.ai/call-agents \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"action": "handle_call"}'`,
  },
];

export function CodePreview() {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">
          Developer Ready
        </h3>
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
          {codeSnippets[currentSnippet].language}
        </span>
      </div>

      <div className="flex-1 bg-muted/40 rounded-lg p-4 font-mono text-sm overflow-hidden border border-border/60">
        <motion.div
          key={currentSnippet}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <pre className="text-muted-foreground whitespace-pre-wrap">
            {codeSnippets[currentSnippet].code}
          </pre>
        </motion.div>
      </div>

      <div className="flex space-x-1 mt-3 justify-center">
        {codeSnippets.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1 w-6 rounded-full transition-colors duration-300 ${
              index === currentSnippet ? "bg-primary" : "bg-muted"
            }`}
            animate={{
              scale: index === currentSnippet ? 1.2 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
