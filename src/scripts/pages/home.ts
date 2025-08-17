import "./styles/styles.scss";
import { addCategoryCards, styleCategoryCards } from "../../modules/categories.ts";
import { displayCards } from "../../modules/cards.ts";
import {
  handleCategoryCardClick,
  handleLikeButton,
  restoreLikes,
} from "../../modules/handlers.ts";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";

document.addEventListener("DOMContentLoaded", () => {
  async function loadCardsData() {
    await displayCards({
      templateId: "feed-card-template",
      cardClass: "feed__card",
      titleClass: "card__title",
      imageClass: "card__image",
      tagsClass: "card__tags",
      tagContainerClass: "card__tag",
      containerId: "feed",
      numberOfCards: 8,
      adCardClass: "card__ad-image",
    });

    await displayCards({
      containerId: "splide__list",
      templateId: "featured-card-template",
      cardClass: "recipes__item",
      imageClass: "recipes__image",
      titleClass: "recipes__title",
      tagsClass: "recipes__tags",
      numberOfCards: 3,
      cardDescriptionClass: "recipes__description",
      recipeDateClass: "recipes__date",
      tagContainerClass: "recipes__tag",
      requiredTags: ["Featured"],
      authorImgClass: "recipes__author-icon",
      authorNameClass: "recipes__author-name"
    });

    await displayCards({
      containerId: "recommendations",
      templateId: "recommendations-card-template",
      cardClass: "recommendations__card",
      imageClass: "recommendations__card-image",
      titleClass: "recommendations__card-title",
      tagsClass: "recommendations__card-tags",
      numberOfCards: 8,
      tagContainerClass: "card__tag",
    });

    handleLikeButton();
    restoreLikes();
    handleCategoryCardClick();

    new Splide(".splide", {
      type: "loop",
      perPage: 3,
      arrows: false,
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
});
