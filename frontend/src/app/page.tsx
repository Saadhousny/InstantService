"use client";

import { AnalysisScreen } from "@/components/screens/AnalysisScreen";
import { DispatchScreen } from "@/components/screens/DispatchScreen";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { TierSelectionScreen } from "@/components/screens/TierSelectionScreen";
import { useBookingFlow } from "@/hooks/useBookingFlow";

export default function Home() {
  const flow = useBookingFlow();
  const { state } = flow;

  if (state.step === "analyzed" && state.analysis) {
    return <AnalysisScreen flow={flow} />;
  }

  if (
    (state.step === "tier_selected" || state.step === "dispatch_failed") &&
    state.analysis
  ) {
    return <TierSelectionScreen flow={flow} />;
  }

  if (
    state.step === "dispatching" ||
    state.step === "accepted" ||
    state.step === "voice_generating"
  ) {
    return <DispatchScreen flow={flow} />;
  }

  // confirmed and voice_failed are owned by ConfirmationScreen being built in
  // parallel. Until that lands, fall back to the home screen so the flow is
  // always recoverable.
  return <HomeScreen flow={flow} />;
}
