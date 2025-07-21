import "./styles/styles.scss";
import { displayCards } from "./modules/cards";

document.addEventListener("DOMContentLoaded", () => {
    async function loadCardsData() {
    await displayCards({
      templateId: "recipe-details",
      containerId: "recipe-details-container",
      cardClass: "recipe-details",
      titleClass: "recipe__details__title",
      requiredIDs: [1],
      tagsClass: 'recipes__tags',
      tagContainerClass: "recipes__tag",
      largeDescriptionClass: "recipe-details__description",
      recipeDateClass: "recipes__date",
      authorImgClass: "recipes__author-icon",
      authorNameClass: "recipes__author-name",
      videoClass: 'recipe-details__video',
      ulContainerClass: 'recipe-details__nutrition-list',
      numberOfCards: 1
    });
    }
    loadCardsData();
})
