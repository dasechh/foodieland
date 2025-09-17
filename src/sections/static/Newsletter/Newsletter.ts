import { Section } from '../../Section';
import { createButton } from '../../../components/Button';

export class NewsletterSection extends Section {
  constructor() {
    const template: string = `
  <div class="newsletter__header">
    <h2 class="newsletter__title" >Deliciousness to your inbox</h2>
    <p class="newsletter__text">
      Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqut enim ad minim
    </p>
  </div>
  <form class="newsletter__form">
    <input
      type="email"
      class="newsletter__input"
      placeholder="Your email address..."
      autocomplete="email"
      name="email"
      required
    />
  </form>
  <div class="newsletter__images">
    <img src="promo/salad-vegetables.png" />
    <img src="promo/salad-with-eggs.png" />
  </div>`;

    super('section', ['newsletter'], template);

    this.init();
  }

  init() {
    const container = this.element.querySelector<HTMLFormElement>('.newsletter__form');
    const button = createButton('newsletter__button', 'subscribe') as HTMLButtonElement;
    button.type = 'submit';

    container?.appendChild(button);
  }
}
