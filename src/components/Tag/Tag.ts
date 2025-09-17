import featuredIcon from '../../assets/icons/tags/scroll.svg?raw';
import forkIcon from '../../assets/icons/tags/fork-and-knife.svg?raw';
import timerIcon from '../../assets/icons/tags/timer.svg?raw';
import starIcon from '../../assets/icons/tags/star.svg?raw';

const tagIcons = {
  featured: featuredIcon,
  forkKnife: forkIcon,
  timer: timerIcon,
  star: starIcon,
};

type TagIconKey = keyof typeof tagIcons | string;

export function createTag(
  tag: string,
  tagIcon?: TagIconKey,
  tagContainerClass?: string
): HTMLAnchorElement {
  const tagContainer = document.createElement('a');
  tagContainer.href = '#';
  if (tagContainerClass) tagContainer.classList.add(tagContainerClass);

  if (tagIcon && tagIcon in tagIcons) {
    let svgString = tagIcons[tagIcon as keyof typeof tagIcons].trim();
    if (tagIcon !== 'featured') svgString = svgString.replace(/fill="[^"]*"|fill:\s*[^;"]+;?/g, '');
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgElement = doc.documentElement;
    svgElement.classList.add('icon');
    tagContainer.appendChild(svgElement);
  }

  const tagElement = document.createElement('span');
  tagElement.textContent = tag;
  tagElement.classList.add('tag');
  tagContainer.appendChild(tagElement);

  return tagContainer;
}
