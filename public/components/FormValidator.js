export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    }
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add(this._config.errorClass);
        }
    }
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        if (errorElement) {
            errorElement.textContent = "";
            errorElement.classList.remove(this._config.errorClass);
        }
    }
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
            return;
        }
        this._hideInputError(inputElement);
    }
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this._config.inactiveButtonClass);
            this._submitButton.disabled = true;
            return;
        }
        this._submitButton.classList.remove(this._config.inactiveButtonClass);
        this._submitButton.disabled = false;
    }
    _handleInput(inputElement) {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
    }
    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", (event) => {
                this._handleInput(event.target);
            });
        });
        this._toggleButtonState();
    }
    enableValidation() {
        this._formElement.addEventListener("submit", (event) => {
            event.preventDefault();
        });
        this._setEventListeners();
    }
    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    }
}
