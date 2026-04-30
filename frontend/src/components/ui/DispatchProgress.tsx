"use client";

import { Circle, CircleCheck, Loader } from "lucide-react";

export type DispatchStepState = "done" | "active" | "pending";

export interface DispatchStep {
  key: string;
  title: string;
  description: string;
  state: DispatchStepState;
}

interface DispatchProgressProps {
  steps: DispatchStep[];
}

export function DispatchProgress({ steps }: DispatchProgressProps) {
  return (
    <ol className="flex flex-col" aria-label="Dispatch progress">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li
            key={step.key}
            className="flex gap-3"
            aria-current={step.state === "active" ? "step" : undefined}
          >
            <div className="flex flex-col items-center">
              <StepIcon state={step.state} />
              {!isLast && (
                <span
                  aria-hidden
                  className={`mt-1 w-px flex-1 ${
                    step.state === "done" ? "bg-success/40" : "bg-border"
                  }`}
                  style={{ minHeight: "28px" }}
                />
              )}
            </div>
            <div
              className={`flex flex-1 flex-col gap-0.5 pb-5 transition-opacity duration-200 ease-standard ${
                step.state === "pending" ? "opacity-60" : "opacity-100"
              }`}
            >
              <p
                className={`text-sm font-semibold leading-5 ${
                  step.state === "pending" ? "text-muted" : "text-ink"
                }`}
              >
                {step.title}
              </p>
              <p
                className={`text-xs leading-4 ${
                  step.state === "pending" ? "text-muted" : "text-subtext"
                }`}
              >
                {step.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function StepIcon({ state }: { state: DispatchStepState }) {
  if (state === "done") {
    return (
      <span className="flex size-6 items-center justify-center rounded-full bg-success/10 text-success">
        <CircleCheck aria-hidden className="size-5" strokeWidth={2} />
        <span className="sr-only">Completed</span>
      </span>
    );
  }
  if (state === "active") {
    return (
      <span className="relative flex size-6 items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-blue-100 animate-pulse"
        />
        <span className="relative flex size-6 items-center justify-center rounded-full bg-blue-50 text-primary">
          <Loader
            aria-hidden
            className="size-3.5 animate-spin"
            strokeWidth={2}
            style={{ animationDuration: "1.8s" }}
          />
        </span>
        <span className="sr-only">In progress</span>
      </span>
    );
  }
  return (
    <span className="flex size-6 items-center justify-center rounded-full bg-slate-100 text-muted">
      <Circle aria-hidden className="size-4" strokeWidth={1.75} />
      <span className="sr-only">Pending</span>
    </span>
  );
}
