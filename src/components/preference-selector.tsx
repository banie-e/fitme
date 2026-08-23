"use client";

import { useMemo, useState } from "react";
import { OUTFITS, SITUATIONS, STYLES } from "@/lib/data";
import { TagChip } from "./tag-chip";
import { OutfitCard } from "./outfit-card";

export function PreferenceSelector({
  initialSituations = [],
  initialStyles = [],
  submitLabel = "코디 저장",
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

  const matchedOutfits = useMemo(() => {
    if (!situation || !style) return [];
    return OUTFITS.filter(
      (outfit) =>
        outfit.situations.includes(situation) && outfit.styles.includes(style)
    ).slice(0, 2);
  }, [situation, style]);

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
          {SITUATIONS.map((item) => (
            <TagChip
              key={item.id}
              label={item.label}
              active={situation === item.id}
              onClick={() => {
                setSituation(item.id);
                setStyle(null);
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
          <div className="flex flex-wrap gap-2">
            {STYLES.map((item) => (
              <TagChip
                key={item.id}
                label={item.label}
                active={style === item.id}
                onClick={() => setStyle(item.id)}
              />
            ))}
          </div>
        </section>
      )}

      {situation && style && (
        <section
          key={`${situation}-${style}`}
          className="flex flex-col gap-4 animate-fade-slide-up"
        >
          <div>
            <h2 className="text-base font-semibold text-foreground">
              이런 코디는 어떠세요?
            </h2>
            <p className="mt-1 text-sm text-muted">
              선택한 상황과 스타일에 맞는 코디예요.
            </p>
          </div>
          {matchedOutfits.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              {matchedOutfits.map((outfit) => (
                <OutfitCard key={outfit.id} outfit={outfit} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">
              조건에 맞는 코디를 준비 중이에요.
            </p>
          )}
          <button
            type="button"
            onClick={() => onSubmit([situation], [style])}
            className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {submitLabel}
          </button>
        </section>
      )}
    </div>
  );
}
