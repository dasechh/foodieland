export function createTag(
  tag: string,
  tagIconSrc?: string,
  tagContainerClass?: string
): HTMLAnchorElement {
  const tagContainer = document.createElement('a');
  tagContainer.href = '#';

  if (tagContainerClass) tagContainer.classList.add(tagContainerClass);

  const tagElement = document.createElement('span');
  tagElement.textContent = tag;
  tagElement.classList.add('card__tag-text');

  const tagIcon = document.createElement('img');
  tagIcon.classList.add('icon');
  tagIcon.src = tagIconSrc || '/icons/tags/ForkKnife.svg';

  tagContainer.append(tagIcon, tagElement);

  return tagContainer;
}
