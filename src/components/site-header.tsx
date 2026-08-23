import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-md items-center justify-between px-5">
        <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
          FITME
        </Link>
        <Link
          href="/mypage"
          className="text-sm font-medium text-muted hover:text-primary"
        >
          마이페이지
        </Link>
      </div>
    </header>
  );
}
