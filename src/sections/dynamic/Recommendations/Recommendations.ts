import { loadCardsData } from '../../../utils/fetch-data';
import { RecipeCard } from '../../../components/RecipeCard';
import { SmallCardData } from '../../../types/interfaces';
import { Section } from '../../Section';

export class RecSection extends Section {
  private data: SmallCardData[] = [];

  constructor() {
    const template: string = `
  <div class="recommendations__header">
    <h3>Try this delicious recipe<br />to make your day</h3>
    <p class="recommendations__text">
      Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqut enim ad minim
    </p>
  </div>
  <div class="block__list"></div>`;

    super('section', ['recommendations'], template);

    this.init();
  }

  private addContent() {
    const container = this.sectionEl.querySelector<HTMLDivElement>('.block__list');
    container?.append(...this.data.map((element) => new RecipeCard(element, 'medium').element));
  }

  private async init() {
    this.data = (await loadCardsData(undefined, undefined, 8, 'recipes')) as SmallCardData[];
    this.addContent();
  }
}
