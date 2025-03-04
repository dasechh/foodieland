import "../styles.scss";

const cardsData: Array<{ category: string; color: string; imgSrc: string }> = [
  {
    category: "Breakfast",
    color: "#708246",
    imgSrc: "/icons/categories/image-onigiri.png",
  },
  {
    category: "Vegan",
    color: "#6CC63F",
    imgSrc: "/icons/categories/image-lettuce.png",
  },
  {
    category: "Meat",
    color: "#CC261B",
    imgSrc: "/icons/categories/image-meat.png",
  },
  {
    category: "Dessert",
    color: "#F09E00",
    imgSrc: "/icons/categories/image-dessert.png",
  },
  {
    category: "Lunch",
    color: "#000000",
    imgSrc: "/icons/categories/image-sandvich.png",
  },
  {
    category: "Chocolate",
    color: "#000000",
    imgSrc: "/icons/categories/image-chocolate.png",
  },
];

const cardsContainer = document.getElementById("categories") as HTMLElement;
const cardTemplate = document.getElementById(
  "category-card-template"
) as HTMLTemplateElement;

cardsData.forEach((data) => {
  if (cardTemplate) {
    const newCard = cardTemplate.content.cloneNode(true) as DocumentFragment;
    const cardElement = newCard.querySelector(
      ".categories__card"
    ) as HTMLElement;

    (
      cardElement.querySelector(".categories__card-name") as HTMLElement
    ).textContent = data.category;

    const emojiElement = cardElement.querySelector(
      ".emoji"
    ) as HTMLImageElement;
    emojiElement.src = data.imgSrc;
    emojiElement.alt = data.category;

    const blurredEmojiElement = cardElement.querySelector(
      ".blurred-emoji"
    ) as HTMLImageElement;
    blurredEmojiElement.src = data.imgSrc;

    cardElement.dataset.color = data.color;
    cardsContainer.appendChild(cardElement);
  } else {
    throw new Error("Template not found");
  }
});

document.querySelectorAll(".categories__card").forEach((card) => {
  const element = card as HTMLElement;
  const gradientColor: string | null = card.getAttribute("data-color");

  if (gradientColor === "#000000") {
    element.style.backgroundImage =
      "linear-gradient(180deg, #00000000 24%, #0000000D 100%)";
  } else if (!gradientColor) {
    throw new Error("Color not found");
  } else {
    element.style.backgroundImage = `linear-gradient(
            180deg,
            ${gradientColor}00 24%,
            ${gradientColor}1A 100%
        )`;
  }
});

function loadImages(fileName: string) {
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

function createTag(tag: string, index: number) {
  const tagContainer = document.createElement("div");
  tagContainer.classList.add("card__tag");

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

function createCard(
  data: {
    imgSrc: string;
    name: string;
    tags: string[];
  },
  templateName: string,
  cardElementClass: string,
  cardImageClass: string,
  cardTitleClass: string,
  cardTagsClass: string
): HTMLElement {
  const recipeCardTemplate = document.getElementById(
    `${templateName}`
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

async function displayCards(
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

displayCards(
  "/data/feed-images.json",
  "feed",
  "feed-card-template",
  "feed__card",
  "card__image",
  "card__title",
  "card__tags",
  "card__ad-image"
);
displayCards(
  "/data/recommendations-images.json",
  "recommendations",
  "recommendations-card-template",
  "recommendations__card",
  "recommendations__card-image",
  "recommendations__card-title",
  "recommendations__card-tags"
);
