import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        const formElement = this.popupElement.querySelector(".popup__form");
        if (!formElement) {
            throw new Error(`No se encontro el formulario: ${popupSelector}`);
        }
        this.formElement = formElement;
        this.inputs = Array.from(formElement.querySelectorAll(".popup__input"));
        this.handleFormSubmit = handleFormSubmit;
    }
    getInputValues() {
        return this.inputs.reduce((values, input) => {
            values[input.name] = input.value;
            return values;
        }, {});
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!this.formElement.checkValidity()) {
                return;
            }
            this.handleFormSubmit(this.getInputValues());
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
