export type Situation = {
  id: string;
  label: string;
  description: string;
};

export type StyleTag = {
  id: string;
  label: string;
  description: string;
};

export type OutfitItem = {
  category: string;
  name: string;
};

export type Outfit = {
  id: string;
  title: string;
  situations: string[];
  styles: string[];
  description: string;
  image: string;
  items: OutfitItem[];
};

export type Preferences = {
  situations: string[];
  styles: string[];
  onboarded: boolean;
};
