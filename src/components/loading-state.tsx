export function LoadingState() {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-light border-t-primary" />
      <p className="text-sm text-muted">어울리는 스타일을 찾고 있어요</p>
    </div>
  );
}
