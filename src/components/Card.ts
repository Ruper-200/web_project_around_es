export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

export type CardClickHandler = (data: CardData) => void;

export type CardDeleteHandler = (cardId: string) => void | Promise<void>;

export type CardLikeHandler = (
  cardId: string,
  isLiked: boolean,
) => void | Promise<void>;

export default class Card {
  private readonly data: CardData;
  private readonly element: HTMLElement;
  private readonly cardImage: HTMLImageElement;
  private readonly cardTitle: HTMLElement;
  private readonly likeButton: HTMLButtonElement;
  private readonly deleteButton: HTMLButtonElement;
  private readonly handleCardClick: CardClickHandler;
  private readonly handleDeleteClick: CardDeleteHandler;
  private readonly handleLikeClick: CardLikeHandler;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: CardClickHandler,
    handleDeleteClick: CardDeleteHandler,
    handleLikeClick: CardLikeHandler,
    isOwner: boolean,
  ) {
    this.data = data;
    this.handleCardClick = handleCardClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;

    this.element = this.getTemplate(templateSelector);
    this.cardImage = this.getElement<HTMLImageElement>(".card__image");
    this.cardTitle = this.getElement<HTMLElement>(".card__title");
    this.likeButton = this.getElement<HTMLButtonElement>(".card__like-button");
    this.deleteButton = this.getElement<HTMLButtonElement>(
      ".card__delete-button",
    );
    if (!isOwner) {
      this.deleteButton.remove();
    }
  }

  private getTemplate(templateSelector: string): HTMLElement {
    const template =
      document.querySelector<HTMLTemplateElement>(templateSelector);
    const cardElement = template?.content.querySelector<HTMLElement>(".card");

    if (!cardElement) {
      throw new Error(`No se encontro la plantilla: ${templateSelector}`);
    }

    return cardElement.cloneNode(true) as HTMLElement;
  }

  private getElement<T extends HTMLElement>(selector: string): T {
    const element = this.element.querySelector<T>(selector);

    if (!element) {
      throw new Error(`La tarjeta no contiene el elemento: ${selector}`);
    }

    return element;
  }

  public setLikeState(isLiked: boolean): void {
    this.data.isLiked = isLiked;
    this.likeButton.classList.toggle("card__like-button_active", isLiked);
  }

  public deleteCard(): void {
    this.element.remove();
  }

  private setEventListeners(): void {
    this.cardImage.addEventListener("click", () => {
      this.handleCardClick(this.data);
    });
    this.likeButton.addEventListener("click", () =>
      this.handleLikeClick(this.data._id, this.data.isLiked),
    );
    this.deleteButton.addEventListener("click", () =>
      this.handleDeleteClick(this.data._id),
    );
  }

  public generateCard(): HTMLElement {
    this.cardImage.src = this.data.link;
    this.cardImage.alt = this.data.name;
    this.cardTitle.textContent = this.data.name;
    this.setLikeState(this.data.isLiked);
    this.setEventListeners();

    return this.element;
  }
}
