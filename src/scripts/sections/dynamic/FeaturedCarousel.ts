import { loadCardsData } from '../../utils/fetch-data';
import { FeaturedCard } from '../../components/FeaturedCard';
import { LargeCardData } from '../../../types/interfaces';
import { Section } from '../Section';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

export class FeaturedSection extends Section {
  private data: LargeCardData[] = [];

  constructor() {
    const template: string = `
  <div class="splide__track">
    <ul class="splide__list"></ul>
  </div>`;

    super('section', ['splide'], template);

    this.init();
  }

  private addContent() {
    const container = this.sectionEl.querySelector<HTMLUListElement>('.splide__list');
    container?.append(...this.data.map((element) => new FeaturedCard(element).element));
  }

  private async init() {
    this.data = (await loadCardsData(['Featured'], [], 3, 'recipes')) as LargeCardData[];
    console.log(this.data);
    this.addContent();

    new Splide(this.sectionEl, {
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
}
