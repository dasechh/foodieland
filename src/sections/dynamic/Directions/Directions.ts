import { RecipeDirection } from '../../../components';
import { Directions } from '../../../types/interfaces';
import { Section } from '../../Section';

export class DirectionsSection extends Section {
  constructor(private data: Directions['steps'], private id: number) {
    const template: string = `<fieldset class="directions__fieldset">
    <legend><h3 class="directions__fieldset-legend">Directions</h3></legend>
    </fieldset>`;
    super('section', ['directions'], template);

    this.applyContent();
  }

  private createContent(): HTMLDivElement[] {
    if (!this.data) return [];

    return this.data.map((step) => {
      const direction = new RecipeDirection(step, this.id);
      return direction.element;
    });
  }

  private applyContent() {
    const fieldset = this.sectionEl.querySelector<HTMLFieldSetElement>('.directions__fieldset');
    if (!fieldset) return;

    const content = this.createContent();
    if (!content || (Array.isArray(content) && content.length === 0)) {
      const noData: HTMLParagraphElement = document.createElement('p');
      noData.textContent = 'No Directions Found';
      noData.classList.add('directions__no-data');
      fieldset.appendChild(noData);
      return;
    }

    if (Array.isArray(content)) {
      fieldset.append(...content);
    } else {
      fieldset.append(content);
    }
  }
}
