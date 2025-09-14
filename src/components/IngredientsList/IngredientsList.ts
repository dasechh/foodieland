import { Ingredients } from '../../types/interfaces';
import { CustomCheckbox } from '../Checkbox';

export class IngredientsList {
  private category: string;
  private items: string[];

  constructor(options: Ingredients, private id: number) {
    this.category = Object.keys(options)[0];
    this.items = options[this.category];
  }

  private createFieldset(): HTMLFieldSetElement {
    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('ingredients__list');
    const legend = document.createElement('legend');
    legend.textContent = this.category ?? 'No Name';
    legend.className = 'ingredients__list-legend';

    this.items.forEach((item) => {
      const label = document.createElement('label');
      label.classList.add('ingredients__list-label');

      const checkboxMethod = new CustomCheckbox(`${this.id}_${item}`);
      const checkbox = checkboxMethod.checkboxElement;
      const fakeCheckbox = checkboxMethod.fakeCheckboxElement;

      fakeCheckbox.classList.toggle('checked', checkbox.checked);
      label.classList.toggle('checked', checkbox.checked);

      checkbox.onclick = () => {
        label.classList.toggle('checked', checkbox.checked);
      };

      label.append(checkbox, fakeCheckbox, document.createTextNode(item));

      fieldset.appendChild(label);
    });

    fieldset.append(legend);
    return fieldset;
  }

  public get element(): HTMLFieldSetElement {
    return this.createFieldset();
  }
}
