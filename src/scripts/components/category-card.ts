import { categoryCardData } from '../../types/interfaces';

export class categoryCard {
  private anchorElement: HTMLAnchorElement;

  private static template = `
      <a href="" class="categories__card" onclick="event.preventDefault()">
        <img class="emoji" alt="Emoji" />
        <img class="blurred-emoji" />
        <span class="categories__card-name"></span>
      </a>
    `;

  constructor(private options: categoryCardData) {
    this.anchorElement = this.createCard();
  }

  private createCard(): HTMLAnchorElement {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = categoryCard.template;
    const anchor = tempDiv.querySelector('a') as HTMLAnchorElement;

    (anchor.querySelector('.categories__card-name') as HTMLSpanElement).textContent =
      this.options.category;

    anchor.style.backgroundImage = this.options.imgSrc;

    (anchor.querySelector('.emoji') as HTMLImageElement).src = this.options.imgSrc;
    (anchor.querySelector('.emoji') as HTMLImageElement).alt = this.options.category;

    (anchor.querySelector('.blurred-emoji') as HTMLImageElement).src = this.options.imgSrc;

    anchor.href = `#recipes?category=${this.options.category}`;

    if (this.options.color === '#000000') {
      anchor.style.backgroundImage = 'linear-gradient(180deg, #00000000 24%, #0000000D 100%)';
    } else {
      anchor.style.backgroundImage = `linear-gradient(180deg, ${this.options.color}00 24%, ${this.options.color}1A 100%)`;
    }

    return anchor;
  }

  public get element(): HTMLAnchorElement {
    return this.anchorElement;
  }
}
