import { setStorageState, toggleState } from '../../utils/stateManager';

export class CustomCheckbox {
  checkbox: HTMLInputElement;
  fakeCheckbox: HTMLSpanElement;
  checkBoxId: string;
  activeClass: string = 'checked';

  constructor(checkBoxId: string) {
    this.checkBoxId = checkBoxId;

    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';
    this.checkbox.classList.add('ingredients__list-checkbox');
    this.checkbox.style.display = 'none';

    this.fakeCheckbox = document.createElement('span');
    this.fakeCheckbox.classList.add('ingredients__list-fake-checkbox');

    this.setInitialState();
    this.attachEvents();
  }

  private setInitialState() {
    setStorageState(this.checkbox, 'checkboxes', this.checkBoxId, this.activeClass);
    this.fakeCheckbox.classList.toggle(this.activeClass, this.checkbox.checked);
  }

  private attachEvents() {
    this.checkbox.addEventListener('click', () => {
      toggleState(this.checkbox, 'checkboxes', this.checkBoxId, this.activeClass);
      this.fakeCheckbox.classList.toggle(this.activeClass, this.checkbox.checked);
    });
  }

  public get checkboxElement(): HTMLInputElement {
    return this.checkbox;
  }

  public get fakeCheckboxElement(): HTMLSpanElement {
    return this.fakeCheckbox;
  }
}
