import defaultAuthor from '../../assets/images/default-author.webp';

export class AuthorCard {
  private divElement: HTMLDivElement;

  constructor(private authorImg: string = defaultAuthor, private authorName: string = 'No Author', private recipeDate: string = 'No Date') {
    this.divElement = this.createCard();
  }

  private createCard(): HTMLDivElement {
    const card = document.createElement('div');
    card.classList.add('recipes__author');

    const authorIcon = this.createAuthorIcon();
    const textData = this.createTextDataContainer();

    card.append(authorIcon, textData);

    return card;
  }

  private createAuthorIcon(): HTMLImageElement {
    const authorIcon = document.createElement('img');
    authorIcon.classList.add('recipes__author-icon');
    authorIcon.src = this.authorImg;
    authorIcon.onerror = () => (authorIcon.src = defaultAuthor);
    return authorIcon;
  }

  private createTextDataContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('recipes__author-data');

    const authorName = document.createElement('span');
    authorName.textContent = this.authorName;
    authorName.classList.add('recipes__author-name');
    container.appendChild(authorName);

    const recipeDate = document.createElement('span');
    recipeDate.textContent = this.recipeDate;
    recipeDate.classList.add('recipes__date');
    container.appendChild(recipeDate);

    return container;
  }

  public get element(): HTMLDivElement {
    return this.divElement;
  }
}
