import { loadRecipeData } from '../../../utils/fetchData';
import { defaultSmallData, SmallRecipeData } from '../../../types/interfaces';
import { FeaturedCard } from '../../../components';
import { Section } from '../../Section';
import Splide from '@splidejs/splide';

export class FeaturedSection extends Section {
  private data: SmallRecipeData[] = [defaultSmallData()];

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
    this.data = (await loadRecipeData(['Featured'], [], 3, 'smallCardInfo')) as SmallRecipeData[];
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
      interval: 60000,
    }).mount();
  }
}
