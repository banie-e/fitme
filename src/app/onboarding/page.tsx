"use client";

import { useRouter } from "next/navigation";
import { useAppState } from "@/lib/app-state";
import { PreferenceSelector } from "@/components/preference-selector";

export default function OnboardingPage() {
  const router = useRouter();
  const { savePreferences } = useAppState();

  return (
    <div className="flex flex-col gap-8 py-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-primary">취향 설정</p>
        <h1 className="text-xl font-bold text-foreground">
          상황과 스타일을 알려주세요
        </h1>
        <p className="text-sm text-muted">
          선택한 취향을 바탕으로 맞춤 코디를 추천해드려요. 마이페이지에서
          언제든 다시 설정할 수 있어요.
        </p>
      </div>
      <PreferenceSelector
        submitLabel="완료"
        onSubmit={(situations, styles) => {
          savePreferences(situations, styles);
          router.push("/");
        }}
      />
    </div>
  );
}
