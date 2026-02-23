"use client";

import { useEffect, useState } from "react";
import { getConsent } from "./layout/CookieBanner";

export default function YoutubeEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setConsent(getConsent());
  }, []);

  // Auto-show if analytics consent was already granted
  const showVideo = consent === "granted" || accepted;

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-border shadow-card">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        {showVideo ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-muted px-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
              <path d="m10 15 5-3-5-3z" />
            </svg>
            <p className="text-sm text-muted-foreground">
              This video is hosted on YouTube and will set cookies when played.
            </p>
            <button
              onClick={() => setAccepted(true)}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Accept YouTube cookies &amp; play
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
