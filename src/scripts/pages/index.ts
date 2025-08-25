import { loadSection } from '../utils/load-section';

import {
  FeaturedSection,
  CategoriesSection,
  FeedSection,
  CourseAdSection,
  InstaAdSection,
  RecSection,
  NewsletterSection,
} from '../sections';

async function init() {
  await Promise.allSettled([
    loadSection(FeaturedSection, 'main'),
    loadSection(CategoriesSection, 'main'),
    loadSection(FeedSection, 'main'),
    loadSection(CourseAdSection, 'main'),
    loadSection(InstaAdSection, 'main'),
    loadSection(RecSection, 'main'),
    loadSection(NewsletterSection, 'main'),
  ]);
}

init().catch(console.error);
