"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAppState } from "@/lib/app-state";
import { trackEvent } from "@/lib/analytics";
import { OCCASIONS, OUTFITS, STYLES } from "@/lib/data";
import { TagChip } from "@/components/tag-chip";
import { OutfitCard } from "@/components/outfit-card";
import { LoadingState } from "@/components/loading-state";

function toggle(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

export default function CollectionPage() {
  const { ready, likedIds } = useAppState();
  const [situations, setSituations] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);

  const likedOutfits = useMemo(
    () => OUTFITS.filter((outfit) => likedIds.includes(outfit.id)),
    [likedIds]
  );

  const filtered = useMemo(() => {
    return likedOutfits.filter((outfit) => {
      const situationMatch =
        situations.length === 0 ||
        outfit.occasions.some((id) => situations.includes(id));
      const styleMatch =
        styles.length === 0 || outfit.styles.some((id) => styles.includes(id));
      return situationMatch && styleMatch;
    });
  }, [likedOutfits, situations, styles]);

  if (!ready) {
    return <LoadingState />;
  }

  if (likedOutfits.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-sm font-semibold text-foreground">
          아직 찜한 코디가 없어요
        </p>
        <p className="text-xs text-muted">
          마음에 드는 코디를 찜하면 여기에 모아볼 수 있어요.
        </p>
        <Link
          href="/explore"
          onClick={() => trackEvent("Explore More Clicked", { from: "collection_empty" })}
          className="mt-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          코디 탐색하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-2">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-primary">내 컬렉션</p>
        <h1 className="text-xl font-bold text-foreground">
          찜한 코디 {likedOutfits.length}개
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        <div className="scrollbar-none flex gap-2 overflow-x-auto">
          {OCCASIONS.map((situation) => (
            <TagChip
              key={situation.id}
              label={situation.label}
              size="sm"
              active={situations.includes(situation.id)}
              onClick={() => setSituations((prev) => toggle(prev, situation.id))}
            />
          ))}
        </div>
        <div className="scrollbar-none flex gap-2 overflow-x-auto">
          {STYLES.map((style) => (
            <TagChip
              key={style.id}
              label={style.label}
              size="sm"
              active={styles.includes(style.id)}
              onClick={() => setStyles((prev) => toggle(prev, style.id))}
            />
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-sm font-medium text-foreground">
            조건에 맞는 찜한 코디가 없어요
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {filtered.map((outfit) => (
            <OutfitCard key={outfit.id} outfit={outfit} />
          ))}
        </div>
      )}
    </div>
  );
}
