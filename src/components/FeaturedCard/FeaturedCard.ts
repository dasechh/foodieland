import { createTag } from '../Tag';
import { AuthorCard } from '../AuthorCard';
import { createButton } from '../Button';
import { defaultSmallData, SmallRecipeData } from '../../types/interfaces';
import defaultImage from '../../assets/images/image-placeholder.webp';

export class FeaturedCard {
  private liElement: HTMLLIElement;

  constructor(private options: SmallRecipeData = defaultSmallData()) {
    this.liElement = this.createCard();
  }

  private createImage(): HTMLImageElement {
    const img = document.createElement('img');
    img.classList.add('recipes__image');
    img.src = this.options.imgSrc;
    img.onerror = () => (img.src = defaultImage);
    return img;
  }

  private createTitle(): HTMLHeadingElement {
    const title = document.createElement('h1');
    title.classList.add('recipes__title');
    title.textContent = this.options.name;
    return title;
  }

  private createDescription(): HTMLParagraphElement {
    const description = document.createElement('p');
    description.classList.add('recipes__description');
    description.textContent = this.options.description;
    return description;
  }

  private createTags(): HTMLDivElement | null {
    if (this.options.tags) {
      const tagContainer = document.createElement('div');
      tagContainer.classList.add('featured-recipes__tags');

      this.options.tags.forEach((tagItem) => {
        const tagElement = createTag(tagItem.tag, tagItem.tagIcon, 'recipes__tag');
        tagContainer.appendChild(tagElement);
      });

      return tagContainer;
    } else {
      return null;
    }
  }

  private createFooter(): HTMLDivElement {
    const footer = document.createElement('div');
    footer.classList.add('recipes__footer');

    const authorCard = new AuthorCard(
      this.options.authorImg,
      this.options.authorName,
      this.options.recipeDate
    );
    footer.appendChild(authorCard.element);

    const button = createButton('recipes__button', 'view-recipes') as HTMLAnchorElement;
    button.href = `recipe-details.html?id=${this.options.id}`;

    footer.appendChild(button);

    return footer;
  }

  private createCard(): HTMLLIElement {
    const li = document.createElement('li');
    li.classList.add('recipes__item', 'splide__slide');
    li.dataset.cardId = this.options.id.toString();

    const content = document.createElement('div');
    content.classList.add('recipes__content');

    const mainTag = createTag('Hot Recipes', 'featured', 'recipes__badge');

    const fragment = document.createDocumentFragment();

    const nodes = [mainTag, this.createTitle(), this.createDescription(), this.createFooter()];
    const tagsNode = this.createTags();
    if (tagsNode) nodes.splice(3, 0, tagsNode);
    fragment.append(...nodes);

    content.appendChild(fragment);
    li.append(content, this.createImage());

    return li;
  }

  public get element(): HTMLLIElement {
    return this.liElement;
  }
}
