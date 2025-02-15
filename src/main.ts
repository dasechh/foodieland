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

const recipesFeedImages: Array<{
  imgSrc: string;
  name: string;
  tags: string[];
  id: number;
}> = [
  {
    imgSrc: "/recipe-images/wagyu_beef.jpg",
    name: "Big and Juicy Wagyu Beef Cheeseburger",
    tags: ["30 Minutes", "Snack"],
    id: 1,
  },
  {
    imgSrc: "/recipe-images/roasted_salmon.jpg",
    name: "Fresh Lime Roasted Salmon with Ginger Sauce",
    tags: ["30 Minutes", "Fish"],
    id: 2,
  },
  {
    imgSrc: "/recipe-images/oatmeal_pancake.jpg",
    name: "Strawberry Oatmeal Pancake with Honey Syrup",
    tags: ["30 Minutes", "Breakfast"],
    id: 3,
  },
  {
    imgSrc: "/recipe-images/mayonnaise_salad.jpg",
    name: "Fresh and Healthy Mixed Mayonnaise Salad",
    tags: ["30 Minutes", "Healthy"],
    id: 4,
  },
  {
    imgSrc: "/recipe-images/chicken_meatballs.jpg",
    name: "Chicken Meatballs with Cream Cheese",
    tags: ["30 Minutes", "Meat"],
    id: 5,
  },
  {
    imgSrc: "/recipe-images/fruity_pancake.jpg",
    name: "Fruity Pancake with Orange & Blueberry",
    tags: ["30 Minutes", "Sweet"],
    id: 6,
  },
  {
    imgSrc: "/recipe-images/chicken_and_rice.jpg",
    name: "The Best Easy One Pot Chicken and Rice",
    tags: ["30 Minutes", "Snack"],
    id: 7,
  },
  {
    imgSrc: "/recipe-images/chicken_and_bacon_pasta.jpg",
    name: "The Creamiest Creamy Chicken and Bacon Pasta",
    tags: ["30 Minutes", "Noodles"],
    id: 8,
  },
];

const recipesFeedContainer = document.getElementsByClassName(
  "recipes-feed-cards"
)[0] as HTMLElement;
const recipeCardTemplate = document.getElementById(
  "recipe-card-template"
) as HTMLTemplateElement;

recipesFeedImages.forEach((data) => {
  if (recipeCardTemplate) {
    const newCard = recipeCardTemplate.content.cloneNode(
      true
    ) as DocumentFragment;
    const cardElement = newCard.querySelector(".recipe-card") as HTMLElement;

    const cardImage = cardElement.querySelector(
      ".recipe-img"
    ) as HTMLImageElement;
    cardImage.src = data.imgSrc;

    const cardTitle = cardElement.querySelector(".recipe-title") as HTMLElement;
    cardTitle.textContent = data.name;

    const cardTags = cardElement.querySelector(
      ".recipe-card-tags"
    ) as HTMLElement;
    data.tags.forEach((tag, index) => {
      const tagContainer = document.createElement("div");
      tagContainer.classList.add("recipe-card-tag");

      const tagElement = document.createElement("span");
      tagElement.textContent = tag;
      tagElement.classList.add("recipe-tag-text");

      const tagIcon = document.createElement("img");
      tagIcon.classList.add("icon");
      tagIcon.src =
        index === 0 ? "/icons/tags/Timer.svg" : "/icons/tags/ForkKnife.svg";

      tagContainer.appendChild(tagIcon);
      tagContainer.appendChild(tagElement);

      cardTags.appendChild(tagContainer);
    });

    recipesFeedContainer.appendChild(cardElement);
  } else {
    throw new Error("Template not found");
  }
});

const cardsContainer = document.getElementsByClassName(
  "category-card-line"
)[0] as HTMLElement;
const cardTemplate = document.getElementById(
  "category-card-template"
) as HTMLTemplateElement;

cardsData.forEach((data) => {
  if (cardTemplate) {
    const newCard = cardTemplate.content.cloneNode(true) as DocumentFragment;
    const cardElement = newCard.querySelector(".category-card") as HTMLElement;

    (cardElement.querySelector(".category-name") as HTMLElement).textContent =
      data.category;

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

document.querySelectorAll(".category-card").forEach((card) => {
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
