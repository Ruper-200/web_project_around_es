export interface FormConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
}

export default class FormValidator {
  private readonly formElement: HTMLFormElement;
  private readonly config: FormConfig;
  private readonly inputs: HTMLInputElement[];
  private readonly submitButton: HTMLButtonElement;

  constructor(config: FormConfig, formElement: HTMLFormElement) {
    const submitButton = formElement.querySelector<HTMLButtonElement>(
      config.submitButtonSelector,
    );

    if (!submitButton) {
      throw new Error("No se encontro el boton de envio del formulario");
    }

    this.config = config;
    this.formElement = formElement;
    this.inputs = Array.from(
      formElement.querySelectorAll<HTMLInputElement>(config.inputSelector),
    );
    this.submitButton = submitButton;
  }

  private getErrorElement(input: HTMLInputElement): HTMLElement | null {
    return this.formElement.querySelector<HTMLElement>(`.${input.id}-error`);
  }

  private showInputError(input: HTMLInputElement): void {
    const errorElement = this.getErrorElement(input);

    input.classList.add(this.config.inputErrorClass);

    if (errorElement) {
      errorElement.textContent = input.validationMessage;
      errorElement.classList.add(this.config.errorClass);
    }
  }

  private hideInputError(input: HTMLInputElement): void {
    const errorElement = this.getErrorElement(input);

    input.classList.remove(this.config.inputErrorClass);

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(this.config.errorClass);
    }
  }

  private checkInputValidity(input: HTMLInputElement): void {
    if (input.validity.valid) {
      this.hideInputError(input);
      return;
    }

    this.showInputError(input);
  }

  private hasInvalidInput(): boolean {
    return this.inputs.some((input) => !input.validity.valid);
  }

  private toggleButtonState(): void {
    const formIsInvalid = this.hasInvalidInput();

    this.submitButton.classList.toggle(
      this.config.inactiveButtonClass,
      formIsInvalid,
    );
    this.submitButton.disabled = formIsInvalid;
  }

  private handleInput(event: Event): void {
    const input = event.target;

    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    this.checkInputValidity(input);
    this.toggleButtonState();
  }

  private setEventListeners(): void {
    this.inputs.forEach((input) => {
      input.addEventListener("input", (event: Event) => {
        this.handleInput(event);
      });
    });

    this.toggleButtonState();
  }

  public enableValidation(): void {
    this.setEventListeners();
  }

  public resetValidation(): void {
    this.inputs.forEach((input) => this.hideInputError(input));
    this.toggleButtonState();
  }
}
