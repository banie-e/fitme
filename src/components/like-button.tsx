"use client";

import { useAppState } from "@/lib/app-state";
import { trackEvent } from "@/lib/analytics";

export function LikeButton({
  outfitId,
  size = "md",
}: {
  outfitId: string;
  size?: "sm" | "md";
}) {
  const { isLiked, toggleLike } = useAppState();
  const liked = isLiked(outfitId);
  const dimension = size === "sm" ? "h-8 w-8 text-sm" : "h-11 w-11 text-lg";

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={liked ? "찜 해제" : "찜하기"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        trackEvent("Like Button Clicked", {
          outfit_id: outfitId,
          liked: !liked,
        });
        toggleLike(outfitId);
      }}
      className={`flex ${dimension} shrink-0 items-center justify-center rounded-full border bg-surface/90 transition-colors ${
        liked
          ? "border-primary/30 text-primary"
          : "border-border text-muted hover:border-primary/40 hover:text-primary"
      }`}
    >
      <span key={String(liked)} className="animate-heart-pop">
        {liked ? "♥" : "♡"}
      </span>
    </button>
  );
}
