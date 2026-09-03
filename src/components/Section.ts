export type Renderer<T> = (item: T) => void;

interface SectionConfig<T> {
  items: T[];
  renderer: Renderer<T>;
}

export default class Section<T> {
  private readonly items: T[];
  private readonly renderer: Renderer<T>;
  private readonly container: HTMLElement;

  constructor(
    { items, renderer }: SectionConfig<T>,
    containerSelector: string,
  ) {
    const container = document.querySelector<HTMLElement>(containerSelector);

    if (!container) {
      throw new Error(`No se encontro la seccion: ${containerSelector}`);
    }

    this.items = items;
    this.renderer = renderer;
    this.container = container;
  }

  public addItem(element: HTMLElement): void {
    this.container.append(element);
  }

  public renderItems(): void {
    this.items.forEach((item) => this.renderer(item));
  }
}
