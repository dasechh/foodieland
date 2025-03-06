import "../styles.scss";
import { toggleCategories, styleCategoryCards } from "./categories.ts";
import { displayCards } from "./cards.ts";

styleCategoryCards();

const categoriesButton = document.getElementById("categories-button") as HTMLButtonElement;
categoriesButton.addEventListener("click", toggleCategories);

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

document.addEventListener("click", (event) => {
  const likeButton = event.target as HTMLElement;
  if (likeButton && likeButton.classList.contains("like-button")) {
    likeButton.classList.toggle("like-button__liked");
  }
});
