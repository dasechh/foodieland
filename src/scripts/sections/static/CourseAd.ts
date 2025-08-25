import { Section } from '../Section';

export class CourseAdSection extends Section {
  constructor() {
    const template: string = `<div class="course-ad__text">
        <h3>Everyone can&nbsp;be&nbsp;a chef&nbsp;in their own kitchen</h3>
        <p class="course-ad__text-description">
          Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqut enim<br />ad minim
        </p>
        <a href="#" class="course-ad__button">Learn more</a>
      </div>
      <div class="course-ad__image-wrapper">
        <div class="course-ad__background"></div>
        <img class="course-ad__image" src="/chef-with-ingredients.png" />
      </div>`;

    super('section', ['body-container', 'course-ad'], template);
  }
}
