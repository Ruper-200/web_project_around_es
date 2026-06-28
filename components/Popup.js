export default class Popup {
    constructor(popupSelector) {
        const popupElement = document.querySelector(popupSelector);
        if (!popupElement) {
            throw new Error(`No se encontro el popup: ${popupSelector}`);
        }
        const closeButton = popupElement.querySelector(".popup__close");
        if (!closeButton) {
            throw new Error(`No se encontro el boton de cierre: ${popupSelector}`);
        }
        this.popupElement = popupElement;
        this.closeButton = closeButton;
        this.boundHandleEscClose = this.handleEscClose.bind(this);
    }
    open() {
        this.popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.boundHandleEscClose);
    }
    close() {
        this.popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.boundHandleEscClose);
    }
    handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }
    setEventListeners() {
        this.closeButton.addEventListener("click", () => this.close());
        this.popupElement.addEventListener("click", (event) => {
            if (event.target === event.currentTarget) {
                this.close();
            }
        });
    }
}
