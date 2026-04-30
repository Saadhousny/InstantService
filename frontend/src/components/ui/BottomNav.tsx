"use client";

import { Home, CalendarDays, User, Settings } from "lucide-react";

export type Tab = "home" | "bookings" | "profile" | "settings";

interface Props {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "bookings", label: "Bookings", Icon: CalendarDays },
  { id: "profile", label: "Profile", Icon: User },
  { id: "settings", label: "Settings", Icon: Settings },
];

export function BottomNav({ activeTab = "home", onTabChange }: Props) {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-40 flex items-center rounded-t-[20px] border-t border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80"
      style={{ minHeight: "4rem", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = id === activeTab;
        return (
          <button
            key={id}
            type="button"
            aria-current={isActive ? "page" : undefined}
            onClick={() => onTabChange?.(id)}
            className={`flex h-full flex-1 flex-col items-center justify-center gap-1 text-xs font-semibold transition-colors duration-120 ease-standard focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-100 ${
              isActive ? "text-primary" : "text-muted hover:text-subtext"
            }`}
          >
            <span
              className={`flex items-center justify-center rounded-full p-1.5 transition-colors duration-120 ease-standard ${
                isActive ? "bg-blue-50" : ""
              }`}
            >
              <Icon
                aria-hidden
                className="size-5"
                strokeWidth={isActive ? 2.25 : 1.75}
              />
            </span>
            {label}
          </button>
        );
      })}
    </nav>
  );
}
