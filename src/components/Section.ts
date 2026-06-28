type Renderer<T> = (item: T) => void;

export class Section<T> {
    private _items: T[];
    private _renderer: Renderer<T>;
    private _container: HTMLElement;

    constructor(
    { items, renderer }: { items: T[]; renderer: Renderer<T> },
    containerSelector: string
    ) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector) as HTMLElement;
    }

    public addItem(element: HTMLElement): void {
    this._container.append(element);
    }

    public renderItems(): void {
    this._items.forEach((item) => {
        this._renderer(item);
    });
    }
}