import { Section } from '../../Section';

export class SidebarContent extends Section {
  constructor(private content: HTMLElement[], private sidebar: HTMLElement[]) {
    const template: string = `
        <div class="sidebar__main-content"></div>
        <aside class="sidebar"></aside>`;
    super('div', ['content-with-sidebar'], template);

    this.init();
  }

  private init() {
    const mainContent = this.sectionEl.querySelector<HTMLDivElement>('.sidebar__main-content');
    const sidebar = this.sectionEl.querySelector<HTMLDivElement>('.sidebar');
    const fragment = document.createDocumentFragment();
    if (mainContent && this.content && this.content.length > 0) {
      mainContent.append(...this.content);
      fragment.appendChild(mainContent);
    }

    if (sidebar && this.sidebar && this.sidebar.length > 0) {
      sidebar.append(...this.sidebar);
      fragment.appendChild(sidebar);
    }

    if (fragment) this.sectionEl.appendChild(fragment);
  }
}
