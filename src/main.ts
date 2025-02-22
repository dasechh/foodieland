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

const recipesRecommendationsImages: Array<{
  imgSrc: string;
  name: string;
  tags: string[];
  id: number;
}> = [
  {
    imgSrc: "/recipe-images/fruit_salad.jpg",
    name: "Mixed Tropical Fruit Salad with Superfood Boosts",
    tags: ["30 Minutes", "Healthy"],
    id: 1,
  },
  {
    imgSrc: "/recipe-images/beef_cheeseburger.jpg",
    name: "Big and Juicy Wagyu Beef Cheeseburger",
    tags: ["30 Minutes", "Western"],
    id: 2,
  },
  {
    imgSrc: "/recipe-images/fried_rice.jpg",
    name: "Healthy Japanese Fried Rice with Asparagus",
    tags: ["30 Minutes", "Healthy"],
    id: 3,
  },
  {
    imgSrc: "/recipe-images/taco_meat.jpg",
    name: "Cauliflower Walnut Vegetarian Taco Meat",
    tags: ["30 Minutes", "Eastern"],
    id: 4,
  },
  {
    imgSrc: "/recipe-images/chicken_salad.jpg",
    name: "Rainbow Chicken Salad with Almond Honey Mustard Dressing",
    tags: ["30 Minutes", "Healthy"],
    id: 5,
  },
  {
    imgSrc: "/recipe-images/spicy_sandwiches.jpg",
    name: "Barbeque Spicy Sandwiches with Chips ",
    tags: ["30 Minutes", "Snack"],
    id: 6,
  },
  {
    imgSrc: "/recipe-images/vegan_lettuce.jpg",
    name: "Firecracker Vegan Lettuce Wraps - Spicy! ",
    tags: ["30 Minutes", "Seafood"],
    id: 7,
  },
  {
    imgSrc: "/recipe-images/ramen_soup.jpg",
    name: "Chicken Ramen Soup with Mushroom ",
    tags: ["30 Minutes", "Japanese"],
    id: 8,
  },
];

const recipesFeedContainer = document.getElementsByClassName(
  "feed__cards"
)[0] as HTMLElement;
const recipeCardTemplate = document.getElementById(
  "feed-card-template"
) as HTMLTemplateElement;

recipesFeedImages.forEach((data) => {
  if (recipeCardTemplate) {
    const newCard = recipeCardTemplate.content.cloneNode(
      true
    ) as DocumentFragment;
    const cardElement = newCard.querySelector(".feed__card") as HTMLElement;

    const cardImage = cardElement.querySelector(
      ".card__image"
    ) as HTMLImageElement;
    cardImage.src = data.imgSrc;

    const cardTitle = cardElement.querySelector(".card__title") as HTMLElement;
    cardTitle.textContent = data.name;

    const cardTags = cardElement.querySelector(
      ".card__tags"
    ) as HTMLElement;
    data.tags.forEach((tag, index) => {
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

      cardTags.appendChild(tagContainer);
    });

    const elementCount = recipesFeedContainer.childElementCount as number;
    if (elementCount % 5 === 0 && elementCount !== 0) {

      const adCardElementContainer = document.createElement("a") as HTMLAnchorElement;
      adCardElementContainer.classList.add("feed__card-ad");
      adCardElementContainer.href = "#";

      const adCardElement = document.createElement("img") as HTMLImageElement;
      adCardElement.src = "/recipe-images/advertisement.jpg";

      adCardElementContainer.appendChild(adCardElement);
      recipesFeedContainer.appendChild(adCardElementContainer);}

    recipesFeedContainer.appendChild(cardElement);


  } else {
    throw new Error("Template not found");
  }
});

const recipesRecommendationsContainer = document.querySelector(
  ".recommendations__cards"
) as HTMLElement;

const recipeRecommendationTemplate = document.getElementById(
  "recommendations-card-template"
) as HTMLTemplateElement;

recipesRecommendationsImages.forEach((data) => {
  if (recipeRecommendationTemplate) {
    const newCard = recipeRecommendationTemplate.content.cloneNode(
      true
    ) as DocumentFragment;
    const cardElement = newCard.querySelector(".card") as HTMLElement;

    const cardImage = cardElement.querySelector(
      ".recommendations__card-image"
    ) as HTMLImageElement;
    cardImage.src = data.imgSrc;

    const cardTitle = cardElement.querySelector(".recommendations__card-title") as HTMLElement;
    cardTitle.textContent = data.name;

    const cardTags = cardElement.querySelector(
      ".recommendations__card-tags"
    ) as HTMLElement;
    data.tags.forEach((tag, index) => {
      const tagContainer = document.createElement("div");
      tagContainer.classList.add("recommendations__card-tag");

      const tagElement = document.createElement("span");
      tagElement.textContent = tag;
      tagElement.classList.add("recommendations__card-tag-text");

      const tagIcon = document.createElement("img");
      tagIcon.classList.add("icon");
      tagIcon.src =
        index === 0 ? "/icons/tags/Timer.svg" : "/icons/tags/ForkKnife.svg";

      tagContainer.appendChild(tagIcon);
      tagContainer.appendChild(tagElement);

      cardTags.appendChild(tagContainer);
    });

    recipesRecommendationsContainer.appendChild(cardElement);
  } else {
    throw new Error("Template not found");
  }
});

const cardsContainer = document.getElementsByClassName(
  "categories__line"
)[0] as HTMLElement;
const cardTemplate = document.getElementById(
  "category-card-template"
) as HTMLTemplateElement;

cardsData.forEach((data) => {
  if (cardTemplate) {
    const newCard = cardTemplate.content.cloneNode(true) as DocumentFragment;
    const cardElement = newCard.querySelector(".categories__card") as HTMLElement;

    (cardElement.querySelector(".categories__card-name") as HTMLElement).textContent =
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
