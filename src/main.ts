
const cardsData: Array<{emoji: string, category: string, color: string}> = [
    {
        emoji: "🍙",
        category: "Breakfast",
        color: "#708246"
    },
    {
        emoji: "🥬",
        category: "Vegan",
        color: "#6CC63F"
    },
    {
        emoji: "🥩",
        category: "Meat",
        color: "#CC261B"
    },
    {
        emoji: "🍰",
        category: "Dessert",
        color: "#F09E00"
    },
    {
        emoji: "🥪",
        category: "Lunch",
        color: "#000000"
    },
    {
        emoji: "🍫",
        category: "Chocolate",
        color: "#000000"
    }
]

const cardsContainer = document.getElementsByClassName("category-card-line")[0] as HTMLElement;
const cardTemplate = document.getElementById("category_card_template") as HTMLTemplateElement;

cardsData.forEach((data) => {
    if (cardTemplate) {

    const newCard = cardTemplate.content.cloneNode(true) as DocumentFragment;
    const cardElement = newCard.querySelector(".category-card") as HTMLElement;
    
    cardElement.style.display = "flex";
    (cardElement.querySelector(".category-name") as HTMLElement).textContent = data.category;
    (cardElement.querySelector(".emoji")as HTMLElement).textContent = data.emoji;
    
    cardElement.dataset.color = data.color;
    (cardElement.querySelector('.emoji') as HTMLElement).dataset.emoji = data.emoji;
    cardsContainer.appendChild(cardElement);
    }
    else {
        throw new Error("Template not found");
    }
});

document.querySelectorAll(".category-card").forEach((card) => { 
    const element = card as HTMLElement;
    const gradientColor: string | null = card.getAttribute("data-color");

    if (gradientColor === "#000000") {
        element.style.backgroundImage = "linear-gradient(180deg, #00000000 24%, #0000000D 100%)";
    }
    else if (!gradientColor) {
        throw new Error("Color not found");
    }
    else {element.style.backgroundImage = `linear-gradient(
        180deg,
        ${gradientColor}00 24%,
        ${gradientColor}1A 100%
    )`;
    }
});