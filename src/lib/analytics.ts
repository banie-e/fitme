import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

let initialized = false;

export function initAnalytics() {
  if (initialized) return;
  if (!MIXPANEL_TOKEN) {
    console.warn(
      "NEXT_PUBLIC_MIXPANEL_TOKEN is not set — analytics events will be skipped."
    );
    return;
  }

  mixpanel.init(MIXPANEL_TOKEN, {
    persistence: "localStorage",
    // Pageviews are tracked manually via App Router navigation events instead.
    track_pageview: false,
  });
  initialized = true;
}

export function trackPageview(url: string) {
  if (!initialized) return;
  mixpanel.track("Page View", { url });
}

export function trackEvent(name: string, props?: Record<string, unknown>) {
  if (!initialized) return;
  mixpanel.track(name, props);
}
