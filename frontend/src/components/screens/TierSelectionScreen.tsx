"use client";

import { CircleAlert } from "lucide-react";
import { TierCard } from "@/components/ui/TierCard";
import { UrgencyBadge } from "@/components/ui/UrgencyBadge";
import type { BookingFlowApi } from "@/hooks/useBookingFlow";
import type { Tier } from "@/lib/types";

const TIER_ORDER: Tier[] = ["Basic", "Plus", "Premium"];

interface TierSelectionScreenProps {
  flow: BookingFlowApi;
}

export function TierSelectionScreen({ flow }: TierSelectionScreenProps) {
  const { state, selectTier, dispatchRequest } = flow;
  const { analysis, selectedTier, step, error } = state;

  const recommended: Tier | null = analysis?.recommended_tier ?? null;
  const activeTier: Tier = selectedTier ?? recommended ?? "Plus";
  const isDispatching = step === "dispatching";
  const dispatchFailed = step === "dispatch_failed";

  if (!analysis) {
    return (
      <main className="min-h-dvh bg-bg text-ink">
        <section className="mx-auto flex max-w-md flex-col gap-4 px-4 pb-28 pt-6">
          <p className="text-sm text-muted">No request to dispatch yet.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-bg text-ink">
      <section className="mx-auto flex max-w-md flex-col gap-5 px-4 pb-32 pt-6">

        <header className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            Step 2 of 3
          </span>
          <h1 className="text-2xl font-bold text-ink">
            Choose your service level
          </h1>
          <p className="text-sm leading-5 text-subtext">
            Each tier dispatches a verified contractor. Select what fits this job.
          </p>
        </header>

        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 shadow-sm">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">
            Analyzed
          </span>
          <span className="mx-1 text-border">|</span>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
              {analysis.service_category}
            </span>
            <UrgencyBadge urgency={analysis.urgency} />
            {recommended && (
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {recommended} recommended
              </span>
            )}
          </div>
        </div>

        <div
          role="radiogroup"
          aria-label="Service tier"
          className="flex flex-col gap-3"
        >
          {TIER_ORDER.map((tier) => (
            <TierCard
              key={tier}
              tier={tier}
              isRecommended={recommended === tier}
              isSelected={activeTier === tier}
              onSelect={selectTier}
            />
          ))}
        </div>

        {dispatchFailed && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-danger"
          >
            <CircleAlert
              aria-hidden
              className="mt-0.5 size-4 shrink-0"
              strokeWidth={2}
            />
            <span>{error || "Dispatch failed. Please try again."}</span>
          </div>
        )}
      </section>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={() => void dispatchRequest()}
            disabled={isDispatching}
            aria-busy={isDispatching}
            className="h-12 w-full rounded-md border-0 bg-gradient-to-br from-blue-400 to-blue-800 px-4 text-sm font-semibold text-white shadow-sm transition-colors duration-120 ease-standard hover:from-blue-300 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDispatching
              ? `Dispatching ${activeTier}…`
              : `Continue with ${activeTier}`}
          </button>
        </div>
      </div>
    </main>
  );
}
