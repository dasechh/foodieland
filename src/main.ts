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

    const recipeLikeBtn = cardElement.querySelector(
      ".recipe-like-btn"
    ) as HTMLElement;
    const likeSVG = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    likeSVG.setAttribute("width", "1.375rem");
    likeSVG.setAttribute("height", "1.125rem");
    likeSVG.setAttribute("viewBox", "0 0 22 18");
    likeSVG.setAttribute("fill", "none");
    likeSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    likeSVG.classList.add("like-svg");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    path.setAttribute(
      "d",
      "M15.5022 8.2786e-06C14.6291 -0.00149138 13.7677 0.200775 12.9865 0.590718C12.2052 0.980661 11.5258 1.54752 11.0022 2.24621C10.293 1.30266 9.30512 0.606001 8.17823 0.254824C7.05134 -0.0963541 5.84256 -0.0842713 4.72291 0.289363C3.60327 0.662997 2.62948 1.37926 1.93932 2.3368C1.24916 3.29434 0.877596 4.44467 0.877197 5.62501C0.877197 12.3621 10.2373 17.6813 10.6357 17.9044C10.7477 17.9671 10.8739 18 11.0022 18C11.1305 18 11.2567 17.9671 11.3687 17.9044C13.0902 16.8961 14.7059 15.7173 16.1914 14.3856C19.4665 11.438 21.1272 8.49047 21.1272 5.62501C21.1255 4.13368 20.5323 2.70393 19.4778 1.6494C18.4233 0.594873 16.9935 0.00169855 15.5022 8.2786e-06Z"
    );
    path.setAttribute("fill", "#DBE2E5");

    likeSVG.appendChild(path);
    recipeLikeBtn.appendChild(likeSVG);
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

const likeBtns = document.querySelectorAll(".recipe-like-btn");
likeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const likeSVG = btn.querySelector("svg") as SVGSVGElement;
    const path = likeSVG.querySelector("path") as SVGPathElement;

    const pathColor = getComputedStyle(path).fill;

    pathColor === "rgb(219, 226, 229)"
      ? (path.style.fill = "rgb(255, 99, 99)")
      : (path.style.fill = "rgb(219, 226, 229)");
  });
});
