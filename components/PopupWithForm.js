var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        const formElement = this.popupElement.querySelector(".popup__form");
        if (!formElement) {
            throw new Error(`No se encontro el formulario: ${popupSelector}`);
        }
        this.formElement = formElement;
        const submitButton = this.formElement.querySelector(".popup__button");
        if (!submitButton) {
            throw new Error(`No se encontro el boton de submit: ${popupSelector}`);
        }
        this.submitButton = submitButton;
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
        this.formElement.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            if (!this.formElement.checkValidity()) {
                return;
            }
            const originalText = this.submitButton.textContent;
            this.submitButton.textContent = "Guardando...";
            try {
                yield this.handleFormSubmit(this.getInputValues());
            }
            catch (error) {
                console.error("Error al enviar el formulario:", error);
            }
            finally {
                this.submitButton.textContent = originalText;
            }
        }));
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
