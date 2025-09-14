import {
  RecipeOverviewSection,
  IngredientsSection,
  DirectionsSection,
  RecSection,
  SidebarContent,
  NewsletterSection,
} from '../sections';
import { loadRecipeData } from '../utils/fetchData';
import { defaultMediumData, MediumRecipeData } from '../types/interfaces';

const main = document.querySelector('main') as HTMLElement;
const thisId = Number(new URLSearchParams(window.location.search).get('id')) || -1;

const data = (await loadRecipeData([], [thisId], 1, 'mediumCardInfo'))[0] || defaultMediumData() as MediumRecipeData ;

const sections = [
  new RecipeOverviewSection(data),
  new SidebarContent(
    [
      new IngredientsSection(data.ingredients, thisId).element,
      new DirectionsSection(data.steps, thisId).element,
    ],
    []
  ),
  new NewsletterSection(),
  new RecSection(4),
];

sections.forEach((section) => {
  try {
    main.appendChild(section.element);
  } catch (error) {
    console.log(`Error loading ${section} section: ${error}`);
  }
});
