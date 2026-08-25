"use client";

import { useState } from "react";
import { useAppState } from "@/lib/app-state";
import { trackEvent } from "@/lib/analytics";
import { PreferenceSelector } from "@/components/preference-selector";
import { LoadingState } from "@/components/loading-state";
import { getSituationLabel, getStyleLabel } from "@/lib/data";

export default function MyPage() {
  const { ready, preferences, likedIds, savePreferences } = useAppState();
  const [editing, setEditing] = useState(false);

  if (!ready) {
    return <LoadingState />;
  }

  if (!preferences.onboarded || editing) {
    return (
      <div className="flex flex-col gap-8 py-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-primary">취향 설정</p>
          <h1 className="text-xl font-bold text-foreground">
            취향을 다시 설정해보세요
          </h1>
        </div>
        <PreferenceSelector
          initialSituations={preferences.situations}
          initialStyles={preferences.styles}
          submitLabel="코디 저장"
          onSubmit={(situations, styles) => {
            savePreferences(situations, styles);
            setEditing(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 py-2">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-primary">마이페이지</p>
        <h1 className="text-xl font-bold text-foreground">내 취향</h1>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-surface p-4 text-center">
          <p className="text-2xl font-bold text-foreground">
            {likedIds.length}
          </p>
          <p className="mt-1 text-xs text-muted">찜한 코디</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-4 text-center">
          <p className="text-2xl font-bold text-foreground">
            {preferences.situations.length + preferences.styles.length}
          </p>
          <p className="mt-1 text-xs text-muted">설정한 취향 태그</p>
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground">선호 상황</h2>
        <div className="flex flex-wrap gap-2">
          {preferences.situations.map((id) => (
            <span
              key={id}
              className="rounded-full bg-primary-light px-3 py-1.5 text-xs font-medium text-primary"
            >
              {getSituationLabel(id)}
            </span>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground">선호 스타일</h2>
        <div className="flex flex-wrap gap-2">
          {preferences.styles.map((id) => (
            <span
              key={id}
              className="rounded-full bg-background px-3 py-1.5 text-xs font-medium text-muted"
            >
              {getStyleLabel(id)}
            </span>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={() => {
          trackEvent("Edit Preferences Clicked");
          setEditing(true);
        }}
        className="w-full rounded-full border border-border py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
      >
        취향 다시 설정하기
      </button>
    </div>
  );
}
