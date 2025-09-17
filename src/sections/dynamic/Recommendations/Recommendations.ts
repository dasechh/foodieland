import { loadRecipeData } from '../../../utils/fetchData';
import { RecipeCard } from '../../../components';
import { defaultSmallData, SmallRecipeData, cardSize } from '../../../types/interfaces';
import { Section } from '../../Section';

type Size = 'small' | 'big' | 'bigWithDescription';

type Selector = {
  headingLevel: string;
  headingClass: string;
  headingText: string;
  blockClass: string;
  cardSize: string;
  description?: string;
};

export class RecSection extends Section {
  private data: SmallRecipeData[] = [defaultSmallData()];

  constructor(private cardCount: number, private size: 'small' | 'big' | 'bigWithDescription') {
    const template: string = ``;

    super('section', ['recommendations'], template);

    this.init();
  }

  private addContent() {
    const selectors: Record<Size, Selector> = {
      small: {
        headingLevel: 'h3',
        headingClass: 'other__heading',
        headingText: 'Other Recipe',
        blockClass: 'other__block',
        cardSize: 'small',
      },
      bigWithDescription: {
        headingLevel: 'h2',
        headingClass: 'recommendations__header',
        headingText: 'Try this delicious recipe\nto make your day',
        description:
          'Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim',
        blockClass: 'block__list',
        cardSize: 'medium',
      },
      big: {
        headingLevel: 'h2',
        headingClass: 'recommendations__header',
        headingText: 'You may like this recipe too',
        blockClass: 'block__list',
        cardSize: 'medium',
      },
    } as const;

    const { headingLevel, headingClass, headingText, blockClass, cardSize, description } =
      selectors[this.size];

    const heading: HTMLElement = document.createElement(headingLevel);
    heading.textContent = headingText;

    if (typeof description === 'string' || description) {
      const container: HTMLDivElement = document.createElement('div');
      container.classList.add(headingClass);
      const descriptionEl: HTMLParagraphElement = document.createElement('p');
      descriptionEl.classList.add('recommendations__text');
      descriptionEl.textContent = description;
      container.append(heading, descriptionEl);
      this.sectionEl.appendChild(container);
    } else {
      heading.classList.add(headingClass);
      this.sectionEl.appendChild(heading);
    }

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
