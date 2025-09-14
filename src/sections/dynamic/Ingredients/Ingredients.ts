import { Section } from '../../Section';
import { Ingredients } from '../../../types/interfaces';
import { IngredientsList } from '../../../components';

export class IngredientsSection extends Section {
  constructor(private data: Ingredients, private id: number) {
    const template: string = `<h3 class="ingredients__header">Ingredients</h3>`;
    super('section', ['ingredients'], template);

    this.renderContent();
  }

  private createContent(): HTMLFieldSetElement[] {
    const content: HTMLFieldSetElement[] = [];
    Object.entries(this.data).forEach(([key, value]) => {
      const ingredientsList = new IngredientsList({ [key]: value }, this.id);
      content.push(ingredientsList.element);
    });
    return content;
  }

  renderContent(): void {
    this.sectionEl.append(...this.createContent());
  }
}
