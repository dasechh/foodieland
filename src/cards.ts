import { createTag, createAdCard } from "./utils.ts";

export async function displayCards(
  fileName: string,
  containerId: string,
  templateId: string,
  cardClass: string,
  imageClass: string,
  titleClass: string,
  tagsClass: string,
  addCardClass?: string
) {
  try {
    const images = await loadImages(fileName);
    const container = document.getElementById(containerId) as HTMLElement;

    images.forEach((data, index) => {
      const cardElement = createCard(
        data,
        templateId,
        cardClass,
        imageClass,
        titleClass,
        tagsClass
      );

      if (addCardClass && index % 5 === 0 && index !== 0) {
        const adCardElementContainer = createAdCard(addCardClass);
        container.appendChild(adCardElementContainer);
      }

      container.appendChild(cardElement);
    });
  } catch (error) {
    console.error(error);
  }
}

async function loadImages(fileName: string) {
  return new Promise<
    { imgSrc: string; name: string; tags: string[]; id: number }[]
  >((resolve, reject) => {
    fetch(fileName)
      .then((response) => {
        if (!response.ok) {
          reject("Failed to fetch data");
          return;
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject("Error: " + error);
      });
  });
}

function createCard(
  data: { imgSrc: string; name: string; tags: string[] },
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
  ) as HTMLElement;
  cardTitle.textContent = data.name;

  const cardTags = cardElement.querySelector(
    `.${cardTagsClass}`
  ) as HTMLElement;
  data.tags.forEach((tag, index) => {
    const tagContainer = createTag(tag, index);
    cardTags.appendChild(tagContainer);
  });

  return cardElement;
}
