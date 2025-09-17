import { CategoryCardData } from '../../../types/interfaces';
import { CategoryCard } from '../../../components/CategoryCard';
import { Section } from '../../Section';
import { createButton } from '../../../components/Button';

import onigiriImg from '../../../assets/icons/categories/image-onigiri.png';
import lettuceImg from '../../../assets/icons/categories/image-lettuce.png';
import meatImg from '../../../assets/icons/categories/image-meat.png';
import dessertImg from '../../../assets/icons/categories/image-dessert.png';
import sandvichImg from '../../../assets/icons/categories/image-sandvich.png';
import chocolateImg from '../../../assets/icons/categories/image-chocolate.png';
import spaghettiImg from '../../../assets/icons/categories/spaghetti_1f35d.png';
import saladImg from '../../../assets/icons/categories/green-salad_1f957.png';
import pizzaImg from '../../../assets/icons/categories/pizza_1f355.png';
import lobsterImg from '../../../assets/icons/categories/lobster_1f99e.png';
import potImg from '../../../assets/icons/categories/pot-of-food_1f372.png';
import beverageImg from '../../../assets/icons/categories/teacup-without-handle_1f375.png';

const categoriesData: CategoryCardData[] = [
  { category: 'Breakfast', color: '#708246', imgSrc: onigiriImg },
  { category: 'Vegan', color: '#6CC63F', imgSrc: lettuceImg },
  { category: 'Meat', color: '#CC261B', imgSrc: meatImg },
  { category: 'Dessert', color: '#F09E00', imgSrc: dessertImg },
  { category: 'Lunch', color: '#000000', imgSrc: sandvichImg },
  { category: 'Chocolate', color: '#000000', imgSrc: chocolateImg },
  { category: 'Pasta', color: '#F4A300', imgSrc: spaghettiImg },
  { category: 'Salads', color: '#62C752', imgSrc: saladImg },
  { category: 'Pizza', color: '#FF6F61', imgSrc: pizzaImg },
  { category: 'Seafood', color: '#1D5E6C', imgSrc: lobsterImg },
  { category: 'Soup', color: '#F2A8B6', imgSrc: potImg },
  {
    category: 'Beverage',
    color: '#00B4B4',
    imgSrc: beverageImg,
  },
];

export class CategoriesSection extends Section {
  private open: boolean = false;
  private cards: HTMLElement[] = [];

  constructor() {
    const template: string = `<div class="categories__header">
        <h2>Categories</h2>
        </div>
      <div class="block__list categories__list"></div>`;

    super('section', ['categories'], template);

    this.init();
  }

  private createButton() {
    const button = createButton('categories__button', 'view-categories') as HTMLButtonElement;
    const buttonContainer = this.sectionEl.querySelector<HTMLDivElement>('.categories__header');
    buttonContainer?.appendChild(button);

    button?.addEventListener('click', () => {
      this.open = !this.open;
      button.textContent = this.open ? 'Hide Categories' : 'View All Categories';

      this.toggleCards();
    });
  }

  private toggleCards() {
    if (this.open) {
      this.cards.forEach((card) => {
        card.style.display = 'flex';
      });
    } else {
      this.cards.forEach((card, index) => {
        if (index >= 6) card.style.display = 'none';
      });
    }
  }

  private render() {
    const container = this.sectionEl.querySelector<HTMLDivElement>('.categories__list');
    if (!container) return;

    this.cards = categoriesData.map((element, index) => {
      const cardEl = new CategoryCard(element).element;
      if (index >= 6 && !this.open) cardEl.style.display = 'none';
      return cardEl;
    });

    container.append(...this.cards);
  }

  private init() {
    this.createButton();
    this.render();
  }
}
