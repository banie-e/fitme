import type { Outfit, Situation, StyleTag } from "./types";

export const SITUATIONS: Situation[] = [
  { id: "work", label: "출근", description: "단정하면서도 나다운 오피스룩" },
  { id: "date", label: "데이트", description: "설레는 자리를 위한 코디" },
  { id: "weekend", label: "주말 약속", description: "여유로운 주말을 위한 편안한 코디" },
];

export const STYLES: StyleTag[] = [
  { id: "minimal", label: "미니멀", description: "군더더기 없는 깔끔한 무드" },
  { id: "casual", label: "캐주얼", description: "편안하고 자연스러운 무드" },
  { id: "feminine", label: "페미닌", description: "부드럽고 여성스러운 무드" },
];

function outfitImage(situation: string, style: string, n: 1 | 2): string {
  return `/images/outfits/${situation}_${style}_${n}.png`;
}

export const OUTFITS: Outfit[] = [
  {
    id: "work_minimal_1",
    title: "크림 니트 블랙 슬랙스룩",
    situations: ["work"],
    styles: ["minimal"],
    description: "화이트 셔츠와 블랙 슬랙스로 완성한 군더더기 없는 출근룩.",
    image: outfitImage("work", "minimal", 1),
    items: [
      { category: "상의", name: "크림 반팔 니트" },
      { category: "하의", name: "블랙 와이드 슬랙스" },
      { category: "신발", name: "블랙 플랫 슈즈" },
      { category: "가방", name: "블랙 토트백" },
    ],
  },
  {
    id: "work_minimal_2",
    title: "그레이 셔츠 슬랙스룩",
    situations: ["work"],
    styles: ["minimal"],
    description: "라이트 그레이 셔츠와 블랙 팬츠로 차분하게 정돈한 출근룩.",
    image: outfitImage("work", "minimal", 2),
    items: [
      { category: "상의", name: "라이트 그레이 셔츠" },
      { category: "하의", name: "라이트 그레이 와이드 슬랙스" },
      { category: "신발", name: "브라운 플랫 슈즈" },
      { category: "가방", name: "블랙 숄더백" },
    ],
  },
  {
    id: "work_casual_1",
    title: "블루 셔츠 치노룩",
    situations: ["work"],
    styles: ["casual"],
    description: "톤온톤 그레이 세트업으로 편안하면서 정돈된 인상을 주는 코디.",
    image: outfitImage("work", "casual", 1),
    items: [
      { category: "상의", name: "라이트 블루 셔츠" },
      { category: "하의", name: "베이지 와이드 팬츠" },
      { category: "신발", name: "화이트 스니커즈" },
      { category: "가방", name: "블랙 숄더백" },
    ],
  },
  {
    id: "work_casual_2",
    title: "크림 가디건 데님룩",
    situations: ["work"],
    styles: ["casual"],
    description: "라이트 니트 가디건과 데님 팬츠로 편안하게 완성한 출근룩.",
    image: outfitImage("work", "casual", 2),
    items: [
      { category: "상의", name: "크림 라운드 가디건" },
      { category: "하의", name: "미드 블루 와이드 데님" },
      { category: "신발", name: "블랙 플랫 슈즈" },
      { category: "가방", name: "블랙 토트백" },
    ],
  },
  {
    id: "work_feminine_1",
    title: "핑크 셔츠 스커트룩",
    situations: ["work"],
    styles: ["feminine"],
    description: "베이지 톤 니트와 플리츠 스커트로 부드럽게 완성한 출근룩.",
    image: outfitImage("work", "feminine", 1),
    items: [
      { category: "상의", name: "더스티 핑크 셔츠" },
      { category: "하의", name: "아이보리 A라인 롱 스커트" },
      { category: "신발", name: "아이보리 플랫 슈즈" },
      { category: "가방", name: "아이보리 토트백" },
    ],
  },
  {
    id: "work_feminine_2",
    title: "리본 블라우스 스커트룩",
    situations: ["work"],
    styles: ["feminine"],
    description: "프릴 블라우스와 H라인 스커트로 여성스럽게 완성한 출근룩.",
    image: outfitImage("work", "feminine", 2),
    items: [
      { category: "상의", name: "아이보리 리본 블라우스" },
      { category: "하의", name: "뮤트 라벤더 롱 스커트" },
      { category: "신발", name: "아이보리 플랫 슈즈" },
      { category: "가방", name: "아이보리 토트백" },
    ],
  },
  {
    id: "date_minimal_1",
    title: "아이보리 모노톤 룩",
    situations: ["date"],
    styles: ["minimal"],
    description: "블랙 슬립 드레스에 자켓을 더해 세련되게 완성한 코디.",
    image: outfitImage("date", "minimal", 1),
    items: [
      { category: "상의", name: "아이보리 브이넥 가디건" },
      { category: "하의", name: "화이트 와이드 팬츠" },
      { category: "신발", name: "블랙 플랫 슈즈" },
      { category: "가방", name: "블랙 숄더백" },
    ],
  },
  {
    id: "date_minimal_2",
    title: "블랙 앤 크림 미니멀룩",
    situations: ["date"],
    styles: ["minimal"],
    description: "화이트 셔츠와 블랙 슬랙스로 깔끔하게 연출한 데이트룩.",
    image: outfitImage("date", "minimal", 2),
    items: [
      { category: "상의", name: "블랙 반팔 가디건" },
      { category: "하의", name: "크림 롱 스커트" },
      { category: "신발", name: "블랙 플랫 슈즈" },
      { category: "가방", name: "블랙 숄더백" },
    ],
  },
  {
    id: "date_casual_1",
    title: "네이비 레이어드 캐주얼",
    situations: ["date"],
    styles: ["casual"],
    description: "가볍게 걸치는 데님 원피스로 편안한 분위기를 살린 데이트룩.",
    image: outfitImage("date", "casual", 1),
    items: [
      { category: "상의", name: "네이비 스웨트셔츠 + 화이트 티셔츠" },
      { category: "하의", name: "화이트 와이드 팬츠" },
      { category: "신발", name: "블랙&화이트 스니커즈" },
      { category: "가방", name: "베이지 토트백" },
    ],
  },
  {
    id: "date_casual_2",
    title: "핑크 셔츠 데님룩",
    situations: ["date"],
    styles: ["casual"],
    description: "크롭 니트와 청바지로 편안하면서 산뜻하게 완성한 데이트룩.",
    image: outfitImage("date", "casual", 2),
    items: [
      { category: "상의", name: "라이트 핑크 셔츠" },
      { category: "하의", name: "라이트 블루 와이드 데님" },
      { category: "신발", name: "화이트 스니커즈" },
      { category: "가방", name: "아이보리 숄더백" },
    ],
  },
  {
    id: "date_feminine_1",
    title: "플로럴 원피스 데이트룩",
    situations: ["date"],
    styles: ["feminine"],
    description: "부드러운 실루엣의 화이트 원피스로 설레는 분위기를 연출.",
    image: outfitImage("date", "feminine", 1),
    items: [
      { category: "원피스", name: "아이보리 플로럴 롱 원피스" },
      { category: "신발", name: "아이보리 메리제인 슈즈" },
    ],
  },
  {
    id: "date_feminine_2",
    title: "블랙 원피스 데이트룩",
    situations: ["date"],
    styles: ["feminine"],
    description: "은은한 플로럴 원피스로 로맨틱한 무드를 더한 데이트룩.",
    image: outfitImage("date", "feminine", 2),
    items: [
      { category: "원피스", name: "블랙 버튼 롱 원피스" },
      { category: "신발", name: "블랙 스트랩 샌들" },
      { category: "가방", name: "블랙 토트백" },
    ],
  },
  {
    id: "casual_minimal_1",
    title: "화이트 셔츠 데님룩",
    situations: ["weekend"],
    styles: ["minimal"],
    description: "화이트 셔츠 하나로 완성하는 깔끔한 데일리룩.",
    image: outfitImage("weekend", "minimal", 1),
    items: [
      { category: "상의", name: "화이트 오버핏 셔츠" },
      { category: "하의", name: "라이트 블루 와이드 데님" },
      { category: "신발", name: "화이트 스니커즈" },
      { category: "가방", name: "블랙 숄더백" },
    ],
  },
  {
    id: "casual_minimal_2",
    title: "블랙 셔츠 모노톤룩",
    situations: ["weekend"],
    styles: ["minimal"],
    description: "올블랙 톤으로 어디서나 무난하게 소화하는 데일리룩.",
    image: outfitImage("weekend", "minimal", 2),
    items: [
      { category: "상의", name: "블랙 셔츠" },
      { category: "하의", name: "화이트 와이드 팬츠" },
      { category: "신발", name: "블랙 로퍼" },
      { category: "가방", name: "블랙 숄더백" },
    ],
  },
  {
    id: "casual_casual_1",
    title: "스트라이프 하프팬츠룩",
    situations: ["weekend"],
    styles: ["casual"],
    description: "베이직 맨투맨과 청바지로 완성한 부담 없는 데일리룩.",
    image: outfitImage("weekend", "casual", 1),
    items: [
      { category: "상의", name: "그린 스트라이프 긴팔 티셔츠" },
      { category: "하의", name: "베이지 버뮤다 팬츠" },
      { category: "신발", name: "화이트 스니커즈" },
      { category: "가방", name: "아이보리 토트백" },
    ],
  },
  {
    id: "casual_casual_2",
    title: "그래픽 티 카고룩",
    situations: ["weekend"],
    styles: ["casual"],
    description: "후드 집업과 조거 팬츠로 활동적이고 편안하게 완성한 데일리룩.",
    image: outfitImage("weekend", "casual", 2),
    items: [
      { category: "상의", name: "화이트 그래픽 반팔 티셔츠" },
      { category: "하의", name: "블랙 와이드 카고 팬츠" },
      { category: "신발", name: "화이트&그레이 스니커즈" },
      { category: "가방", name: "블랙 숄더백" },
    ],
  },
  {
    id: "casual_feminine_1",
    title: "크림 가디건 스커트룩",
    situations: ["weekend"],
    styles: ["feminine"],
    description: "포근한 리브 니트와 롱스커트로 부드럽게 완성한 데일리룩.",
    image: outfitImage("weekend", "feminine", 1),
    items: [
      { category: "상의", name: "크림 반팔 가디건" },
      { category: "하의", name: "화이트 티어드 롱 스커트" },
      { category: "신발", name: "아이보리 플랫 슈즈" },
      { category: "가방", name: "아이보리 토트백" },
    ],
  },
  {
    id: "casual_feminine_2",
    title: "로즈 가디건 스커트룩",
    situations: ["weekend"],
    styles: ["feminine"],
    description: "가벼운 슬립 드레스에 가디건을 더해 편안하게 완성한 데일리룩.",
    image: outfitImage("weekend", "feminine", 2),
    items: [
      { category: "상의", name: "로즈 핑크 브이넥 가디건" },
      { category: "하의", name: "화이트 티어드 롱 스커트" },
      { category: "신발", name: "베이지 플랫 슈즈" },
      { category: "가방", name: "아이보리 숄더백" },
    ],
  },
];

export function getOutfitById(id: string): Outfit | undefined {
  return OUTFITS.find((outfit) => outfit.id === id);
}

export function getSituationLabel(id: string): string {
  return SITUATIONS.find((s) => s.id === id)?.label ?? id;
}

export function getStyleLabel(id: string): string {
  return STYLES.find((s) => s.id === id)?.label ?? id;
}

export function matchScore(
  outfit: Outfit,
  situations: string[],
  styles: string[]
): number {
  const situationHits = outfit.situations.filter((s) =>
    situations.includes(s)
  ).length;
  const styleHits = outfit.styles.filter((s) => styles.includes(s)).length;
  return situationHits * 2 + styleHits;
}
