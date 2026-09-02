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
export default class PopupWithConfirmation extends Popup {
    setSubmitAction(handlerConfirm) {
        this.handlerConfirm = handlerConfirm;
    }
    constructor(popupSelector, handlerConfirm) {
        super(popupSelector);
        const formElement = this.popupElement.querySelector(".popup__form");
        if (!formElement) {
            throw new Error(`No se encontro el formulario en el popup: ${popupSelector}`);
        }
        const submitButton = formElement.querySelector(".popup__button");
        if (!submitButton) {
            throw new Error(`No se encontro el botón de envío en el popup: ${popupSelector}`);
        }
        this.submitButton = submitButton;
        this.formElement = formElement;
        this.handlerConfirm = handlerConfirm;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const originalText = this.submitButton.textContent;
            this.submitButton.textContent = "Guardando...";
            try {
                yield this.handlerConfirm();
                this.close();
            }
            catch (error) {
                console.error("Error al confirmar la acción:", error);
            }
            finally {
                this.submitButton.textContent = originalText;
            }
        }));
    }
}
