"use client";

import Link from "next/link";
import { useAppState } from "@/lib/app-state";
import { trackEvent } from "@/lib/analytics";
import { OUTFITS, getOccasionLabel, getStyleLabel, matchScore } from "@/lib/data";
import { OutfitCard } from "@/components/outfit-card";
import { LoadingState } from "@/components/loading-state";

export default function HomePage() {
  const { ready, preferences } = useAppState();

  if (!ready) {
    return <LoadingState />;
  }

  if (!preferences.onboarded) {
    return (
      <div className="flex flex-col gap-8 py-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-primary">FITME</p>
          <h1 className="text-2xl font-bold leading-snug text-foreground">
            상황에 맞는 코디,
            <br />
            고민 없이 찾아보세요.
          </h1>
          <p className="text-sm leading-relaxed text-muted">
            출근, 데이트, 주말 약속까지. 상황과 스타일을 선택하면
            취향에 맞는 코디를 바로 추천해드려요.
          </p>
        </div>
        <Link
          href="/onboarding"
          onClick={() => trackEvent("Start Onboarding Clicked")}
          className="w-full rounded-full bg-primary py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          취향 설정 시작하기
        </Link>
      </div>
    );
  }

  const recommended = [...OUTFITS]
    .map((outfit) => ({
      outfit,
      score: matchScore(outfit, preferences.situations, preferences.styles),
    }))
    .sort((a, b) => b.score - a.score)
    .filter((entry) => entry.score > 0)
    .slice(0, 8)
    .map((entry) => entry.outfit);

  const fallback = recommended.length > 0 ? recommended : OUTFITS.slice(0, 8);

  return (
    <div className="flex flex-col gap-8 py-2">
      <section className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-primary">오늘의 추천</p>
        <h1 className="text-xl font-bold text-foreground">
          회원님의 취향에 맞는 코디예요
        </h1>
        <div className="flex flex-wrap gap-1.5">
          {preferences.situations.map((id) => (
            <span
              key={id}
              className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary"
            >
              #{getOccasionLabel(id)}
            </span>
          ))}
          {preferences.styles.map((id) => (
            <span
              key={id}
              className="rounded-full bg-background px-3 py-1 text-xs font-medium text-muted"
            >
              #{getStyleLabel(id)}
            </span>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-x-4 gap-y-6">
        {fallback.map((outfit) => (
          <OutfitCard key={outfit.id} outfit={outfit} />
        ))}
      </section>

      <Link
        href="/explore"
        onClick={() => trackEvent("Explore More Clicked", { from: "home" })}
        className="w-full rounded-full border border-border py-3 text-center text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
      >
        더 많은 코디 탐색하기
      </Link>
    </div>
  );
}
