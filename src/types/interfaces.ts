export interface smallCardData {
  imgSrc: string;
  name: string;
  tags: string[];
  id: number;
}
export interface largeCardData extends smallCardData {
  description: string;
  author: string;
  authorImg: string;
  date: string; 
}

export interface fullCardData extends largeCardData {
  nutrition: nutrition;
  largeDescription: string;
  ingredients: string[];
  steps: recipeStep[];
  videoSrc: string;
}

export interface categoryCardData {
  category: string;
  color: string;
  imgSrc: string;
}

interface nutrition {
  calories: nutritionValue;
  fat: nutritionValue;
  protein: nutritionValue;
  carbs: nutritionValue;
}

interface nutritionValue {
  name: string;
  value: number;
}
interface recipeStep {
  title: string;
  description: string;
  image?: string;
}

export interface displayCardsOptions {
  templateId: string;
  containerId: string;
  numberOfCards?: number;
  cardClass: string;
  adCardClass?: string;
  titleClass: string;
  imageClass?: string;
  requiredTags?: string[];
  requiredIDs?: number[];
  tagsClass?: string;
  tagContainerClass?: string;
  cardDescriptionClass?: string;
  largeDescriptionClass?: string;
  recipeDateClass?: string;
  authorImgClass?: string;
  authorNameClass?: string;
  videoClass?: string;
  ulContainerClass?: string;
}