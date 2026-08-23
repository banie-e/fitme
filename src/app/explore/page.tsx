"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { OUTFITS, SITUATIONS, STYLES } from "@/lib/data";
import { TagChip } from "@/components/tag-chip";
import { OutfitCard } from "@/components/outfit-card";

function toggle(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialSituation = searchParams.get("situation");

  const [situations, setSituations] = useState<string[]>(
    initialSituation ? [initialSituation] : []
  );
  const [styles, setStyles] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return OUTFITS.filter((outfit) => {
      const situationMatch =
        situations.length === 0 ||
        outfit.situations.some((id) => situations.includes(id));
      const styleMatch =
        styles.length === 0 || outfit.styles.some((id) => styles.includes(id));
      return situationMatch && styleMatch;
    });
  }, [situations, styles]);

  return (
    <div className="flex flex-col gap-6 py-2">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-primary">코디 탐색</p>
        <h1 className="text-xl font-bold text-foreground">
          상황과 스타일로 찾아보세요
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        <div className="scrollbar-none flex gap-2 overflow-x-auto">
          {SITUATIONS.map((situation) => (
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

      <p className="text-xs text-muted">총 {filtered.length}개의 코디</p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-sm font-medium text-foreground">
            조건에 맞는 코디가 없어요
          </p>
          <p className="text-xs text-muted">
            다른 상황이나 스타일을 선택해보세요.
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

export default function ExplorePage() {
  return (
    <Suspense fallback={null}>
      <ExploreContent />
    </Suspense>
  );
}
