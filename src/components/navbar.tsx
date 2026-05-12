"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          aria-label="AI Spend Audit Home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/30">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            AI Spend<span className="text-primary"> Audit</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            href="/audit"
            id="navbar-cta"
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium",
              "bg-primary text-primary-foreground shadow-md shadow-primary/25",
              "transition-all duration-200 hover:bg-primary/90 hover:shadow-primary/40 hover:shadow-lg",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            Start Audit
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out md:hidden",
          isOpen ? "max-h-80 border-b border-border bg-background/95 backdrop-blur-xl" : "max-h-0"
        )}
      >
        <nav className="container mx-auto flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
            <Link
              href="/login"
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              href="/audit"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-md transition-all hover:bg-primary/90"
            >
              Start Audit
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
