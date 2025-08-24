import { LargeCardData } from '../../types/interfaces';
import { createTag } from './tag';
import { AuthorCard } from './AuthorCard';

export class FeaturedCard {
  private liElement: HTMLLIElement;

  constructor(private options: LargeCardData) {
    this.liElement = this.createCard();
  }

  private createCard(): HTMLLIElement {
    const li = document.createElement('li');
    li.classList.add('recipes__item', 'splide__slide');
    li.dataset.cardId = this.options.id.toString();

    const fragment = document.createDocumentFragment();

    const content = document.createElement('div');
    content.classList.add('recipes__content');

    const largeImage = document.createElement('img');
    largeImage.classList.add('recipes__image');
    largeImage.src = this.options.imgSrc;

    const mainTag = createTag('Hot Recipes', 'icons/header/image 14.svg', 'recipes__badge');
    fragment.appendChild(mainTag);

    const titleAnchor = document.createElement('a');
    const title = document.createElement('h2');
    title.classList.add('recipes__title');
    title.textContent = this.options.name;
    titleAnchor.appendChild(title);
    fragment.appendChild(titleAnchor);

    if (this.options.description) {
      const description = document.createElement('p');
      description.textContent = this.options.description;
      description.classList.add('recipes__description');
      fragment.appendChild(description);
    }

    const tagContainer = document.createElement('div');
    tagContainer.classList.add('recipes__tags', 'tag');

    this.options.tags.forEach((tagItem) => {
      const tagElement = createTag(tagItem.tag, tagItem.tagIconSrc, 'recipes__tag');
      tagContainer.appendChild(tagElement);
    });

    fragment.appendChild(tagContainer);

    const cardFooter = document.createElement('div');
    cardFooter.classList.add('recipes__footer');

    try {
      const authorCard = new AuthorCard(this.options);
      cardFooter.appendChild(authorCard.element);
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

    cardFooter.appendChild(button);
    fragment.appendChild(cardFooter);

    content.appendChild(fragment);

    li.append(content, largeImage);

    return li;
  }

  public get element(): HTMLLIElement {
    return this.liElement;
  }
}
