import { Shirt } from "lucide-react";

export function StyleLoadingScreen() {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center animate-fade-in">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
        <Shirt className="h-8 w-8 animate-sway text-primary" strokeWidth={1.75} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-foreground">
          어울리는 스타일을 찾고 있어요
        </p>
        <p className="text-xs text-muted">잠시만 기다려주세요 :)</p>
      </div>
    </div>
  );
}
