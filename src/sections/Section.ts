export class Section {
    protected sectionEl: HTMLElement;

    constructor(tagName: string, classNames: string[], template: string) {
        this.sectionEl = document.createElement(tagName);

        if (classNames.length > 0) {
            this.sectionEl.classList.add(...classNames);
        }
        this.sectionEl.innerHTML = template;
    }

    public get element(): HTMLElement {
        return this.sectionEl;
    }
}