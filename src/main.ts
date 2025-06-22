import "../scss/styles.scss";
import {
  addCategoryCards,
  handleCategoryCardClick,
  styleCategoryCards,
  handleLikeButton,
} from "./categories.ts";
import { displayCards } from "./cards.ts";

displayCards(
  // displays feed cards
  "/data/cards-data.json",
  "feed",
  "feed-card-template",
  "feed__card",
  "card__image",
  "card__title",
  "card__tags",
  8,
  "card__ad-image"
);

displayCards(
  // displays recommendations cards
  "/data/cards-data.json",
  "recommendations",
  "recommendations-card-template",
  "recommendations__card",
  "recommendations__card-image",
  "recommendations__card-title",
  "recommendations__card-tags",
  8
);

handleLikeButton();

addCategoryCards();
handleCategoryCardClick();
styleCategoryCards();
