export function createTag(
  tag: string,
  tagIconSrc?: string,
  tagContainerClass?: string
): HTMLAnchorElement {
  const tagContainer = document.createElement('a');
  tagContainer.href = '#';

  if (tagContainerClass) tagContainer.classList.add(tagContainerClass);

  if (tagIconSrc) {
    const tagIcon = document.createElement('img');
    tagIcon.classList.add('icon');
    tagIcon.src = tagIconSrc;
    tagContainer.appendChild(tagIcon);
  }

  const tagElement = document.createElement('span');
  tagElement.textContent = tag;
  tagElement.classList.add('tag');
  tagContainer.appendChild(tagElement);

  return tagContainer;
}
