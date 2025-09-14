import { Section } from '../../Section';
import { createButton } from '../../../components/Button';

export class InstaAdSection extends Section {
  constructor() {
    const template: string = `
  <div class="instagram__header">
    <h2 class="instagram__title">Check out @foodieland on Instagram</h2>
    <p class="instagram__text">
      Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqut enim ad minim
    </p>
  </div>
  <div class="block__list">
    <img class="instagram__post" src="/promo/insta-post-1.jpg" />
    <img class="instagram__post" src="/promo/insta-post-2.jpg" />
    <img class="instagram__post" src="/promo/insta-post-3.jpg" />
    <img class="instagram__post" src="/promo/insta-post-4.jpg" />
  </div>`;

    super('section', ['instagram'], template);

    this.init();
  }

  init() {
    const button = createButton('instagram__button', 'visit-insta') as HTMLAnchorElement;
    this.element.appendChild(button);
  }
}
