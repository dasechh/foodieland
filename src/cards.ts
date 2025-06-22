import { createTag, createAdCard, randomizeArray } from "./utils.ts";

export async function displayCards(
  fileName: string,
  containerId: string,
  templateId: string,
  cardClass: string,
  imageClass: string,
  titleClass: string,
  tagsClass: string,
  numberOfCards: number,
  addCardClass?: string
) {
  try {
    const cardsData = await loadCardsData(fileName);
    const randomCardsData = randomizeArray(cardsData);
    const container = document.getElementById(containerId) as HTMLElement;

    randomCardsData.slice(0, numberOfCards).forEach((data, index) => {
      if (addCardClass && index % 5 === 0 && index !== 0) {
        const adCardElementContainer = createAdCard(addCardClass);
        container.appendChild(adCardElementContainer);
      }
      container.appendChild(
        createCard(
          data,
          templateId,
          cardClass,
          imageClass,
          titleClass,
          tagsClass
        )
      );
    });
  } catch (error) {
    console.error(error);
  }
}

async function loadCardsData(fileName: string) {
  const response = await fetch(fileName);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data as { imgSrc: string; name: string; tags: string[]; id: number }[];
}

function createCard(
  data: { imgSrc: string; name: string; tags: string[]; id: number },
  templateName: string,
  cardElementClass: string,
  cardImageClass: string,
  cardTitleClass: string,
  cardTagsClass: string
): HTMLElement {
  const recipeCardTemplate = document.getElementById(
    templateName
  ) as HTMLTemplateElement;
  const newCard = recipeCardTemplate.content.cloneNode(
    true
  ) as DocumentFragment;
  const cardElement = newCard.querySelector(
    `.${cardElementClass}`
  ) as HTMLElement;

  const cardImage = cardElement.querySelector(
    `.${cardImageClass}`
  ) as HTMLImageElement;
  cardImage.src = data.imgSrc;

  const cardTitle = cardElement.querySelector(
    `.${cardTitleClass}`
  ) as HTMLAnchorElement;
  cardTitle.textContent = data.name;
  cardTitle.href = `recipe-details.html?id=${data.id}`;

  const cardTags = cardElement.querySelector(
    `.${cardTagsClass}`
  ) as HTMLElement;
  data.tags.forEach((tag, index) => {
    const tagContainer = createTag(tag, index);
    cardTags.appendChild(tagContainer);
  });

  return cardElement;
}
