"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  OCCASIONS,
  STYLES,
  getOccasionLabel,
  getStylePreviewImage,
  getStyleLabel,
  matchOutfits,
} from "@/lib/data";
import type { Occasion, Style } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";
import {
  createRecommendationFlowId,
  trackOccasionSelected,
  trackRecommendationLoadingStarted,
  trackRecommendationViewed,
  trackRetryClicked,
  trackStyleSelected,
  trackStyleSelectorViewed,
} from "@/lib/recommendation-events";
import { TagChip } from "./tag-chip";
import { StyleCard } from "./style-card";
import { StyleLoadingScreen } from "./style-loading-screen";
import { OutfitCard } from "./outfit-card";
import { RecommendationFeedback } from "./recommendation-feedback";

const RECOMMENDATION_LOADING_MS = 1800;

type Phase = "select" | "loading" | "result";

export function PreferenceSelector({
  initialSituations = [],
  initialStyles = [],
  submitLabel = "완료",
  onSubmit,
}: {
  initialSituations?: string[];
  initialStyles?: string[];
  submitLabel?: string;
  onSubmit: (situations: string[], styles: string[]) => void;
}) {
  const [situation, setSituation] = useState<string | null>(
    initialSituations[0] ?? null
  );
  const [style, setStyle] = useState<string | null>(initialStyles[0] ?? null);
  const [phase, setPhase] = useState<Phase>(
    initialSituations[0] && initialStyles[0] ? "result" : "select"
  );
  const [recommendationFlowId, setRecommendationFlowId] = useState<string | null>(
    null
  );
  const isTransitioningRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const viewedStyleSelectorForRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (situation && viewedStyleSelectorForRef.current !== situation) {
      viewedStyleSelectorForRef.current = situation;
      trackStyleSelectorViewed(situation);
    }
  }, [situation]);

  const matchedOutfits = useMemo(() => {
    if (!situation || !style) return [];
    return matchOutfits(situation as Occasion, style as Style).slice(0, 2);
  }, [situation, style]);

  function handleSelectStyle(styleId: string) {
    if (!situation || isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    const flowId = createRecommendationFlowId();
    setRecommendationFlowId(flowId);
    setStyle(styleId);
    setPhase("loading");
    trackStyleSelected(situation, styleId, flowId);
    trackRecommendationLoadingStarted(situation, styleId, flowId);
    timeoutRef.current = setTimeout(() => {
      setPhase("result");
      isTransitioningRef.current = false;
      const outfitCount = matchOutfits(
        situation as Occasion,
        styleId as Style
      ).slice(0, 2).length;
      trackRecommendationViewed(situation, styleId, outfitCount, flowId);
    }, RECOMMENDATION_LOADING_MS);
  }

  function handleRestart() {
    if (situation && style) {
      trackRetryClicked(situation, style, recommendationFlowId);
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    isTransitioningRef.current = false;
    setSituation(null);
    setStyle(null);
    setPhase("select");
    setRecommendationFlowId(null);
  }

  if (phase === "loading") {
    return <StyleLoadingScreen />;
  }

  if (phase === "result" && situation && style) {
    return (
      <div className="flex flex-col gap-6 animate-fade-in">
        <span className="w-fit rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary">
          {getOccasionLabel(situation)} · {getStyleLabel(style)}
        </span>
        <div>
          <h2 className="text-lg font-bold text-foreground">
            {getOccasionLabel(situation)}에 어울리는 {getStyleLabel(style)}{" "}
            코디를 골라봤어요.
          </h2>
          <p className="mt-1 text-sm text-muted">
            마음에 드는 코디에 하트를 눌러보세요.
          </p>
        </div>
        {matchedOutfits.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              {matchedOutfits.map((outfit) => (
                <OutfitCard
                  key={outfit.id}
                  outfit={outfit}
                  recommendationFlowId={recommendationFlowId}
                />
              ))}
            </div>
            <RecommendationFeedback
              key={recommendationFlowId}
              occasion={situation}
              style={style}
              outfitIds={matchedOutfits.map((outfit) => outfit.id)}
              recommendationFlowId={recommendationFlowId}
            />
          </>
        ) : (
          <p className="text-sm text-muted">
            조건에 맞는 코디를 준비 중이에요.
          </p>
        )}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              trackEvent("Preference Submit Clicked", {
                situation,
                style,
                label: submitLabel,
              });
              onSubmit([situation], [style]);
            }}
            className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {submitLabel}
          </button>
          <button
            type="button"
            onClick={handleRestart}
            className="w-full rounded-full border border-border py-3 text-sm font-semibold text-muted transition-colors hover:border-primary/40 hover:text-primary"
          >
            다시 골라보기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            어떤 상황의 코디가 필요하세요?
          </h2>
          <p className="mt-1 text-sm text-muted">하나를 선택해주세요.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((item) => (
            <TagChip
              key={item.id}
              label={item.label}
              active={situation === item.id}
              onClick={() => {
                const changed = situation !== item.id;
                setSituation(item.id);
                setStyle(null);
                if (changed) {
                  trackOccasionSelected(item.id);
                }
              }}
            />
          ))}
        </div>
      </section>

      {situation && (
        <section
          key={situation}
          className="flex flex-col gap-4 animate-fade-slide-up"
        >
          <div>
            <h2 className="text-base font-semibold text-foreground">
              선호하는 스타일은 무엇인가요?
            </h2>
            <p className="mt-1 text-sm text-muted">하나를 선택해주세요.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {STYLES.map((item) => (
              <StyleCard
                key={item.id}
                label={item.label}
                image={getStylePreviewImage(situation as Occasion, item.id)}
                active={style === item.id}
                onClick={() => handleSelectStyle(item.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
