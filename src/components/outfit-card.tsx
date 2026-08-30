import Link from "next/link";
import type { Outfit } from "@/lib/types";
import { getOccasionLabel, getStyleLabel } from "@/lib/data";
import { OutfitVisual } from "./outfit-visual";
import { LikeButton } from "./like-button";
import { FeedbackButtons } from "./feedback-buttons";

export function OutfitCard({
  outfit,
  showFeedback = false,
  recommendationFlowId,
}: {
  outfit: Outfit;
  showFeedback?: boolean;
  recommendationFlowId?: string | null;
}) {
  return (
    <Link
      href={`/outfit/${outfit.id}`}
      className="group flex flex-col gap-3 rounded-2xl"
    >
      <div className="relative">
        <OutfitVisual outfit={outfit} />
        <div className="absolute right-3 top-3">
          <LikeButton
            outfit={outfit}
            size="sm"
            recommendationFlowId={recommendationFlowId}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5 px-0.5">
        <p className="text-sm font-semibold text-foreground">
          {outfit.title}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {outfit.occasions.slice(0, 1).map((id) => (
            <span
              key={`occasion-${id}`}
              className="rounded-full bg-primary-light px-2.5 py-0.5 text-xs text-primary"
            >
              #{getOccasionLabel(id)}
            </span>
          ))}
          {outfit.styles.slice(0, 1).map((id) => (
            <span
              key={`style-${id}`}
              className="rounded-full bg-background px-2.5 py-0.5 text-xs text-muted"
            >
              #{getStyleLabel(id)}
            </span>
          ))}
        </div>
        {showFeedback && (
          <FeedbackButtons
            outfit={outfit}
            recommendationFlowId={recommendationFlowId}
          />
        )}
      </div>
    </Link>
  );
}
