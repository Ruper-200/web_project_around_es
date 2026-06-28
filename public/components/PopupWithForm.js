import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        const formElement = this.popupElement.querySelector(".popup__form");
        if (!formElement) {
            throw new Error(`No se encontro el formulario: ${popupSelector}`);
        }
        this.formElement = formElement;
        this.inputList = Array.from(formElement.querySelectorAll(".popup__input"));
        this.handleFormSubmit = handleFormSubmit;
    }
    getInputValues() {
        return this.inputList.reduce((values, inputElement) => {
            values[inputElement.name] = inputElement.value;
            return values;
        }, {});
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this.handleFormSubmit(this.getInputValues());
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
