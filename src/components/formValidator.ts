interface FormConfig {
    input Selector: string; 
    submitButtonSelector: string;
    inactiveButtonClass: string;
    inputErrorClass: string;
    errorClass: string;
}

export class FormValidator {
    private _formElement: HTMLFormElement;
    private _config: FormConfig;
    private _inputList: NodeListOf<HTMLInputElement>;
    private _submitButton: HTMLButtonElement;

    constructor(config: FormConfig, formElement: HTMLFormElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = this._formElement.querySelectorAll(this._config.inputSelector); as NodeListOf<HTMLInputElement>;
        this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector) as HTMLButtonElement;
    }   

    private _showInputError(inputElement: HTMLInputElement, errorMessage: string): void {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`) as HTMLElement;
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    }

    private _hideInputError(inputElement: HTMLInputElement): void {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`) as HTMLElement;
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._config.errorClass);
    }
    
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);

    private _checkInputValidity(inputElement: HTMLInputElement): void {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    private _hasInvalidInput(): boolean {
        return Array.from(this._inputList).some((inputElement) => !inputElement.validity.valid);
    }

    private _toggleButtonState(): void {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this._config.inactiveButtonClass); 
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._config.inactiveButtonClass); 
            this._submitButton.disabled = false;
        }   

        private _setEventListeners(): void {
            this._toggleButtonState();  
            this._inputList.forEach((inputElement) => {
                inputElement.addEventListener('input', () => {
                    this._checkInputValidity(inputElement);
                    this._toggleButtonState();
                });
            });
        }

    public enableValidation(): void {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}   

public resetValidation(): void {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
}