import { Section } from '../Section';

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
    <img class="instagram__post" src="Post.jpg" />
    <img class="instagram__post" src="Post-1.jpg" />
    <img class="instagram__post" src="Post-2.jpg" />
    <img class="instagram__post" src="Post-3.jpg" />
  </div>
  <a href="#" class="instagram__button"
    >Visit Our Instagram
    <img class="icon" src="icons/header/004-instagram-white.svg"
  /></a>`;

    super('section', ['instagram'], template);
  }
}
