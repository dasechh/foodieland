import { Section } from '../../Section';
import { createButton } from '../../../components/Button';

export class CourseAdSection extends Section {
  constructor() {
    const template: string = `<div class="course-ad__text">
        <h2 class="course-ad__title">Everyone can be a chef in their own kitchen</h2>
        <p class="course-ad__text-description">
          Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqut enim<br />ad minim
        </p>
      </div>
      <div class="course-ad__image-wrapper">
        <div class="course-ad__background"></div>
        <img class="course-ad__image" src="/promo/chef-with-ingredients.png" />
      </div>`;

    super('section', ['course-ad'], template);

    this.init();
  }

  init() {
    const container = this.element.querySelector<HTMLDivElement>('.course-ad__text')
    const button = createButton('course-ad__button', 'learn-more') as HTMLAnchorElement;

    container?.appendChild(button);
  }
}
