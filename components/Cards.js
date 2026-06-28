export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        var _a;
        const cardTemplate = (_a = document
            .querySelector(this._templateSelector)) === null || _a === void 0 ? void 0 : _a.content.querySelector(".card");
        const cardElement = cardTemplate === null || cardTemplate === void 0 ? void 0 : cardTemplate.cloneNode(true);
        return cardElement;
    }
    generateCard() {
        this._element = this._getTemplate();
        this.setEventListeners();
        const cardImage = this._element.querySelector(".card__image");
        const cardTitle = this._element.querySelector(".card__title");
        const likeButton = this._element.querySelector(".card__like-button");
        const deleteButton = this._element.querySelector(".card__delete-button");
        cardImage.src = this._link;
        cardImage.alt = this._name;
        cardTitle.textContent = this._name;
        return this._element;
    }
    setEventListeners() {
        this._element.addEventListener("click", () => this._handleCardClick());
    }
}
