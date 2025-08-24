import { CategoryCardData } from '../../types/interfaces';

export class CategoryCard {
  private anchorElement: HTMLAnchorElement;

  constructor(private options: CategoryCardData) {
    this.anchorElement = this.createCard();
  }

  private createCard(): HTMLAnchorElement {
    const a = document.createElement('a');
    a.classList.add('categories__card');
    a.style.backgroundImage = this.options.imgSrc;
    a.href = `#recipes?category=${this.options.category}`;
    if (this.options.color === '#000000') {
      a.style.backgroundImage = 'linear-gradient(180deg, #00000000 24%, #0000000D 100%)';
    } else {
      a.style.backgroundImage = `linear-gradient(180deg, ${this.options.color}00 24%, ${this.options.color}1A 100%)`;
    }

    const emojiElement = document.createElement('img');
    emojiElement.classList.add('emoji');
    emojiElement.src = this.options.imgSrc;
    emojiElement.alt = this.options.category;

    const blurredEmojiElement = document.createElement('img');
    blurredEmojiElement.classList.add('blurred-emoji');
    blurredEmojiElement.src = this.options.imgSrc;

    const categoryCardName = document.createElement('span');
    categoryCardName.classList.add('categories__card-name');
    categoryCardName.textContent = this.options.category;

    const fragment = document.createDocumentFragment();
    fragment.append(emojiElement, blurredEmojiElement, categoryCardName);

    a.appendChild(fragment);
    
    return a;
  }

  public get element(): HTMLAnchorElement {
    return this.anchorElement;
  }
}
