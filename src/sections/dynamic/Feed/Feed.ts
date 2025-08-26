import { loadCardsData } from '../../../utils/fetch-data';
import { RecipeCard } from '../../../components/RecipeCard';
import { SmallCardData } from '../../../types/interfaces';
import { Section } from '../../Section';

export class FeedSection extends Section {
  private data: SmallCardData[] = [];

  constructor() {
    const template: string = `
    <div class="feed__header">
      <h3>Simple and tasty recipes</h3>
      <p class="feed__text">
        Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqut enim ad minim
      </p>
    </div>
    <div class="block__list"></div>`;

    super('section', ['feed'], template);

    this.init();
  }

  private addContent() {
    const container = this.sectionEl.querySelector<HTMLDivElement>('.block__list');
    container?.append(...this.data.map((element) => new RecipeCard(element, 'large').element));
  }

  private async init() {
    this.data = (await loadCardsData(undefined, undefined, 9, 'recipes')) as SmallCardData[];
    this.addContent();
  }
}
