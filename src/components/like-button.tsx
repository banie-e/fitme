"use client";

import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { useAppState } from "@/lib/app-state";
import type { Outfit } from "@/lib/types";
import { trackOutfitFavoriteToggled } from "@/lib/recommendation-events";

export function LikeButton({
  outfit,
  size = "md",
  recommendationFlowId,
}: {
  outfit: Outfit;
  size?: "sm" | "md";
  recommendationFlowId?: string | null;
}) {
  const { isLiked, toggleLike } = useAppState();
  const liked = isLiked(outfit.id);
  const dimension = size === "sm" ? "h-8 w-8" : "h-11 w-11";
  const iconDimension = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={liked ? "찜 해제" : "찜하기"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const nextLiked = !liked;
        toggleLike(outfit.id);
        trackOutfitFavoriteToggled(outfit, nextLiked, recommendationFlowId);

        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        setShowToast(true);
        toastTimeoutRef.current = setTimeout(() => {
          setShowToast(false);
        }, 1500);
      }}
      className={`relative flex ${dimension} shrink-0 items-center justify-center rounded-full border bg-surface/90 transition-colors ${
        liked
          ? "border-primary/30"
          : "border-border text-muted hover:border-primary/40 hover:text-primary"
      }`}
    >
      <Heart
        key={String(liked)}
        className={`${iconDimension} animate-heart-pop`}
        fill={liked ? "#B94A48" : "none"}
        stroke={liked ? "#B94A48" : "currentColor"}
        strokeWidth={1.75}
      />
      {showToast && (
        <span className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4">
          <span className="animate-fade-in rounded-full bg-foreground/90 px-4 py-2 text-xs font-medium text-white">
            {liked ? "찜한 코디에 추가했어요 ♥" : "찜한 코디에서 삭제했어요"}
          </span>
        </span>
      )}
    </button>
  );
}
