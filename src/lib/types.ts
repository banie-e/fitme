export type Occasion = "work" | "date" | "weekend" | "travel";

export type Style = "minimal" | "casual" | "feminine" | "chic" | "classic";

export type OccasionTag = {
  id: Occasion;
  label: string;
  description: string;
};

export type StyleTag = {
  id: Style;
  label: string;
  description: string;
};

export type OutfitItems = {
  top?: string;
  bottom?: string;
  dress?: string;
  shoes?: string;
  bag?: string;
  accessory?: string;
};

export type Outfit = {
  id: string;
  title: string;
  /** The occasion/style this outfit's photo most represents. */
  primaryOccasion: Occasion;
  primaryStyle: Style;
  /** Reusable tags, always including the primary — max ~2-3 occasions, ~2 styles. */
  occasions: Occasion[];
  styles: Style[];
  description?: string;
  image: string;
  items: OutfitItems;
};

export type Preferences = {
  situations: string[];
  styles: string[];
  onboarded: boolean;
};
