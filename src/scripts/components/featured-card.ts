import { largeCardData } from '../../types/interfaces';
import { createTag } from './tag';

export class featuredCard {
  private liElement: HTMLLIElement;

  private static template = `
          <li class="recipes__item splide__slide">
        <div class="recipes__content">
          <div class="recipes__badge">
            <img class="icon" src="icons/header/image 14.svg" />
            <span>Hot Recipes</span>
          </div>
          <a><h2 class="recipes__title"></h2></a>
          <p class="recipes__description"></p>
          <div class="recipes__tags tag">
          </div>
          <div class="recipes__footer">
            <div class="recipes__author">
              <img class="recipes__author-icon" src="" />
              <div class="recipes__author-data">
                <span class="recipes__author-name"></span>
                <span class="recipes__date"></span>
              </div>
            </div>
            <a href="#" class="recipes__button"
              >View Recipes
              <img class="icon" src="icons/header/Vector.svg" />
            </a>
          </div>
        </div>
        <img class="recipes__image" src="" />
      </li>
    `;

  constructor(private options: largeCardData) {
    this.liElement = this.createCard();
  }

  private createCard(): HTMLLIElement {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = featuredCard.template;
    const li = tempDiv.querySelector('li') as HTMLLIElement;

    li.dataset.cardId = this.options.id.toString();

    (li.querySelector('.recipes__image') as HTMLImageElement).src = this.options.imgSrc;

    (li.querySelector('.recipes__title') as HTMLHeadingElement).textContent = this.options.name;

    (li.querySelector('.recipes__description') as HTMLParagraphElement).textContent =
      this.options.description;

    (li.querySelector('.recipes__author-name') as HTMLSpanElement).textContent =
      this.options.author;

    (li.querySelector('.recipes__author-icon') as HTMLImageElement).src = this.options.authorImg;

    (li.querySelector('.recipes__date') as HTMLSpanElement).textContent = this.options.date;

    const tagsWrapper = li.querySelector('.recipes__tags');
    this.options.tags.slice(0, 2).forEach((tag: string, index: number) => {
      tagsWrapper?.appendChild(createTag(tag, index, 'recipes__tag'));
    });

    return li;
  }

  public get element(): HTMLLIElement {
    return this.liElement;
  }
}
