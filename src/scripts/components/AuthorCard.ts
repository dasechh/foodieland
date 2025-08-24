import { AuthorCardData } from '../../types/interfaces';

export class AuthorCard {
  private divElement: HTMLDivElement;

  constructor(private options: AuthorCardData) {
    this.divElement = this.createCard();
  }

  private createCard(): HTMLDivElement {
    const tempDiv = document.createElement('div');
    tempDiv.classList.add('recipes__author');

    const authorIcon = document.createElement('img');
    authorIcon.classList.add('recipes__author-icon');
    authorIcon.src = this.options.authorImg;

    const textDataContainer = document.createElement('div');
    textDataContainer.classList.add('recipes__author-data');

    const authorName = document.createElement('span');
    authorName.textContent = this.options.authorName;
    authorName.classList.add('recipes__author-name');

    const recipeDate = document.createElement('span');
    recipeDate.textContent = this.options.recipeDate;
    recipeDate.classList.add('recipes__date');

    textDataContainer.append(authorName, recipeDate);

    const fragment = document.createDocumentFragment();
    fragment.append(authorIcon, textDataContainer);
    tempDiv.appendChild(fragment);

    return tempDiv;
  }

  public get element(): HTMLDivElement {
    return this.divElement;
  }
}
