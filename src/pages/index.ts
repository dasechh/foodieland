import {
  FeaturedSection,
  CategoriesSection,
  FeedSection,
  CourseAdSection,
  InstaAdSection,
  RecSection,
  NewsletterSection,
} from '../sections';

const main = document.querySelector('main') as HTMLElement;

const sections = [
  new FeaturedSection(),
  new CategoriesSection(),
  new FeedSection(),
  new CourseAdSection(),
  new InstaAdSection(),
  new RecSection(8, 'big'),
  new NewsletterSection(),
];

sections.forEach((section) => {
  try {
    main.appendChild(section.element);
  } catch (error) {
    console.log(`Error loading ${section} section: ${error}`);
  }
});
