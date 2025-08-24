import { AuthorCardData } from '../../types/interfaces';

export class AuthorCard {
  private divElement: HTMLDivElement;

  constructor(private options: AuthorCardData) {
    this.divElement = this.createCard();
  }

  private createCard(): HTMLDivElement {
    const card = document.createElement('div');
    card.classList.add('recipes__author');

    const fragment = document.createDocumentFragment();
    fragment.append(this.createAuthorIcon(), this.createTextDataContainer());

    card.appendChild(fragment);
    return card;
  }

  private createAuthorIcon(): HTMLImageElement {
    const authorIcon = document.createElement('img');
    authorIcon.classList.add('recipes__author-icon');
    authorIcon.src = this.options.authorImg;
    return authorIcon;
  }

  private createTextDataContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('recipes__author-data');

    const authorName = document.createElement('span');
    authorName.textContent = this.options.authorName;
    authorName.classList.add('recipes__author-name');

    const recipeDate = document.createElement('span');
    recipeDate.textContent = this.options.recipeDate;
    recipeDate.classList.add('recipes__date');

    container.append(authorName, recipeDate);
    return container;
  }
  
  public get element(): HTMLDivElement {
    return this.divElement;
  }
}
