import { initAnalytics, trackPageview } from "@/lib/analytics";

initAnalytics();
trackPageview(window.location.pathname);

export function onRouterTransitionStart(url: string) {
  trackPageview(url);
}
