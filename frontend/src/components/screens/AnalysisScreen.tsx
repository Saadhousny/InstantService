"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Route } from "lucide-react";
import { UrgencyBadge } from "@/components/ui/UrgencyBadge";
import type { BookingFlowApi } from "@/hooks/useBookingFlow";
import type { Tier } from "@/lib/types";

const TIER_LABELS: Record<Tier, string> = {
  Basic: "Basic recommended",
  Plus: "Plus recommended",
  Premium: "Premium recommended",
};

interface AnalysisScreenProps {
  flow: BookingFlowApi;
}

export function AnalysisScreen({ flow }: AnalysisScreenProps) {
  const { state, goToTierSelection, reset } = flow;
  const { analysis, request } = state;
  const [reasoningOpen, setReasoningOpen] = useState(false);

  if (!analysis) {
    return (
      <main className="min-h-dvh bg-bg text-ink">
        <section className="mx-auto flex max-w-md flex-col gap-4 px-4 pb-28 pt-6">
          <p className="text-sm text-muted">No analysis available yet.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-bg text-ink">
      <section className="mx-auto flex max-w-md flex-col gap-5 px-4 pb-32 pt-6">
        <header className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            Step 1 of 3
          </span>
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-bold text-ink">Issue review</h1>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-subtext transition-colors duration-120 ease-standard hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              Edit request
            </button>
          </div>
        </header>

        {request && (
          <div className="flex flex-col gap-2">
            {(request.location || request.property_type) && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                {request.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin aria-hidden className="size-3.5" strokeWidth={1.75} />
                    {request.location}
                  </span>
                )}
                {request.location && request.property_type && (
                  <span aria-hidden>·</span>
                )}
                {request.property_type && <span>{request.property_type}</span>}
              </div>
            )}
            <div className="ml-auto max-w-[85%] rounded-lg bg-blue-50 px-4 py-3 text-sm leading-5 text-ink">
              {request.message}
            </div>
          </div>
        )}

        <article
          aria-label="Dispatch AI analysis"
          className="flex flex-col gap-0 overflow-hidden rounded-lg border border-border bg-surface shadow-sm"
        >
          {/* Card header */}
          <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
            <span
              aria-hidden
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-50 text-secondary"
            >
              <Route className="size-3.5" strokeWidth={1.75} />
            </span>
            <p className="text-sm font-semibold text-ink">Dispatch AI</p>
          </div>

          {/* Conclusion */}
          <div className="px-4 pt-4 pb-3">
            <p className="text-base leading-6 text-ink">
              {analysis.client_facing_explanation}
            </p>
          </div>

          {/* Classification chips */}
          <div className="flex flex-wrap gap-2 px-4 pb-4">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              {analysis.service_category}
            </span>
            <UrgencyBadge urgency={analysis.urgency} />
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-primary">
              {TIER_LABELS[analysis.recommended_tier]}
            </span>
          </div>

          {/* Reasoning disclosure */}
          <div className="border-t border-border px-4 py-3">
            <button
              type="button"
              onClick={() => setReasoningOpen((open) => !open)}
              aria-expanded={reasoningOpen}
              aria-controls="ai-reasoning"
              className="inline-flex items-center gap-1 rounded-md text-sm font-semibold text-primary transition-opacity duration-120 ease-standard hover:opacity-75 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              {reasoningOpen ? "Hide reasoning" : "Why this recommendation?"}
              {reasoningOpen ? (
                <ChevronUp aria-hidden className="size-4" strokeWidth={2} />
              ) : (
                <ChevronDown aria-hidden className="size-4" strokeWidth={2} />
              )}
            </button>

            {reasoningOpen && (
              <div
                id="ai-reasoning"
                className="mt-3 flex flex-col gap-0 overflow-hidden rounded-md border border-border"
              >
                <div className="flex flex-col gap-1 px-3 py-3">
                  <p className="text-xs font-semibold text-muted">
                    What we understood
                  </p>
                  <p className="text-sm leading-5 text-subtext">
                    {analysis.problem_summary}
                  </p>
                </div>
                <div className="flex flex-col gap-1 border-t border-border px-3 py-3">
                  <p className="text-xs font-semibold text-muted">
                    Estimated complexity
                  </p>
                  <p className="text-sm leading-5 text-subtext">
                    {analysis.estimated_complexity}
                  </p>
                </div>
                <div className="border-t border-border bg-slate-50 px-3 py-2">
                  <p className="text-xs text-muted">
                    You can edit this before dispatch.
                  </p>
                </div>
              </div>
            )}
          </div>
        </article>
      </section>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={goToTierSelection}
            className="h-12 w-full rounded-md border-0 bg-gradient-to-br from-blue-400 to-blue-800 px-4 text-sm font-semibold text-white shadow-sm transition-colors duration-120 ease-standard hover:from-blue-300 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            Choose a tier
          </button>
        </div>
      </div>
    </main>
  );
}
