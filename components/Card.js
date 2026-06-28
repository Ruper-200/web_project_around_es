export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this.data = data;
        this.handleCardClick = handleCardClick;
        this.element = this.getTemplate(templateSelector);
        this.cardImage = this.getElement(".card__image");
        this.cardTitle = this.getElement(".card__title");
        this.likeButton = this.getElement(".card__like-button");
        this.deleteButton = this.getElement(".card__delete-button");
    }
    getTemplate(templateSelector) {
        const template = document.querySelector(templateSelector);
        const cardElement = template === null || template === void 0 ? void 0 : template.content.querySelector(".card");
        if (!cardElement) {
            throw new Error(`No se encontro la plantilla: ${templateSelector}`);
        }
        return cardElement.cloneNode(true);
    }
    getElement(selector) {
        const element = this.element.querySelector(selector);
        if (!element) {
            throw new Error(`La tarjeta no contiene el elemento: ${selector}`);
        }
        return element;
    }
    toggleLike() {
        this.likeButton.classList.toggle("card__like-button_active");
    }
    deleteCard() {
        this.element.remove();
    }
    setEventListeners() {
        this.cardImage.addEventListener("click", () => {
            this.handleCardClick(this.data);
        });
        this.likeButton.addEventListener("click", () => this.toggleLike());
        this.deleteButton.addEventListener("click", () => this.deleteCard());
    }
    generateCard() {
        this.cardImage.src = this.data.link;
        this.cardImage.alt = this.data.name;
        this.cardTitle.textContent = this.data.name;
        this.setEventListeners();
        return this.element;
    }
}
