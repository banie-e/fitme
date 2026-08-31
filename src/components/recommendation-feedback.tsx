"use client";

import { useEffect, useRef, useState } from "react";
import {
  trackRecommendationFeedbackRemoved,
  trackRecommendationFeedbackSubmitted,
  type RecommendationFeedback as Feedback,
} from "@/lib/recommendation-events";

export function RecommendationFeedback({
  occasion,
  style,
  outfitIds,
  recommendationFlowId,
}: {
  occasion: string;
  style: string;
  outfitIds: string[];
  recommendationFlowId?: string | null;
}) {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  function showToast(message: string) {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 1200);
  }

  function handleSelect(next: Feedback) {
    const previousFeedback = feedback;
    const nextFeedback: Feedback | null = previousFeedback === next ? null : next;
    setFeedback(nextFeedback);

    if (nextFeedback) {
      trackRecommendationFeedbackSubmitted(
        occasion,
        style,
        nextFeedback,
        outfitIds,
        recommendationFlowId
      );
    } else if (previousFeedback) {
      trackRecommendationFeedbackRemoved(
        occasion,
        style,
        previousFeedback,
        outfitIds,
        recommendationFlowId
      );
    }

    if (nextFeedback === "like") showToast("취향을 알려줘서 고마워요!");
    if (nextFeedback === "dislike") showToast("다음 추천에 참고할게요.");
  }

  const baseClass =
    "flex flex-1 items-center justify-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors";
  const activeClass = "border-primary bg-primary-light text-primary";
  const inactiveClass =
    "border-border bg-surface text-muted hover:border-primary/40 hover:text-primary";

  return (
    <div className="relative flex flex-col items-center gap-3 border-t border-border pt-6 text-center">
      <p className="text-sm font-medium text-foreground">
        추천 스타일이 취향에 맞았나요?
      </p>
      <div className="flex w-full max-w-xs gap-2">
        <button
          type="button"
          aria-pressed={feedback === "like"}
          onClick={() => handleSelect("like")}
          className={`${baseClass} ${feedback === "like" ? activeClass : inactiveClass}`}
        >
          <span aria-hidden="true">👍</span>
          좋아요
        </button>
        <button
          type="button"
          aria-pressed={feedback === "dislike"}
          onClick={() => handleSelect("dislike")}
          className={`${baseClass} ${feedback === "dislike" ? activeClass : inactiveClass}`}
        >
          <span aria-hidden="true">👎</span>
          별로예요
        </button>
      </div>
      {toastMessage && (
        <span className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4">
          <span className="animate-fade-in rounded-full bg-foreground/90 px-4 py-2 text-xs font-medium text-white">
            {toastMessage}
          </span>
        </span>
      )}
    </div>
  );
}
