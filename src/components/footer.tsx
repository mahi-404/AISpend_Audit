import Link from "next/link";
import { Zap, ExternalLink, X } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

// Inline GitHub SVG (lucide-react v1+ removed the Github icon)
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Changelog", href: "/changelog" },
    { label: "Roadmap", href: "/roadmap" },
  ],
  Developers: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs/api" },
    { label: "SDKs", href: "/docs/sdks" },
    { label: "Status", href: "https://status.aispendaudit.com", external: true },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Security", href: "/security" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
              aria-label="AI Spend Audit Home"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary shadow-sm">
                <Zap className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold">
                AI Spend<span className="text-primary"> Audit</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Complete visibility into your AI API costs. Built for teams that ship fast and spend smart.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border",
                  "text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                )}
              >
                <X className="h-3.5 w-3.5" />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border",
                  "text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                )}
              >
                <GithubIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AI Spend Audit. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with{" "}
            <span className="text-primary">♥</span>
            {" "}for AI-first teams
          </p>
        </div>
      </div>
    </footer>
  );
}
