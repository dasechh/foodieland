import { tagData } from '../../types/interfaces';
import { createTag, createButton } from '../../components';
import { toggleState, setStorageState } from '../../utils/stateManager';

type cardSize = 'medium' | 'large' | 'small';

export class RecipeCard {
  private divElement: HTMLDivElement;

  constructor(
    private imgSrc: string = '/recipe-images/placeholder.webp',
    private name: string = 'No name',
    private tags: tagData[] = [],
    private id: number = -1,
    private size: cardSize = 'small',
    private authorName: string = 'No Author'
  ) {
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
      tagsCount: 3,
    },
    medium: {
      container: 'recommendations__card',
      image: 'recommendations__card-image',
      like: 'recommendations__card-like-button',
      title: 'recommendations__card-title',
      tagClass: 'recommendations__card-tag',
      tagsClass: 'recommendations__card-tags',
      tagsCount: 2,
    },
    small: {
      container: 'other__card',
      image: 'other__card-image',
      title: 'other__card-title',
      author: 'recipes__card-author',
    },
  };

  private createImage(): HTMLImageElement {
    const { image } = RecipeCard.selectors[this.size];
    const img = document.createElement('img');
    img.src = this.imgSrc;
    img.alt = this.name;
    img.classList.add(image);
    return img;
  }

  private createTextsElement(): HTMLDivElement {
    const div = document.createElement('div');
    div.classList.add('card__texts');

    if (this.size === 'small') {
      const { author } = RecipeCard.selectors.small;
      const authorEl = document.createElement('span');
      authorEl.textContent = this.authorName;
      authorEl.classList.add(author);

      div.append(authorEl);
    } else {
      const tags = this.createTagsWrapper();
      if (tags) div.appendChild(tags);
    }
    div.prepend(this.createHeader());

    return div;
  }

  private createTagsWrapper(): HTMLDivElement | null {
    if (this.size !== 'small') {
      const { tagsClass, tagClass, tagsCount } = RecipeCard.selectors[this.size];
      const div = document.createElement('div');
      div.classList.add(tagsClass);

      div.append(
        ...this.tags
          .slice(0, tagsCount)
          .map((tagItem) => createTag(tagItem.tag, tagItem.tagIconSrc, tagClass))
      );
      return div;
    } else {
      return null;
    }
  }

  private createHeader(): HTMLAnchorElement {
    const { title } = RecipeCard.selectors[this.size];

    const headerEl = document.createElement('a');
    headerEl.textContent = this.name;
    headerEl.classList.add(title);
    headerEl.href = `recipe-details.html?id=${this.id.toString()}`;

    return headerEl;
  }

  private createCard(): HTMLDivElement {
    const { container, like } = RecipeCard.selectors[this.size] as {
      container: string;
      like?: string;
    };

    const div = document.createElement('div');
    div.dataset.cardId = this.id.toString();
    div.classList.add(container, 'card');

    const elements: HTMLElement[] = [this.createImage(), this.createTextsElement()];

    if (like) {
      const likeButton = createButton('like-button', 'like', () => {
        toggleState(likeButton, 'likes', this.id.toString(), 'liked');
      }) as HTMLButtonElement;
      setStorageState(likeButton, 'likes', this.id.toString(), 'liked');
      likeButton.classList.add(like);
      elements.splice(1, 0, likeButton);
    }
    div.append(...elements);

    return div;
  }

  public get element(): HTMLDivElement {
    return this.divElement;
  }
}
