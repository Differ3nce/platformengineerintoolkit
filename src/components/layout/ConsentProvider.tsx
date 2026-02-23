"use client";

import { useState } from "react";
import CookieBanner, { type ConsentValue } from "./CookieBanner";
import AnalyticsWrapper from "./AnalyticsWrapper";

export default function ConsentProvider() {
  const [consentSignal, setConsentSignal] = useState<ConsentValue>(null);

  return (
    <>
      <AnalyticsWrapper consentSignal={consentSignal} />
      <CookieBanner onConsent={setConsentSignal} />
    </>
  );
}
