type SectionClass = new () => { element: HTMLElement };

export async function loadSection(section: SectionClass, container: string) {
  try {
    const containerEl = document.querySelector(container) as HTMLElement;
    
    if (!containerEl) {
      throw new Error(`Container ${container} not found`);
    }
    containerEl.appendChild(new section().element);
  } catch (error) {
    throw new Error(`Error loading ${section} section: ${error}`);
  }
}
