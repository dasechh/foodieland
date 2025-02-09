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

const cardsContainer = document.getElementsByClassName(
  "category-card-line"
)[0] as HTMLElement;
const cardTemplate = document.getElementById(
  "category_card_template"
) as HTMLTemplateElement;

cardsData.forEach((data) => {
  if (cardTemplate) {
    const newCard = cardTemplate.content.cloneNode(true) as DocumentFragment;
    const cardElement = newCard.querySelector(".category-card") as HTMLElement;

    cardElement.style.display = "flex";
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
