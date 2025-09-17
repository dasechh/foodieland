import { Directions } from '../../types/interfaces';
import { CustomCheckbox } from '../Checkbox';
import placeholderImage from '../../assets/images/image-placeholder.webp';

export class RecipeDirection {
  constructor(private step: Directions['steps'][number], private id: number) {}

  private createDirection(): HTMLDivElement {
    const container: HTMLDivElement = document.createElement('div');
    container.classList.add('directions__list-item');

    const fragment: DocumentFragment = document.createDocumentFragment();

    const label: HTMLLabelElement = document.createElement('label');
    label.classList.add('directions__list-label');

    const checkboxMethod = new CustomCheckbox(`${this.id}_${this.step.stepTitle}`);
    const checkbox = checkboxMethod.checkboxElement;
    const fakeCheckbox = checkboxMethod.fakeCheckboxElement;

    const title: HTMLSpanElement = document.createElement('span');
    title.textContent = this.step.stepTitle || 'No Title';
    title.classList.add('directions__list-title');

    const labelFragment: DocumentFragment = document.createDocumentFragment();
    labelFragment.append(checkbox, fakeCheckbox, title);
    label.appendChild(labelFragment);

    fragment.appendChild(label);

    if (this.step.description?.length) {
      let lastP: HTMLParagraphElement | null = null;

      this.step.description.forEach((item) => {
        if (typeof item === 'string') {
          if (lastP) {
            lastP.textContent += '\n' + item;
          } else {
            const p: HTMLParagraphElement = document.createElement('p');
            p.textContent = item;
            p.classList.add('directions__list-description');
            fragment.appendChild(p);
            lastP = p;
          }
        } else if (item.imgSrc) {
          const img: HTMLImageElement = document.createElement('img');
          img.classList.add('directions__list-img');
          img.src = item.imgSrc || placeholderImage;
          img.onerror = () => (img.src = placeholderImage);
          img.alt = item.alt || '';
          fragment.appendChild(img);
          lastP = null;
        }
      });
    }

    container.appendChild(fragment);
    return container;
  }

  public get element(): HTMLDivElement {
    return this.createDirection();
  }
}
