import { loadSection } from '../utils/load-section';
import { loadCardsData } from '../utils/fetch-data';
import { categoryCard } from '../components/category-card';
import { featuredCard } from '../components/featured-card';
import { likeCard } from '../components/like-card';
import { largeCardData, smallCardData } from '../../types/interfaces';
import { handleLikeButtons, handleCategoryCardClick, restoreLikes } from '../utils/handlers';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';
import { categoriesData } from '../../../data/categories';

async function init() {
  await loadSection('splide-carousel', 'main'); // Loads featured recipes carousel
  const featuredData = (await loadCardsData(['Featured'], [], 3, 'recipes')) as largeCardData[];

  featuredData.forEach((element) => {
    const card = new featuredCard(element);
    document.querySelector('#splide__list')?.appendChild(card.element);
  });

  await loadSection('categories', 'main'); // Loads categories section

  categoriesData.forEach((element, index) => {
    const card = new categoryCard(element);
    const container =
      index < 6
        ? document.querySelector('#categories__list')
        : document.querySelector('#categories__details-list');

    container?.appendChild(card.element);
  });

  await loadSection('feed', 'main'); // Loads feed section
  const feedData = (await loadCardsData(undefined, undefined, 9, 'recipes')) as smallCardData[];

  feedData.forEach((element) => {
    const card = new likeCard(element, 'large');
    document.querySelector('#feed')?.appendChild(card.element);
  });

  await loadSection('course-ad', 'main'); // Loads course ad section

  await loadSection('insta-ad', 'main'); // Loads insta ad section

  await loadSection('recommendations', 'main'); // Loads recommendatrions section
  const recommendationsData = (await loadCardsData(
    undefined,
    undefined,
    8,
    'recipes'
  )) as smallCardData[];

  recommendationsData.forEach((element) => {
    const card = new likeCard(element, 'medium');
    document.querySelector('#recommendations')?.appendChild(card.element);
  });

  await loadSection('newsletter', 'main'); // Loads newsletter section

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
