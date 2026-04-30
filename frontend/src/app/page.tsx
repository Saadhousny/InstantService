"use client";

import { AnalysisScreen } from "@/components/screens/AnalysisScreen";
import { ConfirmationScreen } from "@/components/screens/ConfirmationScreen";
import { DispatchScreen } from "@/components/screens/DispatchScreen";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { TierSelectionScreen } from "@/components/screens/TierSelectionScreen";
import { useBookingFlow } from "@/hooks/useBookingFlow";

export default function Home() {
  const flow = useBookingFlow();
  const { state } = flow;

  switch (state.step) {
    case "analyzed":
      // Defensive: if analysis somehow missing, fall back to home so the user
      // can re-enter the request rather than seeing an empty screen.
      return state.analysis ? (
        <AnalysisScreen flow={flow} />
      ) : (
        <HomeScreen flow={flow} />
      );

    case "tier_selected":
    case "dispatch_failed":
      return state.analysis ? (
        <TierSelectionScreen flow={flow} />
      ) : (
        <HomeScreen flow={flow} />
      );

    case "dispatching":
    case "accepted":
    case "voice_generating":
      return <DispatchScreen flow={flow} />;

    case "confirmed":
    case "voice_failed":
      // voice_failed is reachable in the type even though the reducer collapses
      // failed voice into `confirmed`; route both to the same screen.
      return state.dispatchResult ? (
        <ConfirmationScreen flow={flow} />
      ) : (
        <HomeScreen flow={flow} />
      );

    case "idle":
    case "analyzing":
    case "analyzing_failed":
    default:
      return <HomeScreen flow={flow} />;
  }
}
