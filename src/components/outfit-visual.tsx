import Image from "next/image";
import type { Outfit } from "@/lib/types";

export function OutfitVisual({
  outfit,
  className = "",
}: {
  outfit: Outfit;
  className?: string;
}) {
  return (
    <div
      className={`relative flex aspect-[3/4] w-full items-end overflow-hidden rounded-2xl bg-background ${className}`}
    >
      <Image
        src={outfit.image}
        alt={outfit.title}
        fill
        sizes="(min-width: 768px) 33vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 transition-colors group-hover:from-black/50" />
      <span className="relative z-10 line-clamp-2 p-4 text-sm font-semibold text-white drop-shadow-sm">
        {outfit.title}
      </span>
    </div>
  );
}
