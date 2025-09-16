import { loadRecipeData } from '../../../utils/fetchData';
import { RecipeCard } from '../../../components';
import { defaultSmallData, SmallRecipeData, cardSize } from '../../../types/interfaces';
import { Section } from '../../Section';

export class RecSection extends Section {
  private data: SmallRecipeData[] = [defaultSmallData()];

  constructor(private cardCount: number, private size: 'small' | 'big') {
    const template: string = ``;

    super('section', ['recommendations'], template);

    this.init();
  }

  private addContent() {
    const selectors = {
      small: {
        headingLevel: 'h3',
        headingClass: 'other__heading',
        headingText: 'Other Recipe',
        blockClass: 'other__block',
        cardSize: 'small',
      },
      big: {
        headingLevel: 'h2',
        headingClass: 'other__heading',
        headingText: 'You may like this recipe too',
        blockClass: 'block__list',
        cardSize: 'medium',
      },
    };

    const { headingLevel, headingClass, headingText, blockClass, cardSize } = selectors[this.size];

    const heading: HTMLElement = document.createElement(headingLevel);
    const fragment: DocumentFragment = document.createDocumentFragment();

    if (this.cardCount > 5 && this.size === 'big') {
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
      heading.textContent = headingText;
      heading.classList.add(headingClass);
      fragment.appendChild(heading);
    }
    this.sectionEl.prepend(fragment);

    const container = document.createElement('div');
    container.classList.add(blockClass);
    container?.append(
      ...this.data.map(
        (element) =>
          new RecipeCard(
            element.imgSrc,
            element.name,
            element.tags,
            element.id,
            cardSize as cardSize,
            element.authorName
          ).element
      )
    );

    this.sectionEl.append(container);
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
