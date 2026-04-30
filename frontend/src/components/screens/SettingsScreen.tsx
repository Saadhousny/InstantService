"use client";

import { useState } from "react";
import {
  Bell,
  ChevronRight,
  Clock,
  FileText,
  HelpCircle,
  Lock,
  MapPin,
  MessageSquare,
  Moon,
  Shield,
  Trash2,
} from "lucide-react";
import { BottomNav, type Tab } from "@/components/ui/BottomNav";

interface SettingsScreenProps {
  onTabChange: (tab: Tab) => void;
}

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-150 ease-standard focus:outline-none focus:ring-4 focus:ring-blue-100 ${
        enabled ? "bg-primary" : "bg-slate-200"
      }`}
    >
      <span className="sr-only">{enabled ? "On" : "Off"}</span>
      <span
        aria-hidden
        className={`pointer-events-none inline-block size-5 rounded-full bg-white shadow-sm transition-transform duration-150 ease-standard ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-1 text-xs font-semibold uppercase tracking-wide text-muted">
      {children}
    </p>
  );
}

function RowToggle({
  icon: Icon,
  label,
  description,
  enabled,
  onToggle,
  border = true,
}: {
  icon: React.ElementType;
  label: string;
  description?: string;
  enabled: boolean;
  onToggle: () => void;
  border?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 px-4 py-4 ${border ? "border-t border-border" : ""}`}>
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100">
        <Icon aria-hidden className="size-4 text-subtext" strokeWidth={1.75} />
      </div>
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <p className="text-sm font-semibold text-ink">{label}</p>
        {description && <p className="text-xs text-muted">{description}</p>}
      </div>
      <Toggle enabled={enabled} onToggle={onToggle} />
    </div>
  );
}

function RowLink({
  icon: Icon,
  label,
  description,
  border = true,
  destructive = false,
}: {
  icon: React.ElementType;
  label: string;
  description?: string;
  border?: boolean;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-3 px-4 py-4 text-left transition-colors duration-120 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-inset focus:ring-blue-100 ${
        border ? "border-t border-border" : ""
      }`}
    >
      <div className={`flex size-8 shrink-0 items-center justify-center rounded-full ${destructive ? "bg-red-50" : "bg-slate-100"}`}>
        <Icon
          aria-hidden
          className={`size-4 ${destructive ? "text-danger" : "text-subtext"}`}
          strokeWidth={1.75}
        />
      </div>
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <p className={`text-sm font-semibold ${destructive ? "text-danger" : "text-ink"}`}>{label}</p>
        {description && <p className="text-xs text-muted">{description}</p>}
      </div>
      {!destructive && (
        <ChevronRight aria-hidden className="size-4 shrink-0 text-muted" strokeWidth={1.75} />
      )}
    </button>
  );
}

export function SettingsScreen({ onTabChange }: SettingsScreenProps) {
  const [bookingAlerts, setBookingAlerts] = useState(true);
  const [arrivalReminders, setArrivalReminders] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [smsUpdates, setSmsUpdates] = useState(true);

  return (
    <main className="min-h-dvh bg-bg text-ink">
      <section className="mx-auto flex max-w-md flex-col gap-5 px-4 pb-28 pt-6">

        {/* Page title */}
        <header>
          <h1 className="text-2xl font-bold text-ink">Settings</h1>
        </header>

        {/* Notifications */}
        <div className="flex flex-col gap-2">
          <SectionLabel>Notifications</SectionLabel>
          <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
            <RowToggle
              icon={Bell}
              label="Booking alerts"
              description="Updates when a contractor accepts or confirms"
              enabled={bookingAlerts}
              onToggle={() => setBookingAlerts((v) => !v)}
              border={false}
            />
            <RowToggle
              icon={Clock}
              label="Arrival reminders"
              description="Notified 30 minutes before estimated arrival"
              enabled={arrivalReminders}
              onToggle={() => setArrivalReminders((v) => !v)}
            />
            <RowToggle
              icon={MessageSquare}
              label="SMS updates"
              description="Text message confirmation after dispatch"
              enabled={smsUpdates}
              onToggle={() => setSmsUpdates((v) => !v)}
            />
            <RowToggle
              icon={Bell}
              label="Promotions"
              description="Occasional service tips and offers"
              enabled={promotions}
              onToggle={() => setPromotions((v) => !v)}
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="flex flex-col gap-2">
          <SectionLabel>Preferences</SectionLabel>
          <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
            <RowToggle
              icon={MapPin}
              label="Location services"
              description="Used to match contractors near you"
              enabled={locationServices}
              onToggle={() => setLocationServices((v) => !v)}
              border={false}
            />
            <RowToggle
              icon={Moon}
              label="Dark mode"
              description="Coming soon"
              enabled={darkMode}
              onToggle={() => setDarkMode((v) => !v)}
            />
            <RowLink
              icon={Shield}
              label="Default dispatch tier"
              description="Currently: Plus"
            />
          </div>
        </div>

        {/* Account */}
        <div className="flex flex-col gap-2">
          <SectionLabel>Account</SectionLabel>
          <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
            <RowLink
              icon={Lock}
              label="Change password"
              border={false}
            />
            <RowLink
              icon={Shield}
              label="Privacy settings"
              description="Manage data and permissions"
            />
          </div>
        </div>

        {/* Support & Legal */}
        <div className="flex flex-col gap-2">
          <SectionLabel>Support</SectionLabel>
          <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
            <RowLink
              icon={HelpCircle}
              label="Help center"
              description="FAQs and contact support"
              border={false}
            />
            <RowLink
              icon={FileText}
              label="Terms of service"
            />
            <RowLink
              icon={FileText}
              label="Privacy policy"
            />
          </div>
        </div>

        {/* Danger zone */}
        <div className="flex flex-col gap-2">
          <SectionLabel>Danger zone</SectionLabel>
          <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
            <RowLink
              icon={Trash2}
              label="Delete account"
              description="Permanently remove your account and data"
              border={false}
              destructive
            />
          </div>
        </div>

        {/* App version */}
        <p className="text-center text-xs text-muted">InstantService · v1.0.0</p>

      </section>

      <BottomNav activeTab="settings" onTabChange={onTabChange} />
    </main>
  );
}
