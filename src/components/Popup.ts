export default class Popup {
  protected readonly popupElement: HTMLElement;

  private readonly closeButton: HTMLButtonElement;
  private readonly boundHandleEscClose: (event: KeyboardEvent) => void;

  constructor(popupSelector: string) {
    const popupElement = document.querySelector<HTMLElement>(popupSelector);

    if (!popupElement) {
      throw new Error(`No se encontro el popup: ${popupSelector}`);
    }

    const closeButton =
      popupElement.querySelector<HTMLButtonElement>(".popup__close");

    if (!closeButton) {
      throw new Error(`No se encontro el boton de cierre: ${popupSelector}`);
    }

    this.popupElement = popupElement;
    this.closeButton = closeButton;
    this.boundHandleEscClose = this.handleEscClose.bind(this);
  }

  public open(): void {
    this.popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this.boundHandleEscClose);
  }

  public close(): void {
    this.popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this.boundHandleEscClose);
  }

  private handleEscClose(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      this.close();
    }
  }

  public setEventListeners(): void {
    this.closeButton.addEventListener("click", () => this.close());

    this.popupElement.addEventListener("click", (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }
}
