export async function loadSection(sectionName: string, container: string) {
  try {
    const response = await fetch(`/templates/${sectionName}.html`);

    const htmltext = await response.text();

    const containerPlace = document.querySelector(`${container}`);
    containerPlace?.insertAdjacentHTML('beforeend', htmltext.trim());
  } catch (error) {
    throw new Error(`Error loading ${sectionName} section: ${error}`);
  }
}
