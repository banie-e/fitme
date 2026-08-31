import { trackEvent } from "./analytics";
import type { Outfit } from "./types";

export type RecommendationFeedback = "like" | "dislike";

export function createRecommendationFlowId(): string {
  return `flow_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function outfitContext(outfit: Outfit) {
  return {
    occasion: outfit.occasions[0],
    style: outfit.styles[0],
    outfit_id: outfit.id,
    outfit_title: outfit.title,
  };
}

function withFlowId<T extends Record<string, unknown>>(
  props: T,
  recommendationFlowId?: string | null
): T & { recommendation_flow_id?: string } {
  return recommendationFlowId
    ? { ...props, recommendation_flow_id: recommendationFlowId }
    : props;
}

export function trackOccasionSelected(occasion: string) {
  trackEvent("occasion_selected", { occasion });
}

export function trackStyleSelectorViewed(occasion: string) {
  trackEvent("style_selector_viewed", { occasion });
}

export function trackStyleSelected(
  occasion: string,
  style: string,
  recommendationFlowId: string
) {
  trackEvent("style_selected", withFlowId({ occasion, style }, recommendationFlowId));
}

export function trackRecommendationLoadingStarted(
  occasion: string,
  style: string,
  recommendationFlowId: string
) {
  trackEvent(
    "recommendation_loading_started",
    withFlowId({ occasion, style }, recommendationFlowId)
  );
}

export function trackRecommendationViewed(
  occasion: string,
  style: string,
  outfitCount: number,
  recommendationFlowId: string
) {
  trackEvent(
    "recommendation_viewed",
    withFlowId({ occasion, style, outfit_count: outfitCount }, recommendationFlowId)
  );
}

export function trackOutfitFavoriteToggled(
  outfit: Outfit,
  liked: boolean,
  recommendationFlowId?: string | null
) {
  trackEvent(
    liked ? "outfit_favorited" : "outfit_unfavorited",
    withFlowId(outfitContext(outfit), recommendationFlowId)
  );
}

export function trackRecommendationFeedbackSubmitted(
  occasion: string,
  style: string,
  feedback: RecommendationFeedback,
  outfitIds: string[],
  recommendationFlowId?: string | null
) {
  trackEvent(
    "recommendation_feedback_submitted",
    withFlowId(
      { occasion, style, feedback, outfit_ids: outfitIds },
      recommendationFlowId
    )
  );
}

export function trackRecommendationFeedbackRemoved(
  occasion: string,
  style: string,
  previousFeedback: RecommendationFeedback,
  outfitIds: string[],
  recommendationFlowId?: string | null
) {
  trackEvent(
    "recommendation_feedback_removed",
    withFlowId(
      { occasion, style, previous_feedback: previousFeedback, outfit_ids: outfitIds },
      recommendationFlowId
    )
  );
}

export function trackRetryClicked(
  occasion: string,
  style: string,
  recommendationFlowId?: string | null
) {
  trackEvent("retry_clicked", withFlowId({ occasion, style }, recommendationFlowId));
}
