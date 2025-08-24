import { loadSection } from '../utils/load-section';
import { loadCardsData } from '../utils/fetch-data';
import { CategoryCard } from '../components/CategoryCard';
import { FeaturedCard } from '../components/FeaturedCard';
import { RecipeCard } from '../components/RecipeCard';

import { LargeCardData, SmallCardData } from '../../types/interfaces';
import { handleLikeButtons, handleCategoryCardClick, restoreLikes } from '../utils/handlers';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';
import { categoriesData } from '../../../data/categories';

async function init() {
  await Promise.all([
    loadSection('splide-carousel', 'main'),
    loadSection('categories', 'main'),
    loadSection('feed', 'main'),
    loadSection('course-ad', 'main'),
    loadSection('insta-ad', 'main'),
    loadSection('recommendations', 'main'),
    loadSection('newsletter', 'main'),
  ]);

  const [featuredData, feedData, recommendationsData] = await Promise.all([
    loadCardsData(['Featured'], [], 3, 'recipes') as Promise<LargeCardData[]>,
    loadCardsData(undefined, undefined, 9, 'recipes') as Promise<SmallCardData[]>,
    loadCardsData(undefined, undefined, 8, 'recipes') as Promise<SmallCardData[]>,
  ]);

  featuredData.forEach((element) => {
    const card = new FeaturedCard(element);
    document.querySelector('#splide__list')?.appendChild(card.element);
  });

  categoriesData.forEach((element, index) => {
    const card = new CategoryCard(element);
    const container =
      index < 6
        ? document.querySelector('#categories__list')
        : document.querySelector('#categories__details-list');

    container?.appendChild(card.element);
  });

  feedData.forEach((element) => {
    const card = new RecipeCard(element, 'large');
    document.querySelector('#feed')?.appendChild(card.element);
  });

  recommendationsData.forEach((element) => {
    const card = new RecipeCard(element, 'medium');
    document.querySelector('#recommendations')?.appendChild(card.element);
  });

  const splideElement = document.querySelector('.splide');
  if (splideElement) {
    new Splide('.splide', {
      type: 'loop',
      perPage: 3,
      arrows: false,
      focus: 'center',
      gap: '2.5rem',
      width: '100%',
      fixedWidth: '100%',
      pagination: false,
      autoplay: true,
      interval: 6000,
    }).mount();
  }

  handleLikeButtons();
  handleCategoryCardClick();
  restoreLikes();
}

init().catch(console.error);
