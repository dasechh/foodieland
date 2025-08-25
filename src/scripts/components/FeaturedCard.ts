import { LargeCardData } from '../../types/interfaces';
import { createTag } from './tag';
import { AuthorCard } from './AuthorCard';

export class FeaturedCard {
  private liElement: HTMLLIElement;

  constructor(private options: LargeCardData) {
    this.liElement = this.createCard();
  }

  private createImage(): HTMLImageElement {
    const img = document.createElement('img');
    img.classList.add('recipes__image');
    img.src = this.options.imgSrc;
    return img;
  }

  private createTitle(): HTMLHeadingElement {
    const title = document.createElement('h2');
    title.classList.add('recipes__title');
    title.textContent = this.options.name;
    return title;
  }

  private createDescription(): HTMLParagraphElement | null {
    if (!this.options.description) return null;
    const description = document.createElement('p');
    description.classList.add('recipes__description');
    description.textContent = this.options.description;
    return description;
  }

  private createTags(): HTMLDivElement {
    const tagContainer = document.createElement('div');
    tagContainer.classList.add('recipes__tags', 'tag');

    this.options.tags.forEach((tagItem) => {
      const tagElement = createTag(tagItem.tag, tagItem.tagIconSrc, 'recipes__tag');
      tagContainer.appendChild(tagElement);
    });

    return tagContainer;
  }

  private createFooter(): HTMLDivElement {
    const footer = document.createElement('div');
    footer.classList.add('recipes__footer');

    try {
      const authorCard = new AuthorCard(this.options);
      footer.appendChild(authorCard.element);
    } catch (error) {
      console.error('Ошибка при создании AuthorCard:', error);
    }

    const button = document.createElement('a');
    button.href = `recipe-details.html?id=${this.options.id}`;
    button.classList.add('recipes__button');
    button.textContent = 'View Recipe';

    const buttonIcon = document.createElement('img');
    buttonIcon.src = 'icons/header/Vector.svg';
    buttonIcon.classList.add('icon');
    button.appendChild(buttonIcon);

    footer.appendChild(button);

    return footer;
  }

  private createCard(): HTMLLIElement {
    const li = document.createElement('li');
    li.classList.add('recipes__item', 'splide__slide');
    li.dataset.cardId = this.options.id.toString();

    const content = document.createElement('div');
    content.classList.add('recipes__content');

    const fragment = document.createDocumentFragment();

    const mainTag = createTag('Hot Recipes', 'icons/header/image 14.svg', 'recipes__badge');

    fragment.appendChild(mainTag);

    fragment.appendChild(this.createTitle());

    const description = this.createDescription();
    if (description) fragment.appendChild(description);

    const tags = this.createTags();
    if (tags) fragment.appendChild(tags);

    fragment.appendChild(this.createFooter());

    content.appendChild(fragment);

    li.append(content, this.createImage());

    return li;
  }

  public get element(): HTMLLIElement {
    return this.liElement;
  }
}
