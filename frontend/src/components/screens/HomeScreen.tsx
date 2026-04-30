"use client";

import { useMemo, useState } from "react";
import { CircleAlert, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import type { BookingFlowApi } from "@/hooks/useBookingFlow";

const MIN_MESSAGE_LENGTH = 15;

const QUICK_CHIPS = [
  "Leaking",
  "No power",
  "Locked out",
  "Appliance issue",
  "Heating/cooling",
  "Not sure",
];

const PROPERTY_TYPES = [
  { value: "House", label: "House" },
  { value: "Apartment", label: "Apartment" },
  { value: "Condo", label: "Condo" },
  { value: "Office", label: "Office" },
  { value: "Other", label: "Other" },
];

interface HomeScreenProps {
  flow: BookingFlowApi;
}

export function HomeScreen({ flow }: HomeScreenProps) {
  const { state, analyze } = flow;
  const isAnalyzing = state.step === "analyzing";

  const [message, setMessage] = useState(state.request?.message ?? "");
  const [location, setLocation] = useState(state.request?.location ?? "");
  const [propertyType, setPropertyType] = useState(
    state.request?.property_type ?? "House"
  );
  const [showError, setShowError] = useState(false);

  const trimmedLength = message.trim().length;
  const messageTooShort = trimmedLength < MIN_MESSAGE_LENGTH;
  const locationMissing = location.trim().length === 0;
  const submitDisabled = isAnalyzing || messageTooShort || locationMissing;

  const helperText = useMemo(() => {
    if (trimmedLength === 0) {
      return "Add a few details so Dispatch AI can route this correctly.";
    }
    if (messageTooShort) {
      return `A little more detail helps — ${MIN_MESSAGE_LENGTH - trimmedLength} more character${
        MIN_MESSAGE_LENGTH - trimmedLength === 1 ? "" : "s"
      } recommended.`;
    }
    return "Looks good. Dispatch AI will recommend the right service tier.";
  }, [messageTooShort, trimmedLength]);

  const inlineError =
    showError && (messageTooShort || locationMissing)
      ? messageTooShort
        ? "Please describe the issue with at least a short sentence."
        : "Please add a city or area so we can match local contractors."
      : state.step === "analyzing_failed"
        ? state.error || "We couldn't analyze the request. Please try again."
        : null;

  function handleQuickChip(chip: string) {
    setMessage((prev) => {
      if (!prev.trim()) return chip;
      if (prev.toLowerCase().includes(chip.toLowerCase())) return prev;
      return `${prev.trim()} — ${chip}`;
    });
    setShowError(false);
  }

  async function handleSubmit() {
    if (submitDisabled) {
      setShowError(true);
      return;
    }
    setShowError(false);
    await analyze({
      message: message.trim(),
      location: location.trim(),
      property_type: propertyType,
    });
  }

  return (
    <main className="min-h-dvh bg-bg text-ink">
      <section className="mx-auto flex max-w-md flex-col gap-6 px-4 pb-32 pt-6">
        <header className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-secondary">
            <Sparkles aria-hidden className="size-3.5" strokeWidth={1.75} />
            Dispatch AI
          </span>
          <h1 className="text-[28px] font-bold leading-9 text-ink text-balance">
            Get the right service help, fast.
          </h1>
          <p className="text-base leading-6 text-subtext">
            Describe the issue. Dispatch AI recommends the right service tier
            and helps book a verified contractor.
          </p>
        </header>

        <form
          className="flex flex-col gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="problem"
              className="text-sm font-medium text-subtext"
            >
              What's going on?
            </label>
            <textarea
              id="problem"
              name="problem"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                if (showError) setShowError(false);
              }}
              placeholder="e.g. Kitchen sink is leaking under the cabinet and the floor is getting wet."
              rows={4}
              minLength={MIN_MESSAGE_LENGTH}
              aria-invalid={showError && messageTooShort}
              aria-describedby="problem-helper"
              className="min-h-[140px] w-full resize-y rounded-md border border-border bg-surface px-4 py-3 text-base leading-6 text-ink shadow-sm transition-colors duration-120 ease-standard placeholder:text-muted focus:border-primary focus:outline-none focus:ring-4 focus:ring-blue-100"
            />
            <div className="flex items-start justify-between gap-3">
              <p
                id="problem-helper"
                className={`text-xs leading-4 ${
                  showError && messageTooShort ? "text-danger" : "text-muted"
                }`}
              >
                {helperText}
              </p>
              <span
                aria-hidden
                className="shrink-0 text-xs font-medium text-muted"
              >
                {trimmedLength}/{MIN_MESSAGE_LENGTH}+
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Quick fill
            </span>
            <div className="flex flex-wrap gap-2">
              {QUICK_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleQuickChip(chip)}
                  className="inline-flex h-9 items-center rounded-full border border-border bg-surface px-3 text-sm font-medium text-subtext shadow-sm transition-colors duration-120 ease-standard hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="location"
              className="text-sm font-medium text-subtext"
            >
              Location
            </label>
            <div className="relative">
              <MapPin
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted"
                strokeWidth={1.75}
              />
              <input
                id="location"
                name="location"
                type="text"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                  if (showError) setShowError(false);
                }}
                placeholder="City or neighborhood"
                aria-invalid={showError && locationMissing}
                autoComplete="address-level2"
                className="h-12 w-full rounded-md border border-border bg-surface pl-10 pr-3 text-base text-ink shadow-sm transition-colors duration-120 ease-standard placeholder:text-muted focus:border-primary focus:outline-none focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium text-subtext">
              Property type
            </legend>
            <div
              role="radiogroup"
              aria-label="Property type"
              className="flex flex-wrap gap-2"
            >
              {PROPERTY_TYPES.map((option) => {
                const isSelected = propertyType === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setPropertyType(option.value)}
                    className={`inline-flex h-10 items-center rounded-full border px-3 text-sm font-semibold shadow-sm transition-colors duration-120 ease-standard focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      isSelected
                        ? "border-primary bg-blue-50 text-primary"
                        : "border-border bg-surface text-subtext hover:bg-slate-50"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="flex items-start gap-3 rounded-md bg-slate-50 p-3">
            <ShieldCheck
              aria-hidden
              className="mt-0.5 size-5 shrink-0 text-success"
              strokeWidth={1.75}
            />
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-ink">
                Verified contractors only
              </p>
              <p className="text-sm leading-5 text-muted">
                Business identity on file. Reviewed before dispatch.
              </p>
            </div>
          </div>

          {inlineError && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-md border border-red-100 bg-red-50 px-3 py-2 text-sm text-danger"
            >
              <CircleAlert
                aria-hidden
                className="mt-0.5 size-4 shrink-0"
                strokeWidth={2}
              />
              <span>{inlineError}</span>
            </div>
          )}
        </form>
      </section>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={submitDisabled}
            aria-busy={isAnalyzing}
            className="h-12 w-full rounded-md bg-primary px-4 text-sm font-semibold text-white shadow-sm transition-opacity duration-120 ease-standard hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAnalyzing ? "Analyzing issue…" : "Analyze issue"}
          </button>
        </div>
      </div>
    </main>
  );
}
