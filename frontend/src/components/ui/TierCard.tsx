"use client";

import { Check, Clock, ShieldCheck, Sparkles } from "lucide-react";
import type { Tier } from "@/lib/types";

interface TierContent {
  name: Tier;
  descriptor: string;
  benefits: [string, string, string];
  proof: { title: string; detail: string };
  timing: { title: string; detail: string };
  premiumCoverage?: boolean;
  textColor: string;
  pillBg: string;
}

const TIER_CONTENT: Record<Tier, TierContent> = {
  Basic: {
    name: "Basic",
    descriptor: "Best for simple tasks when timing is flexible.",
    benefits: [
      "Verified contractor",
      "Standard dispatch",
      "Basic job details shared",
    ],
    proof: {
      title: "License/business identity on file",
      detail: "Reviewed before dispatch.",
    },
    timing: {
      title: "Standard availability",
      detail: "Typical response within the day.",
    },
    textColor: "text-tierBasic",
    pillBg: "bg-slate-100",
  },
  Plus: {
    name: "Plus",
    descriptor: "Best balance of speed and proof.",
    benefits: [
      "Faster dispatch priority",
      "Stronger contractor proof",
      "Higher recent acceptance rate",
    ],
    proof: {
      title: "Higher recent rating",
      detail: "Better acceptance rate on recent jobs.",
    },
    timing: {
      title: "Faster expected response",
      detail: "Usually accepted within minutes.",
    },
    textColor: "text-tierPlus",
    pillBg: "bg-blue-50",
  },
  Premium: {
    name: "Premium",
    descriptor: "Best for urgent or high-trust jobs.",
    benefits: [
      "Priority dispatch",
      "Strongest contractor proof",
      "Premium coverage active",
    ],
    proof: {
      title: "Strongest contractor proof",
      detail: "Top recent rating, highest acceptance rate.",
    },
    timing: {
      title: "Fastest response window",
      detail: "Priority queued ahead of standard requests.",
    },
    premiumCoverage: true,
    textColor: "text-tierPremium",
    pillBg: "bg-blue-950/5",
  },
};

interface TierCardProps {
  tier: Tier;
  isRecommended: boolean;
  isSelected: boolean;
  onSelect: (tier: Tier) => void;
}

export function TierCard({
  tier,
  isRecommended,
  isSelected,
  onSelect,
}: TierCardProps) {
  const content = TIER_CONTENT[tier];

  const containerClasses = isSelected
    ? "border-2 border-primary shadow-md"
    : "border border-border shadow-sm";

  return (
    <button
      type="button"
      onClick={() => onSelect(tier)}
      role="radio"
      aria-checked={isSelected}
      aria-label={`${content.name} tier: ${content.descriptor}${
        isRecommended ? " — recommended for this issue" : ""
      }`}
      className={`group relative flex w-full flex-col gap-4 rounded-lg bg-surface p-5 text-left transition-all duration-200 ease-standard focus:outline-none focus:ring-4 focus:ring-blue-100 ${containerClasses}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-[10px] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${content.pillBg} ${content.textColor}`}
            >
              {content.name}
            </span>
            {isSelected && (
              <span
                className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-primary"
                aria-hidden
              >
                <Check className="size-3" strokeWidth={2} />
                Selected
              </span>
            )}
          </div>
          <p className="text-base font-semibold leading-6 text-ink">
            {content.descriptor}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          {isRecommended && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" strokeWidth={1.75} />
              Recommended
            </span>
          )}
          {content.premiumCoverage && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-warning">
              <ShieldCheck className="size-3.5" strokeWidth={1.75} />
              Coverage
            </span>
          )}
        </div>
      </div>

      <ul className="flex flex-col gap-2">
        {content.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm text-subtext">
            <Check
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-success"
              strokeWidth={2}
            />
            <span className="leading-5">{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2 border-t border-border pt-3">
        <div className="flex items-start gap-2">
          <ShieldCheck
            aria-hidden
            className="mt-0.5 size-4 shrink-0 text-success"
            strokeWidth={1.75}
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-ink">{content.proof.title}</p>
            <p className="text-xs leading-4 text-muted">{content.proof.detail}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Clock
            aria-hidden
            className="mt-0.5 size-4 shrink-0 text-muted"
            strokeWidth={1.75}
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-ink">{content.timing.title}</p>
            <p className="text-xs leading-4 text-muted">{content.timing.detail}</p>
          </div>
        </div>
      </div>
    </button>
  );
}
