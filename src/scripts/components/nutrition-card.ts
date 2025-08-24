import { Nutrition } from '../../types/interfaces';

export class NutritionCard {
  private divElement: HTMLDivElement;

  constructor(private options: Nutrition) {
    this.divElement = this.createCard();
  }

  private createCard(): HTMLDivElement {
    const tempDiv = document.createElement('div');
    tempDiv.classList.add('recipe-details__nutrition');

    const header = document.createElement('h4');
    header.textContent = 'Nutrition Information';

    const ul = document.createElement('ul');
    ul.classList.add('recipe-details__nutrition-list');

    Object.entries(this.options).forEach(([key, { value, name }]) => {
      const li = document.createElement('li');

      const keySpan = document.createElement('span');
      keySpan.textContent = key;

      const valueSpan = document.createElement('span');
      valueSpan.textContent = `${value} ${name}`;

      li.append(keySpan, valueSpan);
      ul.appendChild(li);
    });

    const fragment = document.createDocumentFragment();
    fragment.append(header, ul);

    tempDiv.appendChild(fragment);
    return tempDiv;
  }

  public get element(): HTMLDivElement {
    return this.divElement;
  }
}
