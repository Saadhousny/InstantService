import { CircleAlert, TriangleAlert } from "lucide-react";
import type { Urgency } from "@/lib/types";

interface UrgencyBadgeProps {
  urgency: Urgency;
  className?: string;
}

const STYLES: Record<
  Urgency,
  {
    container: string;
    label: string;
    icon: "none" | "triangle" | "circle";
  }
> = {
  Low: {
    container: "bg-slate-100 text-slate-700",
    label: "Low urgency",
    icon: "none",
  },
  Medium: {
    container: "bg-amber-50 text-warning",
    label: "Medium urgency",
    icon: "none",
  },
  High: {
    container: "bg-amber-100 text-warning font-semibold",
    label: "High urgency",
    icon: "triangle",
  },
  Emergency: {
    container: "bg-red-50 text-danger font-semibold",
    label: "Emergency",
    icon: "circle",
  },
};

export function UrgencyBadge({ urgency, className = "" }: UrgencyBadgeProps) {
  const style = STYLES[urgency];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${style.container} ${className}`}
    >
      {style.icon === "triangle" && (
        <TriangleAlert
          aria-hidden
          className="size-3.5"
          strokeWidth={2}
        />
      )}
      {style.icon === "circle" && (
        <CircleAlert aria-hidden className="size-3.5" strokeWidth={2} />
      )}
      <span>{style.label}</span>
    </span>
  );
}
