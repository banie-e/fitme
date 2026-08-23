import Link from "next/link";
import { notFound } from "next/navigation";
import {
  OUTFITS,
  getOutfitById,
  getSituationLabel,
  getStyleLabel,
} from "@/lib/data";
import { OutfitVisual } from "@/components/outfit-visual";
import { LikeButton } from "@/components/like-button";
import { OutfitCard } from "@/components/outfit-card";

export function generateStaticParams() {
  return OUTFITS.map((outfit) => ({ id: outfit.id }));
}

export default async function OutfitDetailPage(
  props: PageProps<"/outfit/[id]">
) {
  const { id } = await props.params;
  const outfit = getOutfitById(id);

  if (!outfit) {
    notFound();
  }

  const related = OUTFITS.filter(
    (candidate) =>
      candidate.id !== outfit.id &&
      candidate.situations.some((s) => outfit.situations.includes(s))
  ).slice(0, 4);

  return (
    <div className="flex flex-col gap-6 py-2">
      <Link href="/explore" className="text-sm font-medium text-muted hover:text-primary">
        ← 목록으로
      </Link>

      <div className="relative">
        <OutfitVisual outfit={outfit} className="aspect-[4/5]" />
        <div className="absolute right-4 top-4">
          <LikeButton outfitId={outfit.id} />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          {outfit.situations.map((sid) => (
            <span
              key={sid}
              className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary"
            >
              #{getSituationLabel(sid)}
            </span>
          ))}
          {outfit.styles.map((sid) => (
            <span
              key={sid}
              className="rounded-full bg-background px-3 py-1 text-xs font-medium text-muted"
            >
              #{getStyleLabel(sid)}
            </span>
          ))}
        </div>
        <h1 className="text-xl font-bold text-foreground">{outfit.title}</h1>
        <p className="text-sm leading-relaxed text-muted">
          {outfit.description}
        </p>
      </div>

      <section className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold text-foreground">착장 구성</h2>
        <ul className="flex flex-col gap-2.5">
          {outfit.items.map((item) => (
            <li
              key={`${item.category}-${item.name}`}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-muted">{item.category}</span>
              <span className="font-medium text-foreground">{item.name}</span>
            </li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-foreground">
            같은 상황의 다른 코디
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {related.map((item) => (
              <OutfitCard key={item.id} outfit={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
