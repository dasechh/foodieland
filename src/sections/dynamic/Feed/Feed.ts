import { loadRecipeData } from '../../../utils/fetchData';
import { RecipeCard } from '../../../components';
import { defaultSmallData, SmallRecipeData } from '../../../types/interfaces';
import { Section } from '../../Section';

export class FeedSection extends Section {
  private data: SmallRecipeData[] = [defaultSmallData()];

  constructor() {
    const template: string = `
    <div class="feed__header">
      <h2 class="feed__title">Simple and tasty recipes</h2>
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
    container?.append(
      ...this.data.map(
        (element) =>
          new RecipeCard(
            element.imgSrc,
            element.name,
            element.tags,
            element.id,
            'large',
            element.authorName
          ).element
      )
    );
  }

  private async init() {
    this.data = (await loadRecipeData(
      undefined,
      undefined,
      9,
      'smallCardInfo'
    )) as SmallRecipeData[];
    this.addContent();
  }
}
