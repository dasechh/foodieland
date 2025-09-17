import { NutritionTable, AuthorCard, createTag, createButton } from '../../../components';
import { Section } from '../../Section';
import { defaultMediumData, MediumRecipeData } from '../../../types/interfaces';

export class RecipeOverviewSection extends Section {
  constructor(private data: MediumRecipeData = defaultMediumData()) {
    const template: string = `
    <div class="recipe-details__header">
    <div class='recipe-details__header-left'>
    <h1 class="recipe-details__title"></h1>
    <div class="recipe-details__summary"></div>
    </div>
    </div>
    <div class="recipe-details__main"></div>
    <p class="recipe-details__description"></p>`;

    super('section', ['recipe-details'], template);

    this.init();
  }

  private createTags(): HTMLDivElement | null {
    if (!this.data.tags) return null;

    const tagContainer = this.sectionEl.querySelector<HTMLDivElement>('.recipe-details__summary');

    if (tagContainer) {
      tagContainer.classList.add('recipes__tags');

      this.data.tags.forEach((tagItem) => {
        const tagElement = createTag(tagItem.tag, tagItem.tagIcon, 'recipes-summary__tag');
        tagContainer.appendChild(tagElement);
      });
    }

    return tagContainer;
  }

  private createButtons(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('recipe-details__buttons');

    const printButton = createButton('circle__button', 'print', () =>
      window.print()
    ) as HTMLButtonElement;
    const printContainer = document.createElement('div');
    printContainer.classList.add('recipe-details__button-container');
    const printSpan = document.createElement('span');
    printSpan.classList.add('recipe-details__button-text');
    printSpan.textContent = 'Print';
    printContainer.append(printButton, printSpan);

    const shareButton = createButton('circle__button', 'share', () => {}) as HTMLButtonElement;
    const shareContainer = document.createElement('div');
    shareContainer.classList.add('recipe-details__button-container');
    const shareSpan = document.createElement('span');
    shareSpan.classList.add('recipe-details__button-text');
    shareSpan.textContent = 'Share';
    shareContainer.append(shareButton, shareSpan);

    container.append(printContainer, shareContainer);

    return container;
  }

  private renderHeader() {
    const headerContainer = this.sectionEl.querySelector<HTMLDivElement>('.recipe-details__header');
    if (!headerContainer) return;

    const rightContainer = this.createButtons();
    headerContainer.append(rightContainer);

    const heading = this.sectionEl.querySelector<HTMLHeadingElement>('.recipe-details__title');
    if (heading) heading.textContent = this.data.name;

    const summary = this.sectionEl.querySelector('.recipe-details__summary');
    if (summary) {
      const authorCard = new AuthorCard(
        this.data.authorImg,
        this.data.authorName,
        this.data.recipeDate
      );
      summary.appendChild(authorCard.element);
      this.createTags();
    }
  }

  private renderMedia(): DocumentFragment {
    const fragment = document.createDocumentFragment();

    if (this.data.videoSrc) {
      const video = document.createElement('iframe');
      video.src = this.data.videoSrc;
      video.classList.add('recipe-details__media');
      video.setAttribute('controls', 'controls');
      fragment.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = this.data.imgSrc;
      img.classList.add('recipe-details__media');
      fragment.appendChild(img);
    }

    const table = new NutritionTable(this.data.nutrition);
    fragment.appendChild(table.element);

    return fragment;
  }

  private renderMain() {
    const mainContainer = this.sectionEl.querySelector<HTMLDivElement>('.recipe-details__main');
    if (!mainContainer) return;

    const mediaFragment = this.renderMedia();
    mainContainer.appendChild(mediaFragment);
  }

  private renderDescription() {
    const description = this.sectionEl.querySelector<HTMLParagraphElement>(
      '.recipe-details__description'
    );
    if (description) description.textContent = this.data.description;
  }

  private render() {
    this.renderHeader();
    this.renderMain();
    this.renderDescription();
  }

  private async init() {
    this.render();
  }
}
