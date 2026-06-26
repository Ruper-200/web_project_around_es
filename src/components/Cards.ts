export interface CardData {
  name: string;
  link: string;
}   

export class Card {
  private _name: string;
  private _link: string;
  private _templateSelector: string;
  private _element: HTMLElement;
  private _handleCardClick: () => void;

    constructor(
        data: CardData,
        templateSelector: string,
        handleCardClick: () => void,    
    ) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }   

    private _getTemplate(): HTMLElement {
        const cardTemplate = document
            .querySelector<HTMLTemplateElement>(this._templateSelector)
            ?.content.querySelector<HTMLElement>(".card");

            const cardElement = cardTemplate?.cloneNode(true) as HTMLElement;

            return cardElement;
    }

    public generateCard(): HTMLElement {
        this._element = this._getTemplate();

        const cardImage = this._element.querySelector<HTMLImageElement>(".card__image");
        const cardTitle = this._element.querySelector<HTMLElement>(".card__title");
        const likeButton = this._element.querySelector<HTMLButtonElement>(".card__like-button");
        const deleteButton = this._element.querySelector<HTMLButtonElement>(".card__delete-button");    

 cardImage.src = this._link;
        cardImage.alt = this._name;
        cardTitle.textContent = this._name;

        return this._element;
    }