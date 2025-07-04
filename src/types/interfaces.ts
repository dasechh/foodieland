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

interface BaseCardOptions {
  cardClass: string;
  imageClass: string;
  titleClass: string;
  tagsClass: string;
  cardDescriptionClass?: string;
  authorImageClass?: string;
  authorNameClass?: string;
  recipeDateClass?: string;
  tagContainerClass?: string;
}

export interface DisplayCardsOptions extends BaseCardOptions {
  containerId: string;
  templateId: string;
  numberOfCards: number;
  addCardClass?: string;
  requiredTags?: string[];
}

export interface CreateCardOptions extends BaseCardOptions {
  templateName: string;
}