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
    // displays feed
    "feed",
    "feed-card-template",
    "feed__card",
    "card__image",
    "card__title",
    "card__tags",
    8,
    "card__ad-image",
    "small",
    "",
    "",
    "",
    "",
    "card__tag"
  );
  // Написать комментарий чтобы понятно было че хочет
  await displayCards(
    // displays recommendations
    "recommendations",
    "recommendations-card-template",
    "recommendations__card",
    "recommendations__card-image",
    "recommendations__card-title",
    "recommendations__card-tags",
    8,
    "",
    "small",
    "",
    "",
    "",
    "",
    "card__tag"
  );

  await displayCards(
    // displays featured recipes
    "splide__list",
    "featured-card-template",
    "recipes__item",
    "recipes__image",
    "recipes__title",
    "recipes__tags",
    3,
    "",
    "large",
    "recipes__description",
    "recipes__author-icon",
    "recipes__author-name",
    "recipes__date",
    "recipes__tag"
  );

  handleLikeButton();
  restoreLikes();
  handleCategoryCardClick();

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
}

loadCardsData();
addCategoryCards();
styleCategoryCards();
