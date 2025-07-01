export function createTag(tag: string, index: number) {
  const tagContainer = document.createElement("div");
  tagContainer.classList.add("card__tag");

  const tagElement = document.createElement("span");
  tagElement.textContent = tag;
  tagElement.classList.add("card__tag-text");

  const tagIcon = document.createElement("img");
  tagIcon.classList.add("icon");
  tagIcon.src =
    index === 0 ? "/icons/tags/Timer.svg" : "/icons/tags/ForkKnife.svg";

  tagContainer.appendChild(tagIcon);
  tagContainer.appendChild(tagElement);

  return tagContainer;
}

export function createAdCard(adCardClass: string) {
  const adCardElementContainer = document.createElement(
    "a"
  ) as HTMLAnchorElement;
  adCardElementContainer.href = "#";

  const adCardElement = document.createElement("img") as HTMLImageElement;
  adCardElement.src = "/recipe-images/advertisement.jpg";
  adCardElement.classList.add(adCardClass);

  adCardElementContainer.appendChild(adCardElement);
  return adCardElementContainer;
}

export function randomizeArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
