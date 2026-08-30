"use client";

import Image from "next/image";

export function StyleCard({
  label,
  image,
  active,
  onClick,
}: {
  label: string;
  image: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-2 rounded-2xl border p-2 text-center transition-colors ${
        active
          ? "border-primary bg-primary-light"
          : "border-border bg-surface hover:border-primary/40"
      }`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-background">
        <Image
          src={image}
          alt={label}
          fill
          sizes="120px"
          className="object-cover"
        />
      </div>
      <span
        className={`text-sm font-semibold ${
          active ? "text-primary" : "text-foreground"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
