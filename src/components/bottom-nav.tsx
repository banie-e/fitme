"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, House, Menu, Search } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const NAV_ITEMS = [
  { href: "/", label: "홈", Icon: House },
  { href: "/explore", label: "탐색", Icon: Search },
  { href: "/collection", label: "찜", Icon: Heart },
  { href: "/mypage", label: "MY", Icon: Menu },
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
              <item.Icon className="h-7 w-7" strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
