"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CircleAlert,
  CircleCheck,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import {
  DispatchProgress,
  type DispatchStep,
} from "@/components/ui/DispatchProgress";
import type { BookingFlowApi } from "@/hooks/useBookingFlow";
import type { Tier } from "@/lib/types";

interface DispatchScreenProps {
  flow: BookingFlowApi;
}

const TIER_CONFIG: Record<
  Tier,
  { className: string; label: string; price: string }
> = {
  Basic: { className: "bg-slate-100 text-slate-700", label: "Basic", price: "$65.00" },
  Plus: { className: "bg-blue-50 text-primary", label: "Plus", price: "$95.00" },
  Premium: { className: "bg-blue-950 text-white", label: "Premium", price: "$145.00" },
};

export function DispatchScreen({ flow }: DispatchScreenProps) {
  const { state, generateVoice } = flow;
  const { step, selectedTier, dispatchResult, error } = state;

  const tierLabel = selectedTier ?? (dispatchResult?.contractor.tier as Tier) ?? "Plus";
  const config = TIER_CONFIG[tierLabel];

  const isAccepted = step === "accepted" || step === "voice_generating";
  const isVoiceGenerating = step === "voice_generating";
  const isDispatching = step === "dispatching";

  const steps = useMemo<DispatchStep[]>(() => {
    if (isAccepted) {
      return [
        {
          key: "analyze",
          title: "Request analyzed",
          description: "Dispatch AI matched the issue to the right service.",
          state: "done",
        },
        {
          key: "verify",
          title: "Verified pros checked",
          description: `Reviewed eligible ${tierLabel} contractors near you.`,
          state: "done",
        },
        {
          key: "accept",
          title: "Contractor accepted",
          description: "A verified contractor confirmed availability.",
          state: "done",
        },
        {
          key: "confirm",
          title: "Booking confirmed",
          description: "Confirm details to finalize the booking.",
          state: "active",
        },
      ];
    }
    return [
      {
        key: "analyze",
        title: "Request analyzed",
        description: "Dispatch AI matched the issue to the right service.",
        state: "done",
      },
      {
        key: "verify",
        title: "Verified pros checked",
        description: `Checking eligible ${tierLabel} contractors near you.`,
        state: "done",
      },
      {
        key: "accept",
        title: "Waiting for contractor acceptance",
        description: "Waiting for a verified contractor to accept.",
        state: "active",
      },
      {
        key: "confirm",
        title: "Booking confirmed",
        description: "This usually takes a few moments.",
        state: "pending",
      },
    ];
  }, [isAccepted, tierLabel]);

  const acceptanceRatePct = useMemo(() => {
    const rate = dispatchResult?.contractor.acceptance_rate ?? null;
    if (rate == null) return null;
    const normalized = rate <= 1 ? rate * 100 : rate;
    return Math.round(normalized);
  }, [dispatchResult?.contractor.acceptance_rate]);

  const ratingDisplay = useMemo(() => {
    const count = dispatchResult?.contractor.five_star_review_count ?? null;
    if (count == null) return null;
    return `${count.toLocaleString()} five-star review${count === 1 ? "" : "s"}`;
  }, [dispatchResult?.contractor.five_star_review_count]);

  return (
    <main className="min-h-dvh bg-bg text-ink">
      <section className="mx-auto flex max-w-md flex-col gap-6 px-4 pb-32 pt-6">
        <header className="flex flex-col gap-2">
          {isAccepted ? (
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-success">
                <CircleCheck aria-hidden className="size-3.5" strokeWidth={2} />
                Accepted
              </span>
              <span className="text-xs font-medium text-muted">Step 3 of 3</span>
            </div>
          ) : (
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Step 3 of 3
            </span>
          )}
          <h1 className="text-2xl font-bold text-ink text-balance">
            {isAccepted ? "Booking Summary" : "Dispatch in progress"}
          </h1>
          <p className="text-base leading-6 text-subtext">
            {isAccepted
              ? "Review your service details and pricing before confirming."
              : "Sit tight — we're matching this with a verified pro."}
          </p>
        </header>

        <article className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ink">Dispatch progress</p>
            <span
              className={`inline-flex items-center rounded-[10px] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${config.className}`}
            >
              {config.label}
            </span>
          </div>
          <DispatchProgress steps={steps} />
        </article>

        {isAccepted && dispatchResult && (
          <ContractorCard
            name={dispatchResult.contractor.name}
            serviceCategory={dispatchResult.contractor.service_category}
            arrivalWindow={dispatchResult.estimated_arrival_window}
            distanceKm={dispatchResult.contractor.distance_km}
            ratingDisplay={ratingDisplay}
            acceptanceRatePct={acceptanceRatePct}
            tierLabel={config.label}
            price={config.price}
          />
        )}

        {isDispatching && (
          <p className="text-xs leading-4 text-muted">
            We&apos;ll keep this screen open until a contractor accepts. You can
            safely keep the app open in the background.
          </p>
        )}

        {error && step !== "voice_failed" && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-red-100 bg-red-50 px-3 py-2 text-sm text-danger"
          >
            <CircleAlert
              aria-hidden
              className="mt-0.5 size-4 shrink-0"
              strokeWidth={2}
            />
            <span>{error}</span>
          </div>
        )}
      </section>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
        <div className="mx-auto max-w-md">
          {isAccepted ? (
            <button
              type="button"
              onClick={() => void generateVoice()}
              disabled={isVoiceGenerating}
              aria-busy={isVoiceGenerating}
              className="h-12 w-full rounded-md border-0 bg-gradient-to-br from-blue-400 to-blue-800 px-4 text-sm font-semibold text-white shadow-sm transition-colors duration-150 ease-standard hover:from-blue-300 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isVoiceGenerating ? "Confirming…" : "Confirm booking"}
            </button>
          ) : (
            <DispatchingFooter />
          )}
          
          <button
            type="button"
            onClick={() => void flow.cancel()}
            className="mt-4 w-full py-2 text-sm font-medium text-muted hover:text-danger transition-colors duration-150"
          >
            Cancel request
          </button>
        </div>
      </div>
    </main>
  );
}

interface ContractorCardProps {
  name: string;
  serviceCategory: string;
  arrivalWindow: string;
  distanceKm: number | null;
  ratingDisplay: string | null;
  acceptanceRatePct: number | null;
  tierLabel: string;
  price: string;
}

function ContractorCard({
  name,
  serviceCategory,
  arrivalWindow,
  distanceKm,
  ratingDisplay,
  acceptanceRatePct,
  tierLabel,
  price,
}: ContractorCardProps) {
  return (
    <FadeInCard>
      <article
        aria-label={`Booking details for ${name}`}
        className="flex flex-col gap-0 rounded-lg border border-border bg-surface shadow-sm overflow-hidden"
      >
        {/* Pricing row */}
        <div className="flex items-center justify-between border-b border-border bg-slate-50 px-5 py-3">
          <div className="flex items-center gap-2">
            <CreditCard className="size-4 text-muted" strokeWidth={1.75} />
            <span className="text-sm font-medium text-ink">{tierLabel} Service</span>
          </div>
          <span className="text-lg font-bold text-ink">{price}</span>
        </div>

        {/* Identity row */}
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-semibold leading-6 text-ink">{name}</p>
            <p className="text-sm text-muted">{serviceCategory}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-success">
            <ShieldCheck aria-hidden className="size-3.5" strokeWidth={2} />
            Verified
          </span>
        </div>

        {/* Arrival highlight */}
        <div className="mx-5 mb-4 flex items-center gap-3 rounded-md border border-border bg-slate-50 px-4 py-3">
          <Clock aria-hidden className="size-5 shrink-0 text-primary" strokeWidth={1.75} />
          <div className="flex flex-col gap-0">
            <p className="text-xs font-medium text-muted">Estimated arrival</p>
            <p className="text-sm font-semibold text-ink">{arrivalWindow}</p>
          </div>
          {distanceKm != null && (
            <div className="ml-auto flex items-center gap-1.5 text-xs text-muted">
              <MapPin aria-hidden className="size-3.5 shrink-0" strokeWidth={1.75} />
              <span>{distanceKm.toFixed(1)} km away</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-5 border-t border-border" />

        {/* Verification proof row */}
        <div className="flex items-start gap-3 px-5 py-4">
          <ShieldCheck
            aria-hidden
            className="mt-0.5 size-5 shrink-0 text-success"
            strokeWidth={1.75}
          />
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold text-ink">License/business identity on file</p>
            <p className="text-xs leading-4 text-muted">
              Reviewed before dispatch
            </p>
          </div>
        </div>

        {/* Stats row */}
        {(ratingDisplay || acceptanceRatePct != null) && (
          <>
            <div className="mx-5 border-t border-border" />
            <dl className="flex flex-wrap gap-x-5 gap-y-2 px-5 py-4">
              {ratingDisplay && (
                <div className="flex items-center gap-1.5">
                  <Star
                    aria-hidden
                    className="size-4 shrink-0 text-amber-500"
                    strokeWidth={1.75}
                    fill="currentColor"
                  />
                  <dt className="sr-only">Reviews</dt>
                  <dd className="text-sm text-subtext">{ratingDisplay}</dd>
                </div>
              )}
              {acceptanceRatePct != null && (
                <div className="flex items-center gap-1.5">
                  <TrendingUp
                    aria-hidden
                    className="size-4 shrink-0 text-secondary"
                    strokeWidth={1.75}
                  />
                  <dt className="sr-only">Acceptance rate</dt>
                  <dd className="text-sm text-subtext">
                    Accepted {acceptanceRatePct}% of recent requests
                  </dd>
                </div>
              )}
            </dl>
          </>
        )}
      </article>
    </FadeInCard>
  );
}

function FadeInCard({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    raf.current = window.requestAnimationFrame(() => setVisible(true));
    return () => {
      if (raf.current != null) window.cancelAnimationFrame(raf.current);
    };
  }, []);
  return (
    <div
      className={`transition-all duration-200 ease-standard ${
        visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function DispatchingFooter() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center px-2 py-3 text-sm font-medium text-muted"
    >
      Waiting for a verified contractor to accept…
    </div>
  );
}
