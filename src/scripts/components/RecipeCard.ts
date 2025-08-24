import { SmallCardData } from '../../types/interfaces';
import { createTag } from './tag';
import { LikeButton } from './LikeButton';

type cardSize = 'medium' | 'large';

export class RecipeCard {
  private divElement: HTMLDivElement;

  constructor(private options: SmallCardData, private size: cardSize) {
    this.divElement = this.createCard();
  }

  private static selectors = {
    large: {
      container: 'feed__card',
      image: 'card__image',
      like: 'feed__card-like-button',
      title: 'card__title',
      tagClass: 'recipes__tag',
      tagsClass: 'recipes__tags',
    },
    medium: {
      container: 'recommendations__card',
      image: 'recommendations__card-image',
      like: 'recommendations__card-like-button',
      title: 'recommendations__card-title',
      tagClass: 'recommendations__card-tag',
      tagsClass: 'recommendations__card-tags',
    },
  };

  private createImage(): HTMLImageElement {
    const { image } = RecipeCard.selectors[this.size];
    const img = document.createElement('img');
    img.src = this.options.imgSrc;
    img.alt = this.options.name;
    img.classList.add(image);
    return img;
  }

  private createTextsElement(): HTMLDivElement {
    const div = document.createElement('div');
    div.classList.add('card__texts');

    div.append(this.createHeader(), this.createTagsWrapper());

    return div;
  }

  private createTagsWrapper(): HTMLDivElement {
    const { tagsClass, tagClass } = RecipeCard.selectors[this.size];
    const div = document.createElement('div');
    div.classList.add('tag', tagsClass);

    div.append(
      ...this.options.tags.map((tagItem) => createTag(tagItem.tag, tagItem.tagIconSrc, tagClass))
    );

    return div;
  }

  private createHeader(): HTMLHeadingElement {
    const { title } = RecipeCard.selectors[this.size];
    const headerLevel = this.size === 'large' ? 'h4' : 'h5';

    const headerEl = document.createElement(headerLevel);
    const a = document.createElement('a');

    a.textContent = this.options.name;
    a.classList.add(title);
    a.href = `recipe-details.html?id=${this.options.id.toString()}`;

    headerEl.appendChild(a);
    return headerEl;
  }

  private createCard(): HTMLDivElement {
    const { container, like } = RecipeCard.selectors[this.size];

    const div = document.createElement('div');
    div.dataset.cardId = this.options.id.toString();
    div.classList.add(container, 'card');

    const likeButton = new LikeButton(this.options.id.toString());

    div.append(this.createImage(), likeButton.element, this.createTextsElement());

    likeButton.element.classList.add(like);

    return div;
  }

  public get element(): HTMLDivElement {
    return this.divElement;
  }
}
