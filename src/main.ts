import "../scss/styles.scss";
import {
  addCategoryCards,
  handleCategoryCardClick,
  styleCategoryCards,
  handleLikeButton,
  restoreLikes,
} from "./categories.ts";
import { displayCards } from "./cards.ts";

async function loadCardsData() {
  await displayCards(
    // displays feed cards
    "feed",
    "feed-card-template",
    "feed__card",
    "card__image",
    "card__title",
    "card__tags",
    8,
    "card__ad-image"
  );

  await displayCards(
    // displays recommendations cards
    "recommendations",
    "recommendations-card-template",
    "recommendations__card",
    "recommendations__card-image",
    "recommendations__card-title",
    "recommendations__card-tags",
    8
  );

  restoreLikes();
}

loadCardsData();
handleLikeButton();
addCategoryCards();
handleCategoryCardClick();
styleCategoryCards();
