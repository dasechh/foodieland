import "./styles/styles.scss";
import { addCategoryCards, styleCategoryCards } from "./modules/categories.ts";
import { displayCards } from "./modules/cards.ts";
import {
  handleCategoryCardClick,
  handleLikeButton,
  restoreLikes,
} from "./modules/handlers.ts";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";

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

  handleLikeButton();
  restoreLikes();
}

new Splide(".splide", {
  type: "loop",
  perPage: 3,
  focus: "center",
  gap: "2.5rem",
  width: "100%",
  fixedWidth: "100%",
  pagination: false,
  autoplay: true,
  interval: 6000,
}).mount();

loadCardsData();
addCategoryCards();
handleCategoryCardClick();
styleCategoryCards();
