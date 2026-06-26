export interface FormConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
}

export default class FormValidator {
  private _formElement: HTMLFormElement;
  private _config: FormConfig;
  private _inputList: HTMLInputElement[];
  private _submitButton: HTMLButtonElement;

  constructor(config: FormConfig, formElement: HTMLFormElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll<HTMLInputElement>(
        this._config.inputSelector,
      ),
    );
    this._submitButton = this._formElement.querySelector<HTMLButtonElement>(
      this._config.submitButtonSelector,
    ) as HTMLButtonElement;
  }

  private _showInputError(
    inputElement: HTMLInputElement,
    errorMessage: string,
  ): void {
    const errorElement = this._formElement.querySelector<HTMLElement>(
      `.${inputElement.id}-error`,
    );

    inputElement.classList.add(this._config.inputErrorClass);

    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._config.errorClass);
    }
  }

  private _hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this._formElement.querySelector<HTMLElement>(
      `.${inputElement.id}-error`,
    );

    inputElement.classList.remove(this._config.inputErrorClass);

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(this._config.errorClass);
    }
  }

  private _checkInputValidity(inputElement: HTMLInputElement): void {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
      return;
    }

    this._hideInputError(inputElement);
  }

  private _hasInvalidInput(): boolean {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  private _toggleButtonState(): void {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }

    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  private _handleInput(inputElement: HTMLInputElement): void {
    this._checkInputValidity(inputElement);
    this._toggleButtonState();
  }

  private _setEventListeners(): void {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (event: Event) => {
        this._handleInput(event.target as HTMLInputElement);
      });
    });

    this._toggleButtonState();
  }

  public enableValidation(): void {
    this._formElement.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();
    });
    this._setEventListeners();
  }

  public resetValidation(): void {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}
