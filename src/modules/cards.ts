import {
  smallCardData,
  largeCardData,
  fullCardData,
  displayCardsOptions,
} from "../types/interfaces.ts";

export async function displayCards(options: displayCardsOptions) {
  try {
    const cardsData = await loadCardsData(
      options.requiredTags,
      options.requiredIDs
    );
    const randomCardsData = randomizeArray(cardsData);
    const container = document.getElementById(options.containerId) as
      | HTMLElement
      | HTMLUListElement;

    randomCardsData.slice(0, options.numberOfCards).forEach((data, index) => {
      if (options.adCardClass && index % 5 === 0 && index !== 0) {
        const adCardElementContainer = createAdCard(options.adCardClass);
        container.appendChild(adCardElementContainer);
      }
      container.appendChild(
        createCard(data, {
          templateId: options.templateId,
          cardClass: options.cardClass,
          titleClass: options.titleClass,
          imageClass: options.imageClass,
          tagsClass: options.tagsClass,
          tagContainerClass: options.tagContainerClass,
          cardDescriptionClass: options.cardDescriptionClass,
          largeDescriptionClass: options.largeDescriptionClass,
          recipeDateClass: options.recipeDateClass,
          containerId: options.containerId,
          numberOfCards: options.numberOfCards,
          adCardClass: options.adCardClass,
          requiredTags: options.requiredTags,
          requiredIDs: options.requiredIDs,
          authorImgClass: options.authorImgClass,
          authorNameClass: options.authorNameClass,
          videoClass: options.videoClass,
          ulContainerClass: options.ulContainerClass,
        })
      );
    });
  } catch (error) {
    console.error(error);
  }
}

async function loadCardsData(
  requiredTags: string[] = [],
  requiredIDs: number[] = []
) {
  const response = await fetch("api/recipes");
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();

  const filteredData = data.filter((item: any) => {
    const matchedTags =
      requiredTags.length === 0 ||
      requiredTags.every((tag) => item.tags?.includes(tag));
    const matchedIDs =
      requiredIDs.length === 0 ||
      requiredIDs.includes(item.id);
    return matchedTags && matchedIDs;
  });

  return filteredData as (smallCardData | largeCardData | fullCardData)[];
}

function createCard(
  data: smallCardData | largeCardData | fullCardData,
  options: displayCardsOptions
): HTMLElement {
  const CardTemplate = document.getElementById(
    options.templateId
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
    data.tags.slice(0, 2).forEach((tag: string, index: number) => {
      const tagContainer = createTag(tag, index, options.tagContainerClass);
      fragment.appendChild(tagContainer);
    });
    cardTags.appendChild(fragment);
  }

  const cardSize = determineCardSize(data);

  if ((cardSize === "full" || cardSize === "large") && "description" in data) {
    if (options.cardDescriptionClass) {
      const cardDescription = cardElement.querySelector(
        `.${options.cardDescriptionClass}`
      ) as HTMLParagraphElement;
      if (cardDescription) {
        cardDescription.textContent = data.description || "";
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

    if (options.largeDescriptionClass && 'largeDescription' in data) {
      const largeDescription = cardElement.querySelector(`.${options.largeDescriptionClass}`) as HTMLParagraphElement;
      if (largeDescription) {
        largeDescription.textContent = data.largeDescription || ""
      }
    }

    if (options.ulContainerClass && 'nutrition' in data) { 
     
      const ulContainer = cardElement.querySelector(`.${options.ulContainerClass}`) as HTMLUListElement;
      
      if (ulContainer) {
        const fragment = document.createDocumentFragment();
        Object.entries(data.nutrition).forEach(([key, { value, unit }]) => {
          const li = document.createElement('li');
          
          const liKey = document.createElement('span');
          liKey.textContent = key || '';
          li.appendChild(liKey)

          const liMeasure = document.createElement('span');
          liMeasure.textContent = `${value} ${unit}` || '';
          li.appendChild(liMeasure)
          
          fragment.appendChild(li)
          console.log(key, value, unit);
        });
        ulContainer.appendChild(fragment)
      }
    }

    if (options.videoClass && 'videoSrc' in data) {
      const video = cardElement.querySelector(`${options.videoClass}`) as HTMLVideoElement;
      if (video) {
        video.src = data.videoSrc || "";
      }
    }

    if (options.authorImgClass) {
      const authorImg = cardElement.querySelector(
        `.${options.authorImgClass}`
      ) as HTMLImageElement;
      if (authorImg) {
        authorImg.src = data.authorImg || "";
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
  }
  return cardElement;
}

function determineCardSize(data: smallCardData | largeCardData | fullCardData) {
  if ("calories" in data) {
    return "full";
  } else if ("description" in data) {
    return "large";
  } else {
    return "small";
  }
}

function createTag(tag: string, index: number, tagContainerClass?: string) {
  const tagContainer = document.createElement("a");

  if (tagContainerClass) tagContainer.classList.add(tagContainerClass);

  const tagElement = document.createElement("span");
  tagElement.textContent = tag;
  tagElement.classList.add("card__tag-text");

  const tagIcon = document.createElement("img");
  tagIcon.classList.add("icon");
  tagIcon.src =
    index === 0 ? "/icons/tags/Timer.svg" : "/icons/tags/ForkKnife.svg";

  tagContainer.appendChild(tagIcon);
  tagContainer.appendChild(tagElement);

  return tagContainer;
}

function createAdCard(adCardClass: string) {
  const adCardElementContainer = document.createElement(
    "a"
  ) as HTMLAnchorElement;
  adCardElementContainer.href = "#";

  const adCardElement = document.createElement("img") as HTMLImageElement;
  adCardElement.src = "/recipe-images/advertisement.jpg";
  adCardElement.classList.add(adCardClass);

  adCardElementContainer.appendChild(adCardElement);
  return adCardElementContainer;
}

function randomizeArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
