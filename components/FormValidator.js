export default class FormValidator {
    constructor(config, formElement) {
        const submitButton = formElement.querySelector(config.submitButtonSelector);
        if (!submitButton) {
            throw new Error("No se encontro el boton de envio del formulario");
        }
        this.config = config;
        this.formElement = formElement;
        this.inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
        this.submitButton = submitButton;
    }
    getErrorElement(input) {
        return this.formElement.querySelector(`.${input.id}-error`);
    }
    showInputError(input) {
        const errorElement = this.getErrorElement(input);
        input.classList.add(this.config.inputErrorClass);
        if (errorElement) {
            errorElement.textContent = input.validationMessage;
            errorElement.classList.add(this.config.errorClass);
        }
    }
    hideInputError(input) {
        const errorElement = this.getErrorElement(input);
        input.classList.remove(this.config.inputErrorClass);
        if (errorElement) {
            errorElement.textContent = "";
            errorElement.classList.remove(this.config.errorClass);
        }
    }
    checkInputValidity(input) {
        if (input.validity.valid) {
            this.hideInputError(input);
            return;
        }
        this.showInputError(input);
    }
    hasInvalidInput() {
        return this.inputs.some((input) => !input.validity.valid);
    }
    toggleButtonState() {
        const formIsInvalid = this.hasInvalidInput();
        this.submitButton.classList.toggle(this.config.inactiveButtonClass, formIsInvalid);
        this.submitButton.disabled = formIsInvalid;
    }
    handleInput(event) {
        const input = event.target;
        if (!(input instanceof HTMLInputElement)) {
            return;
        }
        this.checkInputValidity(input);
        this.toggleButtonState();
    }
    setEventListeners() {
        this.inputs.forEach((input) => {
            input.addEventListener("input", (event) => {
                this.handleInput(event);
            });
        });
        this.toggleButtonState();
    }
    enableValidation() {
        this.setEventListeners();
    }
    resetValidation() {
        this.inputs.forEach((input) => this.hideInputError(input));
        this.toggleButtonState();
    }
}
