import { Section } from '../../Section';

export class NewsletterSection extends Section {
  constructor() {
    const template: string = `
  <div class="newsletter__header">
    <h3>Deliciousness to your inbox</h3>
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
      required
    />
    <button class="newsletter__button" type="submit">Subscribe</button>
  </form>
  <div class="newsletter__images">
    <img src="newsletter/salad-vegetables.png" />
    <img src="newsletter/salad-with-eggs.png" />
  </div>`;

    super('section', ['newsletter'], template);
  }
}
