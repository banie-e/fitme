import type { Occasion, Outfit, OutfitItems, OccasionTag, Style, StyleTag } from "./types";

export const OCCASIONS: OccasionTag[] = [
  { id: "work", label: "출근", description: "단정하면서도 나다운 오피스룩" },
  { id: "date", label: "데이트", description: "설레는 자리를 위한 코디" },
  { id: "weekend", label: "주말 약속", description: "여유로운 주말을 위한 편안한 코디" },
  { id: "travel", label: "여행", description: "가볍게 떠나는 여행을 위한 코디" },
];

export const STYLES: StyleTag[] = [
  { id: "minimal", label: "미니멀", description: "군더더기 없는 깔끔한 무드" },
  { id: "casual", label: "캐주얼", description: "편안하고 자연스러운 무드" },
  { id: "feminine", label: "페미닌", description: "부드럽고 여성스러운 무드" },
  { id: "chic", label: "시크", description: "감각적이고 세련된 무드" },
  { id: "classic", label: "클래식", description: "단정하고 품위 있는 무드" },
];

export const OUTFIT_ITEM_ORDER: (keyof OutfitItems)[] = [
  "top",
  "bottom",
  "dress",
  "shoes",
  "bag",
  "accessory",
];

export const OUTFIT_ITEM_LABELS: Record<keyof OutfitItems, string> = {
  top: "상의",
  bottom: "하의",
  dress: "원피스",
  shoes: "신발",
  bag: "가방",
  accessory: "기타 액세서리",
};

type OutfitData = Omit<Outfit, "image">;

const OUTFIT_DATA: OutfitData[] = [
  {
    id: "work_minimal_1",
    title: "크림 니트 블랙 슬랙스룩",
    primaryOccasion: "work",
    primaryStyle: "minimal",
    occasions: ["work", "date"],
    styles: ["minimal", "classic"],
    description: "화이트 셔츠와 블랙 슬랙스로 완성한 군더더기 없는 출근룩.",
    items: {
      top: "크림 반팔 니트",
      bottom: "블랙 와이드 슬랙스",
      shoes: "블랙 플랫 슈즈",
      bag: "블랙 토트백",
    },
  },
  {
    id: "work_minimal_2",
    title: "그레이 셔츠 슬랙스룩",
    primaryOccasion: "work",
    primaryStyle: "minimal",
    occasions: ["work"],
    styles: ["minimal", "classic"],
    description: "라이트 그레이 셔츠와 블랙 팬츠로 차분하게 정돈한 출근룩.",
    items: {
      top: "라이트 그레이 셔츠",
      bottom: "라이트 그레이 와이드 슬랙스",
      shoes: "브라운 플랫 슈즈",
      bag: "블랙 숄더백",
    },
  },
  {
    id: "work_casual_1",
    title: "블루 셔츠 치노룩",
    primaryOccasion: "work",
    primaryStyle: "casual",
    occasions: ["work", "weekend", "travel"],
    styles: ["casual", "classic"],
    description: "톤온톤 그레이 세트업으로 편안하면서 정돈된 인상을 주는 코디.",
    items: {
      top: "라이트 블루 셔츠",
      bottom: "베이지 와이드 팬츠",
      shoes: "화이트 스니커즈",
      bag: "블랙 숄더백",
    },
  },
  {
    id: "work_casual_2",
    title: "크림 가디건 데님룩",
    primaryOccasion: "work",
    primaryStyle: "casual",
    occasions: ["work", "date", "weekend"],
    styles: ["casual", "classic"],
    description: "라이트 니트 가디건과 데님 팬츠로 편안하게 완성한 출근룩.",
    items: {
      top: "크림 라운드 가디건",
      bottom: "미드 블루 와이드 데님",
      shoes: "블랙 플랫 슈즈",
      bag: "블랙 토트백",
    },
  },
  {
    id: "work_feminine_1",
    title: "핑크 셔츠 스커트룩",
    primaryOccasion: "work",
    primaryStyle: "feminine",
    occasions: ["work", "date"],
    styles: ["feminine", "classic"],
    description: "베이지 톤 니트와 플리츠 스커트로 부드럽게 완성한 출근룩.",
    items: {
      top: "더스티 핑크 셔츠",
      bottom: "아이보리 A라인 롱 스커트",
      shoes: "아이보리 플랫 슈즈",
      bag: "아이보리 토트백",
    },
  },
  {
    id: "work_feminine_2",
    title: "리본 블라우스 스커트룩",
    primaryOccasion: "work",
    primaryStyle: "feminine",
    occasions: ["work", "date"],
    styles: ["feminine", "classic"],
    description: "프릴 블라우스와 H라인 스커트로 여성스럽게 완성한 출근룩.",
    items: {
      top: "아이보리 리본 블라우스",
      bottom: "뮤트 라벤더 롱 스커트",
      shoes: "아이보리 플랫 슈즈",
      bag: "아이보리 토트백",
    },
  },
  {
    id: "date_minimal_1",
    title: "아이보리 모노톤 룩",
    primaryOccasion: "date",
    primaryStyle: "minimal",
    occasions: ["date", "weekend"],
    styles: ["minimal", "classic"],
    description: "블랙 슬립 드레스에 자켓을 더해 세련되게 완성한 코디.",
    items: {
      top: "아이보리 브이넥 가디건",
      bottom: "화이트 와이드 팬츠",
      shoes: "블랙 플랫 슈즈",
      bag: "블랙 숄더백",
    },
  },
  {
    id: "date_minimal_2",
    title: "블랙 앤 크림 미니멀룩",
    primaryOccasion: "date",
    primaryStyle: "minimal",
    occasions: ["date", "weekend"],
    styles: ["minimal", "chic"],
    description: "화이트 셔츠와 블랙 슬랙스로 깔끔하게 연출한 데이트룩.",
    items: {
      top: "블랙 반팔 가디건",
      bottom: "크림 롱 스커트",
      shoes: "블랙 플랫 슈즈",
      bag: "블랙 숄더백",
    },
  },
  {
    id: "date_casual_1",
    title: "네이비 레이어드 캐주얼",
    primaryOccasion: "date",
    primaryStyle: "casual",
    occasions: ["date", "weekend", "travel"],
    styles: ["casual", "minimal"],
    description: "가볍게 걸치는 데님 원피스로 편안한 분위기를 살린 데이트룩.",
    items: {
      top: "네이비 스웨트셔츠 + 화이트 티셔츠",
      bottom: "화이트 와이드 팬츠",
      shoes: "블랙&화이트 스니커즈",
      bag: "베이지 토트백",
    },
  },
  {
    id: "date_casual_2",
    title: "핑크 셔츠 데님룩",
    primaryOccasion: "date",
    primaryStyle: "casual",
    occasions: ["date", "weekend", "travel"],
    styles: ["casual", "feminine"],
    description: "크롭 니트와 청바지로 편안하면서 산뜻하게 완성한 데이트룩.",
    items: {
      top: "라이트 핑크 셔츠",
      bottom: "라이트 블루 와이드 데님",
      shoes: "화이트 스니커즈",
      bag: "아이보리 숄더백",
    },
  },
  {
    id: "date_feminine_1",
    title: "플로럴 원피스 데이트룩",
    primaryOccasion: "date",
    primaryStyle: "feminine",
    occasions: ["date", "weekend"],
    styles: ["feminine", "classic"],
    description: "부드러운 실루엣의 화이트 원피스로 설레는 분위기를 연출.",
    items: {
      dress: "아이보리 플로럴 롱 원피스",
      shoes: "아이보리 메리제인 슈즈",
    },
  },
  {
    id: "date_feminine_2",
    title: "블랙 원피스 데이트룩",
    primaryOccasion: "date",
    primaryStyle: "feminine",
    occasions: ["date", "weekend"],
    styles: ["feminine", "chic"],
    description: "은은한 플로럴 원피스로 로맨틱한 무드를 더한 데이트룩.",
    items: {
      dress: "블랙 버튼 롱 원피스",
      shoes: "블랙 스트랩 샌들",
      bag: "블랙 토트백",
    },
  },
  {
    id: "weekend_minimal_1",
    title: "화이트 셔츠 데님룩",
    primaryOccasion: "weekend",
    primaryStyle: "minimal",
    occasions: ["weekend", "date"],
    styles: ["minimal", "casual"],
    description: "화이트 셔츠 하나로 완성하는 깔끔한 데일리룩.",
    items: {
      top: "화이트 오버핏 셔츠",
      bottom: "라이트 블루 와이드 데님",
      shoes: "화이트 스니커즈",
      bag: "블랙 숄더백",
    },
  },
  {
    id: "weekend_minimal_2",
    title: "블랙 셔츠 모노톤룩",
    primaryOccasion: "weekend",
    primaryStyle: "minimal",
    occasions: ["weekend", "date"],
    styles: ["minimal", "chic"],
    description: "올블랙 톤으로 어디서나 무난하게 소화하는 데일리룩.",
    items: {
      top: "블랙 셔츠",
      bottom: "화이트 와이드 팬츠",
      shoes: "블랙 로퍼",
      bag: "블랙 숄더백",
    },
  },
  {
    id: "weekend_casual_1",
    title: "스트라이프 하프팬츠룩",
    primaryOccasion: "weekend",
    primaryStyle: "casual",
    occasions: ["weekend", "travel"],
    styles: ["casual"],
    description: "베이직 맨투맨과 청바지로 완성한 부담 없는 데일리룩.",
    items: {
      top: "그린 스트라이프 긴팔 티셔츠",
      bottom: "베이지 버뮤다 팬츠",
      shoes: "화이트 스니커즈",
      bag: "아이보리 토트백",
    },
  },
  {
    id: "weekend_casual_2",
    title: "그래픽 티 카고룩",
    primaryOccasion: "weekend",
    primaryStyle: "casual",
    occasions: ["weekend", "travel"],
    styles: ["casual"],
    description: "후드 집업과 조거 팬츠로 활동적이고 편안하게 완성한 데일리룩.",
    items: {
      top: "화이트 그래픽 반팔 티셔츠",
      bottom: "블랙 와이드 카고 팬츠",
      shoes: "화이트&그레이 스니커즈",
      bag: "블랙 숄더백",
    },
  },
  {
    id: "weekend_feminine_1",
    title: "크림 가디건 스커트룩",
    primaryOccasion: "weekend",
    primaryStyle: "feminine",
    occasions: ["weekend", "date"],
    styles: ["feminine", "casual"],
    description: "포근한 리브 니트와 롱스커트로 부드럽게 완성한 데일리룩.",
    items: {
      top: "크림 반팔 가디건",
      bottom: "화이트 티어드 롱 스커트",
      shoes: "아이보리 플랫 슈즈",
      bag: "아이보리 토트백",
    },
  },
  {
    id: "weekend_feminine_2",
    title: "로즈 가디건 스커트룩",
    primaryOccasion: "weekend",
    primaryStyle: "feminine",
    occasions: ["weekend", "date"],
    styles: ["feminine"],
    description: "가벼운 슬립 드레스에 가디건을 더해 편안하게 완성한 데일리룩.",
    items: {
      top: "로즈 핑크 브이넥 가디건",
      bottom: "화이트 티어드 롱 스커트",
      shoes: "베이지 플랫 슈즈",
      bag: "아이보리 숄더백",
    },
  },
  {
    id: "travel_casual_1",
    title: "라이트 아우터 데님 여행룩",
    primaryOccasion: "travel",
    primaryStyle: "casual",
    occasions: ["travel", "weekend"],
    styles: ["casual", "minimal"],
    items: {
      top: "화이트 티셔츠 + 베이지 라이트 아우터",
      bottom: "라이트 블루 와이드 데님",
      shoes: "화이트 스니커즈",
      bag: "아이보리 토트백",
    },
  },
  {
    id: "travel_feminine_1",
    title: "세이지 스커트 여행룩",
    primaryOccasion: "travel",
    primaryStyle: "feminine",
    occasions: ["travel", "weekend"],
    styles: ["feminine", "casual"],
    items: {
      top: "아이보리 반팔 셔츠",
      bottom: "세이지 그린 롱 스커트",
      shoes: "화이트 스니커즈",
      bag: "베이지 크로스백",
    },
  },
  {
    id: "travel_chic_1",
    title: "블랙 앤 브라운 시크 여행룩",
    primaryOccasion: "travel",
    primaryStyle: "chic",
    occasions: ["travel", "date"],
    styles: ["chic", "minimal"],
    items: {
      top: "블랙 반팔 니트",
      bottom: "다크 브라운 와이드 슬랙스",
      shoes: "블랙 로퍼",
      bag: "블랙 숄더백",
    },
  },
  {
    id: "travel_classic_1",
    title: "블루 셔츠 클래식 여행룩",
    primaryOccasion: "travel",
    primaryStyle: "classic",
    occasions: ["travel", "work"],
    styles: ["classic", "minimal"],
    items: {
      top: "라이트 블루 셔츠",
      bottom: "아이보리 와이드 팬츠",
      accessory: "브라운 벨트",
      shoes: "브라운 로퍼",
      bag: "브라운 토트백",
    },
  },
  {
    id: "chic_1",
    title: "버건디 시크 슬랙스룩",
    primaryOccasion: "work",
    primaryStyle: "chic",
    occasions: ["work", "date"],
    styles: ["chic", "classic"],
    items: {
      top: "버건디 카라 가디건",
      bottom: "블랙 와이드 슬랙스",
      shoes: "블랙 포인티드 플랫 슈즈",
      bag: "블랙 토트백",
    },
  },
  {
    id: "classic_1",
    title: "아이보리 셔츠 네이비 스커트룩",
    primaryOccasion: "work",
    primaryStyle: "classic",
    occasions: ["work", "date"],
    styles: ["classic", "feminine"],
    items: {
      top: "아이보리 셔츠",
      bottom: "네이비 A라인 롱 스커트",
      shoes: "아이보리 로퍼",
      bag: "아이보리 토트백",
    },
  },
];

export const OUTFITS: Outfit[] = OUTFIT_DATA.map((outfit) => ({
  ...outfit,
  image: `/images/outfits/${outfit.id}.png`,
}));

export function getOutfitById(id: string): Outfit | undefined {
  return OUTFITS.find((outfit) => outfit.id === id);
}

export function getOccasionLabel(id: string): string {
  return OCCASIONS.find((o) => o.id === id)?.label ?? id;
}

export function getStyleLabel(id: string): string {
  return STYLES.find((s) => s.id === id)?.label ?? id;
}

export function matchScore(
  outfit: Outfit,
  occasions: string[],
  styles: string[]
): number {
  const occasionHits = outfit.occasions.filter((o) => occasions.includes(o)).length;
  const styleHits = outfit.styles.filter((s) => styles.includes(s)).length;
  return occasionHits * 2 + styleHits;
}

// --- Multi-tag recommendation matching with relevance-based fallback ---

const OCCASION_IDS = OCCASIONS.map((o) => o.id);
const STYLE_IDS = STYLES.map((s) => s.id);

function buildCooccurrence<T extends string>(
  ids: T[],
  pick: (outfit: Outfit) => T[]
): Record<T, Record<T, number>> {
  const matrix = {} as Record<T, Record<T, number>>;
  for (const id of ids) matrix[id] = {} as Record<T, number>;
  for (const outfit of OUTFITS) {
    const values = pick(outfit);
    for (const a of values) {
      for (const b of values) {
        if (a === b) continue;
        matrix[a][b] = (matrix[a][b] ?? 0) + 1;
      }
    }
  }
  return matrix;
}

const OCCASION_SIMILARITY = buildCooccurrence(OCCASION_IDS, (o) => o.occasions);
const STYLE_SIMILARITY = buildCooccurrence(STYLE_IDS, (o) => o.styles);

function rankBySimilarity<T extends string>(
  matrix: Record<T, Record<T, number>>,
  value: T,
  ids: T[]
): T[] {
  return ids
    .filter((id) => id !== value)
    .sort((a, b) => (matrix[value][b] ?? 0) - (matrix[value][a] ?? 0));
}

const MIN_RESULTS = 2;

/**
 * Priority: 1) primary occasion+style match (the outfit this combo was shot
 * for), 2) secondary occasion+style tag match, 3) occasion match + closest
 * style (by tag co-occurrence), 4) style match + closest occasion. Never
 * returns an outfit that matches neither the requested occasion nor style,
 * and never returns the same outfit twice.
 */
export function matchOutfits(occasion: Occasion, style: Style): Outfit[] {
  const results: Outfit[] = [];
  const seen = new Set<string>();

  function add(outfit: Outfit) {
    if (seen.has(outfit.id)) return;
    seen.add(outfit.id);
    results.push(outfit);
  }

  for (const outfit of OUTFITS) {
    if (outfit.primaryOccasion === occasion && outfit.primaryStyle === style) {
      add(outfit);
    }
  }

  if (results.length < MIN_RESULTS) {
    for (const outfit of OUTFITS) {
      if (outfit.occasions.includes(occasion) && outfit.styles.includes(style)) {
        add(outfit);
      }
    }
  }

  if (results.length < MIN_RESULTS) {
    for (const similarStyle of rankBySimilarity(STYLE_SIMILARITY, style, STYLE_IDS)) {
      if (results.length >= MIN_RESULTS) break;
      for (const outfit of OUTFITS) {
        if (results.length >= MIN_RESULTS) break;
        if (outfit.occasions.includes(occasion) && outfit.styles.includes(similarStyle)) {
          add(outfit);
        }
      }
    }
  }

  if (results.length < MIN_RESULTS) {
    for (const similarOccasion of rankBySimilarity(OCCASION_SIMILARITY, occasion, OCCASION_IDS)) {
      if (results.length >= MIN_RESULTS) break;
      for (const outfit of OUTFITS) {
        if (results.length >= MIN_RESULTS) break;
        if (outfit.styles.includes(style) && outfit.occasions.includes(similarOccasion)) {
          add(outfit);
        }
      }
    }
  }

  return results;
}

// --- Style-select screen preview images (occasion -> style -> outfit) ---
//
// This is a separate, explicit mapping from matchOutfits() (the recommendation
// results): each of the 5 style cards under a chosen occasion is filled from
// this table, never from a live filter, so the 5 images are guaranteed
// distinct within an occasion.
//
// One outfit can legitimately carry several style tags (e.g. an outfit
// tagged both "chic" and "classic"), so naively taking the first tag match
// per style can hand the same outfit to multiple style cards in the same
// occasion. buildStylePreviewMap() assigns each of the 5 styles a distinct
// outfit per occasion by walking styles in a fixed order and, for each,
// picking its best-matching outfit that no earlier style in that occasion
// has already claimed — preferring the outfit whose primaryOccasion/
// primaryStyle *is* this exact cell, so every outfit's dedicated combo
// (including all 6 newly added photos) surfaces on its own card.
function candidateOutfitsFor(occasion: Occasion, style: Style): Outfit[] {
  const primaryMatch: Outfit[] = [];
  const exact: Outfit[] = [];
  const styleOnly: Outfit[] = [];
  const occasionOnly: Outfit[] = [];
  const rest: Outfit[] = [];
  for (const outfit of OUTFITS) {
    const hasOccasion = outfit.occasions.includes(occasion);
    const hasStyle = outfit.styles.includes(style);
    if (outfit.primaryOccasion === occasion && outfit.primaryStyle === style) {
      primaryMatch.push(outfit);
    } else if (hasOccasion && hasStyle) exact.push(outfit);
    else if (hasStyle) styleOnly.push(outfit);
    else if (hasOccasion) occasionOnly.push(outfit);
    else rest.push(outfit);
  }
  return [...primaryMatch, ...exact, ...styleOnly, ...occasionOnly, ...rest];
}

function buildStylePreviewMap(): Record<Occasion, Record<Style, Outfit>> {
  const map = {} as Record<Occasion, Record<Style, Outfit>>;
  for (const occasion of OCCASION_IDS) {
    const used = new Set<string>();
    const styleMap = {} as Record<Style, Outfit>;
    for (const style of STYLE_IDS) {
      const candidates = candidateOutfitsFor(occasion, style);
      const chosen =
        candidates.find((outfit) => !used.has(outfit.id)) ??
        OUTFITS.find((outfit) => !used.has(outfit.id)) ??
        OUTFITS[0];
      used.add(chosen.id);
      styleMap[style] = chosen;
    }
    map[occasion] = styleMap;
  }
  return map;
}

const STYLE_PREVIEW_MAP = buildStylePreviewMap();

if (process.env.NODE_ENV !== "production") {
  for (const occasion of OCCASION_IDS) {
    const ids = STYLE_IDS.map((style) => STYLE_PREVIEW_MAP[occasion][style].id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicates.length > 0) {
      console.warn(
        `[data] Duplicate style preview image(s) for occasion "${occasion}":`,
        Array.from(new Set(duplicates))
      );
    }
  }
}

export function getStylePreviewImage(occasion: Occasion, style: Style): string {
  return STYLE_PREVIEW_MAP[occasion][style].image;
}
