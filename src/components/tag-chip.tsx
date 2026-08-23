"use client";

type TagChipProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
};

export function TagChip({
  label,
  active = false,
  onClick,
  size = "md",
}: TagChipProps) {
  const sizeClasses =
    size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border ${sizeClasses} font-medium transition-colors ${
        active
          ? "border-primary bg-primary-light text-primary"
          : "border-border bg-surface text-foreground hover:border-primary/40 hover:bg-primary-light"
      }`}
    >
      {label}
    </button>
  );
}
