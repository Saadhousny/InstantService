"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, Wrench } from "lucide-react";
import { BottomNav } from "@/components/ui/BottomNav";
import type { Tab } from "@/components/ui/BottomNav";
import type { SavedBooking, Tier } from "@/lib/types";

const BOOKINGS_HISTORY_KEY = "instantservice:bookings-history:v1";

const TIER_PILL: Record<Tier, { className: string; label: string }> = {
  Basic: { className: "bg-slate-100 text-tierBasic", label: "Basic" },
  Plus: { className: "bg-blue-50 text-tierPlus", label: "Plus" },
  Premium: { className: "bg-blue-950/5 text-tierPremium", label: "Premium" },
};

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

interface BookingsScreenProps {
  onTabChange: (tab: Tab) => void;
}

export function BookingsScreen({ onTabChange }: BookingsScreenProps) {
  const [bookings, setBookings] = useState<SavedBooking[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(BOOKINGS_HISTORY_KEY);
      if (raw) setBookings(JSON.parse(raw) as SavedBooking[]);
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  return (
    <main className="min-h-dvh bg-bg text-ink">
      <section className="mx-auto flex max-w-md flex-col gap-4 px-4 pb-28 pt-6">
        <h1 className="text-2xl font-bold text-ink">Bookings</h1>

        {!loaded ? null : bookings.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <CalendarDays className="size-10 text-muted" strokeWidth={1.5} />
            <p className="text-sm text-muted">No bookings yet. Your confirmed bookings will appear here.</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {bookings.map((booking) => (
              <BookingCard key={booking.booking_id} booking={booking} />
            ))}
          </ul>
        )}
      </section>

      <BottomNav activeTab="bookings" onTabChange={onTabChange} />
    </main>
  );
}

function BookingCard({ booking }: { booking: SavedBooking }) {
  const tierPill = TIER_PILL[booking.tier];

  return (
    <li className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-ink">{booking.contractor_name}</p>
          <p className="text-xs text-muted">{formatDate(booking.confirmed_at)}</p>
        </div>
        <span
          className={`inline-flex shrink-0 items-center rounded-[10px] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${tierPill.className}`}
        >
          {tierPill.label}
        </span>
      </div>

      <dl className="flex flex-col gap-2 text-sm">
        <Row icon={<Wrench className="size-3.5 text-muted" strokeWidth={1.75} />} label={booking.service_category} />
        <Row icon={<Clock className="size-3.5 text-muted" strokeWidth={1.75} />} label={booking.estimated_arrival_window} />
        {Number.isFinite(booking.distance_km) && booking.distance_km > 0 && (
          <Row icon={<MapPin className="size-3.5 text-muted" strokeWidth={1.75} />} label={`${booking.distance_km.toFixed(1)} km away`} />
        )}
      </dl>

      <p className="font-mono text-[10px] text-muted/60 tracking-wide">
        #{booking.booking_id.slice(0, 12).toUpperCase()}
      </p>
    </li>
  );
}

function Row({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex size-4 shrink-0 items-center justify-center">{icon}</span>
      <dd className="text-sm text-subtext">{label}</dd>
    </div>
  );
}
