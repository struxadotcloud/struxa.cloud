"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="px-6 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-2">
              <img src="https://static.struxa.cloud/logos/logo.svg" alt="Struxa" className="h-6 w-auto dark:hidden" />
              <img src="https://static.struxa.cloud/logos/logo-white.svg" alt="Struxa" className="h-6 w-auto hidden dark:block" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Open-source game server management panel. Self-hosted, modern, built to replace Pterodactyl.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#features"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Features
                </Link>
              </li>

              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Deployment
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/struxadotcloud/struxa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://docs.struxa.cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://status.struxa.cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Status
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/legal"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Legal
                </Link>
              </li>

              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2026 Struxa. All rights reserved.
            </div>{" "}
            <div className="flex space-x-6">
              <Link
                href="/legal/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/legal/cookies"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
