export function createTag(tag: string, index: number, tagContainerClass?: string) {
  const tagContainer = document.createElement('a');

  if (tagContainerClass) tagContainer.classList.add(tagContainerClass);

  const tagElement = document.createElement('span');
  tagElement.textContent = tag;
  tagElement.classList.add('card__tag-text');

  const tagIcon = document.createElement('img');
  tagIcon.classList.add('icon');
  tagIcon.src = index === 0 ? '/icons/tags/Timer.svg' : '/icons/tags/ForkKnife.svg';

  tagContainer.appendChild(tagIcon);
  tagContainer.appendChild(tagElement);

  return tagContainer;
}
