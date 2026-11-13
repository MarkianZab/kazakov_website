"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function CalBooker({ calLink, serviceId }: { calLink: string; serviceId: string }) {
  const namespace = `book-${serviceId}`;

  useEffect(() => {
    let cancelled = false;

    getCalApi({ namespace }).then((api) => {
      if (cancelled) return;
      api("ui", {
        theme: "dark",
        layout: "month_view",
        hideEventTypeDetails: true, // our page already shows name, duration, price
        cssVarsPerTheme: {
          light: { "cal-brand": "#c9a84c" },
          dark: { "cal-brand": "#c9a84c" },
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, [namespace]);

  return (
    <Cal
      namespace={namespace}
      calLink={calLink}
      config={{ layout: "month_view", theme: "dark" }}
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    />
  );
}
