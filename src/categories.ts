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
  {
    category: "Pasta",
    color: "#F4A300",
    imgSrc: "/icons/categories/spaghetti_1f35d.png",
  },
  {
    category: "Salads",
    color: "#62C752",
    imgSrc: "/icons/categories/green-salad_1f957.png",
  },
  {
    category: "Pizza",
    color: "#FF6F61",
    imgSrc: "/icons/categories/pizza_1f355.png",
  },
  {
    category: "Seafood",
    color: "#1D5E6C",
    imgSrc: "/icons/categories/lobster_1f99e.png",
  },
  {
    category: "Soup",
    color: "#F2A8B6",
    imgSrc: "/icons/categories/pot-of-food_1f372.png",
  },
  {
    category: "Beverage",
    color: "#00B4B4",
    imgSrc: "/icons/categories/teacup-without-handle_1f375.png",
  },
];

function createCategoryCard(data: {
  category: string;
  color: string;
  imgSrc: string;
}) {
  const cardTemplate = document.getElementById(
    "category-card-template"
  ) as HTMLTemplateElement;
  const newCard = cardTemplate.content.cloneNode(true) as DocumentFragment;
  const cardElement = newCard.querySelector(
    ".categories__card"
  ) as HTMLAnchorElement;

  (
    cardElement.querySelector(".categories__card-name") as HTMLElement
  ).textContent = data.category;

  cardElement.style.backgroundImage = data.imgSrc;

  const emojiElement = cardElement.querySelector(".emoji") as HTMLImageElement;
  emojiElement.src = data.imgSrc;
  emojiElement.alt = data.category;

  const blurredEmojiElement = cardElement.querySelector(
    ".blurred-emoji"
  ) as HTMLImageElement;
  blurredEmojiElement.src = data.imgSrc;

  cardElement.dataset.color = data.color;
  cardElement.classList.add("categories__card-generated");

  cardElement.href = `#recipes?category=${data.category}`;

  return cardElement;
}

export function styleCategoryCards() {
  document.querySelectorAll(".categories__card").forEach((card) => {
    const element = card as HTMLElement;
    const gradientColor: string | null = card.getAttribute("data-color");

    if (gradientColor === "#000000") {
      element.style.backgroundImage =
        "linear-gradient(180deg, #00000000 24%, #0000000D 100%)";
    } else if (!gradientColor) {
      throw new Error("Color not found");
    } else {
      element.style.backgroundImage = `linear-gradient(180deg, ${gradientColor}00 24%, ${gradientColor}1A 100%)`;
    }
  });
}

export function addCategoryCards() {
  const cardsContainer = document.getElementById(
    "categories__list"
  ) as HTMLElement;
  const cardsDetails = document.getElementById(
    "categories__details-list"
  ) as HTMLElement;

  cardsData.forEach((data, index) => {
    const card = createCategoryCard(data);
    index < 6
      ? cardsContainer.appendChild(card)
      : cardsDetails.appendChild(card);
  });
}

export function handleCategoryCardClick() {
  const categoriesButton = document.getElementById(
    "categories-button"
  ) as HTMLButtonElement;

  categoriesButton.addEventListener("click", () => {
    categoriesButton.textContent?.trim() === "View All Categories"
      ? (categoriesButton.textContent = "Hide Categories")
      : (categoriesButton.textContent = "View All Categories");

    const categoriesDetails = document.getElementById(
      "categories__details"
    ) as HTMLDetailsElement;
    categoriesDetails.open = !categoriesDetails.open;
  });
}

export function handleLikeButton() {
  document.addEventListener("click", (event) => {
    const likeButton = event.target as HTMLElement;

    const parentElementDatasetId = likeButton.parentElement?.dataset.cardId;
    const sameCards = document.querySelectorAll(
      `[data-card-id="${parentElementDatasetId}"]`
    );
    sameCards.forEach((card) => {
      const likeButton = card.querySelector(".like-button") as HTMLElement;
      likeButton.classList.toggle("like-button__liked");
    });

    const savedLikes = localStorage.getItem("savedLikes");
    const savedLikesArray = JSON.parse(savedLikes || "[]");
    if (savedLikesArray.includes(parentElementDatasetId)) {
      savedLikesArray.splice(
        savedLikesArray.indexOf(parentElementDatasetId),
        1
      );
    } else {
      savedLikesArray.push(parentElementDatasetId);
    }

    localStorage.setItem("savedLikes", JSON.stringify(savedLikesArray));
  });
}

export function restoreLikes() {
  const savedLikes = localStorage.getItem("savedLikes");
  const savedLikesArray = JSON.parse(savedLikes || "[]");

  savedLikesArray.forEach((id: string) => {
    const parentElement = document.querySelector(
      `[data-card-id="${id}"]`
    ) as HTMLElement | null;
    const likeButton = parentElement?.querySelector(
      ".like-button"
    ) as HTMLElement;

    likeButton?.classList.add("like-button__liked");
  });
}
