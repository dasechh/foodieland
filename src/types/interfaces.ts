export interface SmallCardData {
  imgSrc: string;
  name: string;
  tags: tagData[];
  id: number;
}

interface tagData {
  tag: string;
  tagIconSrc?: string;
}

export interface LargeCardData extends SmallCardData {
  description: string;
  authorName: string;
  authorImg: string;
  recipeDate: string;
}

export interface FullCardData extends LargeCardData {
  nutrition: Nutrition;
  largeDescription: string;
  ingredients: string[];
  steps: recipeStep[];
}

export interface CategoryCardData {
  category: string;
  color: string;
  imgSrc: string;
}

export interface AuthorCardData {
  authorName: string;
  recipeDate: string;
  authorImg: string;
}

interface NutritionValue {
  value: number;
  name: string;
}

export interface Nutrition {
  calories: NutritionValue;
  fat: NutritionValue;
  protein: NutritionValue;
  carbohydrate: NutritionValue;
  cholesterol: NutritionValue;
}

interface recipeStep {
  title: string;
  description: string;
  image?: string;
}
