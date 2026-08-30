import Popup from "./Popup.js";

export type ConfirmationHandler = () => void | Promise<void>;

export default class PopupWithConfirmation extends Popup {
  private readonly formElement: HTMLFormElement;
  private handlerConfirm: ConfirmationHandler;

  public setSubmitAction(handlerConfirm: ConfirmationHandler): void {
  this.handlerConfirm = handlerConfirm;
}

    constructor (popupSelector: string, handlerConfirm: ConfirmationHandler) {
    super(popupSelector);
    const formElement = this.popupElement.querySelector<HTMLFormElement>(
      ".popup__form",
    );
    if (!formElement) {
      throw new Error(`No se encontro el formulario en el popup: ${popupSelector}`);
    }
    this.formElement = formElement;
    this.handlerConfirm = handlerConfirm;
}
 public override setEventListeners(): void {
    super.setEventListeners();
    this.formElement.addEventListener("submit", async (event: Event) => {
      event.preventDefault();
        try {
            await this.handlerConfirm();
            this.close();
        } catch (error) {
            console.error("Error al confirmar la acción:", error);
        }
    });
 }     
}

