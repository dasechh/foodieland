import { Nutrition } from '../../types/interfaces';

export class NutritionTable {
  private divElement: HTMLDivElement;

  constructor(private options: Nutrition) {
    this.divElement = this.createCard();
  }

  private createNutritionItem(key: string, value: string, name: string): HTMLLIElement {
    const li = document.createElement('li');

    const keySpan = document.createElement('span');
    keySpan.textContent = key;

    const valueSpan = document.createElement('span');
    valueSpan.textContent = `${value} ${name}`;

    li.append(keySpan, valueSpan);
    return li;
  }

  private createCard(): HTMLDivElement {
    const tempDiv = document.createElement('div');
    tempDiv.classList.add('recipe-details__nutrition');

    const header = document.createElement('h4');
    header.textContent = 'Nutrition Information';

    const ul = document.createElement('ul');
    ul.classList.add('recipe-details__nutrition-list');

    Object.entries(this.options).forEach(([key, { value, name }]) => {
      ul.appendChild(this.createNutritionItem(key, value, name));
    });

    tempDiv.append(header, ul);
    return tempDiv;
  }

  public get element(): HTMLDivElement {
    return this.divElement;
  }
}
