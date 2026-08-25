"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const NAV_ITEMS = [
  { href: "/", label: "홈", icon: "⌂" },
  { href: "/explore", label: "탐색", icon: "⌕" },
  { href: "/collection", label: "찜", icon: "♥" },
  { href: "/mypage", label: "MY", icon: "☰" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-20 border-t border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto grid w-full max-w-md grid-cols-4">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() =>
                trackEvent("Bottom Nav Clicked", { label: item.label, href: item.href })
              }
              className={`flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                active ? "text-primary" : "text-muted"
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
