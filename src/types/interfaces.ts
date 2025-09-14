export interface SmallRecipeData {
  imgSrc: string;
  name: string;
  tags: tagData[];
  description: string;
  authorName: string;
  recipeDate: string;
  authorImg: string;
  id: number;
}

export function defaultSmallData(): SmallRecipeData {
  return {
    imgSrc: '/recipe-images/placeholder.webp',
    name: 'No name',
    tags: [],
    description: '',
    authorName: 'No Author',
    recipeDate: 'No Date',
    authorImg: '/authors/default-author.webp',
    id: -1,
  };
}

export interface tagData {
  tag: string;
  tagIconSrc?: string;
}

export interface MediumRecipeData extends SmallRecipeData, Directions {
  nutrition: Nutrition;
  ingredients: Ingredients;
  videoSrc?: string;
}

export function defaultMediumData(): MediumRecipeData {
  return {
    ...defaultSmallData(),
    nutrition: defaultNutrition,
    ingredients: {},
    videoSrc: undefined,
    steps: []
  };
}

export interface Ingredients {
  [category: string]: string[];
}

export interface Directions {
  steps: {
    stepTitle: string;
    description?: (string | { imgSrc: string; alt?: string })[];
  }[];
}

export interface CategoryCardData {
  category: string;
  color: string;
  imgSrc: string;
}

export interface Nutrition {
  calories: NutritionValue;
  fat: NutritionValue;
  protein: NutritionValue;
  carbohydrate: NutritionValue;
  cholesterol: NutritionValue;
}

export const defaultNutrition: Nutrition = {
  calories: { value: 0, name: '' },
  fat: { value: 0, name: '' },
  protein: { value: 0, name: '' },
  carbohydrate: { value: 0, name: '' },
  cholesterol: { value: 0, name: '' },
};

interface NutritionValue {
  value: number;
  name: string;
}

export type CardRouteMap = {
  smallCardInfo: SmallRecipeData;
  mediumCardInfo: MediumRecipeData;
};
