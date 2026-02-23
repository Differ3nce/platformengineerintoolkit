"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { getConsent, type ConsentValue } from "./CookieBanner";

export default function AnalyticsWrapper({
  consentSignal,
}: {
  consentSignal: ConsentValue;
}) {
  const [consent, setConsent] = useState<ConsentValue>(null);

  useEffect(() => {
    // On mount, read from localStorage (handles returning visitors)
    setConsent(getConsent());
  }, []);

  // When user makes a fresh decision, update immediately
  useEffect(() => {
    if (consentSignal !== null) {
      setConsent(consentSignal);
    }
  }, [consentSignal]);

  if (consent !== "granted") return null;

  return <Analytics />;
}
