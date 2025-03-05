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
  

const categoriesButton = document.getElementById("categories-button") as HTMLButtonElement;

export function toggleCategories() {
  const isActive = categoriesButton.classList.toggle("categories__button--active");
  isActive ? showCategories() : hideCategories();
}

function hideCategories() {
  categoriesButton.textContent = "Show Categories";
  document.querySelectorAll(".categories__card-generated").forEach((card) => {
    card.remove();
  });
}

function showCategories() {
  categoriesButton.textContent = "Hide Categories";

  cardsData.forEach((data) => {
    createCategoryCard(data);
    styleCategoryCards();
  });
}

function createCategoryCard(data: { category: string; color: string; imgSrc: string }) {
  const cardTemplate = document.getElementById("category-card-template") as HTMLTemplateElement;
  const cardsContainer = document.getElementById("categories") as HTMLElement;
  const newCard = cardTemplate.content.cloneNode(true) as DocumentFragment;
  const cardElement = newCard.querySelector(".categories__card") as HTMLElement;

  (cardElement.querySelector(".categories__card-name") as HTMLElement).textContent = data.category;
  const emojiElement = cardElement.querySelector(".emoji") as HTMLImageElement;
  emojiElement.src = data.imgSrc;
  emojiElement.alt = data.category;

  const blurredEmojiElement = cardElement.querySelector(".blurred-emoji") as HTMLImageElement;
  blurredEmojiElement.src = data.imgSrc;

  cardElement.dataset.color = data.color;
  cardElement.classList.add("categories__card-generated");
  cardsContainer.appendChild(cardElement);
}

export function styleCategoryCards() {
  document.querySelectorAll(".categories__card").forEach((card) => {
    const element = card as HTMLElement;
    const gradientColor: string | null = card.getAttribute("data-color");

    if (gradientColor === "#000000") {
      element.style.backgroundImage = "linear-gradient(180deg, #00000000 24%, #0000000D 100%)";
    } else if (!gradientColor) {
      throw new Error("Color not found");
    } else {
      element.style.backgroundImage = `linear-gradient(180deg, ${gradientColor}00 24%, ${gradientColor}1A 100%)`;
    }
  });
}
