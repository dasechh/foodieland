import { CategoryCardData } from '../../../types/interfaces';
import { CategoryCard } from '../../components/CategoryCard';
import { Section } from '../Section';

const categoriesData: CategoryCardData[] = [
  { category: 'Breakfast', color: '#708246', imgSrc: '/icons/categories/image-onigiri.png' },
  { category: 'Vegan', color: '#6CC63F', imgSrc: '/icons/categories/image-lettuce.png' },
  { category: 'Meat', color: '#CC261B', imgSrc: '/icons/categories/image-meat.png' },
  { category: 'Dessert', color: '#F09E00', imgSrc: '/icons/categories/image-dessert.png' },
  { category: 'Lunch', color: '#000000', imgSrc: '/icons/categories/image-sandvich.png' },
  { category: 'Chocolate', color: '#000000', imgSrc: '/icons/categories/image-chocolate.png' },
  { category: 'Pasta', color: '#F4A300', imgSrc: '/icons/categories/spaghetti_1f35d.png' },
  { category: 'Salads', color: '#62C752', imgSrc: '/icons/categories/green-salad_1f957.png' },
  { category: 'Pizza', color: '#FF6F61', imgSrc: '/icons/categories/pizza_1f355.png' },
  { category: 'Seafood', color: '#1D5E6C', imgSrc: '/icons/categories/lobster_1f99e.png' },
  { category: 'Soup', color: '#F2A8B6', imgSrc: '/icons/categories/pot-of-food_1f372.png' },
  {
    category: 'Beverage',
    color: '#00B4B4',
    imgSrc: '/icons/categories/teacup-without-handle_1f375.png',
  },
];

export class CategoriesSection extends Section {
  private open: boolean = false;

  constructor() {
    const template: string = `<div class="categories__header">
        <h3>Categories</h3>
        <button class="categories__button">
          View All Categories
        </button>
        </div>
      <div class="block__list categories__list"></div>`;

    super('section', ['body-container', 'categories'], template);

    this.init();
  }

  private createButton() {
    const button = this.sectionEl.querySelector<HTMLButtonElement>('.categories__button');

    button?.addEventListener('click', () => {
      this.open = !this.open;
      button.textContent = this.open ? 'Hide Categories' : 'View All Categories';

      this.render();
    });
  }

  private render() {
    const currentData = this.open ? categoriesData : categoriesData.slice(0, 6);
    const cards = currentData.map((element) => new CategoryCard(element).element);

    const container = this.sectionEl.querySelector<HTMLDivElement>('.categories__list');

    if (container) {
      container.innerHTML = '';
      container.append(...cards);
    }
  }

  private init() {
    this.createButton();
    this.render();
  }
}
