"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CircleCheck,
  Clock,
  Hash,
  MapPin,
  ShieldCheck,
  UserCheck,
  Wrench,
} from "lucide-react";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import type { BookingFlowApi } from "@/hooks/useBookingFlow";
import type { Tier } from "@/lib/types";

interface ConfirmationScreenProps {
  flow: BookingFlowApi;
}

const TIER_PILL: Record<Tier, { className: string; label: string }> = {
  Basic: { className: "bg-slate-100 text-tierBasic", label: "Basic" },
  Plus: { className: "bg-blue-50 text-tierPlus", label: "Plus" },
  Premium: { className: "bg-blue-950/5 text-tierPremium", label: "Premium" },
};

export function ConfirmationScreen({ flow }: ConfirmationScreenProps) {
  const { state, reset } = flow;
  const { dispatchResult, selectedTier, voice, bookingId } = state;

  const tier: Tier =
    selectedTier ?? dispatchResult?.contractor.tier ?? "Plus";
  const tierPill = TIER_PILL[tier];
  const isPremium = tier === "Premium";

  const fallbackText = useMemo(() => {
    if (voice?.fallback_text) return voice.fallback_text;
    if (dispatchResult) {
      return `Your ${dispatchResult.contractor.service_category.toLowerCase()} request is confirmed. ${dispatchResult.contractor.name} is your verified contractor and will arrive ${dispatchResult.estimated_arrival_window}.`;
    }
    return "Your booking is confirmed. A verified contractor will arrive within the estimated window.";
  }, [voice?.fallback_text, dispatchResult]);

  const shortBookingId = useMemo(() => {
    if (!bookingId) return null;
    return bookingId.length > 12 ? bookingId.slice(0, 12).toUpperCase() : bookingId.toUpperCase();
  }, [bookingId]);

  if (!dispatchResult || !bookingId) {
    return (
      <main className="min-h-dvh bg-bg text-ink">
        <section className="mx-auto flex max-w-md flex-col gap-4 px-4 pb-28 pt-6">
          <p className="text-sm text-muted">No confirmed booking yet.</p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex w-fit items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-subtext transition-colors duration-120 ease-standard hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Start over
          </button>
        </section>
      </main>
    );
  }

  const contractor = dispatchResult.contractor;

  return (
    <main className="min-h-dvh bg-bg text-ink">
      <section className="mx-auto flex max-w-md flex-col gap-6 px-4 pb-32 pt-8">
        <ConfirmationHeader />

        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-[34px] font-bold leading-10 text-ink">Booked</h1>
          <p className="text-base leading-6 text-subtext">
            {contractor.name} accepted your request and is on the way.
          </p>
          {shortBookingId && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-subtext">
              <Hash aria-hidden className="size-3.5" strokeWidth={1.75} />
              <span className="font-mono tracking-wide">{shortBookingId}</span>
            </span>
          )}
        </div>

        <article
          aria-label="Booking summary"
          className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-5 shadow-sm"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ink">Booking summary</p>
            <span
              className={`inline-flex items-center rounded-[10px] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${tierPill.className}`}
            >
              {tierPill.label}
            </span>
          </div>

          <dl className="flex flex-col gap-3 text-sm">
            <SummaryRow
              icon={<Wrench aria-hidden className="size-4 text-muted" strokeWidth={1.75} />}
              label="Service"
              value={contractor.service_category}
            />
            <SummaryRow
              icon={
                <UserCheck
                  aria-hidden
                  className="size-4 text-muted"
                  strokeWidth={1.75}
                />
              }
              label="Contractor"
              value={contractor.name}
              valueExtra={
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-success">
                  <ShieldCheck
                    aria-hidden
                    className="size-3"
                    strokeWidth={1.75}
                  />
                  Verified
                </span>
              }
            />
            <SummaryRow
              icon={<Clock aria-hidden className="size-4 text-muted" strokeWidth={1.75} />}
              label="Arrival window"
              value={dispatchResult.estimated_arrival_window}
            />
            {Number.isFinite(contractor.distance_km) && (
              <SummaryRow
                icon={
                  <MapPin
                    aria-hidden
                    className="size-4 text-muted"
                    strokeWidth={1.75}
                  />
                }
                label="Distance"
                value={`${contractor.distance_km.toFixed(1)} km away`}
              />
            )}
          </dl>

          {isPremium && (
            <div className="flex items-start gap-2 rounded-md bg-amber-50 px-3 py-2">
              <ShieldCheck
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-warning"
                strokeWidth={1.75}
              />
              <div className="flex flex-col gap-0.5">
                <p className="text-xs font-semibold text-warning">
                  Premium coverage active
                </p>
                <p className="text-xs leading-4 text-warning/80">
                  Issue protection applies to this booking.
                </p>
              </div>
            </div>
          )}
        </article>

        <AudioPlayer
          audioBase64={voice?.audio_base64 ?? null}
          fallbackText={fallbackText}
          voiceStatus={voice?.voice_status ?? "unavailable"}
        />

        <p className="text-xs leading-4 text-muted">
          You&apos;ll get an update if the contractor&apos;s arrival window
          changes. Keep this confirmation handy.
        </p>
      </section>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={reset}
            className="h-12 w-full rounded-md border border-border bg-surface px-4 text-sm font-semibold text-ink shadow-sm transition-colors duration-120 ease-standard hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Start a new request
          </button>
        </div>
      </div>
    </main>
  );
}

function ConfirmationHeader() {
  // Calm reveal: fade + small upward slide on mount, respects prefers-reduced-motion
  // via the global rule in globals.css.
  const [visible, setVisible] = useState(false);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    raf.current = window.requestAnimationFrame(() => setVisible(true));
    return () => {
      if (raf.current != null) window.cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex size-16 items-center justify-center rounded-full bg-emerald-50 text-success transition-all duration-280 ease-standard ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
        }`}
      >
        <CircleCheck
          aria-hidden
          className="size-12"
          strokeWidth={1.75}
        />
        <span className="sr-only">Booking confirmed</span>
      </div>
    </div>
  );
}

interface SummaryRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueExtra?: React.ReactNode;
}

function SummaryRow({ icon, label, value, valueExtra }: SummaryRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center">
        {icon}
      </span>
      <div className="flex flex-1 flex-col gap-0.5">
        <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
          {label}
        </dt>
        <dd className="flex flex-wrap items-center gap-2 text-sm leading-5 text-ink">
          <span className="font-medium">{value}</span>
          {valueExtra}
        </dd>
      </div>
    </div>
  );
}
