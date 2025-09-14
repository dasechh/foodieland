import { loadRecipeData } from '../../../utils/fetchData';
import { RecipeCard } from '../../../components';
import { defaultSmallData, SmallRecipeData } from '../../../types/interfaces';
import { Section } from '../../Section';

export class RecSection extends Section {
  private data: SmallRecipeData[] = [defaultSmallData()];

  private cardCount: number;

  constructor(count: number) {
    const template: string = `

  <div class="block__list"></div>`;

    super('section', ['recommendations'], template);
    this.cardCount = count;
    this.init();
  }

  private addContent() {
    const heading: HTMLHeadingElement = document.createElement('h2');
    const fragment: DocumentFragment = document.createDocumentFragment();

    if (this.cardCount > 5) {
      const container: HTMLDivElement = document.createElement('div');
      container.classList.add('recommendations__header');

      heading.textContent = 'Try this delicious recipe\nto make your day';

      const textSection: HTMLParagraphElement = document.createElement('p');
      textSection.classList.add('recommendations__text');
      textSection.textContent =
        'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim';

      container.append(heading, textSection);
      fragment.append(container);
    } else {
      heading.textContent = 'You may like this recipe too';
      heading.classList.add('recommendations__header');
      fragment.appendChild(heading);
    }
    this.sectionEl.prepend(fragment);

    const container = this.sectionEl.querySelector<HTMLDivElement>('.block__list');
    container?.append(
      ...this.data.map(
        (element) =>
          new RecipeCard(
            element.imgSrc,
            element.name,
            element.tags,
            element.id,
            'medium',
            element.authorName
          ).element
      )
    );
  }

  private async init() {
    this.data = (await loadRecipeData(
      undefined,
      undefined,
      this.cardCount,
      'smallCardInfo'
    )) as SmallRecipeData[];
    this.addContent();
  }
}
