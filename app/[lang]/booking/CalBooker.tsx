"use client";

import Cal, { getCalApi, type EmbedEvent } from "@calcom/embed-react";
import { useEffect } from "react";
import posthog from "posthog-js";

export function CalBooker({ calLink, serviceId }: { calLink: string; serviceId: string }) {
  const namespace = `book-${serviceId}`;

  useEffect(() => {
    let cancelled = false;
    let cal: Awaited<ReturnType<typeof getCalApi>> | null = null;
    const onBooked = (e: EmbedEvent<"bookingSuccessfulV2">) => {
      posthog.capture("lesson_booked", {
        service: serviceId,
        start_time: e.detail.data.startTime,
      });
    };

    getCalApi({ namespace }).then((api) => {
      if (cancelled) return;
      cal = api;
      api("ui", {
        theme: "dark",
        layout: "month_view",
        hideEventTypeDetails: true, // our page already shows name, duration, price
        cssVarsPerTheme: {
          light: { "cal-brand": "#c9a84c" },
          dark: { "cal-brand": "#c9a84c" },
        },
      });
      api("on", { action: "bookingSuccessfulV2", callback: onBooked });
    });

    // The namespace's Cal instance outlives this component, so a listener left
    // behind would fire twice after switching services back and forth.
    return () => {
      cancelled = true;
      cal?.("off", { action: "bookingSuccessfulV2", callback: onBooked });
    };
  }, [namespace, serviceId]);

  return (
    <Cal
      namespace={namespace}
      calLink={calLink}
      config={{ layout: "month_view", theme: "dark" }}
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    />
  );
}
