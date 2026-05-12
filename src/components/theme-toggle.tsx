"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={cn("h-9 w-9 rounded-lg border border-border bg-muted animate-pulse", className)} />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border",
        "bg-background text-foreground transition-all duration-200",
        "hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 transition-transform duration-200 rotate-0 scale-100" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-200 rotate-0 scale-100" />
      )}
    </button>
  );
}
