import Popup from "./Popup.js";

export type FormValues = Record<string, string>;
export type FormSubmitHandler = (values: FormValues) => void | Promise<void>;

export default class PopupWithForm extends Popup {
  private readonly formElement: HTMLFormElement;
  private readonly inputs: HTMLInputElement[];
  private readonly handleFormSubmit: FormSubmitHandler;
  private readonly submitButton: HTMLButtonElement;

  constructor(popupSelector: string, handleFormSubmit: FormSubmitHandler) {
    super(popupSelector);

    const formElement =
      this.popupElement.querySelector<HTMLFormElement>(".popup__form");

    if (!formElement) {
      throw new Error(`No se encontro el formulario: ${popupSelector}`);
    }

    this.formElement = formElement;
    const submitButton =
      this.formElement.querySelector<HTMLButtonElement>(".popup__button");

    if (!submitButton) {
      throw new Error(`No se encontro el boton de submit: ${popupSelector}`);
    }
    this.submitButton = submitButton;
    this.inputs = Array.from(
      formElement.querySelectorAll<HTMLInputElement>(".popup__input"),
    );
    this.handleFormSubmit = handleFormSubmit;
  }

  private getInputValues(): FormValues {
    return this.inputs.reduce<FormValues>((values, input) => {
      values[input.name] = input.value;
      return values;
    }, {});
  }

  public override setEventListeners(): void {
    super.setEventListeners();

    this.formElement.addEventListener("submit", async (event: SubmitEvent) => {
      event.preventDefault();

      if (!this.formElement.checkValidity()) {
        return;
      }

      const originalText = this.submitButton.textContent;
      this.submitButton.textContent = "Guardando...";

      try {
        await this.handleFormSubmit(this.getInputValues());
      } catch (error: unknown) {
        console.error("Error al enviar el formulario:", error);
      } finally {
        this.submitButton.textContent = originalText;
      }
    });
  }

  public override close(): void {
    super.close();
    this.formElement.reset();
  }
}
