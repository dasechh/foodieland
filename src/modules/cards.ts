import { createTag, createAdCard, randomizeArray } from "./utils.ts";
import {
  smallCardData,
  largeCardData,
  DisplayCardsOptions,
  CreateCardOptions,
} from "../types/interfaces.ts";

export async function displayCards(options: DisplayCardsOptions) {
  try {
    const cardsData = await loadCardsData(options.requiredTags);
    const randomCardsData = randomizeArray(cardsData);
    const container = document.getElementById(options.containerId) as
      | HTMLElement
      | HTMLUListElement;

    randomCardsData.slice(0, options.numberOfCards).forEach((data, index) => {
      if (options.addCardClass && index % 5 === 0 && index !== 0) {
        const adCardElementContainer = createAdCard(options.addCardClass);
        container.appendChild(adCardElementContainer);
      }
      container.appendChild(
        createCard(data, {
          templateName: options.templateId,
          cardClass: options.cardClass,
          imageClass: options.imageClass,
          titleClass: options.titleClass,
          tagsClass: options.tagsClass,
          cardDescriptionClass: options.cardDescriptionClass,
          authorImageClass: options.authorImageClass,
          authorNameClass: options.authorNameClass,
          recipeDateClass: options.recipeDateClass,
          tagContainerClass: options.tagContainerClass,
        })
      );
    });
  } catch (error) {
    console.error(error);
  }
}

async function loadCardsData(requiredTags: string[] = []) {
  const response = await fetch("api/recipes");
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();

  const filteredData = data.filter((item: any) => {
    if (requiredTags.length === 0) return true;
    return requiredTags.every((tag: string) => item.info_tags.includes(tag));
  });

  return filteredData as (smallCardData | largeCardData)[];
}

function createCard(
  data: smallCardData | largeCardData,
  options: CreateCardOptions
): HTMLElement {
  const CardTemplate = document.getElementById(
    options.templateName
  ) as HTMLTemplateElement;
  const newCard = CardTemplate.content.cloneNode(true) as DocumentFragment;
  const cardElement = newCard.querySelector(
    `.${options.cardClass}`
  ) as HTMLElement;
  if (cardElement) {
    cardElement.dataset.cardId = data.id.toString();
  }

  const cardImage = cardElement.querySelector(
    `.${options.imageClass}`
  ) as HTMLImageElement;
  if (cardImage) {
    cardImage.src = data.imgSrc;
  }

  const cardTitle = cardElement.querySelector(
    `.${options.titleClass}`
  ) as HTMLAnchorElement;
  if (cardTitle) {
    cardTitle.textContent = data.name;
    cardTitle.href = `recipe-details.html?id=${data.id}`;
  }

  const cardTags = cardElement.querySelector(
    `.${options.tagsClass}`
  ) as HTMLElement;

  if (cardTags) {
    const fragment = document.createDocumentFragment();
    data.tags.forEach((tag: string, index: number) => {
      const tagContainer = createTag(tag, index, options.tagContainerClass);
      fragment.appendChild(tagContainer);
    });
    cardTags.appendChild(fragment);
  }

  if (isLargeCardData(data)) {
    if (options.cardDescriptionClass) {
      const cardDescription = cardElement.querySelector(
        `.${options.cardDescriptionClass}`
      ) as HTMLParagraphElement;
      if (cardDescription) {
        cardDescription.textContent = data.description || "";
      }
    }

    if (options.authorImageClass) {
      const authorImage = cardElement.querySelector(
        `.${options.authorImageClass}`
      ) as HTMLImageElement;
      if (authorImage) {
        authorImage.src = data.authorImg || "";
      }
    }

    if (options.authorNameClass) {
      const authorName = cardElement.querySelector(
        `.${options.authorNameClass}`
      ) as HTMLSpanElement;
      if (authorName) {
        authorName.textContent = data.author || "";
      }
    }

    if (options.recipeDateClass) {
      const recipeDate = cardElement.querySelector(
        `.${options.recipeDateClass}`
      ) as HTMLSpanElement;
      if (recipeDate) {
        recipeDate.textContent = data.date || "";
      }
    }
  }
  return cardElement;
}

function isLargeCardData(
  data: smallCardData | largeCardData
): data is largeCardData {
  return (
    "description" in data &&
    "author" in data &&
    "authorImg" in data &&
    "date" in data
  );
}
