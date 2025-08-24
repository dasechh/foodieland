export function createTag(tag?: string, tagIconSrc?: string, tagContainerClass?: string) {
  const tagContainer = document.createElement('a');

  if (tagContainerClass) tagContainer.classList.add(tagContainerClass);

  const tagElement = document.createElement('span');
  tagElement.textContent = tag || 'Chicken';
  tagElement.classList.add('card__tag-text');

  const tagIcon = document.createElement('img');
  tagIcon.classList.add('icon');
  tagIcon.src = tagIconSrc || '/icons/tags/ForkKnife.svg'

  tagContainer.appendChild(tagIcon);
  tagContainer.appendChild(tagElement);

  return tagContainer;
}
