"use client";

import { useEffect, useRef, useState } from "react";
import type { Outfit } from "@/lib/types";
import {
  trackOutfitFeedbackRemoved,
  trackOutfitFeedbackSubmitted,
} from "@/lib/recommendation-events";

type Feedback = "like" | "dislike" | null;

export function FeedbackButtons({
  outfit,
  recommendationFlowId,
}: {
  outfit: Outfit;
  recommendationFlowId?: string | null;
}) {
  const [feedback, setFeedback] = useState<Feedback>(null);
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

  function handleSelect(next: "like" | "dislike") {
    const previousFeedback = feedback;
    const nextFeedback: Feedback = previousFeedback === next ? null : next;
    setFeedback(nextFeedback);

    if (nextFeedback) {
      trackOutfitFeedbackSubmitted(outfit, nextFeedback, recommendationFlowId);
    } else if (previousFeedback) {
      trackOutfitFeedbackRemoved(outfit, previousFeedback, recommendationFlowId);
    }

    if (nextFeedback === "like") showToast("취향을 알려줘서 고마워요!");
    if (nextFeedback === "dislike") showToast("다음 추천에 참고할게요.");
  }

  const baseClass =
    "flex flex-1 items-center justify-center gap-1 rounded-full border px-2 py-1.5 text-xs font-medium transition-colors";
  const activeClass = "border-primary bg-primary-light text-primary";
  const inactiveClass =
    "border-border bg-surface text-muted hover:border-primary/40 hover:text-primary";

  return (
    <div className="relative flex gap-2 pt-0.5">
      <button
        type="button"
        aria-pressed={feedback === "like"}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          handleSelect("like");
        }}
        className={`${baseClass} ${feedback === "like" ? activeClass : inactiveClass}`}
      >
        <span aria-hidden="true">👍</span>
        좋아요
      </button>
      <button
        type="button"
        aria-pressed={feedback === "dislike"}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          handleSelect("dislike");
        }}
        className={`${baseClass} ${feedback === "dislike" ? activeClass : inactiveClass}`}
      >
        <span aria-hidden="true">👎</span>
        별로예요
      </button>
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
