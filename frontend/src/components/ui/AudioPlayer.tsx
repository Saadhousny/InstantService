"use client";

import { useEffect, useRef, useState } from "react";
import { CircleAlert, Pause, Play } from "lucide-react";

interface AudioPlayerProps {
  audioBase64: string | null;
  fallbackText: string;
  voiceStatus: string;
}

function base64ToBlobUrl(base64: string): string | null {
  try {
    const cleaned = base64.includes(",") ? base64.split(",").pop() ?? "" : base64;
    const binary = atob(cleaned);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "audio/mpeg" });
    return URL.createObjectURL(blob);
  } catch {
    return null;
  }
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function AudioPlayer({
  audioBase64,
  fallbackText,
  voiceStatus,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [decodeFailed, setDecodeFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const voiceSucceeded = voiceStatus === "generated" || voiceStatus === "success";
  const showAudio = voiceSucceeded && Boolean(audioBase64) && !decodeFailed;

  useEffect(() => {
    if (!voiceSucceeded || !audioBase64) {
      setAudioUrl(null);
      setDecodeFailed(false);
      return;
    }
    const url = base64ToBlobUrl(audioBase64);
    if (!url) {
      setAudioUrl(null);
      setDecodeFailed(true);
      return;
    }
    setDecodeFailed(false);
    setAudioUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [audioBase64, voiceSucceeded]);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [audioUrl]);

  function handlePlayPause() {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
    } else {
      el.pause();
    }
  }

  return (
    <section
      aria-label="Voice confirmation"
      className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink">Voice confirmation</p>
        <span className="text-xs font-medium text-muted">
          From Dispatch AI
        </span>
      </div>

      {showAudio && audioUrl ? (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause voice confirmation" : "Play voice confirmation"}
            aria-pressed={isPlaying}
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm transition-opacity duration-120 ease-standard hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            {isPlaying ? (
              <Pause aria-hidden className="size-5" strokeWidth={2} />
            ) : (
              <Play aria-hidden className="size-5 translate-x-px" strokeWidth={2} />
            )}
          </button>
          <div className="flex flex-1 flex-col gap-1.5">
            <div
              className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
              aria-hidden
            >
              <div
                className="h-full bg-primary transition-[width] duration-120 ease-standard"
                style={{
                  width:
                    duration > 0
                      ? `${Math.min(100, (currentTime / duration) * 100)}%`
                      : "0%",
                }}
              />
            </div>
            <div className="flex items-center justify-between text-xs font-medium text-muted">
              <span aria-label="Current time">{formatTime(currentTime)}</span>
              <span aria-label="Duration">{formatTime(duration)}</span>
            </div>
          </div>
          <audio
            ref={audioRef}
            src={audioUrl}
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              setIsPlaying(false);
              setCurrentTime(0);
            }}
            onTimeUpdate={(event) =>
              setCurrentTime(event.currentTarget.currentTime)
            }
            onLoadedMetadata={(event) => {
              const next = event.currentTarget.duration;
              setDuration(Number.isFinite(next) ? next : 0);
            }}
            className="hidden"
          />
        </div>
      ) : (
        <div
          role="status"
          className="flex items-start gap-2 rounded-md bg-slate-50 px-3 py-2 text-xs leading-4 text-muted"
        >
          {decodeFailed || (!voiceSucceeded && voiceStatus) ? (
            <CircleAlert
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-warning"
              strokeWidth={2}
            />
          ) : null}
          <span>
            {decodeFailed
              ? "Audio playback unavailable. Read the transcript below."
              : "Voice playback isn't available. The full message is in the transcript below."}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-1.5 border-t border-border pt-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Transcript
        </p>
        <p className="text-sm leading-5 text-subtext">{fallbackText}</p>
      </div>
    </section>
  );
}
