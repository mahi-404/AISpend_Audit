import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variant === "default" &&
          "bg-primary/10 text-primary ring-1 ring-inset ring-primary/20",
        variant === "secondary" &&
          "bg-secondary text-secondary-foreground ring-1 ring-inset ring-border",
        variant === "outline" &&
          "bg-transparent text-muted-foreground ring-1 ring-inset ring-border",
        className
      )}
    >
      {children}
    </span>
  );
}
