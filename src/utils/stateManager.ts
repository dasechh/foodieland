export function toggleState(
  element: HTMLElement | HTMLInputElement,
  storageKey: string,
  itemId: string,
  activeClass: string
) {
  const saved = localStorage.getItem(storageKey);
  const array: string[] = JSON.parse(saved || '[]');
  const index = array.indexOf(itemId);
  const newState = index === -1;
  element.classList.toggle(activeClass, newState);
  if (newState) array.push(itemId);
  else array.splice(index, 1);
  localStorage.setItem(storageKey, JSON.stringify(array));
}

export function setStorageState(
  element: HTMLElement | HTMLInputElement,
  storageKey: string,
  itemId: string,
  activeClass: string
) {
  const saved = localStorage.getItem(storageKey);
  const array: string[] = JSON.parse(saved || '[]');
  const newState = array.includes(itemId);
  element.classList.toggle(activeClass, newState);

  if ('type' in element && element.type === 'checkbox') {
    element.checked = newState;
  }
}
