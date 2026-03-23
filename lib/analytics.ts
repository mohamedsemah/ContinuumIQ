type EventName =
  | "cta_click"
  | "form_submit"
  | "pricing_view"
  | "demo_request"
  | "get_started_click"
  | "language_switch"
  | "page_view"
  | "scroll_depth";

interface AnalyticsEvent {
  name: EventName;
  properties?: Record<string, string | number | boolean>;
}

export function trackEvent({ name, properties }: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  // Google Analytics 4
  if (typeof window.gtag === "function") {
    window.gtag("event", name, properties);
  }

  // Generic dataLayer push (GTM compatible)
  window.dataLayer?.push({
    event: name,
    ...properties,
  });

  // Console in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", name, properties);
  }
}

export function trackPageView(url: string, title: string) {
  trackEvent({
    name: "page_view",
    properties: { url, title },
  });
}

export function trackCTAClick(
  ctaType: "book_demo" | "get_started" | "talk_to_sales",
  location: string
) {
  trackEvent({
    name: "cta_click",
    properties: { cta_type: ctaType, location },
  });
}

export function trackFormSubmit(formName: string) {
  trackEvent({
    name: "form_submit",
    properties: { form_name: formName },
  });
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}
