import "../styles.scss";
import {
  addCategoryCards,
  handleCategoryCardClick,
  styleCategoryCards,
  handleLikeButton,
} from "./categories.ts";
import { displayCards } from "./cards.ts";

displayCards(
  // displays feed cards
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
  // displays recommendations cards
  "/data/recommendations-images.json",
  "recommendations",
  "recommendations-card-template",
  "recommendations__card",
  "recommendations__card-image",
  "recommendations__card-title",
  "recommendations__card-tags"
);

handleLikeButton();

addCategoryCards();
handleCategoryCardClick();
styleCategoryCards();
