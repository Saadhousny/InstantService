"use client";

import { CircleAlert } from "lucide-react";
import { TierCard } from "@/components/ui/TierCard";
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
      <section className="mx-auto flex max-w-md flex-col gap-6 px-4 pb-32 pt-6">
        <header className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            Step 2 of 3
          </span>
          <h1 className="text-2xl font-bold text-ink text-balance">
            Choose your service level
          </h1>
          <p className="text-base leading-6 text-subtext">
            Each tier dispatches a verified contractor. Pick what fits this
            issue — you can change before confirming.
          </p>
        </header>

        {analysis.recommended_tier && (
          <div className="flex items-start gap-2 rounded-md bg-blue-50 px-3 py-2 text-sm text-primary">
            <span className="font-semibold">Dispatch AI:</span>
            <span className="leading-5">
              {analysis.recommended_tier} is recommended for this{" "}
              {analysis.service_category.toLowerCase()} request.
            </span>
          </div>
        )}

        <div
          role="radiogroup"
          aria-label="Service tier"
          className="flex flex-col gap-4"
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

        <p className="text-xs leading-4 text-muted">
          You can edit this before dispatch. Pricing is shown at confirmation.
        </p>

        {dispatchFailed && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-red-100 bg-red-50 px-3 py-2 text-sm text-danger"
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
            className="h-12 w-full rounded-md bg-primary px-4 text-sm font-semibold text-white shadow-sm transition-opacity duration-120 ease-standard hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
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
