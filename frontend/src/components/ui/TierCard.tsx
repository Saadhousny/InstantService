"use client";
import { Check, Clock, ShieldCheck } from "lucide-react";
import type { Tier } from "@/lib/types";

interface TierContent {
  name: Tier;
  descriptor: string;
  benefits: [string, string, string];
  proof: { title: string; detail: string };
  timing: { title: string; detail: string };
  premiumCoverage?: boolean;
  // Pill (tier name badge)
  pillBg: string;
  pillText: string;
  // Card body background
  cardBg: string;
  // Left accent border
  accentBorder: string;
  // Card outer border (unselected)
  borderColor: string;
  // Card outer border (selected)
  selectedBorder: string;
  // Check + shield icon color in benefits
  iconColor: string;
  // Footer background
  footerBg: string;
  // Footer border
  footerBorder: string;
  // Proof icon color
  proofIconColor: string;
}

const TIER_CONTENT: Record<Tier, TierContent> = {
  Basic: {
    name: "Basic",
    descriptor: "Verified help when timing is flexible.",
    benefits: [
      "Verified contractor",
      "Standard dispatch",
      "Job details shared before arrival",
    ],
    proof: {
      title: "License on file",
      detail: "Business identity reviewed before dispatch.",
    },
    timing: {
      title: "Standard availability",
      detail: "Typical response within the day.",
    },
    pillBg: "bg-slate-600",
    pillText: "text-white",
    cardBg: "bg-white",
    accentBorder: "border-l-slate-500",
    borderColor: "border-slate-200",
    selectedBorder: "border-slate-500",
    iconColor: "text-slate-500",
    footerBg: "bg-slate-50",
    footerBorder: "border-slate-200",
    proofIconColor: "text-slate-500",
  },
  Plus: {
    name: "Plus",
    descriptor: "Best balance of speed and contractor proof.",
    benefits: [
      "Faster dispatch priority",
      "Higher recent acceptance rate",
      "Stronger contractor proof",
    ],
    proof: {
      title: "Higher recent rating",
      detail: "Better acceptance rate on recent jobs.",
    },
    timing: {
      title: "Faster expected response",
      detail: "Usually accepted within minutes.",
    },
    pillBg: "bg-primary",
    pillText: "text-white",
    cardBg: "bg-blue-50/30",
    accentBorder: "border-l-primary",
    borderColor: "border-blue-200",
    selectedBorder: "border-primary",
    iconColor: "text-primary",
    footerBg: "bg-blue-50/60",
    footerBorder: "border-blue-100",
    proofIconColor: "text-primary",
  },
  Premium: {
    name: "Premium",
    descriptor: "Priority dispatch with strongest accountability.",
    benefits: [
      "Priority dispatch queue",
      "Strongest contractor proof",
      "Premium coverage active",
    ],
    proof: {
      title: "Strongest contractor proof",
      detail: "Top recent rating and highest acceptance rate.",
    },
    timing: {
      title: "Fastest response window",
      detail: "Priority queued ahead of standard requests.",
    },
    premiumCoverage: true,
    pillBg: "bg-[#1E3A8A]",
    pillText: "text-white",
    cardBg: "bg-slate-50/60",
    accentBorder: "border-l-[#1E3A8A]",
    borderColor: "border-slate-300",
    selectedBorder: "border-[#1E3A8A]",
    iconColor: "text-[#1E3A8A]",
    footerBg: "bg-slate-100/80",
    footerBorder: "border-slate-200",
    proofIconColor: "text-[#1E3A8A]",
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
  const c = TIER_CONTENT[tier];

  return (
    <button
      type="button"
      onClick={() => onSelect(tier)}
      role="radio"
      aria-checked={isSelected}
      aria-label={`${c.name} tier: ${c.descriptor}${
        isRecommended ? " — recommended for this issue" : ""
      }`}
      className={[
        "group relative flex w-full flex-col overflow-hidden rounded-lg text-left transition-all duration-200 ease-standard focus:outline-none focus:ring-4 focus:ring-blue-100",
        "border-l-4",
        c.accentBorder,
        c.cardBg,
        isSelected
          ? `border-2 ${c.selectedBorder} shadow-md`
          : `border ${c.borderColor} shadow-sm`,
      ].join(" ")}
    >
      {/* Card body */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-[10px] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${c.pillBg} ${c.pillText}`}
              >
                {c.name}
              </span>
              {isSelected && (
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${c.pillBg} ${c.pillText} opacity-80`}
                  aria-hidden
                >
                  <Check className="size-3" strokeWidth={2.5} />
                  Selected
                </span>
              )}
            </div>
            <p className="text-sm font-semibold leading-5 text-ink">
              {c.descriptor}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1.5">
            {isRecommended && (
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-primary">
                Recommended
              </span>
            )}
            {c.premiumCoverage && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-warning">
                <ShieldCheck className="size-3" strokeWidth={2} />
                Coverage
              </span>
            )}
          </div>
        </div>

        <ul className="flex flex-col gap-1.5">
          {c.benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-2 text-sm text-subtext"
            >
              <Check
                aria-hidden
                className={`mt-0.5 size-3.5 shrink-0 ${c.iconColor}`}
                strokeWidth={2.5}
              />
              <span className="leading-5">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Proof footer */}
      <div
        className={`flex flex-col gap-2 border-t px-4 py-3 ${c.footerBg} ${c.footerBorder}`}
      >
        <div className="flex items-start gap-2.5">
          <ShieldCheck
            aria-hidden
            className={`mt-0.5 size-4 shrink-0 ${c.proofIconColor}`}
            strokeWidth={1.75}
          />
          <div>
            <p className="text-sm font-semibold text-ink">{c.proof.title}</p>
            <p className="text-xs leading-4 text-muted">{c.proof.detail}</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Clock
            aria-hidden
            className="mt-0.5 size-4 shrink-0 text-muted"
            strokeWidth={1.75}
          />
          <div>
            <p className="text-sm font-semibold text-ink">{c.timing.title}</p>
            <p className="text-xs leading-4 text-muted">{c.timing.detail}</p>
          </div>
        </div>
      </div>
    </button>
  );
}
