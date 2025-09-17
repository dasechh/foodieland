import { defaultNutrition, Nutrition } from '../../types/interfaces';

export class NutritionTable {
  private divElement: HTMLDivElement;

  constructor(private options: Nutrition = defaultNutrition) {
    this.divElement = this.createCard();
  }

  private createNutritionItem(key: string, value: string, unit: string): HTMLLIElement {
    const li = document.createElement('li');

    const keySpan = document.createElement('span');
    keySpan.textContent = key;
    keySpan.classList.add('recipe-details__nutrition-key');

    const valueSpan = document.createElement('span');
    valueSpan.textContent = `${value} ${unit}`;

    li.append(keySpan, valueSpan);
    return li;
  }

  private createCard(): HTMLDivElement {
    const tempDiv = document.createElement('div');
    tempDiv.classList.add('recipe-details__nutrition');

    const header: HTMLParagraphElement = document.createElement('p');
    header.classList.add('recipe-details__nutrition-header');
    header.textContent = 'Nutrition Information';

    const ul: HTMLUListElement = document.createElement('ul');
    ul.classList.add('recipe-details__nutrition-list');

    const nutritionItems = Object.entries(this.options);

    ul.append(
      ...nutritionItems.map(([key, { value, unit }]) => this.createNutritionItem(key, value, unit))
    );

    tempDiv.append(header, ul);
    return tempDiv;
  }

  public get element(): HTMLDivElement {
    return this.divElement;
  }
}
