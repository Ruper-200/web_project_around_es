export default class Section {
    constructor({ items, renderer }, containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) {
            throw new Error(`No se encontro la seccion: ${containerSelector}`);
        }
        this.items = items;
        this.renderer = renderer;
        this.container = container;
    }
    addItem(element) {
        this.container.append(element);
    }
    renderItems() {
        this.items.forEach((item) => this.renderer(item));
    }
}
