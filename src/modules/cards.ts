import { createTag, createAdCard, randomizeArray } from "./utils.ts";

export async function displayCards(
  containerId: string,
  templateId: string,
  cardClass: string,
  imageClass: string,
  titleClass: string,
  tagsClass: string,
  numberOfCards: number,
  addCardClass?: string,
  cardSize: "small" | "large" = "small",
  cardDescriptionClass?: string,
  authorImageClass?: string,
  authorNameClass?: string,
  recipeDateClass?: string,
  tagContainerClass?: string
) {
  try {
    const cardsData = await loadCardsData();
    const randomCardsData = randomizeArray(cardsData);
    const container = document.getElementById(containerId) as
      | HTMLElement
      | HTMLUListElement;

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
          tagsClass,
          cardSize,
          cardDescriptionClass,
          authorImageClass,
          authorNameClass,
          recipeDateClass,
          tagContainerClass
        )
      );
    });
  } catch (error) {
    console.error(error);
  }
}

async function loadCardsData(cardSize: "small" | "large" = "large") {
  const response = await fetch("api/recipes");
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();

  if (cardSize === "small") {
    return data.map(
      ({
        imgSrc,
        name,
        tags,
        id,
      }: {
        imgSrc: string;
        name: string;
        tags: string[];
        id: number;
      }) => ({
        imgSrc,
        name,
        tags,
        id,
      })
    );
  } else {
    return data.map(
      ({
        imgSrc,
        name,
        tags,
        description,
        author,
        authorImg,
        date,
        id,
      }: {
        imgSrc: string;
        name: string;
        tags: string[];
        description: string;
        author: string;
        authorImg: string;
        date: string;
        id: number;
      }) => ({
        imgSrc,
        name,
        tags,
        description,
        author,
        authorImg,
        date,
        id,
      })
    );
  }
}

function createCard(
  data: any,
  templateName: string,
  cardElementClass: string,
  cardImageClass: string,
  cardTitleClass: string,
  cardTagsClass: string,
  cardSize: "small" | "large",
  cardDescriptionClass?: string,
  authorImageClass?: string,
  authorNameClass?: string,
  recipeDateClass?: string,
  tagContainerClass?: string
): HTMLElement {
  const CardTemplate = document.getElementById(
    templateName
  ) as HTMLTemplateElement;
  const newCard = CardTemplate.content.cloneNode(true) as DocumentFragment;
  const cardElement = newCard.querySelector(
    `.${cardElementClass}`
  ) as HTMLElement;
  cardElement.dataset.cardId = data.id.toString();

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
  data.tags.forEach((tag: string, index: number) => {
    const tagContainer = createTag(tag, index, tagContainerClass);
    cardTags.appendChild(tagContainer);
  });

  if (cardSize === "large") {
    const cardDescription = cardElement.querySelector(
      `.${cardDescriptionClass}`
    ) as HTMLParagraphElement;
    const authorImage = cardElement.querySelector(
      `.${authorImageClass}`
    ) as HTMLImageElement;
    const authorName = cardElement.querySelector(
      `.${authorNameClass}`
    ) as HTMLSpanElement;
    const recipeDate = cardElement.querySelector(
      `.${recipeDateClass}`
    ) as HTMLSpanElement;

    cardDescription.textContent = data.description || "";
    authorImage.src = data.authorImg || "";
    authorName.textContent = data.author || "";
    recipeDate.textContent = data.date || "";
  }

  return cardElement;
}
